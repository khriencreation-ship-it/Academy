const { createClient } = require('@supabase/supabase-js');
const supabaseUrl = 'https://zwkzesyyehpmwsybgvtl.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inp3a3plc3l5ZWhwbXdzeWJndnRsIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3NDkwMzc1MiwiZXhwIjoyMDkwNDc5NzUyfQ.rWvD4rk-AUufOEoW_7c0KzEsBfhMdwQsSHs1-w4BGiA';
const supabase = createClient(supabaseUrl, supabaseKey);

async function verify() {
  // 1. Get one real record
  const { data: records } = await supabase.from('applications').select('email, phone').limit(1);
  if (!records || records.length === 0) {
    console.log('NO_RECORDS_IN_DB');
    return;
  }
  
  const realEmail = records[0].email;
  const realPhone = records[0].phone;
  console.log(`Testing with real email: [${realEmail}] and phone: [${realPhone}]`);

  // 2. Test OR query with exact match
  const { data: match } = await supabase
    .from('applications')
    .select('email, phone')
    .or(`email.ilike."${realEmail}",phone.eq."${realPhone}"`)
    .maybeSingle();

  if (match) {
    console.log('SUCCESS: Found match');
    console.log(JSON.stringify(match));
  } else {
    console.log('FAILURE: Could not find match even with real data');
  }
}
verify();
