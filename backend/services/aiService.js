/**
 * AI Service for ATS - Uses OpenRouter/DeepSeek
 * Extracts structured data and calculates scores using ATS logic
 */

const OpenAI = require('openai');
const { matchResumeToJob } = require('./matchingEngine');
const { generateSuggestions } = require('./improvementSuggestions');

// Support multiple AI providers
const getAIClient = () => {
  const provider = process.env.AI_PROVIDER || 'mock';
  
  if (provider === 'openrouter') {
    return new OpenAI({
      apiKey: process.env.OPENROUTER_API_KEY,
      baseURL: 'https://openrouter.ai/api/v1',
      defaultHeaders: {
        'HTTP-Referer': process.env.APP_URL || 'http://localhost:3000',
        'X-Title': 'AI Recruitment Platform'
      }
    });
  } else if (provider === 'openai') {
    return new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });
  }
  
  return null;
};

/**
 * Parse resume using AI and match against job
 * @param {string} resumeText - Raw resume text
 * @param {Object} jobData - Job role data from jobRoles_ATS
 * @returns {Object} Complete analysis with scores and suggestions
 */
async function parseResumeWithATS(resumeText, jobData) {
  const provider = process.env.AI_PROVIDER || 'mock';
  const aiClient = getAIClient();
  
  // Check if AI service is configured
  if (!aiClient || 
      (provider === 'openai' && (!process.env.OPENAI_API_KEY || process.env.OPENAI_API_KEY === 'your_openai_api_key_here')) ||
      (provider === 'openrouter' && (!process.env.OPENROUTER_API_KEY || process.env.OPENROUTER_API_KEY === 'your_openrouter_api_key_here'))) {
    console.log('⚠️  Using mock AI service - no API key provided');
    return generateMockAnalysis(resumeText, jobData);
  }

  try {
    // Structured prompt for DeepSeek
    const systemPrompt = `You are an expert resume parser for cybersecurity recruitment. Extract structured data from resumes.

OUTPUT MUST BE VALID JSON with this exact structure:
{
  "yearsOfExperience": <number>,
  "skills": [<array of skills found>],
  "knowledgeKeywords": [<array of knowledge areas>],
  "taskKeywords": [<array of tasks/responsibilities>],
  "education": "<highest degree>",
  "certifications": [<array of certifications>],
  "jobTitles": [<array of job titles>],
  "projectKeywords": [<array of project-related keywords>]
}`;

    const userPrompt = `Extract information from this resume:

RESUME:
${resumeText}

JOB CONTEXT (for reference):
Title: ${jobData.title}
Required Skills: ${jobData.skills.join(', ')}
Required Knowledge: ${jobData.knowledge.join(', ')}
Required Tasks: ${jobData.tasks.join(', ')}

Extract all relevant information and return as JSON.`;

    const model = provider === 'openrouter' 
      ? (process.env.MODEL_NAME || 'deepseek/deepseek-chat-v3.1:free')
      : 'gpt-3.5-turbo';

    console.log(`✅ Using ${provider} with model: ${model}`);

    const response = await aiClient.chat.completions.create({
      model: model,
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: userPrompt }
      ],
      temperature: 0.1,
      response_format: { type: "json_object" }
    });

    let rawAnalysis = response.choices[0].message.content;
    
    // Remove markdown if present
    if (rawAnalysis.includes('```json')) {
      rawAnalysis = rawAnalysis.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim();
    }
    
    const parsedData = JSON.parse(rawAnalysis);
    console.log('🔍 DeepSeek Parsed Data:', JSON.stringify(parsedData, null, 2));
    
    // Use matching engine to calculate scores
    const matchResult = matchResumeToJob(parsedData, jobData);
    
    // Generate suggestions
    const suggestions = generateSuggestions(matchResult, parsedData, jobData);
    
    // Return combined result
    return {
      // Parsed data
      yearsOfExperience: parsedData.yearsOfExperience || 0,
      skills: parsedData.skills || [],
      knowledgeKeywords: parsedData.knowledgeKeywords || [],
      taskKeywords: parsedData.taskKeywords || [],
      education: parsedData.education || 'Not specified',
      certifications: parsedData.certifications || [],
      jobTitles: parsedData.jobTitles || [],
      
      // Matching results
      score: matchResult.finalScore,
      skillMatchPercent: matchResult.skillMatchPercent,
      knowledgeMatchPercent: matchResult.knowledgeMatchPercent,
      taskMatchPercent: matchResult.taskMatchPercent,
      
      // Eligibility
      eligibility: matchResult.eligibility,
      eligibilityMessage: matchResult.eligibilityMessage,
      
      // Gaps
      skills_matched: matchResult.skillDetails.matched,
      skill_gaps: matchResult.skillDetails.missing,
      knowledge_gaps: matchResult.knowledgeDetails.missing,
      task_gaps: matchResult.taskDetails.missing,
      
      // Experience
      experience_years: parsedData.yearsOfExperience || 0,
      experience_level: determineExperienceLevel(parsedData.yearsOfExperience || 0),
      experience_status: matchResult.experienceMatch.status,
      
      // Feedback
      warnings: matchResult.warnings,
      suggestions: suggestions,
      
      // Summary
      summary: generateSummary(matchResult, parsedData)
    };

  } catch (error) {
    console.error('❌ AI parsing error:', error.message);
    console.error('Error details:', error);
    console.log('⚠️  Falling back to mock AI service');
    return generateMockAnalysis(resumeText, jobData);
  }
}

