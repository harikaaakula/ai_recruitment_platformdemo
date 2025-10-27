const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const bcrypt = require('bcryptjs');

const dbPath = path.join(__dirname, '../database/recruitment.db');
const db = new sqlite3.Database(dbPath);

const seedERDData = async () => {
  console.log('🌱 Seeding ERD-compliant data...');
  
  const hashedPassword = await bcrypt.hash('recruiter123', 10);

  // Create recruiters
  const recruiters = [
    { id: 1, email: 'hr@techcorp.com', name: 'Tech Corp HR' },
    { id: 2, email: 'hiring@startupxyz.com', name: 'StartupXYZ Hiring' },
    { id: 3, email: 'talent@datacorp.com', name: 'DataCorp Talent' }
  ];

  recruiters.forEach(recruiter => {
    db.run(
      'INSERT OR REPLACE INTO users (id, email, password, role, name) VALUES (?, ?, ?, ?, ?)',
      [recruiter.id, recruiter.email, hashedPassword, 'recruiter', recruiter.name],
      (err) => {
        if (!err) console.log(`✅ Created recruiter: ${recruiter.name}`);
      }
    );
  });

  // Create job roles
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
    },
    {
      role_id: 4, role_name: 'Full Stack Developer', recruiter_id: 2, min_ai_score_threshold: 75,
      role_description: 'Versatile full stack developer for entire development lifecycle. Requirements: 4+ years full stack experience, JavaScript/TypeScript, React, Node.js, Express.'
    },
    {
      role_id: 5, role_name: 'Machine Learning Engineer', recruiter_id: 3, min_ai_score_threshold: 85,
      role_description: 'Build and deploy ML models at scale. Requirements: Master\'s degree, 3+ years ML experience, Python, TensorFlow/PyTorch, scikit-learn.'
    }
  ];

  setTimeout(() => {
    jobRoles.forEach(role => {
      db.run(
        'INSERT OR REPLACE INTO job_role_table (role_id, role_name, role_description, min_ai_score_threshold, recruiter_id) VALUES (?, ?, ?, ?, ?)',
        [role.role_id, role.role_name, role.role_description, role.min_ai_score_threshold, role.recruiter_id],
        (err) => {
          if (!err) console.log(`✅ Created job role: ${role.role_name}`);
        }
      );
    });
  }, 500);

  // Create candidates
  const candidates = [
    { candidate_id: 1, name: 'Sarah Johnson', email: 'sarah.johnson@email.com', phone: '+1-555-0123' },
    { candidate_id: 2, name: 'Michael Chen', email: 'michael.chen@email.com', phone: '+1-555-0124' },
    { candidate_id: 3, name: 'Dr. Emily Rodriguez', email: 'emily.rodriguez@email.com', phone: '+1-555-0125' },
    { candidate_id: 4, name: 'David Kim', email: 'david.kim@email.com', phone: '+1-555-0127' },
    { candidate_id: 5, name: 'Lisa Wang', email: 'lisa.wang@email.com', phone: '+1-555-0128' }
  ];

  setTimeout(() => {
    candidates.forEach(candidate => {
      db.run(
        'INSERT OR REPLACE INTO candidate_table (candidate_id, name, email, phone) VALUES (?, ?, ?, ?)',
        [candidate.candidate_id, candidate.name, candidate.email, candidate.phone],
        (err) => {
          if (!err) console.log(`✅ Created candidate: ${candidate.name}`);
        }
      );
    });
  }, 1000);

  // Create resume analyses
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
    },
    {
      analysis_id: 4, candidate_id: 4, role_id: 1, ai_match_score: 65,
      matched_skills: JSON.stringify([{ skill: 'JavaScript', category: 'programming', level: 'beginner' }]),
      skill_gaps: JSON.stringify([
        { skill: 'React', category: 'frontend', priority: 'high' },
        { skill: 'Node.js', category: 'backend', priority: 'high' }
      ]),
      experience_years: 1, experience_level: 'entry',
      education: 'Bachelor\'s in Computer Science',
      certifications: ''
    },
    {
      analysis_id: 5, candidate_id: 5, role_id: 4, ai_match_score: 81,
      matched_skills: JSON.stringify([
        { skill: 'JavaScript', category: 'programming', level: 'expert' },
        { skill: 'React', category: 'frontend', level: 'intermediate' },
        { skill: 'Node.js', category: 'backend', level: 'intermediate' }
      ]),
      skill_gaps: JSON.stringify([{ skill: 'TypeScript', category: 'programming', priority: 'medium' }]),
      experience_years: 5, experience_level: 'mid',
      education: 'Master\'s in Computer Science',
      certifications: 'MongoDB Certified Developer'
    }
  ];

  setTimeout(() => {
    analyses.forEach(analysis => {
      db.run(
        'INSERT OR REPLACE INTO resume_analysis_table (analysis_id, candidate_id, role_id, ai_match_score, matched_skills, skill_gaps, experience_years, experience_level, education, certifications) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
        [analysis.analysis_id, analysis.candidate_id, analysis.role_id, analysis.ai_match_score, analysis.matched_skills, analysis.skill_gaps, analysis.experience_years, analysis.experience_level, analysis.education, analysis.certifications],
        (err) => {
          if (!err) console.log(`✅ Created analysis for: ${analysis.candidate_id}`);
        }
      );
    });
  }, 1500);

  // Create assessments
  const assessments = [
    { assessment_id: 1, analysis_id: 1, objective_test_score: 92, test_link_token: 'test-token-sarah' },
    { assessment_id: 2, analysis_id: 2, objective_test_score: 85, test_link_token: 'test-token-michael' },
    { assessment_id: 3, analysis_id: 3, objective_test_score: 88, test_link_token: 'test-token-emily' },
    { assessment_id: 4, analysis_id: 5, objective_test_score: 87, test_link_token: 'test-token-lisa' }
  ];

  setTimeout(() => {
    assessments.forEach(assessment => {
      db.run(
        'INSERT OR REPLACE INTO assessment_table (assessment_id, analysis_id, objective_test_score, test_link_token) VALUES (?, ?, ?, ?)',
        [assessment.assessment_id, assessment.analysis_id, assessment.objective_test_score, assessment.test_link_token],
        (err) => {
          if (!err) console.log(`✅ Created assessment for analysis: ${assessment.analysis_id}`);
        }
      );
    });
  }, 2000);

  // Create recruiter decisions with weighted composite scores
  const decisions = [
    { decision_id: 1, analysis_id: 1, composite_fit_score: 88, experience_level: 'senior', resume_weightage: 30, test_weightage: 70, weighted_resume_score: 26, weighted_test_score: 64, hiring_status: 'shortlisted', recruiter_id: 1 },
    { decision_id: 2, analysis_id: 2, composite_fit_score: 82, experience_level: 'mid', resume_weightage: 40, test_weightage: 60, weighted_resume_score: 31, weighted_test_score: 51, hiring_status: 'pending', recruiter_id: 1 },
    { decision_id: 3, analysis_id: 3, composite_fit_score: 90, experience_level: 'senior', resume_weightage: 30, test_weightage: 70, weighted_resume_score: 28, weighted_test_score: 62, hiring_status: 'hired', recruiter_id: 3 },
    { decision_id: 4, analysis_id: 5, composite_fit_score: 84, experience_level: 'mid', resume_weightage: 40, test_weightage: 60, weighted_resume_score: 32, weighted_test_score: 52, hiring_status: 'shortlisted', recruiter_id: 2 }
  ];

  setTimeout(() => {
    decisions.forEach(decision => {
      db.run(
        'INSERT OR REPLACE INTO recruiter_decision_table (decision_id, analysis_id, composite_fit_score, experience_level, resume_weightage, test_weightage, weighted_resume_score, weighted_test_score, hiring_status, recruiter_id) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
        [decision.decision_id, decision.analysis_id, decision.composite_fit_score, decision.experience_level, decision.resume_weightage, decision.test_weightage, decision.weighted_resume_score, decision.weighted_test_score, decision.hiring_status, decision.recruiter_id],
        (err) => {
          if (!err) console.log(`✅ Created decision for analysis: ${decision.analysis_id}`);
        }
      );
    });
  }, 2500);

  setTimeout(() => {
    console.log('🎉 ERD-compliant database seeding completed!');
    process.exit(0);
  }, 3000);
};

seedERDData();