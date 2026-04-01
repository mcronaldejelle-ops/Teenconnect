import React from 'react';
import { motion } from 'motion/react';

interface ProfileCardStackOverlayContainerContentContentContentContentContentContentContentContentContentContentContentContentContentContentContentContentContentContentContentContentContentContentContentContentContentContentContentContentContentProps {
  likeOpacity: any;
  nopeOpacity: any;
}

export const ProfileCardStackOverlayContainerContentContentContentContentContentContentContentContentContentContentContentContentContentContentContentContentContentContentContentContentContentContentContentContentContentContentContentContentContent: React.FC<ProfileCardStackOverlayContainerContentContentContentContentContentContentContentContentContentContentContentContentContentContentContentContentContentContentContentContentContentContentContentContentContentContentContentContentContentProps> = ({
  likeOpacity,
  nopeOpacity,
}) => {
  return (
    <>
      <motion.div
        style={{ opacity: likeOpacity }}
        className="absolute top-10 left-10 border-4 border-green-500 rounded-lg px-4 py-2 rotate-[-20deg] pointer-events-none z-20"
      >
        <span className="text-4xl font-bold text-green-500 uppercase tracking-widest">LIKE</span>
      </motion.div>

      <motion.div
        style={{ opacity: nopeOpacity }}
        className="absolute top-10 right-10 border-4 border-red-500 rounded-lg px-4 py-2 rotate-[20deg] pointer-events-none z-20"
      >
        <span className="text-4xl font-bold text-red-500 uppercase tracking-widest">NOPE</span>
      </motion.div>

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none z-10" />
    </>
  );
};
