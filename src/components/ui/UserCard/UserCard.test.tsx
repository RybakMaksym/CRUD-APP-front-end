import { fireEvent, render, screen } from '@testing-library/react';

import UserCard from '@/components/ui/UserCard/UserCard';
import { PAGES_URL } from '@/enums/pages-url';
import { Role } from '@/enums/role';
import { DEFAULT_AVATAR } from '@/lib/constants/avatar';
import type { IUser } from '@/types/user';

const pushMock = jest.fn();

jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: pushMock,
  }),
}));

const mockUser: IUser = {
  id: '123',
  username: 'Jane Doe',
  email: 'jane@example.com',
  role: Role.USER,
  avatarUrl: undefined,
  profiles: ['p1', 'p2'],
};

describe('UserCard', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should render the card correctly', () => {
    render(<UserCard user={mockUser} />);
    const avatar = screen.getByAltText('User avatar') as HTMLImageElement;
    const username = screen.getByText('Jane Doe');
    const email = screen.getByText('jane@example.com');
    const profilesCount = screen.getByText('2 profiles');

    expect(avatar).toBeInTheDocument();
    expect(decodeURIComponent(avatar.src)).toContain(DEFAULT_AVATAR);
    expect(username).toBeInTheDocument();
    expect(email).toBeInTheDocument();
    expect(profilesCount).toBeInTheDocument();
  });

  it('should navigate to user detail page on click', () => {
    render(<UserCard user={mockUser} />);
    const card = screen.getByText('Jane Doe').closest('div')!;
    fireEvent.click(card);

    expect(pushMock).toHaveBeenCalledWith(`${PAGES_URL.USERS}/123`);
  });
});
