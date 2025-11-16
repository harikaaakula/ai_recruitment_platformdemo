"""
Generate Realistic Dummy Candidate Data for Cybersecurity Recruitment Platform
Uses Faker, random, and numpy to create diverse, realistic candidate profiles
"""

import json
import random
import sqlite3
from datetime import datetime, timedelta
from faker import Faker
import numpy as np

fake = Faker()

# Cybersecurity Skills Pool
CYBERSECURITY_SKILLS = {
    'technical': [
        'SIEM', 'Splunk', 'QRadar', 'ArcSight', 'Log Analysis', 'Threat Detection',
        'Incident Response', 'Malware Analysis', 'Digital Forensics', 'Network Security',
        'Firewall Management', 'IDS/IPS', 'Vulnerability Assessment', 'Penetration Testing',
        'Nmap', 'Metasploit', 'Burp Suite', 'Wireshark', 'Nessus', 'OpenVAS',
        'Python', 'PowerShell', 'Bash', 'SQL', 'JavaScript', 'C++',
        'AWS', 'Azure', 'GCP', 'Cloud Security', 'IAM', 'Security Groups',
        'Encryption', 'PKI', 'SSL/TLS', 'VPN', 'Zero Trust', 'SASE',
        'SOAR', 'Threat Intelligence', 'MITRE ATT&CK', 'IOC', 'STIX/TAXII',
        'DevSecOps', 'CI/CD Security', 'Container Security', 'Kubernetes Security',
        'WAF', 'DDoS Protection', 'API Security', 'OAuth', 'SAML',
        'Reverse Engineering', 'Binary Analysis', 'Exploit Development',
        'Red Teaming', 'Blue Teaming', 'Purple Teaming', 'Security Architecture'
    ],
    'frameworks': [
        'NIST Cybersecurity Framework', 'ISO 27001', 'CIS Controls', 'COBIT',
        'PCI DSS', 'HIPAA', 'GDPR', 'SOC 2', 'FISMA', 'CMMC'
    ],
    'soft': [
        'Risk Assessment', 'Security Auditing', 'Compliance Management',
        'Security Awareness Training', 'Incident Management', 'Crisis Management',
        'Technical Writing', 'Report Writing', 'Communication', 'Team Leadership'
    ]
}

# Certifications by Level
CERTIFICATIONS = {
    'entry': ['CompTIA Security+', 'CompTIA Network+', 'CompTIA A+', 'GIAC Security Essentials (GSEC)'],
    'mid': ['CEH', 'CISSP', 'CISM', 'CISA', 'GIAC Certified Incident Handler (GCIH)', 
            'Offensive Security Certified Professional (OSCP)', 'CompTIA CySA+'],
    'senior': ['CISSP-ISSAP', 'CISSP-ISSEP', 'GIAC Security Expert (GSE)', 
               'Offensive Security Certified Expert (OSCE)', 'CREST Certified Tester']
}

# Education Levels
EDUCATION_LEVELS = [
    "Bachelor's in Cybersecurity",
    "Bachelor's in Computer Science",
    "Bachelor's in Information Technology",
    "Master's in Cybersecurity",
    "Master's in Information Security",
    "Master's in Computer Science",
    "Bachelor's in Network Engineering",
    "Associate's in Cybersecurity"
]

# Job Titles by Experience Level
JOB_TITLES = {
    'entry': [
        'Junior Security Analyst', 'SOC Analyst I', 'Security Intern',
        'IT Security Specialist', 'Cybersecurity Analyst'
    ],
    'mid': [
        'Security Analyst', 'SOC Analyst II', 'Security Engineer',
        'Penetration Tester', 'Incident Responder', 'Threat Analyst',
        'Security Consultant', 'Vulnerability Analyst'
    ],
    'senior': [
        'Senior Security Analyst', 'Lead Security Engineer', 'Security Architect',
        'Senior Penetration Tester', 'Principal Security Consultant',
        'Security Operations Manager', 'CISO', 'Director of Security'
    ]
}

def get_experience_level(years):
    """Determine experience level based on years"""
    if years <= 2:
        return 'entry'
    elif years <= 7:
        return 'mid'
    else:
        return 'senior'

