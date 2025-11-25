#!/usr/bin/env python3
"""
Export test questions from testQuestions.js to CSV
"""

import json
import csv
import re
from pathlib import Path

# Paths
script_dir = Path(__file__).parent
test_questions_path = script_dir.parent / 'data' / 'testQuestions.js'
csv_dir = script_dir.parent / 'data' / 'csv'

# Create CSV directory
csv_dir.mkdir(parents=True, exist_ok=True)

print(f'Reading {test_questions_path}...\n')

# Read the JavaScript file
with open(test_questions_path, 'r', encoding='utf-8') as f:
    content = f.read()

# Extract the testQuestions object using regex
# Find the const testQuestions = { ... } block
match = re.search(r'const testQuestions = ({[\s\S]*?});', content)
if not match:
    print('Error: Could not find testQuestions object')
    exit(1)

js_object = match.group(1)

# Convert JavaScript object to JSON-compatible format
# Replace single quotes with double quotes (careful with apostrophes in text)
js_object = re.sub(r"'([^']*)':", r'"\1":', js_object)  # Keys
js_object = re.sub(r':\s*\'', r': "', js_object)  # String values start
js_object = re.sub(r'\',\s*\n', r'",\n', js_object)  # String values end with comma
js_object = re.sub(r'\'\s*\]', r'"]', js_object)  # String values end in array

# Parse as JSON
try:
    test_questions = json.loads(js_object)
except json.JSONDecodeError as e:
    print(f'Error parsing JSON: {e}')
    # Try a different approach - execute the JS and extract data
    print('Trying alternative parsing method...')
    
    # Extract each category manually
    test_questions = {}
    
    # Find all category blocks
    category_pattern = r'"([^"]+)":\s*\[([\s\S]*?)\](?:,\s*"|\s*})'
    categories = re.finditer(category_pattern, js_object)
    
    for cat_match in categories:
        category_name = cat_match.group(1)
        questions_block = cat_match.group(2)
        
        # Extract individual questions
        question_pattern = r'\{([^}]*(?:\{[^}]*\}[^}]*)*)\}'
        questions = []
        
        for q_match in re.finditer(question_pattern, questions_block):
            q_text = q_match.group(1)
            
            # Extract fields
            id_match = re.search(r'"id":\s*(\d+)', q_text)
            question_match = re.search(r'"question":\s*"([^"]*)"', q_text)
            options_match = re.search(r'"options":\s*\[(.*?)\]', q_text, re.DOTALL)
            correct_match = re.search(r'"correct":\s*(\d+)', q_text)
            points_match = re.search(r'"points":\s*(\d+)', q_text)
            skills_match = re.search(r'"validatesSkills":\s*\[(.*?)\]', q_text, re.DOTALL)
            
            if all([id_match, question_match, options_match, correct_match, points_match]):
                # Parse options
                options_text = options_match.group(1)
                options = re.findall(r'"([^"]*)"', options_text)
                
                # Parse skills
                skills = []
                if skills_match:
                    skills_text = skills_match.group(1)
                    skills = re.findall(r'"([^"]*)"', skills_text)
                
                question_obj = {
                    'id': int(id_match.group(1)),
                    'question': question_match.group(1),
                    'options': options,
                    'correct': int(correct_match.group(1)),
                    'points': int(points_match.group(1)),
                    'validatesSkills': skills
                }
                questions.append(question_obj)
        
        if questions:
            test_questions[category_name] = questions

print(f'Parsed {len(test_questions)} categories\n')

# CSV headers
headers = [
    'test_category',
    'question_id',
    'question',
    'option_1',
    'option_2',
    'option_3',
    'option_4',
    'correct_answer_index',
    'correct_answer_text',
    'points',
    'validates_skills'
]

# Prepare CSV data
csv_data = []
total_questions = 0

for category, questions in test_questions.items():
    for q in questions:
        options = q.get('options', [])
        correct_idx = q.get('correct', 0)
        
        row = {
            'test_category': category,
            'question_id': q.get('id', ''),
            'question': q.get('question', ''),
            'option_1': options[0] if len(options) > 0 else '',
            'option_2': options[1] if len(options) > 1 else '',
            'option_3': options[2] if len(options) > 2 else '',
            'option_4': options[3] if len(options) > 3 else '',
            'correct_answer_index': correct_idx,
            'correct_answer_text': options[correct_idx] if correct_idx < len(options) else '',
            'points': q.get('points', 0),
            'validates_skills': ' | '.join(q.get('validatesSkills', []))
        }
        csv_data.append(row)
        total_questions += 1

# Write CSV
csv_path = csv_dir / '7_test_questions.csv'
with open(csv_path, 'w', newline='', encoding='utf-8') as f:
    writer = csv.DictWriter(f, fieldnames=headers)
    writer.writeheader()
    writer.writerows(csv_data)

print('✓ Test Questions CSV Export Complete!\n')
print(f'File: {csv_path}')
print(f'Total Questions: {total_questions}')
print(f'Categories: {len(test_questions)}')
print('\nBreakdown by Category:')
for category, questions in test_questions.items():
    print(f'  - {category}: {len(questions)} questions')
