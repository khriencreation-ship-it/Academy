const axios = require('axios');

async function testApi() {
  const url = 'http://localhost:3001/api/contact';
  
  console.log('--- Test 1: Honeypot (Should return success but console.warn on server) ---');
  try {
    const res = await axios.post(url, {
      fullName: 'Honeypot Bot',
      email: 'bot@test.com',
      phone: '123',
      motivation: 'spam',
      goals: 'spam',
      experience: 'None',
      website: 'bot-filled-this'
    });
    console.log('Response:', res.data);
  } catch (err) {
    console.log('Error:', err.response?.data || err.message);
  }

  console.log('\n--- Test 2: Missing Turnstile Token (Should return 400) ---');
  try {
    const res = await axios.post(url, {
      fullName: 'Tokenless Bot',
      email: 'bot@test.com',
      phone: '123',
      motivation: 'spam',
      goals: 'spam',
      experience: 'None'
    });
    console.log('Response:', res.data);
  } catch (err) {
    console.log('Expected Error (400):', err.response?.data || err.message);
  }

  console.log('\n--- Test 3: Fast Submission (Should return success but console.warn on server) ---');
  try {
    const res = await axios.post(url, {
      fullName: 'Fast Bot',
      email: 'bot@test.com',
      phone: '123',
      motivation: 'spam',
      goals: 'spam',
      experience: 'None',
      turnstileToken: 'XXXXX', // Won't be verified if duration check triggers first
      submissionDuration: 500 // 500ms
    });
    console.log('Response:', res.data);
  } catch (err) {
    console.log('Error:', err.response?.data || err.message);
  }

  console.log('\n--- Test 4: Rate Limiting (Firing 10 requests rapidly) ---');
  const requests = Array.from({ length: 10 }).map(() => 
    axios.post(url, {
        fullName: 'Rate Limit Test',
        email: 'test@test.com',
        phone: '123',
        motivation: 'test',
        goals: 'test',
        experience: 'None',
        turnstileToken: 'XXXXX'
    }).catch(err => err.response)
  );
  
  const results = await Promise.all(requests);
  const statuses = results.map(r => r?.status);
  console.log('Statuses:', statuses);
  if (statuses.includes(429)) {
    console.log('Success: Rate limiting (429) was triggered!');
  }
}

testApi();
