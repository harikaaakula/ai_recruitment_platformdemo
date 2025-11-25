#!/usr/bin/env python3
"""
Convert generated_candidates.json to CSV files matching database schema
"""

import json
import csv
from pathlib import Path
from datetime import datetime, timedelta
import random

# Paths
script_dir = Path(__file__).parent
json_path = script_dir.parent / 'data' / 'generated_candidates.json'
csv_dir = script_dir.parent / 'data' / 'csv'

# Create CSV directory
csv_dir.mkdir(parents=True, exist_ok=True)

# Load JSON data
print(f'Loading {json_path}...\n')
with open(json_path, 'r', encoding='utf-8') as f:
    candidates_data = json.load(f)

print(f'Loaded {len(candidates_data)} candidates\n')

# Prepare data structures
candidates = []
applications = []
ai_analyses = []
tests = []
decisions = []

# Job roles (from jobRoles.js - first 5 roles)
job_roles = [
    {
        'role_id': 1,
        'title': 'Incident Response Analyst',
        'description': 'Identifies, investigates, and responds to cybersecurity incidents across the organization.',
        'requirements': '2-5 years experience in incident response | SIEM platforms | EDR tools | Digital forensics',
        'salary_range': '$70,000 - $95,000',
        'status': 'open',
        'recruiter_id': 1,
        'created_at': '2024-01-10 08:00:00'
    },
    {
        'role_id': 2,
        'title': 'Threat Analysis Analyst',
        'description': 'Identifies, evaluates, and interprets cyber threats targeting the organization.',
        'requirements': '1-3 years in threat intelligence | SIEM platforms | CTI tools | Malware analysis',
        'salary_range': '$65,000 - $85,000',
        'status': 'open',
        'recruiter_id': 1,
        'created_at': '2024-01-11 09:30:00'
    },
    {
        'role_id': 3,
        'title': 'Defensive Cybersecurity Analyst',
        'description': 'Strengthens and maintains the organization\'s security posture by monitoring systems.',
        'requirements': '1-3 years in SOC operations | SIEM | IDS/IPS | Threat detection tools',
        'salary_range': '$60,000 - $80,000',
        'status': 'open',
        'recruiter_id': 1,
        'created_at': '2024-01-12 10:15:00'
    },
    {
        'role_id': 4,
        'title': 'Digital Forensics Investigator',
        'description': 'Examines compromised systems, collects and preserves digital evidence.',
        'requirements': '3-7 years in digital forensics | EnCase | FTK | Volatility | Memory analysis',
        'salary_range': '$85,000 - $120,000',
        'status': 'open',
        'recruiter_id': 1,
        'created_at': '2024-01-13 11:00:00'
    },
    {
        'role_id': 5,
        'title': 'Insider Threat Analyst',
        'description': 'Identifies, investigates, and assesses potential internal risks.',
        'requirements': '1-4 years in threat analysis | UEBA tools | Data analysis | Behavioral analysis',
        'salary_range': '$65,000 - $90,000',
        'status': 'open',
        'recruiter_id': 1,
        'created_at': '2024-01-14 13:45:00'
    }
]

# Counters
application_id = 1
analysis_id = 1
test_id = 1
decision_id = 1

# Base date for timestamps
base_date = datetime(2024, 1, 15, 10, 0, 0)

