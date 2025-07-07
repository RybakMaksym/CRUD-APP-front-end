import Image from 'next/image';

import Paragraph from '@/components/ui/Paragraph/Paragraph';
import styles from '@/components/ui/UserCard/UserCard.module.scss';
import { DEFAULT_AVATAR } from '@/lib/constants/avatar';
import { IUser } from '@/types/user';

type UserCardProps = {
  user: IUser;
};

function UserCard({ user }: UserCardProps) {
  return (
    <div className={styles.card}>
      <Image
        src={user.avatarUrl || DEFAULT_AVATAR}
        alt="User avatar"
        width={50}
        height={50}
        className={styles.avatar}
      />
      <Paragraph size="18px">{user.username}</Paragraph>
      <Paragraph size="18px">{user.email}</Paragraph>
    </div>
  );
}

export default UserCard;
