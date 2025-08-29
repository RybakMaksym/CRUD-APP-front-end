import { fireEvent, render, screen, waitFor } from '@testing-library/react';

import DeleteProfileButton from '@/components/features/DeleteProfileButton/DeleteProfileButton';

jest.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string) => key.split('.')[1],
  }),
}));

jest.mock('@/redux/profile/profile-api', () => ({
  useDeleteProfileByIdMutation: () => [
    jest.fn().mockResolvedValue({ data: true }),
    { isLoading: false },
  ],
}));

jest.mock('@/components/ui/CustomDialog/CustomDialog', () => ({
  __esModule: true,
  default: ({ title, isOpen, onClose, onConfirm }: any) =>
    isOpen ? (
      <div data-testid="dialog">
        <p>{title}</p>
        <button onClick={onConfirm}>Confirm</button>
        <button onClick={onClose}>Cancel</button>
      </div>
    ) : null,
}));

describe('DeleteProfileButton', () => {
  it('should render delete button', () => {
    render(<DeleteProfileButton profileId="123" />);

    expect(screen.getByText(/delete/i)).toBeInTheDocument();
  });

  it('should open dialog on button click', () => {
    render(<DeleteProfileButton profileId="123" />);
    fireEvent.click(screen.getByText(/delete/i));

    expect(screen.getByTestId('dialog')).toBeInTheDocument();
  });

  it('should call delete and onConfirm when confirmed', async () => {
    const onConfirm = jest.fn();

    render(<DeleteProfileButton profileId="123" onConfirm={onConfirm} />);
    fireEvent.click(screen.getByText(/delete/i));
    fireEvent.click(screen.getByText(/confirm/i));

    await waitFor(() => {
      expect(onConfirm).toHaveBeenCalledTimes(1);
    });
  });
});
