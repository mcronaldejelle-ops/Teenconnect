import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Video, Mic, MessageCircle, Heart, X, Users, Send, Zap } from 'lucide-react';
import { auth, db } from '../firebase';
import { collection, addDoc, onSnapshot, query, orderBy, limit, serverTimestamp } from 'firebase/firestore';
import { UserProfile, ChatMessage, LiveStream as LiveStreamType } from '../types';

export const LiveStream: React.FC<{ liveId?: string; isHost?: boolean }> = ({ liveId, isHost }) => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [viewerCount, setViewerCount] = useState(0);
  const [isLive, setIsLive] = useState(isHost);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (isHost) {
      navigator.mediaDevices.getUserMedia({ video: true, audio: true })
        .then(stream => {
          if (videoRef.current) videoRef.current.srcObject = stream;
        })
        .catch(err => console.error("Error accessing camera:", err));
    }
  }, [isHost]);

  useEffect(() => {
    if (liveId) {
      const q = query(
        collection(db, 'chats', liveId, 'messages'),
        orderBy('createdAt', 'desc'),
        limit(50)
      );
      const unsubscribe = onSnapshot(q, (snapshot) => {
        setMessages(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as ChatMessage)).reverse());
      });
      return () => unsubscribe();
    }
  }, [liveId]);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim() || !auth.currentUser || !liveId) return;

    await addDoc(collection(db, 'chats', liveId, 'messages'), {
      senderUid: auth.currentUser.uid,
      text: newMessage,
      liveId,
      createdAt: serverTimestamp()
    });
    setNewMessage('');
  };

  return (
    <div className="relative h-screen bg-black overflow-hidden flex flex-col">
      {/* Video Background */}
      <div className="absolute inset-0 bg-gray-900">
        {isHost ? (
          <video ref={videoRef} autoPlay muted playsInline className="w-full h-full object-cover" />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-white/20">
            <Video className="w-24 h-24" />
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/60" />
      </div>

      {/* Header Overlay */}
      <div className="absolute top-0 left-0 right-0 p-6 flex items-center justify-between z-20">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-full border-2 border-pink-500 overflow-hidden shadow-lg">
            <img src={auth.currentUser?.photoURL || 'https://picsum.photos/seed/host/100'} alt="Host" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
          </div>
          <div>
            <h3 className="text-white font-bold text-sm shadow-sm">{isHost ? 'Your Stream' : 'Live Host'}</h3>
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1 bg-pink-500 text-white text-[10px] font-black px-2 py-0.5 rounded-full uppercase tracking-widest">
                <div className="w-1.5 h-1.5 bg-white rounded-full animate-pulse" />
                Live
              </div>
              <div className="flex items-center gap-1 text-white/80 text-[10px] font-bold uppercase tracking-widest">
                <Users className="w-3 h-3" />
                {viewerCount}
              </div>
            </div>
          </div>
        </div>
        <button className="p-3 bg-white/10 backdrop-blur-md text-white rounded-full hover:bg-white/20 transition-all">
          <X className="w-6 h-6" />
        </button>
      </div>

      {/* Chat Overlay */}
      <div className="flex-1 flex flex-col justify-end p-6 z-20 pointer-events-none">
        <div className="max-h-[40%] overflow-y-auto space-y-3 mb-4 scrollbar-hide pointer-events-auto">
          <AnimatePresence>
            {messages.map((msg) => (
              <motion.div
                key={msg.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                className="flex items-start gap-2"
              >
                <div className="w-8 h-8 rounded-full bg-gray-500 overflow-hidden flex-shrink-0">
                  <img src={`https://picsum.photos/seed/${msg.senderUid}/50`} alt="User" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                </div>
                <div className="bg-black/40 backdrop-blur-md p-3 rounded-2xl rounded-tl-none max-w-[80%]">
                  <span className="text-pink-400 text-[10px] font-black uppercase tracking-widest block mb-1">User</span>
                  <p className="text-white text-sm leading-relaxed">{msg.text}</p>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        <form onSubmit={handleSendMessage} className="flex gap-2 pointer-events-auto">
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Say something..."
            className="flex-1 bg-white/10 backdrop-blur-md border border-white/20 text-white p-4 rounded-2xl focus:outline-none focus:border-pink-500 transition-all placeholder:text-white/40"
          />
          <button
            type="submit"
            className="p-4 bg-pink-500 text-white rounded-2xl shadow-lg hover:bg-pink-600 transition-all active:scale-95"
          >
            <Send className="w-6 h-6" />
          </button>
        </form>
      </div>

      {/* Floating Actions */}
      <div className="absolute bottom-24 right-6 flex flex-col gap-4 z-20">
        <button className="p-4 bg-white/10 backdrop-blur-md text-white rounded-full hover:bg-white/20 transition-all shadow-xl">
          <Heart className="w-6 h-6 fill-pink-500 text-pink-500" />
        </button>
        <button className="p-4 bg-white/10 backdrop-blur-md text-white rounded-full hover:bg-white/20 transition-all shadow-xl">
          <Zap className="w-6 h-6 text-yellow-400" />
        </button>
        {isHost && (
          <button className="p-4 bg-white/10 backdrop-blur-md text-white rounded-full hover:bg-white/20 transition-all shadow-xl">
            <Mic className="w-6 h-6" />
          </button>
        )}
      </div>
    </div>
  );
};
