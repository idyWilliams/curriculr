-- CREATE TABLES

CREATE TABLE IF NOT EXISTS tracks (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  slug text UNIQUE NOT NULL,
  category text,
  color text,
  emoji text,
  description text,
  lesson_count integer DEFAULT 0,
  level text,
  hours integer,
  skills text[],
  enrolled_count integer DEFAULT 0,
  module_count integer DEFAULT 0,
  is_published boolean DEFAULT true,
  created_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS profiles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE UNIQUE,
  full_name text,
  avatar_url text,
  role text,
  interested_tracks text[],
  onboarding_completed boolean DEFAULT false,
  xp integer DEFAULT 0,
  level integer DEFAULT 1,
  updated_at timestamptz DEFAULT now(),
  created_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS enrollments (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE,
  track_id uuid REFERENCES tracks(id) ON DELETE CASCADE,
  progress_percent integer DEFAULT 0,
  status text DEFAULT 'active', -- 'active', 'completed'
  enrolled_at timestamptz DEFAULT now(),
  UNIQUE(user_id, track_id)
);

CREATE TABLE IF NOT EXISTS modules (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  track_id uuid REFERENCES tracks(id) ON DELETE CASCADE,
  title text NOT NULL,
  order_index integer NOT NULL,
  created_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS lessons (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  module_id uuid REFERENCES modules(id) ON DELETE CASCADE,
  track_id uuid REFERENCES tracks(id) ON DELETE CASCADE,
  title text NOT NULL,
  type text CHECK (type IN ('video','article','project','quiz')),
  duration_minutes integer,
  xp_reward integer DEFAULT 50,
  order_index integer NOT NULL,
  content jsonb,
  is_free boolean DEFAULT true,
  created_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS lesson_completions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE,
  lesson_id uuid REFERENCES lessons(id) ON DELETE CASCADE,
  track_id uuid REFERENCES tracks(id) ON DELETE CASCADE,
  completed_at timestamptz DEFAULT now(),
  xp_earned integer,
  time_spent_seconds integer DEFAULT 0,
  UNIQUE(user_id, lesson_id)
);

CREATE TABLE IF NOT EXISTS submissions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE,
  lesson_id uuid REFERENCES lessons(id) ON DELETE CASCADE,
  track_id uuid REFERENCES tracks(id) ON DELETE CASCADE,
  submission_url text,
  status text DEFAULT 'pending',
  submitted_at timestamptz DEFAULT now()
);

-- ALTER tracks table
DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='tracks' AND column_name='is_published') THEN
    ALTER TABLE tracks ADD COLUMN is_published boolean DEFAULT true;
  END IF;
END $$;

-- ENABLE RLS
ALTER TABLE lesson_completions ENABLE ROW LEVEL SECURITY;
ALTER TABLE submissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE modules ENABLE ROW LEVEL SECURITY;
ALTER TABLE lessons ENABLE ROW LEVEL SECURITY;

-- CREATE POLICIES
CREATE POLICY "Users can read own lesson completions" ON lesson_completions FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own lesson completions" ON lesson_completions FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own lesson completions" ON lesson_completions FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can delete own lesson completions" ON lesson_completions FOR DELETE USING (auth.uid() = user_id);

CREATE POLICY "Users can read own submissions" ON submissions FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own submissions" ON submissions FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own submissions" ON submissions FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can delete own submissions" ON submissions FOR DELETE USING (auth.uid() = user_id);

CREATE POLICY "Public read access to modules" ON modules FOR SELECT USING (true);
CREATE POLICY "Public read access to lessons" ON lessons FOR SELECT USING (true);

-- CREATE TRIGGER FUNCTION
CREATE OR REPLACE FUNCTION update_enrollment_progress()
RETURNS TRIGGER AS $$
DECLARE
  total_lessons integer;
  completed_lessons integer;
