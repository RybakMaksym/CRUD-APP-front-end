import { render, screen } from '@testing-library/react';
import Image from 'next/image';

import UserDetails from '@/components/features/UserDetails/UserDetails';
import { Role } from '@/enums/role';
import { Languages } from '@/types/languages';
import type { IUser } from '@/types/user';

jest.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string) => key,
  }),
}));

jest.mock('@/components/features/UpdateUserButton/UpdateUserButton', () => {
  const Component = () => <div data-testid="UpdateUserButton" />;
  Component.displayName = 'MockUpdateUserButton';

  return Component;
});

jest.mock('@/components/features/DeleteUserButton/DeleteUserButton', () => {
  const Component = () => <div data-testid="DeleteUserButton" />;
  Component.displayName = 'MockDeleteUserButton';

  return Component;
});

jest.mock('@/components/features/UsersProfiles/UsersProfiles', () => {
  const Component = () => <div data-testid="UsersProfiles" />;
  Component.displayName = 'MockUsersProfiles';

  return Component;
});

jest.mock('@/components/ui/Avatar/Avatar', () => {
  const Component = ({ src }: { src: string }) => (
    <Image
      data-testid="Avatar"
      src={src}
      alt="User avatar"
      width={50}
      height={50}
    />
  );
  Component.displayName = 'MockAvatar';

  return Component;
});

describe('UserDetails', () => {
  const user: IUser = {
    id: '123',
    username: 'John Doe',
    email: 'john@example.com',
    role: Role.USER,
    profiles: [],
    language: Languages.ENGLISH,
  };

  it('should render user info and action buttons', () => {
    render(<UserDetails user={user} />);

    expect(screen.getByText('John Doe')).toBeInTheDocument();
    expect(screen.getByText('john@example.com')).toBeInTheDocument();
    expect(screen.getByText(Role.USER)).toBeInTheDocument();
    expect(screen.getByTestId('Avatar')).toBeInTheDocument();
    expect(screen.getByTestId('UpdateUserButton')).toBeInTheDocument();
    expect(screen.getByTestId('DeleteUserButton')).toBeInTheDocument();
    expect(screen.getByTestId('UsersProfiles')).toBeInTheDocument();
    expect(screen.getByText(/profiles/i)).toBeInTheDocument();
  });
});
