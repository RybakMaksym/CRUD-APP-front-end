import { render, screen } from '@testing-library/react';

import UserProfile from '@/components/ui/UserProfile/UserProfile';
import { useAppSelector } from '@/hooks/use-app-selector';
import { DEFAULT_AVATAR } from '@/lib/constants/avatar';

jest.mock('@/hooks/use-app-selector', () => ({
  useAppSelector: jest.fn(),
}));

describe('UserProfile', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should render the avatar and username', () => {
    (useAppSelector as jest.Mock).mockReturnValue({
      username: 'John',
      avatarUrl: '/avatars/john.png',
    });

    render(<UserProfile />);

    const avatar = screen.getByAltText('User avatar') as HTMLImageElement;
    const username = screen.getByText('John');
    expect(avatar).toBeInTheDocument();
    expect(username).toBeInTheDocument();
    expect(decodeURIComponent(avatar.src)).toContain('/avatars/john.png');
  });

  it('should render default avatar if avatarUrl is null', () => {
    (useAppSelector as jest.Mock).mockReturnValue({
      username: 'John',
      avatarUrl: null,
    });

    render(<UserProfile />);

    const avatar = screen.getByAltText('User avatar') as HTMLImageElement;
    expect(avatar).toBeInTheDocument();
    expect(decodeURIComponent(avatar.src)).toContain(DEFAULT_AVATAR);
  });

  it('should render nothing if user has no username', () => {
    (useAppSelector as jest.Mock).mockReturnValue({
      username: '',
      avatarUrl: null,
    });

    const { container } = render(<UserProfile />);

    expect(container.firstChild).toBeNull();
  });
});
