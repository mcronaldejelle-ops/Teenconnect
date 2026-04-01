import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, useMotionValue, useTransform } from 'motion/react';
import { Heart, X, Star, Zap, Info, MapPin } from 'lucide-react';
import { auth, db } from '../firebase';
import { collection, query, where, getDocs, limit } from 'firebase/firestore';
import { likeUser, getUserProfile } from '../services/firebaseService';
import { UserProfile } from '../types';

export const Discovery: React.FC = () => {
  const [profiles, setProfiles] = useState<UserProfile[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showMatch, setShowMatch] = useState(false);

  useEffect(() => {
    const fetchProfiles = async () => {
      if (auth.currentUser) {
        const q = query(
          collection(db, 'users'),
          where('uid', '!=', auth.currentUser.uid),
          limit(10)
        );
        const querySnapshot = await getDocs(q);
        const data = querySnapshot.docs.map(doc => doc.data() as UserProfile);
        setProfiles(data);
      }
    };
    fetchProfiles();
  }, []);

  const handleSwipe = async (direction: 'like' | 'nope' | 'superlike') => {
    if (currentIndex < profiles.length && auth.currentUser) {
      const targetUser = profiles[currentIndex];
      await likeUser(auth.currentUser.uid, targetUser.uid, direction);
      setCurrentIndex(currentIndex + 1);
      
      // Simulate match for demo
      if (direction === 'like' && Math.random() > 0.7) {
        setShowMatch(true);
      }
    }
  };

  const currentProfile = profiles[currentIndex];

  if (!currentProfile) {
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-gray-50 p-6 text-center">
        <div className="w-24 h-24 bg-pink-100 rounded-full flex items-center justify-center mb-6 animate-pulse">
          <Zap className="w-12 h-12 text-pink-500" />
        </div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">No more profiles!</h2>
        <p className="text-gray-500">Check back later or expand your search area.</p>
      </div>
    );
  }

  return (
    <div className="relative h-screen bg-white overflow-hidden flex flex-col">
      <div className="flex-1 relative p-4 flex items-center justify-center">
        <AnimatePresence>
          <ProfileCard
            key={currentProfile.uid}
            profile={currentProfile}
            onSwipe={handleSwipe}
          />
        </AnimatePresence>
      </div>

      <div className="flex justify-center items-center gap-6 p-8 bg-white border-t border-gray-100">
        <button
          onClick={() => handleSwipe('nope')}
          className="p-5 bg-white rounded-full shadow-xl shadow-gray-200/50 text-red-500 hover:scale-110 active:scale-90 transition-all border border-gray-50"
        >
          <X className="w-8 h-8" />
        </button>
        <button
          onClick={() => handleSwipe('superlike')}
          className="p-4 bg-white rounded-full shadow-lg shadow-gray-200/50 text-yellow-500 hover:scale-110 active:scale-90 transition-all border border-gray-50"
        >
          <Star className="w-6 h-6 fill-yellow-500" />
        </button>
        <button
          onClick={() => handleSwipe('like')}
          className="p-5 bg-white rounded-full shadow-xl shadow-gray-200/50 text-green-500 hover:scale-110 active:scale-90 transition-all border border-gray-50"
        >
          <Heart className="w-8 h-8 fill-green-500" />
        </button>
      </div>

      {showMatch && (
        <MatchModal
          user={currentProfile}
          onClose={() => setShowMatch(false)}
        />
      )}
    </div>
  );
};

const ProfileCard: React.FC<{ profile: UserProfile; onSwipe: (dir: any) => void }> = ({ profile, onSwipe }) => {
  const x = useMotionValue(0);
  const rotate = useTransform(x, [-200, 200], [-25, 25]);
  const opacity = useTransform(x, [-200, -150, 0, 150, 200], [0, 1, 1, 1, 0]);
  const likeOpacity = useTransform(x, [50, 150], [0, 1]);
  const nopeOpacity = useTransform(x, [-150, -50], [1, 0]);

  const handleDragEnd = (_: any, info: any) => {
    if (info.offset.x > 100) onSwipe('like');
    else if (info.offset.x < -100) onSwipe('nope');
  };

  return (
    <motion.div
      style={{ x, rotate, opacity }}
      drag="x"
      dragConstraints={{ left: 0, right: 0 }}
      onDragEnd={handleDragEnd}
      className="absolute w-full max-w-sm aspect-[3/4] bg-white rounded-3xl overflow-hidden shadow-2xl cursor-grab active:cursor-grabbing"
    >
      <div className="relative h-full w-full">
        <img
          src={profile.avatarUrl || `https://picsum.photos/seed/${profile.uid}/600/800`}
          alt={profile.displayName}
          className="w-full h-full object-cover"
          referrerPolicy="no-referrer"
        />
        
        <motion.div style={{ opacity: likeOpacity }} className="absolute top-10 left-10 border-4 border-green-500 rounded-lg px-4 py-2 rotate-[-20deg] pointer-events-none z-20">
          <span className="text-4xl font-bold text-green-500 uppercase tracking-widest">LIKE</span>
        </motion.div>

        <motion.div style={{ opacity: nopeOpacity }} className="absolute top-10 right-10 border-4 border-red-500 rounded-lg px-4 py-2 rotate-[20deg] pointer-events-none z-20">
          <span className="text-4xl font-bold text-red-500 uppercase tracking-widest">NOPE</span>
        </motion.div>

        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />
        
        <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
          <div className="flex items-end justify-between mb-2">
            <div>
              <h2 className="text-3xl font-bold">{profile.displayName}, {profile.age}</h2>
              <div className="flex items-center gap-1 text-white/80 text-xs font-bold uppercase tracking-widest mt-1">
                <MapPin className="w-3 h-3" />
                <span>2 miles away</span>
              </div>
            </div>
            <button className="p-3 bg-white/20 backdrop-blur-md rounded-2xl hover:bg-white/30 transition-colors">
              <Info className="w-6 h-6" />
            </button>
          </div>
          <p className="text-white/80 line-clamp-2 text-sm leading-relaxed">{profile.bio || "No bio available."}</p>
        </div>
      </div>
    </motion.div>
  );
};

const MatchModal: React.FC<{ user: UserProfile; onClose: () => void }> = ({ user, onClose }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-6 text-center"
    >
      <motion.div
        initial={{ scale: 0.8, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        className="max-w-sm w-full"
      >
        <h1 className="text-5xl font-black text-white mb-4 italic tracking-tighter uppercase">It's a Match!</h1>
        <p className="text-white/80 mb-12">You and {user.displayName} liked each other.</p>
        
        <div className="flex justify-center gap-4 mb-12">
          <div className="w-24 h-24 rounded-full border-4 border-white overflow-hidden shadow-2xl rotate-[-12deg]">
            <img src={auth.currentUser?.photoURL || 'https://picsum.photos/seed/me/200'} alt="Me" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
          </div>
          <div className="w-24 h-24 rounded-full border-4 border-white overflow-hidden shadow-2xl rotate-[12deg]">
            <img src={user.avatarUrl || 'https://picsum.photos/seed/them/200'} alt={user.displayName} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
          </div>
        </div>

        <div className="space-y-4">
          <button className="w-full py-4 bg-pink-500 text-white font-bold rounded-2xl shadow-lg hover:bg-pink-600 transition-all">
            Send a Message
          </button>
          <button
            onClick={onClose}
            className="w-full py-4 bg-white/10 text-white font-bold rounded-2xl hover:bg-white/20 transition-all"
          >
            Keep Swiping
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
};
