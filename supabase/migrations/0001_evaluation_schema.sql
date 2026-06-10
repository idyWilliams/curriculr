-- Migration: 0001_evaluation_schema.sql
-- Description: Adds dual-mode evaluation schema for Curriculr

DO $$ BEGIN
    CREATE TYPE project_type_enum AS ENUM ('learning', 'hiring_challenge');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

-- 1. Update submissions table
ALTER TABLE submissions
ADD COLUMN IF NOT EXISTS project_type project_type_enum DEFAULT 'learning',
ADD COLUMN IF NOT EXISTS github_url text,
ADD COLUMN IF NOT EXISTS commit_hashes text[] DEFAULT '{}',
ADD COLUMN IF NOT EXISTS verification_status text DEFAULT 'pending';

-- 2. Create verified_engineering_reports table
CREATE TABLE IF NOT EXISTS verified_engineering_reports (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  submission_id uuid REFERENCES submissions(id) ON DELETE CASCADE UNIQUE,
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE,
  track_id uuid REFERENCES tracks(id) ON DELETE CASCADE,
  
  -- Core Evaluation Metrics
  is_human_written boolean DEFAULT false,
  domain_execution_score integer CHECK (domain_execution_score >= 0 AND domain_execution_score <= 100),
  engineering_polish_score integer CHECK (engineering_polish_score >= 0 AND engineering_polish_score <= 100),
  
  -- The Final Recommendation
  hire_recommendation boolean DEFAULT false,
  
  -- Detailed Feedback
  plagiarism_flags jsonb DEFAULT '[]'::jsonb,
  evaluation_summary text,
  
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enable RLS for verified_engineering_reports
ALTER TABLE verified_engineering_reports ENABLE ROW LEVEL SECURITY;

-- Policies for verified_engineering_reports
CREATE POLICY "Users can read own verified reports" 
  ON verified_engineering_reports FOR SELECT 
  USING (auth.uid() = user_id);

-- Depending on your admin setup, you'd add a policy for recruiters/admins to view these.
-- CREATE POLICY "Recruiters can read verified reports"
--   ON verified_engineering_reports FOR SELECT
--   USING (is_recruiter(auth.uid()));
