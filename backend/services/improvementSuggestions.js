/**
 * Generate Improvement Suggestions
 * Simple, actionable recommendations based on gaps
 */

/**
 * Generate 3-5 improvement suggestions
 * @param {Object} matchResult - Result from matching engine
 * @param {Object} resumeData - Parsed resume data
 * @param {Object} jobData - Job role data
 * @returns {Array} List of suggestions
 */
function generateSuggestions(matchResult, resumeData, jobData) {
  const suggestions = [];
  
  // 1. Experience gap suggestions
  if (matchResult.experienceMatch.status === 'below_minimum') {
    const yearsNeeded = jobData.experienceRange.min - matchResult.experienceMatch.candidateYears;
    suggestions.push(
      `Gain ${yearsNeeded} more year${yearsNeeded > 1 ? 's' : ''} of relevant experience to meet minimum requirement`
    );
  }
  
  // 2. Missing skills suggestions (top 3 priority)
  if (matchResult.skillDetails.missing.length > 0) {
    const topMissingSkills = matchResult.skillDetails.missing.slice(0, 3);
    suggestions.push(
      `Develop skills in: ${topMissingSkills.join(', ')}`
    );
  }
  
  // 3. Missing knowledge suggestions (top 2 priority)
  if (matchResult.knowledgeDetails.missing.length > 0) {
    const topMissingKnowledge = matchResult.knowledgeDetails.missing.slice(0, 2);
    suggestions.push(
      `Build knowledge in: ${topMissingKnowledge.join(', ')}`
    );
  }
  
  // 4. Missing tasks/experience suggestions
  if (matchResult.taskDetails.missing.length > 0) {
    const topMissingTasks = matchResult.taskDetails.missing.slice(0, 2);
    suggestions.push(
      `Gain experience with: ${topMissingTasks.join(', ')}`
    );
  }
  
  // 5. Certification suggestions
  const relevantCerts = getRelevantCertifications(jobData.title);
  const missingCerts = relevantCerts.filter(cert => 
    !resumeData.certifications.some(c => c.includes(cert))
  );
  
  if (missingCerts.length > 0) {
    suggestions.push(
      `Consider obtaining: ${missingCerts.slice(0, 2).join(' or ')} certification`
    );
  }
  
  // 6. Education suggestion (if applicable)
  if (resumeData.education === 'Not specified' || resumeData.education === 'Associate') {
    if (jobData.experienceRange.min >= 3) {
      suggestions.push(
        `A Bachelor's degree in Cybersecurity or related field would strengthen your profile`
      );
    }
  }
  
  // 7. Overall improvement if score is low
  if (matchResult.finalScore < 60) {
    suggestions.push(
      `Focus on building foundational skills and knowledge for this role before applying`
    );
  }
  
  // Return top 5 suggestions
  return suggestions.slice(0, 5);
}

/**
 * Get relevant certifications for a job title
 * @param {string} jobTitle - Job title
 * @returns {Array} Relevant certifications
 */
function getRelevantCertifications(jobTitle) {
  const titleLower = jobTitle.toLowerCase();
  
  if (titleLower.includes('analyst') || titleLower.includes('soc')) {
    return ['Security+', 'CySA+', 'CEH'];
  }
  
  if (titleLower.includes('penetration') || titleLower.includes('tester')) {
    return ['CEH', 'OSCP', 'GPEN'];
  }
  
  if (titleLower.includes('engineer')) {
    return ['Security+', 'CISSP', 'CCNA'];
  }
  
  if (titleLower.includes('architect') || titleLower.includes('manager')) {
    return ['CISSP', 'CISM', 'CRISC'];
  }
  
  if (titleLower.includes('cloud')) {
    return ['AWS Certified', 'Azure Security', 'CCSP'];
  }
  
  if (titleLower.includes('forensic') || titleLower.includes('incident')) {
    return ['GCIH', 'GCFA', 'CEH'];
  }
  
  if (titleLower.includes('compliance') || titleLower.includes('risk')) {
    return ['CISA', 'CRISC', 'CISM'];
  }
  
  // Default recommendations
  return ['Security+', 'CEH', 'CISSP'];
}

module.exports = {
  generateSuggestions,
  getRelevantCertifications
};
