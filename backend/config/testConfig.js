/**
 * Test Configuration
 * Controls how test questions are selected and displayed
 */

const testConfig = {
  // Question Selection
  selection: {
    maxQuestions: 10,              // Maximum questions per test
    ensureSkillCoverage: true,     // Ensure at least one question per skill
    randomize: true,               // Randomize question selection
    questionsPerSkill: 2,          // Target questions per skill (if possible)
  },
  
  // Scoring
  scoring: {
    pointsPerQuestion: 20,         // Default points per question
    // No passing threshold - we use skill-based verification instead
  },
  
  // Time Limits (in minutes)
  timing: {
    defaultDuration: 30,           // Default test duration
    warningTime: 5,                // Show warning when X minutes remain
  },
  
  // Display Options
  display: {
    showProgress: true,            // Show question X of Y
    allowReview: true,             // Allow reviewing answers before submit
    showSkillsBeingTested: false,  // Show which skills each question tests
  },
  
  // Role-Specific Overrides (question count and duration only)
  roleOverrides: {
    'Incident Response Analyst': {
      maxQuestions: 15,            // More questions for senior roles
    },
    'Digital Forensics Investigator': {
      maxQuestions: 15,
    },
    'Cybersecurity Architect': {
      maxQuestions: 12,
    },
    'Junior Security Control Assessor': {
      maxQuestions: 8,             // Fewer questions for junior roles
    },
  },
  
  // Get configuration for a specific role
  getConfigForRole(jobTitle) {
    const baseConfig = {
      maxQuestions: this.selection.maxQuestions,
      ensureSkillCoverage: this.selection.ensureSkillCoverage,
      randomize: this.selection.randomize,
      duration: this.timing.defaultDuration,
    };
    
    // Apply role-specific overrides if they exist
    if (this.roleOverrides[jobTitle]) {
      return { ...baseConfig, ...this.roleOverrides[jobTitle] };
    }
    
    return baseConfig;
  }
};

module.exports = testConfig;
