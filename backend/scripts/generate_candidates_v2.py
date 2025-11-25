"""
Generate Realistic Candidate Data for Cybersecurity ATS
- Uses 20 job roles from jobRoles.js with proper skill matching
- Generates 1000+ candidates following natural application flow
- Realistic dates: job posted → application → test (same day)
- AI scores calculated using job-specific weights
- Test scores only for eligible candidates (AI score >= threshold)
- Skill performance tracking (strong/moderate/weak)
- Updated: November 2024
"""

import json
import random
import sqlite3
from datetime import datetime, timedelta
import os

# Professional names for realistic candidates
FIRST_NAMES = [
    "Sarah", "Michael", "Jennifer", "David", "Emily", "James", "Jessica", "Robert",
    "Ashley", "William", "Amanda", "Christopher", "Melissa", "Matthew", "Michelle",
    "Daniel", "Kimberly", "Joseph", "Lisa", "Andrew", "Angela", "Ryan", "Heather",
    "Brandon", "Nicole", "Jason", "Amy", "Justin", "Rebecca", "Kevin", "Laura",
    "Brian", "Stephanie", "Eric", "Rachel", "Steven", "Lauren", "Thomas", "Hannah",
    "Mark", "Samantha", "Paul", "Elizabeth", "John", "Maria", "Richard", "Susan"
]

LAST_NAMES = [
    "Johnson", "Williams", "Brown", "Davis", "Miller", "Wilson", "Moore", "Taylor",
    "Anderson", "Thomas", "Jackson", "White", "Harris", "Martin", "Thompson", "Garcia",
    "Martinez", "Robinson", "Clark", "Rodriguez", "Lewis", "Lee", "Walker", "Hall",
    "Allen", "Young", "King", "Wright", "Lopez", "Hill", "Scott", "Green", "Adams",
    "Baker", "Nelson", "Carter", "Mitchell", "Perez", "Roberts", "Turner", "Phillips",
    "Campbell", "Parker", "Evans", "Edwards", "Collins", "Stewart", "Morris", "Rogers"
]

EMAIL_DOMAINS = ["gmail.com", "outlook.com", "yahoo.com", "protonmail.com", "icloud.com", "hotmail.com"]

def generate_realistic_name():
    """Generate a realistic professional name"""
    return f"{random.choice(FIRST_NAMES)} {random.choice(LAST_NAMES)}"

def generate_realistic_email(name, used_emails=None):
    """Generate a realistic professional email (guaranteed unique)"""
    if used_emails is None:
        used_emails = set()
    
    first, last = name.lower().split()
    domain = random.choice(EMAIL_DOMAINS)
    
    # Try different formats until we find a unique one
    attempts = 0
    while attempts < 100:
        if attempts < 20:
            # First 20 attempts: try standard formats
            formats = [
                f"{first}.{last}@{domain}",
                f"{first}{last}@{domain}",
                f"{first[0]}{last}@{domain}",
            ]
            email = random.choice(formats)
        else:
            # After 20 attempts: add numbers
            email = f"{first}.{last}{random.randint(1,9999)}@{domain}"
        
        if email not in used_emails:
            used_emails.add(email)
            return email
        
        attempts += 1
    
    # Fallback: use timestamp
    import time
    email = f"{first}.{last}.{int(time.time())}@{domain}"
    used_emails.add(email)
    return email

def generate_realistic_phone():
    """Generate a realistic US phone number"""
    area_code = random.randint(200, 999)
    exchange = random.randint(200, 999)
    number = random.randint(1000, 9999)
    return f"+1-{area_code}-{exchange}-{number}"

def get_experience_level(years):
    """Determine experience level based on years"""
    if years <= 2:
        return 'entry'
    elif years <= 7:
        return 'mid'
    else:
        return 'senior'

def generate_job_posted_date():
    """
    Generate realistic job posted date (30-60 days ago)
    Mix of older and newer postings
    """
    days_ago = random.randint(30, 60)
    posted_date = datetime.now() - timedelta(days=days_ago)
    return posted_date

def generate_application_date(job_posted_date):
    """
    Generate application date after job posting
    Distribution: 40% week 1, 30% week 2-3, 30% week 4+
    """
    days_since_posted = (datetime.now() - job_posted_date).days
    
    # Determine which period this application falls into
    rand = random.random()
    
    if rand < 0.40:  # 40% in first week
        days_after = random.randint(1, min(7, days_since_posted))
    elif rand < 0.70:  # 30% in middle period
        days_after = random.randint(8, min(21, days_since_posted))
    else:  # 30% in recent period
        days_after = random.randint(max(22, days_since_posted - 7), days_since_posted)
    
    application_date = job_posted_date + timedelta(days=days_after)
    
    # Add random time during business hours (8 AM - 6 PM)
    hour = random.randint(8, 18)
    minute = random.randint(0, 59)
    application_date = application_date.replace(hour=hour, minute=minute, second=0)
    
    return application_date

def generate_test_completion_date(application_date):
    """
    Generate test completion date (same day as application, few hours later)
    """
    # Test completed 2-6 hours after application
    hours_later = random.randint(2, 6)
    test_date = application_date + timedelta(hours=hours_later)
    return test_date

