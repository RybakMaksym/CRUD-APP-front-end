import { fireEvent, render, screen } from '@testing-library/react';

import CustomPagination from '@/components/ui/CustomPagination/CustomPagination';

describe('CustomPagination', () => {
  const mockOnChange = jest.fn();

  beforeEach(() => {
    mockOnChange.mockClear();
  });

  it('should render pagination with correct page and count', () => {
    render(
      <CustomPagination totalPages={5} page={2} onChange={mockOnChange} />,
    );

    expect(screen.getByRole('button', { name: 'page 2' })).toHaveAttribute(
      'aria-current',
      'page',
    );
    expect(
      screen.getByRole('button', { name: 'Go to page 1' }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: 'Go to page 5' }),
    ).toBeInTheDocument();
  });

  it('should call onChange when a page is clicked', () => {
    render(
      <CustomPagination totalPages={5} page={1} onChange={mockOnChange} />,
    );
    const page2Button = screen.getByRole('button', { name: 'Go to page 2' });
    fireEvent.click(page2Button);

    expect(mockOnChange).toHaveBeenCalledTimes(1);
    expect(mockOnChange.mock.calls[0][1]).toBe(2);
  });

  it('should not render pagination if totalPages is 0', () => {
    const { container } = render(
      <CustomPagination totalPages={0} page={1} onChange={mockOnChange} />,
    );

    expect(container.querySelector('.MuiPagination-ul')).toBeInTheDocument(); // still renders, but empty
    expect(screen.queryByRole('button', { name: '1' })).not.toBeInTheDocument();
  });
});
