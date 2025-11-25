/**
 * Filter Helper Functions
 * Applies filters to dashboard data
 */

/**
 * Apply all filters to applications array
 */
export function applyFilters(applications, filters) {
  let filtered = [...applications];

  // Filter by job role
  if (filters.jobRole !== 'all') {
    filtered = filtered.filter(app => app.role_id === parseInt(filters.jobRole));
  }

  // Filter by status
  if (filters.status !== 'all') {
    if (filters.status === 'eligible') {
      filtered = filtered.filter(app => app.status === 'eligible');
    } else if (filters.status === 'test_completed') {
      filtered = filtered.filter(app => app.status === 'test_completed');
    } else if (filters.status === 'not_eligible') {
      filtered = filtered.filter(app => app.status === 'not_eligible');
    } else if (filters.status === 'interview_ready') {
      filtered = filtered.filter(app => 
        app.status === 'test_completed' && app.test_score >= 70
      );
    } else if (filters.status === 'high_performers') {
      filtered = filtered.filter(app => 
        app.status === 'test_completed' && app.test_score >= 80
      );
    }
  }

  // Filter by date range
  if (filters.dateRange !== 'all') {
    const now = new Date();
    const daysAgo = {
      'last_7_days': 7,
      'last_30_days': 30,
      'last_90_days': 90
    }[filters.dateRange];

    if (daysAgo) {
      const cutoffDate = new Date(now.getTime() - (daysAgo * 24 * 60 * 60 * 1000));
      filtered = filtered.filter(app => {
        const appliedDate = new Date(app.applied_at || app.created_at);
        return appliedDate >= cutoffDate;
      });
    }
  }

  // Filter by AI score range
  if (filters.aiScoreMin !== undefined && filters.aiScoreMax !== undefined) {
    filtered = filtered.filter(app => 
      app.ai_score >= filters.aiScoreMin && app.ai_score <= filters.aiScoreMax
    );
  }

  return filtered;
}

/**
 * Apply filters for job-specific dashboard
 */
export function applyJobFilters(candidates, filters) {
  let filtered = [...candidates];

  // Filter by status
  if (filters.status !== 'all') {
    if (filters.status === 'eligible') {
      filtered = filtered.filter(c => c.status === 'eligible');
    } else if (filters.status === 'test_completed') {
      filtered = filtered.filter(c => c.status === 'test_completed');
    } else if (filters.status === 'not_eligible') {
      filtered = filtered.filter(c => c.status === 'not_eligible');
    } else if (filters.status === 'interview_ready') {
      filtered = filtered.filter(c => 
        c.status === 'test_completed' && c.test_score >= 70
      );
    } else if (filters.status === 'high_performers') {
      filtered = filtered.filter(c => 
        c.status === 'test_completed' && c.test_score >= 80
      );
    }
  }

  // Filter by experience
  if (filters.experienceMin !== undefined || filters.experienceMax !== undefined) {
    filtered = filtered.filter(c => {
      const exp = c.experience_years || 0;
      const min = filters.experienceMin !== undefined ? filters.experienceMin : 0;
      const max = filters.experienceMax !== undefined ? filters.experienceMax : 100;
      return exp >= min && exp <= max;
    });
  }

  // Filter by skills (AND logic - must have ALL selected skills with passing score)
  if (filters.skills && filters.skills.length > 0) {
    filtered = filtered.filter(c => {
      try {
        const verificationDetails = typeof c.verification_details === 'string' 
          ? JSON.parse(c.verification_details) 
          : c.verification_details;

        if (!verificationDetails) return false;

        // Must have ALL selected skills AND score >= 50% on each
        return filters.skills.every(skill => {
          const skillData = verificationDetails[skill];
          return skillData && skillData.percentage >= 50;
        });
      } catch (e) {
        return false;
      }
    });
  }

  // Filter by certifications (AND logic - must have ALL selected certifications)
  if (filters.certifications && filters.certifications.length > 0) {
    filtered = filtered.filter(c => {
      try {
        const candidateCerts = typeof c.certifications === 'string' 
          ? JSON.parse(c.certifications) 
          : c.certifications;

        if (!candidateCerts || !Array.isArray(candidateCerts)) return false;

        // Must have ALL selected certifications
        return filters.certifications.every(cert => 
          candidateCerts.includes(cert)
        );
      } catch (e) {
        return false;
      }
    });
  }

  return filtered;
}

/**
 * Check if any filters are active
 */
export function hasActiveFilters(filters) {
  return filters.jobRole !== 'all' ||
         filters.status !== 'all' ||
         filters.dateRange !== 'all' ||
         filters.aiScoreMin > 0 ||
         filters.aiScoreMax < 100;
}

/**
 * Check if any job filters are active
 */
export function hasActiveJobFilters(filters) {
  return filters.status !== 'all' ||
         (filters.skills && filters.skills.length > 0) ||
         (filters.certifications && filters.certifications.length > 0) ||
         filters.experienceMin > 0 ||
         filters.experienceMax < 20;
}

/**
 * Get default filters for main dashboard
 */
export function getDefaultFilters() {
  return {
    jobRole: 'all',
    dateRange: 'all',
    status: 'all',
    aiScoreMin: 0,
    aiScoreMax: 100
  };
}

/**
 * Get default filters for job-specific dashboard
 */
export function getDefaultJobFilters() {
  return {
    status: 'all',
    experienceMin: 0,
    experienceMax: 20,
    skills: [],
    certifications: []
  };
}
