import { useEffect, useState } from 'react';

import {
  useLazyFilterProfilesQuery,
  useLazyGetSuggestionsQuery,
} from '@/redux/profile/profile-api';
import type { FilterOption } from '@/types/filter.type';

export const useProfileFilter = () => {
  const [filter, setFilter] = useState<FilterOption>('default');
  const [inputValue, setInputValue] = useState('');
  const [selectedOption, setSelectedOption] = useState('');
  const [suggestions, setSuggestions] = useState<string[]>([]);

  const [
    triggerFilterProfiles,
    { data: filteredProfiles, isFetching: isFiltering, isError: isFilterError },
  ] = useLazyFilterProfilesQuery();

  const [triggerSuggestions] = useLazyGetSuggestionsQuery();

  useEffect(() => {
    if ((filter === 'city' || filter === 'country') && inputValue) {
      triggerSuggestions({ field: filter, query: inputValue }).then(
        (res: any) => {
          setSuggestions(res?.data || []);
        },
      );
    }
  }, [inputValue, filter, triggerSuggestions]);

  useEffect(() => {
    if (filter === 'age') {
      triggerFilterProfiles({ field: 'age', query: '' });
    } else if ((filter === 'city' || filter === 'country') && selectedOption) {
      triggerFilterProfiles({ field: filter, query: selectedOption });
    }
  }, [filter, selectedOption, triggerFilterProfiles]);

  return {
    filter,
    setFilter,
    filteredProfiles,
    isFiltering,
    isFilterError,
    inputValue,
    setInputValue,
    setSelectedOption,
    suggestions,
  };
};