BEGIN
  SELECT COUNT(*) INTO total_lessons
    FROM lessons WHERE track_id = NEW.track_id;
  SELECT COUNT(*) INTO completed_lessons
    FROM lesson_completions 
    WHERE user_id = NEW.user_id AND track_id = NEW.track_id;
  UPDATE enrollments 
    SET progress_percent = ROUND(
      (completed_lessons::numeric / total_lessons) * 100
    ),
    status = CASE 
      WHEN completed_lessons = total_lessons 
      THEN 'completed' ELSE 'active' 
    END
  WHERE user_id = NEW.user_id 
    AND track_id = NEW.track_id;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

DROP TRIGGER IF EXISTS on_lesson_complete ON lesson_completions;
CREATE TRIGGER on_lesson_complete
  AFTER INSERT ON lesson_completions
  FOR EACH ROW EXECUTE FUNCTION update_enrollment_progress();

-- SEED DATA (Tracks)
INSERT INTO tracks (id, name, slug, category, color, emoji, description, lesson_count, level, hours, skills, enrolled_count, module_count, is_published)
VALUES 
  ('11111111-1111-1111-1111-111111111111', 'Frontend Engineering', 'frontend-engineering', 'Development', '#2563EB', '⚡', 'Master modern frontend development with React, TypeScript, and Next.js. Build production-ready UIs.', 36, 'Beginner → Advanced', 60, ARRAY['React', 'TypeScript', 'Next.js'], 3240, 8, true),
  ('22222222-2222-2222-2222-222222222222', 'Backend Engineering', 'backend-engineering', 'Development', '#1B6B45', '🔧', 'Build scalable APIs and server-side systems with Node.js, PostgreSQL, and cloud deployment.', 32, 'Intermediate', 55, ARRAY['Node.js', 'PostgreSQL', 'Docker'], 2100, 7, true),
  ('33333333-3333-3333-3333-333333333333', 'Generative AI', 'generative-ai', 'Data & AI', '#EC4899', '🤖', 'Build with LLMs, prompt engineering, RAG pipelines, and AI agents from first principles.', 28, 'Intermediate', 48, ARRAY['Python', 'LangChain', 'OpenAI'], 4100, 6, true),
  ('44444444-4444-4444-4444-444444444444', 'UI/UX Design', 'ui-ux-design', 'Design', '#7C6AF7', '🎨', 'Design beautiful, usable products. From wireframes to high-fidelity Figma prototypes.', 24, 'Beginner', 36, ARRAY['Figma', 'Prototyping', 'Design Systems'], 1890, 5, true),
  ('55555555-5555-5555-5555-555555555555', 'Data Analysis', 'data-analysis', 'Data & AI', '#F97316', '📊', 'Turn raw data into insights using Python, SQL, and data visualization tools.', 26, 'Beginner', 42, ARRAY['Python', 'SQL', 'Pandas'], 2670, 6, true),
  ('66666666-6666-6666-6666-666666666666', 'DevOps & Cloud', 'devops-cloud', 'DevOps', '#F59E0B', '☁️', 'Ship faster with CI/CD, Docker, Kubernetes, and cloud infrastructure on AWS and GCP.', 30, 'Intermediate', 52, ARRAY['Docker', 'AWS', 'GitHub Actions'], 1450, 7, true),
  ('77777777-7777-7777-7777-777777777777', 'Systems Design', 'systems-design', 'Development', '#F97316', '🏗️', 'Design systems that scale to millions. Architecture patterns, databases, caching, queues.', 24, 'Advanced', 40, ARRAY['Architecture', 'Redis', 'Message Queues'], 980, 5, true),
  ('88888888-8888-8888-8888-888888888888', 'Product Management', 'product-management', 'Product', '#6BAE8F', '🧭', 'Build products people love. PRDs, roadmaps, user research, metrics, and stakeholder alignment.', 20, 'Beginner', 32, ARRAY['Strategy', 'Roadmapping', 'User Research'], 1120, 4, true),
  ('99999999-9999-9999-9999-999999999999', 'Mobile with Flutter', 'mobile-flutter', 'Development', '#2563EB', '📱', 'Build beautiful cross-platform mobile apps for iOS and Android using Flutter and Dart.', 28, 'Beginner → Intermediate', 45, ARRAY['Flutter', 'Dart', 'Firebase'], 1780, 6, true)
