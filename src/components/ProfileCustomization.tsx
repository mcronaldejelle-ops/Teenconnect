import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Camera, User, Edit2, Plus, Trash2, Save, X } from 'lucide-react';
import { auth, db } from '../firebase';
import { getUserProfile, updateUserProfile } from '../services/firebaseService';
import { UserProfile, UserMedia } from '../types';
import { Timestamp } from 'firebase/firestore';

export const ProfileCustomization: React.FC = () => {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [displayName, setDisplayName] = useState('');
  const [bio, setBio] = useState('');
  const [avatarUrl, setAvatarUrl] = useState('');
  const [media, setMedia] = useState<UserMedia[]>([]);

  useEffect(() => {
    const fetchProfile = async () => {
      if (auth.currentUser) {
        const data = await getUserProfile(auth.currentUser.uid);
        if (data) {
          setProfile(data);
          setDisplayName(data.displayName);
          setBio(data.bio || '');
          setAvatarUrl(data.avatarUrl || '');
          setMedia(data.media || []);
        }
      }
    };
    fetchProfile();
  }, []);

  const handleSave = async () => {
    if (auth.currentUser) {
      await updateUserProfile(auth.currentUser.uid, {
        displayName,
        bio,
        avatarUrl,
        media
      });
      setIsEditing(false);
      // Refresh profile
      const data = await getUserProfile(auth.currentUser.uid);
      setProfile(data);
    }
  };

  const addMedia = () => {
    const url = prompt('Enter image or video URL:');
    if (url) {
      const newMedia: UserMedia = {
        url,
        type: url.includes('video') ? 'video' : 'image',
        createdAt: Timestamp.now()
      };
      setMedia([...media, newMedia]);
    }
  };

  const removeMedia = (index: number) => {
    setMedia(media.filter((_, i) => i !== index));
  };

  if (!profile) return <div className="flex items-center justify-center h-screen">Loading profile...</div>;

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white min-h-screen">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Profile</h1>
        <button
          onClick={() => setIsEditing(!isEditing)}
          className="p-2 bg-gray-100 rounded-full hover:bg-gray-200 transition-colors"
        >
          {isEditing ? <X className="w-6 h-6" /> : <Edit2 className="w-6 h-6" />}
        </button>
      </div>

      <div className="flex flex-col items-center mb-8">
        <div className="relative group">
          <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-pink-500 shadow-xl">
            {avatarUrl ? (
              <img src={avatarUrl} alt="Avatar" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
            ) : (
              <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                <User className="w-16 h-16 text-gray-400" />
              </div>
            )}
          </div>
          {isEditing && (
            <button
              onClick={() => setAvatarUrl(prompt('Enter avatar URL:') || avatarUrl)}
              className="absolute bottom-0 right-0 p-2 bg-pink-500 text-white rounded-full shadow-lg hover:bg-pink-600 transition-colors"
            >
              <Camera className="w-5 h-5" />
            </button>
          )}
        </div>
        
        {isEditing ? (
          <input
            type="text"
            value={displayName}
            onChange={(e) => setDisplayName(e.target.value)}
            className="mt-4 text-2xl font-bold text-center border-b-2 border-pink-500 focus:outline-none"
            placeholder="Display Name"
          />
        ) : (
          <h2 className="mt-4 text-2xl font-bold text-gray-900">{profile.displayName}, {profile.age}</h2>
        )}
      </div>

      <div className="mb-8">
        <h3 className="text-lg font-semibold text-gray-700 mb-2 uppercase tracking-wider">Bio</h3>
        {isEditing ? (
          <textarea
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            className="w-full p-4 bg-gray-50 rounded-2xl border-2 border-transparent focus:border-pink-500 focus:outline-none transition-all h-32"
            placeholder="Tell us about yourself..."
          />
        ) : (
          <p className="text-gray-600 leading-relaxed bg-gray-50 p-4 rounded-2xl">
            {profile.bio || "No bio yet. Add one to stand out!"}
          </p>
        )}
      </div>

      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-700 uppercase tracking-wider">Media</h3>
          {isEditing && (
            <button
              onClick={addMedia}
              className="flex items-center gap-2 text-pink-500 font-semibold hover:text-pink-600 transition-colors"
            >
              <Plus className="w-5 h-5" /> Add Media
            </button>
          )}
        </div>
        <div className="grid grid-cols-3 gap-4">
          {media.map((item, index) => (
            <div key={index} className="relative aspect-square rounded-2xl overflow-hidden shadow-md group">
              {item.type === 'image' ? (
                <img src={item.url} alt="Media" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
              ) : (
                <video src={item.url} className="w-full h-full object-cover" />
              )}
              {isEditing && (
                <button
                  onClick={() => removeMedia(index)}
                  className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              )}
            </div>
          ))}
          {media.length === 0 && !isEditing && (
            <div className="col-span-3 py-8 text-center text-gray-400 bg-gray-50 rounded-2xl border-2 border-dashed border-gray-200">
              No photos or videos yet.
            </div>
          )}
        </div>
      </div>

      {isEditing && (
        <motion.button
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          onClick={handleSave}
          className="w-full py-4 bg-gradient-to-r from-pink-500 to-rose-500 text-white font-bold rounded-2xl shadow-lg shadow-pink-200 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2"
        >
          <Save className="w-6 h-6" /> Save Changes
        </motion.button>
      )}

      <div className="mt-12 grid grid-cols-3 gap-4 text-center">
        <div className="bg-gray-50 p-4 rounded-2xl">
          <div className="text-2xl font-bold text-gray-900">{profile.followersCount || 0}</div>
          <div className="text-xs text-gray-500 uppercase font-bold">Followers</div>
        </div>
        <div className="bg-gray-50 p-4 rounded-2xl">
          <div className="text-2xl font-bold text-gray-900">{profile.followingCount || 0}</div>
          <div className="text-xs text-gray-500 uppercase font-bold">Following</div>
        </div>
        <div className="bg-gray-50 p-4 rounded-2xl">
          <div className="text-2xl font-bold text-gray-900">{profile.friendsCount || 0}</div>
          <div className="text-xs text-gray-500 uppercase font-bold">Friends</div>
        </div>
      </div>
    </div>
  );
};
