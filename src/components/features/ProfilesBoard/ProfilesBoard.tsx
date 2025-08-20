'use client';

import { MenuItem, type SelectChangeEvent } from '@mui/material';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

import CreateProfileButton from '@/components/features/CreateProfileButton/CreateProfileButton';
import FilterInput from '@/components/features/FilterInput/FilterInput';
import InfinityScrollWrapper from '@/components/features/InfinityScrollWrapper/InfinityScrollWrapper';
import styles from '@/components/features/ProfilesBoard/ProfilesBoard.module.scss';
import CustomSelect from '@/components/ui/CustomSelect/CustomSelect';
import Headline from '@/components/ui/Headline/Headline';
import Loader from '@/components/ui/Loader/Loader';
import Paragraph from '@/components/ui/Paragraph/Paragraph';
import ProfileCard from '@/components/ui/ProfileCard/ProfileCard';
import SearchInput from '@/components/ui/SearchInput/SearchInput';
import { FilterOption } from '@/enums/filter';
import { useProfileFilter } from '@/hooks/use-profile-filter';
import { useSearch } from '@/hooks/use-search';
import { FILTERS } from '@/lib/constants/filters';
import { PROFILES_PAGE_LIMIT } from '@/lib/constants/profile';
import {
  useMyProfilesQuery,
  useSearchProfilesQuery,
} from '@/redux/profile/profile-api';
import type { IProfile } from '@/types/profile';

function ProfilesBoard() {
  const { t } = useTranslation();

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
      <Headline color="dark">{t('profilesPage.profiles')}</Headline>

      <div className={styles.search}>
        <SearchInput
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

        <CustomSelect
          value={filter}
          onChange={(e: SelectChangeEvent) => {
            const val = e.target.value as FilterOption;
            setFilter(val);
            setInputValue('');
            setSelectedOption('');
          }}
        >
          {FILTERS.map((filter) => (
            <MenuItem key={filter.value} value={filter.value}>
              {t(`profilesPage.${filter.label}`)}
            </MenuItem>
          ))}
        </CustomSelect>
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
          {profiles?.map((profile) => (
            <ProfileCard
              key={profile.id}
              profile={profile}
              actionSuccess={onProfileChanged}
            />
          ))}
          {!activeSearch && filter === FilterOption.DEFAULT && (
            <CreateProfileButton onConfirm={onProfileChanged} />
          )}
        </div>
      </InfinityScrollWrapper>
    </div>
  );
}

export default ProfilesBoard;
