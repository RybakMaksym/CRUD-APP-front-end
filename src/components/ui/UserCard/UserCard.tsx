'use client';

import { useRouter } from 'next/navigation';
import { useTranslation } from 'react-i18next';

import Avatar from '@/components/ui/Avatar/Avatar';
import Paragraph from '@/components/ui/Paragraph/Paragraph';
import styles from '@/components/ui/UserCard/UserCard.module.scss';
import { PAGES_URL } from '@/enums/pages-url';
import { DEFAULT_AVATAR } from '@/lib/constants/avatar';
import type { IUser } from '@/types/user';

type UserCardProps = {
  user: IUser;
};

function UserCard({ user }: UserCardProps) {
  const { t } = useTranslation();
  const router = useRouter();

  const handleClick = () => {
    router.push(`${PAGES_URL.USERS}/${user.id}`);
  };

  return (
    <div className={styles.card} onClick={handleClick}>
      <Avatar
        src={user.avatarUrl ?? DEFAULT_AVATAR}
        alt="User avatar"
        width={50}
        height={50}
      />
      <Paragraph size="18px">{user.username}</Paragraph>
      <Paragraph size="18px">{user.email}</Paragraph>
      <Paragraph size="18px" color="error">
        {user.profiles.length} {t('profiles-count')}
      </Paragraph>
    </div>
  );
}

export default UserCard;
