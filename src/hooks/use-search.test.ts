import { act, renderHook } from '@testing-library/react';

import { useSearch } from '@/hooks/use-search';

describe('useSearch', () => {
  it('should initialize with empty searchQuery and inactive search', () => {
    const { result } = renderHook(() => useSearch());

    expect(result.current.searchQuery).toBe('');
    expect(result.current.activeSearch).toBe(false);
  });

  it('should update searchQuery when handleInputChange is called', () => {
    const { result } = renderHook(() => useSearch());

    act(() => {
      result.current.handleInputChange({
        target: {
          value: 'test query',
        },
      } as React.ChangeEvent<HTMLInputElement>);
    });

    expect(result.current.searchQuery).toBe('test query');
  });

  it('should activate search when Enter is pressed and query is not empty', () => {
    const { result } = renderHook(() => useSearch());

    act(() => {
      result.current.handleInputChange({
        target: {
          value: 'test query',
        },
      } as React.ChangeEvent<HTMLInputElement>);
    });

    act(() => {
      result.current.handleKeyDown({
        key: 'Enter',
      } as React.KeyboardEvent<HTMLInputElement>);
    });

    expect(result.current.searchQuery).toBe('test query');
    expect(result.current.activeSearch).toBe(true);
  });

  it('should not activate search when Enter is pressed and query is empty', () => {
    const { result } = renderHook(() => useSearch());

    act(() => {
      result.current.handleKeyDown({
        key: 'Enter',
      } as React.KeyboardEvent<HTMLInputElement>);
    });

    expect(result.current.searchQuery).toBe('');
    expect(result.current.activeSearch).toBe(false);
  });

  it('should deactivate search if searchQuery becomes empty (via useEffect)', () => {
    const { result } = renderHook(() => useSearch());

    act(() => {
      result.current.setSearchQuery('some');
    });
    act(() => {
      result.current.handleKeyDown({ key: 'Enter' } as any);
    });
    expect(result.current.activeSearch).toBe(true);

    act(() => {
      result.current.setSearchQuery('   ');
    });
    expect(result.current.activeSearch).toBe(false);
  });
});
