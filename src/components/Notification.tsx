import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Heart, MessageCircle, Zap, Star, X } from 'lucide-react';
import { cn } from '@/src/lib/utils';

interface NotificationProps {
  isOpen: boolean;
  onClose: () => void;
  type: 'match' | 'like' | 'message' | 'boost';
  title: string;
  message: string;
  photo?: string;
}

export const Notification: React.FC<NotificationProps> = ({
  isOpen,
  onClose,
  type,
  title,
  message,
  photo,
}) => {
  const icons = {
    match: { icon: Heart, color: 'bg-pink-500', text: 'text-pink-500' },
    like: { icon: Star, color: 'bg-yellow-500', text: 'text-yellow-500' },
    message: { icon: MessageCircle, color: 'bg-indigo-500', text: 'text-indigo-500' },
    boost: { icon: Zap, color: 'bg-purple-500', text: 'text-purple-500' },
  };

  const { icon: Icon, color, text } = icons[type];

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -100, opacity: 0 }}
          className="fixed top-6 left-6 right-6 z-[110] flex items-center justify-center pointer-events-none"
        >
          <div className="w-full max-w-sm bg-white/80 backdrop-blur-xl p-4 rounded-[2rem] shadow-2xl shadow-gray-200/50 border border-gray-100 flex items-center gap-4 pointer-events-auto">
            <div className="relative flex-shrink-0">
              <div className={cn('w-12 h-12 rounded-2xl flex items-center justify-center shadow-lg', color)}>
                <Icon className="w-6 h-6 text-white fill-white" />
              </div>
              {photo && (
                <div className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full border-2 border-white overflow-hidden shadow-sm">
                  <img src={photo} alt="User" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                </div>
              )}
            </div>
            <div className="flex-1 min-w-0">
              <h4 className={cn('text-xs font-bold uppercase tracking-widest mb-0.5', text)}>
                {title}
              </h4>
              <p className="text-sm font-semibold text-gray-900 truncate">
                {message}
              </p>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors text-gray-300"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
