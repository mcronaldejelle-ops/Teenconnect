import React, { useState } from 'react';
import { UserProfile } from '@/src/types';
import { Input } from './ui/Input';
import { Button } from './ui/Button';
import { Camera, Plus, Trash2, ArrowLeft, Save } from 'lucide-react';

interface ProfileEditProps {
  profile: UserProfile;
  onSave: (profile: Partial<UserProfile>) => void;
  onBack: () => void;
}

export const ProfileEdit: React.FC<ProfileEditProps> = ({ profile, onSave, onBack }) => {
  const [editedProfile, setEditedProfile] = useState<Partial<UserProfile>>(profile);
  const [newInterest, setNewInterest] = useState('');

  const addInterest = () => {
    if (newInterest && !editedProfile.interests?.includes(newInterest)) {
      setEditedProfile({ ...editedProfile, interests: [...(editedProfile.interests || []), newInterest] });
      setNewInterest('');
    }
  };

  const removeInterest = (interest: string) => {
    setEditedProfile({ ...editedProfile, interests: editedProfile.interests?.filter((i) => i !== interest) });
  };

  return (
    <div className="max-w-md mx-auto min-h-screen bg-white pb-24 animate-in slide-in-from-right-4 duration-300">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-xl border-b border-gray-100 px-6 py-8 sticky top-0 z-10">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button
              onClick={onBack}
              className="p-2.5 bg-gray-50 rounded-2xl text-gray-400 hover:text-pink-500 transition-colors"
            >
              <ArrowLeft className="w-6 h-6" />
            </button>
            <h1 className="text-3xl font-black tracking-tight text-gray-900 uppercase italic">
              Edit Profile
            </h1>
          </div>
          <button
            onClick={() => onSave(editedProfile)}
            className="p-2.5 bg-pink-500 rounded-2xl text-white hover:bg-pink-600 transition-colors shadow-lg shadow-pink-200"
          >
            <Save className="w-6 h-6" />
          </button>
        </div>
      </header>

      {/* Content */}
      <div className="px-6 py-8 space-y-8">
        {/* Photos */}
        <section className="space-y-4">
          <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest ml-2">
            Photos
          </h3>
          <div className="grid grid-cols-3 gap-4">
            {editedProfile.photos?.map((photo, idx) => (
              <div key={idx} className="aspect-[3/4] bg-gray-100 rounded-2xl overflow-hidden relative group">
                <img src={photo} alt="Profile" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                <button className="absolute top-2 right-2 p-1.5 bg-black/50 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
            <div className="aspect-[3/4] bg-gray-50 border-2 border-dashed border-gray-200 rounded-2xl flex flex-col items-center justify-center text-gray-400 hover:border-pink-500 hover:text-pink-500 transition-all cursor-pointer">
              <Camera className="w-6 h-6" />
            </div>
          </div>
        </section>

        {/* Basic Info */}
        <section className="space-y-6">
          <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest ml-2">
            Basic Info
          </h3>
          <Input
            label="Display Name"
            value={editedProfile.displayName}
            onChange={(e) => setEditedProfile({ ...editedProfile, displayName: e.target.value })}
          />
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700 ml-1">Bio</label>
            <textarea
              className="w-full px-4 py-2.5 rounded-2xl border border-gray-200 bg-white focus:outline-none focus:ring-2 focus:ring-pink-500/20 focus:border-pink-500 transition-all h-32 resize-none"
              placeholder="Tell us about yourself..."
              value={editedProfile.bio}
              onChange={(e) => setEditedProfile({ ...editedProfile, bio: e.target.value })}
            />
          </div>
        </section>

        {/* Interests */}
        <section className="space-y-4">
          <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest ml-2">
            Interests
          </h3>
          <div className="flex gap-2">
            <Input
              placeholder="Add an interest"
              value={newInterest}
              onChange={(e) => setNewInterest(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && addInterest()}
            />
            <Button onClick={addInterest} size="sm">
              <Plus className="w-5 h-5" />
            </Button>
          </div>
          <div className="flex flex-wrap gap-2">
            {editedProfile.interests?.map((interest) => (
              <span
                key={interest}
                className="px-3 py-1 bg-pink-50 text-pink-600 rounded-full text-sm flex items-center gap-1"
              >
                {interest}
                <button onClick={() => removeInterest(interest)}>
                  <Trash2 className="w-3 h-3" />
                </button>
              </span>
            ))}
          </div>
        </section>

        <Button className="w-full py-4 text-lg font-bold shadow-xl shadow-pink-200" onClick={() => onSave(editedProfile)}>
          Save Changes
        </Button>
      </div>
    </div>
  );
};
