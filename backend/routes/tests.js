const express = require('express');
const db = require('../database/init');
const { getTestForJobTitle } = require('../data/testQuestions');
const testConfig = require('../config/testConfig');

const router = express.Router();

// Get test questions for an application - Updated for redesigned ERD
router.get('/application/:applicationId', (req, res) => {
  const { applicationId } = req.params;

  // Get application and job details using redesigned schema
  console.log('🔍 Fetching test for application:', applicationId);
  
  db.get(`
    SELECT 
      a.application_id,
      a.status,
      c.name as candidate_name,
      jr.title as job_title,
      jr.description
    FROM applications a 
    JOIN candidates c ON a.candidate_id = c.candidate_id
    JOIN job_roles jr ON a.role_id = jr.role_id
    WHERE a.application_id = ?
  `, [applicationId], (err, application) => {
    if (err) {
      console.error('❌ Database error:', err);
      return res.status(500).json({ error: 'Database error' });
    }

    if (!application) {
      console.error('❌ Application not found:', applicationId);
      return res.status(404).json({ error: 'Application not found' });
    }
    
    // Check if eligible for test
    if (!['eligible', 'test_assigned', 'test_in_progress', 'test_completed'].includes(application.status)) {
      console.error('❌ Application not eligible for test. Status:', application.status);
      return res.status(403).json({ error: 'Application not eligible for test' });
    }
    
    console.log('✅ Found application:', application.job_title, 'Status:', application.status);

    // Get role-specific test configuration
    const roleConfig = testConfig.getConfigForRole(application.job_title);
    console.log(`📋 Test config for ${application.job_title}:`, roleConfig);
    
    // Get test questions based on job title with role-specific configuration
    const questions = getTestForJobTitle(application.job_title, {
      maxQuestions: roleConfig.maxQuestions,
      ensureSkillCoverage: roleConfig.ensureSkillCoverage,
      randomize: roleConfig.randomize
    });
    
    if (!questions || questions.length === 0) {
      console.error('❌ No test questions found for job:', application.job_title);
      return res.status(404).json({ error: 'No test questions available for this job' });
    }
    
    console.log(`✅ Selected ${questions.length} test questions with skill coverage`);
    
    // Remove correct answers from response
    const questionsForCandidate = questions.map((q, index) => ({
      id: q.id || index + 1,
      question: q.question,
      options: q.options,
      points: q.points || 10
    }));

    res.json({
      application_id: applicationId,
      job_title: application.job_title,
      candidate_name: application.candidate_name,
      questions: questionsForCandidate,
      total_points: questions.reduce((sum, q) => sum + (q.points || 10), 0),
      test_config: {
        duration_minutes: roleConfig.duration,
        total_questions: questions.length,
        show_progress: testConfig.display.showProgress,
        allow_review: testConfig.display.allowReview
      }
    });
  });
});

