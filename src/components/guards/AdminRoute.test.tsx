import { render, screen } from '@testing-library/react';
import { useRouter } from 'next/navigation';

import AdminRoute from '@/components/guards/AdminRoute';
import { PAGES_URL } from '@/enums/pages-url';
import { Role } from '@/enums/role';
import * as useAppSelectorModule from '@/hooks/use-app-selector';

jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
}));

jest.mock('@/hooks/use-app-selector');

describe('AdminRoute', () => {
  const mockReplace = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    (useRouter as jest.Mock).mockReturnValue({ replace: mockReplace });
  });

  it('should render children if user is admin', () => {
    jest
      .spyOn(useAppSelectorModule, 'useAppSelector')
      .mockReturnValue(Role.ADMIN);

    render(
      <AdminRoute>
        <div>Admin Content</div>
      </AdminRoute>,
    );

    expect(screen.getByText('Admin Content')).toBeInTheDocument();
    expect(mockReplace).not.toHaveBeenCalled();
  });

  it('should redirect to NOT_FOUND page if user is not admin', () => {
    jest
      .spyOn(useAppSelectorModule, 'useAppSelector')
      .mockReturnValue(Role.USER);

    render(
      <AdminRoute>
        <div>Should Not Be Visible</div>
      </AdminRoute>,
    );

    expect(screen.queryByText('Should Not Be Visible')).not.toBeInTheDocument();
    expect(mockReplace).toHaveBeenCalledWith(PAGES_URL.NOT_FROUND);
  });
});
