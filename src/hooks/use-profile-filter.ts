import { useEffect, useState } from 'react';

import { FilterOption } from '@/enums/filter.enums';
import {
  useLazyFilterProfilesQuery,
  useLazyGetSuggestionsQuery,
} from '@/redux/profile/profile-api';

export const useProfileFilter = () => {
  const [filter, setFilter] = useState<FilterOption>(FilterOption.DEFAULT);
  const [inputValue, setInputValue] = useState('');
  const [selectedOption, setSelectedOption] = useState('');
  const [suggestions, setSuggestions] = useState<string[]>([]);

  const [
    triggerFilterProfiles,
    { data: filteredProfiles, isFetching: isFiltering, isError: isFilterError },
  ] = useLazyFilterProfilesQuery();

  const [triggerSuggestions] = useLazyGetSuggestionsQuery();

  useEffect(() => {
    if (
      (filter === FilterOption.CITY || filter === FilterOption.COUNRTY) &&
      inputValue
    ) {
      triggerSuggestions({
        field: filter,
        query: inputValue,
      }).then((res) => {
        setSuggestions(res?.data || []);
      });
    }
  }, [inputValue, filter, triggerSuggestions]);

  useEffect(() => {
    if (filter === FilterOption.AGE) {
      triggerFilterProfiles({ field: FilterOption.AGE, query: '' });
    } else if (
      (filter === FilterOption.CITY || filter === FilterOption.COUNRTY) &&
      selectedOption
    ) {
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
