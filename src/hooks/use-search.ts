import { useEffect, useState } from 'react';

export const useSearch = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeSearch, setActiveSearch] = useState(false);

  useEffect(() => {
    if (!searchQuery.trim()) {
      setActiveSearch(false);
    }
  }, [searchQuery]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      setActiveSearch(!!searchQuery.trim());
    }
  };

  return {
    searchQuery,
    setSearchQuery,
    activeSearch,
    handleInputChange,
    handleKeyDown,
  };
};
