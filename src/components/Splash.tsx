import React from 'react';
import { motion } from 'motion/react';
import { Heart, Zap } from 'lucide-react';

export const Splash: React.FC = () => {
  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center p-8 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-pink-500/5 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-indigo-500/5 rounded-full blur-3xl animate-pulse delay-1000" />
      </div>

      {/* Logo Section */}
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="text-center space-y-4 relative z-10"
      >
        <div className="relative inline-block">
          <motion.div
            animate={{ rotate: [0, 10, -10, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className="w-32 h-32 bg-gradient-to-br from-pink-500 to-indigo-600 rounded-[3rem] flex items-center justify-center shadow-2xl shadow-pink-200"
          >
            <Heart className="w-16 h-16 text-white fill-white" />
          </motion.div>
          <motion.div
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="absolute -top-6 -right-6 w-16 h-16 bg-white rounded-full shadow-lg flex items-center justify-center border border-gray-50"
          >
            <Zap className="w-8 h-8 text-yellow-500 fill-yellow-500" />
          </motion.div>
        </div>
        <div className="space-y-1">
          <h1 className="text-6xl font-black tracking-tighter text-gray-900 uppercase italic">
            TeenConnect
          </h1>
          <div className="flex items-center justify-center gap-2">
            <div className="w-2 h-2 bg-pink-500 rounded-full animate-bounce" />
            <div className="w-2 h-2 bg-pink-500 rounded-full animate-bounce delay-100" />
            <div className="w-2 h-2 bg-pink-500 rounded-full animate-bounce delay-200" />
          </div>
        </div>
      </motion.div>

      {/* Footer */}
      <div className="absolute bottom-12 text-center">
        <p className="text-xs text-gray-400 font-bold uppercase tracking-widest">
          Safe • Verified • Fun
        </p>
      </div>
    </div>
  );
};
