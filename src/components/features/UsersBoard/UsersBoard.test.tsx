import { render, screen } from '@testing-library/react';
import type { FC, ReactNode } from 'react';

import UsersBoard from '@/components/features/UsersBoard/UsersBoard';

const mockUseSearchUsersQuery = jest.fn();
const mockUseUsersListQuery = jest.fn();
const mockUseUsersTotalQuery = jest.fn();

let mockUseSearch: () => {
  searchQuery: string;
  activeSearch: boolean;
  handleInputChange: jest.Mock;
  handleKeyDown: jest.Mock;
};

jest.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string) => key.split('.')[1],
  }),
}));

jest.mock('@/redux/user/user-api', () => ({
  useSearchUsersQuery: (...args: any[]) => mockUseSearchUsersQuery(...args),
  useUsersListQuery: (...args: any[]) => mockUseUsersListQuery(...args),
  useUsersTotalQuery: (...args: any[]) => mockUseUsersTotalQuery(...args),
}));

jest.mock('@/hooks/use-search', () => ({
  useSearch: () => mockUseSearch(),
}));

jest.mock('@/components/ui/UserCard/UserCard', () => {
  const UserCardMock = ({ user }: any) => (
    <div data-testid="user-card">{user.username}</div>
  );
  UserCardMock.displayName = 'UserCardMock';

  return UserCardMock;
});

jest.mock('@/components/ui/Loader/Loader', () => {
  const LoaderMock = () => <div>Loading...</div>;
  LoaderMock.displayName = 'LoaderMock';

  return LoaderMock;
});

jest.mock('@/components/ui/Paragraph/Paragraph', () => {
  const ParagraphMock: FC<{ children: ReactNode }> = ({ children }) => (
    <div>{children}</div>
  );
  ParagraphMock.displayName = 'ParagraphMock';

  return ParagraphMock;
});

jest.mock('@/components/ui/CustomPagination/CustomPagination', () => {
  const PaginationMock = ({ page, totalPages, onChange }: any) => (
    <div>
      <button onClick={() => onChange({}, page + 1)}>Next Page</button>
      <span>
        Page {page} of {totalPages}
      </span>
    </div>
  );
  PaginationMock.displayName = 'PaginationMock';

  return PaginationMock;
});

describe('UsersBoard', () => {
  beforeEach(() => {
    jest.clearAllMocks();

    mockUseSearch = () => ({
      searchQuery: '',
      activeSearch: false,
      handleInputChange: jest.fn(),
      handleKeyDown: jest.fn(),
    });

    mockUseSearchUsersQuery.mockReturnValue({
      data: undefined,
      isLoading: false,
      isError: false,
    });
    mockUseUsersListQuery.mockReturnValue({
      data: undefined,
      isLoading: false,
      isError: false,
    });
    mockUseUsersTotalQuery.mockReturnValue({
      data: { total: 0 },
    });
  });

  it('should show loader while loading', () => {
    mockUseUsersListQuery.mockReturnValue({
      data: undefined,
      isLoading: true,
      isError: false,
    });
    mockUseUsersTotalQuery.mockReturnValue({
      data: { total: 5 },
    });

    render(<UsersBoard />);
    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });

  it('should show error on fetch fail', () => {
    mockUseUsersListQuery.mockReturnValue({
      data: undefined,
      isLoading: false,
      isError: true,
    });
    mockUseUsersTotalQuery.mockReturnValue({
      data: { total: 5 },
    });

    render(<UsersBoard />);
    expect(screen.getByText('couldNotFindAnyUsers')).toBeInTheDocument();
  });

  it('should show users and pagination', () => {
    const users = [
      { id: '1', username: 'User1' },
      { id: '2', username: 'User2' },
    ];
    mockUseUsersListQuery.mockReturnValue({
      data: users,
      isLoading: false,
      isError: false,
    });
    mockUseUsersTotalQuery.mockReturnValue({
      data: { total: 10 },
    });

    render(<UsersBoard />);
    expect(screen.getAllByTestId('user-card')).toHaveLength(2);
    expect(screen.getByText('Page 1 of 2')).toBeInTheDocument();
  });

  it('should render search results when activeSearch is true', () => {
    mockUseSearch = () => ({
      searchQuery: 'User',
      activeSearch: true,
      handleInputChange: jest.fn(),
      handleKeyDown: jest.fn(),
    });

    const searchedUsers = [{ id: '1', username: 'SearchedUser' }];
    mockUseSearchUsersQuery.mockReturnValue({
      data: searchedUsers,
      isLoading: false,
      isError: false,
    });

    render(<UsersBoard />);
    expect(screen.getByText('SearchedUser')).toBeInTheDocument();
  });

  it('should not render pagination during search', () => {
    mockUseSearch = () => ({
      searchQuery: 'User',
      activeSearch: true,
      handleInputChange: jest.fn(),
      handleKeyDown: jest.fn(),
    });

    mockUseSearchUsersQuery.mockReturnValue({
      data: [{ id: '1', username: 'SearchedUser' }],
      isLoading: false,
      isError: false,
    });

    render(<UsersBoard />);
    expect(screen.queryByText(/Page/)).not.toBeInTheDocument();
  });
});
