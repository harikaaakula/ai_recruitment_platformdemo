"""
Populate job_roles table with the 20 hardcoded cybersecurity jobs
"""

import sqlite3
import json

# Load job roles from the hardcoded list
JOB_ROLES = [
    {
        'id': 1,
        'title': 'Security Analyst',
        'description': 'Monitor and analyze security events, respond to incidents, and maintain security infrastructure.',
        'recruiter_id': 1,  # Default recruiter
        'min_ai_threshold': 60
    },
    {
        'id': 2,
        'title': 'Penetration Tester',
        'description': 'Conduct authorized simulated attacks to identify vulnerabilities in systems and applications.',
        'recruiter_id': 1,
        'min_ai_threshold': 65
    },
    {
        'id': 3,
        'title': 'Security Engineer',
        'description': 'Design, implement, and maintain security systems and infrastructure.',
        'recruiter_id': 1,
        'min_ai_threshold': 65
    },
    {
        'id': 4,
        'title': 'SOC Analyst',
        'description': 'Monitor security alerts, investigate incidents, and respond to threats in real-time.',
        'recruiter_id': 1,
        'min_ai_threshold': 60
    },
    {
        'id': 5,
        'title': 'Vulnerability Analyst',
        'description': 'Identify, assess, and prioritize security vulnerabilities across the organization.',
        'recruiter_id': 1,
        'min_ai_threshold': 60
    },
    {
        'id': 6,
        'title': 'Incident Responder',
        'description': 'Lead incident response efforts, conduct forensic analysis, and coordinate remediation.',
        'recruiter_id': 1,
        'min_ai_threshold': 65
    },
    {
        'id': 7,
        'title': 'Security Architect',
        'description': 'Design enterprise security architecture and establish security standards.',
        'recruiter_id': 1,
        'min_ai_threshold': 75
    },
    {
        'id': 8,
        'title': 'Cloud Security Engineer',
        'description': 'Secure cloud infrastructure and implement cloud-native security controls.',
        'recruiter_id': 1,
        'min_ai_threshold': 65
    },
    {
        'id': 9,
        'title': 'Threat Intelligence Analyst',
        'description': 'Analyze threat data, track threat actors, and provide actionable intelligence.',
        'recruiter_id': 1,
        'min_ai_threshold': 60
    },
    {
        'id': 10,
        'title': 'Security Compliance Analyst',
        'description': 'Ensure compliance with security standards and regulatory requirements.',
        'recruiter_id': 1,
        'min_ai_threshold': 65
    },
    {
        'id': 11,
        'title': 'Application Security Engineer',
        'description': 'Secure applications through code review, testing, and security integration.',
        'recruiter_id': 1,
        'min_ai_threshold': 65
    },
    {
        'id': 12,
        'title': 'Network Security Engineer',
        'description': 'Design and maintain network security infrastructure and controls.',
        'recruiter_id': 1,
        'min_ai_threshold': 65
    },
    {
        'id': 13,
        'title': 'Malware Analyst',
        'description': 'Analyze malware samples, reverse engineer threats, and develop detection signatures.',
        'recruiter_id': 1,
        'min_ai_threshold': 70
    },
    {
        'id': 14,
        'title': 'Security Operations Manager',
        'description': 'Lead security operations team and manage security monitoring and response.',
        'recruiter_id': 1,
        'min_ai_threshold': 70
    },
    {
        'id': 15,
        'title': 'Identity and Access Management Specialist',
        'description': 'Manage identity systems, access controls, and authentication mechanisms.',
        'recruiter_id': 1,
        'min_ai_threshold': 60
    },
    {
        'id': 16,
        'title': 'Security Automation Engineer',
        'description': 'Develop security automation solutions and integrate security tools.',
        'recruiter_id': 1,
        'min_ai_threshold': 65
    },
    {
        'id': 17,
        'title': 'Cryptography Specialist',
        'description': 'Implement cryptographic solutions and manage encryption systems.',
        'recruiter_id': 1,
        'min_ai_threshold': 70
    },
    {
        'id': 18,
        'title': 'Security Awareness Trainer',
        'description': 'Develop and deliver security awareness training programs.',
        'recruiter_id': 1,
        'min_ai_threshold': 60
    },
    {
        'id': 19,
        'title': 'Security Risk Analyst',
        'description': 'Assess security risks, conduct risk analysis, and recommend mitigation strategies.',
        'recruiter_id': 1,
        'min_ai_threshold': 65
    },
    {
        'id': 20,
        'title': 'Digital Forensics Investigator',
        'description': 'Conduct digital forensic investigations and analyze evidence.',
        'recruiter_id': 1,
        'min_ai_threshold': 70
    }
]

def populate_job_roles(db_path='backend/database/recruitment.db'):
    """Populate job_roles table"""
    print("📋 Populating job_roles table...")
    
    conn = sqlite3.connect(db_path)
    cursor = conn.cursor()
    
    # Clear existing job roles (except those created by recruiters)
    cursor.execute("DELETE FROM job_roles WHERE role_id <= 20")
    
    # Insert job roles
    for job in JOB_ROLES:
        cursor.execute("""
            INSERT INTO job_roles (role_id, title, description, min_ai_threshold, recruiter_id, salary_min, salary_max)
            VALUES (?, ?, ?, ?, ?, ?, ?)
        """, (job['id'], job['title'], job['description'], job['min_ai_threshold'], job['recruiter_id'], 80000, 150000))
    
    conn.commit()
    conn.close()
    
    print(f"✅ Successfully populated {len(JOB_ROLES)} job roles!")

if __name__ == "__main__":
    populate_job_roles()
