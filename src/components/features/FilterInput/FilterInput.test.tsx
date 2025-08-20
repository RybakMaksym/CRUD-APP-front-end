import { fireEvent, render, screen } from '@testing-library/react';

import FilterInput from '@/components/features/FilterInput/FilterInput';

jest.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string) => key.split('.')[1],
  }),
}));

describe('FilterInput', () => {
  const options = ['Kyiv', 'Lviv', 'Odessa'];
  const mockOnInputChange = jest.fn();
  const mockOnChange = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should render input with placeholder', () => {
    render(
      <FilterInput
        options={options}
        inputValue=""
        onInputChange={mockOnInputChange}
        onChange={mockOnChange}
      />,
    );

    expect(screen.getByPlaceholderText('typeToFilter')).toBeInTheDocument();
  });

  it('should call onInputChange when typing', () => {
    render(
      <FilterInput
        options={options}
        inputValue=""
        onInputChange={mockOnInputChange}
        onChange={mockOnChange}
      />,
    );
    const input = screen.getByPlaceholderText('typeToFilter');
    fireEvent.change(input, { target: { value: 'Ky' } });

    expect(mockOnInputChange).toHaveBeenCalled();
    expect(mockOnInputChange.mock.calls[0][1]).toBe('Ky');
  });

  it('should show options when typing and call onChange when option is selected', () => {
    render(
      <FilterInput
        options={options}
        inputValue="Kyiv"
        onInputChange={mockOnInputChange}
        onChange={mockOnChange}
      />,
    );
    const input = screen.getByPlaceholderText('typeToFilter');
    fireEvent.focus(input);
    fireEvent.keyDown(input, { key: 'ArrowDown' });
    fireEvent.keyDown(input, { key: 'Enter' });

    expect(mockOnChange).toHaveBeenCalled();
    expect(mockOnChange.mock.calls[0][1]).toBe('Kyiv');
  });
});
