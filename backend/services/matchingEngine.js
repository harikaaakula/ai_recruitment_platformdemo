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
 * Calculate certification match percentage
 * @param {Array} candidateCertifications - Certifications from resume
 * @param {Array} requiredCertifications - Certifications from job role
 * @returns {Object} Match percentage and missing certifications
 */
function calculateCertificationMatch(candidateCertifications, requiredCertifications) {
  if (!requiredCertifications || requiredCertifications.length === 0) {
    return {
      percentage: 100, // No certifications required = 100%
      matched: [],
      missing: [],
      matchedCount: 0,
      totalRequired: 0
    };
  }
  
  const candidateCertsLower = candidateCertifications.map(c => c.toLowerCase());
  const matched = [];
  const missing = [];
  
  requiredCertifications.forEach(cert => {
    const certLower = cert.toLowerCase();
    // Check for partial matches (e.g., "Security+" matches "CompTIA Security+")
    const found = candidateCertsLower.some(cc => 
      cc.includes(certLower) || certLower.includes(cc)
    );
    
    if (found) {
      matched.push(cert);
    } else {
      missing.push(cert);
    }
  });
  
  const percentage = Math.round((matched.length / requiredCertifications.length) * 100);
  
  return {
    percentage,
    matched,
    missing,
    matchedCount: matched.length,
    totalRequired: requiredCertifications.length
  };
}

/**
 * Calculate education match
 * @param {string} candidateEducation - Education from resume
 * @param {string} requiredEducation - Education from job role
 * @returns {Object} Match result with percentage
 */
function calculateEducationMatch(candidateEducation, requiredEducation) {
  if (!requiredEducation) {
    return {
      percentage: 100, // No education required = 100%
      match: true,
      candidateLevel: candidateEducation,
      requiredLevel: 'Not specified'
    };
  }
  
  const educationLevels = {
    'high school': 1,
    'associate': 2,
    'bachelor': 3,
    'master': 4,
    'phd': 5,
    'doctorate': 5
  };
  
  const candidateLower = (candidateEducation || '').toLowerCase();
  const requiredLower = requiredEducation.toLowerCase();
  
  // Determine education levels
  let candidateLevel = 0;
  let requiredLevel = 0;
  
  for (const [degree, level] of Object.entries(educationLevels)) {
    if (candidateLower.includes(degree)) {
      candidateLevel = Math.max(candidateLevel, level);
    }
    if (requiredLower.includes(degree)) {
      requiredLevel = Math.max(requiredLevel, level);
    }
  }
  
  // Calculate match percentage
  let percentage = 0;
  if (candidateLevel === 0) {
    percentage = 0; // No education specified
  } else if (candidateLevel >= requiredLevel) {
    percentage = 100; // Meets or exceeds requirement
  } else {
    // Partial credit for lower degree
    percentage = Math.round((candidateLevel / requiredLevel) * 70);
  }
  
  return {
    percentage,
    match: candidateLevel >= requiredLevel,
    candidateLevel: candidateEducation,
    requiredLevel: requiredEducation
  };
}

/**
 * Calculate final weighted score
 * @param {Object} matches - Skill, knowledge, task, certification, education match results
 * @param {Object} weights - Weights from job role
 * @returns {number} Final score (0-100)
 */
function calculateFinalScore(matches, weights) {
  const skillScore = matches.skillMatch.percentage * weights.skills;
  const knowledgeScore = matches.knowledgeMatch.percentage * weights.knowledge;
  const taskScore = matches.taskMatch.percentage * weights.tasks;
  
  // Add certification and education scores if weights exist
  const certificationScore = weights.certifications 
    ? matches.certificationMatch.percentage * weights.certifications 
    : 0;
  const educationScore = weights.education 
    ? matches.educationMatch.percentage * weights.education 
    : 0;
  
  return Math.round(skillScore + knowledgeScore + taskScore + certificationScore + educationScore);
}

/**
 * Determine eligibility based on score
 * @param {number} finalScore - Final calculated score
 * @param {number} thresholdScore - Job-specific threshold score
 * @returns {Object} Eligibility status and message
 */
function determineEligibility(finalScore, thresholdScore = 60) {
  if (finalScore < thresholdScore) {
    return {
      status: 'not_eligible',
      message: `Not eligible for test (score: ${finalScore}%, threshold: ${thresholdScore}%)`,
      color: 'red'
    };
  }
  
  if (finalScore >= thresholdScore && finalScore < thresholdScore + 15) {
    return {
      status: 'borderline',
      message: `Borderline - review recommended (score: ${finalScore}%, threshold: ${thresholdScore}%)`,
      color: 'yellow'
    };
  }
  
  return {
    status: 'eligible',
    message: `Eligible for test (score: ${finalScore}%, threshold: ${thresholdScore}%)`,
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
  
  // Calculate certification match
  const certificationMatch = calculateCertificationMatch(
    resumeParsedData.certifications || [],
    jobData.certifications || []
  );
  
  // Calculate education match
  const educationMatch = calculateEducationMatch(
    resumeParsedData.education,
    jobData.education
  );
  
  // Calculate final weighted score
  const finalScore = calculateFinalScore(
    { skillMatch, knowledgeMatch, taskMatch, certificationMatch, educationMatch },
    jobData.weights
  );
  
  // Determine eligibility using job-specific threshold
  const eligibility = determineEligibility(finalScore, jobData.thresholdScore || 60);
  
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
  if (certificationMatch.totalRequired > 0 && certificationMatch.percentage < 50) {
    warnings.push(`Missing key certifications: ${certificationMatch.missing.join(', ')}`);
  }
  if (!educationMatch.match) {
    warnings.push(`Education below requirement: has ${educationMatch.candidateLevel}, needs ${educationMatch.requiredLevel}`);
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
    certificationMatchPercent: certificationMatch.percentage,
    certificationDetails: {
      matched: certificationMatch.matched,
      missing: certificationMatch.missing,
      matchedCount: certificationMatch.matchedCount,
      totalRequired: certificationMatch.totalRequired
    },
    educationMatchPercent: educationMatch.percentage,
    educationDetails: {
      match: educationMatch.match,
      candidateLevel: educationMatch.candidateLevel,
      requiredLevel: educationMatch.requiredLevel
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
  calculateCertificationMatch,
  calculateEducationMatch,
  calculateFinalScore,
  determineEligibility
};