ON CONFLICT (id) DO UPDATE SET 
  name = EXCLUDED.name, slug = EXCLUDED.slug, category = EXCLUDED.category, color = EXCLUDED.color, 
  emoji = EXCLUDED.emoji, description = EXCLUDED.description, lesson_count = EXCLUDED.lesson_count, 
  level = EXCLUDED.level, hours = EXCLUDED.hours, skills = EXCLUDED.skills, 
  enrolled_count = EXCLUDED.enrolled_count, module_count = EXCLUDED.module_count, is_published = EXCLUDED.is_published;

-- SEED MODULES & LESSONS for Frontend Engineering ('11111111-1111-1111-1111-111111111111')
-- Module 1
INSERT INTO modules (id, track_id, title, order_index) VALUES 
  ('m1000000-0000-0000-0000-000000000000', '11111111-1111-1111-1111-111111111111', 'Foundations', 1)
ON CONFLICT (id) DO NOTHING;

INSERT INTO lessons (id, module_id, track_id, title, type, duration_minutes, order_index, content) VALUES
  ('l1000000-0000-0000-0000-000000000001', 'm1000000-0000-0000-0000-000000000000', '11111111-1111-1111-1111-111111111111', 'HTML & CSS Fundamentals', 'video', 15, 1, '{"url": "https://example.com/video1", "notes": "# HTML Fundamentals\n\nLearn the basics of semantic HTML5. Code examples:\n\n```html\n<main>\n  <h1>Hello</h1>\n</main>\n```"}'),
  ('l1000000-0000-0000-0000-000000000002', 'm1000000-0000-0000-0000-000000000000', '11111111-1111-1111-1111-111111111111', 'The Box Model & Layouts', 'video', 12, 2, '{"url": "https://example.com/video2"}'),
  ('l1000000-0000-0000-0000-000000000003', 'm1000000-0000-0000-0000-000000000000', '11111111-1111-1111-1111-111111111111', 'CSS Flexbox Mastery', 'article', 10, 3, '{"markdown": "# Flexbox Mastery\n\nFlexbox is a one-dimensional layout method for laying out items in rows or columns.\n\n```css\n.container {\n  display: flex;\n  justify-content: space-between;\n}\n```"}'),
  ('l1000000-0000-0000-0000-000000000004', 'm1000000-0000-0000-0000-000000000000', '11111111-1111-1111-1111-111111111111', 'CSS Grid Complete Guide', 'video', 18, 4, '{"url": "https://example.com/video4"}'),
  ('l1000000-0000-0000-0000-000000000005', 'm1000000-0000-0000-0000-000000000000', '11111111-1111-1111-1111-111111111111', 'Responsive Design Principles', 'video', 14, 5, '{"url": "https://example.com/video5"}'),
  ('l1000000-0000-0000-0000-000000000006', 'm1000000-0000-0000-0000-000000000000', '11111111-1111-1111-1111-111111111111', 'Build a Portfolio Layout', 'project', 45, 6, '{"brief": "In this project, you will apply Flexbox and Grid to build a fully responsive portfolio page from scratch.", "requirements": ["Use CSS Grid for the main layout", "Use Flexbox for the navigation menu", "Ensure the design is responsive using media queries"]}')
ON CONFLICT (id) DO NOTHING;

-- SEED MODULES & LESSONS for Backend Engineering ('22222222-2222-2222-2222-222222222222')
INSERT INTO modules (id, track_id, title, order_index) VALUES 
  ('m2000000-0000-0000-0000-000000000000', '22222222-2222-2222-2222-222222222222', 'Node.js Foundations', 1)
ON CONFLICT (id) DO NOTHING;

