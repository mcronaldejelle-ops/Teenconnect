import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Shield, AlertTriangle, X, CheckCircle2, Info, ChevronRight, MapPin, MessageCircle, User } from 'lucide-react';
import { Button } from './ui/Button';

interface SafetyTipsProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SafetyTips: React.FC<SafetyTipsProps> = ({ isOpen, onClose }) => {
  const tips = [
    {
      icon: Shield,
      title: 'Keep it in the app',
      description: 'Don\'t share your phone number, social media, or other private info until you really know someone.',
      color: 'text-pink-500 bg-pink-50',
    },
    {
      icon: MapPin,
      title: 'Never share your location',
      description: 'Don\'t tell people exactly where you live, go to school, or work. Keep your location private.',
      color: 'text-indigo-500 bg-indigo-50',
    },
    {
      icon: MessageCircle,
      title: 'Report bad behavior',
      description: 'If someone is being mean, inappropriate, or makes you feel uncomfortable, report them immediately.',
      color: 'text-red-500 bg-red-50',
    },
    {
      icon: User,
      title: 'Trust your gut',
      description: 'If something feels weird or too good to be true, it probably is. You can always unmatch or block someone.',
      color: 'text-yellow-500 bg-yellow-50',
    },
  ];

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
              className="absolute top-6 right-6 p-2 bg-gray-50 text-gray-400 rounded-full hover:bg-gray-100 transition-colors z-10"
            >
              <X className="w-6 h-6" />
            </button>

            <div className="p-8 space-y-8">
              <div className="space-y-2 text-center">
                <div className="inline-block p-4 bg-indigo-50 rounded-full">
                  <Shield className="w-12 h-12 text-indigo-500" />
                </div>
                <h2 className="text-3xl font-black tracking-tight text-gray-900 uppercase italic">
                  Safety Tips
                </h2>
                <p className="text-gray-500 text-sm">
                  Your safety is our top priority. Here's how to stay safe on TeenConnect.
                </p>
              </div>

              <div className="space-y-4">
                {tips.map((tip) => (
                  <div key={tip.title} className="flex gap-4 p-4 bg-gray-50 rounded-2xl border border-gray-100">
                    <div className={cn('p-3 rounded-xl flex-shrink-0 h-fit', tip.color)}>
                      <tip.icon className="w-6 h-6" />
                    </div>
                    <div className="space-y-1">
                      <h4 className="font-bold text-gray-900 text-sm">{tip.title}</h4>
                      <p className="text-xs text-gray-500 leading-relaxed">{tip.description}</p>
                    </div>
                  </div>
                ))}
              </div>

              <Button
                className="w-full py-4 text-lg font-bold shadow-xl shadow-indigo-200 bg-indigo-500 hover:bg-indigo-600"
                onClick={onClose}
              >
                Got it, thanks!
              </Button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

const cn = (...inputs: any[]) => inputs.filter(Boolean).join(' ');