def generate_skills_for_candidate(job_role, experience_years, quality_tier):
    """
    Generate realistic skills based on job requirements and candidate quality
    
    Quality tiers:
    - excellent (25%): 80-90% of required skills
    - good (50%): 65-75% of required skills  
    - average (20%): 55-65% of required skills
    - poor (5%): 40-55% of required skills
    """
    required_skills = job_role['skillKeywords']
    
    # Determine skill match percentage based on quality tier
    if quality_tier == 'excellent':
        match_percentage = random.uniform(0.80, 0.90)
    elif quality_tier == 'good':
        match_percentage = random.uniform(0.65, 0.75)
    elif quality_tier == 'average':
        match_percentage = random.uniform(0.55, 0.65)
    else:  # poor
        match_percentage = random.uniform(0.40, 0.55)
    
    # Calculate how many required skills to include
    num_required_skills = int(len(required_skills) * match_percentage)
    num_required_skills = max(1, num_required_skills)  # At least 1 skill
    
    # Select random required skills
    candidate_skills = random.sample(required_skills, num_required_skills)
    
    # Add some additional related skills (1-3 skills)
    additional_skills = [
        'Python', 'PowerShell', 'Bash', 'SIEM', 'Splunk', 'AWS', 'Azure',
        'Docker', 'Kubernetes', 'Git', 'Linux', 'Windows Server',
        'TCP/IP', 'Wireshark', 'Nmap', 'Burp Suite'
    ]
    
    num_additional = random.randint(1, 3)
    for skill in random.sample(additional_skills, num_additional):
        if skill not in candidate_skills:
            candidate_skills.append(skill)
    
    return candidate_skills

def generate_certifications_for_candidate(job_role, experience_years, quality_tier):
    """
    Generate realistic certifications based on job requirements and quality
    """
    required_certs = job_role.get('certifications', [])
    
    if not required_certs:
        return []
    
    # Determine cert match based on quality tier
    if quality_tier == 'excellent':
        match_percentage = random.uniform(0.40, 0.60)
    elif quality_tier == 'good':
        match_percentage = random.uniform(0.20, 0.40)
    elif quality_tier == 'average':
        match_percentage = random.uniform(0.10, 0.25)
    else:  # poor
        match_percentage = random.uniform(0.0, 0.15)
    
    num_certs = int(len(required_certs) * match_percentage)
    num_certs = max(0, min(num_certs, len(required_certs)))
    
    if num_certs == 0:
        return []
    
    return random.sample(required_certs, num_certs)

def check_education_match(candidate_education, job_education):
    """Check if candidate education matches job requirement"""
    # Simple matching - in production, use more sophisticated logic
    candidate_lower = candidate_education.lower()
    job_lower = job_education.lower()
    
    # Check for degree level match
    if "bachelor" in job_lower and "bachelor" in candidate_lower:
        return True
    if "master" in job_lower and "master" in candidate_lower:
        return True
    if "associate" in job_lower and ("associate" in candidate_lower or "bachelor" in candidate_lower):
        return True
    
    # Check for field match
    fields = ["cybersecurity", "computer science", "information", "technology", "security"]
    for field in fields:
        if field in job_lower and field in candidate_lower:
            return True
    
    return False

def calculate_experience_match(candidate_years, job_range):
    """Calculate how well candidate experience matches job requirements"""
    min_years = job_range['min']
    max_years = job_range['max']
    
    if min_years <= candidate_years <= max_years:
        return 1.0  # Perfect match
    elif candidate_years < min_years:
        # Under-qualified
        diff = min_years - candidate_years
        return max(0.5, 1.0 - (diff * 0.15))
    else:
        # Over-qualified (not as bad as under-qualified)
        diff = candidate_years - max_years
        return max(0.7, 1.0 - (diff * 0.10))

def estimate_task_capability(matched_skills, required_skills, experience_match, cert_match):
    """
    Estimate candidate's ability to perform job tasks
    Based on: skills (50%), experience (30%), certifications (20%)
    """
    skill_factor = len(matched_skills) / max(len(required_skills), 1)
    
    task_capability = (
        skill_factor * 0.5 +
        experience_match * 0.3 +
        cert_match * 0.2
    )
    
    return task_capability

def calculate_ai_score(candidate, job_role):
    """
    Calculate AI score using job-specific weights
    Matches the exact logic from jobRoles.js
    """
    weights = job_role['weights']
    required_skills = job_role['skillKeywords']
    required_certs = job_role.get('certifications', [])
    
    # 1. Skills match (using job's skills weight)
    matched_skills = [s for s in candidate['skills'] if s in required_skills]
    skill_match = len(matched_skills) / max(len(required_skills), 1)
    skill_score = skill_match * 100 * weights['skills']
    
    # 2. Experience/Knowledge match (using job's knowledge weight)
    exp_match = calculate_experience_match(candidate['experience_years'], job_role['experienceRange'])
    knowledge_score = exp_match * 100 * weights['knowledge']
    
    # 3. Tasks capability (using job's tasks weight)
    cert_match = len(candidate['certifications']) / max(len(required_certs), 1) if required_certs else 0.5
    task_capability = estimate_task_capability(matched_skills, required_skills, exp_match, cert_match)
    task_score = task_capability * 100 * weights['tasks']
    
    # 4. Certifications match (using job's certifications weight)
    cert_score = cert_match * 100 * weights['certifications']
    
    # 5. Education match (using job's education weight)
    edu_match = 1.0 if check_education_match(candidate['education'], job_role['education']) else 0.5
    edu_score = edu_match * 100 * weights['education']
    
    # Total AI score
    ai_score = skill_score + knowledge_score + task_score + cert_score + edu_score
    
    # Store matched skills for later use
    candidate['matched_skills'] = matched_skills
    candidate['missing_skills'] = [s for s in required_skills if s not in matched_skills]
    
    return round(ai_score, 1)

