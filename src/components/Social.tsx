import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Users, UserPlus, MessageCircle, Heart, Search, Filter } from 'lucide-react';
import { auth, db } from '../firebase';
import { collection, query, where, getDocs, onSnapshot } from 'firebase/firestore';
import { UserProfile, Follow, Friend } from '../types';

export const Social: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'followers' | 'following' | 'friends'>('friends');
  const [users, setUsers] = useState<UserProfile[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!auth.currentUser) return;

    const fetchSocialData = async () => {
      setLoading(true);
      let q;
      if (activeTab === 'followers') {
        q = query(collection(db, 'follows'), where('followingUid', '==', auth.currentUser.uid));
      } else if (activeTab === 'following') {
        q = query(collection(db, 'follows'), where('followerUid', '==', auth.currentUser.uid));
      } else {
        q = query(collection(db, 'friends'), where('uids', 'array-contains', auth.currentUser.uid));
      }

      const querySnapshot = await getDocs(q);
      const uids = querySnapshot.docs.map(doc => {
        const data = doc.data() as any;
        if (activeTab === 'followers') return data.followerUid;
        if (activeTab === 'following') return data.followingUid;
        return data.uids.find((uid: string) => uid !== auth.currentUser?.uid);
      });

      if (uids.length > 0) {
        const usersQ = query(collection(db, 'users'), where('uid', 'in', uids));
        const usersSnapshot = await getDocs(usersQ);
        setUsers(usersSnapshot.docs.map(doc => doc.data() as UserProfile));
      } else {
        setUsers([]);
      }
      setLoading(false);
    };

    fetchSocialData();
  }, [activeTab]);

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white min-h-screen">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Social</h1>
        <div className="flex gap-2">
          <button className="p-2 bg-gray-100 rounded-full hover:bg-gray-200 transition-colors">
            <Search className="w-6 h-6" />
          </button>
          <button className="p-2 bg-gray-100 rounded-full hover:bg-gray-200 transition-colors">
            <Filter className="w-6 h-6" />
          </button>
        </div>
      </div>

      <div className="flex bg-gray-100 p-1 rounded-2xl mb-8">
        {(['friends', 'followers', 'following'] as const).map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`flex-1 py-3 rounded-xl font-bold text-sm uppercase tracking-wider transition-all ${
              activeTab === tab ? 'bg-white text-pink-500 shadow-sm' : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-20">
          <div className="w-12 h-12 border-4 border-pink-500 border-t-transparent rounded-full animate-spin" />
        </div>
      ) : (
        <div className="space-y-4">
          {users.map((user) => (
            <motion.div
              key={user.uid}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-center justify-between p-4 bg-gray-50 rounded-2xl hover:bg-gray-100 transition-colors"
            >
              <div className="flex items-center gap-4">
                <div className="relative">
                  <img
                    src={user.avatarUrl || `https://picsum.photos/seed/${user.uid}/100`}
                    alt={user.displayName}
                    className="w-14 h-14 rounded-full object-cover border-2 border-white shadow-sm"
                    referrerPolicy="no-referrer"
                  />
                  {user.isLive && (
                    <div className="absolute -bottom-1 -right-1 px-2 py-0.5 bg-pink-500 text-white text-[10px] font-black rounded-full border-2 border-white uppercase">
                      Live
                    </div>
                  )}
                </div>
                <div>
                  <h3 className="font-bold text-gray-900">{user.displayName}</h3>
                  <p className="text-xs text-gray-500 line-clamp-1">{user.bio || "No bio available."}</p>
                </div>
              </div>
              <div className="flex gap-2">
                <button className="p-3 bg-white text-pink-500 rounded-xl shadow-sm hover:scale-110 active:scale-95 transition-all">
                  <MessageCircle className="w-5 h-5" />
                </button>
                {activeTab === 'followers' && (
                  <button className="p-3 bg-pink-500 text-white rounded-xl shadow-sm hover:scale-110 active:scale-95 transition-all">
                    <UserPlus className="w-5 h-5" />
                  </button>
                )}
              </div>
            </motion.div>
          ))}
          {users.length === 0 && (
            <div className="py-20 text-center">
              <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Users className="w-10 h-10 text-gray-400" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">No {activeTab} yet</h3>
              <p className="text-gray-500">Start exploring and connecting with others!</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
