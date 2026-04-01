import React, { useState } from 'react';
import { Button } from './ui/Button';
import { Input } from './ui/Input';
import { Shield, AlertTriangle, ChevronRight, Heart } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface AgeVerificationProps {
  onVerified: (age: number) => void;
}

export const AgeVerification: React.FC<AgeVerificationProps> = ({ onVerified }) => {
  const [birthYear, setBirthYear] = useState('');
  const [error, setError] = useState('');

  const handleVerify = () => {
    const year = parseInt(birthYear);
    const currentYear = new Date().getFullYear();
    const age = currentYear - year;

    if (isNaN(year) || year < 1900 || year > currentYear) {
      setError('Please enter a valid birth year.');
    } else if (age < 13) {
      setError('Sorry, you must be at least 13 years old to join TeenConnect.');
    } else if (age > 19) {
      setError('Sorry, TeenConnect is for users aged 13-19 only.');
    } else {
      onVerified(age);
    }
  };

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
            <Shield className="w-6 h-6 text-pink-500 fill-pink-500" />
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

      {/* Form Section */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.4, duration: 0.6 }}
        className="w-full max-w-sm space-y-8 relative z-10"
      >
        <div className="bg-white/80 backdrop-blur-xl p-8 rounded-[2.5rem] shadow-2xl shadow-gray-200/50 border border-gray-100 space-y-6">
          <div className="space-y-2">
            <h2 className="text-2xl font-bold text-gray-900">Safety First</h2>
            <p className="text-sm text-gray-500">
              TeenConnect is a safe space for teens aged 13-19. Please verify your age to continue.
            </p>
          </div>

          <div className="space-y-4">
            <Input
              label="What year were you born?"
              type="number"
              placeholder="e.g. 2010"
              value={birthYear}
              onChange={(e) => {
                setBirthYear(e.target.value);
                setError('');
              }}
              onKeyDown={(e) => e.key === 'Enter' && handleVerify()}
            />

            <AnimatePresence>
              {error && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="bg-red-50 p-4 rounded-2xl border border-red-100 flex items-start gap-3"
                >
                  <AlertTriangle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
                  <p className="text-xs text-red-600 font-medium leading-relaxed">{error}</p>
                </motion.div>
              )}
            </AnimatePresence>

            <Button
              className="w-full py-4 text-lg font-bold shadow-xl shadow-pink-200"
              onClick={handleVerify}
            >
              Verify Age
              <ChevronRight className="w-5 h-5 ml-2" />
            </Button>
          </div>
        </div>

        <p className="text-center text-[10px] text-gray-400 px-8">
          By continuing, you confirm that the information provided is accurate. Misrepresenting your age is a violation of our terms.
        </p>
      </motion.div>
    </div>
  );
};
