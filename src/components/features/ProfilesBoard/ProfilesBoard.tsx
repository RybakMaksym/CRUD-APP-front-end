'use client';

import styles from '@/components/features/ProfilesBoard/ProfilesBoard.module.scss';
import Headline from '@/components/ui/Headline/Headline';
import Loader from '@/components/ui/Loader/Loader';
import Paragraph from '@/components/ui/Paragraph/Paragraph';
import ProfileCard from '@/components/ui/ProfileCard/ProfileCard';
import { useMyProfilesQuery } from '@/redux/profile/profile-api';

function ProfilesBoard() {
  const { data: profiles, isLoading, isError } = useMyProfilesQuery();

  if (isLoading) return <Loader />;

  if (isError) {
    return <Paragraph color="error">Could not find any profiles</Paragraph>;
  }

  return (
    <div className={styles.board}>
      <Headline color="dark">Profiles</Headline>
      <div className={styles.profiles}>
        {profiles?.map((profile) => (
          <ProfileCard key={profile.id} profile={profile} />
        ))}
      </div>
    </div>
  );
}

export default ProfilesBoard;
