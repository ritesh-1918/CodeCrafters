import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { MainLayout } from '../components/MainLayout';
import { supabase } from '../lib/supabase';
import { Search, Filter, Code2 } from 'lucide-react';
import type { CodingChallenge, Branch, Difficulty } from '../types';

export function ChallengesPage() {
  const { user } = useAuth();
  const [challenges, setChallenges] = useState<CodingChallenge[]>([]);
  const [filteredChallenges, setFilteredChallenges] = useState<CodingChallenge[]>([]);
  const [search, setSearch] = useState('');
  const [filters, setFilters] = useState({
    difficulty: '' as Difficulty | '',
    branch: '' as Branch | '',
    topic: '',
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchChallenges = async () => {
      try {
        const { data } = await supabase.from('coding_challenges').select('*');
        setChallenges(data || []);
        setFilteredChallenges(data || []);
      } catch (error) {
        console.error('Failed to fetch challenges:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchChallenges();
  }, []);

  useEffect(() => {
    let filtered = challenges;

    if (search) {
      filtered = filtered.filter(
        (c) =>
          c.title.toLowerCase().includes(search.toLowerCase()) ||
          c.description.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (filters.difficulty) {
      filtered = filtered.filter((c) => c.difficulty === filters.difficulty);
    }

    if (filters.branch && filters.branch !== 'General') {
      filtered = filtered.filter((c) => c.branch === filters.branch || c.branch === 'General');
    }

    if (filters.topic) {
      filtered = filtered.filter((c) => c.topic === filters.topic);
    }

    setFilteredChallenges(filtered);
  }, [search, filters, challenges]);

  const difficulties = ['Easy', 'Medium', 'Hard'] as Difficulty[];
  const branches = ['CSE', 'IT', 'ECE'] as Branch[];
  const topics = Array.from(new Set(challenges.map((c) => c.topic)));

  return (
    <MainLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Coding Challenges</h1>
          <p className="text-gray-600 mt-2">
            Practice and master your coding skills with our curated challenges
          </p>
        </div>

        <div className="space-y-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-3 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Search challenges..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Difficulty</label>
              <select
                value={filters.difficulty}
                onChange={(e) =>
                  setFilters((prev) => ({
                    ...prev,
                    difficulty: e.target.value as Difficulty | '',
                  }))
                }
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
              >
                <option value="">All Difficulties</option>
                {difficulties.map((d) => (
                  <option key={d} value={d}>
                    {d}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Branch</label>
              <select
                value={filters.branch}
                onChange={(e) =>
                  setFilters((prev) => ({
                    ...prev,
                    branch: e.target.value as Branch | '',
                  }))
                }
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
              >
                <option value="">All Branches</option>
                {branches.map((b) => (
                  <option key={b} value={b}>
                    {b}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Topic</label>
              <select
                value={filters.topic}
                onChange={(e) =>
                  setFilters((prev) => ({
                    ...prev,
                    topic: e.target.value,
                  }))
                }
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
              >
                <option value="">All Topics</option>
                {topics.map((t) => (
                  <option key={t} value={t}>
                    {t}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">&nbsp;</label>
              <button
                onClick={() => setFilters({ difficulty: '', branch: '', topic: '' })}
                className="w-full flex items-center justify-center px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition"
              >
                <Filter size={18} className="mr-2" />
                Reset
              </button>
            </div>
          </div>
        </div>

        {loading ? (
          <div className="flex items-center justify-center h-96">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600" />
          </div>
        ) : (
          <div className="space-y-3">
            {filteredChallenges.length === 0 ? (
              <div className="text-center py-12 bg-gray-50 rounded-lg">
                <Code2 className="w-12 h-12 text-gray-400 mx-auto mb-3" />
                <p className="text-gray-600">No challenges found. Try adjusting your filters.</p>
              </div>
            ) : (
              filteredChallenges.map((challenge) => (
                <div
                  key={challenge.id}
                  className="bg-white rounded-lg shadow hover:shadow-lg transition p-6 cursor-pointer group"
                >
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="font-semibold text-lg text-gray-900 group-hover:text-blue-600 transition">
                          {challenge.title}
                        </h3>
                        <span
                          className={`text-xs font-semibold px-2 py-1 rounded whitespace-nowrap ${
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
                      <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                        {challenge.description}
                      </p>
                      <div className="flex flex-wrap gap-2 text-xs text-gray-500">
                        <span className="bg-gray-100 px-2 py-1 rounded">{challenge.topic}</span>
                        <span className="bg-blue-50 px-2 py-1 rounded text-blue-700 font-semibold">
                          {challenge.branch}
                        </span>
                      </div>
                    </div>
                    <div className="mt-4 md:mt-0 md:ml-4">
                      <a
                        href={`/editor/${challenge.id}`}
                        className="inline-block px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition"
                      >
                        Start
                      </a>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        )}
      </div>
    </MainLayout>
  );
}
