#!/usr/bin/env python3
"""
Export all database tables to CSV files
"""

import sqlite3
import csv
import os
import json
from pathlib import Path

# Paths
script_dir = Path(__file__).parent
db_path = script_dir.parent / 'database' / 'recruitment.db'
csv_dir = script_dir.parent / 'data' / 'csv'

# Create CSV directory if it doesn't exist
csv_dir.mkdir(parents=True, exist_ok=True)

# Connect to database
print(f'Connecting to {db_path}...\n')
conn = sqlite3.connect(db_path)
conn.row_factory = sqlite3.Row  # Access columns by name
cursor = conn.cursor()

def export_table(table_name, columns, filename):
    """Export a table to CSV"""
    query = f"SELECT {', '.join(columns)} FROM {table_name} ORDER BY {columns[0]}"
    cursor.execute(query)
    rows = cursor.fetchall()
    
    csv_path = csv_dir / filename
    with open(csv_path, 'w', newline='', encoding='utf-8') as f:
        writer = csv.writer(f)
        writer.writerow(columns)  # Header
        
        for row in rows:
            writer.writerow([row[col] for col in columns])
    
    print(f'✓ {filename}: {len(rows)} records exported')
    return len(rows)

# Tables to export
tables = [
    {
        'table': 'candidates',
        'columns': ['candidate_id', 'name', 'email', 'phone', 'resume_path', 'created_at'],
        'file': '1_candidates.csv'
    },
    {
        'table': 'job_roles',
        'columns': ['role_id', 'title', 'description', 'requirements', 'salary_min', 'salary_max', 'status', 'recruiter_id', 'created_at'],
        'file': '2_job_roles.csv'
    },
    {
        'table': 'applications',
        'columns': ['application_id', 'candidate_id', 'role_id', 'status', 'applied_at', 'updated_at'],
        'file': '3_applications.csv'
    },
    {
        'table': 'ai_analysis',
        'columns': ['analysis_id', 'application_id', 'ai_score', 'skills_matched', 'skill_gaps', 'experience_years', 'experience_level', 'education', 'certifications', 'reasoning', 'analysis_completed_at'],
        'file': '4_ai_analysis.csv'
    },
    {
        'table': 'tests',
        'columns': ['test_id', 'application_id', 'test_score', 'test_token', 'completed_at', 'answers', 'verification_details', 'started_at'],
        'file': '5_tests.csv'
    },
    {
        'table': 'decisions',
        'columns': ['decision_id', 'application_id', 'composite_score', 'resume_weight', 'test_weight', 'decided_by'],
        'file': '6_decisions.csv'
    }
]

# Export all tables
print('Exporting database tables to CSV...\n')
total_records = 0

for table_info in tables:
    try:
        count = export_table(table_info['table'], table_info['columns'], table_info['file'])
        total_records += count
    except Exception as e:
        print(f'✗ Error exporting {table_info["table"]}: {e}')

# Close connection
conn.close()

print(f'\n✓ All tables exported successfully!')
print(f'Total records: {total_records}')
print(f'Files saved to: {csv_dir}')