def generate_skills_for_job(job_role, experience_years):
    """Generate realistic skills based on job role and experience"""
    # Get required skills from job role
    required_skills = job_role.get('skills', [])[:5]
    
    # Determine how many skills to include (more experience = more skills)
    base_skills = min(5 + experience_years, 15)
    skill_count = random.randint(base_skills - 2, base_skills + 3)
    
    # Start with some required skills (80% chance to have each)
    candidate_skills = [skill for skill in required_skills if random.random() < 0.8]
    
    # Add random technical skills
    remaining = skill_count - len(candidate_skills)
    if remaining > 0:
        sample_size = min(remaining, len(CYBERSECURITY_SKILLS['technical']))
        additional_skills = random.sample(CYBERSECURITY_SKILLS['technical'], sample_size)
    else:
        additional_skills = []
    candidate_skills.extend(additional_skills)
    
    # Add some framework knowledge for mid/senior
    if experience_years >= 3:
        frameworks = random.sample(CYBERSECURITY_SKILLS['frameworks'], 
                                  random.randint(1, 3))
        candidate_skills.extend(frameworks)
    
    # Add soft skills for senior
    if experience_years >= 5:
        soft = random.sample(CYBERSECURITY_SKILLS['soft'], random.randint(1, 2))
        candidate_skills.extend(soft)
    
    return list(set(candidate_skills))[:skill_count]

def calculate_ai_score(candidate_skills, job_skills, experience_years, job_exp_range, candidate_tier):
    """Calculate AI score with TIERED DISTRIBUTION for guaranteed variation"""
    # Skill match score (60%)
    matched_skills = len(set(candidate_skills) & set(job_skills))
    skill_score = (matched_skills / len(job_skills)) * 100 if job_skills else 50
    
    # Experience match score (30%)
    exp_min, exp_max = job_exp_range['min'], job_exp_range['max']
    if exp_min <= experience_years <= exp_max:
        exp_score = random.uniform(85, 100)
    elif experience_years < exp_min:
        exp_score = max(50, 100 - (exp_min - experience_years) * 10)
    else:
        exp_score = max(70, 100 - (experience_years - exp_max) * 5)
    
    # Random factor (10%)
    random_factor = random.uniform(60, 95)
    
    # Base weighted score
    base_score = (skill_score * 0.6) + (exp_score * 0.3) + (random_factor * 0.1)
    
    # Apply TIER-BASED distribution for guaranteed variation
    if candidate_tier == 'elite':
        # Elite tier: 85-92% with guaranteed uniqueness
        final_score = random.uniform(85, 92) + random.uniform(-1, 1)
    elif candidate_tier == 'strong':
        # Strong tier: 75-84%
        final_score = random.uniform(75, 84) + random.uniform(-1, 1)
    elif candidate_tier == 'good':
        # Good tier: 65-74%
        final_score = random.uniform(65, 74) + random.uniform(-1, 1)
    else:
        # Average tier: 55-64%
        final_score = random.uniform(55, 64) + random.uniform(-1, 1)
    
    # Slight adjustment based on actual skill match (keep some logic)
    if skill_score > 80:
        final_score += random.uniform(0, 2)
    elif skill_score < 50:
        final_score -= random.uniform(0, 2)
    
    return max(55, min(92, round(final_score, 1)))

def generate_test_score(ai_score, experience_years, candidate_tier):
    """Generate test score with TIERED DISTRIBUTION for guaranteed variation"""
    # Apply TIER-BASED distribution
    if candidate_tier == 'elite':
        # Elite tier: 86-93% with guaranteed uniqueness
        test_score = random.uniform(86, 93) + random.uniform(-1, 1)
    elif candidate_tier == 'strong':
        # Strong tier: 76-85%
        test_score = random.uniform(76, 85) + random.uniform(-1, 1)
    elif candidate_tier == 'good':
        # Good tier: 66-75%
        test_score = random.uniform(66, 75) + random.uniform(-1, 1)
    else:
        # Average tier: 60-65%
        test_score = random.uniform(60, 65) + random.uniform(-1, 1)
    
    # Slight correlation with AI score (keep some logic)
    correlation = (ai_score - 75) * 0.1  # Small correlation factor
    test_score += correlation
    
    # Experience bonus
    experience_bonus = min(experience_years * 0.5, 3)
    test_score += experience_bonus
    
    return max(60, min(93, round(test_score, 1)))

