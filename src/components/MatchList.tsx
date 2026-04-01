import React from 'react';
import { UserProfile, Match } from '../types';
import { Search, Heart, MessageCircle, ChevronRight, Zap } from 'lucide-react';
import { cn } from '../lib/utils';

interface MatchListProps {
  matches: {
    id: string;
    user: UserProfile;
    lastMessage?: string;
    unread?: boolean;
  }[];
  onSelectMatch: (matchId: string) => void;
}

export const MatchList: React.FC<MatchListProps> = ({ matches, onSelectMatch }) => {
  return (
    <div className="max-w-md mx-auto min-h-screen bg-white pb-24 animate-in fade-in duration-500">
      {/* Header */}
      <header className="px-6 py-8 space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-black tracking-tight text-gray-900 uppercase italic">
            Matches
          </h1>
          <div className="p-2 bg-pink-50 rounded-xl text-pink-500">
            <Zap className="w-5 h-5 fill-pink-500" />
          </div>
        </div>

        {/* Search */}
        <div className="relative group">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-pink-500 transition-colors" />
          <input
            className="w-full pl-12 pr-4 py-3.5 bg-gray-50 border border-transparent rounded-2xl focus:outline-none focus:bg-white focus:border-pink-500/20 focus:ring-4 focus:ring-pink-500/5 transition-all text-sm"
            placeholder="Search your matches..."
          />
        </div>
      </header>

      {/* New Matches (Horizontal) */}
      <section className="px-6 space-y-4">
        <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest flex items-center gap-2">
          New Matches <span className="w-1.5 h-1.5 bg-pink-500 rounded-full animate-pulse" />
        </h3>
        <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide">
          {matches.slice(0, 5).map((match) => (
            <button
              key={match.id}
              onClick={() => onSelectMatch(match.id)}
              className="flex flex-col items-center gap-2 flex-shrink-0 group"
            >
              <div className="relative">
                <div className="w-16 h-16 rounded-full border-2 border-pink-500 p-0.5 group-hover:scale-105 transition-transform">
                  <img
                    src={(match.user.photos && match.user.photos[0]) || (match.user.media && match.user.media[0]?.url) || `https://picsum.photos/seed/${match.user.displayName}/100/100`}
                    alt={match.user.displayName}
                    className="w-full h-full rounded-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <div className="absolute -bottom-1 -right-1 bg-white p-1 rounded-full shadow-sm">
                  <Heart className="w-3 h-3 text-pink-500 fill-pink-500" />
                </div>
              </div>
              <span className="text-[10px] font-bold text-gray-700 uppercase tracking-wider">
                {match.user.displayName.split(' ')[0]}
              </span>
            </button>
          ))}
        </div>
      </section>

      {/* Messages List */}
      <section className="mt-6">
        <h3 className="px-6 text-xs font-bold text-gray-400 uppercase tracking-widest mb-4">
          Messages
        </h3>
        <div className="divide-y divide-gray-50">
          {matches.map((match) => (
            <button
              key={match.id}
              onClick={() => onSelectMatch(match.id)}
              className="w-full px-6 py-4 flex items-center gap-4 hover:bg-gray-50 transition-all group relative"
            >
              <div className="relative flex-shrink-0">
                <img
                  src={(match.user.photos && match.user.photos[0]) || (match.user.media && match.user.media[0]?.url) || `https://picsum.photos/seed/${match.user.displayName}/100/100`}
                  alt={match.user.displayName}
                  className="w-14 h-14 rounded-full object-cover border-2 border-transparent group-hover:border-pink-500/20 transition-all"
                  referrerPolicy="no-referrer"
                />
                {match.unread && (
                  <div className="absolute top-0 right-0 w-4 h-4 bg-pink-500 border-2 border-white rounded-full" />
                )}
              </div>
              <div className="flex-1 text-left min-w-0">
                <div className="flex items-center justify-between mb-1">
                  <h4 className={cn('font-bold text-gray-900', match.unread && 'text-pink-600')}>
                    {match.user.displayName}
                  </h4>
                  <span className="text-[10px] text-gray-400 font-medium">2m ago</span>
                </div>
                <p className={cn(
                  'text-sm truncate',
                  match.unread ? 'text-gray-900 font-semibold' : 'text-gray-500'
                )}>
                  {match.lastMessage || "You matched! Say hi 👋"}
                </p>
              </div>
              <ChevronRight className="w-5 h-5 text-gray-300 group-hover:text-gray-400 transition-colors" />
            </button>
          ))}
        </div>
      </section>

      {/* Empty State */}
      {matches.length === 0 && (
        <div className="flex flex-col items-center justify-center py-20 px-12 text-center space-y-4">
          <div className="p-6 bg-pink-50 rounded-full">
            <MessageCircle className="w-12 h-12 text-pink-500" />
          </div>
          <div className="space-y-1">
            <h3 className="text-xl font-bold text-gray-900">No messages yet</h3>
            <p className="text-sm text-gray-500">
              Start swiping to find matches and start a conversation!
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
