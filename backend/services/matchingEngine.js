/**
 * Resume-to-Job Matching Engine
 * Rule-based scoring and eligibility determination
 */

/**
 * Calculate experience match
 * @param {number} candidateYears - Years of experience from resume
 * @param {Object} experienceRange - {min, max} from job role
 * @returns {Object} Match result with status and warnings
 */
function calculateExperienceMatch(candidateYears, experienceRange) {
  const { min, max } = experienceRange;
  
  if (candidateYears < min) {
    return {
      status: 'below_minimum',
      match: false,
      warning: `Requires ${min}+ years, candidate has ${candidateYears} years`,
      flag: 'red'
    };
  }
  
  if (candidateYears > max + 3) {
    return {
      status: 'overqualified',
      match: true,
      warning: `May be overqualified (${candidateYears} years for ${min}-${max} year role)`,
      flag: 'yellow'
    };
  }
  
  return {
    status: 'match',
    match: true,
    warning: null,
    flag: 'green'
  };
}

/**
 * Calculate skill match percentage
 * @param {Array} candidateSkills - Skills from resume
 * @param {Array} requiredSkills - Skills from job role
 * @returns {Object} Match percentage and missing skills
 */
function calculateSkillMatch(candidateSkills, requiredSkills) {
  const candidateSkillsLower = candidateSkills.map(s => s.toLowerCase());
  const matched = [];
  const missing = [];
  
  requiredSkills.forEach(skill => {
    const skillLower = skill.toLowerCase();
    if (candidateSkillsLower.includes(skillLower)) {
      matched.push(skill);
    } else {
      missing.push(skill);
    }
  });
  
  const percentage = requiredSkills.length > 0 
    ? Math.round((matched.length / requiredSkills.length) * 100)
    : 0;
  
  return {
    percentage,
    matched,
    missing,
    matchedCount: matched.length,
    totalRequired: requiredSkills.length
  };
}

/**
 * Calculate knowledge match percentage
 * @param {Array} candidateKnowledge - Knowledge from resume
 * @param {Array} requiredKnowledge - Knowledge from job role
 * @returns {Object} Match percentage and missing knowledge
 */
function calculateKnowledgeMatch(candidateKnowledge, requiredKnowledge) {
  const candidateKnowledgeLower = candidateKnowledge.map(k => k.toLowerCase());
  const matched = [];
  const missing = [];
  
  requiredKnowledge.forEach(knowledge => {
    const knowledgeLower = knowledge.toLowerCase();
    // Check if any candidate knowledge contains this required knowledge
    const found = candidateKnowledgeLower.some(ck => 
      ck.includes(knowledgeLower) || knowledgeLower.includes(ck)
    );
    
    if (found) {
      matched.push(knowledge);
    } else {
      missing.push(knowledge);
    }
  });
  
  const percentage = requiredKnowledge.length > 0
    ? Math.round((matched.length / requiredKnowledge.length) * 100)
    : 0;
  
  return {
    percentage,
    matched,
    missing,
    matchedCount: matched.length,
    totalRequired: requiredKnowledge.length
  };
}

/**
 * Calculate task match percentage
 * @param {Array} candidateTasks - Tasks from resume
 * @param {Array} requiredTasks - Tasks from job role
 * @returns {Object} Match percentage and missing tasks
 */
function calculateTaskMatch(candidateTasks, requiredTasks) {
  const candidateTasksLower = candidateTasks.map(t => t.toLowerCase());
  const matched = [];
  const missing = [];
  
  requiredTasks.forEach(task => {
    const taskLower = task.toLowerCase();
    // Check if any candidate task is similar
    const found = candidateTasksLower.some(ct => {
      // Extract key words from both tasks
      const taskWords = taskLower.split(' ').filter(w => w.length > 3);
      const ctWords = ct.split(' ').filter(w => w.length > 3);
      
      // Check for word overlap
      const overlap = taskWords.filter(tw => ctWords.some(cw => cw.includes(tw) || tw.includes(cw)));
      return overlap.length >= 2; // At least 2 words match
    });
    
    if (found) {
      matched.push(task);
    } else {
      missing.push(task);
    }
  });
  
  const percentage = requiredTasks.length > 0
    ? Math.round((matched.length / requiredTasks.length) * 100)
    : 0;
  
  return {
    percentage,
    matched,
    missing,
    matchedCount: matched.length,
    totalRequired: requiredTasks.length
  };
}

