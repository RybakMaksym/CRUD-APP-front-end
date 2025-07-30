import { render, screen } from '@testing-library/react';

import StatsBar from '@/components/ui/StatsBar/StatsBar';

describe('StatsBar', () => {
  const defaultProps = {
    icon: '/icon.svg',
    label: 'Profiles',
    count: 42,
  };

  it('renders the statistics bar', () => {
    render(<StatsBar {...defaultProps} />);

    const icon = screen.getByAltText('Profiles icon') as HTMLImageElement;
    const label = screen.getByText('Profiles');
    const count = screen.getByText('42');
    expect(icon).toBeInTheDocument();
    expect(icon.getAttribute('src')).toContain('/icon.svg');
    expect(label).toBeInTheDocument();
    expect(count).toBeInTheDocument();
  });
});
