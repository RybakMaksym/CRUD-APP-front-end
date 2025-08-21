import { fireEvent, render, screen } from '@testing-library/react';

import SearchInput from '@/components/ui/SearchInput/SearchInput';

jest.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string) => key.split('.')[1],
  }),
}));

describe('SearchInput', () => {
  it('should render input element', () => {
    render(<SearchInput />);
    const input = screen.getByRole('textbox');
    const icon = screen.getByAltText('search icon');

    expect(input).toBeInTheDocument();
    expect(icon).toBeInTheDocument();
  });

  it('should call onChange when typing', () => {
    const handleChange = jest.fn();

    render(<SearchInput onChange={handleChange} />);
    const input = screen.getByRole('textbox');
    fireEvent.change(input, { target: { value: 'test' } });

    expect(handleChange).toHaveBeenCalledTimes(1);
  });
});
