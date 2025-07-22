'use client';

import { useEffect, useRef, useState } from 'react';

import CreateProfileButton from '@/components/features/CreateProfileButton/CreateProfileButton';
import styles from '@/components/features/ProfilesBoard/ProfilesBoard.module.scss';
import Headline from '@/components/ui/Headline/Headline';
import Loader from '@/components/ui/Loader/Loader';
import Paragraph from '@/components/ui/Paragraph/Paragraph';
import ProfileCard from '@/components/ui/ProfileCard/ProfileCard';
import SearchInput from '@/components/ui/SearchInput/SearchInput';
import { PROFILES_PAGE_LIMIT } from '@/lib/constants/profile';
import {
  useMyProfilesQuery,
  useSearchProfilesQuery,
} from '@/redux/profile/profile-api';
import type { IProfile } from '@/types/profile';

function ProfilesBoard() {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeSearch, setActiveSearch] = useState(false);

  const [page, setPage] = useState(1);
  const [allProfiles, setAllProfiles] = useState<IProfile[]>([]);
  const [hasMore, setHasMore] = useState(true);
  const loaderRef = useRef<HTMLDivElement | null>(null);

  const {
    data: pageProfiles,
    isLoading: isAllProfilesLoading,
    isError: isAllProfilesError,
  } = useMyProfilesQuery(
    { page, limit: PROFILES_PAGE_LIMIT },
    {
      skip: activeSearch || !hasMore,
    },
  );

  const onProfileChanged = () => {
    setPage(1);
    setAllProfiles([]);
    setHasMore(true);
  };

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

  useEffect(() => {
    if (pageProfiles && pageProfiles.length > 0) {
      setAllProfiles((prev) => {
        const existingIds = new Set(prev.map((p) => p.id));
        const unique = pageProfiles.filter((p) => !existingIds.has(p.id));

        return [...prev, ...unique];
      });

      if (pageProfiles.length < PROFILES_PAGE_LIMIT) {
        setHasMore(false);
      }
    } else {
      setHasMore(false);
    }
  }, [pageProfiles]);

  useEffect(() => {
    if (activeSearch) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && hasMore && !isAllProfilesLoading) {
          setPage((prev) => prev + 1);
        }
      },
      { threshold: 1 },
    );

    const loader = loaderRef.current;

    if (loader) observer.observe(loader);

    return () => {
      if (loader) observer.unobserve(loader);
    };
  }, [hasMore, isAllProfilesLoading, activeSearch]);

  const profiles = activeSearch ? searchedProfiles : allProfiles;
  const isLoading = activeSearch ? isLoadingSearch : isAllProfilesLoading;
  const isError = activeSearch ? isErrorSearch : isAllProfilesError;

  if (isLoading && page === 1) return <Loader />;

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
          <ProfileCard
            key={profile.id}
            profile={profile}
            actionSuccess={onProfileChanged}
          />
        ))}
        {!activeSearch && <CreateProfileButton onConfirm={onProfileChanged} />}
      </div>

      {!activeSearch && hasMore && (
        <div ref={loaderRef}>
          <Loader />
        </div>
      )}
    </div>
  );
}

export default ProfilesBoard;