/**
 * Calculate final weighted score
 * @param {Object} matches - Skill, knowledge, task match results
 * @param {Object} weights - Weights from job role
 * @returns {number} Final score (0-100)
 */
function calculateFinalScore(matches, weights) {
  const skillScore = matches.skillMatch.percentage * weights.skills;
  const knowledgeScore = matches.knowledgeMatch.percentage * weights.knowledge;
  const taskScore = matches.taskMatch.percentage * weights.tasks;
  
  return Math.round(skillScore + knowledgeScore + taskScore);
}

/**
 * Determine eligibility based on score
 * @param {number} finalScore - Final calculated score
 * @returns {Object} Eligibility status and message
 */
function determineEligibility(finalScore) {
  if (finalScore < 60) {
    return {
      status: 'not_eligible',
      message: 'Not eligible for test',
      color: 'red'
    };
  }
  
  if (finalScore >= 60 && finalScore < 75) {
    return {
      status: 'borderline',
      message: 'Borderline - review recommended',
      color: 'yellow'
    };
  }
  
  return {
    status: 'eligible',
    message: 'Eligible for test',
    color: 'green'
  };
}

/**
 * Main matching function
 * @param {Object} resumeParsedData - Parsed resume data
 * @param {Object} jobData - Job role data
 * @returns {Object} Complete matching results
 */
function matchResumeToJob(resumeParsedData, jobData) {
  // Calculate experience match
  const experienceMatch = calculateExperienceMatch(
    resumeParsedData.yearsOfExperience,
    jobData.experienceRange
  );
  
  // Calculate skill match
  const skillMatch = calculateSkillMatch(
    resumeParsedData.skills,
    jobData.skills
  );
  
  // Calculate knowledge match
  const knowledgeMatch = calculateKnowledgeMatch(
    resumeParsedData.knowledgeKeywords,
    jobData.knowledge
  );
  
  // Calculate task match
  const taskMatch = calculateTaskMatch(
    resumeParsedData.taskKeywords,
    jobData.tasks
  );
  
  // Calculate final weighted score
  const finalScore = calculateFinalScore(
    { skillMatch, knowledgeMatch, taskMatch },
    jobData.weights
  );
  
  // Determine eligibility
  const eligibility = determineEligibility(finalScore);
  
  // Collect all warnings
  const warnings = [];
  if (experienceMatch.warning) {
    warnings.push(experienceMatch.warning);
  }
  if (skillMatch.percentage < 50) {
    warnings.push(`Low skill match: only ${skillMatch.matchedCount}/${skillMatch.totalRequired} skills found`);
  }
  if (knowledgeMatch.percentage < 40) {
    warnings.push(`Limited knowledge match: ${knowledgeMatch.matchedCount}/${knowledgeMatch.totalRequired} areas covered`);
  }
  
  return {
    experienceMatch: {
      candidateYears: resumeParsedData.yearsOfExperience,
      requiredRange: jobData.experienceRange,
      status: experienceMatch.status,
      flag: experienceMatch.flag,
      warning: experienceMatch.warning
    },
    skillMatchPercent: skillMatch.percentage,
    skillDetails: {
      matched: skillMatch.matched,
      missing: skillMatch.missing,
      matchedCount: skillMatch.matchedCount,
      totalRequired: skillMatch.totalRequired
    },
    knowledgeMatchPercent: knowledgeMatch.percentage,
    knowledgeDetails: {
      matched: knowledgeMatch.matched,
      missing: knowledgeMatch.missing,
      matchedCount: knowledgeMatch.matchedCount,
      totalRequired: knowledgeMatch.totalRequired
    },
    taskMatchPercent: taskMatch.percentage,
    taskDetails: {
      matched: taskMatch.matched,
      missing: taskMatch.missing,
      matchedCount: taskMatch.matchedCount,
      totalRequired: taskMatch.totalRequired
    },
    finalScore,
    eligibility: eligibility.status,
    eligibilityMessage: eligibility.message,
    eligibilityColor: eligibility.color,
    warnings,
    // Include parsed data for reference
    candidateData: {
      education: resumeParsedData.education,
      certifications: resumeParsedData.certifications,
      jobTitles: resumeParsedData.jobTitles
    }
  };
}

module.exports = {
  matchResumeToJob,
  calculateExperienceMatch,
  calculateSkillMatch,
  calculateKnowledgeMatch,
  calculateTaskMatch,
  calculateFinalScore,
  determineEligibility
};
