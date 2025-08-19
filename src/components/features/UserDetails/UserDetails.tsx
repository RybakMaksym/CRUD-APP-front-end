'use client';

import { useTranslation } from 'react-i18next';

import DeleteUserButton from '@/components/features/DeleteUserButton/DeleteUserButton';
import UpdateUserButton from '@/components/features/UpdateUserButton/UpdateUserButton';
import styles from '@/components/features/UserDetails/UserDetails.module.scss';
import UsersProfiles from '@/components/features/UsersProfiles/UsersProfiles';
import Avatar from '@/components/ui/Avatar/Avatar';
import Headline from '@/components/ui/Headline/Headline';
import Paragraph from '@/components/ui/Paragraph/Paragraph';
import { DEFAULT_AVATAR } from '@/lib/constants/avatar';
import type { IUser } from '@/types/user';

type UserDetailsProps = {
  user: IUser;
};

function UserDetails({ user }: UserDetailsProps) {
  const { t } = useTranslation();

  return (
    <>
      <div className={styles.details}>
        <Avatar
          src={user.avatarUrl ?? DEFAULT_AVATAR}
          alt="User avatar"
          width={87}
          height={87}
        />
        <Paragraph size="21px">{user.username}</Paragraph>
        <Paragraph size="21px">{user.email}</Paragraph>
        <Paragraph size="21px" color="error">
          {user.role}
        </Paragraph>
        <div className={styles.actions}>
          <UpdateUserButton user={user} />
          <DeleteUserButton userId={user.id} />
        </div>
      </div>
      <div className={styles['profiles-block']}>
        <Headline color="dark">{t('profiles')}</Headline>
        <UsersProfiles userId={user.id} />
      </div>
    </>
  );
}

export default UserDetails;
