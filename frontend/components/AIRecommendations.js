import { useState, useEffect } from 'react';
import api from '../utils/api';

const AIRecommendations = ({ applicationId, candidateName }) => {
  const [recommendation, setRecommendation] = useState(null);
  const [interviewQuestions, setInterviewQuestions] = useState(null);
  const [similarCandidates, setSimilarCandidates] = useState(null);
  const [communicationTemplate, setCommunicationTemplate] = useState(null);
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('recommendation');

  const fetchHiringRecommendation = async () => {
    setLoading(true);
    try {
      const response = await api.get(`/ai-recommendations/hiring-recommendation/${applicationId}`);
      setRecommendation(response.data.recommendation);
    } catch (error) {
      console.error('Error fetching hiring recommendation:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchInterviewQuestions = async () => {
    setLoading(true);
    try {
      const response = await api.get(`/ai-recommendations/interview-questions/${applicationId}`);
      setInterviewQuestions(response.data.questions);
    } catch (error) {
      console.error('Error fetching interview questions:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchSimilarCandidates = async () => {
    setLoading(true);
    try {
      const response = await api.get(`/ai-recommendations/similar-candidates/${applicationId}`);
      setSimilarCandidates(response.data.similar_candidates);
    } catch (error) {
      console.error('Error fetching similar candidates:', error);
    } finally {
      setLoading(false);
    }
  };

  const generateCommunicationTemplate = async (action) => {
    setLoading(true);
    try {
      const response = await api.post('/ai-recommendations/communication-template', {
        applicationId,
        action
      });
      setCommunicationTemplate(response.data.template);
    } catch (error) {
      console.error('Error generating communication template:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (applicationId && activeTab === 'recommendation') {
      fetchHiringRecommendation();
    }
  }, [applicationId, activeTab]);

  const getRecommendationColor = (recommendation) => {
    switch (recommendation) {
      case 'hire': return 'bg-green-100 text-green-800';
      case 'interview': return 'bg-blue-100 text-blue-800';
      case 'waitlist': return 'bg-yellow-100 text-yellow-800';
      case 'reject': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getRecommendationIcon = (recommendation) => {
    switch (recommendation) {
      case 'hire': return '✅';
      case 'interview': return '🎯';
      case 'waitlist': return '⏳';
      case 'reject': return '❌';
      default: return '🤔';
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-xl font-semibold mb-4">🤖 AI Recommendations for {candidateName}</h2>
      
      {/* Tab Navigation */}
      <div className="flex space-x-1 mb-6 bg-gray-100 p-1 rounded-lg">
        {[
          { id: 'recommendation', label: '🎯 Hiring Decision', action: fetchHiringRecommendation },
          { id: 'questions', label: '❓ Interview Questions', action: fetchInterviewQuestions },
          { id: 'similar', label: '👥 Similar Candidates', action: fetchSimilarCandidates },
          { id: 'communication', label: '📧 Email Templates', action: () => {} }
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => {
              setActiveTab(tab.id);
              if (tab.action) tab.action();
            }}
            className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
              activeTab === tab.id
                ? 'bg-white text-blue-600 shadow-sm'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {loading && (
        <div className="text-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
          <p className="text-gray-600 mt-2">AI is analyzing...</p>
        </div>
      )}

      {/* Hiring Recommendation Tab */}
      {activeTab === 'recommendation' && recommendation && !loading && (
        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
            <div className="flex items-center space-x-3">
              <span className="text-2xl">{getRecommendationIcon(recommendation.hiring_recommendation)}</span>
              <div>
                <h3 className="font-semibold">AI Recommendation</h3>
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${getRecommendationColor(recommendation.hiring_recommendation)}`}>
                  {recommendation.hiring_recommendation.toUpperCase()}
                </span>
              </div>
            </div>
            <div className="text-right">
              <p className="text-sm text-gray-600">Confidence</p>
              <p className="text-2xl font-bold text-blue-600">{recommendation.confidence_score}%</p>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div className="p-4 border rounded-lg">
              <h4 className="font-semibold text-green-700 mb-2">✅ Key Strengths</h4>
              <ul className="space-y-1">
                {recommendation.key_strengths.map((strength, index) => (
                  <li key={index} className="text-sm text-gray-700">• {strength}</li>
                ))}
              </ul>
            </div>

            <div className="p-4 border rounded-lg">
              <h4 className="font-semibold text-orange-700 mb-2">⚠️ Areas of Concern</h4>
              <ul className="space-y-1">
                {recommendation.concerns.map((concern, index) => (
                  <li key={index} className="text-sm text-gray-700">• {concern}</li>
                ))}
              </ul>
            </div>
          </div>

          <div className="p-4 bg-blue-50 rounded-lg">
            <h4 className="font-semibold text-blue-800 mb-2">💡 AI Reasoning</h4>
            <p className="text-blue-700 text-sm">{recommendation.reasoning}</p>
          </div>

          {recommendation.salary_range_suggestion && (
            <div className="p-4 bg-green-50 rounded-lg">
              <h4 className="font-semibold text-green-800 mb-2">💰 Suggested Salary Range</h4>
              <p className="text-green-700">
                ${recommendation.salary_range_suggestion.min.toLocaleString()} - ${recommendation.salary_range_suggestion.max.toLocaleString()}
              </p>
            </div>
          )}
        </div>
      )}

      {/* Interview Questions Tab */}
      {activeTab === 'questions' && interviewQuestions && !loading && (
        <div className="space-y-6">
          <div>
            <h3 className="font-semibold text-blue-800 mb-3">🔧 Technical Questions</h3>
            <div className="space-y-3">
              {interviewQuestions.technical_questions.map((q, index) => (
                <div key={index} className="p-3 border-l-4 border-blue-500 bg-blue-50">
                  <p className="font-medium">{q.question}</p>
                  <div className="flex justify-between mt-2">
                    <span className="text-xs bg-blue-200 text-blue-800 px-2 py-1 rounded">
                      {q.focus_area}
                    </span>
                    <span className="text-xs bg-gray-200 text-gray-700 px-2 py-1 rounded">
                      {q.difficulty}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h3 className="font-semibold text-green-800 mb-3">🧠 Behavioral Questions</h3>
            <div className="space-y-3">
              {interviewQuestions.behavioral_questions.map((q, index) => (
                <div key={index} className="p-3 border-l-4 border-green-500 bg-green-50">
                  <p className="font-medium">{q.question}</p>
                  <p className="text-sm text-green-700 mt-1">{q.reasoning}</p>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h3 className="font-semibold text-purple-800 mb-3">🎭 Situational Questions</h3>
            <div className="space-y-3">
              {interviewQuestions.situational_questions.map((q, index) => (
                <div key={index} className="p-3 border-l-4 border-purple-500 bg-purple-50">
                  <p className="font-medium">{q.question}</p>
                  <div className="mt-2">
                    <span className="text-xs text-purple-700">
                      Tests: {q.expected_skills?.join(', ')}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Similar Candidates Tab */}
      {activeTab === 'similar' && similarCandidates && !loading && (
        <div className="space-y-4">
          <p className="text-gray-600 mb-4">{similarCandidates.reasoning}</p>
          
          {similarCandidates.similar_candidates.map((candidate, index) => (
            <div key={index} className="flex justify-between items-center p-4 border rounded-lg hover:bg-gray-50">
              <div>
                <h4 className="font-medium">{candidate.name}</h4>
                <p className="text-sm text-gray-600">{candidate.job_title}</p>
                <div className="flex gap-2 mt-1">
                  <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">
                    AI: {candidate.ai_score}%
                  </span>
                  {candidate.test_score && (
                    <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded">
                      Test: {candidate.test_score}%
                    </span>
                  )}
                </div>
              </div>
              <div className="text-right">
                <div className="text-lg font-bold text-purple-600">
                  {candidate.similarity_score}%
                </div>
                <div className="text-xs text-gray-500">similarity</div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Communication Templates Tab */}
      {activeTab === 'communication' && !loading && (
        <div className="space-y-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mb-4">
            {[
              { action: 'interview_invitation', label: '📅 Interview Invite', color: 'blue' },
              { action: 'offer_email', label: '🎉 Job Offer', color: 'green' },
              { action: 'rejection_email', label: '📝 Rejection', color: 'red' },
              { action: 'follow_up_email', label: '📞 Follow Up', color: 'yellow' }
            ].map((template) => (
              <button
                key={template.action}
                onClick={() => generateCommunicationTemplate(template.action)}
                className={`p-3 rounded-lg text-sm font-medium bg-${template.color}-100 text-${template.color}-800 hover:bg-${template.color}-200`}
              >
                {template.label}
              </button>
            ))}
          </div>

          {communicationTemplate && (
            <div className="border rounded-lg p-4">
              <h4 className="font-semibold mb-2">📧 Email Template</h4>
              <div className="bg-gray-50 p-3 rounded mb-3">
                <p className="font-medium text-sm">Subject: {communicationTemplate.subject}</p>
              </div>
              <div className="bg-white border p-3 rounded">
                <pre className="whitespace-pre-wrap text-sm text-gray-700">
                  {communicationTemplate.template}
                </pre>
              </div>
              <button className="mt-3 bg-blue-500 text-white px-4 py-2 rounded text-sm hover:bg-blue-600">
                Copy Template
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default AIRecommendations;