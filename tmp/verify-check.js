const { createClient } = require('@supabase/supabase-js');
const supabaseUrl = 'https://zwkzesyyehpmwsybgvtl.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inp3a3plc3l5ZWhwbXdzeWJndnRsIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3NDkwMzc1MiwiZXhwIjoyMDkwNDc5NzUyfQ.rWvD4rk-AUufOEoW_7c0KzEsBfhMdwQsSHs1-w4BGiA';
const supabase = createClient(supabaseUrl, supabaseKey);

async function verify() {
  const email = 'habeeboluwanis7@gmail.com';
  const phone = '08144351948';
  
  console.log(`Checking for duplicate email: ${email} or phone: ${phone}`);
  
  const { data: existingApp, error: checkError } = await supabase
    .from('applications')
    .select('email, phone')
    .or(`email.ilike."${email}",phone.eq."${phone}"`)
    .maybeSingle();

  if (checkError) {
    console.error('Check failed:', checkError);
    return;
  }

  if (existingApp) {
    console.log('Match found:', existingApp);
    const isEmailMatch = existingApp.email.toLowerCase() === email.toLowerCase();
    const message = isEmailMatch 
      ? 'An application with this email address already exists.' 
      : 'An application with this phone number already exists.';
    console.log(`Message: ${message}`);
  } else {
    console.log('No matches found.');
  }

  // Testing unique one
  const uniqueEmail = 'new-apply-' + Date.now() + '@example.com';
  console.log(`\nChecking for unique email: ${uniqueEmail}`);
  const { data: noMatch } = await supabase
    .from('applications')
    .select('email, phone')
    .or(`email.ilike."${uniqueEmail}",phone.eq."9999999999"`)
    .maybeSingle();
    
  if (noMatch) {
    console.log('Error: Found match for unique data!');
  } else {
    console.log('Verified: No match for unique data.');
  }
}

verify();
