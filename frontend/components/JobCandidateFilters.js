import { useState, useEffect, useRef } from 'react';
import { hasActiveJobFilters } from '../utils/filterHelpers';

export default function JobCandidateFilters({ jobId, jobRole, onFilterChange }) {
  const [filters, setFilters] = useState({
    status: 'all',
    experienceMin: 0,
    experienceMax: 20,
    skills: [],
    certifications: []
  });

  const [showSkillsDropdown, setShowSkillsDropdown] = useState(false);
  const [showCertsDropdown, setShowCertsDropdown] = useState(false);
  
  const skillsDropdownRef = useRef(null);
  const certsDropdownRef = useRef(null);

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (skillsDropdownRef.current && !skillsDropdownRef.current.contains(event.target)) {
        setShowSkillsDropdown(false);
      }
      if (certsDropdownRef.current && !certsDropdownRef.current.contains(event.target)) {
        setShowCertsDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Load filters from localStorage on mount
  useEffect(() => {
    const savedFilters = localStorage.getItem(`jobFilters_${jobId}`);
    if (savedFilters) {
      try {
        const parsed = JSON.parse(savedFilters);
        setFilters(parsed);
        onFilterChange(parsed);
      } catch (e) {
        console.error('Error loading saved filters:', e);
      }
    }
  }, [jobId]);

  // Save filters to localStorage and notify parent
  const updateFilters = (newFilters) => {
    setFilters(newFilters);
    localStorage.setItem(`jobFilters_${jobId}`, JSON.stringify(newFilters));
    onFilterChange(newFilters);
  };

  const handleChange = (key, value) => {
    updateFilters({ ...filters, [key]: value });
  };

  const handleSkillToggle = (skill) => {
    const newSkills = filters.skills.includes(skill)
      ? filters.skills.filter(s => s !== skill)
      : [...filters.skills, skill];
    handleChange('skills', newSkills);
  };

  const handleSelectAllSkills = () => {
    if (filters.skills.length === jobSkills.length) {
      handleChange('skills', []);
    } else {
      handleChange('skills', [...jobSkills]);
    }
  };

  const handleCertToggle = (cert) => {
    const newCerts = filters.certifications.includes(cert)
      ? filters.certifications.filter(c => c !== cert)
      : [...filters.certifications, cert];
    handleChange('certifications', newCerts);
  };

  const handleSelectAllCerts = () => {
    if (filters.certifications.length === jobCertifications.length) {
      handleChange('certifications', []);
    } else {
      handleChange('certifications', [...jobCertifications]);
    }
  };

  const clearFilters = () => {
    const defaultFilters = {
      status: 'all',
      experienceMin: 0,
      experienceMax: 20,
      skills: [],
      certifications: []
    };
    updateFilters(defaultFilters);
  };

  const hasFilters = hasActiveJobFilters(filters);

  // Get job-specific skills and certifications
  const jobSkills = jobRole?.skills || [];
  const jobCertifications = jobRole?.certifications || [];

  return (
    <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg shadow-md p-6 mb-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-800">🔍 Filter Candidates</h3>
        {hasFilters && (
          <button
            onClick={clearFilters}
            className="text-sm text-purple-600 hover:text-purple-800 font-medium"
          >
            Clear All
          </button>
        )}
      </div>

      {/* All Filters in One Line */}
      <div className="grid md:grid-cols-4 gap-4">
        {/* Status Filter */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Status
          </label>
          <select
            value={filters.status}
            onChange={(e) => handleChange('status', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-sm"
          >
            <option value="all">All</option>
            <option value="eligible">Eligible</option>
            <option value="test_completed">Test Done</option>
            <option value="not_eligible">Not Eligible</option>
          </select>
        </div>

        {/* Skills Filter */}
        <div className="relative" ref={skillsDropdownRef}>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Skills
          </label>
          <button
            type="button"
            onClick={() => setShowSkillsDropdown(!showSkillsDropdown)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 bg-white text-left flex items-center justify-between text-sm"
          >
            <span className="text-gray-700 truncate">
              {filters.skills.length > 0 
                ? `${filters.skills.length} selected`
                : 'Any'}
            </span>
            <svg className={`w-4 h-4 text-gray-400 flex-shrink-0 ml-1 transition-transform ${showSkillsDropdown ? 'transform rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>

          {showSkillsDropdown && (
            <div className="absolute z-50 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg max-h-64 overflow-y-auto">
              <div className="sticky top-0 bg-gray-50 border-b border-gray-200 px-3 py-2 flex justify-between items-center">
                <button
                  type="button"
                  onClick={handleSelectAllSkills}
                  className="text-xs text-purple-600 hover:text-purple-800 font-medium"
                >
                  {filters.skills.length === jobSkills.length ? 'Deselect All' : 'Select All'}
                </button>
                {filters.skills.length > 0 && (
                  <button
                    type="button"
                    onClick={() => handleChange('skills', [])}
                    className="text-xs text-purple-600 hover:text-purple-800 font-medium"
                  >
                    Clear
                  </button>
                )}
              </div>
              <div className="py-1">
                {jobSkills.length > 0 ? (
                  jobSkills.map((skill, idx) => (
                    <label
                      key={idx}
                      className="flex items-center px-3 py-2 hover:bg-purple-50 cursor-pointer"
                    >
                      <input
                        type="checkbox"
                        checked={filters.skills.includes(skill)}
                        onChange={() => handleSkillToggle(skill)}
                        className="w-4 h-4 text-purple-600 border-gray-300 rounded focus:ring-purple-500"
                      />
                      <span className="ml-2 text-sm text-gray-700">{skill}</span>
                    </label>
                  ))
                ) : (
                  <div className="px-3 py-2 text-sm text-gray-500">No skills defined</div>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Experience Filter */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Experience
          </label>
          <div className="flex gap-1 items-center">
            <input
              type="number"
              min="0"
              max="20"
              value={filters.experienceMin}
              onChange={(e) => handleChange('experienceMin', parseInt(e.target.value) || 0)}
              className="w-16 px-2 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 text-sm"
              placeholder="0"
            />
            <span className="text-gray-500 text-xs">to</span>
            <input
              type="number"
              min="0"
              max="20"
              value={filters.experienceMax}
              onChange={(e) => handleChange('experienceMax', parseInt(e.target.value) || 20)}
              className="w-16 px-2 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 text-sm"
              placeholder="20"
            />
          </div>
        </div>

        {/* Certifications Filter */}
        <div className="relative" ref={certsDropdownRef}>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Certifications
          </label>
          <button
            type="button"
            onClick={() => setShowCertsDropdown(!showCertsDropdown)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 bg-white text-left flex items-center justify-between text-sm"
          >
            <span className="text-gray-700 truncate">
              {filters.certifications.length > 0 
                ? `${filters.certifications.length} selected`
                : 'Any'}
            </span>
            <svg className={`w-4 h-4 text-gray-400 flex-shrink-0 ml-1 transition-transform ${showCertsDropdown ? 'transform rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>

          {showCertsDropdown && (
            <div className="absolute z-50 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg max-h-64 overflow-y-auto">
              <div className="sticky top-0 bg-gray-50 border-b border-gray-200 px-3 py-2 flex justify-between items-center">
                <button
                  type="button"
                  onClick={handleSelectAllCerts}
                  className="text-xs text-purple-600 hover:text-purple-800 font-medium"
                >
                  {filters.certifications.length === jobCertifications.length ? 'Deselect All' : 'Select All'}
                </button>
                {filters.certifications.length > 0 && (
                  <button
                    type="button"
                    onClick={() => handleChange('certifications', [])}
                    className="text-xs text-purple-600 hover:text-purple-800 font-medium"
                  >
                    Clear
                  </button>
                )}
              </div>
              <div className="py-1">
                {jobCertifications.length > 0 ? (
                  jobCertifications.map((cert, idx) => (
                    <label
                      key={idx}
                      className="flex items-center px-3 py-2 hover:bg-purple-50 cursor-pointer"
                    >
                      <input
                        type="checkbox"
                        checked={filters.certifications.includes(cert)}
                        onChange={() => handleCertToggle(cert)}
                        className="w-4 h-4 text-purple-600 border-gray-300 rounded focus:ring-purple-500"
                      />
                      <span className="ml-2 text-sm text-gray-700">{cert}</span>
                    </label>
                  ))
                ) : (
                  <div className="px-3 py-2 text-sm text-gray-500">No certifications defined</div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Hidden old advanced section */}
      {false && showAdvanced && (
        <div className="border-t border-purple-200 pt-4 mt-4">
          <div className="grid md:grid-cols-2 gap-6">
            {/* Skills Filter */}
            <div className="relative" ref={skillsDropdownRef}>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Skills (Must have ALL selected)
              </label>
              
              {/* Custom Dropdown Button */}
              <button
                type="button"
                onClick={() => setShowSkillsDropdown(!showSkillsDropdown)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white text-left flex items-center justify-between"
              >
                <span className="text-sm text-gray-700">
                  {filters.skills.length > 0 
                    ? `${filters.skills.length} skill${filters.skills.length > 1 ? 's' : ''} selected`
                    : 'Select skills...'}
                </span>
                <svg className={`w-5 h-5 text-gray-400 transition-transform ${showSkillsDropdown ? 'transform rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {/* Dropdown Menu */}
              {showSkillsDropdown && (
                <div className="absolute z-50 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg max-h-64 overflow-y-auto">
                  {/* Select All / Clear All */}
                  <div className="sticky top-0 bg-gray-50 border-b border-gray-200 px-3 py-2 flex justify-between items-center">
                    <button
                      type="button"
                      onClick={handleSelectAllSkills}
                      className="text-xs text-purple-600 hover:text-purple-800 font-medium"
                    >
                      {filters.skills.length === jobSkills.length ? 'Deselect All' : 'Select All'}
                    </button>
                    {filters.skills.length > 0 && (
                      <button
                        type="button"
                        onClick={() => handleChange('skills', [])}
                        className="text-xs text-purple-600 hover:text-purple-800 font-medium"
                      >
                        Clear
                      </button>
                    )}
                  </div>

                  {/* Checkbox List */}
                  <div className="py-1">
                    {jobSkills.length > 0 ? (
                      jobSkills.map((skill, idx) => (
                        <label
                          key={idx}
                          className="flex items-center px-3 py-2 hover:bg-purple-50 cursor-pointer"
                        >
                          <input
                            type="checkbox"
                            checked={filters.skills.includes(skill)}
                            onChange={() => handleSkillToggle(skill)}
                            className="w-4 h-4 text-purple-600 border-gray-300 rounded focus:ring-purple-500"
                          />
                          <span className="ml-2 text-sm text-gray-700">{skill}</span>
                        </label>
                      ))
                    ) : (
                      <div className="px-3 py-2 text-sm text-gray-500">No skills defined for this role</div>
                    )}
                  </div>
                </div>
              )}
              
              <p className="text-xs text-gray-500 mt-1">
                Candidates must have ALL selected skills
              </p>
            </div>

            {/* Experience & Certifications */}
            <div className="space-y-4">
              {/* Experience Filter */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Experience: {filters.experienceMin} - {filters.experienceMax} years
                </label>
                <div className="flex gap-2 items-center">
                  <input
                    type="number"
                    min="0"
                    max="20"
                    value={filters.experienceMin}
                    onChange={(e) => handleChange('experienceMin', parseInt(e.target.value) || 0)}
                    className="w-20 px-2 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                  />
                  <span className="text-gray-500">to</span>
                  <input
                    type="number"
                    min="0"
                    max="20"
                    value={filters.experienceMax}
                    onChange={(e) => handleChange('experienceMax', parseInt(e.target.value) || 20)}
                    className="w-20 px-2 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                  />
                  <span className="text-sm text-gray-500">years</span>
                </div>
              </div>

              {/* Certifications Filter */}
              <div className="relative" ref={certsDropdownRef}>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Certifications (Must have ALL selected)
                </label>
                
                {/* Custom Dropdown Button */}
                <button
                  type="button"
                  onClick={() => setShowCertsDropdown(!showCertsDropdown)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white text-left flex items-center justify-between"
                >
                  <span className="text-sm text-gray-700">
                    {filters.certifications.length > 0 
                      ? `${filters.certifications.length} certification${filters.certifications.length > 1 ? 's' : ''} selected`
                      : 'Select certifications...'}
                  </span>
                  <svg className={`w-5 h-5 text-gray-400 transition-transform ${showCertsDropdown ? 'transform rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>

                {/* Dropdown Menu */}
                {showCertsDropdown && (
                  <div className="absolute z-50 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg max-h-64 overflow-y-auto">
                    {/* Select All / Clear All */}
                    <div className="sticky top-0 bg-gray-50 border-b border-gray-200 px-3 py-2 flex justify-between items-center">
                      <button
                        type="button"
                        onClick={handleSelectAllCerts}
                        className="text-xs text-purple-600 hover:text-purple-800 font-medium"
                      >
                        {filters.certifications.length === jobCertifications.length ? 'Deselect All' : 'Select All'}
                      </button>
                      {filters.certifications.length > 0 && (
                        <button
                          type="button"
                          onClick={() => handleChange('certifications', [])}
                          className="text-xs text-purple-600 hover:text-purple-800 font-medium"
                        >
                          Clear
                        </button>
                      )}
                    </div>

                    {/* Checkbox List */}
                    <div className="py-1">
                      {jobCertifications.length > 0 ? (
                        jobCertifications.map((cert, idx) => (
                          <label
                            key={idx}
                            className="flex items-center px-3 py-2 hover:bg-purple-50 cursor-pointer"
                          >
                            <input
                              type="checkbox"
                              checked={filters.certifications.includes(cert)}
                              onChange={() => handleCertToggle(cert)}
                              className="w-4 h-4 text-purple-600 border-gray-300 rounded focus:ring-purple-500"
                            />
                            <span className="ml-2 text-sm text-gray-700">{cert}</span>
                          </label>
                        ))
                      ) : (
                        <div className="px-3 py-2 text-sm text-gray-500">No certifications defined for this role</div>
                      )}
                    </div>
                  </div>
                )}
                
                <p className="text-xs text-gray-500 mt-1">
                  Candidates must have ALL selected certifications
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Filter Summary - Hybrid Approach */}
      {hasFilters && (
        <div className="bg-purple-50 rounded-lg p-3 border border-purple-200 mt-4">
          <div className="flex items-start gap-2">
            <span className="text-sm text-gray-600 font-medium flex-shrink-0">Active filters:</span>
            <div className="flex flex-wrap gap-2">
              {filters.status !== 'all' && (
                <span className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm">
                  Status: {filters.status.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                </span>
              )}
              {filters.skills.length > 0 && (
                <span className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm">
                  Skills: {filters.skills.join(', ')}
                </span>
              )}
              {filters.certifications.length > 0 && (
                <span className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm">
                  Certs: {filters.certifications.join(', ')}
                </span>
              )}
              {(filters.experienceMin > 0 || filters.experienceMax < 20) && (
                <span className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm">
                  Experience: {filters.experienceMin}-{filters.experienceMax} years
                </span>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