// Submit test answers - Updated for redesigned ERD
router.post('/submit/:applicationId', (req, res) => {
  const { applicationId } = req.params;
  const { answers } = req.body; // Array of {questionId, selectedOption}
  
  console.log('🧪 Test submission started for application:', applicationId);
  console.log('📝 Answers received:', answers?.length, 'answers');

  // Get application and job details using redesigned schema
  console.log('🔍 Looking up application...');
  db.get(`
    SELECT 
      a.application_id,
      a.status,
      jr.title as job_title
    FROM applications a 
    JOIN job_roles jr ON a.role_id = jr.role_id
    WHERE a.application_id = ? AND a.status IN ('eligible', 'test_assigned', 'test_in_progress')
  `, [applicationId], (err, application) => {
    if (err) {
      console.error('❌ Database error:', err);
      return res.status(500).json({ error: 'Database error' });
    }

    if (!application) {
      console.error('❌ Application not found or not eligible:', applicationId);
      return res.status(404).json({ error: 'Application not found or not eligible for test' });
    }
    
    console.log('✅ Found application:', application.job_title, 'Status:', application.status);

    // Get correct answers
    const questions = getTestForJobTitle(application.job_title);
    
    // Calculate score and skill performance
    let totalScore = 0;
    let maxScore = 0;
    const results = [];
    const skillPerformance = {}; // Track performance per skill

    questions.forEach(question => {
      maxScore += question.points;
      const userAnswer = answers.find(a => a.questionId === question.id);
      const isCorrect = userAnswer && userAnswer.selectedOption === question.correct;
      
      if (isCorrect) {
        totalScore += question.points;
      }
      
      results.push({
        questionId: question.id,
        correct: isCorrect,
        points: isCorrect ? question.points : 0
      });
      
      // Track skill-level performance
      question.validatesSkills.forEach(skill => {
        if (!skillPerformance[skill]) {
          skillPerformance[skill] = { correct: 0, total: 0 };
        }
        skillPerformance[skill].total++;
        if (isCorrect) {
          skillPerformance[skill].correct++;
        }
      });
    });

    const percentageScore = Math.round((totalScore / maxScore) * 100);
    
    // Calculate skill performance levels
    const skillBreakdown = {};
    Object.keys(skillPerformance).forEach(skill => {
      const { correct, total } = skillPerformance[skill];
      const percentage = Math.round((correct / total) * 100);
      
      // Binary classification: passed (>=50%) or failed (<50%)
      let level = percentage >= 50 ? 'strong' : 'weak';
      
      skillBreakdown[skill] = {
        correct,
        total,
        percentage,
        level
      };
    });

    // Check if test record already exists
    console.log('🔍 Checking for existing test record...');
    db.get('SELECT test_id FROM tests WHERE application_id = ?', [applicationId], (err, existingTest) => {
      if (err) {
        console.error('❌ Error checking existing test:', err);
        return res.status(500).json({ error: 'Database error' });
      }
      
      console.log('📋 Existing test found:', existingTest ? 'Yes' : 'No');

      if (existingTest) {
        // Update existing test record
        db.run(
          `UPDATE tests SET 
           test_score = ?, completed_at = datetime('now'), duration_minutes = ?, answers = ?,
           verified_skills = ?, unverified_skills = ?, untested_skills = ?, verification_details = ?
           WHERE application_id = ?`,
          [
            percentageScore, 
            60, 
            JSON.stringify(answers),
            JSON.stringify(Object.keys(skillBreakdown).filter(s => skillBreakdown[s].level !== 'weak')),
            JSON.stringify(Object.keys(skillBreakdown).filter(s => skillBreakdown[s].level === 'weak')),
            JSON.stringify([]),
            JSON.stringify(skillBreakdown),
            applicationId
          ],
          function(err) {
            if (err) {
              console.error('Failed to update test results:', err);
              return res.status(500).json({ error: 'Failed to save test results' });
            }
            updateApplicationStatus();
          }
        );
      } else {
        // Create new test record
        const testToken = `test_${applicationId}_${Date.now()}`;
        
        db.run(
          `INSERT INTO tests 
           (application_id, test_token, test_score, started_at, completed_at, duration_minutes, answers,
            verified_skills, unverified_skills, untested_skills, verification_details) 
           VALUES (?, ?, ?, datetime('now', '-1 hour'), datetime('now'), ?, ?, ?, ?, ?, ?)`,
          [
            applicationId, 
            testToken, 
            percentageScore, 
            60, 
            JSON.stringify(answers),
            JSON.stringify(Object.keys(skillBreakdown).filter(s => skillBreakdown[s].level !== 'weak')),
            JSON.stringify(Object.keys(skillBreakdown).filter(s => skillBreakdown[s].level === 'weak')),
            JSON.stringify([]),
            JSON.stringify(skillBreakdown)
          ],
          function(err) {
            if (err) {
              console.error('Failed to save test results:', err);
              return res.status(500).json({ error: 'Failed to save test results' });
            }
            updateApplicationStatus();
          }
        );
      }
    });

    function updateApplicationStatus() {

      // Update application status
      db.run(
        'UPDATE applications SET status = ?, updated_at = datetime("now") WHERE application_id = ?',
        ['test_completed', applicationId],
        (err) => {
          if (err) {
            console.error('Failed to update application:', err);
            return res.status(500).json({ error: 'Failed to update application' });
          }

          res.json({
            message: 'Test submitted successfully',
            score: percentageScore,
            total_points: totalScore,
            max_points: maxScore,
            results: results,
            skill_performance: {
              breakdown: skillBreakdown,
              summary: {
                passed: Object.values(skillBreakdown).filter(s => s.level === 'strong').length,
                failed: Object.values(skillBreakdown).filter(s => s.level === 'weak').length,
                total_skills: Object.keys(skillBreakdown).length
              }
            }
          });
        }
      );
    }
  });
});

// Get test results for an application (for recruiters) - Updated for redesigned ERD
router.get('/results/:applicationId', (req, res) => {
  const { applicationId } = req.params;

  db.get(`
    SELECT 
      t.*,
      c.name as candidate_name,
      ai.ai_score,
      jr.title as job_title
    FROM tests t
    JOIN applications a ON t.application_id = a.application_id
    JOIN candidates c ON a.candidate_id = c.candidate_id
    JOIN job_roles jr ON a.role_id = jr.role_id
    LEFT JOIN ai_analysis ai ON a.application_id = ai.application_id
    WHERE t.application_id = ?
  `, [applicationId], (err, result) => {
    if (err) {
      console.error('Database error:', err);
      return res.status(500).json({ error: 'Database error' });
    }

    if (!result) {
      return res.status(404).json({ error: 'Test results not found' });
    }

    res.json(result);
  });
});

module.exports = router;