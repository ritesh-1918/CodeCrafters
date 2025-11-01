import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { MainLayout } from '../components/MainLayout';
import { User, Mail, BookOpen, Briefcase, Award } from 'lucide-react';
import type { Branch } from '../types';

export function ProfilePage() {
  const { user, updateProfile } = useAuth();
  const [formData, setFormData] = useState({
    full_name: user?.full_name || '',
    bio: user?.bio || '',
    programming_languages: (user?.programming_languages || []).join(', '),
    career_interests: (user?.career_interests || []).join(', '),
  });
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      await updateProfile({
        full_name: formData.full_name,
        bio: formData.bio,
        programming_languages: formData.programming_languages
          .split(',')
          .map((l) => l.trim())
          .filter(Boolean),
        career_interests: formData.career_interests
          .split(',')
          .map((i) => i.trim())
          .filter(Boolean),
      });

      setSuccessMessage('Profile updated successfully!');
      setTimeout(() => setSuccessMessage(''), 3000);
    } catch (error) {
      console.error('Failed to update profile:', error);
    } finally {
      setLoading(false);
    }
  };

  if (!user) {
    return (
      <MainLayout>
        <div className="text-center py-12">
          <p className="text-gray-600">Loading...</p>
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <div className="max-w-2xl">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">My Profile</h1>
          <p className="text-gray-600 mt-2">Manage your account and learning preferences</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="md:col-span-1">
            <div className="bg-white rounded-lg shadow p-6 text-center">
              <div className="w-20 h-20 mx-auto mb-4 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full flex items-center justify-center">
                <User className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900">{user.full_name}</h3>
              <p className="text-gray-600 text-sm">{user.email}</p>
              <div className="mt-4 space-y-2">
                <div>
                  <span className="inline-block px-3 py-1 bg-blue-100 text-blue-700 text-xs font-semibold rounded-full">
                    {user.branch}
                  </span>
                </div>
                <p className="text-sm text-gray-600">Semester {user.semester}</p>
              </div>
            </div>
          </div>

          <div className="md:col-span-2 bg-white rounded-lg shadow p-6 space-y-4">
            <div className="flex items-center text-gray-600">
              <Award className="w-5 h-5 mr-3 text-yellow-500" />
              <span>12 Achievements Earned</span>
            </div>
            <div className="flex items-center text-gray-600">
              <BookOpen className="w-5 h-5 mr-3 text-blue-500" />
              <span>45 Challenges Completed</span>
            </div>
            <div className="flex items-center text-gray-600">
              <Briefcase className="w-5 h-5 mr-3 text-green-500" />
              <span>7 Day Learning Streak</span>
            </div>
          </div>
        </div>

        {successMessage && (
          <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg text-green-700">
            {successMessage}
          </div>
        )}

        <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow p-6 space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
            <input
              type="text"
              name="full_name"
              value={formData.full_name}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
            <input
              type="email"
              value={user.email}
              disabled
              className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-50 text-gray-600"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Branch</label>
              <select
                value={user.branch}
                disabled
                className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-50 text-gray-600"
              >
                <option value={user.branch}>{user.branch}</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Semester</label>
              <select
                value={user.semester}
                disabled
                className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-50 text-gray-600"
              >
                <option value={user.semester}>{user.semester}</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Bio</label>
            <textarea
              name="bio"
              value={formData.bio}
              onChange={handleChange}
              placeholder="Tell us about yourself..."
              rows={4}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
            />
            <p className="text-xs text-gray-500 mt-1">
              {formData.bio.length}/500 characters
            </p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Programming Languages (comma-separated)
            </label>
            <input
              type="text"
              name="programming_languages"
              value={formData.programming_languages}
              onChange={handleChange}
              placeholder="e.g., JavaScript, Python, Java"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Career Interests (comma-separated)
            </label>
            <input
              type="text"
              name="career_interests"
              value={formData.career_interests}
              onChange={handleChange}
              placeholder="e.g., Web Development, AI, Data Science"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white font-semibold py-2 px-4 rounded-lg transition duration-200"
          >
            {loading ? 'Saving...' : 'Save Changes'}
          </button>
        </form>
      </div>
    </MainLayout>
  );
}
