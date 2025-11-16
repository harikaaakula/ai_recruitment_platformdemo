import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Layout from '../../../components/Layout';
import { useAuth } from '../../../context/AuthContext';
import { applicationsAPI, testsAPI } from '../../../utils/api';
import AIRecommendations from '../../../components/AIRecommendations';

export default function ApplicationDetails() {
  const { isRecruiter } = useAuth();
  const router = useRouter();
  const { id } = router.query;
  
  const [application, setApplication] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (id && isRecruiter) {
      fetchApplicationDetails();
    }
  }, [id, isRecruiter]);

  const fetchApplicationDetails = async () => {
    try {
      const appResponse = await applicationsAPI.getById(id);
      console.log('📊 Application Data Received:', appResponse.data);
      console.log('📚 Education:', appResponse.data.education);
      console.log('💼 Experience:', appResponse.data.experience_years, appResponse.data.experience_level);
      console.log('🎓 Certifications:', appResponse.data.certifications);
      setApplication(appResponse.data);
    } catch (error) {
      console.error('❌ Error fetching application:', error);
      setError('Failed to load application details');
    } finally {
      setLoading(false);
    }
  };

  // Helper function to determine experience level from job title
  const determineExperienceLevel = (jobTitle) => {
    const title = jobTitle.toLowerCase();
    if (title.includes('senior') || title.includes('sr.')) return 'senior';
    if (title.includes('lead') || title.includes('principal')) return 'lead';
    if (title.includes('junior') || title.includes('jr.')) return 'entry';
    return 'mid';
  };

  // Helper function to calculate weighted composite score
  const calculateWeightedScore = (aiScore, testScore, experienceLevel) => {
    const weightageConfig = {
      entry: { resume_weight: 70, test_weight: 30 },
      mid: { resume_weight: 40, test_weight: 60 },
      senior: { resume_weight: 30, test_weight: 70 },
      lead: { resume_weight: 25, test_weight: 75 }
    };
    
    const weights = weightageConfig[experienceLevel] || weightageConfig.mid;
    const weightedResumeScore = (aiScore * weights.resume_weight) / 100;
    const weightedTestScore = (testScore * weights.test_weight) / 100;
    const compositeFitScore = (weightedResumeScore + weightedTestScore).toFixed(1);
    
    return {
      composite_fit_score: compositeFitScore,
      experience_level: experienceLevel,
      weightage: weights,
      breakdown: {
        weighted_resume_score: weightedResumeScore.toFixed(1),
        weighted_test_score: weightedTestScore.toFixed(1)
      }
    };
  };

  if (!isRecruiter) {
    return (
      <Layout>
        <div className="text-center text-red-600">
          Access denied. This page is for recruiters only.
        </div>
      </Layout>
    );
  }

  if (loading) {
    return (
      <Layout>
        <div className="text-center">Loading application details...</div>
      </Layout>
    );
  }

  if (error || !application) {
    return (
      <Layout>
        <div className="text-center text-red-600">{error || 'Application not found'}</div>
      </Layout>
    );
  }

  const getStatusColor = (status) => {
    switch (status) {
      case 'eligible': return 'bg-green-100 text-green-800';
      case 'not_eligible': return 'bg-red-100 text-red-800';
      case 'test_completed': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'eligible': return 'Eligible for Test';
      case 'not_eligible': return 'Not Eligible';
      case 'test_completed': return 'Test Completed';
      default: return 'Pending';
    }
  };

  // Parse AI insights from redesigned ERD structure - SHOW REAL DATA
  let aiInsights = {
    skills_matched: [],
    skill_gaps: [],
    certifications: [],
    education: { level: 'Not specified', field: 'Not specified' },
    experience_years: 0,
    experience_level: 'Not specified',
    strengths: [],
    recommendations: [],
    industry_experience: []
  };
  
  // Safely parse skills_matched
  if (application.skills_matched) {
    try {
      const matchedSkills = typeof application.skills_matched === 'string' 
        ? JSON.parse(application.skills_matched) 
        : application.skills_matched;
      
      if (Array.isArray(matchedSkills)) {
        aiInsights.skills_matched = matchedSkills.map(skill => ({
          skill: typeof skill === 'string' ? skill : (skill.skill || skill.name || String(skill)),
          level: typeof skill === 'object' && skill.level ? skill.level : 'intermediate',
          category: typeof skill === 'object' && skill.category ? skill.category : 'technical'
        }));
      }
    } catch (e) {
      console.error('Error parsing skills_matched:', e);
      aiInsights.skills_matched = [];
    }
  }
  
  // Safely parse skill_gaps
  if (application.skill_gaps) {
    try {
      const skillGaps = typeof application.skill_gaps === 'string'
        ? JSON.parse(application.skill_gaps)
        : application.skill_gaps;
      
      if (Array.isArray(skillGaps)) {
        aiInsights.skill_gaps = skillGaps.map(gap => ({
          skill: typeof gap === 'string' ? gap : (gap.skill || gap.name || String(gap)),
          priority: typeof gap === 'object' && gap.priority ? gap.priority : 'medium',
          category: typeof gap === 'object' && gap.category ? gap.category : 'technical'
        }));
      } else if (typeof skillGaps === 'object' && skillGaps.skills) {
        // Handle nested structure from skill verification
        aiInsights.skill_gaps = (skillGaps.skills || []).map(gap => ({
          skill: typeof gap === 'string' ? gap : String(gap),
          priority: 'medium',
          category: 'technical'
        }));
      }
    } catch (e) {
      console.error('Error parsing skill_gaps:', e);
      aiInsights.skill_gaps = [];
    }
  }
  
  // Safely parse certifications
  if (application.certifications) {
    try {
      const certs = typeof application.certifications === 'string'
        ? JSON.parse(application.certifications)
        : application.certifications;
      aiInsights.certifications = Array.isArray(certs) ? certs.filter(c => c) : [];
    } catch (e) {
      // Fallback: try comma-separated
      if (typeof application.certifications === 'string') {
        aiInsights.certifications = application.certifications
          .split(',')
          .map(c => c.trim())
          .filter(c => c && c !== 'null' && c !== 'undefined');
      }
    }
  }
  
  // Set education
  aiInsights.education = { 
    level: application.education || 'Not specified', 
    field: 'Not specified' 
  };
  
  // Set experience
  aiInsights.experience_years = application.experience_years || 0;
  aiInsights.experience_level = application.experience_level || 'Not specified';
  
  // Generate recommendations based on actual data
  aiInsights.recommendations = [];
  if (aiInsights.skill_gaps.length > 0) {
    const topGaps = aiInsights.skill_gaps.slice(0, 2).map(g => g.skill);
    aiInsights.recommendations.push(`Develop expertise in: ${topGaps.join(', ')}`);
  }
  if (aiInsights.certifications.length === 0) {
    aiInsights.recommendations.push('Consider obtaining relevant cybersecurity certifications');
  }
  if (aiInsights.experience_years < 3) {
    aiInsights.recommendations.push('Gain more hands-on experience through projects or internships');
  }
  if (aiInsights.recommendations.length === 0) {
    aiInsights.recommendations.push('Continue developing expertise in matched skills');
    aiInsights.recommendations.push('Stay updated with latest cybersecurity trends');
  }
  
  // Generate strengths based on actual data
  aiInsights.strengths = [];
  if (aiInsights.skills_matched.length > 0) {
    aiInsights.strengths.push(`${aiInsights.skills_matched.length} skills matched with job requirements`);
  }
  if (aiInsights.experience_years > 0) {
    aiInsights.strengths.push(`${aiInsights.experience_years} years of relevant experience`);
  }
  if (aiInsights.certifications.length > 0) {
    aiInsights.strengths.push(`${aiInsights.certifications.length} professional certifications`);
  }
  if (aiInsights.strengths.length === 0) {
    aiInsights.strengths.push('Candidate profile under review');
  }

  return (
    <Layout>
      <div className="max-w-6xl mx-auto">
        <div className="mb-6">
          <button
            onClick={() => router.back()}
            className="text-blue-600 hover:text-blue-800 mb-4"
          >
            ← Back to Dashboard
          </button>
          <h1 className="text-3xl font-bold">Candidate Application Details</h1>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Candidate Overview */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-md p-6 mb-6">
              <h2 className="text-xl font-semibold mb-4">Candidate Information</h2>
              
              <div className="space-y-3">
                <div>
                  <label className="text-sm font-medium text-gray-600">Name</label>
                  <p className="text-lg font-semibold">{application.candidate_name || 'Not provided'}</p>
                </div>
                
                <div>
                  <label className="text-sm font-medium text-gray-600">Email</label>
                  <p>{application.candidate_email || 'Not provided'}</p>
                </div>
                
                {application.candidate_phone && (
                  <div>
                    <label className="text-sm font-medium text-gray-600">Phone</label>
                    <p>{application.candidate_phone}</p>
                  </div>
                )}
                
                <div>
                  <label className="text-sm font-medium text-gray-600">Applied For</label>
                  <p className="font-medium">{application.job_title || 'Not specified'}</p>
                </div>
                
                <div>
                  <label className="text-sm font-medium text-gray-600">Application Date</label>
                  <p>{application.created_at ? new Date(application.created_at).toLocaleDateString() : 'Not available'}</p>
                </div>
                
                <div>
                  <label className="text-sm font-medium text-gray-600">Status</label>
                  <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(application.status)}`}>
                    {getStatusText(application.status)}
                  </span>
                </div>
              </div>
            </div>

            {/* Score Summary */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-lg font-semibold mb-4">Score Summary</h3>
              
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium">AI Resume Score</span>
                    <span className="text-lg font-bold text-blue-600">{application.ai_score || 0}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-blue-600 h-2 rounded-full" 
                      style={{ width: `${application.ai_score || 0}%` }}
                    ></div>
                  </div>
                </div>
                
                {application.test_score && (
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm font-medium">Test Score</span>
                      <span className="text-lg font-bold text-green-600">{application.test_score}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-green-600 h-2 rounded-full" 
                        style={{ width: `${application.test_score}%` }}
                      ></div>
                    </div>
                  </div>
                )}
                
                <div className="pt-2 border-t">
                  <div className="flex justify-between items-center mb-1">
                    <span className="font-medium">Overall Compatibility</span>
                    <span className="text-xl font-bold text-purple-600">
                      {(() => {
                        if (application.test_score) {
                          const experienceLevel = determineExperienceLevel(application.job_title);
                          const weightedScore = calculateWeightedScore(
                            application.ai_score,
                            application.test_score,
                            experienceLevel
                          );
                          return `${weightedScore.composite_fit_score}%`;
                        }
                        return `${application.ai_score}%`;
                      })()}
                    </span>
                  </div>
                  {application.test_score && (
                    <div className="text-xs text-gray-500 text-right">
                      {(() => {
                        const experienceLevel = determineExperienceLevel(application.job_title);
                        const weightedScore = calculateWeightedScore(
                          application.ai_score,
                          application.test_score,
                          experienceLevel
                        );
                        return `${weightedScore.experience_level} level (${weightedScore.weightage.resume_weight}% Resume + ${weightedScore.weightage.test_weight}% Test)`;
                      })()}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Detailed Analysis */}
          <div className="lg:col-span-2 space-y-6">
            {/* Skills Analysis */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-xl font-semibold mb-4">Skills Analysis</h3>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold text-green-700 mb-3">✓ Matched Skills</h4>
                  <div className="space-y-2">
                    {aiInsights.skills_matched && aiInsights.skills_matched.length > 0 ? (
                      aiInsights.skills_matched.map((skill, index) => (
                        <div key={index} className="flex justify-between items-center p-2 bg-green-50 rounded">
                          <span className="font-medium">{skill.skill || 'Unknown'}</span>
                          <span className={`px-2 py-1 rounded text-xs ${
                            skill.level === 'expert' ? 'bg-green-200 text-green-800' :
                            skill.level === 'intermediate' ? 'bg-yellow-200 text-yellow-800' :
                            'bg-gray-200 text-gray-800'
                          }`}>
                            {skill.level || 'N/A'}
                          </span>
                        </div>
                      ))
                    ) : (
                      <p className="text-sm text-gray-500 italic">No skills matched or data not available</p>
                    )}
                  </div>
                </div>
                
                <div>
                  <h4 className="font-semibold text-red-700 mb-3">⚠ Skill Gaps</h4>
                  <div className="space-y-2">
                    {aiInsights.skill_gaps && aiInsights.skill_gaps.length > 0 ? (
                      aiInsights.skill_gaps.map((gap, index) => (
                        <div key={index} className="flex justify-between items-center p-2 bg-red-50 rounded">
                          <span className="font-medium">{gap.skill || 'Unknown'}</span>
                          <span className={`px-2 py-1 rounded text-xs ${
                            gap.priority === 'high' ? 'bg-red-200 text-red-800' : 'bg-orange-200 text-orange-800'
                          }`}>
                            {gap.priority || 'medium'}
                          </span>
                        </div>
                      ))
                    ) : (
                      <p className="text-sm text-gray-500 italic">No skill gaps identified or data not available</p>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Experience & Education */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-xl font-semibold mb-4">Experience & Education</h3>
              
              <div className="grid md:grid-cols-3 gap-6">
                <div>
                  <h4 className="font-semibold mb-2">Experience</h4>
                  <p className="text-2xl font-bold text-blue-600">{aiInsights.experience_years || 0} years</p>
                  <p className="text-sm text-gray-600">{aiInsights.experience_level || 'Not specified'}</p>
                </div>
                
                <div>
                  <h4 className="font-semibold mb-2">Education</h4>
                  <p className="font-medium capitalize">{aiInsights.education?.level || 'Not specified'}</p>
                  <p className="text-sm text-gray-600 capitalize">{aiInsights.education?.field || 'Not specified'}</p>
                </div>
                
                <div>
                  <h4 className="font-semibold mb-2">Certifications</h4>
                  {aiInsights.certifications && aiInsights.certifications.length > 0 ? (
                    <div className="flex flex-wrap gap-1">
                      {aiInsights.certifications.slice(0, 3).map((cert, index) => (
                        <span key={index} className="px-2 py-1 bg-purple-100 text-purple-800 rounded text-xs">
                          {cert}
                        </span>
                      ))}
                      {aiInsights.certifications.length > 3 && (
                        <span className="px-2 py-1 bg-gray-100 text-gray-600 rounded text-xs">
                          +{aiInsights.certifications.length - 3} more
                        </span>
                      )}
                    </div>
                  ) : (
                    <p className="text-sm text-gray-500 italic">None listed</p>
                  )}
                </div>
              </div>
            </div>



            {/* Strengths & Recommendations */}
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-lg font-semibold mb-4 text-green-700">Strengths</h3>
                <ul className="space-y-2">
                  {aiInsights.strengths && aiInsights.strengths.length > 0 ? (
                    aiInsights.strengths.map((strength, index) => (
                      <li key={index} className="flex items-start">
                        <span className="text-green-600 mr-2">•</span>
                        <span>{strength}</span>
                      </li>
                    ))
                  ) : (
                    <li className="text-sm text-gray-500 italic">Analysis in progress</li>
                  )}
                </ul>
              </div>
              
              <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-lg font-semibold mb-4 text-orange-700">Recommendations</h3>
                <ul className="space-y-2">
                  {aiInsights.recommendations && aiInsights.recommendations.length > 0 ? (
                    aiInsights.recommendations.map((rec, index) => (
                      <li key={index} className="flex items-start">
                        <span className="text-orange-600 mr-2">•</span>
                        <span>{rec}</span>
                      </li>
                    ))
                  ) : (
                    <li className="text-sm text-gray-500 italic">No recommendations available</li>
                  )}
                </ul>
              </div>
            </div>

            {/* Test Results */}
            {application.test_score !== null && application.test_score !== undefined && (
              <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-xl font-semibold mb-4">Test Performance</h3>
                
                <div className="grid md:grid-cols-2 gap-4 mb-6">
                  <div className="text-center p-4 bg-blue-50 rounded-lg">
                    <p className="text-2xl font-bold text-blue-600">{application.test_score || 0}%</p>
                    <p className="text-sm text-gray-600">Overall Score</p>
                  </div>
                  <div className="text-center p-4 bg-purple-50 rounded-lg">
                    <p className="text-2xl font-bold text-purple-600">
                      {application.test_completed_at 
                        ? new Date(application.test_completed_at).toLocaleDateString()
                        : 'N/A'}
                    </p>
                    <p className="text-sm text-gray-600">Completed On</p>
                  </div>
                </div>

                {/* Skill Verification Results */}
                {(application.verified_skills || application.unverified_skills || application.untested_skills) && (
                  <div className="mt-6">
                    <h4 className="font-semibold mb-3">Skill Verification</h4>
                    <div className="grid md:grid-cols-3 gap-4">
                      {application.verified_skills && (() => {
                        try {
                          const verified = typeof application.verified_skills === 'string' 
                            ? JSON.parse(application.verified_skills) 
                            : application.verified_skills;
                          if (Array.isArray(verified) && verified.length > 0) {
                            return (
                              <div>
                                <p className="text-sm font-medium text-green-700 mb-2">✓ Verified Skills</p>
                                <div className="space-y-1">
                                  {verified.map((skill, idx) => (
                                    <span key={idx} className="block px-2 py-1 bg-green-100 text-green-800 rounded text-sm">
                                      {skill}
                                    </span>
                                  ))}
                                </div>
                              </div>
                            );
                          }
                        } catch (e) {
                          return null;
                        }
                      })()}
                      
                      {application.unverified_skills && (() => {
                        try {
                          const unverified = typeof application.unverified_skills === 'string' 
                            ? JSON.parse(application.unverified_skills) 
                            : application.unverified_skills;
                          if (Array.isArray(unverified) && unverified.length > 0) {
                            return (
                              <div>
                                <p className="text-sm font-medium text-red-700 mb-2">✗ Unverified Skills</p>
                                <div className="space-y-1">
                                  {unverified.map((skill, idx) => (
                                    <span key={idx} className="block px-2 py-1 bg-red-100 text-red-800 rounded text-sm">
                                      {skill}
                                    </span>
                                  ))}
                                </div>
                              </div>
                            );
                          }
                        } catch (e) {
                          return null;
                        }
                      })()}
                      
                      {application.untested_skills && (() => {
                        try {
                          const untested = typeof application.untested_skills === 'string' 
                            ? JSON.parse(application.untested_skills) 
                            : application.untested_skills;
                          if (Array.isArray(untested) && untested.length > 0) {
                            return (
                              <div>
                                <p className="text-sm font-medium text-gray-700 mb-2">? Untested Skills</p>
                                <div className="space-y-1">
                                  {untested.map((skill, idx) => (
                                    <span key={idx} className="block px-2 py-1 bg-gray-100 text-gray-800 rounded text-sm">
                                      {skill}
                                    </span>
                                  ))}
                                </div>
                              </div>
                            );
                          }
                        } catch (e) {
                          return null;
                        }
                      })()}
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* AI Recommendations Section */}
            {aiInsights.recommendations && aiInsights.recommendations.length > 0 && (
              <AIRecommendations recommendations={aiInsights.recommendations} />
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
}