/**
 * Skill Verification Service
 * Validates claimed resume skills against test performance
 */

const { getTestForJobTitle } = require('../data/testQuestions');

/**
 * Verify skills based on test answers
 * @param {Array} claimedSkills - Skills extracted from resume
 * @param {String} jobTitle - Job title for the test
 * @param {Array} userAnswers - User's answers to test questions
 * @returns {Object} - Verification results with verified, unverified, and untested skills
 */
function verifySkills(claimedSkills, jobTitle, userAnswers) {
  console.log('\n🔍 ========== SKILL VERIFICATION STARTED ==========');
  console.log(`📋 Claimed Skills: ${claimedSkills.join(', ')}`);
  console.log(`🧪 Job Title: ${jobTitle}`);
  console.log(`📝 Answers Provided: ${userAnswers.length}`);
  
  // Get questions for this job title
  const questions = getTestForJobTitle(jobTitle) || [];
  
  if (questions.length === 0) {
    console.log('⚠️  No questions found for job title:', jobTitle);
    return {
      verifiedSkills: [],
      unverifiedSkills: [],
      untestedSkills: claimedSkills,
      verificationDetails: {}
    };
  }
  
  // Build skill-to-questions mapping
  const skillQuestionMap = {};
  questions.forEach((q, index) => {
    const validatesSkills = q.validatesSkills || [];
    validatesSkills.forEach(skill => {
      if (!skillQuestionMap[skill]) {
        skillQuestionMap[skill] = [];
      }
      skillQuestionMap[skill].push({
        questionIndex: index,
        question: q.question,
        correctAnswer: q.correct
      });
    });
  });
  
  console.log(`\n📊 Skill-Question Mapping:`);
  Object.keys(skillQuestionMap).forEach(skill => {
    console.log(`   ${skill}: ${skillQuestionMap[skill].length} questions`);
  });
  
  // Normalize skills for matching (case-insensitive, handle variations)
  const normalizeSkill = (skill) => skill.toLowerCase().trim();
  
  // Track verification results
  const verifiedSkills = [];
  const unverifiedSkills = [];
  const untestedSkills = [];
  const verificationDetails = {};
  
  // Check each claimed skill
  claimedSkills.forEach(claimedSkill => {
    const normalizedClaimed = normalizeSkill(claimedSkill);
    
    // Find matching skills in test (fuzzy matching)
    let matchingTestSkills = [];
    Object.keys(skillQuestionMap).forEach(testSkill => {
      const normalizedTest = normalizeSkill(testSkill);
      
      // Exact match or partial match
      if (normalizedTest === normalizedClaimed || 
          normalizedTest.includes(normalizedClaimed) ||
          normalizedClaimed.includes(normalizedTest)) {
        matchingTestSkills.push(testSkill);
      }
    });
    
    if (matchingTestSkills.length === 0) {
      // No test questions for this skill
      untestedSkills.push(claimedSkill);
      verificationDetails[claimedSkill] = {
        status: 'not_tested',
        reason: 'No test questions mapped to this skill'
      };
    } else {
      // Check performance on questions validating this skill
      let totalQuestions = 0;
      let correctAnswers = 0;
      const questionDetails = [];
      
      matchingTestSkills.forEach(testSkill => {
        const questionsForSkill = skillQuestionMap[testSkill];
        questionsForSkill.forEach(q => {
          totalQuestions++;
          const userAnswer = userAnswers[q.questionIndex];
          const isCorrect = userAnswer === q.correctAnswer;
          
          if (isCorrect) {
            correctAnswers++;
          }
          
          questionDetails.push({
            question: q.question.substring(0, 60) + '...',
            correct: isCorrect
          });
        });
      });
      
      // Determine if skill is verified (at least one correct answer)
      if (correctAnswers > 0) {
        verifiedSkills.push(claimedSkill);
        verificationDetails[claimedSkill] = {
          status: 'verified',
          correctAnswers,
          totalQuestions,
          percentage: Math.round((correctAnswers / totalQuestions) * 100),
          questionDetails
        };
      } else {
        unverifiedSkills.push(claimedSkill);
        verificationDetails[claimedSkill] = {
          status: 'unverified',
          correctAnswers: 0,
          totalQuestions,
          percentage: 0,
          reason: 'Failed all questions validating this skill',
          questionDetails
        };
      }
    }
  });
  
  console.log(`\n✅ Verified Skills (${verifiedSkills.length}): ${verifiedSkills.join(', ') || 'None'}`);
  console.log(`❌ Unverified Skills (${unverifiedSkills.length}): ${unverifiedSkills.join(', ') || 'None'}`);
  console.log(`⚠️  Untested Skills (${untestedSkills.length}): ${untestedSkills.join(', ') || 'None'}`);
  console.log('🔍 ========== SKILL VERIFICATION COMPLETE ==========\n');
  
  return {
    verifiedSkills,
    unverifiedSkills,
    untestedSkills,
    verificationDetails
  };
}

module.exports = {
  verifySkills
};