INSERT INTO lessons (id, module_id, track_id, title, type, duration_minutes, order_index, content) VALUES
  ('l2000000-0000-0000-0000-000000000001', 'm2000000-0000-0000-0000-000000000000', '22222222-2222-2222-2222-222222222222', 'Intro to Node.js Architecture', 'video', 20, 1, '{"url": "https://example.com/video"}'),
  ('l2000000-0000-0000-0000-000000000002', 'm2000000-0000-0000-0000-000000000000', '22222222-2222-2222-2222-222222222222', 'The Event Loop Explained', 'article', 15, 2, '{"markdown": "# The Event Loop\n\nUnderstand how Node.js handles asynchronous operations."}'),
  ('l2000000-0000-0000-0000-000000000003', 'm2000000-0000-0000-0000-000000000000', '22222222-2222-2222-2222-222222222222', 'Build Your First API', 'project', 60, 3, '{"brief": "Create a simple RESTful API with Express.js.", "requirements": ["Initialize an Express app", "Create GET and POST routes"]}')
ON CONFLICT (id) DO NOTHING;

-- SEED MODULES & LESSONS for Generative AI ('33333333-3333-3333-3333-333333333333')
INSERT INTO modules (id, track_id, title, order_index) VALUES 
  ('m3000000-0000-0000-0000-000000000000', '33333333-3333-3333-3333-333333333333', 'Intro to LLMs', 1)
ON CONFLICT (id) DO NOTHING;

INSERT INTO lessons (id, module_id, track_id, title, type, duration_minutes, order_index, content) VALUES
  ('l3000000-0000-0000-0000-000000000001', 'm3000000-0000-0000-0000-000000000000', '33333333-3333-3333-3333-333333333333', 'What are Large Language Models?', 'video', 18, 1, '{"url": "https://example.com/video"}'),
  ('l3000000-0000-0000-0000-000000000002', 'm3000000-0000-0000-0000-000000000000', '33333333-3333-3333-3333-333333333333', 'Prompt Engineering Basics', 'article', 12, 2, '{"markdown": "# Prompt Engineering\n\nLearn how to craft effective prompts."}'),
  ('l3000000-0000-0000-0000-000000000003', 'm3000000-0000-0000-0000-000000000000', '33333333-3333-3333-3333-333333333333', 'OpenAI API Integration', 'project', 45, 3, '{"brief": "Integrate the OpenAI API to generate text responses in a simple app.", "requirements": ["Obtain API key", "Make a successful API request"]}')
ON CONFLICT (id) DO NOTHING;

-- SEED MODULES & LESSONS for UI/UX Design ('44444444-4444-4444-4444-444444444444')
INSERT INTO modules (id, track_id, title, order_index) VALUES 
  ('m4000000-0000-0000-0000-000000000000', '44444444-4444-4444-4444-444444444444', 'Design Thinking', 1)
ON CONFLICT (id) DO NOTHING;

INSERT INTO lessons (id, module_id, track_id, title, type, duration_minutes, order_index, content) VALUES
  ('l4000000-0000-0000-0000-000000000001', 'm4000000-0000-0000-0000-000000000000', '44444444-4444-4444-4444-444444444444', 'The Design Process', 'video', 16, 1, '{"url": "https://example.com/video"}'),
  ('l4000000-0000-0000-0000-000000000002', 'm4000000-0000-0000-0000-000000000000', '44444444-4444-4444-4444-444444444444', 'User Research Methodologies', 'article', 18, 2, '{"markdown": "# User Research\n\nHow to understand your users through qualitative and quantitative research."}'),
  ('l4000000-0000-0000-0000-000000000003', 'm4000000-0000-0000-0000-000000000000', '44444444-4444-4444-4444-444444444444', 'Create User Personas', 'project', 60, 3, '{"brief": "Develop 2 comprehensive user personas for a fictional application.", "requirements": ["Include demographics", "Include pain points and goals"]}')
ON CONFLICT (id) DO NOTHING;