def generate_test_score_and_performance(candidate, job_role):
    """
    Generate realistic test score and skill performance
    Only called for eligible candidates
    """
    # Base test score correlates somewhat with AI score but has variation
    ai_score = candidate['ai_score']
    
    # Add randomness: ±15 points from AI score
    variation = random.uniform(-15, 15)
    test_score = ai_score + variation
    
    # Clamp to realistic range (40-95)
    test_score = max(40, min(95, test_score))
    
    # Generate skill performance breakdown
    skill_performance = {}
    matched_skills = candidate['matched_skills']
    
    for skill in matched_skills:
        # Skills candidate has: 50-100% correct
        correct_rate = random.uniform(0.50, 1.0)
        
        # Adjust based on test score
        if test_score >= 80:
            correct_rate = random.uniform(0.70, 1.0)
        elif test_score >= 65:
            correct_rate = random.uniform(0.50, 0.85)
        else:
            correct_rate = random.uniform(0.40, 0.70)
        
        # Assume 2 questions per skill
        total_questions = 2
        correct_questions = int(total_questions * correct_rate)
        percentage = int((correct_questions / total_questions) * 100)
        
        # Determine level
        if percentage >= 80:
            level = 'strong'
        elif percentage >= 50:
            level = 'moderate'
        else:
            level = 'weak'
        
        skill_performance[skill] = {
            'correct': correct_questions,
            'total': total_questions,
            'percentage': percentage,
            'level': level
        }
    
    # Add some skills candidate doesn't have (they'll perform poorly)
    missing_skills = candidate['missing_skills']
    for skill in random.sample(missing_skills, min(2, len(missing_skills))):
        skill_performance[skill] = {
            'correct': 0,
            'total': 2,
            'percentage': 0,
            'level': 'weak'
        }
    
    return round(test_score, 1), skill_performance

def calculate_composite_score(ai_score, test_score, experience_level):
    """
    Calculate composite score with experience-based weighting
    """
    weights = {
        'entry': {'ai': 0.4, 'test': 0.6},   # Test matters more for juniors
        'mid': {'ai': 0.5, 'test': 0.5},     # Balanced
        'senior': {'ai': 0.6, 'test': 0.4}   # Experience matters more
    }
    
    w = weights.get(experience_level, weights['mid'])
    composite = (ai_score * w['ai']) + (test_score * w['test'])
    
    return round(composite, 1)


