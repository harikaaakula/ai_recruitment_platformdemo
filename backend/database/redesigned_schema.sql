-- Redesigned ERD Schema for AI Recruitment Platform
-- Application-Centric Design

-- Drop existing tables (in correct order due to foreign keys)
DROP TABLE IF EXISTS recruiter_decision_table;
DROP TABLE IF EXISTS assessment_table;
DROP TABLE IF EXISTS resume_analysis_table;
DROP TABLE IF EXISTS candidate_table;
DROP TABLE IF EXISTS job_role_table;

-- 1. Candidates table (simplified)
CREATE TABLE candidates (
    candidate_id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    phone TEXT,
    resume_path TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- 2. Job roles table (enhanced)
CREATE TABLE job_roles (
    role_id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    description TEXT NOT NULL,
    requirements TEXT, -- JSON array of required skills
    min_ai_threshold INTEGER DEFAULT 70,
    salary_min INTEGER,
    salary_max INTEGER,
    status TEXT DEFAULT 'active' CHECK(status IN ('active', 'closed', 'draft')),
    recruiter_id INTEGER NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (recruiter_id) REFERENCES users (id)
);

-- 3. Applications table (CENTRAL TABLE)
CREATE TABLE applications (
    application_id INTEGER PRIMARY KEY AUTOINCREMENT,
    candidate_id INTEGER NOT NULL,
    role_id INTEGER NOT NULL,
    status TEXT DEFAULT 'pending' CHECK(status IN (
        'pending', 'ai_analyzing', 'eligible', 'not_eligible', 
        'test_assigned', 'test_in_progress', 'test_completed',
        'under_review', 'shortlisted', 'interviewed', 'hired', 'rejected'
    )),
    applied_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (candidate_id) REFERENCES candidates (candidate_id),
    FOREIGN KEY (role_id) REFERENCES job_roles (role_id),
    UNIQUE(candidate_id, role_id) -- One application per candidate per role
);

-- 4. AI Analysis table
CREATE TABLE ai_analysis (
    analysis_id INTEGER PRIMARY KEY AUTOINCREMENT,
    application_id INTEGER NOT NULL,
    ai_score INTEGER NOT NULL,
    skills_matched TEXT, -- JSON array
    skill_gaps TEXT, -- JSON array
    experience_years INTEGER,
    experience_level TEXT CHECK(experience_level IN ('entry', 'mid', 'senior', 'lead')),
    education TEXT,
    certifications TEXT,
    analysis_completed_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (application_id) REFERENCES applications (application_id)
);

-- 5. Tests table
CREATE TABLE tests (
    test_id INTEGER PRIMARY KEY AUTOINCREMENT,
    application_id INTEGER NOT NULL,
    test_token TEXT UNIQUE NOT NULL,
    test_score INTEGER,
    started_at DATETIME,
    completed_at DATETIME,
    duration_minutes INTEGER,
    answers TEXT, -- JSON
    FOREIGN KEY (application_id) REFERENCES applications (application_id)
);

-- 6. Decisions table
CREATE TABLE decisions (
    decision_id INTEGER PRIMARY KEY AUTOINCREMENT,
    application_id INTEGER NOT NULL,
    composite_score INTEGER,
    resume_weight INTEGER,
    test_weight INTEGER,
    final_decision TEXT CHECK(final_decision IN ('hire', 'reject', 'hold')),
    decision_notes TEXT,
    decided_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    decided_by INTEGER NOT NULL,
    FOREIGN KEY (application_id) REFERENCES applications (application_id),
    FOREIGN KEY (decided_by) REFERENCES users (id)
);

-- Create indexes for better performance
CREATE INDEX idx_applications_candidate ON applications(candidate_id);
CREATE INDEX idx_applications_role ON applications(role_id);
CREATE INDEX idx_applications_status ON applications(status);
CREATE INDEX idx_ai_analysis_application ON ai_analysis(application_id);
CREATE INDEX idx_tests_application ON tests(application_id);
CREATE INDEX idx_tests_token ON tests(test_token);
CREATE INDEX idx_decisions_application ON decisions(application_id);