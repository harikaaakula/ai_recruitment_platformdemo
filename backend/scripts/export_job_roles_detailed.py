#!/usr/bin/env python3
"""
Export detailed job roles from jobRoles.js to CSV
"""

import json
import csv
import re
from pathlib import Path

# Paths
script_dir = Path(__file__).parent
job_roles_path = script_dir.parent / 'data' / 'jobRoles.js'
csv_dir = script_dir.parent / 'data' / 'csv'

# Create CSV directory
csv_dir.mkdir(parents=True, exist_ok=True)

print(f'Reading {job_roles_path}...\n')

# Read the JavaScript file
with open(job_roles_path, 'r', encoding='utf-8') as f:
    content = f.read()

# Extract the jobRoles array
match = re.search(r'const jobRoles = \[([\s\S]*?)\];[\s]*module\.exports', content)
if not match:
    print('Error: Could not find jobRoles array')
    exit(1)

js_array = '[' + match.group(1) + ']'

# Clean up JavaScript to make it JSON-compatible
# This is complex due to unquoted keys, comments, etc.
print('Parsing job roles...')

job_roles = []

# Split by role objects (each starts with opening brace after comma or array start)
role_pattern = r'\{[\s\S]*?(?=\n\s*\},|\n\s*\}\s*\])'
roles_text = re.findall(role_pattern, js_array)

for idx, role_text in enumerate(roles_text, 1):
    try:
        role = {}
        
        # Extract simple fields
        id_match = re.search(r'id:\s*["\'](\d+)["\']', role_text)
        title_match = re.search(r'title:\s*["\']([^"\']*)["\']', role_text)
        overview_match = re.search(r'overview:\s*["\']([^"\']*)["\']', role_text, re.DOTALL)
        education_match = re.search(r'education:\s*["\']([^"\']*)["\']', role_text)
        threshold_match = re.search(r'thresholdScore:\s*(\d+)', role_text)
        test_category_match = re.search(r'testCategory:\s*["\']([^"\']*)["\']', role_text)
        
        if id_match:
            role['id'] = id_match.group(1)
        if title_match:
            role['title'] = title_match.group(1)
        if overview_match:
            role['overview'] = overview_match.group(1).strip()
        if education_match:
            role['education'] = education_match.group(1)
        if threshold_match:
            role['thresholdScore'] = threshold_match.group(1)
        if test_category_match:
            role['testCategory'] = test_category_match.group(1)
        
        # Extract arrays
        def extract_array(field_name, text):
            pattern = f'{field_name}:\\s*\\[(.*?)\\]'
            match = re.search(pattern, text, re.DOTALL)
            if match:
                array_content = match.group(1)
                # Extract quoted strings
                items = re.findall(r'["\']([^"\']*)["\']', array_content)
                return ' | '.join(items)
            return ''
        
        role['mainResponsibilities'] = extract_array('mainResponsibilities', role_text)
        role['tasks'] = extract_array('tasks', role_text)
        role['knowledge'] = extract_array('knowledge', role_text)
        role['skills'] = extract_array('skills', role_text)
        role['skillKeywords'] = extract_array('skillKeywords', role_text)
        role['preferredExperience'] = extract_array('preferredExperience', role_text)
        role['certifications'] = extract_array('certifications', role_text)
        
        # Extract experienceRange
        exp_range_match = re.search(r'experienceRange:\s*\{\s*min:\s*(\d+),\s*max:\s*(\d+)', role_text)
        if exp_range_match:
            role['experienceMin'] = exp_range_match.group(1)
            role['experienceMax'] = exp_range_match.group(2)
        
        # Extract weights
        weights_match = re.search(r'weights:\s*\{([^}]*)\}', role_text)
        if weights_match:
            weights_text = weights_match.group(1)
            skills_weight = re.search(r'skills:\s*([\d.]+)', weights_text)
            knowledge_weight = re.search(r'knowledge:\s*([\d.]+)', weights_text)
            tasks_weight = re.search(r'tasks:\s*([\d.]+)', weights_text)
            certs_weight = re.search(r'certifications:\s*([\d.]+)', weights_text)
            edu_weight = re.search(r'education:\s*([\d.]+)', weights_text)
            
            if skills_weight:
                role['weight_skills'] = skills_weight.group(1)
            if knowledge_weight:
                role['weight_knowledge'] = knowledge_weight.group(1)
            if tasks_weight:
                role['weight_tasks'] = tasks_weight.group(1)
            if certs_weight:
                role['weight_certifications'] = certs_weight.group(1)
            if edu_weight:
                role['weight_education'] = edu_weight.group(1)
        
        if role.get('id'):
            job_roles.append(role)
            print(f'  ✓ Parsed role {idx}: {role.get("title", "Unknown")}')
    
    except Exception as e:
        print(f'  ✗ Error parsing role {idx}: {e}')

print(f'\nParsed {len(job_roles)} job roles\n')

# CSV headers
headers = [
    'id',
    'title',
    'overview',
    'mainResponsibilities',
    'tasks',
    'knowledge',
    'skills',
    'skillKeywords',
    'education',
    'preferredExperience',
    'certifications',
    'experienceMin',
    'experienceMax',
    'weight_skills',
    'weight_knowledge',
    'weight_tasks',
    'weight_certifications',
    'weight_education',
    'thresholdScore',
    'testCategory'
]

# Write CSV
csv_path = csv_dir / '8_job_roles_detailed.csv'
with open(csv_path, 'w', newline='', encoding='utf-8') as f:
    writer = csv.DictWriter(f, fieldnames=headers, extrasaction='ignore')
    writer.writeheader()
    writer.writerows(job_roles)

print('✓ Job Roles Detailed CSV Export Complete!\n')
print(f'File: {csv_path}')
print(f'Total Job Roles: {len(job_roles)}')
print(f'\nJob Roles Exported:')
for role in job_roles:
    print(f'  - {role.get("id")}: {role.get("title")}')
