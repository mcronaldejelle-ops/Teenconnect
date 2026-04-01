import React, { useState, useEffect, useRef } from 'react';
import { Message, UserProfile } from '../types';
import { Send, ArrowLeft, MoreVertical, Phone, Video } from 'lucide-react';
import { cn } from '../lib/utils';

interface ChatProps {
  match: {
    id: string;
    user: UserProfile;
  };
  messages: Message[];
  onSendMessage: (text: string) => void;
  onBack: () => void;
}

export const Chat: React.FC<ChatProps> = ({ match, messages, onSendMessage, onBack }) => {
  const [newMessage, setNewMessage] = useState('');
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = () => {
    if (newMessage.trim()) {
      onSendMessage(newMessage);
      setNewMessage('');
    }
  };

  return (
    <div className="flex flex-col h-full bg-gray-50 z-50 fixed inset-0 animate-in slide-in-from-right-4 duration-300">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-xl border-b border-gray-100 px-4 py-3 flex items-center justify-between sticky top-0 z-10">
        <div className="flex items-center gap-3">
          <button onClick={onBack} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
            <ArrowLeft className="w-6 h-6 text-gray-600" />
          </button>
          <div className="flex items-center gap-3">
            <div className="relative">
              <img
                src={(match.user.photos && match.user.photos[0]) || (match.user.media && match.user.media[0]?.url) || `https://picsum.photos/seed/${match.user.displayName}/100/100`}
                alt={match.user.displayName}
                className="w-10 h-10 rounded-full object-cover border-2 border-pink-500"
                referrerPolicy="no-referrer"
              />
              <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full" />
            </div>
            <div>
              <h3 className="font-bold text-gray-900 leading-tight">{match.user.displayName}</h3>
              <p className="text-[10px] text-green-500 font-medium uppercase tracking-wider">Online</p>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-1">
          <button className="p-2 hover:bg-gray-100 rounded-full transition-colors text-gray-400">
            <Phone className="w-5 h-5" />
          </button>
          <button className="p-2 hover:bg-gray-100 rounded-full transition-colors text-gray-400">
            <Video className="w-5 h-5" />
          </button>
          <button className="p-2 hover:bg-gray-100 rounded-full transition-colors text-gray-400">
            <MoreVertical className="w-5 h-5" />
          </button>
        </div>
      </header>

      {/* Messages */}
      <div
        ref={scrollRef}
        className="flex-1 overflow-y-auto p-4 space-y-4 scroll-smooth"
      >
        <div className="text-center py-8">
          <p className="text-xs text-gray-400 uppercase tracking-widest font-medium">
            Matched on {new Date().toLocaleDateString()}
          </p>
        </div>

        {messages.map((msg, idx) => {
          const isMe = msg.senderUid === 'me'; // Replace with actual current user ID
          const showAvatar = !isMe && (idx === 0 || messages[idx - 1].senderUid !== msg.senderUid);

          return (
            <div
              key={msg.id}
              className={cn(
                'flex items-end gap-2 max-w-[85%]',
                isMe ? 'ml-auto flex-row-reverse' : 'mr-auto'
              )}
            >
              {!isMe && (
                <div className="w-8 h-8 flex-shrink-0">
                  {showAvatar && (
                    <img
                      src={(match.user.photos && match.user.photos[0]) || (match.user.media && match.user.media[0]?.url) || `https://picsum.photos/seed/${match.user.displayName}/100/100`}
                      alt={match.user.displayName}
                      className="w-8 h-8 rounded-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                  )}
                </div>
              )}
              <div
                className={cn(
                  'px-4 py-2.5 rounded-2xl text-sm shadow-sm',
                  isMe
                    ? 'bg-pink-500 text-white rounded-br-none'
                    : 'bg-white text-gray-800 rounded-bl-none border border-gray-100'
                )}
              >
                {msg.text}
                <p
                  className={cn(
                    'text-[10px] mt-1 opacity-60',
                    isMe ? 'text-right' : 'text-left'
                  )}
                >
                  {msg.createdAt?.toDate().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Input */}
      <div className="bg-white/80 backdrop-blur-xl border-t border-gray-100 p-4 pb-8 sticky bottom-0">
        <div className="flex gap-2 items-center bg-gray-50 rounded-full px-4 py-1 border border-gray-200">
          <input
            className="flex-1 bg-transparent py-3 focus:outline-none text-sm"
            placeholder="Type a message..."
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
          />
          <button
            onClick={handleSend}
            disabled={!newMessage.trim()}
            className="p-2 bg-pink-500 text-white rounded-full disabled:opacity-50 disabled:scale-90 transition-all hover:bg-pink-600 active:scale-95"
          >
            <Send className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};
