'use client';

import type { SelectChangeEvent } from '@mui/material';
import { useEffect, useState } from 'react';

import CreateProfileButton from '@/components/features/CreateProfileButton/CreateProfileButton';
import FilterInput from '@/components/features/FilterInput/FilterInput';
import styles from '@/components/features/ProfilesBoard/ProfilesBoard.module.scss';
import FilterSelect from '@/components/ui/FilterSelect/FilterSelect';
import Headline from '@/components/ui/Headline/Headline';
import Loader from '@/components/ui/Loader/Loader';
import Paragraph from '@/components/ui/Paragraph/Paragraph';
import ProfileCard from '@/components/ui/ProfileCard/ProfileCard';
import SearchInput from '@/components/ui/SearchInput/SearchInput';
import { FilterOption } from '@/enums/filter.enums';
import { useProfileFilter } from '@/hooks/use-profile-filter';
import {
  useMyProfilesQuery,
  useSearchProfilesQuery,
} from '@/redux/profile/profile-api';

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

  const [searchQuery, setSearchQuery] = useState('');
  const [activeSearch, setActiveSearch] = useState(false);

  const {
    data: allProfiles,
    isLoading: isAllProfilesLoading,
    isError: isAllProfilesError,
  } = useMyProfilesQuery(undefined, {
    refetchOnMountOrArgChange: true,
    skip: activeSearch || filter !== FilterOption.DEFAULT,
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
      <div className={styles.profiles}>
        {profiles?.map((profile) => (
          <ProfileCard key={profile.id} profile={profile} />
        ))}
        {!activeSearch && filter === FilterOption.DEFAULT && (
          <CreateProfileButton />
        )}
      </div>
    </div>
  );
}

export default ProfilesBoard;
