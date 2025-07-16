'use client';

import { useEffect, useState } from 'react';

import styles from '@/components/features/UsersBoard/UsersBoard.module.scss';
import CustomPagination from '@/components/ui/CustomPagination/CustomPagination';
import Headline from '@/components/ui/Headline/Headline';
import Loader from '@/components/ui/Loader/Loader';
import Paragraph from '@/components/ui/Paragraph/Paragraph';
import SearchInput from '@/components/ui/SearchInput/SearchInput';
import UserCard from '@/components/ui/UserCard/UserCard';
import { USERS_PAGE_LIMIT } from '@/lib/constants/user';
import {
  useSearchUsersQuery,
  useUsersListQuery,
  useUsersTotalQuery,
} from '@/redux/user/user-api';

function UsersBoard() {
  const [page, setPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeSearch, setActiveSearch] = useState(false);

  const { data } = useUsersTotalQuery(undefined, {
    skip: activeSearch,
  });
  const totalUsers = data?.total;

  const totalPages = totalUsers ? Math.ceil(totalUsers / USERS_PAGE_LIMIT) : 1;

  const {
    data: allUsers,
    isLoading: isLoadingAll,
    isError: isErrorAll,
  } = useUsersListQuery(
    { page, limit: USERS_PAGE_LIMIT },
    { skip: activeSearch },
  );

  const {
    data: searchedUsers,
    isLoading: isLoadingSearch,
    isError: isErrorSearch,
  } = useSearchUsersQuery({ query: searchQuery }, { skip: !activeSearch });

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

  const users = activeSearch ? searchedUsers : allUsers;
  const isLoading = activeSearch ? isLoadingSearch : isLoadingAll;
  const isError = activeSearch ? isErrorSearch : isErrorAll;

  if (isLoading) return <Loader />;

  if (isError) {
    return <Paragraph color="error">Could not find any users</Paragraph>;
  }

  return (
    <div className={styles.board}>
      <Headline color="dark">Users</Headline>
      <div className={styles.search}>
        <SearchInput
          placeholder="Search"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onKeyDown={handleKeyDown}
        />
      </div>
      <div className={styles.users}>
        {users?.map((user) => (
          <UserCard key={user.id} user={user} />
        ))}
      </div>
      {!activeSearch && totalPages > 1 && (
        <CustomPagination
          totalPages={totalPages}
          page={page}
          onChange={(_, value) => setPage(value)}
        />
      )}
    </div>
  );
}

export default UsersBoard;
