# Data Generation Scripts

## Generate 1300 Candidates

This script generates 1300 realistic candidates with applications and test data, and exports everything to CSV files for tracking.

### Prerequisites

```bash
pip install faker
```

### Run the Script

```bash
cd backend/scripts
python3 generate_1300_candidates.py
```

### What It Does

1. **Generates 1300 candidates** with:
   - Realistic names, emails, phone numbers
   - Random cybersecurity skills (3-8 per candidate)
   - Experience levels (0-10 years)
   - Education and certifications
   - AI scores: 55-95% (no perfect scores)
   - Test scores: 60-98% (for eligible candidates)

2. **Creates applications** with:
   - Random job assignments across all existing jobs
   - Application dates: Jan 2024 - Dec 2024
   - Status based on AI score vs job threshold
   - Skill verification data for completed tests

3. **Exports to CSV files**:
   - `backend/data/generated_candidates.csv`
   - `backend/data/generated_applications.csv`
   - `backend/data/generated_tests.csv`

### Output

The script will:
- Insert all data into `recruitment.db`
- Create 3 CSV files in `backend/data/` folder
- Print summary statistics
- Show status distribution

### CSV Files

**generated_candidates.csv**
- candidate_id, name, email, phone, resume_path, created_at

**generated_applications.csv**
- application_id, candidate_id, role_id, job_title, status, applied_at, updated_at

**generated_tests.csv**
- test_id, application_id, test_score, started_at, completed_at, duration_minutes, verified_skills, unverified_skills, untested_skills

### Notes

- Scores are realistic (no 100% scores)
- Application dates span all of 2024
- Candidates are distributed across all jobs
- Test data only for eligible candidates
- Skill verification based on test performance
