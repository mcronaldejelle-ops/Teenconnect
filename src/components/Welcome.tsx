import React from 'react';
import { motion } from 'motion/react';
import { Heart, Zap, Shield, Star, ChevronRight } from 'lucide-react';
import { Button } from './ui/Button';

interface WelcomeProps {
  onStart: () => void;
}

export const Welcome: React.FC<WelcomeProps> = ({ onStart }) => {
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
        className="text-center space-y-4 mb-12 relative z-10"
      >
        <div className="relative inline-block">
          <div className="w-24 h-24 bg-gradient-to-br from-pink-500 to-indigo-600 rounded-[2.5rem] flex items-center justify-center shadow-2xl shadow-pink-200 rotate-12 animate-bounce-slow">
            <Heart className="w-12 h-12 text-white fill-white" />
          </div>
          <div className="absolute -top-4 -right-4 w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center border border-gray-50">
            <Zap className="w-6 h-6 text-yellow-500 fill-yellow-500" />
          </div>
        </div>
        <div className="space-y-1">
          <h1 className="text-5xl font-black tracking-tighter text-gray-900 uppercase italic">
            TeenConnect
          </h1>
          <p className="text-gray-400 font-bold uppercase tracking-widest text-xs flex items-center justify-center gap-2">
            <Shield className="w-3 h-3" /> Safe • Verified • Fun
          </p>
        </div>
      </motion.div>

      {/* Content Section */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.4, duration: 0.6 }}
        className="w-full max-w-sm space-y-8 relative z-10 text-center"
      >
        <div className="space-y-4">
          <h2 className="text-3xl font-bold text-gray-900">Find your tribe</h2>
          <p className="text-gray-500 leading-relaxed">
            The safest place for teens to connect, chat, and find meaningful relationships.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="p-4 bg-gray-50 rounded-3xl space-y-2">
            <Shield className="w-6 h-6 text-pink-500 mx-auto" />
            <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Verified</p>
          </div>
          <div className="p-4 bg-gray-50 rounded-3xl space-y-2">
            <Star className="w-6 h-6 text-indigo-500 mx-auto" />
            <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Fun</p>
          </div>
        </div>

        <Button
          className="w-full py-4 text-lg font-bold shadow-xl shadow-pink-200"
          onClick={onStart}
        >
          Get Started
          <ChevronRight className="w-5 h-5 ml-2" />
        </Button>

        <p className="text-[10px] text-gray-300 px-8">
          By continuing, you agree to our <span className="underline">Terms of Service</span> and <span className="underline">Privacy Policy</span>. You must be at least 13 years old to join.
        </p>
      </motion.div>
    </div>
  );
};