def get_job_roles():
    """
    Return the 20 cybersecurity job roles matching jobRoles.js
    Each role includes: id, title, skillKeywords, certifications, education,
    experienceRange, weights, thresholdScore, testCategory
    """
    return [
        {
            'id': '1',
            'title': 'Incident Response Analyst',
            'skillKeywords': ['Incident Response', 'Digital evidence collection', 'forensic processing', 
                            'malware analysis', 'network traffic analysis', 'log analysis', 
                            'vulnerability triage', 'threat containment', 'alert triage', 'IOC detection'],
            'certifications': ['CompTIA Security+', 'EC-Council Certified Incident Handler (ECIH)', 
                             'GIAC Certified Incident Handler (GCIH)', 'CompTIA CySA+', 
                             'GIAC Forensic Analyst (GCFA)'],
            'education': "Bachelor's degree in Cybersecurity, Computer Science, Information Security",
            'experienceRange': {'min': 2, 'max': 5},
            'weights': {'skills': 0.35, 'knowledge': 0.25, 'tasks': 0.20, 'certifications': 0.10, 'education': 0.10},
            'thresholdScore': 60,
            'testCategory': 'incident_response'
        },
        {
            'id': '2',
            'title': 'Threat Analysis Analyst',
            'skillKeywords': ['Threat analysis', 'Threat hunting', 'Network threat identification',
                            'Data querying', 'Metadata analysis', 'Virtual machine operations',
                            'Security reporting', 'Threat intelligence', 'Data collection'],
            'certifications': ['CompTIA Security+', 'EC-Council Certified Threat Intelligence Analyst (CTIA)',
                             'GIAC Cyber Threat Intelligence (GCTI)', 'CompTIA CySA+'],
            'education': "Bachelor's degree in Cybersecurity, Information Technology, Computer Science",
            'experienceRange': {'min': 1, 'max': 3},
            'weights': {'skills': 0.40, 'knowledge': 0.30, 'tasks': 0.20, 'certifications': 0.05, 'education': 0.05},
            'thresholdScore': 60,
            'testCategory': 'threat_analysis'
        },
        {
            'id': '3',
            'title': 'Defensive Cybersecurity Analyst',
            'skillKeywords': ['Network defense', 'Threat detection', 'Traffic analysis', 'Log analysis',
                            'Vulnerability identification', 'Security monitoring', 'Anomaly detection',
                            'Security tool evaluation'],
            'certifications': ['CompTIA Security+', 'CompTIA CySA+', 'EC-Council Certified SOC Analyst (CSA)',
                             'GIAC Certified Defense Analyst (GCDA)'],
            'education': "Bachelor's degree in Cybersecurity, Information Technology, Computer Science",
            'experienceRange': {'min': 1, 'max': 3},
            'weights': {'skills': 0.45, 'knowledge': 0.30, 'tasks': 0.15, 'certifications': 0.05, 'education': 0.05},
            'thresholdScore': 60,
            'testCategory': 'defensive_cybersecurity'
        },
        {
            'id': '4',
            'title': 'Digital Forensics Investigator',
            'skillKeywords': ['Digital Evidence Handling', 'Evidence Collection', 'Evidence Processing',
                            'Memory Forensics', 'File System Forensics', 'Log Analysis',
                            'Forensic Analysis', 'Technical Reporting'],
            'certifications': ['GIAC Certified Forensic Analyst (GCFA)', 'GIAC Certified Forensic Examiner (GCFE)',
                             'Certified Forensic Computer Examiner (CFCE)', 'CompTIA CySA+',
                             'EnCase Certified Examiner (EnCE)'],
            'education': "Bachelor's degree in Cybersecurity, Digital Forensics, IT, Computer Science",
            'experienceRange': {'min': 3, 'max': 7},
            'weights': {'skills': 0.40, 'knowledge': 0.30, 'tasks': 0.20, 'certifications': 0.05, 'education': 0.05},
            'thresholdScore': 65,
            'testCategory': 'digital_forensics'
        },
        {
            'id': '5',
            'title': 'Insider Threat Analyst',
            'skillKeywords': ['threat analysis', 'behavioral analysis', 'data analysis', 'log analysis',
                            'pattern detection', 'report writing', 'insider threat investigation'],
            'certifications': ['CompTIA Security+', 'EC-Council Certified Threat Intelligence Analyst (CTIA)',
                             'GIAC Cyber Threat Intelligence (GCTI)', 'CompTIA CySA+'],
            'education': "Bachelor's in Cybersecurity, Computer Science, Information Systems, Psychology",
            'experienceRange': {'min': 1, 'max': 4},
            'weights': {'skills': 0.40, 'knowledge': 0.30, 'tasks': 0.20, 'certifications': 0.05, 'education': 0.05},
            'thresholdScore': 60,
            'testCategory': 'insider_threat'
        },
        {
            'id': '6',
            'title': 'Vulnerability Analyst',
            'skillKeywords': ['vulnerability scanning', 'risk assessment', 'network analysis',
                            'application security', 'threat identification', 'security auditing',
                            'policy compliance'],
            'certifications': ['CompTIA Security+', 'CompTIA CySA+', 'EC-Council CEH (Certified Ethical Hacker)',
                             'CompTIA PenTest+'],
            'education': "Bachelor's degree in Cybersecurity, Computer Science, Information Technology",
            'experienceRange': {'min': 2, 'max': 5},
            'weights': {'skills': 0.40, 'knowledge': 0.30, 'tasks': 0.20, 'certifications': 0.05, 'education': 0.05},
            'thresholdScore': 60,
            'testCategory': 'vulnerability_analysis'
        },
        {
            'id': '7',
            'title': 'Cybersecurity Policy & Planning Analyst',
            'skillKeywords': ['cybersecurity policy', 'governance', 'risk management', 'compliance',
                            'strategic planning', 'policy development', 'regulatory alignment'],
            'certifications': ['ISACA CISM', 'ISC2 CGRC', 'ISO 27001 Lead Implementer or Lead Auditor',
                             'IAPP CIPM', 'Associate of ISC2'],
            'education': "Bachelor's degree in Information Security, IT Management, Business Administration",
            'experienceRange': {'min': 2, 'max': 5},
            'weights': {'skills': 0.40, 'knowledge': 0.30, 'tasks': 0.20, 'certifications': 0.05, 'education': 0.05},
            'thresholdScore': 60,
            'testCategory': 'policy_and_governance'
        },
        {
            'id': '8',
            'title': 'Privacy Governance Analyst',
            'skillKeywords': ['privacy compliance', 'privacy impact assessment', 'data governance',
                            'regulatory compliance', 'privacy policies', 'PII protection',
                            'privacy risk assessment'],
            'certifications': ['IAPP CIPM (Certified Information Privacy Manager)', 'IAPP CIPP/US or CIPP/E',
                             'ISO 27701 Lead Implementer', 'CompTIA Security+'],
            'education': "Bachelor's degree in Information Security, Privacy Management, Law",
            'experienceRange': {'min': 2, 'max': 5},
            'weights': {'skills': 0.40, 'knowledge': 0.30, 'tasks': 0.20, 'certifications': 0.05, 'education': 0.05},
            'thresholdScore': 60,
            'testCategory': 'privacy_compliance'
        },
        {
            'id': '9',
            'title': 'Junior Security Control Assessor',
            'skillKeywords': ['security controls', 'RMF', 'control assessment', 'risk analysis',
                            'evidence collection', 'security authorization', 'compliance review'],
            'certifications': ['CompTIA Security+', 'ISC2 Associate', 'ISO 27001 Foundation', 'CompTIA CySA+'],
            'education': "Associate's or Bachelor's degree in Cybersecurity, Information Systems",
            'experienceRange': {'min': 0, 'max': 2},
            'weights': {'skills': 0.40, 'knowledge': 0.30, 'tasks': 0.20, 'certifications': 0.05, 'education': 0.05},
            'thresholdScore': 60,
            'testCategory': 'security_control_assessment'
        },
        {
            'id': '10',
            'title': 'Cybersecurity Architect',
            'skillKeywords': ['security architecture', 'secure design', 'risk management', 'defense in depth',
                            'network segmentation', 'system security engineering', 'architecture analysis'],
            'certifications': ['ISC2 CISSP', 'ISACA CISM', 'Cisco CCNP Security or CCSP',
                             'AWS Solutions Architect – Security Specialty', 'SABSA Foundation'],
            'education': "Bachelor's degree in Cybersecurity, Computer Science, Information Technology",
            'experienceRange': {'min': 3, 'max': 6},
            'weights': {'skills': 0.40, 'knowledge': 0.30, 'tasks': 0.20, 'certifications': 0.05, 'education': 0.05},
            'thresholdScore': 60,
            'testCategory': 'cybersecurity_architecture'
        },
        {
            'id': '11',
            'title': 'Secure Software Engineer',
            'skillKeywords': ['secure coding', 'software security', 'input validation', 'error handling',
                            'static code analysis', 'threat modeling', 'secure SDLC'],
            'certifications': ['GIAC GSSP', 'CSSLP', 'CompTIA PenTest+', 'AWS or Microsoft Developer Certification'],
            'education': "Bachelor's in Computer Science, Software Engineering, Cybersecurity",
            'experienceRange': {'min': 2, 'max': 5},
            'weights': {'skills': 0.40, 'knowledge': 0.30, 'tasks': 0.20, 'certifications': 0.05, 'education': 0.05},
            'thresholdScore': 60,
            'testCategory': 'secure_software_development'
        },
        {
            'id': '12',
            'title': 'Secure Systems Engineer',
            'skillKeywords': ['secure system design', 'system hardening', 'risk analysis',
                            'vulnerability identification', 'secure configuration', 'system security testing',
                            'secure SDLC'],
            'certifications': ['CompTIA Security+', 'CompTIA CySA+', 'GIAC GSEC',
                             'Microsoft or Linux systems engineering certifications'],
            'education': "Bachelor's degree in Information Technology, Cybersecurity, Systems Engineering",
            'experienceRange': {'min': 2, 'max': 5},
            'weights': {'skills': 0.40, 'knowledge': 0.30, 'tasks': 0.20, 'certifications': 0.05, 'education': 0.05},
            'thresholdScore': 60,
            'testCategory': 'secure_systems_development'
        },
        {
            'id': '13',
            'title': 'Software Security Analyst',
            'skillKeywords': ['application security', 'secure code review', 'static analysis', 'threat modeling',
                            'vulnerability analysis', 'secure SDLC', 'software risk assessment'],
            'certifications': ['GIAC GWAPT or GSSP', 'CompTIA PenTest+', 'CSSLP',
                             'Vendor secure development certifications'],
            'education': "Bachelor's in Computer Science, Software Engineering, Cybersecurity",
            'experienceRange': {'min': 1, 'max': 4},
            'weights': {'skills': 0.40, 'knowledge': 0.30, 'tasks': 0.20, 'certifications': 0.05, 'education': 0.05},
            'thresholdScore': 60,
            'testCategory': 'software_security_assessment'
        },
        {
            'id': '14',
            'title': 'Systems Security Analyst',
            'skillKeywords': ['system hardening', 'vulnerability management', 'security monitoring',
                            'configuration management', 'access control', 'risk mitigation'],
            'certifications': ['CompTIA Security+', 'CompTIA CySA+', 'GIAC GSEC'],
            'education': "Bachelor's degree in Cybersecurity, IT, Computer Science",
            'experienceRange': {'min': 1, 'max': 3},
            'weights': {'skills': 0.40, 'knowledge': 0.30, 'tasks': 0.20, 'certifications': 0.05, 'education': 0.05},
            'thresholdScore': 60,
            'testCategory': 'systems_security_analysis'
        },
        {
            'id': '15',
            'title': 'Network Operations Analyst',
            'skillKeywords': ['network monitoring', 'routing', 'switching', 'network security', 'firewalls',
                            'vulnerability patching', 'troubleshooting'],
            'certifications': ['CompTIA Network+', 'Cisco CCNA', 'CompTIA Security+'],
            'education': "Associate's or Bachelor's degree in Information Technology, Networking, Cybersecurity",
            'experienceRange': {'min': 1, 'max': 3},
            'weights': {'skills': 0.40, 'knowledge': 0.30, 'tasks': 0.20, 'certifications': 0.05, 'education': 0.05},
            'thresholdScore': 60,
            'testCategory': 'network_operations'
        },
        {
            'id': '16',
            'title': 'Database Security Analyst',
            'skillKeywords': ['database administration', 'SQL', 'backup and recovery', 'performance tuning',
                            'data integrity', 'db security', 'database monitoring'],
            'certifications': ['Microsoft SQL Server (MCSA)', 'Oracle Database Associate', 'CompTIA Data+',
                             'AWS/Azure database specialty certifications'],
            'education': "Bachelor's degree in Computer Science, Information Systems, IT",
            'experienceRange': {'min': 1, 'max': 3},
            'weights': {'skills': 0.40, 'knowledge': 0.30, 'tasks': 0.20, 'certifications': 0.05, 'education': 0.05},
            'thresholdScore': 60,
            'testCategory': 'database_administration'
        },
        {
            'id': '17',
            'title': 'Cybersecurity Systems Administrator',
            'skillKeywords': ['system hardening', 'patch management', 'user access management',
                            'server configuration', 'backup and recovery', 'os administration',
                            'security monitoring'],
            'certifications': ['CompTIA Security+', 'CompTIA Linux+ or Server+',
                             'Microsoft or Linux system administration certifications'],
            'education': "Associate's or Bachelor's in Information Technology, Cybersecurity, Computer Science",
            'experienceRange': {'min': 1, 'max': 3},
            'weights': {'skills': 0.40, 'knowledge': 0.30, 'tasks': 0.20, 'certifications': 0.05, 'education': 0.05},
            'thresholdScore': 60,
            'testCategory': 'systems_administration'
        },
        {
            'id': '18',
            'title': 'Cybersecurity Data Analyst',
            'skillKeywords': ['data analysis', 'anomaly detection', 'metric development', 'threat analytics',
                            'data quality validation', 'statistical analysis', 'cybersecurity insights'],
            'certifications': ['CompTIA Data+', 'Google/AWS/Azure Data Analytics certifications',
                             'ISC2 CC or Security+'],
            'education': "Bachelor's degree in Data Science, Cybersecurity, Computer Science, Information Systems",
            'experienceRange': {'min': 1, 'max': 3},
            'weights': {'skills': 0.40, 'knowledge': 0.30, 'tasks': 0.20, 'certifications': 0.05, 'education': 0.05},
            'thresholdScore': 60,
            'testCategory': 'cyber_data_analysis'
        },
        {
            'id': '19',
            'title': 'Cybercrime Investigator',
            'skillKeywords': ['digital evidence', 'log analysis', 'forensics', 'chain of custody',
                            'threat analysis', 'intrusion investigation', 'artifact examination'],
            'certifications': ['CompTIA CySA+', 'CompTIA Security+', 'EC-Council CHFI', 'GIAC GCIH or GCFA'],
            'education': "Bachelor's degree in Cybersecurity, Digital Forensics, Computer Science, Criminal Justice",
            'experienceRange': {'min': 1, 'max': 3},
            'weights': {'skills': 0.40, 'knowledge': 0.30, 'tasks': 0.20, 'certifications': 0.05, 'education': 0.05},
            'thresholdScore': 60,
            'testCategory': 'cybercrime_investigation'
        },
        {
            'id': '20',
            'title': 'Digital Evidence Analyst',
            'skillKeywords': ['digital forensics', 'evidence preservation', 'drive imaging', 'file system analysis',
                            'memory analysis', 'artifact analysis', 'chain of custody', 'log analysis'],
            'certifications': ['CompTIA Security+', 'CompTIA CySA+', 'CHFI', 'GIAC GCFA or GCIH'],
            'education': "Associate's or Bachelor's degree in Digital Forensics, Cybersecurity, Information Technology",
            'experienceRange': {'min': 1, 'max': 3},
            'weights': {'skills': 0.40, 'knowledge': 0.30, 'tasks': 0.20, 'certifications': 0.05, 'education': 0.05},
            'thresholdScore': 60,
            'testCategory': 'digital_evidence_analysis'
        }
    ]

