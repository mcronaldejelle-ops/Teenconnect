import React from 'react';
import { motion } from 'motion/react';
import { Heart, Search, Users, Video, User } from 'lucide-react';

interface NavigationProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

export const Navigation: React.FC<NavigationProps> = ({ activeTab, onTabChange }) => {
  const tabs = [
    { id: 'discovery', icon: Search, label: 'Discovery' },
    { id: 'social', icon: Users, label: 'Social' },
    { id: 'live', icon: Video, label: 'Live' },
    { id: 'profile', icon: User, label: 'Profile' },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white/80 backdrop-blur-md border-t border-gray-100 px-6 py-4 flex justify-between items-center z-50">
      {tabs.map((tab) => {
        const Icon = tab.icon;
        const isActive = activeTab === tab.id;
        return (
          <button
            key={tab.id}
            onClick={() => onTabChange(tab.id)}
            className="relative flex flex-col items-center gap-1 group"
          >
            <div className={`p-2 rounded-2xl transition-all ${
              isActive 
                ? 'bg-pink-500 text-white shadow-lg shadow-pink-200 scale-110' 
                : 'text-gray-400 hover:text-gray-600 hover:bg-gray-50'
            }`}>
              <Icon className="w-6 h-6" />
            </div>
            <span className={`text-[10px] font-bold uppercase tracking-widest transition-all ${
              isActive ? 'text-pink-500 opacity-100' : 'text-gray-400 opacity-0 group-hover:opacity-100'
            }`}>
              {tab.label}
            </span>
            {isActive && (
              <motion.div
                layoutId="nav-indicator"
                className="absolute -top-1 w-1 h-1 bg-pink-500 rounded-full"
              />
            )}
          </button>
        );
      })}
    </div>
  );
};
