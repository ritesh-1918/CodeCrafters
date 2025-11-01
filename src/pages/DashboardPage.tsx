import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { MainLayout } from '../components/MainLayout';
import { supabase } from '../lib/supabase';
import {
  TrendingUp,
  Zap,
  Award,
  BookOpen,
  ArrowRight,
  Flame,
} from 'lucide-react';
import type { CodingChallenge, StudentProgress } from '../types';

export function DashboardPage() {
  const { user } = useAuth();
  const [challenges, setChallenges] = useState<CodingChallenge[]>([]);
  const [progress, setProgress] = useState<StudentProgress[]>([]);
  const [stats, setStats] = useState({
    completedChallenges: 0,
    totalAttempts: 0,
    currentStreak: 0,
    avgScore: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      if (!user) return;

      try {
        const { data: challengeData } = await supabase
          .from('coding_challenges')
          .select('*')
          .limit(3);

        const { data: progressData } = await supabase
          .from('student_progress')
          .select('*')
          .eq('user_id', user.id);

        setChallenges(challengeData || []);
        setProgress(progressData || []);

        if (progressData && progressData.length > 0) {
          const completed = progressData.filter((p) => p.status === 'completed').length;
          const totalAttempts = progressData.reduce((sum, p) => sum + p.attempts, 0);
          const avgScore =
            progressData.length > 0
              ? Math.round(progressData.reduce((sum, p) => sum + p.score, 0) / progressData.length)
              : 0;

          setStats({
            completedChallenges: completed,
            totalAttempts,
            currentStreak: 7,
            avgScore,
          });
        }
      } catch (error) {
        console.error('Failed to fetch dashboard data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [user]);

  if (loading) {
    return (
      <MainLayout>
        <div className="flex items-center justify-center h-96">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600" />
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            Welcome back, {user?.full_name?.split(' ')[0]}!
          </h1>
          <p className="text-gray-600 mt-2">
            {user?.branch} • Semester {user?.semester}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-white rounded-lg shadow p-6 border-l-4 border-blue-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm font-medium">Challenges Done</p>
                <p className="text-3xl font-bold text-gray-900">{stats.completedChallenges}</p>
              </div>
              <BookOpen className="w-12 h-12 text-blue-500 opacity-20" />
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6 border-l-4 border-green-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm font-medium">Avg Score</p>
                <p className="text-3xl font-bold text-gray-900">{stats.avgScore}%</p>
              </div>
              <TrendingUp className="w-12 h-12 text-green-500 opacity-20" />
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6 border-l-4 border-orange-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm font-medium">Current Streak</p>
                <p className="text-3xl font-bold text-gray-900">{stats.currentStreak}</p>
              </div>
              <Flame className="w-12 h-12 text-orange-500 opacity-20" />
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6 border-l-4 border-purple-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm font-medium">Total Attempts</p>
                <p className="text-3xl font-bold text-gray-900">{stats.totalAttempts}</p>
              </div>
              <Zap className="w-12 h-12 text-purple-500 opacity-20" />
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-r from-blue-600 to-blue-500 rounded-lg shadow-lg p-8 text-white">
          <h2 className="text-2xl font-bold mb-2">Ready to Code?</h2>
          <p className="text-blue-100 mb-4">
            Start with a new challenge and improve your skills today
          </p>
          <a
            href="/challenges"
            className="inline-flex items-center px-6 py-2 bg-white text-blue-600 font-semibold rounded-lg hover:bg-blue-50 transition"
          >
            Browse Challenges <ArrowRight className="ml-2" size={18} />
          </a>
        </div>

        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Featured Challenges</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {challenges.slice(0, 3).map((challenge) => (
              <div
                key={challenge.id}
                className="bg-white rounded-lg shadow hover:shadow-lg transition p-6"
              >
                <div className="flex items-start justify-between mb-2">
                  <h3 className="font-semibold text-gray-900">{challenge.title}</h3>
                  <span
                    className={`text-xs font-semibold px-2 py-1 rounded ${
                      challenge.difficulty === 'Easy'
                        ? 'bg-green-100 text-green-800'
                        : challenge.difficulty === 'Medium'
                          ? 'bg-yellow-100 text-yellow-800'
                          : 'bg-red-100 text-red-800'
                    }`}
                  >
                    {challenge.difficulty}
                  </span>
                </div>
                <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                  {challenge.description}
                </p>
                <div className="flex items-center justify-between text-xs text-gray-500">
                  <span>{challenge.topic}</span>
                  <span className="font-semibold text-blue-600">{challenge.branch}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Achievements Unlocked</h2>
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between text-center">
              {[1, 2, 3, 4, 5].map((i) => (
                <div key={i} className="text-center">
                  <div className="w-12 h-12 mx-auto mb-2 bg-gradient-to-br from-yellow-300 to-yellow-500 rounded-full flex items-center justify-center">
                    <Award className="text-white" size={24} />
                  </div>
                  <p className="text-xs text-gray-600">Achievement</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
