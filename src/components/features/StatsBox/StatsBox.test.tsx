import { render, screen } from '@testing-library/react';

import StatsBox from '@/components/features/StatsBox/StatsBox';
import { STATS } from '@/lib/constants/dashboard';
import { useProfilesStatsQuery } from '@/redux/profile/profile-api';

jest.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string) => key,
  }),
}));

jest.mock('@/redux/profile/profile-api', () => ({
  useProfilesStatsQuery: jest.fn(),
}));

jest.mock('@/components/ui/Paragraph/Paragraph', () => {
  const ParagraphMock = ({ children }: any) => <div>{children}</div>;
  ParagraphMock.displayName = 'ParagraphMock';

  return ParagraphMock;
});

jest.mock('@/components/ui/StatsBar/StatsBar', () => {
  const StatsBarMock = ({ label, count }: any) => (
    <div data-testid="stats-bar">
      {label}: {count}
    </div>
  );
  StatsBarMock.displayName = 'StatsBarMock';

  return StatsBarMock;
});

jest.mock('@/redux/profile/profile-api', () => ({
  useProfilesStatsQuery: jest.fn(),
}));

const mockUseProfilesStatsQuery = useProfilesStatsQuery as jest.Mock;

describe('StatsBox', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should show loader when loading', () => {
    mockUseProfilesStatsQuery.mockReturnValue({
      isLoading: true,
      isError: false,
      data: null,
    });

    render(<StatsBox />);

    expect(screen.getByText('loading')).toBeInTheDocument();
  });

  it('should show error message when query fails', () => {
    mockUseProfilesStatsQuery.mockReturnValue({
      isLoading: false,
      isError: true,
      data: null,
    });

    render(<StatsBox />);

    expect(
      screen.getByText('Could not find any information'),
    ).toBeInTheDocument();
  });

  it('should render stats bars when data is available', () => {
    const statsData = {
      totalUsers: 5,
      totalProfiles: 3,
      totalAdults: 2,
    };
    mockUseProfilesStatsQuery.mockReturnValue({
      isLoading: false,
      isError: false,
      data: statsData,
    });

    render(<StatsBox />);
    const bars = screen.getAllByTestId('stats-bar');

    expect(bars).toHaveLength(3);
    expect(
      screen.getByText(`${STATS[0].label}: ${statsData.totalUsers}`),
    ).toBeInTheDocument();
    expect(
      screen.getByText(`${STATS[1].label}: ${statsData.totalProfiles}`),
    ).toBeInTheDocument();
    expect(
      screen.getByText(`${STATS[2].label}: ${statsData.totalAdults}`),
    ).toBeInTheDocument();
  });
});