/**
 * Generate mock analysis when AI is not available
 */
function generateMockAnalysis(resumeText, jobData) {
  console.log('⚠️  Using MOCK AI - extracting data with regex patterns');
  const text = resumeText.toLowerCase();
  const originalText = resumeText;
  
  // Simple keyword matching
  const foundSkills = jobData.skills.filter(skill => 
    text.includes(skill.toLowerCase())
  );
  
  const foundKnowledge = jobData.knowledge.filter(knowledge => 
    text.includes(knowledge.toLowerCase())
  );
  
  const foundTasks = jobData.tasks.filter(task => {
    const keywords = task.toLowerCase().split(' ').filter(w => w.length > 3);
    return keywords.some(kw => text.includes(kw));
  });
  
  // Extract experience - improved
  const expMatch = text.match(/(\d+)\+?\s*years?/);
  const yearsOfExperience = expMatch ? parseInt(expMatch[1]) : 2;
  
  // Extract education - improved
  let education = 'Not specified';
  if (text.includes('bachelor')) {
    // Try to extract full degree name
    const bachelorMatch = originalText.match(/bachelor[^\n|]*/i);
    education = bachelorMatch ? bachelorMatch[0].trim() : 'Bachelor\'s Degree';
  } else if (text.includes('master')) {
    const masterMatch = originalText.match(/master[^\n|]*/i);
    education = masterMatch ? masterMatch[0].trim() : 'Master\'s Degree';
  } else if (text.includes('associate')) {
    education = 'Associate\'s Degree';
  }
  
  // Extract certifications - improved with deduplication
  const certifications = new Set();
  const certMap = {
    'CompTIA Security+': /CompTIA\s+Security\+/gi,
    'CompTIA Network+': /CompTIA\s+Network\+/gi,
    'CompTIA CySA+': /CompTIA\s+CySA\+/gi,
    'CompTIA A+': /CompTIA\s+A\+/gi,
    'CEH': /Certified\s+Ethical\s+Hacker|(?<!\w)CEH(?!\w)/gi,
    'CISSP': /(?<!\w)CISSP(?!\w)/gi,
    'CISM': /(?<!\w)CISM(?!\w)/gi,
    'CISA': /(?<!\w)CISA(?!\w)/gi,
    'OSCP': /Offensive\s+Security\s+Certified\s+Professional|(?<!\w)OSCP(?!\w)/gi,
    'GIAC': /(?<!\w)GIAC(?!\w)/gi,
    'GSEC': /GIAC\s+Security\s+Essentials|(?<!\w)GSEC(?!\w)/gi,
    'GCIH': /GIAC\s+Certified\s+Incident\s+Handler|(?<!\w)GCIH(?!\w)/gi
  };
  
  // Check each certification pattern
  Object.entries(certMap).forEach(([certName, pattern]) => {
    if (pattern.test(originalText)) {
      certifications.add(certName);
    }
  });
  
  // Convert Set to Array
  const certificationsArray = Array.from(certifications);
  
  // If no certifications found, return empty array (don't add fake ones)
  if (certificationsArray.length === 0) {
    console.log('⚠️  No certifications found in resume');
  }
  
  console.log('📚 Extracted Education:', education);
  console.log('🎓 Extracted Certifications:', certificationsArray);
  
  // Mock parsed data
  const parsedData = {
    yearsOfExperience,
    skills: foundSkills,
    knowledgeKeywords: foundKnowledge,
    taskKeywords: foundTasks,
    education: education,
    certifications: certificationsArray,
    jobTitles: ['Security Analyst']
  };
  
  // Use matching engine
  const matchResult = matchResumeToJob(parsedData, jobData);
  const suggestions = generateSuggestions(matchResult, parsedData, jobData);
  
  return {
    yearsOfExperience,
    skills: foundSkills,
    knowledgeKeywords: foundKnowledge,
    taskKeywords: foundTasks,
    education: parsedData.education,
    certifications: parsedData.certifications,
    jobTitles: parsedData.jobTitles,
    score: matchResult.finalScore,
    skillMatchPercent: matchResult.skillMatchPercent,
    knowledgeMatchPercent: matchResult.knowledgeMatchPercent,
    taskMatchPercent: matchResult.taskMatchPercent,
    eligibility: matchResult.eligibility,
    eligibilityMessage: matchResult.eligibilityMessage,
    skills_matched: matchResult.skillDetails.matched,
    skill_gaps: matchResult.skillDetails.missing,
    knowledge_gaps: matchResult.knowledgeDetails.missing,
    task_gaps: matchResult.taskDetails.missing,
    experience_years: yearsOfExperience,
    experience_level: determineExperienceLevel(yearsOfExperience),
    experience_status: matchResult.experienceMatch.status,
    warnings: matchResult.warnings,
    suggestions: suggestions,
    summary: generateSummary(matchResult, parsedData)
  };
}

