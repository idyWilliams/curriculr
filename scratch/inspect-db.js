const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');
const path = require('path');

// Load env variables
const envPath = path.join(__dirname, '../.env.local');
if (fs.existsSync(envPath)) {
  const envContent = fs.readFileSync(envPath, 'utf8');
  envContent.split('\n').forEach(line => {
    const trimmed = line.trim();
    if (trimmed && !trimmed.startsWith('#')) {
      const parts = trimmed.split('=');
      if (parts.length >= 2) {
        const key = parts[0].trim();
        const value = parts.slice(1).join('=').trim().replace(/^['"]|['"]$/g, '');
        process.env[key] = value;
      }
    }
  });
}

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error('Missing Supabase variables');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function inspect() {
  console.log('Inspecting Supabase database schema...');
  
  // Try querying submissions
  const { data: submissions, error: subError } = await supabase
    .from('submissions')
    .select('*')
    .limit(1);
    
  if (subError) {
    console.error('Error querying submissions:', subError.message);
  } else {
    console.log('Submissions table is accessible. Sample:', submissions);
  }

  // Try querying verified_engineering_reports
  const { data: reports, error: repError } = await supabase
    .from('verified_engineering_reports')
    .select('*')
    .limit(1);
    
  if (repError) {
    console.error('Error querying verified_engineering_reports:', repError.message);
  } else {
    console.log('Verified engineering reports table is accessible. Sample:', reports);
  }
}

inspect();
