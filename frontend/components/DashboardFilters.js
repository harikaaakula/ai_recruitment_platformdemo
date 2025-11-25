import { useState, useEffect } from 'react';
import { hasActiveFilters as checkActiveFilters } from '../utils/filterHelpers';

export default function DashboardFilters({ jobs, applications, onFilterChange }) {
  const [filters, setFilters] = useState({
    jobRole: 'all',
    dateRange: 'all',
    status: 'all',
    aiScoreMin: 0,
    aiScoreMax: 100
  });

  // Load filters from localStorage on mount
  useEffect(() => {
    const savedFilters = localStorage.getItem('dashboardFilters');
    if (savedFilters) {
      try {
        const parsed = JSON.parse(savedFilters);
        setFilters(parsed);
        onFilterChange(parsed);
      } catch (e) {
        console.error('Error loading saved filters:', e);
      }
    }
  }, []);

  // Save filters to localStorage and notify parent
  const updateFilters = (newFilters) => {
    setFilters(newFilters);
    localStorage.setItem('dashboardFilters', JSON.stringify(newFilters));
    onFilterChange(newFilters);
  };

  const handleChange = (key, value) => {
    updateFilters({ ...filters, [key]: value });
  };

  const clearFilters = () => {
    const defaultFilters = { 
      jobRole: 'all', 
      dateRange: 'all', 
      status: 'all',
      aiScoreMin: 0,
      aiScoreMax: 100
    };
    updateFilters(defaultFilters);
  };

  const hasFilters = checkActiveFilters(filters);
  const selectedJob = jobs.find(j => j.id === parseInt(filters.jobRole));

  return (
    <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg shadow-md p-6 mb-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-800">🔍 Filter Dashboard</h3>
        {hasFilters && (
          <button
            onClick={clearFilters}
            className="text-sm text-blue-600 hover:text-blue-800 font-medium"
          >
            Clear All Filters
          </button>
        )}
      </div>

      <div className="grid md:grid-cols-3 gap-4 mb-4">
        {/* Job Role Filter */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Job Role
          </label>
          <select
            value={filters.jobRole}
            onChange={(e) => handleChange('jobRole', e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="all">All Jobs</option>
            {jobs.map(job => (
              <option key={job.id} value={job.id}>
                {job.title}
              </option>
            ))}
          </select>
        </div>

        {/* Status Filter */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Workflow Status
          </label>
          <select
            value={filters.status}
            onChange={(e) => handleChange('status', e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="all">All Candidates</option>
            <option value="eligible">Eligible (Awaiting Test)</option>
            <option value="test_completed">Test Completed</option>
            <option value="not_eligible">Not Eligible</option>
          </select>
        </div>

        {/* Date Range Filter */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Date Range
          </label>
          <select
            value={filters.dateRange}
            onChange={(e) => handleChange('dateRange', e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="all">All Time</option>
            <option value="last_7_days">Last 7 Days</option>
            <option value="last_30_days">Last 30 Days</option>
            <option value="last_90_days">Last 90 Days</option>
          </select>
        </div>
      </div>

      {/* Filter Summary */}
      {hasFilters && (
        <div className="bg-blue-50 rounded-lg p-3 border border-blue-200">
          <div className="flex items-center flex-wrap gap-2">
            <span className="text-sm text-gray-600">Active filters:</span>
            {filters.jobRole !== 'all' && (
              <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
                📌 {selectedJob?.title}
              </span>
            )}
            {filters.status !== 'all' && (
              <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
                Status: {filters.status.replace('_', ' ')}
              </span>
            )}
            {filters.dateRange !== 'all' && (
              <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
                Date: {filters.dateRange.replace('_', ' ')}
              </span>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
