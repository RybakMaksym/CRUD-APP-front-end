import { MenuItem, type SelectChangeEvent } from '@mui/material';
import { fireEvent, render, screen } from '@testing-library/react';

import CustomSelect from '@/components/ui/CustomSelect/CustomSelect';
import { FilterOption } from '@/enums/filter';
import { FILTERS } from '@/lib/constants/filters';

describe('CustomSelect', () => {
  const mockOnChange = jest.fn();

  beforeEach(() => {
    mockOnChange.mockClear();
  });

  it('should render with the correct selected value', () => {
    render(
      <CustomSelect value={FilterOption.CITY} onChange={mockOnChange}>
        {FILTERS.map((filter) => (
          <MenuItem key={filter.value} value={filter.value}>
            {filter.label}
          </MenuItem>
        ))}
      </CustomSelect>,
    );
    const select = screen.getByRole('combobox');

    expect(select).toHaveTextContent(
      FILTERS.find((f) => f.value === FilterOption.CITY)?.label || '',
    );
  });

  it('should render all filter options in the dropdown', () => {
    render(
      <CustomSelect value={FilterOption.DEFAULT} onChange={mockOnChange}>
        {FILTERS.map((filter) => (
          <MenuItem key={filter.value} value={filter.value}>
            {filter.label}
          </MenuItem>
        ))}
      </CustomSelect>,
    );
    fireEvent.mouseDown(screen.getByRole('combobox'));

    FILTERS.forEach((filter) => {
      expect(screen.getAllByText(filter.label).length).toBeGreaterThan(0);
    });
  });

  it('should call onChange when an option is selected', () => {
    render(
      <CustomSelect value={FilterOption.DEFAULT} onChange={mockOnChange}>
        {FILTERS.map((filter) => (
          <MenuItem key={filter.value} value={filter.value}>
            {filter.label}
          </MenuItem>
        ))}
      </CustomSelect>,
    );
    fireEvent.mouseDown(screen.getByRole('combobox'));
    const cityOption = screen.getByText(
      FILTERS.find((f) => f.value === FilterOption.CITY)!.label,
    );
    fireEvent.click(cityOption);

    expect(mockOnChange).toHaveBeenCalledTimes(1);
    expect(
      (mockOnChange.mock.calls[0][0] as SelectChangeEvent).target.value,
    ).toBe(FilterOption.CITY);
  });
});
