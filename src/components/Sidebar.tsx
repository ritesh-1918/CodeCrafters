import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import {
  Zap,
  Home,
  Code2,
  TrendingUp,
  User,
  LogOut,
  Menu,
  X,
} from 'lucide-react';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export function Sidebar({ isOpen, onClose }: SidebarProps) {
  const location = useLocation();
  const { signOut } = useAuth();

  const navItems = [
    { icon: Home, label: 'Dashboard', path: '/dashboard' },
    { icon: Code2, label: 'Challenges', path: '/challenges' },
    { icon: TrendingUp, label: 'Progress', path: '/progress' },
    { icon: User, label: 'Profile', path: '/profile' },
  ];

  const handleLogout = async () => {
    await signOut();
  };

  const isActive = (path: string) => location.pathname === path;

  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-30 md:hidden"
          onClick={onClose}
        />
      )}

      <aside
        className={`fixed md:static left-0 top-0 h-screen w-64 bg-gradient-to-b from-blue-900 to-blue-800 text-white shadow-lg transform transition-transform duration-300 z-40 ${
          isOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
        }`}
      >
        <div className="p-6 border-b border-blue-700">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <Zap className="w-8 h-8 mr-3" />
              <span className="text-xl font-bold">CodeCrafters</span>
            </div>
            <button
              onClick={onClose}
              className="md:hidden text-blue-200 hover:text-white"
            >
              <X size={20} />
            </button>
          </div>
        </div>

        <nav className="p-6 space-y-3 flex-1">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              onClick={onClose}
              className={`flex items-center px-4 py-3 rounded-lg transition ${
                isActive(item.path)
                  ? 'bg-blue-500 text-white'
                  : 'text-blue-100 hover:bg-blue-700'
              }`}
            >
              <item.icon size={20} className="mr-3" />
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="p-6 border-t border-blue-700">
          <button
            onClick={handleLogout}
            className="w-full flex items-center justify-center px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg transition"
          >
            <LogOut size={18} className="mr-2" />
            Logout
          </button>
        </div>
      </aside>
    </>
  );
}
