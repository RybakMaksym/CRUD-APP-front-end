import { render, screen } from '@testing-library/react';

import ProtectedRoute from '@/components/guards/ProtectedRoute';
import { useAuthRedirect } from '@/hooks/use-auth-redirect';

jest.mock('@/hooks/use-auth-redirect');

const mockedUseAuthRedirect = useAuthRedirect as jest.Mock;

describe('ProtectedRoute', () => {
  it('should render children when accessToken is present', () => {
    mockedUseAuthRedirect.mockReturnValue('mock-token');

    render(
      <ProtectedRoute>
        <div>Protected Content</div>
      </ProtectedRoute>,
    );

    expect(screen.getByText('Protected Content')).toBeInTheDocument();
  });

  it('should return null when accessToken is missing', () => {
    mockedUseAuthRedirect.mockReturnValue(null);

    const { container } = render(
      <ProtectedRoute>
        <div>Protected Content</div>
      </ProtectedRoute>,
    );

    expect(container).toBeEmptyDOMElement();
  });
});
