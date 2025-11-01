/*
  # CodeCrafters AI - Core Database Schema

  1. New Tables
    - `users` - Student profiles with authentication and branch info
      - `id` (uuid, primary key, from auth.users)
      - `email` (text, unique)
      - `full_name` (text)
      - `branch` (text, one of: CSE, IT, ECE)
      - `semester` (integer)
      - `profile_picture_url` (text, nullable)
      - `bio` (text, nullable)
      - `programming_languages` (jsonb, array of language proficiency)
      - `career_interests` (jsonb, array)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)

    - `coding_challenges` - Challenge problems for practice
      - `id` (uuid, primary key)
      - `title` (text)
      - `description` (text)
      - `difficulty` (text, one of: Easy, Medium, Hard)
      - `branch` (text, one of: CSE, IT, ECE, General)
      - `topic` (text, category of challenge)
      - `starter_code` (jsonb, language-specific templates)
      - `test_cases` (jsonb, input/output pairs)
      - `solution_code` (text, for validation)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)

    - `student_progress` - Track challenge completion and scores
      - `id` (uuid, primary key)
      - `user_id` (uuid, foreign key to users)
      - `challenge_id` (uuid, foreign key to coding_challenges)
      - `status` (text, one of: started, completed, failed)
      - `score` (integer, 0-100)
      - `attempts` (integer)
      - `time_spent_minutes` (integer)
      - `code_submitted` (text)
      - `completed_at` (timestamp, nullable)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)

    - `achievements` - Badge definitions and tracking
      - `id` (uuid, primary key)
      - `badge_name` (text, unique)
      - `description` (text)
      - `icon_name` (text, lucide icon name)
      - `category` (text)
      - `unlock_criteria` (jsonb, conditions)
      - `created_at` (timestamp)

    - `user_achievements` - User's earned badges
      - `id` (uuid, primary key)
      - `user_id` (uuid, foreign key to users)
      - `achievement_id` (uuid, foreign key to achievements)
      - `earned_at` (timestamp)
      - `unique constraint on (user_id, achievement_id)

    - `ai_conversations` - Store voice queries and debugging sessions
      - `id` (uuid, primary key)
      - `user_id` (uuid, foreign key to users)
      - `challenge_id` (uuid, foreign key to coding_challenges, nullable)
      - `query_type` (text, one of: voice, text, debugging)
      - `user_message` (text)
      - `ai_response` (text)
      - `code_context` (text, nullable)
      - `created_at` (timestamp)

  2. Security
    - Enable RLS on all tables
    - Users can read/update only their own profile
    - Users can read challenges but not modify
    - Users can create/update only their own progress records
    - Users can view only their own achievements and conversations
*/

CREATE TABLE IF NOT EXISTS users (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email text UNIQUE NOT NULL,
  full_name text NOT NULL,
  branch text NOT NULL CHECK (branch IN ('CSE', 'IT', 'ECE')),
  semester integer DEFAULT 1 CHECK (semester >= 1 AND semester <= 8),
  profile_picture_url text,
  bio text DEFAULT '',
  programming_languages jsonb DEFAULT '[]'::jsonb,
  career_interests jsonb DEFAULT '[]'::jsonb,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS coding_challenges (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  description text NOT NULL,
  difficulty text NOT NULL CHECK (difficulty IN ('Easy', 'Medium', 'Hard')),
  branch text NOT NULL CHECK (branch IN ('CSE', 'IT', 'ECE', 'General')),
  topic text NOT NULL,
  starter_code jsonb NOT NULL DEFAULT '{}'::jsonb,
  test_cases jsonb NOT NULL DEFAULT '[]'::jsonb,
  solution_code text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS student_progress (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  challenge_id uuid NOT NULL REFERENCES coding_challenges(id) ON DELETE CASCADE,
  status text NOT NULL DEFAULT 'started' CHECK (status IN ('started', 'completed', 'failed')),
  score integer DEFAULT 0 CHECK (score >= 0 AND score <= 100),
  attempts integer DEFAULT 1,
  time_spent_minutes integer DEFAULT 0,
  code_submitted text,
  completed_at timestamptz,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  UNIQUE(user_id, challenge_id)
);

CREATE TABLE IF NOT EXISTS achievements (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  badge_name text UNIQUE NOT NULL,
  description text NOT NULL,
  icon_name text NOT NULL,
  category text NOT NULL,
  unlock_criteria jsonb NOT NULL DEFAULT '{}'::jsonb,
  created_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS user_achievements (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  achievement_id uuid NOT NULL REFERENCES achievements(id) ON DELETE CASCADE,
  earned_at timestamptz DEFAULT now(),
  UNIQUE(user_id, achievement_id)
);

CREATE TABLE IF NOT EXISTS ai_conversations (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  challenge_id uuid REFERENCES coding_challenges(id) ON DELETE SET NULL,
  query_type text NOT NULL CHECK (query_type IN ('voice', 'text', 'debugging')),
  user_message text NOT NULL,
  ai_response text NOT NULL,
  code_context text,
  created_at timestamptz DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_student_progress_user ON student_progress(user_id);
CREATE INDEX IF NOT EXISTS idx_student_progress_challenge ON student_progress(challenge_id);
CREATE INDEX IF NOT EXISTS idx_user_achievements_user ON user_achievements(user_id);
CREATE INDEX IF NOT EXISTS idx_coding_challenges_branch ON coding_challenges(branch);
CREATE INDEX IF NOT EXISTS idx_coding_challenges_difficulty ON coding_challenges(difficulty);
CREATE INDEX IF NOT EXISTS idx_ai_conversations_user ON ai_conversations(user_id);

ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE coding_challenges ENABLE ROW LEVEL SECURITY;
ALTER TABLE student_progress ENABLE ROW LEVEL SECURITY;
ALTER TABLE achievements ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_achievements ENABLE ROW LEVEL SECURITY;
ALTER TABLE ai_conversations ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own profile"
  ON users FOR SELECT
  TO authenticated
  USING (auth.uid() = id);

CREATE POLICY "Users can update own profile"
  ON users FOR UPDATE
  TO authenticated
  USING (auth.uid() = id)
  WITH CHECK (auth.uid() = id);

CREATE POLICY "Authenticated users can view challenges"
  ON coding_challenges FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Users can view own progress"
  ON student_progress FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create own progress records"
  ON student_progress FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own progress"
  ON student_progress FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Authenticated users can view achievements"
  ON achievements FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Users can view own achievements"
  ON user_achievements FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can view own conversations"
  ON ai_conversations FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create own conversations"
  ON ai_conversations FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);
