import React from 'react';
import { Info, MapPin } from 'lucide-react';

interface ProfileCardStackInfoContainerContentContentContentContentContentContentContentContentContentContentContentContentContentContentContentContentContentContentContentContentContentContentProps {
  name: string;
  age: number;
  bio: string;
  onShowInfo?: () => void;
}

export const ProfileCardStackInfoContainerContentContentContentContentContentContentContentContentContentContentContentContentContentContentContentContentContentContentContentContentContentContent: React.FC<ProfileCardStackInfoContainerContentContentContentContentContentContentContentContentContentContentContentContentContentContentContentContentContentContentContentContentContentContentProps> = ({
  name,
  age,
  bio,
  onShowInfo,
}) => {
  return (
    <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
      <div className="flex items-end justify-between mb-2">
        <div>
          <h2 className="text-3xl font-bold">
            {name}, {age}
          </h2>
          <div className="flex items-center gap-1 text-white/80 text-xs font-bold uppercase tracking-widest mt-1">
            <MapPin className="w-3 h-3" />
            <span>2 miles away</span>
          </div>
          <p className="text-white/80 line-clamp-2 mt-2 text-sm leading-relaxed">{bio}</p>
        </div>
        <button
          onClick={(e) => {
            e.stopPropagation();
            onShowInfo?.();
          }}
          className="p-3 bg-white/20 backdrop-blur-md rounded-2xl hover:bg-white/30 transition-colors"
        >
          <Info className="w-6 h-6" />
        </button>
      </div>
    </div>
  );
};
