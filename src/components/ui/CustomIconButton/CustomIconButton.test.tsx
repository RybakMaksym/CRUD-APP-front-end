import CustomIconButton from '@/components/ui/CustomIconButton/CustomIconButton';
import { fireEvent, render, screen } from '@testing-library/react';

describe('CustomIconButton', () => {
  const icon = '/icons/test-icon.png';

  it('should render the icon image', () => {
    render(<CustomIconButton icon={icon} />);
    const img = screen.getByAltText('notification button');

    expect(img).toBeInTheDocument();
    expect(img).toHaveAttribute(
      'src',
      expect.stringContaining('test-icon.png'),
    );
    expect(img).toHaveAttribute('width', '33');
    expect(img).toHaveAttribute('height', '33');
  });

  it('should call onClick handler when clicked', () => {
    const handleClick = jest.fn();

    render(<CustomIconButton icon={icon} onClick={handleClick} />);
    const button = screen.getByRole('button');
    fireEvent.click(button);

    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('should pass additional props to IconButton', () => {
    render(<CustomIconButton icon={icon} data-testid="custom-button" />);
    const button = screen.getByTestId('custom-button');

    expect(button).toBeInTheDocument();
  });
});