def get_candidate_distribution():
    """
    Define how many candidates each role should get
    Total: ~1005 candidates
    
    Popular roles: 60-70 candidates
    Mid-popularity: 45-55 candidates
    Niche roles: 30-40 candidates
    """
    return {
        '1': 65,   # Incident Response Analyst (popular)
        '2': 60,   # Threat Analysis Analyst (popular)
        '3': 65,   # Defensive Cybersecurity Analyst (popular)
        '4': 50,   # Digital Forensics Investigator
        '5': 40,   # Insider Threat Analyst
        '6': 60,   # Vulnerability Analyst (popular)
        '7': 35,   # Cybersecurity Policy & Planning Analyst
        '8': 35,   # Privacy Governance Analyst
        '9': 30,   # Junior Security Control Assessor
        '10': 50,  # Cybersecurity Architect
        '11': 50,  # Secure Software Engineer
        '12': 40,  # Secure Systems Engineer
        '13': 50,  # Software Security Analyst
        '14': 50,  # Systems Security Analyst
        '15': 50,  # Network Operations Analyst
        '16': 40,  # Database Security Analyst
        '17': 45,  # Cybersecurity Systems Administrator
        '18': 40,  # Cybersecurity Data Analyst
        '19': 35,  # Cybercrime Investigator
        '20': 35   # Digital Evidence Analyst
    }


