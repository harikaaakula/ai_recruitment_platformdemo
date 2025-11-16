const express = require('express');
const db = require('../database/init');
const { authenticateToken, requireRole } = require('../middleware/auth');
const jobRoles = require('../data/jobRoles');

const router = express.Router();

// Get all jobs (public) - Using hardcoded jobs from jobRoles.js
router.get('/', (req, res) => {
  console.log('📋 Serving hardcoded jobs from jobRoles.js');
  
  // Return ATS job roles with compatibility fields
  const jobs = jobRoles.map(job => ({
    id: job.id,
    title: job.title,
    description: job.overview, // Use overview as description
    requirements: `Tasks: ${job.tasks.join(', ')}. Knowledge: ${job.knowledge.join(', ')}. Skills: ${job.skills.join(', ')}.`,
    threshold_score: job.thresholdScore || 60,
    salary_min: 70000, // Default salary
    salary_max: 120000,
    status: 'active',
    recruiter_id: 1,
    created_at: new Date().toISOString(),
    recruiter_name: 'HR Department',
    application_count: 0,
    // ATS-specific fields
    overview: job.overview,
    tasks: job.tasks,
    knowledge: job.knowledge,
    skills: job.skills,
    experienceRange: job.experienceRange,
    weights: job.weights,
    test_category: job.title.toLowerCase().replace(/\s+/g, '_')
  }));
  
  console.log(`✅ Returning ${jobs.length} hardcoded jobs`);
  res.json(jobs);
});

// Get job by ID - Using hardcoded jobs
router.get('/:id', (req, res) => {
  const { id } = req.params;
  console.log(`🔍 Looking for hardcoded job with ID: ${id}`);
  
  // Find job in hardcoded array (id can be string or number)
  const job = jobRoles.find(j => j.id == id || j.id === parseInt(id));
  
  if (!job) {
    console.log(`❌ Job not found with ID: ${id}`);
    return res.status(404).json({ error: 'Job not found' });
  }
  
  console.log(`✅ Found job: ${job.title}`);
  
  // Return ATS job with compatibility fields
  const jobData = {
    id: job.id,
    title: job.title,
    description: job.overview,
    requirements: `Tasks: ${job.tasks.join(', ')}. Knowledge: ${job.knowledge.join(', ')}. Skills: ${job.skills.join(', ')}.`,
    threshold_score: job.thresholdScore || 60,
    salary_min: 70000,
    salary_max: 120000,
    status: 'active',
    recruiter_id: 1,
    created_at: new Date().toISOString(),
    recruiter_name: 'HR Department',
    application_count: 0,
    // ATS-specific fields
    overview: job.overview,
    tasks: job.tasks,
    knowledge: job.knowledge,
    skills: job.skills,
    experienceRange: job.experienceRange,
    weights: job.weights,
    test_category: job.title.toLowerCase().replace(/\s+/g, '_')
  };
  
  res.json(jobData);
});

// Create job (recruiter only) - Redesigned ERD
router.post('/', authenticateToken, requireRole('recruiter'), (req, res) => {
  const { title, description, requirements, threshold_score = 70, salary_min, salary_max } = req.body;
  const recruiter_id = req.user.id;

  db.run(
    `INSERT INTO job_roles (title, description, requirements, min_ai_threshold, salary_min, salary_max, recruiter_id) 
     VALUES (?, ?, ?, ?, ?, ?, ?)`,
    [title, description, requirements, threshold_score, salary_min, salary_max, recruiter_id],
    function(err) {
      if (err) {
        console.error('Database error:', err);
        return res.status(500).json({ error: 'Failed to create job' });
      }
      
      res.status(201).json({
        message: 'Job created successfully',
        jobId: this.lastID
      });
    }
  );
});

// Get recruiter's jobs - Redesigned ERD
router.get('/recruiter/my-jobs', authenticateToken, requireRole('recruiter'), (req, res) => {
  const recruiter_id = req.user.id;

  db.all(`
    SELECT 
      jr.role_id as id, 
      jr.title, 
      jr.description, 
      jr.requirements,
      jr.min_ai_threshold as threshold_score, 
      jr.salary_min,
      jr.salary_max,
      jr.status,
      jr.recruiter_id, 
      jr.created_at,
      COUNT(a.application_id) as application_count,
      COUNT(CASE WHEN a.status = 'eligible' THEN 1 END) as eligible_count,
      COUNT(CASE WHEN a.status IN ('test_completed', 'under_review', 'hired') THEN 1 END) as completed_tests
    FROM job_roles jr 
    LEFT JOIN applications a ON jr.role_id = a.role_id
    WHERE jr.recruiter_id = ?
    GROUP BY jr.role_id
    ORDER BY jr.created_at DESC
  `, [recruiter_id], (err, jobs) => {
    if (err) {
      console.error('Database error:', err);
      return res.status(500).json({ error: 'Database error' });
    }
    res.json(jobs);
  });
});

// Update job status
router.patch('/:id/status', authenticateToken, requireRole('recruiter'), (req, res) => {
  const { id } = req.params;
  const { status } = req.body;
  const recruiter_id = req.user.id;

  if (!['active', 'closed', 'draft'].includes(status)) {
    return res.status(400).json({ error: 'Invalid status' });
  }

  db.run(
    'UPDATE job_roles SET status = ? WHERE role_id = ? AND recruiter_id = ?',
    [status, id, recruiter_id],
    function(err) {
      if (err) {
        console.error('Database error:', err);
        return res.status(500).json({ error: 'Failed to update job status' });
      }
      
      if (this.changes === 0) {
        return res.status(404).json({ error: 'Job not found or access denied' });
      }
      
      res.json({ message: 'Job status updated successfully' });
    }
  );
});

module.exports = router;