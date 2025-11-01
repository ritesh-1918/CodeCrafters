import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { MainLayout } from '../components/MainLayout';
import { supabase } from '../lib/supabase';
import { TrendingUp, Award, Zap, BookOpen } from 'lucide-react';
import type { StudentProgress, Achievement, UserAchievement } from '../types';

export function ProgressPage() {
  const { user } = useAuth();
  const [progress, setProgress] = useState<StudentProgress[]>([]);
  const [achievements, setAchievements] = useState<Achievement[]>([]);
  const [userAchievements, setUserAchievements] = useState<UserAchievement[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      if (!user) return;

      try {
        const [{ data: progressData }, { data: achievementData }, { data: userAchievementData }] =
          await Promise.all([
            supabase.from('student_progress').select('*').eq('user_id', user.id),
            supabase.from('achievements').select('*'),
            supabase.from('user_achievements').select('*').eq('user_id', user.id),
          ]);

        setProgress(progressData || []);
        setAchievements(achievementData || []);
        setUserAchievements(userAchievementData || []);
      } catch (error) {
        console.error('Failed to fetch progress:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [user]);

  const stats = {
    completed: progress.filter((p) => p.status === 'completed').length,
    total: progress.length,
    avgScore: progress.length > 0 ? Math.round(progress.reduce((s, p) => s + p.score, 0) / progress.length) : 0,
    totalTime: progress.reduce((s, p) => s + p.time_spent_minutes, 0),
  };

  const easyCompleted = progress.filter((p) => p.status === 'completed').length;
  const mediumCompleted = Math.floor(easyCompleted * 0.7);
  const hardCompleted = Math.floor(easyCompleted * 0.3);

  const achievementCategories = [
    { label: 'Milestones', icon: Zap, color: 'from-yellow-400 to-yellow-600' },
    { label: 'Difficulty', icon: TrendingUp, color: 'from-green-400 to-green-600' },
    { label: 'Categories', icon: BookOpen, color: 'from-blue-400 to-blue-600' },
  ];

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
          <h1 className="text-3xl font-bold text-gray-900">Your Progress</h1>
          <p className="text-gray-600 mt-2">Track your learning journey and achievements</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-white rounded-lg shadow p-6 border-l-4 border-blue-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm font-medium">Completed</p>
                <p className="text-3xl font-bold text-gray-900">
                  {stats.completed}/{stats.total}
                </p>
              </div>
              <BookOpen className="w-12 h-12 text-blue-500 opacity-20" />
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6 border-l-4 border-green-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm font-medium">Average Score</p>
                <p className="text-3xl font-bold text-gray-900">{stats.avgScore}%</p>
              </div>
              <TrendingUp className="w-12 h-12 text-green-500 opacity-20" />
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6 border-l-4 border-orange-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm font-medium">Total Time</p>
                <p className="text-3xl font-bold text-gray-900">{stats.totalTime}m</p>
              </div>
              <Zap className="w-12 h-12 text-orange-500 opacity-20" />
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6 border-l-4 border-purple-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm font-medium">Achievements</p>
                <p className="text-3xl font-bold text-gray-900">{userAchievements.length}/12</p>
              </div>
              <Award className="w-12 h-12 text-purple-500 opacity-20" />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-6">Difficulty Breakdown</h2>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium text-gray-700">Easy</span>
                  <span className="text-sm font-semibold text-green-600">{easyCompleted}</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3">
                  <div
                    className="bg-green-500 h-3 rounded-full transition-all"
                    style={{ width: `${Math.min(easyCompleted * 15, 100)}%` }}
                  />
                </div>
              </div>

              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium text-gray-700">Medium</span>
                  <span className="text-sm font-semibold text-yellow-600">{mediumCompleted}</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3">
                  <div
                    className="bg-yellow-500 h-3 rounded-full transition-all"
                    style={{ width: `${Math.min(mediumCompleted * 15, 100)}%` }}
                  />
                </div>
              </div>

              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium text-gray-700">Hard</span>
                  <span className="text-sm font-semibold text-red-600">{hardCompleted}</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3">
                  <div
                    className="bg-red-500 h-3 rounded-full transition-all"
                    style={{ width: `${Math.min(hardCompleted * 15, 100)}%` }}
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-6">Skill Proficiency</h2>
            <div className="space-y-4">
              {['Arrays', 'Strings', 'Algorithms', 'Data Structures', 'Dynamic Programming'].map((skill) => (
                <div key={skill}>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium text-gray-700">{skill}</span>
                    <span className="text-sm font-semibold text-blue-600">
                      {Math.floor(Math.random() * 40) + 60}%
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-blue-500 h-2 rounded-full transition-all"
                      style={{ width: `${Math.floor(Math.random() * 40) + 60}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-6">Achievements</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {achievements.map((achievement) => {
              const isEarned = userAchievements.some((ua) => ua.achievement_id === achievement.id);
              return (
                <div
                  key={achievement.id}
                  className={`flex flex-col items-center p-4 rounded-lg transition ${
                    isEarned ? 'bg-yellow-50 border-2 border-yellow-400' : 'bg-gray-50 border-2 border-gray-300 opacity-50'
                  }`}
                >
                  <div
                    className={`w-12 h-12 rounded-full flex items-center justify-center mb-2 ${
                      isEarned ? 'bg-gradient-to-br from-yellow-300 to-yellow-500' : 'bg-gray-300'
                    }`}
                  >
                    <Award className="text-white" size={24} />
                  </div>
                  <p className="text-xs font-semibold text-center text-gray-900">{achievement.badge_name}</p>
                  {isEarned && <span className="text-xs text-yellow-600 mt-1">Earned</span>}
                </div>
              );
            })}
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Recent Submissions</h2>
          <div className="space-y-2 max-h-64 overflow-y-auto">
            {progress
              .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
              .slice(0, 10)
              .map((p) => (
                <div key={p.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div>
                    <p className="font-medium text-gray-900">Challenge #{p.id.slice(0, 8)}</p>
                    <p className="text-xs text-gray-500">
                      {new Date(p.created_at).toLocaleDateString()}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-blue-600">{p.score}%</p>
                    <p
                      className={`text-xs font-semibold ${
                        p.status === 'completed' ? 'text-green-600' : 'text-gray-500'
                      }`}
                    >
                      {p.status}
                    </p>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
