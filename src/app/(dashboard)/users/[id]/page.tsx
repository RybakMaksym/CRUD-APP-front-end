'use client';

import { useParams } from 'next/navigation';

import Loader from '@/components/ui/Loader/Loader';
import Paragraph from '@/components/ui/Paragraph/Paragraph';
import UserDetails from '@/components/ui/UserDetails/UserDetails';
import { useGetUserByIdQuery } from '@/redux/user/user-api';
import styles from '@/styles/profiles-users-page.module.scss';
import pageStyles from '@/styles/user-details-page.module.scss';

function UserDetailsPage() {
  const { id } = useParams();

  const { data: user, isLoading, isError } = useGetUserByIdQuery(id as string);

  if (isLoading)
    return (
      <div className={`${styles.container} ${pageStyles.page}`}>
        <Loader />
      </div>
    );

  if (isError || !user) {
    return (
      <div className={`${styles.container} ${pageStyles.page}`}>
        <Paragraph color="error">User not found</Paragraph>;
      </div>
    );
  }

  return (
    <div className={`${styles.container} ${pageStyles.page}`}>
      <UserDetails user={user} />
    </div>
  );
}

export default UserDetailsPage;
