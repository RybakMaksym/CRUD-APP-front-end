import { render, screen } from '@testing-library/react';

import StatsBoard from '@/components/features/StatsBoard/StatsBoard';

jest.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string) => key,
  }),
}));

jest.mock('@/components/features/StatsBox/StatsBox', () => {
  const MockComponent = () => <div data-testid="StatsBox" />;
  MockComponent.displayName = 'MockUserProfile';

  return MockComponent;
});

describe('StatsBoard', () => {
  it('should render headline and StatsBox', () => {
    render(<StatsBoard />);

    expect(screen.getByText(/dashboard/i)).toBeInTheDocument();
    expect(screen.getByTestId('StatsBox')).toBeInTheDocument();
  });
});
