# 🎯 Redesigned ERD for AI Recruitment Platform

## 🚨 **Current ERD Issues**

Your current ERD has these fundamental problems:
1. **No Application Entity**: Candidates are directly linked to job roles without a proper application concept
2. **Workflow Confusion**: Resume analysis happens before application tracking
3. **Data Inconsistency**: Test scores exist but workflow states are unclear
4. **Complex Queries**: Need to join 4-5 tables to get basic application info

## ✅ **Redesigned ERD Solution**

### **Core Principle**: **Application-Centric Design**
Every interaction should revolve around an "Application" entity that tracks the complete candidate journey.

```
┌─────────────────────────────────────────────────────────────────────────────────────────────────────┐
│                                    REDESIGNED ERD STRUCTURE                                             │
│                                   (Application-Centric Design)                                         │
└─────────────────────────────────────────────────────────────────────────────────────────────────────┘

┌─────────────────────────┐
│        users            │ (Authentication)
├─────────────────────────┤
│ 🔑 id (PK)             │
│    email (UNIQUE)       │
│    password             │
│    role                 │
│    name                 │
│    created_at           │
└─────────────────────────┘
            │
            │ 1:N (recruiter_id)
            ▼
┌─────────────────────────┐
│      job_roles          │
├─────────────────────────┤
│ 🔑 role_id (PK)        │
│    title                │
│    description          │
│    requirements (JSON)  │
│    min_ai_threshold     │
│    salary_min           │
│    salary_max           │
│    status               │
│ 🔗 recruiter_id (FK)   │
│    created_at           │
└─────────────────────────┘
            │
            │ 1:N (role_id)
            ▼
┌─────────────────────────┐         ┌─────────────────────────┐
│      candidates         │         │     applications        │ ← CENTRAL ENTITY
├─────────────────────────┤         ├─────────────────────────┤
│ 🔑 candidate_id (PK)   │◄────────┤ 🔑 application_id (PK) │
│    name                 │  1:N    │ 🔗 candidate_id (FK)   │
│    email (UNIQUE)       │         │ 🔗 role_id (FK)        │
│    phone                │         │    status               │ ← KEY FIELD
│    resume_path          │         │    applied_at           │
│    created_at           │         │    updated_at           │
└─────────────────────────┘         └─────────────────────────┘
                                                │
                                                │ 1:1 (application_id)
                                                ▼
                                    ┌─────────────────────────┐
                                    │    ai_analysis          │
                                    ├─────────────────────────┤
                                    │ 🔑 analysis_id (PK)    │
                                    │ 🔗 application_id (FK) │
                                    │    ai_score             │
                                    │    skills_matched (JSON)│
                                    │    skill_gaps (JSON)   │
                                    │    experience_years     │
                                    │    experience_level     │
                                    │    education            │
                                    │    certifications       │
                                    │    analysis_completed_at│
                                    └─────────────────────────┘
                                                │
                                                │ 1:1 (application_id)
                                                ▼
                                    ┌─────────────────────────┐
                                    │        tests            │
                                    ├─────────────────────────┤
                                    │ 🔑 test_id (PK)        │
                                    │ 🔗 application_id (FK) │
                                    │    test_token (UNIQUE)  │
                                    │    test_score           │
                                    │    started_at           │
                                    │    completed_at         │
                                    │    duration_minutes     │
                                    │    answers (JSON)       │
                                    └─────────────────────────┘
                                                │
                                                │ 1:1 (application_id)
                                                ▼
                                    ┌─────────────────────────┐
                                    │      decisions          │
                                    ├─────────────────────────┤
                                    │ 🔑 decision_id (PK)    │
                                    │ 🔗 application_id (FK) │
                                    │    composite_score      │
                                    │    resume_weight        │
                                    │    test_weight          │
                                    │    final_decision       │
                                    │    decision_notes       │
                                    │    decided_at           │
                                    │ 🔗 decided_by (FK)     │
                                    └─────────────────────────┘
```

## 📋 **Application Status Workflow**

The `applications.status` field tracks the complete journey:

```
pending → ai_analyzing → eligible → test_assigned → test_in_progress → 
test_completed → under_review → shortlisted → interviewed → hired/rejected
```

### **Status Definitions:**
- **pending**: Application just submitted
- **ai_analyzing**: AI is processing the resume
- **eligible**: AI score >= threshold, eligible for test
- **not_eligible**: AI score < threshold, rejected
- **test_assigned**: Test link sent to candidate
- **test_in_progress**: Candidate started the test
- **test_completed**: Test finished, awaiting review
- **under_review**: Recruiter reviewing complete profile
- **shortlisted**: Selected for interview
- **interviewed**: Interview completed
- **hired**: Final positive decision
- **rejected**: Final negative decision

