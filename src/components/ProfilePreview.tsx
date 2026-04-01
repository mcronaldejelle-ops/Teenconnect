import React from 'react';
import { UserProfile } from '@/src/types';
import { motion, AnimatePresence } from 'motion/react';
import { X, Heart, Star, Shield, MapPin, Info, Zap, ChevronLeft, MoreVertical } from 'lucide-react';
import { Button } from './ui/Button';
import { cn } from '@/src/lib/utils';

interface ProfilePreviewProps {
  profile: UserProfile;
  onClose: () => void;
  onLike: () => void;
  onPass: () => void;
}

export const ProfilePreview: React.FC<ProfilePreviewProps> = ({
  profile,
  onClose,
  onLike,
  onPass,
}) => {
  return (
    <motion.div
      initial={{ y: '100%' }}
      animate={{ y: 0 }}
      exit={{ y: '100%' }}
      transition={{ type: 'spring', damping: 25, stiffness: 200 }}
      className="fixed inset-0 z-[60] bg-white overflow-y-auto"
    >
      {/* Hero Section */}
      <div className="relative h-[60vh]">
        <div className="absolute inset-0">
          <img
            src={profile.photos[0] || `https://picsum.photos/seed/${profile.displayName}/600/800`}
            alt={profile.displayName}
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
        </div>

        {/* Header Actions */}
        <div className="absolute top-10 left-0 right-0 px-6 flex items-center justify-between z-10">
          <button
            onClick={onClose}
            className="p-3 bg-white/20 backdrop-blur-md text-white rounded-2xl hover:bg-white/30 transition-colors"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <button className="p-3 bg-white/20 backdrop-blur-md text-white rounded-2xl hover:bg-white/30 transition-colors">
            <MoreVertical className="w-6 h-6" />
          </button>
        </div>

        {/* Name & Age Overlay */}
        <div className="absolute bottom-8 left-8 text-white">
          <h1 className="text-4xl font-black tracking-tight uppercase italic">
            {profile.displayName}, {profile.age}
          </h1>
          <div className="flex items-center gap-2 mt-2 text-white/80 font-bold uppercase tracking-widest text-xs">
            <MapPin className="w-4 h-4" />
            <span>2 miles away</span>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="px-8 py-10 space-y-10 pb-32">
        {/* Bio */}
        <section className="space-y-4">
          <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest flex items-center gap-2">
            About <div className="h-[1px] flex-1 bg-gray-100" />
          </h3>
          <p className="text-gray-700 leading-relaxed text-lg">
            {profile.bio || "No bio yet. This teen is a mystery! 🕵️‍♂️"}
          </p>
        </section>

        {/* Interests */}
        <section className="space-y-4">
          <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest flex items-center gap-2">
            Interests <div className="h-[1px] flex-1 bg-gray-100" />
          </h3>
          <div className="flex flex-wrap gap-2">
            {profile.interests?.map((interest) => (
              <span
                key={interest}
                className="px-4 py-2 bg-pink-50 text-pink-600 rounded-2xl text-sm font-bold border border-pink-100"
              >
                {interest}
              </span>
            ))}
          </div>
        </section>

        {/* Safety Badge */}
        <section className="bg-indigo-50 p-6 rounded-[2rem] border border-indigo-100 flex gap-4 items-start">
          <div className="p-3 bg-white rounded-2xl shadow-sm text-indigo-500">
            <Shield className="w-6 h-6" />
          </div>
          <div className="space-y-1">
            <h4 className="font-bold text-indigo-900">Verified Profile</h4>
            <p className="text-xs text-indigo-600 leading-relaxed">
              This profile has been verified by TeenConnect. Remember to always stay safe and follow our safety tips!
            </p>
          </div>
        </section>

        {/* More Photos */}
        {profile.photos.length > 1 && (
          <section className="space-y-4">
            <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest flex items-center gap-2">
              More Photos <div className="h-[1px] flex-1 bg-gray-100" />
            </h3>
            <div className="grid grid-cols-2 gap-4">
              {profile.photos.slice(1).map((photo, idx) => (
                <img
                  key={idx}
                  src={photo}
                  alt="Profile"
                  className="w-full aspect-[3/4] object-cover rounded-[2rem]"
                  referrerPolicy="no-referrer"
                />
              ))}
            </div>
          </section>
        )}
      </div>

      {/* Floating Action Bar */}
      <div className="fixed bottom-8 left-0 right-0 px-8 z-20">
        <div className="bg-white/80 backdrop-blur-xl p-4 rounded-[2.5rem] shadow-2xl shadow-gray-200/50 border border-gray-100 flex items-center justify-center gap-6">
          <button
            onClick={onPass}
            className="p-4 bg-white rounded-full shadow-lg text-red-500 hover:scale-110 active:scale-90 transition-all border border-gray-50"
          >
            <X className="w-8 h-8" />
          </button>
          <button className="p-3 bg-white rounded-full shadow-md text-yellow-500 hover:scale-110 active:scale-90 transition-all border border-gray-50">
            <Star className="w-6 h-6 fill-yellow-500" />
          </button>
          <button
            onClick={onLike}
            className="p-4 bg-white rounded-full shadow-lg text-green-500 hover:scale-110 active:scale-90 transition-all border border-gray-50"
          >
            <Heart className="w-8 h-8 fill-green-500" />
          </button>
        </div>
      </div>
    </motion.div>
  );
};
