'use client';

import { useState } from 'react';

import styles from '@/components/features/UsersBoard/UsersBoard.module.scss';
import Headline from '@/components/ui/Headline/Headline';
import Loader from '@/components/ui/Loader/Loader';
import Paragraph from '@/components/ui/Paragraph/Paragraph';
import SearchInput from '@/components/ui/SearchInput/SearchInput';
import UserCard from '@/components/ui/UserCard/UserCard';
import { useSearchUsersQuery, useUsersListQuery } from '@/redux/user/user-api';

function UsersBoard() {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeSearch, setActiveSearch] = useState(false);

  const {
    data: allUsers,
    isLoading: isLoadingAll,
    isError: isErrorAll,
  } = useUsersListQuery(undefined, { skip: activeSearch });

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
          <UserCard key={user._id} user={user} />
        ))}
      </div>
    </div>
  );
}

export default UsersBoard;
