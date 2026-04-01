import React, { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface ProfileCardStackPhotosContainerContentContentContentContentContentContentContentContentContentContentContentContentContentContentContentContentContentContentContentContentContentContentProps {
  photos: string[];
  name: string;
}

export const ProfileCardStackPhotosContainerContentContentContentContentContentContentContentContentContentContentContentContentContentContentContentContentContentContentContentContentContentContent: React.FC<ProfileCardStackPhotosContainerContentContentContentContentContentContentContentContentContentContentContentContentContentContentContentContentContentContentContentContentContentContentProps> = ({
  photos,
  name,
}) => {
  const [currentPhoto, setCurrentPhoto] = useState(0);

  const nextPhoto = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentPhoto((prev) => (prev + 1) % photos.length);
  };

  const prevPhoto = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentPhoto((prev) => (prev - 1 + photos.length) % photos.length);
  };

  return (
    <div className="absolute inset-0 w-full h-full">
      <img
        src={photos[currentPhoto] || `https://picsum.photos/seed/${name}-${currentPhoto}/600/800`}
        alt={name}
        className="w-full h-full object-cover"
        referrerPolicy="no-referrer"
      />

      {/* Photo Indicators */}
      <div className="absolute top-4 left-4 right-4 flex gap-1 z-10">
        {photos.map((_, idx) => (
          <div
            key={idx}
            className={`h-1 flex-1 rounded-full transition-all ${
              idx === currentPhoto ? 'bg-white shadow-sm' : 'bg-white/30'
            }`}
          />
        ))}
      </div>

      {/* Navigation Areas */}
      <div className="absolute inset-0 flex">
        <div
          onClick={prevPhoto}
          className="w-1/2 h-full cursor-pointer flex items-center justify-start p-4 group"
        >
          <ChevronLeft className="w-8 h-8 text-white/0 group-hover:text-white/50 transition-all" />
        </div>
        <div
          onClick={nextPhoto}
          className="w-1/2 h-full cursor-pointer flex items-center justify-end p-4 group"
        >
          <ChevronRight className="w-8 h-8 text-white/0 group-hover:text-white/50 transition-all" />
        </div>
      </div>
    </div>
  );
};
