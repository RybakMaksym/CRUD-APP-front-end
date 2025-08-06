import { configureStore } from '@reduxjs/toolkit';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';

import ProfileCard from '@/components/ui/ProfileCard/ProfileCard';
import { Gender } from '@/enums/gender';
import { Role } from '@/enums/role';
import { DEFAULT_AVATAR } from '@/lib/constants/avatar';
import { formatDateToDots } from '@/lib/helpers/format-date';
import { userReducer } from '@/redux/user/user-slice';
import type { IProfile } from '@/types/profile';

const mockProfile: IProfile = {
  id: '1',
  name: 'John Doe',
  gender: Gender.Male,
  birthDate: new Date('1990-05-15'),
  country: 'USA',
  city: 'New York',
  avatarUrl: undefined,
  ownerId: 'user1',
};

function renderWithRedux(ui: React.ReactElement) {
  const store = configureStore({
    reducer: {
      user: userReducer,
    },
    preloadedState: {
      user: {
        username: 'admin',
        avatarUrl: '',
        id: 'admin1',
        role: Role.ADMIN,
      },
    },
  });

  return render(<Provider store={store}>{ui}</Provider>);
}

describe('ProfileCard', () => {
  it('should render profile data correctly', () => {
    renderWithRedux(<ProfileCard profile={mockProfile} />);
    const avatar = screen.getByAltText('Profile avatar') as HTMLImageElement;

    expect(screen.getByText('John Doe')).toBeInTheDocument();
    expect(screen.getByText('male')).toBeInTheDocument();
    expect(
      screen.getByText(formatDateToDots(mockProfile.birthDate)),
    ).toBeInTheDocument();
    expect(screen.getByText('USA')).toBeInTheDocument();
    expect(screen.getByText('New York')).toBeInTheDocument();
    expect(avatar).toBeInTheDocument();
    expect(decodeURIComponent(avatar.src)).toContain(DEFAULT_AVATAR);
  });

  it('should render buttons', () => {
    renderWithRedux(<ProfileCard profile={mockProfile} />);

    expect(screen.getByText(/edit/i)).toBeInTheDocument();
    expect(screen.getByText(/delete/i)).toBeInTheDocument();
  });
});
