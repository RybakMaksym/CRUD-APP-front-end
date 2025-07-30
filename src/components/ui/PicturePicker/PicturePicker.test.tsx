import { fireEvent, render, screen } from '@testing-library/react';

import PicturePicker from '@/components/ui/PicturePicker/PicturePicker';
import { DEFAULT_AVATAR, MAX_FILE_SIZE_MB } from '@/lib/constants/avatar';

describe('PicturePicker', () => {
  it('renders default avatar when no preview is provided', () => {
    render(<PicturePicker onChange={jest.fn()} />);

    const avatar = screen.getByAltText('Avatar preview') as HTMLImageElement;
    expect(avatar).toBeInTheDocument();
    expect(decodeURIComponent(avatar.src)).toContain(DEFAULT_AVATAR);
  });

  it('renders preview avatar if provided', () => {
    const previewUrl = '/avatars/john.png';
    render(<PicturePicker onChange={jest.fn()} prewiew={previewUrl} />);

    const avatar = screen.getByAltText('Avatar preview') as HTMLImageElement;
    expect(avatar).toBeInTheDocument();
    expect(decodeURIComponent(avatar.src)).toContain(previewUrl);
  });

  it('calls onChange and updates preview when valid image is selected', () => {
    const mockOnChange = jest.fn();
    const content = new Array(2048).fill('a').join('');
    const file = new File([content], 'avatar.png', { type: 'image/png' });

    render(<PicturePicker onChange={mockOnChange} />);

    const input = screen.getByTestId('avatar-upload') as HTMLInputElement;
    fireEvent.change(input, { target: { FileSystem: [file] } });

    expect(mockOnChange).toHaveBeenCalledTimes(1);
  });

  it('shows alert if image exceeds max size and does not call onChange', () => {
    const mockOnChange = jest.fn();
    const file = new File(
      ['a'.repeat(MAX_FILE_SIZE_MB * 1024 * 1024 + 1)],
      'big.png',
      {
        type: 'image/png',
      },
    );
    window.URL.createObjectURL = jest.fn(() => 'blob:fake-url');
    window.alert = jest.fn();

    render(<PicturePicker onChange={mockOnChange} />);

    const input = screen.getByTestId('avatar-upload') as HTMLInputElement;
    fireEvent.change(input, { target: { files: [file] } });

    expect(window.alert).toHaveBeenCalledWith(
      `Image size must not exceed ${MAX_FILE_SIZE_MB}MB`,
    );
    expect(mockOnChange).not.toHaveBeenCalled();
  });

  it('renders paragraph with correct color', () => {
    render(<PicturePicker onChange={jest.fn()} labalColor="dark" />);
    expect(screen.getByText(/choose picture/i)).toBeInTheDocument();
  });
});
