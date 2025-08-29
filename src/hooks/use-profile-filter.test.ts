import { act, renderHook } from '@testing-library/react';

import { FilterOption } from '@/enums/filter';
import { useProfileFilter } from '@/hooks/use-profile-filter';
import {
  useLazyFilterProfilesQuery,
  useLazyGetSuggestionsQuery,
} from '@/redux/profile/profile-api';

jest.mock('@/redux/profile/profile-api', () => ({
  useLazyFilterProfilesQuery: jest.fn(),
  useLazyGetSuggestionsQuery: jest.fn(),
}));

const mockTriggerFilterProfiles = jest.fn();
const mockTriggerSuggestions = jest.fn();

describe('useProfileFilter', () => {
  beforeEach(() => {
    (useLazyFilterProfilesQuery as jest.Mock).mockReturnValue([
      mockTriggerFilterProfiles,
      { data: [], isFetching: false, isError: false },
    ]);

    (useLazyGetSuggestionsQuery as jest.Mock).mockReturnValue([
      mockTriggerSuggestions,
    ]);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should initialize with default values', () => {
    const { result } = renderHook(() => useProfileFilter());

    expect(result.current.filter).toBe(FilterOption.DEFAULT);
    expect(result.current.inputValue).toBe('');
    expect(result.current.suggestions).toEqual([]);
    expect(result.current.filteredProfiles).toEqual([]);
  });

  it('should fetch suggestions when input changes and filter is CITY', async () => {
    const mockData = ['Kyiv', 'Kharkiv'];
    mockTriggerSuggestions.mockResolvedValue({ data: mockData });

    const { result } = renderHook(() => useProfileFilter());
    act(() => {
      result.current.setFilter(FilterOption.CITY);
      result.current.setInputValue('K');
    });

    await act(async () => {
      await Promise.resolve();
    });

    expect(mockTriggerSuggestions).toHaveBeenCalledWith({
      field: FilterOption.CITY,
      query: 'K',
    });
    expect(result.current.suggestions).toEqual(mockData);
  });

  it('should trigger filtering when selectedOption is set for COUNTRY', async () => {
    const { result } = renderHook(() => useProfileFilter());
    act(() => {
      result.current.setFilter(FilterOption.COUNTRY);
      result.current.setSelectedOption('Ukraine');
    });

    expect(mockTriggerFilterProfiles).toHaveBeenCalledWith({
      field: FilterOption.COUNTRY,
      query: 'Ukraine',
    });
  });

  it('should trigger filtering immediately when AGE is selected', async () => {
    const { result } = renderHook(() => useProfileFilter());
    act(() => {
      result.current.setFilter(FilterOption.AGE);
    });

    expect(mockTriggerFilterProfiles).toHaveBeenCalledWith({
      field: FilterOption.AGE,
      query: '',
    });
  });
});
