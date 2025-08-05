import { render, screen } from '@testing-library/react';
import { useRouter } from 'next/navigation';

import AuthRoute from '@/components/guards/AuthRoute';
import { PAGES_URL } from '@/enums/pages-url';
import { useAppSelector as mockUseAppSelector } from '@/hooks/use-app-selector';

jest.mock('@/hooks/use-app-selector');

jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
}));

const mockedUseAppSelector = mockUseAppSelector as jest.Mock;
const mockReplace = jest.fn();

describe('AuthRoute', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    (useRouter as jest.Mock).mockReturnValue({ replace: mockReplace });
  });

  it('should render children when user is not authenticated', () => {
    mockedUseAppSelector.mockReturnValue(null);

    render(
      <AuthRoute>
        <div>Public Content</div>
      </AuthRoute>,
    );

    expect(screen.getByText('Public Content')).toBeInTheDocument();
    expect(mockReplace).not.toHaveBeenCalled();
  });

  it('should redirect to profiles when user is authenticated', () => {
    mockedUseAppSelector.mockReturnValue('mocked-access-token');

    render(
      <AuthRoute>
        <div>Hidden Content</div>
      </AuthRoute>,
    );

    expect(screen.queryByText('Hidden Content')).not.toBeInTheDocument();
    expect(mockReplace).toHaveBeenCalledWith(PAGES_URL.PROFILES);
  });
});
