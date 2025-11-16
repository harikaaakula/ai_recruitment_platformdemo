const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const dbPath = path.join(__dirname, 'recruitment.db');
const db = new sqlite3.Database(dbPath);

// Initialize database tables - ERD COMPLIANT STRUCTURE
db.serialize(() => {
  // Users table (recruiters only - candidates are separate)
  db.run(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      email TEXT UNIQUE NOT NULL,
      password TEXT NOT NULL,
      role TEXT NOT NULL CHECK(role IN ('recruiter')),
      name TEXT NOT NULL,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `);

  // Candidate_table (as per ERD)
  db.run(`
    CREATE TABLE IF NOT EXISTS candidate_table (
      candidate_id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      email TEXT UNIQUE NOT NULL,
      phone TEXT,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `);

  // Job_Role_Table (as per ERD)
  db.run(`
    CREATE TABLE IF NOT EXISTS job_role_table (
      role_id INTEGER PRIMARY KEY AUTOINCREMENT,
      role_name TEXT NOT NULL,
      role_description TEXT NOT NULL,
      min_ai_score_threshold INTEGER DEFAULT 70,
      recruiter_id INTEGER NOT NULL,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (recruiter_id) REFERENCES users (id)
    )
  `);

  // Resume_Analysis_table (as per ERD)
  db.run(`
    CREATE TABLE IF NOT EXISTS resume_analysis_table (
      analysis_id INTEGER PRIMARY KEY AUTOINCREMENT,
      candidate_id INTEGER NOT NULL,
      role_id INTEGER NOT NULL,
      ai_match_score INTEGER NOT NULL,
      matched_skills TEXT,
      application_date DATETIME DEFAULT CURRENT_TIMESTAMP,
      resume_path TEXT,
      skill_gaps TEXT,
      experience_years INTEGER,
      experience_level TEXT CHECK(experience_level IN ('entry', 'mid', 'senior', 'lead')),
      education TEXT,
      certifications TEXT,
      FOREIGN KEY (candidate_id) REFERENCES candidate_table (candidate_id),
      FOREIGN KEY (role_id) REFERENCES job_role_table (role_id)
    )
  `);

  // Assessment_table (as per ERD)
  db.run(`
    CREATE TABLE IF NOT EXISTS assessment_table (
      assessment_id INTEGER PRIMARY KEY AUTOINCREMENT,
      analysis_id INTEGER NOT NULL,
      objective_test_score INTEGER,
      test_link_token TEXT UNIQUE,
      test_completed_at DATETIME,
      test_duration INTEGER,
      answers TEXT,
      verified_skills TEXT,
      unverified_skills TEXT,
      untested_skills TEXT,
      verification_details TEXT,
      FOREIGN KEY (analysis_id) REFERENCES resume_analysis_table (analysis_id)
    )
  `);

  // Recruiter_decision_table (as per ERD)
  db.run(`
    CREATE TABLE IF NOT EXISTS recruiter_decision_table (
      decision_id INTEGER PRIMARY KEY AUTOINCREMENT,
      analysis_id INTEGER NOT NULL,
      composite_fit_score INTEGER,
      experience_level TEXT,
      resume_weightage INTEGER,
      test_weightage INTEGER,
      weighted_resume_score INTEGER,
      weighted_test_score INTEGER,
      hiring_status TEXT CHECK(hiring_status IN ('pending', 'shortlisted', 'rejected', 'hired')),
      decision_comments TEXT,
      decision_date DATETIME DEFAULT CURRENT_TIMESTAMP,
      recruiter_id INTEGER NOT NULL,
      FOREIGN KEY (analysis_id) REFERENCES resume_analysis_table (analysis_id),
      FOREIGN KEY (recruiter_id) REFERENCES users (id)
    )
  `);

  // Seed database with sample data
  setTimeout(() => {
    // Check if we need to seed data (only if no job roles exist)
    db.get('SELECT COUNT(*) as count FROM job_role_table', (err, row) => {
      if (!err && row.count === 0) {
        console.log('Seeding database with ERD-compliant sample data...');
        seedERDCompliantData();
      }
    });
  }, 1000);
});

const seedERDCompliantData = async () => {
  const bcrypt = require('bcryptjs');
  
  // Create sample recruiters
  const recruiters = [
    { id: 1, email: 'hr@techcorp.com', name: 'Tech Corp HR' },
    { id: 2, email: 'hiring@startupxyz.com', name: 'StartupXYZ Hiring' },
    { id: 3, email: 'talent@datacorp.com', name: 'DataCorp Talent' }
  ];

  const hashedPassword = await bcrypt.hash('recruiter123', 10);

  recruiters.forEach(recruiter => {
    db.run(
      'INSERT OR IGNORE INTO users (id, email, password, role, name) VALUES (?, ?, ?, ?, ?)',
      [recruiter.id, recruiter.email, hashedPassword, 'recruiter', recruiter.name],
      (err) => {
        if (!err) console.log(`Created recruiter: ${recruiter.name}`);
      }
    );
  });

  // Sample job roles (ERD compliant)
  const jobRoles = [
    {
      role_id: 1, role_name: 'Senior Software Developer', recruiter_id: 1, min_ai_score_threshold: 75,
      role_description: 'We are looking for an experienced software developer to join our dynamic team. Requirements: Bachelor\'s degree in Computer Science, 5+ years experience in JavaScript, React, Node.js, and SQL databases.'
    },
    {
      role_id: 2, role_name: 'Frontend React Developer', recruiter_id: 1, min_ai_score_threshold: 70,
      role_description: 'Join our frontend team to build amazing user interfaces. Requirements: 3+ years experience with React.js and modern JavaScript, strong knowledge of HTML5, CSS3.'
    },
    {
      role_id: 3, role_name: 'Data Scientist', recruiter_id: 3, min_ai_score_threshold: 80,
      role_description: 'Extract insights from complex datasets. Requirements: Master\'s degree in Data Science, 4+ years experience in Python, pandas, numpy, scikit-learn, and SQL.'
    }
  ];

  // Sample candidates (ERD compliant)
  const candidates = [
    { candidate_id: 1, name: 'Sarah Johnson', email: 'sarah.johnson@email.com', phone: '+1-555-0123' },
    { candidate_id: 2, name: 'Michael Chen', email: 'michael.chen@email.com', phone: '+1-555-0124' },
    { candidate_id: 3, name: 'Dr. Emily Rodriguez', email: 'emily.rodriguez@email.com', phone: '+1-555-0125' }
  ];

  // Sample resume analyses (ERD compliant)
  const analyses = [
    {
      analysis_id: 1, candidate_id: 1, role_id: 1, ai_match_score: 87,
      matched_skills: JSON.stringify([
        { skill: 'JavaScript', category: 'programming', level: 'expert' },
        { skill: 'React', category: 'frontend', level: 'expert' },
        { skill: 'Node.js', category: 'backend', level: 'intermediate' }
      ]),
      skill_gaps: JSON.stringify([{ skill: 'TypeScript', category: 'programming', priority: 'medium' }]),
      experience_years: 6, experience_level: 'senior',
      education: 'Bachelor\'s in Computer Science',
      certifications: 'AWS Certified Developer'
    },
    {
      analysis_id: 2, candidate_id: 2, role_id: 2, ai_match_score: 78,
      matched_skills: JSON.stringify([
        { skill: 'React', category: 'frontend', level: 'expert' },
        { skill: 'JavaScript', category: 'programming', level: 'intermediate' }
      ]),
      skill_gaps: JSON.stringify([{ skill: 'Redux', category: 'frontend', priority: 'high' }]),
      experience_years: 4, experience_level: 'mid',
      education: 'Bachelor\'s in Web Development',
      certifications: 'Google Analytics Certified'
    },
    {
      analysis_id: 3, candidate_id: 3, role_id: 3, ai_match_score: 94,
      matched_skills: JSON.stringify([
        { skill: 'Python', category: 'programming', level: 'expert' },
        { skill: 'Machine Learning', category: 'data', level: 'expert' },
        { skill: 'SQL', category: 'database', level: 'expert' }
      ]),
      skill_gaps: JSON.stringify([{ skill: 'Deep Learning', category: 'data', priority: 'medium' }]),
      experience_years: 8, experience_level: 'senior',
      education: 'PhD in Data Science',
      certifications: 'Google Cloud ML Engineer, Coursera ML Specialization'
    }
  ];

  // Sample assessments (ERD compliant)
  const assessments = [
    { assessment_id: 1, analysis_id: 1, objective_test_score: 92, test_link_token: 'test-token-1' },
    { assessment_id: 2, analysis_id: 2, objective_test_score: 85, test_link_token: 'test-token-2' },
    { assessment_id: 3, analysis_id: 3, objective_test_score: 88, test_link_token: 'test-token-3' }
  ];

  // Insert job roles
  setTimeout(() => {
    jobRoles.forEach(role => {
      db.run(
        'INSERT OR IGNORE INTO job_role_table (role_id, role_name, role_description, min_ai_score_threshold, recruiter_id) VALUES (?, ?, ?, ?, ?)',
        [role.role_id, role.role_name, role.role_description, role.min_ai_score_threshold, role.recruiter_id],
        (err) => {
          if (!err) console.log(`Created job role: ${role.role_name}`);
        }
      );
    });
  }, 1000);

  // Insert candidates
  setTimeout(() => {
    candidates.forEach(candidate => {
      db.run(
        'INSERT OR IGNORE INTO candidate_table (candidate_id, name, email, phone) VALUES (?, ?, ?, ?)',
        [candidate.candidate_id, candidate.name, candidate.email, candidate.phone],
        (err) => {
          if (!err) console.log(`Created candidate: ${candidate.name}`);
        }
      );
    });
  }, 1500);

  // Insert resume analyses
  setTimeout(() => {
    analyses.forEach(analysis => {
      db.run(
        'INSERT OR IGNORE INTO resume_analysis_table (analysis_id, candidate_id, role_id, ai_match_score, matched_skills, skill_gaps, experience_years, experience_level, education, certifications) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
        [analysis.analysis_id, analysis.candidate_id, analysis.role_id, analysis.ai_match_score, analysis.matched_skills, analysis.skill_gaps, analysis.experience_years, analysis.experience_level, analysis.education, analysis.certifications],
        (err) => {
          if (!err) console.log(`Created analysis for candidate ID: ${analysis.candidate_id}`);
        }
      );
    });
  }, 2000);

  // Insert assessments
  setTimeout(() => {
    assessments.forEach(assessment => {
      db.run(
        'INSERT OR IGNORE INTO assessment_table (assessment_id, analysis_id, objective_test_score, test_link_token) VALUES (?, ?, ?, ?)',
        [assessment.assessment_id, assessment.analysis_id, assessment.objective_test_score, assessment.test_link_token],
        (err) => {
          if (!err) console.log(`Created assessment for analysis ID: ${assessment.analysis_id}`);
        }
      );
    });
  }, 2500);
};

module.exports = db;