const sqlite3 = require('sqlite3').verbose();
const fs = require('fs');
const path = require('path');

const dbPath = path.join(__dirname, 'recruitment.db');
const backupPath = path.join(__dirname, 'recruitment_backup.db');

async function migrateToRedesignedERD() {
  console.log('🔄 Starting migration to redesigned ERD...');
  
  // Create backup
  console.log('📦 Creating backup...');
  fs.copyFileSync(dbPath, backupPath);
  console.log('✅ Backup created at:', backupPath);
  
  const db = new sqlite3.Database(dbPath);
  
  try {
    // Step 1: Extract existing data
    console.log('📊 Extracting existing data...');
    
    const existingCandidates = await new Promise((resolve, reject) => {
      db.all('SELECT * FROM candidate_table', (err, rows) => {
        if (err) reject(err);
        else resolve(rows || []);
      });
    });
    
    const existingJobRoles = await new Promise((resolve, reject) => {
      db.all('SELECT * FROM job_role_table', (err, rows) => {
        if (err) reject(err);
        else resolve(rows || []);
      });
    });
    
    const existingAnalysis = await new Promise((resolve, reject) => {
      db.all('SELECT * FROM resume_analysis_table', (err, rows) => {
        if (err) reject(err);
        else resolve(rows || []);
      });
    });
    
    const existingTests = await new Promise((resolve, reject) => {
      db.all('SELECT * FROM assessment_table', (err, rows) => {
        if (err) reject(err);
        else resolve(rows || []);
      });
    });
    
    const existingDecisions = await new Promise((resolve, reject) => {
      db.all('SELECT * FROM recruiter_decision_table', (err, rows) => {
        if (err) reject(err);
        else resolve(rows || []);
      });
    });
    
    console.log(`📈 Found: ${existingCandidates.length} candidates, ${existingJobRoles.length} job roles, ${existingAnalysis.length} analyses`);
    
    // Step 2: Apply new schema
    console.log('🏗️ Applying new schema...');
    const schemaSQL = fs.readFileSync(path.join(__dirname, 'redesigned_schema.sql'), 'utf8');
    
    await new Promise((resolve, reject) => {
      db.exec(schemaSQL, (err) => {
        if (err) reject(err);
        else resolve();
      });
    });
    
    console.log('✅ New schema applied');
    
    // Step 3: Migrate data
    console.log('🔄 Migrating data...');
    
    // Migrate candidates
    for (const candidate of existingCandidates) {
      await new Promise((resolve, reject) => {
        db.run(
          'INSERT INTO candidates (candidate_id, name, email, phone, created_at) VALUES (?, ?, ?, ?, ?)',
          [candidate.candidate_id, candidate.name, candidate.email, candidate.phone, candidate.created_at],
          (err) => {
            if (err) reject(err);
            else resolve();
          }
        );
      });
    }
    
    // Migrate job roles
    for (const role of existingJobRoles) {
      await new Promise((resolve, reject) => {
        db.run(
          'INSERT INTO job_roles (role_id, title, description, min_ai_threshold, recruiter_id, created_at) VALUES (?, ?, ?, ?, ?, ?)',
          [role.role_id, role.role_name, role.role_description, role.min_ai_score_threshold, role.recruiter_id, role.created_at],
          (err) => {
            if (err) reject(err);
            else resolve();
          }
        );
      });
    }
    
    // Create applications and migrate analysis data
    for (const analysis of existingAnalysis) {
      // Create application
      const applicationId = await new Promise((resolve, reject) => {
        db.run(
          `INSERT INTO applications (candidate_id, role_id, status, applied_at, updated_at) 
           VALUES (?, ?, ?, ?, ?)`,
          [
            analysis.candidate_id, 
            analysis.role_id, 
            'test_completed', // Default status based on existing data
            analysis.application_date,
            analysis.application_date
          ],
          function(err) {
            if (err) reject(err);
            else resolve(this.lastID);
          }
        );
      });
      
      // Migrate AI analysis
      await new Promise((resolve, reject) => {
        db.run(
          `INSERT INTO ai_analysis (application_id, ai_score, skills_matched, skill_gaps, 
                                   experience_years, experience_level, education, certifications, analysis_completed_at) 
           VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
          [
            applicationId,
            analysis.ai_match_score,
            analysis.matched_skills,
            analysis.skill_gaps,
            analysis.experience_years,
            analysis.experience_level,
            analysis.education,
            analysis.certifications,
            analysis.application_date
          ],
          (err) => {
            if (err) reject(err);
            else resolve();
          }
        );
      });
      
      // Migrate test data if exists
      const testData = existingTests.find(t => t.analysis_id === analysis.analysis_id);
      if (testData) {
        await new Promise((resolve, reject) => {
          db.run(
            `INSERT INTO tests (application_id, test_token, test_score, completed_at, answers) 
             VALUES (?, ?, ?, ?, ?)`,
            [
              applicationId,
              testData.test_link_token,
              testData.objective_test_score,
              testData.test_completed_at || new Date().toISOString(),
              testData.answers
            ],
            (err) => {
              if (err) reject(err);
              else resolve();
            }
          );
        });
      }
      
      // Migrate decision data if exists
      const decisionData = existingDecisions.find(d => d.analysis_id === analysis.analysis_id);
      if (decisionData) {
        await new Promise((resolve, reject) => {
          db.run(
            `INSERT INTO decisions (application_id, composite_score, resume_weight, test_weight, 
                                  final_decision, decision_notes, decided_at, decided_by) 
             VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
            [
              applicationId,
              decisionData.composite_fit_score,
              decisionData.resume_weightage,
              decisionData.test_weightage,
              decisionData.hiring_status === 'hired' ? 'hire' : 'reject',
              decisionData.decision_comments,
              decisionData.decision_date,
              decisionData.recruiter_id
            ],
            (err) => {
              if (err) reject(err);
              else resolve();
            }
          );
        });
      }
    }
    
    console.log('✅ Data migration completed successfully!');
    console.log('🎉 Redesigned ERD is now active');
    
    // Verify migration
    const newApplicationCount = await new Promise((resolve, reject) => {
      db.get('SELECT COUNT(*) as count FROM applications', (err, row) => {
        if (err) reject(err);
        else resolve(row.count);
      });
    });
    
    console.log(`📊 Verification: ${newApplicationCount} applications created`);
    
  } catch (error) {
    console.error('❌ Migration failed:', error);
    console.log('🔄 Restoring backup...');
    fs.copyFileSync(backupPath, dbPath);
    console.log('✅ Backup restored');
    throw error;
  } finally {
    db.close();
  }
}

// Run migration if called directly
if (require.main === module) {
  migrateToRedesignedERD()
    .then(() => {
      console.log('🎉 Migration completed successfully!');
      process.exit(0);
    })
    .catch((error) => {
      console.error('❌ Migration failed:', error);
      process.exit(1);
    });
}

module.exports = { migrateToRedesignedERD };