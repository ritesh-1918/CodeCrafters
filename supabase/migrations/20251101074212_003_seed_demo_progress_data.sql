/*
  # Seed Demo Progress Data

  This migration adds sample progress records to demonstrate the platform's capabilities.
  These records simulate a student who has completed various challenges and earned achievements.
  
  IMPORTANT: Demo user IDs are used with fixed UUID. In production, use actual authenticated user IDs.
*/

-- Insert sample progress records for demo user
-- Note: Using a standard UUID for demo purposes
INSERT INTO student_progress (
  user_id,
  challenge_id,
  status,
  score,
  attempts,
  time_spent_minutes,
  code_submitted,
  completed_at,
  created_at,
  updated_at
)
SELECT 
  '12345678-1234-1234-1234-123456789012'::uuid as user_id,
  id as challenge_id,
  CASE 
    WHEN random() > 0.4 THEN 'completed'
    ELSE 'started'
  END as status,
  CASE 
    WHEN random() > 0.4 THEN (FLOOR(RANDOM() * 40 + 60))::integer
    ELSE (FLOOR(RANDOM() * 30 + 40))::integer
  END as score,
  (FLOOR(RANDOM() * 5 + 1))::integer as attempts,
  (FLOOR(RANDOM() * 45 + 5))::integer as time_spent_minutes,
  'function solution() { /* demo code */ }' as code_submitted,
  CASE 
    WHEN random() > 0.4 THEN now() - (random() * interval '30 days')
    ELSE NULL
  END as completed_at,
  now() - (random() * interval '30 days') as created_at,
  now() as updated_at
FROM coding_challenges
LIMIT 50
ON CONFLICT (user_id, challenge_id) DO NOTHING;

-- Assign random achievements to demo user
INSERT INTO user_achievements (
  user_id,
  achievement_id,
  earned_at
)
SELECT 
  '12345678-1234-1234-1234-123456789012'::uuid as user_id,
  id as achievement_id,
  now() - (random() * interval '60 days') as earned_at
FROM achievements
WHERE random() > 0.3
ON CONFLICT (user_id, achievement_id) DO NOTHING;

-- Add sample AI conversations
INSERT INTO ai_conversations (
  user_id,
  challenge_id,
  query_type,
  user_message,
  ai_response,
  code_context,
  created_at
) VALUES
  (
    '12345678-1234-1234-1234-123456789012'::uuid,
    (SELECT id FROM coding_challenges LIMIT 1),
    'debugging',
    'How do I optimize this loop?',
    'Your current solution uses nested loops with O(n²) complexity. Consider using a hash map to reduce it to O(n). This will significantly improve performance for large inputs.',
    'for (let i = 0; i < n; i++) { for (let j = i+1; j < n; j++) { if (arr[i] + arr[j] === target) return true; } }',
    now() - interval '5 days'
  ),
  (
    '12345678-1234-1234-1234-123456789012'::uuid,
    (SELECT id FROM coding_challenges OFFSET 1 LIMIT 1),
    'voice',
    'What is dynamic programming?',
    'Dynamic programming is an algorithmic technique that solves complex problems by breaking them into simpler subproblems. It uses memoization to store previously computed results, avoiding redundant calculations.',
    NULL,
    now() - interval '10 days'
  ),
  (
    '12345678-1234-1234-1234-123456789012'::uuid,
    (SELECT id FROM coding_challenges OFFSET 2 LIMIT 1),
    'text',
    'How do I handle edge cases?',
    'Always consider edge cases like empty inputs, null values, single elements, and boundary conditions. Test these cases thoroughly before submission to ensure robustness.',
    'function process(arr) { if (!arr) return null; if (arr.length === 0) return 0; }',
    now() - interval '15 days'
  );
