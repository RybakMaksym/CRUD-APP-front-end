'use client';

import Avatar from '@/components/ui/Avatar/Avatar';
import Paragraph from '@/components/ui/Paragraph/Paragraph';
import styles from '@/components/ui/UserProfile/UserProfile.module.scss';
import { useAppSelector } from '@/hooks/use-app-selector';
import { DEFAULT_AVATAR } from '@/lib/constants/avatar';

function UserProfile() {
  const user = useAppSelector((state) => state.user);

  if (!user.username) return null;

  return (
    <div className={styles.profile}>
      <Avatar
        src={user.avatarUrl ?? DEFAULT_AVATAR}
        alt="User avatar"
        width={100}
        height={100}
      />
      <Paragraph>{user.username}</Paragraph>
    </div>
  );
}

export default UserProfile;