# Process each candidate
for idx, cand_data in enumerate(candidates_data, start=1):
    candidate_id = idx
    
    # Create candidate record
    candidate = {
        'candidate_id': candidate_id,
        'name': cand_data['name'],
        'email': cand_data['email'],
        'phone': cand_data['phone'],
        'resume_path': f'/uploads/resumes/{cand_data["name"].lower().replace(" ", "_")}.pdf',
        'created_at': (base_date + timedelta(hours=idx*2)).strftime('%Y-%m-%d %H:%M:%S')
    }
    candidates.append(candidate)
    
    # Each candidate applies to 1-2 random jobs
    num_applications = random.randint(1, 2)
    applied_roles = random.sample(job_roles, num_applications)
    
    for role in applied_roles:
        applied_at = base_date + timedelta(hours=idx*2, minutes=random.randint(0, 30))
        
        # Determine status based on eligibility
        if cand_data['is_eligible']:
            status = 'completed'
            updated_at = applied_at + timedelta(hours=4)
        else:
            status = 'completed'  # Still completed but not eligible
            updated_at = applied_at + timedelta(hours=2)
        
        # Create application
        application = {
            'application_id': application_id,
            'candidate_id': candidate_id,
            'role_id': role['role_id'],
            'status': status,
            'applied_at': applied_at.strftime('%Y-%m-%d %H:%M:%S'),
            'updated_at': updated_at.strftime('%Y-%m-%d %H:%M:%S')
        }
        applications.append(application)
        
        # Create AI analysis
        ai_analysis = {
            'analysis_id': analysis_id,
            'application_id': application_id,
            'ai_score': cand_data['ai_score'],
            'skills_matched': json.dumps(cand_data['matched_skills']),
            'skill_gaps': json.dumps(cand_data['missing_skills']),
            'experience_years': cand_data['experience_years'],
            'experience_level': cand_data['experience_level'],
            'education': cand_data['education'],
            'certifications': json.dumps(cand_data['certifications']),
            'reasoning': cand_data.get('reasoning', 'AI analysis completed'),
            'created_at': (applied_at + timedelta(minutes=30)).strftime('%Y-%m-%d %H:%M:%S')
        }
        ai_analyses.append(ai_analysis)
        
        # Create test record if eligible
        if cand_data['is_eligible'] and cand_data['test_score'] is not None:
            test = {
                'test_id': test_id,
                'application_id': application_id,
                'test_score': cand_data['test_score'],
                'test_token': f'tok_{random.randint(100000, 999999)}',
                'test_completed_at': (applied_at + timedelta(hours=3)).strftime('%Y-%m-%d %H:%M:%S'),
                'answers': json.dumps([]),  # Simplified
                'verification_details': json.dumps([
                    {'skill': skill, 'score': random.randint(60, 95), 'status': 'passed'}
                    for skill in cand_data['matched_skills'][:4]
                ]),
                'created_at': (applied_at + timedelta(hours=2)).strftime('%Y-%m-%d %H:%M:%S')
            }
            tests.append(test)
            test_id += 1
        
        # Create decision
        decision = {
            'decision_id': decision_id,
            'application_id': application_id,
            'composite_score': cand_data['composite_score'] if cand_data['composite_score'] else 0.0,
            'resume_weight': 40,
            'test_weight': 60,
            'decided_by': 1
        }
        decisions.append(decision)
        
        application_id += 1
        analysis_id += 1
        decision_id += 1

# Write CSV files
print('Writing CSV files...\n')

# 1. Candidates
with open(csv_dir / '1_candidates.csv', 'w', newline='', encoding='utf-8') as f:
    writer = csv.DictWriter(f, fieldnames=['candidate_id', 'name', 'email', 'phone', 'resume_path', 'created_at'])
    writer.writeheader()
    writer.writerows(candidates)
print(f'✓ 1_candidates.csv: {len(candidates)} records')

# 2. Job Roles
with open(csv_dir / '2_job_roles.csv', 'w', newline='', encoding='utf-8') as f:
    writer = csv.DictWriter(f, fieldnames=['role_id', 'title', 'description', 'requirements', 'salary_range', 'status', 'recruiter_id', 'created_at'])
    writer.writeheader()
    writer.writerows(job_roles)
print(f'✓ 2_job_roles.csv: {len(job_roles)} records')

# 3. Applications
with open(csv_dir / '3_applications.csv', 'w', newline='', encoding='utf-8') as f:
    writer = csv.DictWriter(f, fieldnames=['application_id', 'candidate_id', 'role_id', 'status', 'applied_at', 'updated_at'])
    writer.writeheader()
    writer.writerows(applications)
print(f'✓ 3_applications.csv: {len(applications)} records')

# 4. AI Analysis
with open(csv_dir / '4_ai_analysis.csv', 'w', newline='', encoding='utf-8') as f:
    writer = csv.DictWriter(f, fieldnames=['analysis_id', 'application_id', 'ai_score', 'skills_matched', 'skill_gaps', 'experience_years', 'experience_level', 'education', 'certifications', 'reasoning', 'created_at'])
    writer.writeheader()
    writer.writerows(ai_analyses)
print(f'✓ 4_ai_analysis.csv: {len(ai_analyses)} records')

# 5. Tests
with open(csv_dir / '5_tests.csv', 'w', newline='', encoding='utf-8') as f:
    writer = csv.DictWriter(f, fieldnames=['test_id', 'application_id', 'test_score', 'test_token', 'test_completed_at', 'answers', 'verification_details', 'created_at'])
    writer.writeheader()
    writer.writerows(tests)
print(f'✓ 5_tests.csv: {len(tests)} records')

# 6. Decisions
with open(csv_dir / '6_decisions.csv', 'w', newline='', encoding='utf-8') as f:
    writer = csv.DictWriter(f, fieldnames=['decision_id', 'application_id', 'composite_score', 'resume_weight', 'test_weight', 'decided_by'])
    writer.writeheader()
    writer.writerows(decisions)
print(f'✓ 6_decisions.csv: {len(decisions)} records')

print(f'\n✓ All CSV files created successfully!')
print(f'Files saved to: {csv_dir}')
print(f'\nSummary:')
print(f'  Candidates: {len(candidates)}')
print(f'  Job Roles: {len(job_roles)}')
print(f'  Applications: {len(applications)}')
print(f'  AI Analyses: {len(ai_analyses)}')
print(f'  Tests: {len(tests)}')
print(f'  Decisions: {len(decisions)}')
