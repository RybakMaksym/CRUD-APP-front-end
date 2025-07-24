'use client';

import { useEffect, useState } from 'react';

import CreateProfileButton from '@/components/features/CreateProfileButton/CreateProfileButton';
import styles from '@/components/features/ProfilesBoard/ProfilesBoard.module.scss';
import Headline from '@/components/ui/Headline/Headline';
import Loader from '@/components/ui/Loader/Loader';
import Paragraph from '@/components/ui/Paragraph/Paragraph';
import ProfileCard from '@/components/ui/ProfileCard/ProfileCard';
import SearchInput from '@/components/ui/SearchInput/SearchInput';
import {
  useMyProfilesQuery,
  useSearchProfilesQuery,
} from '@/redux/profile/profile-api';

function ProfilesBoard() {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeSearch, setActiveSearch] = useState(false);

  const {
    data: allProfiles,
    isLoading: isAllProfilesLoading,
    isError: isAllProfilesError,
  } = useMyProfilesQuery(undefined, {
    refetchOnMountOrArgChange: true,
    skip: activeSearch,
  });

  const {
    data: searchedProfiles,
    isLoading: isLoadingSearch,
    isError: isErrorSearch,
  } = useSearchProfilesQuery({ query: searchQuery }, { skip: !activeSearch });

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      setActiveSearch(!!searchQuery.trim());
    }
  };

  useEffect(() => {
    if (!searchQuery.trim()) {
      setActiveSearch(false);
    }
  }, [searchQuery]);

  const profiles = activeSearch ? searchedProfiles : allProfiles;
  const isLoading = activeSearch ? isLoadingSearch : isAllProfilesLoading;
  const isError = activeSearch ? isErrorSearch : isAllProfilesError;

  if (isLoading) return <Loader />;

  if (isError) {
    return <Paragraph color="error">Could not find any profiles</Paragraph>;
  }

  return (
    <div className={styles.board}>
      <Headline color="dark">Profiles</Headline>
      <div className={styles.search}>
        <SearchInput
          placeholder="Search"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onKeyDown={handleKeyDown}
        />
      </div>
      <div className={styles.profiles}>
        {profiles?.map((profile) => (
          <ProfileCard key={profile.id} profile={profile} />
        ))}
        {!activeSearch && <CreateProfileButton />}
      </div>
    </div>
  );
}

export default ProfilesBoard;
