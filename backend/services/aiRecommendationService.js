const OpenAI = require('openai');

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// AI Recommendation Service for Recruiters
class AIRecommendationService {
  
  /**
   * Generate hiring recommendations for a candidate
   */
  static async generateHiringRecommendation(candidateData, jobData) {
    const prompt = `
    As an AI recruitment advisor, analyze this candidate for the given job role and provide hiring recommendations.

    Job Role: ${jobData.title}
    Job Requirements: ${jobData.requirements}
    Threshold Score: ${jobData.threshold_score}%

    Candidate Profile:
    - Name: ${candidateData.name}
    - AI Score: ${candidateData.ai_score}%
    - Test Score: ${candidateData.test_score || 'Not taken'}%
    - Experience: ${candidateData.experience_years || 'Unknown'} years
    - Skills: ${JSON.stringify(candidateData.skills_matched || [])}
    - Education: ${candidateData.education || 'Not specified'}

    Provide recommendations in JSON format:
    {
      "hiring_recommendation": "hire|interview|reject|waitlist",
      "confidence_score": 85,
      "key_strengths": ["strength1", "strength2"],
      "concerns": ["concern1", "concern2"],
      "interview_focus_areas": ["area1", "area2"],
      "salary_range_suggestion": {"min": 80000, "max": 120000},
      "onboarding_recommendations": ["rec1", "rec2"],
      "reasoning": "Detailed explanation of recommendation"
    }
    `;

    try {
      if (!process.env.OPENAI_API_KEY || process.env.OPENAI_API_KEY === 'your_openai_api_key_here') {
        return this.generateMockHiringRecommendation(candidateData, jobData);
      }

      const response = await openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: [{ role: "user", content: prompt }],
        temperature: 0.3,
      });