def generate_candidate_for_job(job_role, job_posted_date, quality_tier, used_emails=None):
    """
    Generate a single realistic candidate for a job role
    Follows natural flow: job posted → application → AI analysis → test (if eligible)
    """
    if used_emails is None:
        used_emails = set()
    
    # Generate basic info
    name = generate_realistic_name()
    email = generate_realistic_email(name, used_emails)
    phone = generate_realistic_phone()
    
    # Generate experience within or near job range
    exp_range = job_role['experienceRange']
    if quality_tier in ['excellent', 'good']:
        # Good candidates have appropriate experience
        experience_years = random.randint(exp_range['min'], exp_range['max'])
    else:
        # Average/poor candidates might be under/over qualified
        if random.random() < 0.5:
            experience_years = random.randint(max(0, exp_range['min'] - 2), exp_range['min'])
        else:
            experience_years = random.randint(exp_range['min'], exp_range['max'] + 2)
    
    experience_level = get_experience_level(experience_years)
    
    # Generate education
    education_options = [
        "Bachelor's degree in Cybersecurity",
        "Bachelor's degree in Computer Science",
        "Bachelor's degree in Information Technology",
        "Master's degree in Cybersecurity",
        "Master's degree in Information Security",
        "Associate's degree in Cybersecurity"
    ]
    education = random.choice(education_options)
    
    # Generate skills and certifications based on quality tier
    skills = generate_skills_for_candidate(job_role, experience_years, quality_tier)
    certifications = generate_certifications_for_candidate(job_role, experience_years, quality_tier)
    
    # Create candidate object
    candidate = {
        'name': name,
        'email': email,
        'phone': phone,
        'experience_years': experience_years,
        'experience_level': experience_level,
        'education': education,
        'skills': skills,
        'certifications': certifications,
        'role_id': job_role['id'],
        'role_title': job_role['title']
    }
    
    # Calculate AI score using job-specific weights
    ai_score = calculate_ai_score(candidate, job_role)
    candidate['ai_score'] = ai_score
    
    # Check eligibility against job threshold
    threshold = job_role['thresholdScore']
    is_eligible = ai_score >= threshold
    candidate['is_eligible'] = is_eligible
    candidate['threshold'] = threshold
    
    # Generate application date (after job posted)
    application_date = generate_application_date(job_posted_date)
    candidate['applied_at'] = application_date
    
    # If eligible, generate test score and performance
    if is_eligible:
        test_score, skill_performance = generate_test_score_and_performance(candidate, job_role)
        candidate['test_score'] = test_score
        candidate['skill_performance'] = skill_performance
        
        # Calculate composite score
        composite_score = calculate_composite_score(ai_score, test_score, experience_level)
        candidate['composite_score'] = composite_score
        
        # Test completed same day as application
        test_completed_at = generate_test_completion_date(application_date)
        candidate['test_completed_at'] = test_completed_at
        
        # Status
        candidate['status'] = 'test_completed'
    else:
        # Not eligible - no test
        candidate['test_score'] = None
        candidate['skill_performance'] = {}
        candidate['composite_score'] = None
        candidate['test_completed_at'] = None
        candidate['status'] = 'not_eligible'
    
    return candidate

