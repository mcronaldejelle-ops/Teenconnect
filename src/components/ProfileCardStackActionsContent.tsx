import React from 'react';
import { Heart, X, Star, Zap } from 'lucide-react';

interface ProfileCardStackActionsContentProps {
  onLike: () => void;
  onPass: () => void;
  onSuperLike?: () => void;
  onBoost?: () => void;
}

export const ProfileCardStackActionsContent: React.FC<ProfileCardStackActionsContentProps> = ({
  onLike,
  onPass,
  onSuperLike,
  onBoost,
}) => {
  return (
    <div className="flex justify-center items-center gap-6 mt-8 mb-4">
      <button
        onClick={onPass}
        className="p-5 bg-white rounded-full shadow-xl shadow-gray-200/50 text-red-500 hover:scale-110 active:scale-90 transition-all border border-gray-50"
      >
        <X className="w-8 h-8" />
      </button>
      <button
        onClick={onSuperLike}
        className="p-4 bg-white rounded-full shadow-lg shadow-gray-200/50 text-yellow-500 hover:scale-110 active:scale-90 transition-all border border-gray-50"
      >
        <Star className="w-6 h-6 fill-yellow-500" />
      </button>
      <button
        onClick={onLike}
        className="p-5 bg-white rounded-full shadow-xl shadow-gray-200/50 text-green-500 hover:scale-110 active:scale-90 transition-all border border-gray-50"
      >
        <Heart className="w-8 h-8 fill-green-500" />
      </button>
      {onBoost && (
        <button
          onClick={onBoost}
          className="p-4 bg-white rounded-full shadow-lg shadow-gray-200/50 text-purple-500 hover:scale-110 active:scale-90 transition-all border border-gray-50"
        >
          <Zap className="w-6 h-6 fill-purple-500" />
        </button>
      )}
    </div>
  );
};
