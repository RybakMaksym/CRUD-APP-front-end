import Notification from '@/components/ui/Notification/Notification';
import { NotificationType } from '@/enums/notification';
import type { INotification } from '@/types/notification';
import { render, screen } from '@testing-library/react';

describe('Notification', () => {
  const baseNotification: INotification = {
    id: '1',
    type: NotificationType.MADE_ADMIN,
    message: 'You were made admin',
    isNew: false,
    createdAt: new Date('2024-08-07T12:00:00.000Z'),
    ownerId: '1',
  };

  it('should render message and formatted date', () => {
    render(<Notification notification={baseNotification} />);

    expect(screen.getByText('You were made admin')).toBeInTheDocument();
    expect(screen.getByText('7 Aug 2024')).toBeInTheDocument();
  });

  it('should render correct icon for type "madeAdmin"', () => {
    render(<Notification notification={baseNotification} />);
    const icon = screen.getByRole('img');

    expect(icon).toHaveAttribute('src', expect.stringContaining('diamond.svg'));
  });

  it('should render correct icon for type "profileEdit"', () => {
    const editedNotification: INotification = {
      ...baseNotification,
      type: NotificationType.PROFILE_EDIT,
    };

    render(<Notification notification={editedNotification} />);
    const icon = screen.getByRole('img');

    expect(icon).toHaveAttribute(
      'src',
      expect.stringContaining('edit-profile.svg'),
    );
  });

  it('should render correct icon for type "profileDelete"', () => {
    const deletedNotification: INotification = {
      ...baseNotification,
      type: NotificationType.PROFILE_DELETE,
    };

    render(<Notification notification={deletedNotification} />);
    const icon = screen.getByRole('img');

    expect(icon).toHaveAttribute(
      'src',
      expect.stringContaining('delete-profile.svg'),
    );
  });

  it('should apply "new" class if notification is new', () => {
    const newNotification = {
      ...baseNotification,
      isNew: true,
    };

    const { container } = render(
      <Notification notification={newNotification} />,
    );

    expect(container.firstChild).toHaveClass('new');
  });

  it('should not apply "new" class if notification is not new', () => {
    const { container } = render(
      <Notification notification={baseNotification} />,
    );

    expect(container.firstChild).not.toHaveClass('new');
  });
});