def generate_all_candidates():
    """
    Generate all candidates for all 20 job roles
    Total: ~1005 candidates with realistic distribution
    """
    print("\n" + "="*70)
    print("🚀 GENERATING REALISTIC CANDIDATE DATA")
    print("="*70)
    
    job_roles = get_job_roles()
    distribution = get_candidate_distribution()
    
    all_candidates = []
    job_posted_dates = {}
    used_emails = set()  # Track used emails for uniqueness
    
    # Generate job posted dates for all roles
    print("\n📅 Generating job posted dates...")
    for role in job_roles:
        job_posted_dates[role['id']] = generate_job_posted_date()
        print(f"   Job {role['id']}: {role['title']} - Posted {(datetime.now() - job_posted_dates[role['id']]).days} days ago")
    
    print("\n👥 Generating candidates...")
    
    # Quality distribution: 25% excellent, 50% good, 20% average, 5% poor
    quality_tiers = ['excellent', 'good', 'average', 'poor']
    quality_weights = [0.25, 0.50, 0.20, 0.05]
    
    for role in job_roles:
        role_id = role['id']
        num_candidates = distribution[role_id]
        job_posted_date = job_posted_dates[role_id]
        
        print(f"\n   📋 {role['title']} (Role {role_id})")
        print(f"      Generating {num_candidates} candidates...")
        
        role_candidates = []
        
        for i in range(num_candidates):
            # Assign quality tier based on distribution
            quality_tier = random.choices(quality_tiers, weights=quality_weights)[0]
            
            candidate = generate_candidate_for_job(role, job_posted_date, quality_tier, used_emails)
            candidate['job_posted_date'] = job_posted_date
            role_candidates.append(candidate)
        
        # Calculate statistics for this role
        eligible = len([c for c in role_candidates if c['is_eligible']])
        avg_ai = sum(c['ai_score'] for c in role_candidates) / len(role_candidates)
        avg_test = sum(c['test_score'] for c in role_candidates if c['test_score']) / eligible if eligible > 0 else 0
        
        print(f"      ✅ Generated {num_candidates} candidates")
        print(f"      📊 Eligible: {eligible}/{num_candidates} ({eligible/num_candidates*100:.1f}%)")
        print(f"      📈 Avg AI Score: {avg_ai:.1f}%")
        if eligible > 0:
            print(f"      📈 Avg Test Score: {avg_test:.1f}%")
        
        all_candidates.extend(role_candidates)
    
    print(f"\n✅ Total candidates generated: {len(all_candidates)}")
    
    return all_candidates, job_posted_dates

