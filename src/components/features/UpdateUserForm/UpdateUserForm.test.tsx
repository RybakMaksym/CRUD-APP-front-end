import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { useRouter } from 'next/navigation';

import UpdateUserForm from '@/components/features/UpdateUserForm/UpdateUserForm';
import { Role } from '@/enums/role';
import { useUpdateUserByIdMutation } from '@/redux/user/user-api';
import type { IUser } from '@/types/user';

jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
}));

jest.mock('@/redux/user/user-api', () => ({
  useUpdateUserByIdMutation: jest.fn(),
}));

jest.mock('@/hooks/use-app-dispatch', () => ({
  useAppDispatch: () => jest.fn(),
}));

jest.mock('@/hooks/use-app-selector', () => ({
  useAppSelector: () => 'admin-id',
}));

describe('UpdateUserForm', () => {
  const user: IUser = {
    id: 'user123',
    username: 'john_doe',
    email: 'john@example.com',
    role: Role.USER,
    avatarUrl: undefined,
    profiles: [],
  };

  const mockOnClose = jest.fn();
  const mockOnConfirm = jest.fn();
  const push = jest.fn();

  beforeEach(() => {
    (useRouter as jest.Mock).mockReturnValue({ push });
  });

  it('should render all form fields and buttons', () => {
    (useUpdateUserByIdMutation as jest.Mock).mockReturnValue([jest.fn()]);

    render(
      <UpdateUserForm
        user={user}
        onClose={mockOnClose}
        onConfirm={mockOnConfirm}
      />,
    );

    expect(screen.getByPlaceholderText('username')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('email')).toBeInTheDocument();
    expect(screen.getByRole('checkbox')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /save/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /close/i })).toBeInTheDocument();
  });

  it('should submit form and redirect on success', async () => {
    const mockUpdateUser = jest.fn().mockReturnValue({
      unwrap: () =>
        Promise.resolve({
          id: 'user123',
          username: 'new',
          email: 'new@mail.com',
          role: Role.ADMIN,
        }),
    });
    (useUpdateUserByIdMutation as jest.Mock).mockReturnValue([mockUpdateUser]);

    render(
      <UpdateUserForm
        user={user}
        onClose={mockOnClose}
        onConfirm={mockOnConfirm}
      />,
    );
    fireEvent.change(screen.getByPlaceholderText('username'), {
      target: { value: 'new' },
    });
    fireEvent.change(screen.getByPlaceholderText('email'), {
      target: { value: 'new@mail.com' },
    });
    fireEvent.click(screen.getByRole('checkbox'));
    fireEvent.click(screen.getByRole('button', { name: /save/i }));

    await waitFor(() => {
      expect(mockUpdateUser).toHaveBeenCalled();
      expect(mockOnConfirm).toHaveBeenCalled();
      expect(push).toHaveBeenCalledWith('/users');
    });
  });

  it('should show error message on failed submit', async () => {
    const mockUpdateUser = jest.fn().mockReturnValue({
      unwrap: () => Promise.reject({ data: { message: 'Update failed' } }),
    });
    (useUpdateUserByIdMutation as jest.Mock).mockReturnValue([mockUpdateUser]);

    render(
      <UpdateUserForm
        user={user}
        onClose={mockOnClose}
        onConfirm={mockOnConfirm}
      />,
    );
    fireEvent.click(screen.getByRole('button', { name: /save/i }));

    await waitFor(() => {
      expect(screen.getByText('Update failed')).toBeInTheDocument();
    });
  });
});
