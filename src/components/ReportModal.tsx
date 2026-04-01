import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Shield, AlertTriangle, X, ChevronRight, CheckCircle2 } from 'lucide-react';
import { Button } from './ui/Button';

interface ReportModalProps {
  isOpen: boolean;
  onClose: () => void;
  onReport: (reason: string) => void;
  userName: string;
}

export const ReportModal: React.FC<ReportModalProps> = ({
  isOpen,
  onClose,
  onReport,
  userName,
}) => {
  const [reason, setReason] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const reasons = [
    'Inappropriate content',
    'Underage user',
    'Spam or fake profile',
    'Harassment or bullying',
    'Other',
  ];

  const handleSubmit = () => {
    if (reason) {
      onReport(reason);
      setIsSubmitted(true);
      setTimeout(() => {
        onClose();
        setIsSubmitted(false);
        setReason('');
      }, 2000);
    }
  };

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
              {!isSubmitted ? (
                <>
                  <div className="space-y-2 text-center">
                    <div className="inline-block p-4 bg-red-50 rounded-full">
                      <Shield className="w-12 h-12 text-red-500" />
                    </div>
                    <h2 className="text-3xl font-black tracking-tight text-gray-900 uppercase italic">
                      Report User
                    </h2>
                    <p className="text-gray-500 text-sm">
                      Help us keep TeenConnect safe. Why are you reporting {userName}?
                    </p>
                  </div>

                  <div className="space-y-2">
                    {reasons.map((r) => (
                      <button
                        key={r}
                        onClick={() => setReason(r)}
                        className={cn(
                          'w-full p-4 rounded-2xl border text-left transition-all flex items-center justify-between group',
                          reason === r
                            ? 'border-red-500 bg-red-50 text-red-600'
                            : 'border-gray-100 hover:border-red-200 text-gray-600'
                        )}
                      >
                        <span className="font-semibold">{r}</span>
                        <ChevronRight className={cn(
                          'w-5 h-5 transition-transform',
                          reason === r ? 'text-red-500 translate-x-1' : 'text-gray-300'
                        )} />
                      </button>
                    ))}
                  </div>

                  <Button
                    className="w-full py-4 text-lg font-bold shadow-xl shadow-red-200 bg-red-500 hover:bg-red-600"
                    onClick={handleSubmit}
                    disabled={!reason}
                  >
                    Submit Report
                  </Button>
                </>
              ) : (
                <div className="text-center space-y-4 py-8">
                  <div className="inline-block p-4 bg-green-50 rounded-full">
                    <CheckCircle2 className="w-12 h-12 text-green-500" />
                  </div>
                  <h2 className="text-2xl font-bold text-gray-900">Report Submitted</h2>
                  <p className="text-gray-500">
                    Thank you for helping us keep the community safe. We'll review your report shortly.
                  </p>
                </div>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

const cn = (...inputs: any[]) => inputs.filter(Boolean).join(' ');
