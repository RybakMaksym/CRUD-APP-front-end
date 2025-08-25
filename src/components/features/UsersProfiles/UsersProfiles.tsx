import { useEffect, useState } from 'react';

import CreateProfileButton from '@/components/features/CreateProfileButton/CreateProfileButton';
import InfinityScrollWrapper from '@/components/features/InfinityScrollWrapper/InfinityScrollWrapper';
import styles from '@/components/features/UsersProfiles/UsersProfiles.module.scss';
import Loader from '@/components/ui/Loader/Loader';
import Paragraph from '@/components/ui/Paragraph/Paragraph';
import ProfileCard from '@/components/ui/ProfileCard/ProfileCard';
import { PROFILES_PAGE_LIMIT } from '@/lib/constants/profile';
import { useGetProfilesByUserIdQuery } from '@/redux/profile/profile-api';
import type { IProfile } from '@/types/profile';

type UsersProfilesProps = {
  userId: string;
};

function UsersProfiles(props: UsersProfilesProps) {
  const [page, setPage] = useState(1);
  const [allProfiles, setAllProfiles] = useState<IProfile[]>([]);
  const [isFetchingMore, setIsFetchingMore] = useState(false);

  const {
    data: paginatedData,
    isLoading: isAllProfilesLoading,
    isError: isAllProfilesError,
  } = useGetProfilesByUserIdQuery({
    id: props.userId,
    pagination: { page, limit: PROFILES_PAGE_LIMIT },
  });

  useEffect(() => {
    if (!paginatedData || isAllProfilesLoading) return;

    setAllProfiles((prev) => {
      const existingIds = new Set(prev.map((p) => p.id));
      const unique = paginatedData.data.filter((p) => !existingIds.has(p.id));

      return [...prev, ...unique];
    });

    setIsFetchingMore(false);
  }, [paginatedData, isAllProfilesLoading]);

  const onProfileChanged = () => {
    setAllProfiles([]);
    setPage(1);
    setIsFetchingMore(true);
  };

  const isInitialLoading = isAllProfilesLoading && page === 1;
  const isLastPage = !paginatedData?.nextPage;
  const canLoadMore = !isAllProfilesLoading && !isLastPage;

  if (isAllProfilesError) {
    return <Paragraph color="error">Could not find any profiles</Paragraph>;
  }

  if (isInitialLoading || isAllProfilesError) {
    return <Loader />;
  }

  return (
    <InfinityScrollWrapper
      onLoadMore={() => {
        if (isFetchingMore) return;

        setIsFetchingMore(true);
        setPage((prev) => prev + 1);
      }}
      additionalConditions={canLoadMore}
    >
      <div className={styles.profiles}>
        {allProfiles?.map((profile) => (
          <ProfileCard
            key={(profile as IProfile).id}
            profile={profile as IProfile}
            actionSuccess={onProfileChanged}
          />
        ))}
        <CreateProfileButton
          userId={props.userId}
          onConfirm={onProfileChanged}
        />
      </div>
    </InfinityScrollWrapper>
  );
}

export default UsersProfiles;
