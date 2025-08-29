import { fireEvent, render, screen } from '@testing-library/react';

import UpdateUserButton from '@/components/features/UpdateUserButton/UpdateUserButton';
import { Role } from '@/enums/role';
import { Languages } from '@/types/languages';
import type { IUser } from '@/types/user';

jest.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string) => key.split('.')[1],
  }),
}));

jest.mock('@/components/features/UpdateUserForm/UpdateUserForm', () => ({
  __esModule: true,
  default: ({ onConfirm, onClose }: any) => (
    <div data-testid="update-user-form">
      <button onClick={onConfirm}>Confirm</button>
      <button onClick={onClose}>Close</button>
    </div>
  ),
}));

jest.mock('@/components/ui/CustomModal/CustomModal', () => ({
  __esModule: true,
  default: ({ isOpen, children }: any) =>
    isOpen ? <div>{children}</div> : null,
}));

const mockUser: IUser = {
  id: '1',
  username: 'Alice',
  email: 'alice@example.com',
  role: Role.USER,
  profiles: [],
  language: Languages.ENGLISH,
};

describe('UpdateUserButton', () => {
  it('should render update button', () => {
    render(<UpdateUserButton user={mockUser} />);

    expect(screen.getByText(/edit/i)).toBeInTheDocument();
  });

  it('should open modal and show form after clicking update button', () => {
    render(<UpdateUserButton user={mockUser} />);
    fireEvent.click(screen.getByText(/edit/i));

    expect(screen.getByTestId('update-user-form')).toBeInTheDocument();
  });

  it('should close form after confirm', () => {
    render(<UpdateUserButton user={mockUser} />);
    fireEvent.click(screen.getByText(/edit/i));
    fireEvent.click(screen.getByText('Confirm'));

    expect(screen.queryByTestId('update-user-form')).not.toBeInTheDocument();
  });

  it('should close form after cancel/close', () => {
    render(<UpdateUserButton user={mockUser} />);
    fireEvent.click(screen.getByText(/edit/i));
    fireEvent.click(screen.getByText('Close'));

    expect(screen.queryByTestId('update-user-form')).not.toBeInTheDocument();
  });
});