def calculate_composite_score(ai_score, test_score, experience_level):
    """Calculate weighted composite score based on experience level - WITH DECIMAL PRECISION"""
    weights = {
        'entry': {'ai': 0.7, 'test': 0.3},
        'mid': {'ai': 0.4, 'test': 0.6},
        'senior': {'ai': 0.3, 'test': 0.7}
    }
    
    w = weights.get(experience_level, weights['mid'])
    composite = (ai_score * w['ai']) + (test_score * w['test'])
    
    # Keep 1 decimal place for better differentiation
    return round(composite, 1)

def generate_skill_verification(candidate_skills, test_score):
    """Generate skill verification results"""
    # Higher test scores = more verified skills
    verification_rate = test_score / 100
    
    # Randomly verify skills based on test performance
    verified = []
    unverified = []
    untested = []
    
    for skill in candidate_skills:
        rand = random.random()
        if rand < verification_rate * 0.7:  # 70% of skills get tested
            if random.random() < verification_rate:
                verified.append(skill)
            else:
                unverified.append(skill)
        else:
            untested.append(skill)
    
    return verified, unverified, untested

def generate_improvement_suggestions(missing_skills, unverified_skills, ai_score, test_score):
    """Generate personalized improvement suggestions"""
    suggestions = []
    
    # Skill-based suggestions
    if missing_skills:
        top_missing = random.sample(missing_skills, min(2, len(missing_skills)))
        for skill in top_missing:
            suggestions.append(f"Develop expertise in {skill} through hands-on projects or certifications")
    
    if unverified_skills:
        skill = random.choice(unverified_skills)
        suggestions.append(f"Strengthen practical knowledge of {skill} - consider lab exercises or real-world scenarios")
    
    # Score-based suggestions
    if ai_score < 70:
        suggestions.append("Expand technical skill set to better match job requirements")
    
    if test_score < 70:
        suggestions.append("Focus on deepening theoretical knowledge and best practices")
    
    # General suggestions
    general = [
        "Pursue relevant industry certifications to validate expertise",
        "Gain hands-on experience through CTF competitions or bug bounty programs",
        "Stay updated with latest security threats and mitigation techniques",
        "Contribute to open-source security projects to demonstrate skills",
        "Attend security conferences and networking events"
    ]
    
    suggestions.extend(random.sample(general, min(2, 5 - len(suggestions))))
    
    return suggestions[:5]

