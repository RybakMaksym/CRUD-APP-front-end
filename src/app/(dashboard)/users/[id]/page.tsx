'use client';

import { useParams } from 'next/navigation';

import Loader from '@/components/ui/Loader/Loader';
import Paragraph from '@/components/ui/Paragraph/Paragraph';
import UserDetails from '@/components/ui/UserDetails/UserDetails';
import { useGetUserByIdQuery } from '@/redux/user/user-api';
import pageStyles from '@/styles/user-details-page.module.scss';
import styles from '@/styles/users-page.module.scss';

function UserDetailsPage() {
  const { id } = useParams();

  const { data: user, isLoading, isError } = useGetUserByIdQuery(id as string);

  if (isLoading) return <Loader />;

  if (isError || !user) {
    return <Paragraph color="error">User not found</Paragraph>;
  }

  return (
    <div className={`${styles.container} ${pageStyles.page}`}>
      <UserDetails user={user} />
    </div>
  );
}

export default UserDetailsPage;
