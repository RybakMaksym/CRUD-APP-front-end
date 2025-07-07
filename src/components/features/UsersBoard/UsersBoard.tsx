'use client';

import styles from '@/components/features/UsersBoard/UsersBoard.module.scss';
import Headline from '@/components/ui/Headline/Headline';
import Loader from '@/components/ui/Loader/Loader';
import Paragraph from '@/components/ui/Paragraph/Paragraph';
import UserCard from '@/components/ui/UserCard/UserCard';
import { useUsersListQuery } from '@/redux/user/user-api';

function UsersBoard() {
  const { data: users, isLoading, isError } = useUsersListQuery();

  if (isLoading) return <Loader />;

  if (isError) {
    return <Paragraph color="error">Could not get users</Paragraph>;
  }

  return (
    <div className={styles.board}>
      <Headline color="dark">Users</Headline>
      <div className={styles.users}>
        {users?.map((user) => (
          <UserCard key={user._id} user={user} />
        ))}
      </div>
    </div>
  );
}

export default UsersBoard;
