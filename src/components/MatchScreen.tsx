import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Heart, MessageCircle, X } from 'lucide-react';
import { Button } from './ui/Button';
import { UserProfile } from '@/src/types';

interface MatchScreenProps {
  isOpen: boolean;
  onClose: () => void;
  onChat: () => void;
  matchUser: UserProfile;
  currentUser: UserProfile;
}

export const MatchScreen: React.FC<MatchScreenProps> = ({
  isOpen,
  onClose,
  onChat,
  matchUser,
  currentUser,
}) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-black/80 backdrop-blur-sm"
        >
          <motion.div
            initial={{ scale: 0.8, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.8, y: 20 }}
            className="w-full max-w-sm bg-white rounded-[3rem] overflow-hidden shadow-2xl relative"
          >
            <button
              onClick={onClose}
              className="absolute top-6 right-6 p-2 bg-black/10 text-white rounded-full hover:bg-black/20 transition-colors z-10"
            >
              <X className="w-6 h-6" />
            </button>

            <div className="p-8 text-center space-y-8">
              <div className="space-y-2">
                <motion.div
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="inline-block p-4 bg-pink-50 rounded-full"
                >
                  <Heart className="w-12 h-12 text-pink-500 fill-pink-500" />
                </motion.div>
                <h2 className="text-4xl font-black tracking-tight text-gray-900 uppercase italic">
                  It's a Match!
                </h2>
                <p className="text-gray-500">
                  You and {matchUser.displayName} liked each other.
                </p>
              </div>

              <div className="flex justify-center items-center gap-4">
                <div className="relative">
                  <div className="w-24 h-24 rounded-full border-4 border-white shadow-lg overflow-hidden rotate-[-10deg]">
                    <img
                      src={currentUser.photos[0] || `https://picsum.photos/seed/${currentUser.displayName}/200/200`}
                      alt="Me"
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                </div>
                <div className="relative">
                  <div className="w-24 h-24 rounded-full border-4 border-white shadow-lg overflow-hidden rotate-[10deg]">
                    <img
                      src={matchUser.photos[0] || `https://picsum.photos/seed/${matchUser.displayName}/200/200`}
                      alt={matchUser.displayName}
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <Button
                  className="w-full py-4 text-lg font-bold shadow-xl shadow-pink-200"
                  onClick={onChat}
                >
                  <MessageCircle className="w-5 h-5 mr-2" />
                  Send a Message
                </Button>
                <Button
                  variant="outline"
                  className="w-full py-4 text-lg font-bold"
                  onClick={onClose}
                >
                  Keep Swiping
                </Button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
