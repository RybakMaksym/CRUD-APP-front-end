import { render, screen } from '@testing-library/react';
import { usePathname } from 'next/navigation';

import MenuItem from '@/components/ui/MenuItem/MenuItem';

jest.mock('next/navigation', () => ({
  usePathname: jest.fn(),
}));

describe('MenuItem', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should render the label and icon when iconUrl is provided', () => {
    (usePathname as jest.Mock).mockReturnValue('/dashboard');

    render(
      <MenuItem
        label="Dashboard"
        path="/dashboard"
        iconUrl="/icons/dashboard.svg"
      />,
    );

    expect(screen.getByText('Dashboard')).toBeInTheDocument();
    expect(screen.getByAltText('Dashboard icon')).toBeInTheDocument();
  });

  it('should render only the label when iconUrl is not provided', () => {
    (usePathname as jest.Mock).mockReturnValue('/dashboard');

    render(<MenuItem label="Dashboard" path="/dashboard" />);

    expect(screen.getByText('Dashboard')).toBeInTheDocument();
    expect(screen.queryByRole('img')).not.toBeInTheDocument();
  });

  it('should applie active class when pathname matches the path', () => {
    (usePathname as jest.Mock).mockReturnValue('/dashboard');

    const { container } = render(
      <MenuItem label="Dashboard" path="/dashboard" />,
    );

    expect(container.firstChild).toHaveClass('active');
  });

  it('should not applies active class when pathname matches the path', () => {
    (usePathname as jest.Mock).mockReturnValue('/dashboard');

    const { container } = render(
      <MenuItem label="Dashboard" path="/profiles" />,
    );

    expect(container.firstChild).not.toHaveClass('active');
  });
});