      return JSON.parse(response.choices[0].message.content);
    } catch (error) {
      console.error('AI recommendation error:', error);
      return this.generateMockHiringRecommendation(candidateData, jobData);
    }
  }

  /**
   * Generate interview questions based on candidate profile
   */
  static async generateInterviewQuestions(candidateData, jobData) {
    const prompt = `
    Generate personalized interview questions for this candidate based on their profile and the job requirements.

    Job: ${jobData.title}
    Candidate Skills: ${JSON.stringify(candidateData.skills_matched || [])}
    Candidate Experience: ${candidateData.experience_years || 0} years
    Skill Gaps: ${JSON.stringify(candidateData.skill_gaps || [])}

    Generate 8-10 interview questions in JSON format:
    {
      "technical_questions": [
        {"question": "...", "focus_area": "technical_skill", "difficulty": "medium"},
        {"question": "...", "focus_area": "problem_solving", "difficulty": "hard"}
      ],
      "behavioral_questions": [
        {"question": "...", "focus_area": "teamwork", "reasoning": "..."},
        {"question": "...", "focus_area": "leadership", "reasoning": "..."}
      ],
      "situational_questions": [
        {"question": "...", "scenario": "...", "expected_skills": ["skill1", "skill2"]}
      ]
    }
    `;

    try {
      if (!process.env.OPENAI_API_KEY || process.env.OPENAI_API_KEY === 'your_openai_api_key_here') {
        return this.generateMockInterviewQuestions(candidateData, jobData);
      }

      const response = await openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: [{ role: "user", content: prompt }],
        temperature: 0.4,
      });

      return JSON.parse(response.choices[0].message.content);
    } catch (error) {
      console.error('AI interview questions error:', error);
      return this.generateMockInterviewQuestions(candidateData, jobData);
    }
  }

  /**
   * Suggest similar candidates
   */
  static async findSimilarCandidates(targetCandidate, allCandidates) {
    const similarities = allCandidates
      .filter(candidate => candidate.id !== targetCandidate.id)
      .map(candidate => ({
        ...candidate,
        similarity_score: this.calculateSimilarityScore(targetCandidate, candidate)
      }))
      .sort((a, b) => b.similarity_score - a.similarity_score)
      .slice(0, 5);

    return {
      similar_candidates: similarities,
      reasoning: this.generateSimilarityReasoning(targetCandidate, similarities[0])
    };
  }

  /**
   * Generate job posting optimization suggestions
   */
  static async optimizeJobPosting(jobData, marketData) {
    const suggestions = {
      title_suggestions: this.generateTitleSuggestions(jobData.title),
      skill_recommendations: this.generateSkillRecommendations(jobData.requirements, marketData),
      threshold_optimization: this.optimizeThreshold(jobData.threshold_score, marketData),
      description_improvements: this.generateDescriptionImprovements(jobData.description),
      competitiveness_analysis: this.analyzeCompetitiveness(jobData, marketData)
    };

    return suggestions;
  }

  /**
   * Generate personalized communication templates
   */
  static generateCommunicationTemplates(candidateData, action) {
    const templates = {
      interview_invitation: this.generateInterviewInvitation(candidateData),
      rejection_email: this.generateRejectionEmail(candidateData),
      offer_email: this.generateOfferEmail(candidateData),
      follow_up_email: this.generateFollowUpEmail(candidateData)
    };

    return templates[action] || templates.follow_up_email;
  }

  // Mock implementations for when OpenAI is not available
  static generateMockHiringRecommendation(candidateData, jobData) {
    const aiScore = candidateData.ai_score || 0;
    const testScore = candidateData.test_score || 0;
    const avgScore = testScore > 0 ? (aiScore + testScore) / 2 : aiScore;

    let recommendation = 'interview';
    let confidence = 75;

    if (avgScore >= 85) {
      recommendation = 'hire';
      confidence = 90;
    } else if (avgScore >= 70) {
      recommendation = 'interview';
      confidence = 80;
    } else if (avgScore >= 60) {
      recommendation = 'waitlist';
      confidence = 65;
    } else {
      recommendation = 'reject';
      confidence = 70;
    }

    return {
      hiring_recommendation: recommendation,
      confidence_score: confidence,
      key_strengths: candidateData.skills_matched?.slice(0, 3) || ['Technical aptitude', 'Problem solving'],
      concerns: candidateData.skill_gaps?.slice(0, 2) || ['Limited experience in some areas'],
      interview_focus_areas: ['Technical skills', 'Problem-solving approach', 'Team collaboration'],
      salary_range_suggestion: { min: 80000, max: 120000 },
      onboarding_recommendations: ['Technical mentorship', 'Skill development plan'],
      reasoning: `Based on AI score of ${aiScore}% and test performance, this candidate shows ${recommendation === 'hire' ? 'strong' : 'moderate'} potential for the role.`
    };
  }

  static generateMockInterviewQuestions(candidateData, jobData) {
    const jobTitle = jobData.title.toLowerCase();
    
    let technicalQuestions = [
      { question: "Walk me through your approach to solving a complex technical problem.", focus_area: "problem_solving", difficulty: "medium" },
      { question: "How do you stay updated with the latest technologies in your field?", focus_area: "continuous_learning", difficulty: "easy" }
    ];

    if (jobTitle.includes('developer') || jobTitle.includes('engineer')) {
      technicalQuestions.push(
        { question: "Explain the difference between synchronous and asynchronous programming.", focus_area: "technical_knowledge", difficulty: "medium" },
        { question: "How would you optimize the performance of a slow-running application?", focus_area: "optimization", difficulty: "hard" }
      );
    }

    return {
      technical_questions: technicalQuestions,
      behavioral_questions: [
        { question: "Tell me about a time when you had to work with a difficult team member.", focus_area: "teamwork", reasoning: "Assesses collaboration skills" },
        { question: "Describe a situation where you had to learn something new quickly.", focus_area: "adaptability", reasoning: "Tests learning agility" }
      ],
      situational_questions: [
        { question: "If you were given a project with an impossible deadline, how would you handle it?", scenario: "time_pressure", expected_skills: ["time_management", "communication"] }
      ]
    };
  }

  static calculateSimilarityScore(candidate1, candidate2) {
    let score = 0;
    
    // Compare AI scores (30% weight)
    const scoreDiff = Math.abs((candidate1.ai_score || 0) - (candidate2.ai_score || 0));
    score += (100 - scoreDiff) * 0.3;
    
    // Compare skills (40% weight)
    const skills1 = candidate1.skills_matched || [];
    const skills2 = candidate2.skills_matched || [];
    const commonSkills = skills1.filter(skill => skills2.includes(skill));
    const skillSimilarity = commonSkills.length / Math.max(skills1.length, skills2.length, 1);
    score += skillSimilarity * 100 * 0.4;
    
    // Compare experience (30% weight)
    const exp1 = candidate1.experience_years || 0;
    const exp2 = candidate2.experience_years || 0;
    const expSimilarity = 100 - Math.abs(exp1 - exp2) * 10;
    score += Math.max(0, expSimilarity) * 0.3;
    
    return Math.round(score);
  }

  static generateSimilarityReasoning(target, similar) {
    if (!similar) return "No similar candidates found.";
    
    return `Similar candidate found with ${similar.similarity_score}% match. Both candidates share similar skill sets and experience levels.`;
  }

  static generateTitleSuggestions(currentTitle) {
    const suggestions = [];
    const title = currentTitle.toLowerCase();
    
    if (title.includes('developer')) {
      suggestions.push('Software Engineer', 'Full Stack Developer', 'Application Developer');
    } else if (title.includes('manager')) {
      suggestions.push('Team Lead', 'Project Manager', 'Department Head');
    }
    
    return suggestions.slice(0, 3);
  }

  static generateSkillRecommendations(requirements, marketData) {
    return {
      trending_skills: ['TypeScript', 'Docker', 'Kubernetes', 'AWS'],
      missing_skills: ['Cloud Computing', 'DevOps', 'Agile Methodologies'],
      reasoning: 'Based on current market trends and similar job postings'
    };
  }

  static optimizeThreshold(currentThreshold, marketData) {
    return {
      recommended_threshold: Math.max(65, Math.min(85, currentThreshold + 5)),
      reasoning: 'Optimized based on market standards and application success rates',
      impact_prediction: 'May increase qualified candidate pool by 15%'
    };
  }

  static generateDescriptionImprovements(description) {
    return {
      improvements: [
        'Add more specific technical requirements',
        'Include company culture information',
        'Mention growth opportunities',
        'Specify remote work options'
      ],
      tone_suggestions: 'Consider making the tone more engaging and inclusive'
    };
  }

  static analyzeCompetitiveness(jobData, marketData) {
    return {
      competitiveness_score: 75,
      market_position: 'Competitive',
      recommendations: [
        'Salary range is competitive for the market',
        'Consider highlighting unique benefits',
        'Job requirements align with industry standards'
      ]
    };
  }

  static generateInterviewInvitation(candidateData) {
    return {
      subject: `Interview Invitation - ${candidateData.job_title || 'Position'}`,
      template: `Dear ${candidateData.name},

Thank you for your application. We were impressed by your background in ${candidateData.skills_matched?.[0] || 'your field'} and would like to invite you for an interview.

Based on your profile, we're particularly interested in discussing your experience with ${candidateData.skills_matched?.slice(0, 2).join(' and ') || 'relevant technologies'}.

Please let us know your availability for the coming week.

Best regards,
Hiring Team`
    };
  }

  static generateRejectionEmail(candidateData) {
    return {
      subject: `Application Update - ${candidateData.job_title || 'Position'}`,
      template: `Dear ${candidateData.name},

Thank you for your interest in our ${candidateData.job_title || 'position'} role and for taking the time to apply.

After careful consideration, we have decided to move forward with other candidates whose experience more closely aligns with our current needs, particularly in ${candidateData.skill_gaps?.[0] || 'specific technical areas'}.

We were impressed by your ${candidateData.skills_matched?.[0] || 'technical skills'} and encourage you to apply for future opportunities that match your expertise.

Best wishes for your job search.

Regards,
Hiring Team`
    };
  }

  static generateOfferEmail(candidateData) {
    return {
      subject: `Job Offer - ${candidateData.job_title || 'Position'}`,
      template: `Dear ${candidateData.name},

Congratulations! We are pleased to extend an offer for the ${candidateData.job_title || 'position'} role.

Your strong background in ${candidateData.skills_matched?.slice(0, 2).join(' and ') || 'relevant technologies'} and impressive performance in our assessment process made you our top choice.

Please find the detailed offer attached. We're excited about the possibility of you joining our team.

Best regards,
Hiring Team`
    };
  }

  static generateFollowUpEmail(candidateData) {
    return {
      subject: `Following up on your application - ${candidateData.job_title || 'Position'}`,
      template: `Dear ${candidateData.name},

I wanted to follow up on your recent application for our ${candidateData.job_title || 'position'} role.

We're currently reviewing applications and were impressed by your experience in ${candidateData.skills_matched?.[0] || 'your field'}. We expect to make decisions by the end of this week.

Thank you for your patience, and we'll be in touch soon.

Best regards,
Hiring Team`
    };
  }
}

module.exports = AIRecommendationService;