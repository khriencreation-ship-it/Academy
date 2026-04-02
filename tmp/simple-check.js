const { createClient } = require('@supabase/supabase-js');
const supabaseUrl = 'https://zwkzesyyehpmwsybgvtl.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inp3a3plc3l5ZWhwbXdzeWJndnRsIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3NDkwMzc1MiwiZXhwIjoyMDkwNDc5NzUyfQ.rWvD4rk-AUufOEoW_7c0KzEsBfhMdwQsSHs1-w4BGiA';
const supabase = createClient(supabaseUrl, supabaseKey);

async function verify() {
  const email = 'habeeboluwanis7@gmail.com';
  const phone = '08144351948';
  
  const { data } = await supabase
    .from('applications')
    .select('email, phone')
    .or(`email.ilike."${email}",phone.eq."${phone}"`)
    .maybeSingle();

  if (data) {
    console.log('FOUND_MATCH');
    console.log(JSON.stringify(data));
  } else {
    console.log('NO_MATCH');
  }
}
verify();
