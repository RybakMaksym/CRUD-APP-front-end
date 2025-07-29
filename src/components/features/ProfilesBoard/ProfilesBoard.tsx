'use client';

import type { SelectChangeEvent } from '@mui/material';
import { useEffect, useState } from 'react';

import CreateProfileButton from '@/components/features/CreateProfileButton/CreateProfileButto;
import FilterInput from '@/components/features/FilterInput/FilterInput';
import InfinityScrollWrapper from '@/components/features/InfinityScrollWrapper/InfinityScrollWrapper';
import styles from '@/components/features/ProfilesBoard/ProfilesBoard.module.scss';
import FilterSelect from '@/components/ui/FilterSelect/FilterSelect';
import Headline from '@/components/ui/Headline/Headline';
import Loader from '@/components/ui/Loader/Loader';
import Paragraph from '@/components/ui/Paragraph/Paragraph';
import ProfileCard from '@/components/ui/ProfileCard/ProfileCard';
import SearchInput from '@/components/ui/SearchInput/SearchInput';
import { FilterOption } from '@/enums/filter.enums';
import { useProfileFilter } from '@/hooks/use-profile-filter';
import { useSearch } from '@/hooks/use-search';
import { PROFILES_PAGE_LIMIT } from '@/lib/constants/profile';
import {
  useMyProfilesQuery,
  useSearchProfilesQuery,
} from '@/redux/profile/profile-api';
import type { IProfile } from '@/types/profile';

function ProfilesBoard() {
  const {
    filter,
    setFilter,
    filteredProfiles,
    isFiltering,
    isFilterError,
    inputValue,
    setInputValue,
    setSelectedOption,
    suggestions,
  } = useProfileFilter();

  const { searchQuery, activeSearch, handleInputChange, handleKeyDown } =
    useSearch();
  
  const [page, setPage] = useState(1);
  const [allProfiles, setAllProfiles] = useState<IProfile[]>([]);
  const [isFetchingMore, setIsFetchingMore] = useState(false);

  const [searchQuery, setSearchQuery] = useState('');
  const [activeSearch, setActiveSearch] = useState(false);

  const {
    data: searchedProfiles,
    isLoading: isLoadingSearch,
    isError: isErrorSearch,
  } = useSearchProfilesQuery({ query: searchQuery }, { skip: !activeSearch });

  const {
    data: paginatedData,
    isLoading: isAllProfilesLoading,
    isError: isAllProfilesError,
  } = useMyProfilesQuery(
    { page, limit: PROFILES_PAGE_LIMIT },
    { skip: activeSearch || filter !== FilterOption.DEFAULT },
  );

  const profiles = activeSearch
    ? searchedProfiles
    : filter === FilterOption.DEFAULT
      ? allProfiles
      : filteredProfiles;

  const isLoading = activeSearch
    ? isLoadingSearch
    : filter === FilterOption.DEFAULT
      ? isAllProfilesLoading
      : isFiltering;

  const isError = activeSearch
    ? isErrorSearch
    : filter === FilterOption.DEFAULT
      ? isAllProfilesError
      : isFilterError;
  
  const isInitialLoading = isAllProfilesLoading && page === 1;

  useEffect(() => {
    if (!paginatedData || isAllProfilesLoading || activeSearch) return;

    setAllProfiles((prev) => {
      const existingIds = new Set(prev.map((p) => p.id));
      const unique = paginatedData.data.filter((p) => !existingIds.has(p.id));

      return [...prev, ...unique];
    });

    setIsFetchingMore(false);
  }, [paginatedData, isAllProfilesLoading, activeSearch]);

  const onProfileChanged = () => {
    setAllProfiles([]);
    setPage(1);
    setIsFetchingMore(true);
  };

  const profiles = activeSearch ? (searchedProfiles ?? []) : allProfiles;
  const isLastPage = !paginatedData?.nextPage;
  const canLoadMore = !activeSearch && !isAllProfilesLoading && !isLastPage;

  if (isError) {
    return (
      <div className={styles.board}>
        <Paragraph color="error">Could not find any profiles</Paragraph>
      </div>
    );
  }

  if (isInitialLoading || isLoading) {
    return (
      <div className={styles.board}>
        <Loader />
      </div>
    );
  }

  return (
    <div className={styles.board}>
      <Headline color="dark">Profiles</Headline>

      <div className={styles.search}>
        <SearchInput
          placeholder="Search"
          value={searchQuery}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
        />

        {(filter === FilterOption.COUNRTY || filter === FilterOption.CITY) && (
          <FilterInput
            options={suggestions}
            inputValue={inputValue}
            onInputChange={(e, value) => setInputValue(value)}
            onChange={(e, value) => setSelectedOption(value || '')}
          />
        )}

        <FilterSelect
          value={filter}
          onChange={(e: SelectChangeEvent) => {
            const val = e.target.value as FilterOption;
            setFilter(val);
            setInputValue('');
            setSelectedOption('');
          }}
        />
      </div>
      <InfinityScrollWrapper
        onLoadMore={() => {
          if (isFetchingMore) return;

          setIsFetchingMore(true);
          setPage((prev) => prev + 1);
        }}
        additionalConditions={canLoadMore}
      >
        <div className={styles.profiles}>
          {profiles.map((profile) => (
            <ProfileCard
              key={profile.id}
              profile={profile}
              actionSuccess={onProfileChanged}
            />
          ))}
          {!activeSearch && (
            <CreateProfileButton onConfirm={onProfileChanged} />
          )}
        </div>
      </InfinityScrollWrapper>
    </div>
  );
}

export default ProfilesBoard;
