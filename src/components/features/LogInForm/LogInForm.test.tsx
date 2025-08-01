import { fireEvent, render, screen, waitFor } from '@testing-library/react';

import LogInForm from '@/components/features/LogInForm/LogInForm';
import { PAGES_URL } from '@/enums/pages-url';

const mockLogIn = jest.fn();
const mockPush = jest.fn();
const mockDispatch = jest.fn();

jest.mock('@/redux/auth/authorization-api', () => ({
  useLogInMutation: () => [mockLogIn, {}],
}));

jest.mock('next/navigation', () => ({
  useRouter: () => ({ push: mockPush }),
}));

jest.mock('@/redux/actions/full-log-in', () => ({
  fullLogIn: (data: any) => ({ type: 'FULL_LOG_IN', payload: data }),
}));

jest.mock('@/hooks/use-app-dispatch', () => ({
  useAppDispatch: () => mockDispatch,
}));

describe('LogInForm', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should render email, password inputs and submit button', () => {
    render(<LogInForm title="Log In" />);

    expect(screen.getByPlaceholderText('email')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('password')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /submit/i })).toBeInTheDocument();
  });

  it('should display error message on failed login', async () => {
    mockLogIn.mockReturnValue({
      unwrap: () =>
        Promise.reject({ data: { message: 'Invalid credentials' } }),
    });

    render(<LogInForm title="Log In" />);
    fireEvent.change(screen.getByPlaceholderText('email'), {
      target: { value: 'test@mail.com' },
    });
    fireEvent.change(screen.getByPlaceholderText('password'), {
      target: { value: 'wrongpass' },
    });
    fireEvent.click(screen.getByRole('button', { name: /submit/i }));

    expect(await screen.findByText('Invalid credentials')).toBeInTheDocument();
  });

  it('should call logIn, dispatch and redirect on success', async () => {
    const fakeResponse = { accessToken: 'abc', refreshToken: 'xyz' };
    mockLogIn.mockReturnValue({
      unwrap: () => Promise.resolve(fakeResponse),
    });

    render(<LogInForm title="Log In" />);
    fireEvent.change(screen.getByPlaceholderText('email'), {
      target: { value: 'test@mail.com' },
    });
    fireEvent.change(screen.getByPlaceholderText('password'), {
      target: { value: '12345678' },
    });
    fireEvent.click(screen.getByRole('button', { name: /submit/i }));

    await waitFor(() => {
      expect(mockLogIn).toHaveBeenCalledWith({
        email: 'test@mail.com',
        password: '12345678',
      });
      expect(mockDispatch).toHaveBeenCalledWith({
        type: 'FULL_LOG_IN',
        payload: fakeResponse,
      });
      expect(mockPush).toHaveBeenCalledWith(PAGES_URL.PROFILES);
    });
  });
});
