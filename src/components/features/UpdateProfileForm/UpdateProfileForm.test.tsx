import { fireEvent, render, screen, waitFor } from '@testing-library/react';

import UpdateProfileForm from '@/components/features/UpdateProfileForm/UpdateProfileForm';
import { Gender } from '@/enums/gender';
import type { IProfile } from '@/types/profile';
import '@testing-library/jest-dom';

const mockOnClose = jest.fn();
const mockOnConfirm = jest.fn();

const mockUpdateProfile = jest.fn();

jest.mock('@/redux/profile/profile-api', () => ({
  useUpdateProfileByIdMutation: () => [mockUpdateProfile, { isLoading: false }],
}));

const profile: IProfile = {
  id: 'profile123',
  name: 'John Doe',
  gender: Gender.Male,
  birthDate: new Date('1990-01-01'),
  country: 'USA',
  city: 'New York',
  avatarUrl: '',
  ownerId: '1',
};

describe('UpdateProfileForm', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should render all form fields and buttons', () => {
    render(
      <UpdateProfileForm
        profile={profile}
        onClose={mockOnClose}
        onConfirm={mockOnConfirm}
      />,
    );
    const maleRadios = screen.getAllByLabelText(/Male/i);

    expect(screen.getByPlaceholderText('Name')).toBeInTheDocument();
    expect(maleRadios.length).toBeGreaterThan(0);
    expect(screen.getByLabelText(/Female/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Country')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('City')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /save/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /close/i })).toBeInTheDocument();
  });

  it('should call updateProfile and onConfirm on successful submit', async () => {
    mockUpdateProfile.mockReturnValue({
      unwrap: () => Promise.resolve({}),
    });

    render(
      <UpdateProfileForm
        profile={profile}
        onClose={mockOnClose}
        onConfirm={mockOnConfirm}
      />,
    );
    fireEvent.change(screen.getByPlaceholderText('Name'), {
      target: { value: 'Jane Doe' },
    });
    fireEvent.click(screen.getByLabelText(/Female/i));
    fireEvent.change(screen.getByPlaceholderText('Country'), {
      target: { value: 'Canada' },
    });
    fireEvent.change(screen.getByPlaceholderText('City'), {
      target: { value: 'Toronto' },
    });
    fireEvent.click(screen.getByRole('button', { name: /save/i }));

    await waitFor(() => {
      expect(mockUpdateProfile).toHaveBeenCalled();
      expect(mockOnConfirm).toHaveBeenCalled();
    });
  });

  it('should show error message from API on failed update', async () => {
    mockUpdateProfile.mockReturnValue({
      unwrap: () => Promise.reject({ data: { message: 'Update failed' } }),
    });

    render(
      <UpdateProfileForm
        profile={profile}
        onClose={mockOnClose}
        onConfirm={mockOnConfirm}
      />,
    );
    fireEvent.click(screen.getByRole('button', { name: /save/i }));

    expect(await screen.findByText('Update failed')).toBeInTheDocument();
  });
});
