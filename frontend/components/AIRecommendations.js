import React from 'react';

export default function AIRecommendations({ recommendations }) {
  if (!recommendations || recommendations.length === 0) {
    return null;
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h3 className="text-xl font-semibold mb-4 flex items-center">
        <span className="mr-2">💡</span>
        AI Recommendations
      </h3>
      <div className="space-y-3">
        {recommendations.map((recommendation, index) => (
          <div key={index} className="flex items-start p-3 bg-blue-50 rounded-lg">
            <span className="text-blue-600 font-semibold mr-3">{index + 1}.</span>
            <p className="text-gray-700">{recommendation}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
