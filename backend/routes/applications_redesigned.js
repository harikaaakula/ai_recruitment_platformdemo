const express = require('express');
const db = require('../database/init');
const { authenticateToken, requireRole } = require('../middleware/auth');

const router = express.Router();

// Get all applications for recruiter - Redesigned ERD
router.get('/recruiter/all', authenticateToken, requireRole('recruiter'), (req, res) => {
  db.all(`
    SELECT 
      a.application_id as id,
      a.status,
      a.applied_at as created_at,
      c.candidate_id,
      c.name as candidate_name,
      c.email as candidate_email,
      c.phone as candidate_phone,
      jr.title as job_title,
      ai.ai_score,
      ai.experience_level,
      ai.experience_years,
      t.test_score,
      t.completed_at as test_completed_at,
      d.composite_score,
      d.final_decision
    FROM applications a
    JOIN candidates c ON a.candidate_id = c.candidate_id
    JOIN job_roles jr ON a.role_id = jr.role_id
    LEFT JOIN ai_analysis ai ON a.application_id = ai.application_id
    LEFT JOIN tests t ON a.application_id = t.application_id
    LEFT JOIN decisions d ON a.application_id = d.application_id
    WHERE jr.recruiter_id = ?
    ORDER BY a.applied_at DESC
  `, [req.user.id], (err, applications) => {
    if (err) {
      console.error('Database error:', err);
      return res.status(500).json({ error: 'Database error' });
    }
    res.json(applications);
  });
});

// Get application by ID - Redesigned ERD
router.get('/:id', (req, res) => {
  const { id } = req.params;
  
  db.get(`
    SELECT 
      a.application_id as id,
      a.status,
      a.applied_at as created_at,
      a.updated_at,
      c.candidate_id,
      c.name as candidate_name,
      c.email as candidate_email,
      c.phone as candidate_phone,
      c.resume_path,
      jr.title as job_title,
      jr.description as job_description,
      jr.requirements,
      jr.min_ai_threshold as threshold_score,
      ai.ai_score,
      ai.skills_matched,
      ai.skill_gaps,
      ai.experience_years,
      ai.experience_level,
      ai.education,
      ai.certifications,
      ai.analysis_completed_at,
      t.test_score,
      t.started_at as test_started_at,
      t.completed_at as test_completed_at,
      t.duration_minutes,
      t.answers,
      d.composite_score,
      d.resume_weight,
      d.test_weight,
      d.final_decision,
      d.decision_notes,
      d.decided_at
    FROM applications a
    JOIN candidates c ON a.candidate_id = c.candidate_id
    JOIN job_roles jr ON a.role_id = jr.role_id
    LEFT JOIN ai_analysis ai ON a.application_id = ai.application_id
    LEFT JOIN tests t ON a.application_id = t.application_id
    LEFT JOIN decisions d ON a.application_id = d.application_id
    WHERE a.application_id = ?
  `, [id], (err, application) => {
    if (err) {
      console.error('Database error:', err);
      return res.status(500).json({ error: 'Database error' });
    }
    
    if (!application) {
      return res.status(404).json({ error: 'Application not found' });
    }
    
    res.json(application);
  });
});

// Apply for a job - Redesigned ERD
router.post('/apply', (req, res) => {
  const { candidateName, candidateEmail, candidatePhone, roleId } = req.body;
  
  // Start transaction
  db.serialize(() => {
    db.run('BEGIN TRANSACTION');
    
    try {
      // Insert or get candidate
      db.run(
        'INSERT OR IGNORE INTO candidates (name, email, phone) VALUES (?, ?, ?)',
        [candidateName, candidateEmail, candidatePhone],
        function(err) {
          if (err) {
            db.run('ROLLBACK');
            return res.status(500).json({ error: 'Failed to create candidate' });
          }
          
          // Get candidate ID
          db.get(
            'SELECT candidate_id FROM candidates WHERE email = ?',
            [candidateEmail],
            (err, candidate) => {
              if (err) {
                db.run('ROLLBACK');
                return res.status(500).json({ error: 'Failed to find candidate' });
              }
              
              // Create application
              db.run(
                'INSERT INTO applications (candidate_id, role_id, status) VALUES (?, ?, ?)',
                [candidate.candidate_id, roleId, 'pending'],
                function(err) {
                  if (err) {
                    db.run('ROLLBACK');
                    if (err.message.includes('UNIQUE constraint failed')) {
                      return res.status(400).json({ error: 'You have already applied for this position' });
                    }
                    return res.status(500).json({ error: 'Failed to create application' });
                  }
                  
                  const applicationId = this.lastID;
                  
                  // Simulate AI analysis (in real app, this would be async)
                  const mockAIScore = Math.floor(Math.random() * 30) + 70; // 70-100
                  const mockSkills = JSON.stringify([
                    { skill: 'JavaScript', category: 'programming', level: 'intermediate' },
                    { skill: 'React', category: 'frontend', level: 'beginner' }
                  ]);
                  const mockGaps = JSON.stringify([
                    { skill: 'TypeScript', category: 'programming', priority: 'medium' }
                  ]);
                  
                  // Insert AI analysis
                  db.run(
                    `INSERT INTO ai_analysis (application_id, ai_score, skills_matched, skill_gaps, 
                                             experience_years, experience_level, education) 
                     VALUES (?, ?, ?, ?, ?, ?, ?)`,
                    [applicationId, mockAIScore, mockSkills, mockGaps, 2, 'mid', 'Bachelor\'s Degree'],
                    (err) => {
                      if (err) {
                        db.run('ROLLBACK');
                        return res.status(500).json({ error: 'Failed to create AI analysis' });
                      }
                      
                      // Update application status based on AI score
                      db.get(
                        'SELECT min_ai_threshold FROM job_roles WHERE role_id = ?',
                        [roleId],
                        (err, role) => {
                          if (err) {
                            db.run('ROLLBACK');
                            return res.status(500).json({ error: 'Failed to check threshold' });
                          }
                          
                          const newStatus = mockAIScore >= role.min_ai_threshold ? 'eligible' : 'not_eligible';
                          
                          db.run(
                            'UPDATE applications SET status = ?, updated_at = CURRENT_TIMESTAMP WHERE application_id = ?',
                            [newStatus, applicationId],
                            (err) => {
                              if (err) {
                                db.run('ROLLBACK');
                                return res.status(500).json({ error: 'Failed to update status' });
                              }
                              
                              db.run('COMMIT');
                              res.json({
                                message: 'Application submitted successfully',
                                applicationId,
                                status: newStatus,
                                aiScore: mockAIScore
                              });
                            }
                          );
                        }
                      );
                    }
                  );
                }
              );
            }
          );
        }
      );
    } catch (error) {
      db.run('ROLLBACK');
      res.status(500).json({ error: 'Application failed' });
    }
  });
});

// Get applications by job ID
router.get('/job/:jobId', authenticateToken, requireRole('recruiter'), (req, res) => {
  const { jobId } = req.params;
  
  db.all(`
    SELECT 
      a.application_id as id,
      a.status,
      a.applied_at as created_at,
      c.name as candidate_name,
      c.email as candidate_email,
      ai.ai_score,
      t.test_score
    FROM applications a
    JOIN candidates c ON a.candidate_id = c.candidate_id
    LEFT JOIN ai_analysis ai ON a.application_id = ai.application_id
    LEFT JOIN tests t ON a.application_id = t.application_id
    WHERE a.role_id = ?
    ORDER BY a.applied_at DESC
  `, [jobId], (err, applications) => {
    if (err) {
      return res.status(500).json({ error: 'Database error' });
    }
    res.json(applications);
  });
});

module.exports = router;