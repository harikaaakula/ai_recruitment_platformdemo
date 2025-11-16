const express = require('express');
const db = require('../database/init');
const { getTestForJobTitle } = require('../data/testQuestions');
const { verifySkills } = require('../services/skillVerification');

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

    // Get test questions based on job title or test category
    const questions = getTestForJobTitle(application.job_title);
    
    if (!questions || questions.length === 0) {
      console.error('❌ No test questions found for job:', application.job_title);
      return res.status(404).json({ error: 'No test questions available for this job' });
    }
    
    console.log(`✅ Found ${questions.length} test questions`);
    
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
      total_points: questions.reduce((sum, q) => sum + (q.points || 10), 0)
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
    
    // Calculate score
    let totalScore = 0;
    let maxScore = 0;
    const results = [];

    questions.forEach(question => {
      maxScore += question.points;
      const userAnswer = answers.find(a => a.questionId === question.id);
      
      if (userAnswer && userAnswer.selectedOption === question.correct) {
        totalScore += question.points;
        results.push({
          questionId: question.id,
          correct: true,
          points: question.points
        });
      } else {
        results.push({
          questionId: question.id,
          correct: false,
          points: 0
        });
      }
    });

    const percentageScore = Math.round((totalScore / maxScore) * 100);

    // Get claimed skills from AI analysis for skill verification
    console.log('🔍 Fetching claimed skills from AI analysis...');
    db.get(`
      SELECT ai.skills_matched, jr.title as job_title
      FROM ai_analysis ai
      JOIN applications a ON ai.application_id = a.application_id
      JOIN job_roles jr ON a.role_id = jr.role_id
      WHERE ai.application_id = ?
    `, [applicationId], (err, aiData) => {
      if (err) {
        console.error('❌ Error fetching AI data:', err);
      }
      
      let skillVerification = {
        verifiedSkills: [],
        unverifiedSkills: [],
        untestedSkills: [],
        verificationDetails: {}
      };
      
      // Perform skill verification if AI data exists
      if (aiData && aiData.skills_matched) {
        try {
          const claimedSkills = JSON.parse(aiData.skills_matched);
          const jobTitle = aiData.job_title;
          
          // Convert answers to array of selected options
          const userAnswers = answers.map(a => a.selectedOption);
          
          // Verify skills using job title instead of test_category
          skillVerification = verifySkills(claimedSkills, jobTitle, userAnswers);
        } catch (parseError) {
          console.error('❌ Error parsing skills or verifying:', parseError);
        }
      }
      
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
              JSON.stringify(skillVerification.verifiedSkills),
              JSON.stringify(skillVerification.unverifiedSkills),
              JSON.stringify(skillVerification.untestedSkills),
              JSON.stringify(skillVerification.verificationDetails),
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
              JSON.stringify(skillVerification.verifiedSkills),
              JSON.stringify(skillVerification.unverifiedSkills),
              JSON.stringify(skillVerification.untestedSkills),
              JSON.stringify(skillVerification.verificationDetails)
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
            results: results
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