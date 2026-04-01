import React, { useState } from 'react';
import { ProfileCard } from './ProfileCard';
import { UserProfile } from '@/src/types';
import { motion, AnimatePresence } from 'motion/react';
import { Heart, X, Star, Zap, MapPin, Filter } from 'lucide-react';

interface DiscoverProps {
  profiles: UserProfile[];
  onLike: (profileId: string) => void;
  onPass: (profileId: string) => void;
}

export const Discover: React.FC<DiscoverProps> = ({ profiles, onLike, onPass }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleSwipeRight = () => {
    onLike(profiles[currentIndex].uid);
    setCurrentIndex((prev) => prev + 1);
  };

  const handleSwipeLeft = () => {
    onPass(profiles[currentIndex].uid);
    setCurrentIndex((prev) => prev + 1);
  };

  if (currentIndex >= profiles.length) {
    return (
      <div className="flex flex-col items-center justify-center h-full p-8 text-center space-y-6 animate-in fade-in duration-700">
        <div className="relative">
          <div className="w-32 h-32 bg-pink-50 rounded-full flex items-center justify-center animate-pulse">
            <MapPin className="w-12 h-12 text-pink-500" />
          </div>
          <div className="absolute -top-2 -right-2 w-8 h-8 bg-indigo-500 rounded-full border-4 border-white flex items-center justify-center">
            <Zap className="w-4 h-4 text-white" />
          </div>
        </div>
        <div className="space-y-2">
          <h2 className="text-2xl font-bold text-gray-900">No more teens nearby</h2>
          <p className="text-gray-500 max-w-xs mx-auto">
            Try expanding your search radius or changing your filters to find more people!
          </p>
        </div>
        <button className="px-8 py-3 bg-pink-500 text-white rounded-full font-bold shadow-lg hover:bg-pink-600 transition-all active:scale-95">
          Expand Search
        </button>
      </div>
    );
  }

  return (
    <div className="relative h-full flex flex-col p-4 pb-24 max-w-md mx-auto overflow-hidden">
      {/* Header */}
      <header className="flex items-center justify-between px-2 py-4 mb-4">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-pink-500 rounded-xl flex items-center justify-center shadow-lg shadow-pink-200">
            <Zap className="w-5 h-5 text-white fill-white" />
          </div>
          <h1 className="text-xl font-black tracking-tight text-gray-900 uppercase italic">
            TeenConnect
          </h1>
        </div>
        <button className="p-2.5 bg-white rounded-2xl shadow-sm border border-gray-100 text-gray-400 hover:text-pink-500 transition-colors">
          <Filter className="w-5 h-5" />
        </button>
      </header>

      {/* Card Stack */}
      <div className="relative flex-1 perspective-1000">
        <AnimatePresence>
          {profiles.slice(currentIndex, currentIndex + 2).reverse().map((profile, idx) => (
            <ProfileCard
              key={profile.uid}
              name={profile.displayName}
              age={profile.age}
              bio={profile.bio}
              photos={profile.photos}
              onSwipeLeft={handleSwipeLeft}
              onSwipeRight={handleSwipeRight}
            />
          ))}
        </AnimatePresence>
      </div>

      {/* Bottom Controls */}
      <div className="flex justify-center items-center gap-6 mt-8 mb-4">
        <button
          onClick={handleSwipeLeft}
          className="p-5 bg-white rounded-full shadow-xl shadow-gray-200/50 text-red-500 hover:scale-110 active:scale-90 transition-all border border-gray-50"
        >
          <X className="w-8 h-8" />
        </button>
        <button className="p-4 bg-white rounded-full shadow-lg shadow-gray-200/50 text-yellow-500 hover:scale-110 active:scale-90 transition-all border border-gray-50">
          <Star className="w-6 h-6 fill-yellow-500" />
        </button>
        <button
          onClick={handleSwipeRight}
          className="p-5 bg-white rounded-full shadow-xl shadow-gray-200/50 text-green-500 hover:scale-110 active:scale-90 transition-all border border-gray-50"
        >
          <Heart className="w-8 h-8 fill-green-500" />
        </button>
      </div>
    </div>
  );
};
