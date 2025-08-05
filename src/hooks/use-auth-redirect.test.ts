import { renderHook } from '@testing-library/react';
import { useRouter } from 'next/navigation';

import { PAGES_URL } from '@/enums/pages-url';
import { useAppSelector } from '@/hooks/use-app-selector';
import { useAuthRedirect } from '@/hooks/use-auth-redirect';
import authSelectors from '@/redux/auth/auth-selectors';

jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
}));

jest.mock('@/hooks/use-app-selector', () => ({
  useAppSelector: jest.fn(),
}));

jest.mock('@/redux/auth/auth-selectors', () => ({
  getAccessToken: jest.fn(),
}));

describe('useAuthRedirect', () => {
  const mockReplace = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    (useRouter as jest.Mock).mockReturnValue({ replace: mockReplace });
  });

  it('should return accessToken and not redirect if accessToken is present', () => {
    (authSelectors.getAccessToken as jest.Mock).mockReturnValue('mocked-token');
    (useAppSelector as jest.Mock).mockReturnValue('mocked-token');

    const { result } = renderHook(() => useAuthRedirect());

    expect(result.current).toBe('mocked-token');
    expect(mockReplace).not.toHaveBeenCalled();
  });

  it('should redirect to default page if accessToken is not present', () => {
    (authSelectors.getAccessToken as jest.Mock).mockReturnValue(undefined);
    (useAppSelector as jest.Mock).mockReturnValue(undefined);

    renderHook(() => useAuthRedirect());

    expect(mockReplace).toHaveBeenCalledWith(PAGES_URL.LOG_IN);
  });

  it('should redirect to custom path if accessToken is not present and custom path is provided', () => {
    const customPath = PAGES_URL.NOT_FROUND;
    (authSelectors.getAccessToken as jest.Mock).mockReturnValue(undefined);
    (useAppSelector as jest.Mock).mockReturnValue(undefined);

    renderHook(() => useAuthRedirect(customPath));

    expect(mockReplace).toHaveBeenCalledWith(customPath);
  });
});
