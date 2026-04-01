import React, { useState } from 'react';
import { motion } from 'motion/react';
import { auth, db } from '../firebase';
import { signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { doc, setDoc, getDoc, serverTimestamp } from 'firebase/firestore';
import { Heart, Zap, Shield, Sparkles } from 'lucide-react';

export const Auth: React.FC = () => {
  const [loading, setLoading] = useState(false);

  const handleGoogleSignIn = async () => {
    setLoading(true);
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      // Check if user profile exists, if not create it
      const userDoc = await getDoc(doc(db, 'users', user.uid));
      if (!userDoc.exists()) {
        await setDoc(doc(db, 'users', user.uid), {
          uid: user.uid,
          displayName: user.displayName || 'New User',
          email: user.email,
          age: 18, // Default age, should be updated in onboarding
          avatarUrl: user.photoURL || '',
          bio: '',
          media: [],
          followersCount: 0,
          followingCount: 0,
          friendsCount: 0,
          isLive: false,
          createdAt: serverTimestamp()
        });
      }
    } catch (error) {
      console.error('Error signing in:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center p-6 text-center overflow-hidden relative">
      {/* Background Elements */}
      <div className="absolute top-[-10%] left-[-10%] w-64 h-64 bg-pink-100 rounded-full blur-3xl opacity-50 animate-pulse" />
      <div className="absolute bottom-[-10%] right-[-10%] w-64 h-64 bg-rose-100 rounded-full blur-3xl opacity-50 animate-pulse" />

      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="z-10 max-w-sm w-full"
      >
        <div className="w-24 h-24 bg-gradient-to-br from-pink-500 to-rose-500 rounded-[2rem] flex items-center justify-center mx-auto mb-8 shadow-2xl shadow-pink-200 rotate-12">
          <Heart className="w-12 h-12 text-white fill-white" />
        </div>
        
        <h1 className="text-5xl font-black text-gray-900 mb-4 italic tracking-tighter uppercase">TeenConnect</h1>
        <p className="text-gray-500 mb-12 font-medium leading-relaxed">
          The ultimate social & discovery app for teens. Find friends, matches, and join live streams.
        </p>

        <div className="space-y-6 mb-12">
          <div className="flex items-center gap-4 text-left p-4 bg-gray-50 rounded-2xl border border-gray-100">
            <div className="p-3 bg-pink-100 text-pink-500 rounded-xl">
              <Shield className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-bold text-gray-900 text-sm">Safe & Secure</h3>
              <p className="text-xs text-gray-500">Age-appropriate matching and safety tools.</p>
            </div>
          </div>
          <div className="flex items-center gap-4 text-left p-4 bg-gray-50 rounded-2xl border border-gray-100">
            <div className="p-3 bg-rose-100 text-rose-500 rounded-xl">
              <Sparkles className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-bold text-gray-900 text-sm">Real Interactions</h3>
              <p className="text-xs text-gray-500">Live streams, voice chat, and video calls.</p>
            </div>
          </div>
        </div>

        <button
          onClick={handleGoogleSignIn}
          disabled={loading}
          className="w-full py-5 bg-gray-900 text-white font-bold rounded-2xl shadow-xl hover:bg-black transition-all active:scale-95 flex items-center justify-center gap-3 disabled:bg-gray-400"
        >
          {loading ? (
            <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin" />
          ) : (
            <>
              <img src="https://www.google.com/favicon.ico" alt="Google" className="w-5 h-5 grayscale" />
              Continue with Google
            </>
          )}
        </button>

        <p className="mt-8 text-[10px] text-gray-400 uppercase font-bold tracking-widest leading-relaxed">
          By continuing, you agree to our <br />
          <span className="text-gray-900 underline cursor-pointer">Terms of Service</span> & <span className="text-gray-900 underline cursor-pointer">Privacy Policy</span>
        </p>
      </motion.div>

      <div className="absolute bottom-8 flex gap-4 text-pink-500/20">
        <Zap className="w-8 h-8" />
        <Heart className="w-8 h-8 fill-current" />
        <Zap className="w-8 h-8" />
      </div>
    </div>
  );
};
