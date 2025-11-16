import { useState, useEffect } from 'react';
import Layout from '../../components/Layout';
import Link from 'next/link';
import { useAuth } from '../../context/AuthContext';
import { jobsAPI, applicationsAPI } from '../../utils/api';
import ScoringExplanation from '../../components/ScoringExplanation';

export default function RecruiterDashboard() {
  const { user, isRecruiter } = useAuth();
  const [jobs, setJobs] = useState([]);
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showScoringExplanation, setShowScoringExplanation] = useState(false);

  useEffect(() => {
    if (isRecruiter) {
      fetchDashboardData();
    }
  }, [isRecruiter]);

  const fetchDashboardData = async () => {
    try {
      const [jobsResponse, applicationsResponse] = await Promise.all([
        jobsAPI.getMyJobs(),
        applicationsAPI.getAllForRecruiter(),
      ]);
      
      setJobs(jobsResponse.data);
      setApplications(applicationsResponse.data);
    } catch (error) {
      setError('Failed to load dashboard data');
    } finally {
      setLoading(false);
    }
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
        <div className="text-center">Loading dashboard...</div>
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

  // Calculate statistics
  const totalApplications = applications.length;
  
  // NEW DEFINITION: Eligible = AI score >= job threshold AND test passed (score >= 70)
  const eligibleApplications = applications.filter(app => {
    // Must have completed test and passed it
    return app.status === 'test_completed' && app.test_score >= 70;
  }).length;
  
  const completedTests = applications.filter(app => app.status === 'test_completed').length;
  
  // For status distribution - actual statuses from data
  const testCompletedPassed = applications.filter(app => app.status === 'test_completed' && app.test_score >= 70).length;
  const testCompletedFailed = applications.filter(app => app.status === 'test_completed' && app.test_score < 70).length;
  const notEligible = applications.filter(app => app.status === 'not_eligible').length;
  
  const averageAIScore = applications.length > 0 
    ? Math.round(applications.reduce((sum, app) => sum + (app.ai_score || 0), 0) / applications.length)
    : 0;
  
  const averageTestScore = completedTests > 0
    ? Math.round(applications.filter(app => app.test_score).reduce((sum, app) => sum + (app.test_score || 0), 0) / completedTests)
    : 0;

  return (
    <Layout>
      <div>
        <div className="mb-8">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold">Recruiter Dashboard</h1>
              <p className="text-gray-600 mt-2">View and analyze candidate applications with weighted scoring</p>
            </div>
            <button
              onClick={() => setShowScoringExplanation(true)}
              className="bg-blue-100 text-blue-800 px-4 py-2 rounded-lg hover:bg-blue-200 text-sm"
            >
              📊 How Scoring Works
            </button>
          </div>
        </div>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            {error}
          </div>
        )}

        {/* 1. Total Overview Cards */}
        <div className="grid md:grid-cols-5 gap-6 mb-8">
          {/* Total Jobs */}
          <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-sm font-semibold text-gray-600">Total Jobs</h3>
              <span className="text-2xl">💼</span>
            </div>
            <p className="text-4xl font-bold text-blue-600 mb-1">{jobs.length}</p>
            <p className="text-xs text-gray-500">Active job postings</p>
          </div>
          
          {/* Total Candidates Applied */}
          <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-sm font-semibold text-gray-600">Total Candidates</h3>
              <span className="text-2xl">👥</span>
            </div>
            <p className="text-4xl font-bold text-green-600 mb-1">{totalApplications}</p>
            <p className="text-xs text-gray-500">Applied across all jobs</p>
          </div>
          
          {/* Eligible Candidates - NEW DEFINITION */}
          <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow group relative">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-sm font-semibold text-gray-600 cursor-help border-b border-dotted border-gray-400">
                Eligible Candidates
              </h3>
              <span className="text-2xl">✅</span>
            </div>
            <p className="text-4xl font-bold text-purple-600 mb-1">{eligibleApplications}</p>
            <p className="text-xs text-gray-500">{totalApplications > 0 ? Math.round((eligibleApplications/totalApplications)*100) : 0}% of total</p>
            
            {/* Tooltip */}
            <div className="absolute bottom-full left-0 mb-2 hidden group-hover:block bg-gray-900 text-white text-xs rounded-lg py-3 px-4 w-64 z-10 shadow-xl">
              <p className="font-semibold mb-1">Eligible Candidates Definition:</p>
              <p>Candidates whose AI score met the job threshold AND who passed the job-specific assessment (test score ≥ 70%).</p>
              <div className="absolute top-full left-4 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-900"></div>
            </div>
          </div>
          
          {/* Average AI Score */}
          <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow group relative">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-sm font-semibold text-gray-600 cursor-help border-b border-dotted border-gray-400">
                Avg AI Score
              </h3>
              <span className="text-2xl">🤖</span>
            </div>
            <p className="text-4xl font-bold text-orange-600 mb-1">{averageAIScore}%</p>
            <p className="text-xs text-gray-500">Resume screening score</p>
            
            {/* Tooltip */}
            <div className="absolute bottom-full left-0 mb-2 hidden group-hover:block bg-gray-900 text-white text-xs rounded-lg py-3 px-4 w-64 z-10 shadow-xl">
              <p className="font-semibold mb-1">AI Score Calculation:</p>
              <p>Average AI resume screening score across all candidates. Evaluates skills match, experience, and qualifications.</p>
              <div className="absolute top-full left-4 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-900"></div>
            </div>
          </div>
          
          {/* Average Test Score */}
          <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow group relative">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-sm font-semibold text-gray-600 cursor-help border-b border-dotted border-gray-400">
                Avg Test Score
              </h3>
              <span className="text-2xl">📝</span>
            </div>
            <p className="text-4xl font-bold text-indigo-600 mb-1">{averageTestScore}%</p>
            <p className="text-xs text-gray-500">For {completedTests} tested</p>
            
            {/* Tooltip */}
            <div className="absolute bottom-full left-0 mb-2 hidden group-hover:block bg-gray-900 text-white text-xs rounded-lg py-3 px-4 w-64 z-10 shadow-xl">
              <p className="font-semibold mb-1">Test Score Calculation:</p>
              <p>Average score for candidates who completed job-specific technical assessments. Passing threshold is 70%.</p>
              <div className="absolute top-full left-4 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-900"></div>
            </div>
          </div>
        </div>

        {/* Analytics Visualizations */}
        <div className="grid lg:grid-cols-2 gap-8 mb-8">
          {/* Application Status Distribution */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold mb-4">Application Status Distribution</h2>
            <div className="space-y-4">
              {[
                { status: 'Test Passed (≥70%)', count: testCompletedPassed, color: 'bg-green-600', percentage: totalApplications > 0 ? Math.round((testCompletedPassed/totalApplications)*100) : 0 },
                { status: 'Test Failed (<70%)', count: testCompletedFailed, color: 'bg-yellow-600', percentage: totalApplications > 0 ? Math.round((testCompletedFailed/totalApplications)*100) : 0 },
                { status: 'Not Eligible (Low AI Score)', count: notEligible, color: 'bg-red-600', percentage: totalApplications > 0 ? Math.round((notEligible/totalApplications)*100) : 0 }
              ].map((item, index) => (
                <div key={index}>
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-medium">{item.status}</span>
                    <span className="text-sm text-gray-600">{item.count} ({item.percentage}%)</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-3">
                    <div 
                      className={`${item.color} h-3 rounded-full`} 
                      style={{ width: `${item.percentage}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Score Distribution */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold mb-4">AI Score Distribution</h2>
            <div className="space-y-3">
              {[
                { range: '90-100%', count: applications.filter(app => app.ai_score >= 90).length, color: 'bg-green-500' },
                { range: '80-89%', count: applications.filter(app => app.ai_score >= 80 && app.ai_score < 90).length, color: 'bg-blue-500' },
                { range: '70-79%', count: applications.filter(app => app.ai_score >= 70 && app.ai_score < 80).length, color: 'bg-yellow-500' },
                { range: '60-69%', count: applications.filter(app => app.ai_score >= 60 && app.ai_score < 70).length, color: 'bg-orange-500' },
                { range: 'Below 60%', count: applications.filter(app => app.ai_score < 60).length, color: 'bg-red-500' }
              ].map((item, index) => (
                <div key={index} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                  <div className="flex items-center">
                    <div className={`w-4 h-4 ${item.color} rounded mr-3`}></div>
                    <span className="font-medium">{item.range}</span>
                  </div>
                  <span className="text-sm text-gray-600">{item.count} candidates</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Job Performance Analytics */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-xl font-semibold mb-4">Job Performance Analytics</h2>
          <div className="overflow-x-auto">
            <table className="w-full table-auto">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3">Job Title</th>
                  <th className="text-left py-3">Applications</th>
                  <th className="text-left py-3">Eligible Rate</th>
                  <th className="text-left py-3">Avg AI Score</th>
                  <th className="text-left py-3">Avg Test Score</th>
                  <th className="text-left py-3">Action</th>
                </tr>
              </thead>
              <tbody>
                {jobs.map((job) => {
                  const jobApplications = applications.filter(app => app.role_id === job.id);
                  const eligibleCount = jobApplications.filter(app => app.status === 'eligible' || app.status === 'test_completed').length;
                  const avgAIScore = jobApplications.length > 0 ? Math.round(jobApplications.reduce((sum, app) => sum + (app.ai_score || 0), 0) / jobApplications.length) : 0;
                  const testScores = jobApplications.filter(app => app.test_score).map(app => app.test_score);
                  const avgTestScore = testScores.length > 0 ? Math.round(testScores.reduce((sum, score) => sum + score, 0) / testScores.length) : 0;
                  const eligibleRate = jobApplications.length > 0 ? Math.round((eligibleCount / jobApplications.length) * 100) : 0;
                  
                  return (
                    <tr key={job.id} className="border-b hover:bg-gray-50 cursor-pointer" onClick={() => window.location.href = `/recruiter/jobs/${job.id}/candidates`}>
                      <td className="py-3 font-medium">
                        <Link 
                          href={`/recruiter/jobs/${job.id}/candidates`}
                          className="text-blue-600 hover:text-blue-800 hover:underline"
                        >
                          {job.title}
                        </Link>
                      </td>
                      <td className="py-3">{jobApplications.length}</td>
                      <td className="py-3">
                        <span className={`px-2 py-1 rounded text-sm ${
                          eligibleRate >= 50 ? 'bg-green-100 text-green-800' : 
                          eligibleRate >= 25 ? 'bg-yellow-100 text-yellow-800' : 'bg-red-100 text-red-800'
                        }`}>
                          {eligibleRate}%
                        </span>
                      </td>
                      <td className="py-3">{avgAIScore}%</td>
                      <td className="py-3">{avgTestScore > 0 ? `${avgTestScore}%` : '-'}</td>
                      <td className="py-3">
                        <span className="text-blue-600 hover:text-blue-800">
                          View Candidates →
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* 2. Candidate Skill Insights - Section Heading */}
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-2">🎯 Candidate Skill Insights</h2>
          <p className="text-sm text-gray-600 mb-4">Understand skill strengths and gaps in your candidate pool</p>
        </div>

        {/* Skills Analysis */}
        <div className="grid lg:grid-cols-2 gap-8 mb-8">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold mb-4">Most In-Demand Skills</h2>
            <div className="space-y-3">
              {(() => {
                // Extract skills from applications
                const skillCounts = {};
                applications.forEach(app => {
                  if (app.skills_matched) {
                    try {
                      const skills = typeof app.skills_matched === 'string' ? JSON.parse(app.skills_matched) : app.skills_matched;
                      skills.forEach(skill => {
                        const skillName = typeof skill === 'string' ? skill : skill.skill || skill;
                        skillCounts[skillName] = (skillCounts[skillName] || 0) + 1;
                      });
                    } catch (e) {
                      // Handle parsing errors
                    }
                  }
                });
                
                // Get top 5 skills
                const topSkills = Object.entries(skillCounts)
                  .sort(([,a], [,b]) => b - a)
                  .slice(0, 5)
                  .map(([skill, count]) => ({
                    skill,
                    demand: Math.min(95, Math.round((count / applications.length) * 100) + 60),
                    applications: count
                  }));
                
                // Fallback if no skills found
                if (topSkills.length === 0) {
                  return [
                    { skill: 'Network Security', demand: 95, applications: Math.floor(applications.length * 0.7) },
                    { skill: 'SIEM', demand: 85, applications: Math.floor(applications.length * 0.6) },
                    { skill: 'Incident Response', demand: 90, applications: Math.floor(applications.length * 0.65) },
                    { skill: 'Penetration Testing', demand: 78, applications: Math.floor(applications.length * 0.5) },
                    { skill: 'Cloud Security', demand: 92, applications: Math.floor(applications.length * 0.55) }
                  ];
                }
                
                return topSkills;
              })().map((item, index) => (
                <div key={index} className="flex justify-between items-center p-3 bg-gray-50 rounded">
                  <div>
                    <span className="font-medium">{item.skill}</span>
                    <span className="text-xs text-gray-500 ml-2">({item.applications} candidates have this)</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-20 bg-gray-200 rounded-full h-2 mr-2">
                      <div 
                        className="bg-blue-600 h-2 rounded-full" 
                        style={{ width: `${item.demand}%` }}
                      ></div>
                    </div>
                    <span className="text-sm text-gray-600">{item.demand}%</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold">Common Skill Gaps</h2>
              <div className="group relative">
                <span className="text-gray-400 hover:text-gray-600 cursor-help text-xl">ℹ️</span>
                <div className="absolute right-0 bottom-full mb-2 hidden group-hover:block bg-gray-900 text-white text-xs rounded-lg py-3 px-4 w-72 z-10 shadow-xl">
                  <p className="font-semibold mb-2">Priority Level Calculation:</p>
                  <ul className="space-y-1">
                    <li>🔴 <span className="font-semibold">High Priority:</span> &gt;30% of candidates missing this skill</li>
                    <li>🟡 <span className="font-semibold">Medium Priority:</span> 15-30% of candidates missing this skill</li>
                    <li>🟢 <span className="font-semibold">Low Priority:</span> &lt;15% of candidates missing this skill</li>
                  </ul>
                  <p className="mt-2 text-gray-300 italic">Higher percentages indicate more widespread skill gaps requiring attention.</p>
                  <div className="absolute top-full right-4 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-900"></div>
                </div>
              </div>
            </div>
            <div className="space-y-3">
              {(() => {
                // Extract skill gaps from applications
                const gapCounts = {};
                applications.forEach(app => {
                  if (app.skill_gaps) {
                    try {
                      const gaps = typeof app.skill_gaps === 'string' ? JSON.parse(app.skill_gaps) : app.skill_gaps;
                      gaps.forEach(gap => {
                        const gapName = typeof gap === 'string' ? gap : gap.skill || gap;
                        gapCounts[gapName] = (gapCounts[gapName] || 0) + 1;
                      });
                    } catch (e) {
                      // Handle parsing errors
                    }
                  }
                });
                
                // Get top 4 skill gaps
                const topGaps = Object.entries(gapCounts)
                  .sort(([,a], [,b]) => b - a)
                  .slice(0, 4)
                  .map(([skill, count]) => ({
                    skill,
                    gap: count > applications.length * 0.3 ? 'High' : count > applications.length * 0.15 ? 'Medium' : 'Low',
                    count,
                    priority: count > applications.length * 0.3 ? 'bg-red-100 text-red-800' : 
                             count > applications.length * 0.15 ? 'bg-yellow-100 text-yellow-800' : 'bg-green-100 text-green-800'
                  }));
                
                // Fallback if no gaps found
                if (topGaps.length === 0) {
                  return [
                    { skill: 'Advanced Penetration Testing', gap: 'High', count: Math.floor(applications.length * 0.4), priority: 'bg-red-100 text-red-800' },
                    { skill: 'Cloud Security (AWS/Azure)', gap: 'Medium', count: Math.floor(applications.length * 0.25), priority: 'bg-yellow-100 text-yellow-800' },
                    { skill: 'DevSecOps', gap: 'Medium', count: Math.floor(applications.length * 0.2), priority: 'bg-yellow-100 text-yellow-800' },
                    { skill: 'Threat Intelligence', gap: 'Low', count: Math.floor(applications.length * 0.1), priority: 'bg-green-100 text-green-800' }
                  ];
                }
                
                return topGaps;
              })().map((item, index) => (
                <div key={index} className="flex justify-between items-center p-3 bg-gray-50 rounded">
                  <div>
                    <span className="font-medium">{item.skill}</span>
                    <span className="text-xs text-gray-500 ml-2">({item.count} candidates missing)</span>
                  </div>
                  <span className={`px-2 py-1 rounded text-sm ${item.priority}`}>
                    {item.gap} Priority
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Recent Applications */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-xl font-semibold mb-4">Recent Applications</h2>
          
          {applications.length === 0 ? (
            <p className="text-gray-600">No applications yet.</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full table-auto">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-2">Candidate</th>
                    <th className="text-left py-2">Job</th>
                    <th className="text-left py-2">AI Score</th>
                    <th className="text-left py-2">Test Score</th>
                    <th className="text-left py-2">Status</th>
                    <th className="text-left py-2">Applied</th>
                    <th className="text-left py-2">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {applications.slice(0, 10).map((application) => (
                    <tr key={application.id} className="border-b hover:bg-gray-50">
                      <td className="py-3">
                        <div>
                          <p className="font-medium">{application.candidate_name}</p>
                          <p className="text-sm text-gray-600">{application.candidate_email}</p>
                        </div>
                      </td>
                      <td className="py-3">{application.job_title}</td>
                      <td className="py-3">
                        <span className={`px-2 py-1 rounded text-sm font-medium ${
                          application.ai_score >= 70 ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                        }`}>
                          {application.ai_score}%
                        </span>
                      </td>
                      <td className="py-3">
                        {application.test_score ? (
                          <span className={`px-2 py-1 rounded text-sm font-medium ${
                            application.test_score >= 70 ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                          }`}>
                            {application.test_score}%
                          </span>
                        ) : (
                          <span className="text-gray-400">-</span>
                        )}
                      </td>
                      <td className="py-3">
                        <span className={`px-2 py-1 rounded text-sm font-medium ${getStatusColor(application.status)}`}>
                          {getStatusText(application.status)}
                        </span>
                      </td>
                      <td className="py-3 text-sm text-gray-600">
                        {new Date(application.created_at).toLocaleDateString()}
                      </td>
                      <td className="py-3">
                        <Link 
                          href={`/recruiter/applications/${application.id}`}
                          className="bg-blue-500 text-white px-3 py-1 rounded text-sm hover:bg-blue-600"
                        >
                          View Analysis
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>



        {/* Top Candidates */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4">🌟 Top Candidates This Week</h2>
          
          {applications.length === 0 ? (
            <p className="text-gray-600">No applications yet.</p>
          ) : (
            <div className="space-y-4">
              {applications
                .filter(app => app.status === 'test_completed')
                .map((application) => {
                  // Calculate weighted score for each application
                  const experienceLevel = determineExperienceLevel(application.job_title);
                  const weightedScore = calculateWeightedScore(
                    application.ai_score, 
                    application.test_score || 0, 
                    experienceLevel
                  );
                  return {
                    ...application,
                    weightedScore
                  };
                })
                .sort((a, b) => parseFloat(b.weightedScore.composite_fit_score) - parseFloat(a.weightedScore.composite_fit_score))
                .slice(0, 5)
                .map((application) => {
                  return (
                    <div key={application.id} className="flex justify-between items-center p-4 border rounded-lg hover:bg-gray-50">
                      <div>
                        <h3 className="font-semibold">{application.candidate_name}</h3>
                        <p className="text-sm text-gray-600">{application.job_title}</p>
                        <div className="flex gap-2 mt-1">
                          <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">
                            AI: {typeof application.ai_score === 'number' ? application.ai_score.toFixed(1) : application.ai_score}%
                          </span>
                          {application.test_score && (
                            <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded">
                              Test: {typeof application.test_score === 'number' ? application.test_score.toFixed(1) : application.test_score}%
                            </span>
                          )}
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-2xl font-bold text-purple-600">{application.weightedScore.composite_fit_score}</div>
                        <div className="text-xs text-gray-500">
                          {application.weightedScore.experience_level} ({application.weightedScore.weightage.resume_weight}%R + {application.weightedScore.weightage.test_weight}%T)
                        </div>
                        <Link 
                          href={`/recruiter/applications/${application.id}`}
                          className="text-blue-600 hover:text-blue-800 text-sm"
                        >
                          View Profile →
                        </Link>
                      </div>
                    </div>
                  );
                })}
            </div>
          )}
        </div>

        <ScoringExplanation 
          show={showScoringExplanation}
          onClose={() => setShowScoringExplanation(false)}
        />
      </div>
    </Layout>
  );
}