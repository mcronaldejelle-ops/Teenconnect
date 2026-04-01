import React from 'react';
import { UserProfile } from '@/src/types';
import { Button } from './ui/Button';
import { Camera, Edit2, Settings, Shield, LogOut, ChevronRight, Heart, Star, Zap } from 'lucide-react';
import { cn } from '@/src/lib/utils';

interface ProfileProps {
  profile: UserProfile;
  onEdit: () => void;
  onLogout: () => void;
}

export const Profile: React.FC<ProfileProps> = ({ profile, onEdit, onLogout }) => {
  const stats = [
    { label: 'Matches', value: '12', icon: Heart, color: 'text-pink-500 bg-pink-50' },
    { label: 'Likes', value: '48', icon: Star, color: 'text-yellow-500 bg-yellow-50' },
    { label: 'Boosts', value: '3', icon: Zap, color: 'text-indigo-500 bg-indigo-50' },
  ];

  return (
    <div className="max-w-md mx-auto min-h-screen bg-gray-50 pb-24 animate-in fade-in duration-500">
      {/* Header */}
      <div className="relative h-80 bg-gradient-to-br from-pink-500 to-indigo-600 overflow-hidden">
        <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white via-transparent to-transparent" />
        <div className="absolute top-10 left-0 right-0 flex flex-col items-center">
          <div className="relative group">
            <div className="w-32 h-32 rounded-full border-4 border-white overflow-hidden shadow-2xl relative">
              <img
                src={profile.photos[0] || `https://picsum.photos/seed/${profile.displayName}/200/200`}
                alt={profile.displayName}
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center cursor-pointer">
                <Camera className="w-8 h-8 text-white" />
              </div>
            </div>
            <button
              onClick={onEdit}
              className="absolute bottom-0 right-0 p-2 bg-white text-pink-500 rounded-full shadow-lg hover:scale-110 transition-transform"
            >
              <Edit2 className="w-4 h-4" />
            </button>
          </div>
          <h2 className="mt-4 text-2xl font-bold text-white shadow-sm">
            {profile.displayName}, {profile.age}
          </h2>
          <p className="text-white/80 text-sm font-medium uppercase tracking-widest">
            {profile.gender} • {profile.location ? 'Nearby' : 'Global'}
          </p>
        </div>
      </div>

      {/* Stats */}
      <div className="px-6 -mt-10 relative z-10">
        <div className="bg-white rounded-3xl shadow-xl shadow-gray-200/50 p-6 grid grid-cols-3 gap-4">
          {stats.map(({ label, value, icon: Icon, color }) => (
            <div key={label} className="flex flex-col items-center gap-1">
              <div className={cn('p-3 rounded-2xl mb-1', color)}>
                <Icon className="w-6 h-6" />
              </div>
              <span className="text-lg font-bold text-gray-900">{value}</span>
              <span className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">{label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Settings Sections */}
      <div className="px-6 mt-8 space-y-4">
        <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
          <SectionItem icon={Settings} label="Account Settings" />
          <SectionItem icon={Shield} label="Safety & Privacy" />
          <SectionItem icon={Star} label="TeenConnect Gold" badge="New" />
        </div>

        <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
          <SectionItem icon={LogOut} label="Logout" onClick={onLogout} className="text-red-500" />
        </div>
      </div>

      {/* Footer */}
      <div className="mt-12 text-center space-y-2">
        <p className="text-xs text-gray-400 font-medium uppercase tracking-widest">
          TeenConnect v1.0.0
        </p>
        <p className="text-[10px] text-gray-300 px-12">
          By using TeenConnect, you agree to our Terms of Service and Privacy Policy.
        </p>
      </div>
    </div>
  );
};

const SectionItem = ({
  icon: Icon,
  label,
  onClick,
  className,
  badge,
}: {
  icon: any;
  label: string;
  onClick?: () => void;
  className?: string;
  badge?: string;
}) => (
  <button
    onClick={onClick}
    className={cn(
      'w-full px-6 py-4 flex items-center justify-between hover:bg-gray-50 transition-colors group border-b border-gray-50 last:border-none',
      className
    )}
  >
    <div className="flex items-center gap-4">
      <div className="p-2 bg-gray-100 rounded-xl group-hover:bg-white transition-colors">
        <Icon className="w-5 h-5" />
      </div>
      <span className="font-semibold text-gray-700">{label}</span>
      {badge && (
        <span className="px-2 py-0.5 bg-pink-500 text-white text-[10px] font-bold rounded-full uppercase tracking-wider">
          {badge}
        </span>
      )}
    </div>
    <ChevronRight className="w-5 h-5 text-gray-300 group-hover:text-gray-500 transition-colors" />
  </button>
);
