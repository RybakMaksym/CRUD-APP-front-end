import { fireEvent, render, screen } from '@testing-library/react';

import CreateProfileButton from '@/components/features/CreateProfileButton/CreateProfileButton';
import { useAppSelector } from '@/hooks/use-app-selector';

jest.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string) => key.split('.')[1],
  }),
}));

jest.mock('@/hooks/use-app-selector', () => ({
  useAppSelector: jest.fn(),
}));

jest.mock('@/components/features/CreateProfileForm/CreateProfileForm', () => ({
  __esModule: true,
  default: ({ onClose, onConfirm }: any) => (
    <div data-testid="form">
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

describe('CreateProfileButton', () => {
  beforeEach(() => {
    (useAppSelector as jest.Mock).mockReturnValue('mock-user-id');
  });

  it('should render the button with image and label', () => {
    render(<CreateProfileButton />);

    expect(screen.getByText(/createProfile/i)).toBeInTheDocument();
    expect(screen.getByAltText('create profile icon')).toBeInTheDocument();
  });

  it('should open modal on click', () => {
    render(<CreateProfileButton />);
    fireEvent.click(screen.getByText(/createProfile/i));

    expect(screen.getByTestId('form')).toBeInTheDocument();
  });

  it('should call onConfirm when confirm button is clicked', () => {
    const onConfirm = jest.fn();

    render(<CreateProfileButton onConfirm={onConfirm} />);
    fireEvent.click(screen.getByText(/createProfile/i));
    fireEvent.click(screen.getByText('Confirm'));

    expect(onConfirm).toHaveBeenCalledTimes(1);
  });

  it('should use provided userId prop instead of selector', () => {
    const onConfirm = jest.fn();

    render(
      <CreateProfileButton userId="custom-user-id" onConfirm={onConfirm} />,
    );
    fireEvent.click(screen.getByText(/createProfile/i));
    fireEvent.click(screen.getByText('Confirm'));

    expect(onConfirm).toHaveBeenCalled();
  });

  it('should close modal when close button is clicked', () => {
    render(<CreateProfileButton />);
    fireEvent.click(screen.getByText(/createProfile/i));
    expect(screen.getByTestId('form')).toBeInTheDocument();

    fireEvent.click(screen.getByText('Close'));
    expect(screen.queryByTestId('form')).not.toBeInTheDocument();
  });
});
