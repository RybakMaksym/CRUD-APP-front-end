import { configureStore } from '@reduxjs/toolkit';
import { render, screen, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';

import UsersProfiles from '@/components/features/UsersProfiles/UsersProfiles';

const mockUseGetProfilesByUserIdQuery = jest.fn();

jest.mock('@/redux/profile/profile-api', () => ({
  useGetProfilesByUserIdQuery: (...args: any[]) =>
    mockUseGetProfilesByUserIdQuery(...args),
}));

jest.mock('@/components/ui/ProfileCard/ProfileCard', () => {
  const ProfileCardMock = ({ profile }: any) => (
    <div data-testid="profile-card">{profile.name}</div>
  );
  ProfileCardMock.displayName = 'ProfileCardMock';

  return ProfileCardMock;
});

jest.mock('@/components/ui/Loader/Loader', () => {
  const LoaderMock = () => <div>Loading...</div>;
  LoaderMock.displayName = 'LoaderMock';

  return LoaderMock;
});

jest.mock('@/components/ui/Paragraph/Paragraph', () => {
  const ParagraphMock = ({ children }: { children: React.ReactNode }) => (
    <div>{children}</div>
  );
  ParagraphMock.displayName = 'ParagraphMock';

  return ParagraphMock;
});

jest.mock(
  '@/components/features/CreateProfileButton/CreateProfileButton',
  () => {
    return function CreateProfileButtonMock() {
      return <div data-testid="create-profile-button" />;
    };
  },
);

jest.mock(
  '@/components/features/InfinityScrollWrapper/InfinityScrollWrapper',
  () => {
    return function InfinityScrollWrapperMock({
      children,
    }: {
      children: React.ReactNode;
    }) {
      return <div data-testid="infinity-wrapper">{children}</div>;
    };
  },
);

const renderWithProvider = (ui: React.ReactElement) => {
  const store = configureStore({ reducer: () => ({}) });

  return render(<Provider store={store}>{ui}</Provider>);
};

describe('UsersProfiles', () => {
  const userId = 'user123';

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should render profiles and create profile button', async () => {
    mockUseGetProfilesByUserIdQuery.mockReturnValue({
      data: {
        data: [
          { id: '1', name: 'Profile1' },
          { id: '2', name: 'Profile2' },
        ],
        nextPage: null,
      },
      isLoading: false,
      isError: false,
    });

    renderWithProvider(<UsersProfiles userId={userId} />);

    await waitFor(() => {
      expect(screen.getAllByTestId('profile-card')).toHaveLength(2);
    });
    expect(screen.getByText('Profile1')).toBeInTheDocument();
    expect(screen.getByText('Profile2')).toBeInTheDocument();
    expect(screen.getByTestId('create-profile-button')).toBeInTheDocument();
    expect(screen.getByTestId('infinity-wrapper')).toBeInTheDocument();
  });

  it('should not render duplicate profiles', async () => {
    mockUseGetProfilesByUserIdQuery.mockReturnValue({
      data: {
        data: [
          { id: '1', name: 'Profile1' },
          { id: '2', name: 'Profile2' },
        ],
        nextPage: null,
      },
      isLoading: false,
      isError: false,
    });

    renderWithProvider(<UsersProfiles userId={userId} />);

    await waitFor(() => {
      expect(screen.getAllByTestId('profile-card')).toHaveLength(2);
    });
  });
});
