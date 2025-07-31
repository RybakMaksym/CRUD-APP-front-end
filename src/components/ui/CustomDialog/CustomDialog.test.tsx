import { fireEvent, render, screen } from '@testing-library/react';

import CustomDialog from '@/components/ui/CustomDialog/CustomDialog';

describe('CustomDialog', () => {
  const title = 'Are you sure?';
  const onClose = jest.fn();
  const onConfirm = jest.fn();

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should render dialog with title when open', () => {
    render(
      <CustomDialog
        title={title}
        isOpen={true}
        onClose={onClose}
        onConfirm={onConfirm}
      />,
    );

    expect(screen.getByText(title)).toBeInTheDocument();
    expect(screen.getByText('Yes')).toBeInTheDocument();
    expect(screen.getByText('No')).toBeInTheDocument();
  });

  it('should not render when isOpen is false', () => {
    render(
      <CustomDialog
        title={title}
        isOpen={false}
        onClose={onClose}
        onConfirm={onConfirm}
      />,
    );

    expect(screen.queryByText(title)).not.toBeInTheDocument();
  });

  it('should call onConfirm when Yes is clicked', () => {
    render(
      <CustomDialog
        title={title}
        isOpen={true}
        onClose={onClose}
        onConfirm={onConfirm}
      />,
    );
    fireEvent.click(screen.getByText('Yes'));

    expect(onConfirm).toHaveBeenCalledTimes(1);
    expect(onClose).not.toHaveBeenCalled();
  });

  it('should call onClose when No is clicked', () => {
    render(
      <CustomDialog
        title={title}
        isOpen={true}
        onClose={onClose}
        onConfirm={onConfirm}
      />,
    );
    fireEvent.click(screen.getByText('No'));

    expect(onClose).toHaveBeenCalledTimes(1);
    expect(onConfirm).not.toHaveBeenCalled();
  });
});
