export type Branch = 'CSE' | 'IT' | 'ECE';
export type Difficulty = 'Easy' | 'Medium' | 'Hard';
export type ChallengeStatus = 'started' | 'completed' | 'failed';
export type QueryType = 'voice' | 'text' | 'debugging';

export interface User {
  id: string;
  email: string;
  full_name: string;
  branch: Branch;
  semester: number;
  profile_picture_url?: string;
  bio: string;
  programming_languages: string[];
  career_interests: string[];
  created_at: string;
  updated_at: string;
}

export interface CodingChallenge {
  id: string;
  title: string;
  description: string;
  difficulty: Difficulty;
  branch: Branch;
  topic: string;
  starter_code: { [key: string]: string };
  test_cases: Array<{ input: string; output: string }>;
  solution_code?: string;
  created_at: string;
  updated_at: string;
}

export interface StudentProgress {
  id: string;
  user_id: string;
  challenge_id: string;
  status: ChallengeStatus;
  score: number;
  attempts: number;
  time_spent_minutes: number;
  code_submitted?: string;
  completed_at?: string;
  created_at: string;
  updated_at: string;
}

export interface Achievement {
  id: string;
  badge_name: string;
  description: string;
  icon_name: string;
  category: string;
  unlock_criteria: { [key: string]: unknown };
  created_at: string;
}

export interface UserAchievement {
  id: string;
  user_id: string;
  achievement_id: string;
  earned_at: string;
}

export interface AIConversation {
  id: string;
  user_id: string;
  challenge_id?: string;
  query_type: QueryType;
  user_message: string;
  ai_response: string;
  code_context?: string;
  created_at: string;
}

export interface AuthContextType {
  user: User | null;
  loading: boolean;
  signUp: (email: string, password: string, userData: Partial<User>) => Promise<void>;
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
  updateProfile: (data: Partial<User>) => Promise<void>;
}
