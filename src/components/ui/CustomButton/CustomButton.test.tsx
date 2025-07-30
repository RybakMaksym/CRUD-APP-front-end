import { fireEvent, render, screen } from '@testing-library/react';

import CustomButton from '@/components/ui/CustomButton/CustomButton';

describe('CustomButton', () => {
  it('renders button with children', () => {
    render(<CustomButton>Click me</CustomButton>);

    expect(
      screen.getByRole('button', { name: /click me/i }),
    ).toBeInTheDocument();
  });

  it('applies red background by default', () => {
    render(<CustomButton>Red Button</CustomButton>);

    const button = screen.getByRole('button', { name: /red button/i });
    expect(button).toHaveStyle('background-color: var(--color-red)');
    expect(button).toHaveStyle('color: var(--color-white)');
  });

  it('applies green background when specified', () => {
    render(<CustomButton background="green">Green Button</CustomButton>);

    const button = screen.getByRole('button', { name: /green button/i });
    expect(button).toHaveStyle('background-color: var(--color-green)');
    expect(button).toHaveStyle('color: var(--color-black)');
  });

  it('calls onClick handler when clicked', async () => {
    const onClick = jest.fn();
    render(<CustomButton onClick={onClick}>Click me</CustomButton>);
    const button = screen.getByRole('button', { name: /click me/i });

    fireEvent.click(button);
    expect(onClick).toHaveBeenCalledTimes(1);
  });
});
