const { createClient } = require('@supabase/supabase-js');
const supabaseUrl = 'https://zwkzesyyehpmwsybgvtl.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inp3a3plc3l5ZWhwbXdzeWJndnRsIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3NDkwMzc1MiwiZXhwIjoyMDkwNDc5NzUyfQ.rWvD4rk-AUufOEoW_7c0KzEsBfhMdwQsSHs1-w4BGiA';
const supabase = createClient(supabaseUrl, supabaseKey);

async function test() {
  const { data, error } = await supabase.from('applications').select('email, phone').limit(5);
  if (error) {
    console.error(error);
    return;
  }
  console.log(JSON.stringify(data, null, 2));
}
test();
