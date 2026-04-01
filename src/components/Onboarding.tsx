import React, { useState } from 'react';
import { Input } from './ui/Input';
import { Button } from './ui/Button';
import { UserProfile } from '@/src/types';
import { Camera, Plus, Trash2 } from 'lucide-react';

interface OnboardingProps {
  onComplete: (profile: Partial<UserProfile>) => void;
}

export const Onboarding: React.FC<OnboardingProps> = ({ onComplete }) => {
  const [step, setStep] = useState(1);
  const [profile, setProfile] = useState<Partial<UserProfile>>({
    displayName: '',
    age: 13,
    bio: '',
    interests: [],
    photos: [],
    gender: 'other',
    lookingFor: ['male', 'female', 'other'],
  });

  const [newInterest, setNewInterest] = useState('');

  const handleNext = () => {
    if (step < 4) setStep(step + 1);
    else onComplete(profile);
  };

  const addInterest = () => {
    if (newInterest && !profile.interests?.includes(newInterest)) {
      setProfile({ ...profile, interests: [...(profile.interests || []), newInterest] });
      setNewInterest('');
    }
  };

  const removeInterest = (interest: string) => {
    setProfile({ ...profile, interests: profile.interests?.filter((i) => i !== interest) });
  };

  return (
    <div className="max-w-md mx-auto p-8 space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="text-center space-y-2">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-pink-500 to-indigo-500 bg-clip-text text-transparent">
          Welcome to TeenConnect
        </h1>
        <p className="text-gray-500">Let's set up your profile and find some matches!</p>
      </div>

      {/* Progress Bar */}
      <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
        <div
          className="h-full bg-pink-500 transition-all duration-500"
          style={{ width: `${(step / 4) * 100}%` }}
        />
      </div>

      {step === 1 && (
        <div className="space-y-6">
          <Input
            label="What's your name?"
            placeholder="Enter your name"
            value={profile.displayName}
            onChange={(e) => setProfile({ ...profile, displayName: e.target.value })}
          />
          <Input
            label="How old are you?"
            type="number"
            min={13}
            max={19}
            value={profile.age}
            onChange={(e) => setProfile({ ...profile, age: parseInt(e.target.value) })}
          />
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700 ml-1">Gender</label>
            <div className="flex gap-2">
              {['male', 'female', 'other'].map((g) => (
                <button
                  key={g}
                  onClick={() => setProfile({ ...profile, gender: g as any })}
                  className={`flex-1 py-2 rounded-xl border transition-all ${
                    profile.gender === g
                      ? 'bg-pink-500 border-pink-500 text-white'
                      : 'bg-white border-gray-200 text-gray-600'
                  }`}
                >
                  {g.charAt(0).toUpperCase() + g.slice(1)}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {step === 2 && (
        <div className="space-y-6">
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700 ml-1">Bio</label>
            <textarea
              className="w-full px-4 py-2.5 rounded-2xl border border-gray-200 bg-white focus:outline-none focus:ring-2 focus:ring-pink-500/20 focus:border-pink-500 transition-all h-32 resize-none"
              placeholder="Tell us about yourself..."
              value={profile.bio}
              onChange={(e) => setProfile({ ...profile, bio: e.target.value })}
            />
          </div>
          <div className="space-y-4">
            <label className="text-sm font-medium text-gray-700 ml-1">Interests</label>
            <div className="flex gap-2">
              <Input
                placeholder="e.g. Gaming, Music, Art"
                value={newInterest}
                onChange={(e) => setNewInterest(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && addInterest()}
              />
              <Button onClick={addInterest} size="sm">
                <Plus className="w-5 h-5" />
              </Button>
            </div>
            <div className="flex flex-wrap gap-2">
              {profile.interests?.map((interest) => (
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
          </div>
        </div>
      )}

      {step === 3 && (
        <div className="space-y-6">
          <label className="text-sm font-medium text-gray-700 ml-1">Add some photos</label>
          <div className="grid grid-cols-2 gap-4">
            <div className="aspect-[3/4] bg-gray-50 border-2 border-dashed border-gray-200 rounded-2xl flex flex-col items-center justify-center text-gray-400 hover:border-pink-500 hover:text-pink-500 transition-all cursor-pointer">
              <Camera className="w-8 h-8 mb-2" />
              <span className="text-xs">Add Photo</span>
            </div>
            {/* Placeholder for uploaded photos */}
            <div className="aspect-[3/4] bg-gray-100 rounded-2xl overflow-hidden relative group">
              <img
                src="https://picsum.photos/seed/teen/300/400"
                alt="Profile"
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
              <button className="absolute top-2 right-2 p-1.5 bg-black/50 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
          <p className="text-xs text-gray-400 text-center italic">
            Tip: Profiles with photos get 10x more matches!
          </p>
        </div>
      )}

      {step === 4 && (
        <div className="space-y-6">
          <div className="space-y-4">
            <label className="text-sm font-medium text-gray-700 ml-1">Who are you looking for?</label>
            <div className="space-y-2">
              {['male', 'female', 'other'].map((g) => (
                <label
                  key={g}
                  className="flex items-center justify-between p-4 bg-white border border-gray-200 rounded-2xl cursor-pointer hover:border-pink-500 transition-all"
                >
                  <span className="font-medium text-gray-700">
                    {g.charAt(0).toUpperCase() + g.slice(1)}
                  </span>
                  <input
                    type="checkbox"
                    checked={profile.lookingFor?.includes(g as any)}
                    onChange={(e) => {
                      const current = profile.lookingFor || [];
                      if (e.target.checked) {
                        setProfile({ ...profile, lookingFor: [...current, g as any] });
                      } else {
                        setProfile({ ...profile, lookingFor: current.filter((i) => i !== g) });
                      }
                    }}
                    className="w-5 h-5 accent-pink-500"
                  />
                </label>
              ))}
            </div>
          </div>
        </div>
      )}

      <div className="flex gap-4">
        {step > 1 && (
          <Button variant="outline" className="flex-1" onClick={() => setStep(step - 1)}>
            Back
          </Button>
        )}
        <Button className="flex-1" onClick={handleNext}>
          {step === 4 ? "Let's Go!" : 'Next'}
        </Button>
      </div>
    </div>
  );
};
