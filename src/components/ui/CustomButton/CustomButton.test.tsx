import { fireEvent, render, screen } from '@testing-library/react';

import CustomButton from '@/components/ui/CustomButton/CustomButton';

describe('CustomButton', () => {
  it('should render button with children', () => {
    render(<CustomButton>Click me</CustomButton>);
    const button = screen.getByRole('button', { name: /click me/i });

    expect(button).toBeInTheDocument();
  });

  it('should apply red background by default', () => {
    render(<CustomButton>Red Button</CustomButton>);
    const button = screen.getByRole('button', { name: /red button/i });

    expect(button).toHaveStyle('background-color: var(--color-red)');
    expect(button).toHaveStyle('color: var(--color-white)');
  });

  it('should apply green background when specified', () => {
    render(<CustomButton background="green">Green Button</CustomButton>);
    const button = screen.getByRole('button', { name: /green button/i });

    expect(button).toHaveStyle('background-color: var(--color-green)');
    expect(button).toHaveStyle('color: var(--color-black)');
  });

  it('should call onClick handler when clicked', () => {
    const onClick = jest.fn();

    render(<CustomButton onClick={onClick}>Click me</CustomButton>);
    const button = screen.getByRole('button', { name: /click me/i });
    fireEvent.click(button);

    expect(onClick).toHaveBeenCalledTimes(1);
  });
});
