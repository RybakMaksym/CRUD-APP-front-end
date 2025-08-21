import { fireEvent, render, screen, waitFor } from '@testing-library/react';

import RegisterForm from '@/components/features/RegisterForm/RegisterForm';
import { PAGES_URL } from '@/enums/pages-url';

const mockRegister = jest.fn();
const mockDispatch = jest.fn();
const mockPush = jest.fn();

jest.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string) => key.split('.')[1],
  }),
}));

jest.mock('@/redux/auth/authorization-api', () => ({
  useRegisterMutation: () => [mockRegister, {}],
}));

jest.mock('@/hooks/use-app-dispatch', () => ({
  useAppDispatch: () => mockDispatch,
}));

jest.mock('next/navigation', () => ({
  useRouter: () => ({ push: mockPush }),
}));

jest.mock('@/redux/actions/full-log-in', () => ({
  fullLogIn: (data: any) => ({ type: 'FULL_LOG_IN', payload: data }),
}));

describe('RegisterForm', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should render email, password inputs, checkbox and submit button', () => {
    render(<RegisterForm title="Register" />);

    expect(screen.getByPlaceholderText('username')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('email')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('password')).toBeInTheDocument();
    expect(screen.getByRole('checkbox')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /submit/i })).toBeInTheDocument();
  });

  it('should show required validation errors on empty submit', async () => {
    render(<RegisterForm title="Register" />);
    fireEvent.click(screen.getByRole('button', { name: /submit/i }));

    expect(await screen.findAllByText('Required')).toHaveLength(3);
  });

  it('should display error message on failed register', async () => {
    mockRegister.mockReturnValue({
      unwrap: () =>
        Promise.reject({ data: { message: 'Invalid credentials' } }),
    });

    render(<RegisterForm title="Register" />);
    fireEvent.change(screen.getByPlaceholderText('username'), {
      target: { value: 'test' },
    });
    fireEvent.change(screen.getByPlaceholderText('email'), {
      target: { value: 'test@mail.com' },
    });
    fireEvent.change(screen.getByPlaceholderText('password'), {
      target: { value: 'wrongpass' },
    });
    fireEvent.click(screen.getByRole('checkbox'));
    fireEvent.click(screen.getByRole('button', { name: /submit/i }));

    expect(await screen.findByText('Invalid credentials')).toBeInTheDocument();
  });

  it('should call register, dispatch and redirect on success', async () => {
    const fakeResponse = { accessToken: 'token', refreshToken: 'refresh' };
    mockRegister.mockReturnValue({
      unwrap: () => Promise.resolve(fakeResponse),
    });

    render(<RegisterForm title="Register" />);
    fireEvent.change(screen.getByPlaceholderText('username'), {
      target: { value: 'JohnDoe' },
    });
    fireEvent.change(screen.getByPlaceholderText('email'), {
      target: { value: 'john@example.com' },
    });
    fireEvent.change(screen.getByPlaceholderText('password'), {
      target: { value: '12345678' },
    });
    fireEvent.click(screen.getByRole('checkbox'));
    fireEvent.click(screen.getByRole('button', { name: /submit/i }));

    await waitFor(() => {
      expect(mockRegister).toHaveBeenCalled();
      expect(mockDispatch).toHaveBeenCalledWith({
        type: 'FULL_LOG_IN',
        payload: fakeResponse,
      });
      expect(mockPush).toHaveBeenCalledWith(PAGES_URL.PROFILES);
    });
  });
});