function determineExperienceLevel(years) {
  if (years === 0) return 'entry';
  if (years <= 2) return 'entry';
  if (years <= 5) return 'mid';
  if (years <= 10) return 'senior';
  return 'lead';
}

function generateSummary(matchResult, parsedData) {
  return `Candidate scored ${matchResult.finalScore}% overall. ` +
    `${matchResult.skillDetails.matchedCount}/${matchResult.skillDetails.totalRequired} skills matched. ` +
    `${parsedData.yearsOfExperience} years of experience. ` +
    `Status: ${matchResult.eligibilityMessage}`;
}

/**
 * Generate personalized suggestions for candidates using AI
 * @param {Object} analysisResult - The AI analysis result
 * @param {Object} jobData - Job role data
 * @returns {Object} Personalized suggestions
 */
async function generatePersonalizedSuggestions(analysisResult, jobData) {
  const provider = process.env.AI_PROVIDER || 'mock';
  const aiClient = getAIClient();
  
  // If AI not available, return null (no suggestions)
  if (!aiClient || 
      (provider === 'openai' && (!process.env.OPENAI_API_KEY || process.env.OPENAI_API_KEY === 'your_openai_api_key_here')) ||
      (provider === 'openrouter' && (!process.env.OPENROUTER_API_KEY || process.env.OPENROUTER_API_KEY === 'your_openrouter_api_key_here'))) {
    console.log('⚠️  AI not available - skipping personalized suggestions');
    return null;
  }

  try {
    const isEligible = analysisResult.score >= jobData.thresholdScore;
    
    let prompt;
    if (isEligible) {
      // For eligible candidates - test preparation tips
      prompt = `You are a helpful career advisor. A candidate just applied for "${jobData.title}" and is ELIGIBLE for the skills test.

Candidate Profile:
- Resume Score: ${analysisResult.score}/100
- Matched Skills: ${analysisResult.skills_matched.slice(0, 5).join(', ')}
- Experience: ${analysisResult.experience_years} years

Generate 3-4 encouraging test preparation tips. Be specific about what skills to review.
Format as JSON array of strings. Keep each tip to 1-2 sentences. Be encouraging and practical.

Example format:
["Tip 1 here", "Tip 2 here", "Tip 3 here"]`;
    } else {
      // For not eligible candidates - improvement suggestions
      const topGaps = analysisResult.skill_gaps.slice(0, 3);
      prompt = `You are a supportive career advisor. A candidate applied for "${jobData.title}" but didn't meet the minimum score (got ${analysisResult.score}/100, needed ${jobData.thresholdScore}).

Candidate Profile:
- Current Skills: ${analysisResult.skills_matched.join(', ') || 'Limited match'}
- Missing Skills: ${topGaps.join(', ')}
- Experience: ${analysisResult.experience_years} years

Generate 3 personalized, encouraging suggestions to help them improve. Each suggestion should:
1. Focus on one of the missing skills
2. Be actionable and specific
3. Be encouraging and realistic
4. Mention practical resources or steps

Format as JSON array of strings. Keep each suggestion to 2-3 sentences.

Example format:
["Suggestion 1 about skill A", "Suggestion 2 about skill B", "Suggestion 3 about skill C"]`;
    }

    const model = provider === 'openrouter' 
      ? (process.env.MODEL_NAME || 'deepseek/deepseek-chat-v3.1:free')
      : 'gpt-3.5-turbo';

    console.log(`🤖 Generating personalized suggestions using ${model}...`);

    const response = await aiClient.chat.completions.create({
      model: model,
      messages: [
        { role: "system", content: "You are a helpful career advisor. Always return valid JSON arrays." },
        { role: "user", content: prompt }
      ],
      temperature: 0.7,
      max_tokens: 500
    });

    let content = response.choices[0].message.content.trim();
    
    // Clean up markdown if present
    if (content.includes('```json')) {
      content = content.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim();
    }
    
    const suggestions = JSON.parse(content);
    
    if (!Array.isArray(suggestions)) {
      throw new Error('AI did not return an array');
    }
    
    console.log(`✅ Generated ${suggestions.length} personalized suggestions`);
    
    return {
      isEligible,
      suggestions,
      message: isEligible 
        ? "Congratulations! Your profile matches our requirements." 
        : "Thank you for applying. Here are some suggestions to strengthen your profile."
    };

  } catch (error) {
    console.error('❌ Error generating personalized suggestions:', error.message);
    return null; // Fail gracefully
  }
}

module.exports = {
  parseResumeWithATS,
  generatePersonalizedSuggestions
};
