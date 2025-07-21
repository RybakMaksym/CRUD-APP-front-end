import DeleteUserButton from '@/components/features/DeleteUserButton/DeleteUserButton';
import UpdateUserButton from '@/components/features/UpdateUserButton/UpdateUserButton';
import Avatar from '@/components/ui/Avatar/Avatar';
import Headline from '@/components/ui/Headline/Headline';
import Paragraph from '@/components/ui/Paragraph/Paragraph';
import ProfileCard from '@/components/ui/ProfileCard/ProfileCard';
import styles from '@/components/ui/UserDetails/UserDetails.module.scss';
import { DEFAULT_AVATAR } from '@/lib/constants/avatar';
import type { IProfile } from '@/types/profile';
import type { IUser } from '@/types/user';

type UserDetailsProps = {
  user: IUser;
};

function UserDetails({ user }: UserDetailsProps) {
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
        <Headline color="dark">Profiles</Headline>
        <div className={styles.profiles}>
          {user.profiles?.map((profile) => (
            <ProfileCard
              key={(profile as IProfile).id}
              profile={profile as IProfile}
            />
          ))}
        </div>
      </div>
    </>
  );
}

export default UserDetails;