def generate_candidate_for_job(job_role, candidate_number, application_date=None):
    """Generate a single realistic candidate for a job role with TIERED SCORING"""
    # Determine candidate tier based on number (ensures top candidates have best scores)
    if candidate_number <= 5:
        candidate_tier = 'elite'
    elif candidate_number <= 20:
        candidate_tier = 'strong'
    elif candidate_number <= 50:
        candidate_tier = 'good'
    else:
        candidate_tier = 'average'
    
    # Generate basic info
    gender = random.choice(['male', 'female'])
    first_name = fake.first_name_male() if gender == 'male' else fake.first_name_female()
    last_name = fake.last_name()
    name = f"{first_name} {last_name}"
    # Add random number to email to ensure uniqueness
    email = f"{first_name.lower()}.{last_name.lower()}{random.randint(1, 9999)}@{fake.free_email_domain()}"
    phone = fake.phone_number()
    
    # Generate experience (weighted towards job requirements)
    exp_min, exp_max = job_role['experienceRange']['min'], job_role['experienceRange']['max']
    # 60% within range, 40% outside
    if random.random() < 0.6:
        experience_years = random.randint(exp_min, exp_max)
    else:
        experience_years = random.randint(max(0, exp_min - 2), exp_max + 3)
    
    experience_level = get_experience_level(experience_years)
    
    # Generate education
    education = random.choice(EDUCATION_LEVELS)
    if experience_years >= 5 and random.random() < 0.4:
        education = random.choice([e for e in EDUCATION_LEVELS if "Master's" in e])
    
    # Generate certifications
    cert_count = min(1 + experience_years // 2, 4)
    certifications = []
    if experience_years >= 1:
        certifications.extend(random.sample(CERTIFICATIONS['entry'], min(cert_count, 2)))
    if experience_years >= 3:
        certifications.extend(random.sample(CERTIFICATIONS['mid'], min(cert_count - len(certifications), 2)))
    if experience_years >= 7:
        certifications.extend(random.sample(CERTIFICATIONS['senior'], min(cert_count - len(certifications), 1)))
    
    # Generate job titles
    job_titles = []
    if experience_years >= 1:
        job_titles.append(random.choice(JOB_TITLES['entry']))
    if experience_years >= 3:
        job_titles.append(random.choice(JOB_TITLES['mid']))
    if experience_years >= 7:
        job_titles.append(random.choice(JOB_TITLES['senior']))
    
    # Generate skills
    candidate_skills = generate_skills_for_job(job_role, experience_years)
    job_skills = job_role.get('skills', [])
    
    # Calculate scores with TIER parameter for guaranteed variation
    ai_score = calculate_ai_score(candidate_skills, job_skills, experience_years, job_role['experienceRange'], candidate_tier)
    test_score = generate_test_score(ai_score, experience_years, candidate_tier)
    composite_score = calculate_composite_score(ai_score, test_score, experience_level)
    
    # Determine eligibility
    threshold = job_role.get('thresholdScore', 60)
    is_eligible = ai_score >= threshold
    status = 'test_completed' if is_eligible else 'not_eligible'
    
    # Calculate missing skills
    matched_skills = list(set(candidate_skills) & set(job_skills))
    missing_skills = list(set(job_skills) - set(candidate_skills))
    
    # Generate skill verification
    verified_skills, unverified_skills, untested_skills = generate_skill_verification(
        candidate_skills, test_score
    )
    
    # Generate improvement suggestions
    suggestions = generate_improvement_suggestions(
        missing_skills, unverified_skills, ai_score, test_score
    )
    
    # Generate application date (Jan 2024 - Dec 2024 if provided, else last 30 days)
    if application_date:
        applied_at = application_date
    else:
        applied_at = datetime.now() - timedelta(days=random.randint(1, 30))
    
    return {
        'name': name,
        'email': email,
        'phone': phone,
        'experience_years': experience_years,
        'experience_level': experience_level,
        'education': education,
        'certifications': certifications,
        'job_titles': job_titles,
        'skills': candidate_skills,
        'matched_skills': matched_skills,
        'missing_skills': missing_skills,
        'ai_score': ai_score,
        'test_score': test_score if is_eligible else None,
        'composite_score': composite_score if is_eligible else None,
        'is_eligible': is_eligible,
        'status': status,
        'threshold': threshold,
        'verified_skills': verified_skills if is_eligible else [],
        'unverified_skills': unverified_skills if is_eligible else [],
        'untested_skills': untested_skills if is_eligible else [],
        'suggestions': suggestions,
        'applied_at': applied_at.isoformat(),
        'role_id': job_role['id'],
        'role_title': job_role['title']
    }

def load_job_roles():
    """Load job roles from the JavaScript file"""
    # For simplicity, we'll define them here
    # In production, you'd parse the actual jobRoles.js file
    return [
        {
            'id': '1',
            'title': 'Security Analyst',
            'skills': ['SIEM', 'Log Analysis', 'Threat Detection', 'Incident Response', 'Network Security'],
            'experienceRange': {'min': 2, 'max': 5},
            'thresholdScore': 60
        },
        {
            'id': '2',
            'title': 'Penetration Tester',
            'skills': ['Penetration Testing', 'Nmap', 'Metasploit', 'Burp Suite', 'OWASP'],
            'experienceRange': {'min': 3, 'max': 7},
            'thresholdScore': 65
        },
        {
            'id': '3',
            'title': 'Security Engineer',
            'skills': ['Firewall Management', 'Network Security', 'IDS/IPS', 'VPN', 'Security Architecture'],
            'experienceRange': {'min': 3, 'max': 6},
            'thresholdScore': 65
        },
        {
            'id': '4',
            'title': 'SOC Analyst',
            'skills': ['SIEM', 'Incident Response', 'Threat Intelligence', 'Log Analysis', 'Security Monitoring'],
            'experienceRange': {'min': 1, 'max': 4},
            'thresholdScore': 60
        },
        {
            'id': '5',
            'title': 'Vulnerability Analyst',
            'skills': ['Vulnerability Assessment', 'Nessus', 'OpenVAS', 'Risk Assessment', 'Patch Management'],
            'experienceRange': {'min': 2, 'max': 5},
            'thresholdScore': 60
        },
        {
            'id': '6',
            'title': 'Incident Responder',
            'skills': ['Incident Response', 'Digital Forensics', 'Malware Analysis', 'Threat Hunting', 'SIEM'],
            'experienceRange': {'min': 3, 'max': 6},
            'thresholdScore': 65
        },
        {
            'id': '7',
            'title': 'Security Architect',
            'skills': ['Security Architecture', 'Zero Trust', 'Cloud Security', 'Network Security', 'IAM'],
            'experienceRange': {'min': 7, 'max': 12},
            'thresholdScore': 75
        },
        {
            'id': '8',
            'title': 'Cloud Security Engineer',
            'skills': ['AWS', 'Azure', 'Cloud Security', 'IAM', 'Container Security'],
            'experienceRange': {'min': 3, 'max': 7},
            'thresholdScore': 65
        },
        {
            'id': '9',
            'title': 'Threat Intelligence Analyst',
            'skills': ['Threat Intelligence', 'MITRE ATT&CK', 'IOC', 'STIX/TAXII', 'Threat Hunting'],
            'experienceRange': {'min': 2, 'max': 6},
            'thresholdScore': 60
        },
        {
            'id': '10',
            'title': 'Security Compliance Analyst',
            'skills': ['Compliance Management', 'ISO 27001', 'NIST', 'Risk Assessment', 'Security Auditing'],
            'experienceRange': {'min': 3, 'max': 6},
            'thresholdScore': 65
        },
        {
            'id': '11',
            'title': 'Application Security Engineer',
            'skills': ['OWASP', 'API Security', 'DevSecOps', 'Code Review', 'WAF'],
            'experienceRange': {'min': 3, 'max': 6},
            'thresholdScore': 65
        },
        {
            'id': '12',
            'title': 'Network Security Engineer',
            'skills': ['Firewall Management', 'Network Security', 'VPN', 'IDS/IPS', 'Network Segmentation'],
            'experienceRange': {'min': 3, 'max': 7},
            'thresholdScore': 65
        },
        {
            'id': '13',
            'title': 'Malware Analyst',
            'skills': ['Malware Analysis', 'Reverse Engineering', 'Binary Analysis', 'Digital Forensics', 'Python'],
            'experienceRange': {'min': 3, 'max': 7},
            'thresholdScore': 70
        },
        {
            'id': '14',
            'title': 'Security Operations Manager',
            'skills': ['Team Leadership', 'Incident Management', 'SIEM', 'Security Operations', 'Risk Management'],
            'experienceRange': {'min': 5, 'max': 10},
            'thresholdScore': 70
        },
        {
            'id': '15',
            'title': 'Identity and Access Management Specialist',
            'skills': ['IAM', 'OAuth', 'SAML', 'Active Directory', 'Access Control'],
            'experienceRange': {'min': 2, 'max': 5},
            'thresholdScore': 60
        },
        {
            'id': '16',
            'title': 'Security Automation Engineer',
            'skills': ['Python', 'SOAR', 'DevSecOps', 'CI/CD Security', 'Automation'],
            'experienceRange': {'min': 3, 'max': 6},
            'thresholdScore': 65
        },
        {
            'id': '17',
            'title': 'Cryptography Specialist',
            'skills': ['Encryption', 'PKI', 'SSL/TLS', 'Cryptography', 'Key Management'],
            'experienceRange': {'min': 4, 'max': 8},
            'thresholdScore': 70
        },
        {
            'id': '18',
            'title': 'Security Awareness Trainer',
            'skills': ['Security Awareness Training', 'Communication', 'Technical Writing', 'Phishing Simulation', 'Training Development'],
            'experienceRange': {'min': 2, 'max': 5},
            'thresholdScore': 60
        },
        {
            'id': '19',
            'title': 'Security Risk Analyst',
            'skills': ['Risk Assessment', 'Risk Management', 'Compliance', 'Security Auditing', 'NIST'],
            'experienceRange': {'min': 3, 'max': 6},
            'thresholdScore': 65
        },
        {
            'id': '20',
            'title': 'Digital Forensics Investigator',
            'skills': ['Digital Forensics', 'Incident Response', 'Malware Analysis', 'Evidence Collection', 'Chain of Custody'],
            'experienceRange': {'min': 3, 'max': 7},
            'thresholdScore': 70
        }
    ]

def generate_all_candidates():
    """Generate candidates with realistic market-based distribution (1285 total)"""
    job_roles = load_job_roles()
    all_candidates = []
    
    # Realistic market-based distribution
    job_distribution = {
        'Security Engineer': 95,
        'Security Analyst': 85,
        'SOC Analyst': 80,
        'Penetration Tester': 75,
        'Cloud Security Engineer': 70,
        'Incident Responder': 65,
        'Vulnerability Analyst': 60,
        'Network Security Engineer': 60,
        'Application Security Engineer': 55,
        'Threat Intelligence Analyst': 55,
        'Security Compliance Analyst': 50,
        'Security Risk Analyst': 50,
        'Security Automation Engineer': 45,
        'Identity and Access Management Specialist': 45,
        'Security Operations Manager': 40,
        'Digital Forensics Investigator': 35,
        'Malware Analyst': 35,
        'Cryptography Specialist': 30,
        'Security Awareness Trainer': 30,
        'Security Architect': 25
    }
    
    total_candidates = sum(job_distribution.values())
    
    # Date range: Oct 2024 to Nov 16, 2024 (present)
    start_date = datetime(2024, 10, 1)
    end_date = datetime(2024, 11, 16)
    
    print(f"🚀 Generating {total_candidates} candidates for {len(job_roles)} job roles...")
    print(f"📊 Realistic market-based distribution")
    print(f"📅 Application dates: Oct 1, 2024 - Nov 16, 2024\n")
    
    for job_role in job_roles:
        job_title = job_role['title']
        candidate_count = job_distribution.get(job_title, 50)  # default 50 if not found
        
        print(f"📝 Generating candidates for: {job_title}")
        print(f"   🎯 Target: {candidate_count} candidates")
        job_candidates = []
        
        for i in range(candidate_count):
            # Random date between Oct 1 and Nov 16, 2024
            delta = end_date - start_date
            random_days = random.randint(0, delta.days)
            application_date = start_date + timedelta(days=random_days)
            
            candidate = generate_candidate_for_job(job_role, i + 1, application_date)
            job_candidates.append(candidate)
        
        all_candidates.extend(job_candidates)
        
        # Print stats for this job
        eligible = len([c for c in job_candidates if c['is_eligible']])
        avg_ai = sum(c['ai_score'] for c in job_candidates) / len(job_candidates)
        print(f"   ✅ Generated {len(job_candidates)} candidates")
        print(f"   📊 Eligible: {eligible}/{len(job_candidates)} ({eligible/len(job_candidates)*100:.1f}%)")
        print(f"   🎯 Avg AI Score: {avg_ai:.1f}%\n")
        
        # Progress indicator
        if (len(all_candidates)) % 200 == 0:
            print(f"   📈 Progress: {len(all_candidates)}/{total_candidates} candidates generated\n")
    
    return all_candidates

def save_to_database(candidates, db_path='database/recruitment.db'):
    """Save generated candidates to SQLite database"""
    print(f"\n💾 Saving {len(candidates)} candidates to database...")
    
    conn = sqlite3.connect(db_path)
    cursor = conn.cursor()
    
    # Clear existing data
    print("🗑️  Clearing old candidate data...")
    cursor.execute("DELETE FROM decisions")
    cursor.execute("DELETE FROM tests")
    cursor.execute("DELETE FROM ai_analysis")
    cursor.execute("DELETE FROM applications")
    cursor.execute("DELETE FROM candidates")
    conn.commit()  # Commit the deletions
    print("✅ Old data cleared")
    
    # Insert candidates
    print("📝 Inserting new candidates...")
    for idx, candidate in enumerate(candidates, 1):
        # Insert candidate
        cursor.execute("""
            INSERT INTO candidates (name, email, phone, resume_path)
            VALUES (?, ?, ?, ?)
        """, (candidate['name'], candidate['email'], candidate['phone'], 
              f"uploads/resume_{idx}.pdf"))
        
        candidate_id = cursor.lastrowid
        
        # Insert application
        cursor.execute("""
            INSERT INTO applications (candidate_id, role_id, status, applied_at)
            VALUES (?, ?, ?, ?)
        """, (candidate_id, candidate['role_id'], candidate['status'], candidate['applied_at']))
        
        application_id = cursor.lastrowid
        
        # Insert AI analysis
        cursor.execute("""
            INSERT INTO ai_analysis (
                application_id, ai_score, skills_matched, skill_gaps,
                experience_years, experience_level, education, certifications
            ) VALUES (?, ?, ?, ?, ?, ?, ?, ?)
        """, (
            application_id,
            candidate['ai_score'],
            json.dumps(candidate['matched_skills']),
            json.dumps(candidate['missing_skills']),
            candidate['experience_years'],
            candidate['experience_level'],
            candidate['education'],
            json.dumps(candidate['certifications'])
        ))
        
        # Insert test results if eligible
        if candidate['is_eligible'] and candidate['test_score']:
            cursor.execute("""
                INSERT INTO tests (
                    application_id, test_token, test_score, 
                    started_at, completed_at, duration_minutes,
                    verified_skills, unverified_skills, untested_skills
                ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
            """, (
                application_id,
                f"test_{application_id}_{idx}",
                candidate['test_score'],
                candidate['applied_at'],
                candidate['applied_at'],
                60,
                json.dumps(candidate['verified_skills']),
                json.dumps(candidate['unverified_skills']),
                json.dumps(candidate['untested_skills'])
            ))
            
            # Insert decision with composite score
            # Note: decided_by is set to 1 (assuming recruiter_id = 1)
            cursor.execute("""
                INSERT INTO decisions (
                    application_id, composite_score, final_decision, decided_by, decided_at
                ) VALUES (?, ?, ?, ?, ?)
            """, (
                application_id,
                candidate['composite_score'],
                'hold',  # Must be 'hire', 'reject', or 'hold'
                1,  # Default recruiter ID
                candidate['applied_at']
            ))
    
    conn.commit()
    conn.close()
    
    print(f"✅ Successfully saved {len(candidates)} candidates to database!")

def save_to_json(candidates, filename='data/generated_candidates.json'):
    """Save candidates to JSON file for backup"""
    print(f"\n📄 Saving candidates to JSON: {filename}")
    
    import os
    # Ensure directory exists
    os.makedirs(os.path.dirname(filename), exist_ok=True)
    
    with open(filename, 'w') as f:
        json.dump(candidates, f, indent=2)
    
    print(f"✅ Saved to {filename}")

def save_to_csv(candidates):
    """Export candidates, applications, and tests to CSV files in project root"""
    import csv
    import os
    
    print(f"\n📊 Exporting data to CSV files...")
    
    # Get project root (2 levels up from scripts folder)
    script_dir = os.path.dirname(os.path.abspath(__file__))
    project_root = os.path.dirname(os.path.dirname(script_dir))
    
    # Create CSV files in project root (visible to user)
    candidates_csv = os.path.join(project_root, 'generated_candidates.csv')
    applications_csv = os.path.join(project_root, 'generated_applications.csv')
    tests_csv = os.path.join(project_root, 'generated_tests.csv')
    
    # Export Candidates
    with open(candidates_csv, 'w', newline='', encoding='utf-8') as f:
        writer = csv.writer(f)
        writer.writerow(['candidate_id', 'name', 'email', 'phone', 'experience_years', 
                        'experience_level', 'education', 'certifications'])
        
        for idx, c in enumerate(candidates, 1):
            writer.writerow([
                idx, c['name'], c['email'], c['phone'], c['experience_years'],
                c['experience_level'], c['education'], ', '.join(c['certifications'])
            ])
    
    print(f"✅ Exported {len(candidates)} candidates to {candidates_csv}")
    
    # Export Applications
    with open(applications_csv, 'w', newline='', encoding='utf-8') as f:
        writer = csv.writer(f)
        writer.writerow(['application_id', 'candidate_id', 'role_id', 'job_title', 
                        'status', 'ai_score', 'applied_at', 'matched_skills', 'missing_skills'])
        
        for idx, c in enumerate(candidates, 1):
            writer.writerow([
                idx, idx, c['role_id'], c['role_title'], c['status'], c['ai_score'],
                c['applied_at'], ', '.join(c['matched_skills'][:5]), ', '.join(c['missing_skills'][:3])
            ])
    
    print(f"✅ Exported {len(candidates)} applications to {applications_csv}")
    
    # Export Tests (only for eligible candidates)
    eligible_candidates = [c for c in candidates if c['is_eligible'] and c['test_score']]
    
    with open(tests_csv, 'w', newline='', encoding='utf-8') as f:
        writer = csv.writer(f)
        writer.writerow(['test_id', 'application_id', 'test_score', 'completed_at', 
                        'verified_skills', 'unverified_skills', 'untested_skills'])
        
        for idx, c in enumerate(eligible_candidates, 1):
            app_id = candidates.index(c) + 1
            writer.writerow([
                idx, app_id, c['test_score'], c['applied_at'],
                ', '.join(c['verified_skills'][:5]), ', '.join(c['unverified_skills'][:3]),
                ', '.join(c['untested_skills'][:3])
            ])
    
    print(f"✅ Exported {len(eligible_candidates)} tests to {tests_csv}")
    print(f"\n📁 CSV files created in project root directory")

def print_statistics(candidates):
    """Print overall statistics"""
    print("\n" + "="*60)
    print("📊 GENERATION STATISTICS")
    print("="*60)
    
    total = len(candidates)
    eligible = len([c for c in candidates if c['is_eligible']])
    avg_ai = sum(c['ai_score'] for c in candidates) / total
    avg_test = sum(c['test_score'] for c in candidates if c['test_score']) / eligible if eligible > 0 else 0
    
    print(f"\n📈 Overall Metrics:")
    print(f"   Total Candidates: {total}")
    print(f"   Eligible Candidates: {eligible} ({eligible/total*100:.1f}%)")
    print(f"   Average AI Score: {avg_ai:.1f}%")
    print(f"   Average Test Score: {avg_test:.1f}%")
    
    # Experience distribution
    exp_dist = {}
    for c in candidates:
        level = c['experience_level']
        exp_dist[level] = exp_dist.get(level, 0) + 1
    
    print(f"\n👥 Experience Distribution:")
    for level, count in sorted(exp_dist.items()):
        print(f"   {level.capitalize()}: {count} ({count/total*100:.1f}%)")
    
    # Top skills
    skill_counts = {}
    for c in candidates:
        for skill in c['skills']:
            skill_counts[skill] = skill_counts.get(skill, 0) + 1
    
    top_skills = sorted(skill_counts.items(), key=lambda x: x[1], reverse=True)[:10]
    print(f"\n🔝 Top 10 Skills:")
    for skill, count in top_skills:
        print(f"   {skill}: {count} candidates ({count/total*100:.1f}%)")
    
    print("\n" + "="*60)

if __name__ == "__main__":
    print("\n" + "="*60)
    print("🎯 CYBERSECURITY CANDIDATE DATA GENERATOR")
    print("="*60 + "\n")
    
    # Generate candidates with realistic distribution (~1285 total)
    candidates = generate_all_candidates()
    
    # Print statistics
    print_statistics(candidates)
    
    # Export to CSV files FIRST (in project root) - before database in case of errors
    save_to_csv(candidates)
    
    # Save to JSON backup
    save_to_json(candidates)
    
    # Save to database (last, in case it fails)
    save_to_database(candidates, db_path='backend/database/recruitment.db')
    
    print("\n✅ GENERATION COMPLETE!")
    print(f"🚀 {len(candidates)} candidates ready to use in recruiter dashboard")
    print("📊 CSV files created in project root for tracking")
    print("📅 Application dates: Oct 1, 2024 - Nov 16, 2024\n")
