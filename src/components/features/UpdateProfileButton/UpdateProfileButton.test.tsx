import { fireEvent, render, screen } from '@testing-library/react';

import UpdateProfileButton from '@/components/features/UpdateProfileButton/UpdateProfileButton';
import { Gender } from '@/enums/gender';
import type { IProfile } from '@/types/profile';

jest.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string) => key.split('.')[1],
  }),
}));

jest.mock('@/components/features/UpdateProfileForm/UpdateProfileForm', () => ({
  __esModule: true,
  default: ({ onConfirm, onClose }: any) => (
    <div data-testid="update-form">
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

const mockProfile: IProfile = {
  id: '1',
  name: 'John',
  birthDate: new Date(),
  city: 'Kyiv',
  country: 'Ukraine',
  gender: Gender.Male,
  ownerId: 'user-123',
};

describe('UpdateProfileButton', () => {
  it('should render edit button', () => {
    render(<UpdateProfileButton profile={mockProfile} />);

    expect(screen.getByText(/edit/i)).toBeInTheDocument();
  });

  it('should open modal with form on click', () => {
    render(<UpdateProfileButton profile={mockProfile} />);
    fireEvent.click(screen.getByText(/edit/i));

    expect(screen.getByTestId('update-form')).toBeInTheDocument();
  });

  it('should call onConfirm when form confirms', () => {
    const onConfirm = jest.fn();

    render(<UpdateProfileButton profile={mockProfile} onConfirm={onConfirm} />);
    fireEvent.click(screen.getByText(/edit/i));
    fireEvent.click(screen.getByText('Confirm'));

    expect(onConfirm).toHaveBeenCalledTimes(1);
  });

  it('should close form when close is clicked', () => {
    render(<UpdateProfileButton profile={mockProfile} />);
    fireEvent.click(screen.getByText(/edit/i));
    fireEvent.click(screen.getByText('Close'));

    expect(screen.queryByTestId('update-form')).not.toBeInTheDocument();
  });
});