def save_to_database(candidates, job_posted_dates, db_path='backend/database/recruitment.db'):
    """
    Save generated candidates to SQLite database
    Clears existing data and inserts fresh data
    """
    print(f"\n💾 Saving {len(candidates)} candidates to database...")
    print(f"   Database: {db_path}")
    
    conn = sqlite3.connect(db_path)
    cursor = conn.cursor()
    
    try:
        # Clear existing data
        print("\n🗑️  Clearing existing data...")
        cursor.execute("DELETE FROM decisions")
        cursor.execute("DELETE FROM tests")
        cursor.execute("DELETE FROM ai_analysis")
        cursor.execute("DELETE FROM applications")
        cursor.execute("DELETE FROM candidates")
        cursor.execute("DELETE FROM job_roles")
        conn.commit()
        print("   ✅ Existing data cleared")
        
        # Insert job roles with created_at dates (using posted date)
        print("\n📋 Inserting job roles...")
        job_roles = get_job_roles()
        for role in job_roles:
            posted_date = job_posted_dates[role['id']]
            cursor.execute("""
                INSERT INTO job_roles (
                    role_id, title, description, requirements, 
                    min_ai_threshold, salary_min, salary_max,
                    status, recruiter_id, created_at
                ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
            """, (
                role['id'],
                role['title'],
                f"Cybersecurity position: {role['title']}",
                json.dumps({
                    'skills': role['skillKeywords'],
                    'certifications': role['certifications'],
                    'education': role['education'],
                    'experience': role['experienceRange']
                }),
                role['thresholdScore'],  # min_ai_threshold
                80000,  # salary_min
                150000,  # salary_max
                'active',  # status
                1,  # recruiter_id = 1
                posted_date.isoformat()  # created_at (job posted date)
            ))
        conn.commit()
        print(f"   ✅ Inserted {len(job_roles)} job roles")
        
        # Insert candidates and related data
        print("\n👥 Inserting candidates...")
        for idx, candidate in enumerate(candidates, 1):
            # Insert candidate
            cursor.execute("""
                INSERT INTO candidates (name, email, phone, resume_path)
                VALUES (?, ?, ?, ?)
            """, (
                candidate['name'],
                candidate['email'],
                candidate['phone'],
                f"uploads/resume_{idx}.pdf"
            ))
            
            candidate_id = cursor.lastrowid
            
            # Insert application
            cursor.execute("""
                INSERT INTO applications (candidate_id, role_id, status, applied_at, updated_at)
                VALUES (?, ?, ?, ?, ?)
            """, (
                candidate_id,
                candidate['role_id'],
                candidate['status'],
                candidate['applied_at'].isoformat(),
                candidate['applied_at'].isoformat()
            ))
            
            application_id = cursor.lastrowid
            
            # Insert AI analysis
            cursor.execute("""
                INSERT INTO ai_analysis (
                    application_id, ai_score, skills_matched, skill_gaps,
                    experience_years, experience_level,
                    education, certifications
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
            
            # Insert test results (only if eligible)
            if candidate['is_eligible']:
                cursor.execute("""
                    INSERT INTO tests (
                        application_id, test_token, test_score,
                        started_at, completed_at, duration_minutes,
                        answers, verified_skills, unverified_skills,
                        untested_skills, verification_details
                    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
                """, (
                    application_id,
                    f"test_{application_id}_{int(candidate['applied_at'].timestamp())}",
                    candidate['test_score'],
                    candidate['applied_at'].isoformat(),
                    candidate['test_completed_at'].isoformat(),
                    random.randint(20, 40),  # Test duration
                    json.dumps([]),  # Empty answers array
                    json.dumps([s for s, p in candidate['skill_performance'].items() if p['level'] != 'weak']),
                    json.dumps([s for s, p in candidate['skill_performance'].items() if p['level'] == 'weak']),
                    json.dumps([]),
                    json.dumps(candidate['skill_performance'])
                ))
                
                # Insert decision
                cursor.execute("""
                    INSERT INTO decisions (
                        application_id, composite_score, final_decision,
                        decided_by, decided_at
                    ) VALUES (?, ?, ?, ?, ?)
                """, (
                    application_id,
                    candidate['composite_score'],
                    'hold',  # Default decision
                    1,  # recruiter_id
                    candidate['test_completed_at'].isoformat()
                ))
            
            # Progress indicator
            if idx % 100 == 0:
                print(f"   Progress: {idx}/{len(candidates)} candidates...")
                conn.commit()
        
        conn.commit()
        print(f"\n✅ Successfully saved {len(candidates)} candidates to database!")
        
    except Exception as e:
        print(f"\n❌ Error saving to database: {e}")
        conn.rollback()
        raise
    finally:
        conn.close()

def print_summary(candidates):
    """Print summary statistics"""
    print("\n" + "="*70)
    print("📊 GENERATION SUMMARY")
    print("="*70)
    
    total = len(candidates)
    eligible = len([c for c in candidates if c['is_eligible']])
    not_eligible = total - eligible
    
    avg_ai = sum(c['ai_score'] for c in candidates) / total
    avg_test = sum(c['test_score'] for c in candidates if c['test_score']) / eligible if eligible > 0 else 0
    avg_composite = sum(c['composite_score'] for c in candidates if c['composite_score']) / eligible if eligible > 0 else 0
    
    print(f"\n📈 Overall Statistics:")
    print(f"   Total Candidates: {total}")
    print(f"   Eligible (took test): {eligible} ({eligible/total*100:.1f}%)")
    print(f"   Not Eligible: {not_eligible} ({not_eligible/total*100:.1f}%)")
    print(f"\n   Average AI Score: {avg_ai:.1f}%")
    print(f"   Average Test Score: {avg_test:.1f}%")
    print(f"   Average Composite Score: {avg_composite:.1f}%")
    
    # Date range
    all_dates = [c['applied_at'] for c in candidates]
    earliest = min(all_dates)
    latest = max(all_dates)
    print(f"\n📅 Application Date Range:")
    print(f"   Earliest: {earliest.strftime('%Y-%m-%d')}")
    print(f"   Latest: {latest.strftime('%Y-%m-%d')}")
    print(f"   Span: {(latest - earliest).days} days")
    
    # Recent applications (last 7 days)
    recent = len([c for c in candidates if (datetime.now() - c['applied_at']).days <= 7])
    print(f"\n🔥 Recent Activity:")
    print(f"   Applications in last 7 days: {recent}")
    
    print("\n" + "="*70)

def main():
    """Main execution function"""
    print("\n🎯 Cybersecurity ATS - Realistic Candidate Data Generator")
    print("   Version 2.0 - November 2024")
    print("   Generating 1000+ candidates for 20 job roles")
    
    # Generate all candidates
    candidates, job_posted_dates = generate_all_candidates()
    
    # Save to database
    save_to_database(candidates, job_posted_dates)
    
    # Print summary
    print_summary(candidates)
    
    print("\n✅ Data generation complete!")
    print("   You can now view the candidates in your dashboard")
    print("\n💡 Next steps:")
    print("   1. Restart your backend server")
    print("   2. Refresh your dashboard")
    print("   3. View the realistic candidate data")

if __name__ == "__main__":
    main()
