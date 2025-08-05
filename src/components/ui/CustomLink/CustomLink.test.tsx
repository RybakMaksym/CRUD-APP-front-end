import { render, screen } from '@testing-library/react';

import CustomLink from '@/components/ui/CustomLink/CustomLink';

describe('CustomLink', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should render the correct href', () => {
    render(<CustomLink href="/dashboard">Dashboard</CustomLink>);

    expect(screen.getByText('Dashboard')).toBeInTheDocument();
    expect(screen.getByRole('link')).toHaveAttribute('href', '/dashboard');
  });

  it('should render the red link when variant is not provided', () => {
    render(<CustomLink href="/dashboard">Dashboard</CustomLink>);

    expect(screen.getByText('Dashboard')).toBeInTheDocument();
    expect(screen.getByText('Dashboard')).toHaveClass('link');
    expect(screen.getByText('Dashboard')).toHaveClass('red');
  });

  it('should render the white link when variant is provided', () => {
    render(
      <CustomLink href="/dashboard" linkVariant="white">
        Dashboard
      </CustomLink>,
    );

    expect(screen.getByText('Dashboard')).toBeInTheDocument();
    expect(screen.getByText('Dashboard')).toHaveClass('link');
    expect(screen.getByText('Dashboard')).toHaveClass('white');
  });
});
