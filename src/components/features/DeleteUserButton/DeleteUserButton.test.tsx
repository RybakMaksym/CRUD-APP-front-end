import { fireEvent, render, screen, waitFor } from '@testing-library/react';

import DeleteUserButton from '@/components/features/DeleteUserButton/DeleteUserButton';
import { PAGES_URL } from '@/enums/pages-url';
import { useAppSelector } from '@/hooks/use-app-selector';

const pushMock = jest.fn();
const dispatchMock = jest.fn();

jest.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string) => key.split('.')[1],
  }),
}));

jest.mock('next/navigation', () => ({
  useRouter: () => ({ push: pushMock }),
}));

jest.mock('@/hooks/use-app-dispatch', () => ({
  useAppDispatch: () => dispatchMock,
}));

jest.mock('@/hooks/use-app-selector', () => ({
  useAppSelector: jest.fn(),
}));

jest.mock('@/redux/actions/full-log-out', () => ({
  fullLogOut: () => ({ type: 'LOGOUT' }),
}));

jest.mock('@/redux/user/user-api', () => ({
  __esModule: true,
  useDeleteUserByIdMutation: () => [
    jest.fn().mockResolvedValue({ data: true }),
    { isLoading: false },
  ],
}));

jest.mock('@/hooks/use-app-selector', () => ({
  useAppSelector: jest.fn(),
}));

jest.mock('@/components/ui/CustomDialog/CustomDialog', () => ({
  __esModule: true,
  default: ({ isOpen, onClose, onConfirm, title }: any) =>
    isOpen ? (
      <div data-testid="dialog">
        <p>{title}</p>
        <button onClick={onConfirm}>Confirm</button>
        <button onClick={onClose}>Cancel</button>
      </div>
    ) : null,
}));

describe('DeleteUserButton', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should render delete button', () => {
    render(<DeleteUserButton userId="123" />);

    expect(screen.getByText(/delete/i)).toBeInTheDocument();
  });

  it('should open confirmation dialog on click', () => {
    render(<DeleteUserButton userId="123" />);
    fireEvent.click(screen.getByText(/delete/i));

    expect(screen.getByTestId('dialog')).toBeInTheDocument();
  });

  it('should dispatch logout and redirect to /log-in if user deletes themselves', async () => {
    (useAppSelector as jest.Mock).mockReturnValue('123');

    render(<DeleteUserButton userId="123" />);
    fireEvent.click(screen.getByText(/delete/i));
    fireEvent.click(screen.getByText(/confirm/i));

    await waitFor(() => {
      expect(dispatchMock).toHaveBeenCalledWith({ type: 'LOGOUT' });
      expect(pushMock).toHaveBeenCalledWith(PAGES_URL.LOG_IN);
    });
  });

  it('should redirect to /users if user deletes someone else', async () => {
    (useAppSelector as jest.Mock).mockReturnValue('admin-id');

    render(<DeleteUserButton userId="user-id" />);
    fireEvent.click(screen.getByText(/delete/i));
    fireEvent.click(screen.getByText(/confirm/i));

    await waitFor(() => {
      expect(dispatchMock).not.toHaveBeenCalled();
      expect(pushMock).toHaveBeenCalledWith(PAGES_URL.USERS);
    });
  });
});
