import DeleteUserButton from '@/components/features/DeleteUserButton/DeleteUserButton';
import Avatar from '@/components/ui/Avatar/Avatar';
import Paragraph from '@/components/ui/Paragraph/Paragraph';
import styles from '@/components/ui/UserDetails/UserDetails.module.scss';
import { DEFAULT_AVATAR } from '@/lib/constants/avatar';
import { IUser } from '@/types/user';

type UserDetailsProps = {
  user: IUser;
};

function UserDetails({ user }: UserDetailsProps) {
  return (
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
        <DeleteUserButton userId={user._id} />
      </div>
    </div>
  );
}

export default UserDetails;
