import React from 'react';
import { motion, PanInfo, useMotionValue, useTransform } from 'motion/react';
import { cn } from '@/src/lib/utils';
import { Heart, X, Info } from 'lucide-react';

interface ProfileCardProps {
  name: string;
  age: number;
  bio: string;
  photos: string[];
  onSwipeLeft?: () => void;
  onSwipeRight?: () => void;
  onShowInfo?: () => void;
}

export const ProfileCard: React.FC<ProfileCardProps> = ({
  name,
  age,
  bio,
  photos,
  onSwipeLeft,
  onSwipeRight,
  onShowInfo,
}) => {
  const x = useMotionValue(0);
  const rotate = useTransform(x, [-200, 200], [-25, 25]);
  const opacity = useTransform(x, [-200, -150, 0, 150, 200], [0, 1, 1, 1, 0]);
  const likeOpacity = useTransform(x, [50, 150], [0, 1]);
  const nopeOpacity = useTransform(x, [-50, -150], [0, 1]);

  const handleDragEnd = (_: any, info: PanInfo) => {
    if (info.offset.x > 100) {
      onSwipeRight?.();
    } else if (info.offset.x < -100) {
      onSwipeLeft?.();
    }
  };

  return (
    <motion.div
      style={{ x, rotate, opacity }}
      drag="x"
      dragConstraints={{ left: 0, right: 0 }}
      onDragEnd={handleDragEnd}
      className="absolute inset-0 w-full h-full cursor-grab active:cursor-grabbing"
    >
      <div className="relative w-full h-full rounded-3xl overflow-hidden shadow-2xl bg-white border border-gray-100">
        {/* Profile Image */}
        <img
          src={photos[0] || `https://picsum.photos/seed/${name}/600/800`}
          alt={name}
          className="w-full h-full object-cover"
          referrerPolicy="no-referrer"
        />

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />

        {/* Swipe Indicators */}
        <motion.div
          style={{ opacity: likeOpacity }}
          className="absolute top-10 left-10 border-4 border-green-500 rounded-lg px-4 py-2 rotate-[-20deg] pointer-events-none"
        >
          <span className="text-4xl font-bold text-green-500 uppercase tracking-widest">LIKE</span>
        </motion.div>

        <motion.div
          style={{ opacity: nopeOpacity }}
          className="absolute top-10 right-10 border-4 border-red-500 rounded-lg px-4 py-2 rotate-[20deg] pointer-events-none"
        >
          <span className="text-4xl font-bold text-red-500 uppercase tracking-widest">NOPE</span>
        </motion.div>

        {/* Profile Info */}
        <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
          <div className="flex items-end justify-between mb-2">
            <div>
              <h2 className="text-3xl font-bold">
                {name}, {age}
              </h2>
              <p className="text-white/80 line-clamp-2 mt-1">{bio}</p>
            </div>
            <button
              onClick={(e) => {
                e.stopPropagation();
                onShowInfo?.();
              }}
              className="p-2 bg-white/20 backdrop-blur-md rounded-full hover:bg-white/30 transition-colors"
            >
              <Info className="w-6 h-6" />
            </button>
          </div>

          {/* Action Buttons (Visual only, drag handles the logic) */}
          <div className="flex justify-center gap-6 mt-4">
            <button className="p-4 bg-white rounded-full shadow-lg text-red-500 hover:scale-110 transition-transform">
              <X className="w-8 h-8" />
            </button>
            <button className="p-4 bg-white rounded-full shadow-lg text-green-500 hover:scale-110 transition-transform">
              <Heart className="w-8 h-8" />
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};
