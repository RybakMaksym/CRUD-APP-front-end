import { fireEvent, render, screen, waitFor } from '@testing-library/react';

import LogOutButton from '@/components/features/LogOutButton/LogOutButton';

const dispatchMock = jest.fn();
const logOutMock = jest.fn().mockResolvedValue(true);

jest.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string) => key,
  }),
}));

jest.mock('@/hooks/use-app-dispatch', () => ({
  useAppDispatch: () => dispatchMock,
}));

jest.mock('@/redux/actions/full-log-out', () => ({
  fullLogOut: () => ({ type: 'LOGOUT' }),
}));

jest.mock('@/redux/auth/log-out-api', () => ({
  useLogOutMutation: () => [logOutMock],
}));

describe('LogOutButton', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should render button with "Log out" text', () => {
    render(<LogOutButton />);

    expect(screen.getByText(/log-out/i)).toBeInTheDocument();
  });

  it('should call logOut and dispatch fullLogOut on click', async () => {
    render(<LogOutButton />);
    fireEvent.click(screen.getByText(/log-out/i));

    await waitFor(() => {
      expect(logOutMock).toHaveBeenCalledTimes(1);
      expect(dispatchMock).toHaveBeenCalledWith({ type: 'LOGOUT' });
    });
  });
});
