import React from 'react';
import { ProfileCardPhotos } from './ProfileCardPhotos';
import { ProfileCardOverlay } from './ProfileCardOverlay';
import { ProfileCardInfo } from './ProfileCardInfo';
import { useMotionValue, useTransform } from 'motion/react';

interface ProfileCardContentProps {
  name: string;
  age: number;
  bio: string;
  photos: string[];
  onShowInfo?: () => void;
}

export const ProfileCardContent: React.FC<ProfileCardContentProps> = ({
  name,
  age,
  bio,
  photos,
  onShowInfo,
}) => {
  const x = useMotionValue(0);
  const likeOpacity = useTransform(x, [50, 150], [0, 1]);
  const nopeOpacity = useTransform(x, [-50, -150], [0, 1]);

  return (
    <>
      <ProfileCardPhotos photos={photos} name={name} />
      <ProfileCardOverlay likeOpacity={likeOpacity} nopeOpacity={nopeOpacity} />
      <ProfileCardInfo name={name} age={age} bio={bio} onShowInfo={onShowInfo} />
    </>
  );
};
