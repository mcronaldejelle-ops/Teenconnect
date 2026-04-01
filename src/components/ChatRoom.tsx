import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Send, Camera, Mic, Phone, Video, MoreVertical, ChevronLeft, Image as ImageIcon, Smile } from 'lucide-react';
import { auth, db } from '../firebase';
import { collection, addDoc, onSnapshot, query, orderBy, limit, serverTimestamp } from 'firebase/firestore';
import { UserProfile, ChatMessage } from '../types';

export const ChatRoom: React.FC<{ receiver: UserProfile; onBack: () => void }> = ({ receiver, onBack }) => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!auth.currentUser) return;

    const chatId = [auth.currentUser.uid, receiver.uid].sort().join('_');
    const q = query(
      collection(db, 'chats', chatId, 'messages'),
      orderBy('createdAt', 'desc'),
      limit(50)
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      setMessages(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as ChatMessage)).reverse());
    });

    return () => unsubscribe();
  }, [receiver.uid]);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim() || !auth.currentUser) return;

    const chatId = [auth.currentUser.uid, receiver.uid].sort().join('_');
    await addDoc(collection(db, 'chats', chatId, 'messages'), {
      senderUid: auth.currentUser.uid,
      receiverUid: receiver.uid,
      text: newMessage,
      createdAt: serverTimestamp()
    });
    setNewMessage('');
  };

  return (
    <div className="flex flex-col h-screen bg-white">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-gray-100 bg-white/80 backdrop-blur-md sticky top-0 z-10">
        <div className="flex items-center gap-3">
          <button onClick={onBack} className="p-2 hover:bg-gray-100 rounded-full transition-colors text-gray-500">
            <ChevronLeft className="w-6 h-6" />
          </button>
          <div className="relative">
            <img
              src={receiver.avatarUrl || `https://picsum.photos/seed/${receiver.uid}/100`}
              alt={receiver.displayName}
              className="w-10 h-10 rounded-full object-cover border-2 border-white shadow-sm"
              referrerPolicy="no-referrer"
            />
            {receiver.isLive && (
              <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-500 border-2 border-white rounded-full" />
            )}
          </div>
          <div>
            <h3 className="font-bold text-gray-900 leading-none">{receiver.displayName}</h3>
            <span className="text-[10px] text-gray-400 uppercase font-bold tracking-widest">Online</span>
          </div>
        </div>
        <div className="flex items-center gap-1">
          <button className="p-2 text-gray-400 hover:text-pink-500 hover:bg-pink-50 rounded-full transition-all">
            <Phone className="w-5 h-5" />
          </button>
          <button className="p-2 text-gray-400 hover:text-pink-500 hover:bg-pink-50 rounded-full transition-all">
            <Video className="w-5 h-5" />
          </button>
          <button className="p-2 text-gray-400 hover:bg-gray-100 rounded-full transition-all">
            <MoreVertical className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-hide">
        <div className="flex flex-col items-center py-8 text-center">
          <img
            src={receiver.avatarUrl || `https://picsum.photos/seed/${receiver.uid}/200`}
            alt={receiver.displayName}
            className="w-24 h-24 rounded-full object-cover border-4 border-white shadow-xl mb-4"
            referrerPolicy="no-referrer"
          />
          <h2 className="text-xl font-bold text-gray-900">You matched with {receiver.displayName}</h2>
          <p className="text-sm text-gray-500">Say hello and start a conversation!</p>
          <div className="mt-4 px-4 py-1 bg-gray-100 text-gray-400 text-[10px] font-bold uppercase rounded-full">Today</div>
        </div>

        <AnimatePresence>
          {messages.map((msg) => {
            const isMe = msg.senderUid === auth.currentUser?.uid;
            return (
              <motion.div
                key={msg.id}
                initial={{ opacity: 0, scale: 0.95, y: 10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                className={`flex ${isMe ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[75%] p-4 rounded-3xl shadow-sm ${
                    isMe
                      ? 'bg-gradient-to-br from-pink-500 to-rose-500 text-white rounded-tr-none'
                      : 'bg-gray-100 text-gray-800 rounded-tl-none'
                  }`}
                >
                  <p className="text-sm leading-relaxed">{msg.text}</p>
                  <span className={`text-[9px] mt-1 block font-bold uppercase tracking-widest ${isMe ? 'text-white/60' : 'text-gray-400'}`}>
                    {msg.createdAt?.toDate().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </span>
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>
        <div ref={scrollRef} />
      </div>

      {/* Input */}
      <div className="p-4 bg-white border-t border-gray-100">
        <form onSubmit={handleSendMessage} className="flex items-center gap-2 bg-gray-50 p-2 rounded-3xl border border-gray-100 focus-within:border-pink-500/50 transition-all">
          <button type="button" className="p-2 text-gray-400 hover:text-pink-500 transition-colors">
            <Camera className="w-6 h-6" />
          </button>
          <button type="button" className="p-2 text-gray-400 hover:text-pink-500 transition-colors">
            <ImageIcon className="w-6 h-6" />
          </button>
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Type a message..."
            className="flex-1 bg-transparent border-none focus:ring-0 text-sm py-2 placeholder:text-gray-400"
          />
          <button type="button" className="p-2 text-gray-400 hover:text-pink-500 transition-colors">
            <Smile className="w-6 h-6" />
          </button>
          <button
            type="submit"
            disabled={!newMessage.trim()}
            className="p-3 bg-pink-500 text-white rounded-2xl shadow-lg hover:bg-pink-600 disabled:bg-gray-300 disabled:shadow-none transition-all active:scale-95"
          >
            <Send className="w-5 h-5" />
          </button>
        </form>
        <div className="flex justify-center gap-8 mt-2">
          <button className="text-[10px] text-gray-400 font-bold uppercase tracking-widest hover:text-pink-500">Voice Message</button>
          <button className="text-[10px] text-gray-400 font-bold uppercase tracking-widest hover:text-pink-500">Video Note</button>
        </div>
      </div>
    </div>
  );
};