## 🗃️ **Table Definitions**

### **1. candidates**
```sql
CREATE TABLE candidates (
    candidate_id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    phone TEXT,
    resume_path TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);
```

### **2. job_roles**
```sql
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
```

### **3. applications (CENTRAL TABLE)**
```sql
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
```

### **4. ai_analysis**
```sql
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
```

### **5. tests**
```sql
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
```

### **6. decisions**
```sql
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
```

## 🔄 **Complete Data Flow**

### **Step 1: Application Submission**
```sql
-- Create candidate (if new)
INSERT INTO candidates (name, email, phone, resume_path) VALUES (...);

-- Create application
INSERT INTO applications (candidate_id, role_id, status) 
VALUES (candidate_id, role_id, 'pending');

-- Update status
UPDATE applications SET status = 'ai_analyzing' WHERE application_id = ?;
```

### **Step 2: AI Analysis**
```sql
-- Store AI results
INSERT INTO ai_analysis (application_id, ai_score, skills_matched, ...) VALUES (...);

-- Update application status based on AI score
UPDATE applications SET 
    status = CASE 
        WHEN (SELECT ai_score FROM ai_analysis WHERE application_id = ?) >= 
             (SELECT min_ai_threshold FROM job_roles jr JOIN applications a ON jr.role_id = a.role_id WHERE a.application_id = ?)
        THEN 'eligible'
        ELSE 'not_eligible'
    END,
    updated_at = CURRENT_TIMESTAMP
WHERE application_id = ?;
```

### **Step 3: Test Assignment (if eligible)**
```sql
-- Create test
INSERT INTO tests (application_id, test_token) VALUES (?, ?);

-- Update status
UPDATE applications SET status = 'test_assigned', updated_at = CURRENT_TIMESTAMP 
WHERE application_id = ?;
```

### **Step 4: Test Completion**
```sql
-- Update test results
UPDATE tests SET 
    test_score = ?, 
    completed_at = CURRENT_TIMESTAMP,
    duration_minutes = ?,
    answers = ?
WHERE application_id = ?;

-- Update application status
UPDATE applications SET status = 'test_completed', updated_at = CURRENT_TIMESTAMP 
WHERE application_id = ?;
```

### **Step 5: Final Decision**
```sql
-- Store decision
INSERT INTO decisions (application_id, composite_score, final_decision, decided_by) 
VALUES (?, ?, ?, ?);

-- Update application status
UPDATE applications SET 
    status = CASE 
        WHEN (SELECT final_decision FROM decisions WHERE application_id = ?) = 'hire' THEN 'hired'
        ELSE 'rejected'
    END,
    updated_at = CURRENT_TIMESTAMP
WHERE application_id = ?;
```

## 📊 **Benefits of This Design**

### **1. Simple Queries**
```sql
-- Get all applications for recruiter
SELECT a.*, c.name, jr.title, ai.ai_score, t.test_score
FROM applications a
JOIN candidates c ON a.candidate_id = c.candidate_id
JOIN job_roles jr ON a.role_id = jr.role_id
LEFT JOIN ai_analysis ai ON a.application_id = ai.application_id
LEFT JOIN tests t ON a.application_id = t.application_id
WHERE jr.recruiter_id = ?;
```

### **2. Accurate Analytics**
```sql
-- Test completion rate
SELECT 
    COUNT(*) as total_applications,
    COUNT(CASE WHEN status IN ('test_completed', 'under_review', 'hired') THEN 1 END) as completed_tests,
    ROUND(COUNT(CASE WHEN status IN ('test_completed', 'under_review', 'hired') THEN 1 END) * 100.0 / COUNT(*), 2) as completion_rate
FROM applications a
JOIN job_roles jr ON a.role_id = jr.role_id
WHERE jr.recruiter_id = ?;
```

### **3. Clear Status Tracking**
- Single source of truth for application status
- Easy to track workflow progression
- Consistent data across all views

### **4. Frontend Simplicity**
- Single API call gets complete application data
- No complex JSON parsing
- Clear data structure

## 🚀 **Implementation Plan**

1. **Create new database schema**
2. **Migrate existing data**
3. **Update all API endpoints**
4. **Test complete workflow**

This design eliminates all the current issues and provides a solid foundation for your recruitment platform!