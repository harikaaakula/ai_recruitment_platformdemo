const axios = require('axios');

async function debugApplicationData() {
  try {
    // Login first
    const loginResponse = await axios.post('http://localhost:5001/api/auth/login', {
      email: 'hr@techcorp.com',
      password: 'recruiter123'
    });
    
    const token = loginResponse.data.token;
    console.log('✅ Login successful');
    
    // Get application details
    console.log('\n📋 Testing Application Details API...');
    const appResponse = await axios.get('http://localhost:5001/api/applications/1', {
      headers: { Authorization: `Bearer ${token}` }
    });
    
    const application = appResponse.data;
    console.log('📊 Application Data:');
    console.log('- ID:', application.id);
    console.log('- Candidate:', application.candidate_name);
    console.log('- AI Score:', application.ai_score);
    console.log('- Test Score:', application.test_score);
    console.log('- Matched Skills (raw):', application.matched_skills);
    console.log('- Skill Gaps (raw):', application.skill_gaps);
    
    // Test parsing
    if (application.matched_skills) {
      try {
        const parsed = JSON.parse(application.matched_skills);
        console.log('✅ Parsed Skills:', parsed);
        console.log('✅ Is Array:', Array.isArray(parsed));
        if (Array.isArray(parsed) && parsed.length > 0) {
          console.log('✅ First skill structure:', parsed[0]);
        }
      } catch (e) {
        console.log('❌ Parse error:', e.message);
      }
    }
    
  } catch (error) {
    console.error('❌ Debug failed:', error.response?.data || error.message);
  }
}

debugApplicationData();