import type { SelectChangeEvent } from '@mui/material';
import { MenuItem, Select } from '@mui/material';

import type { FilterOption } from '@/enums/filter';
import { FILTERS } from '@/lib/constants/filters';

type FilterSelectProps = {
  value: FilterOption;
  onChange: (e: SelectChangeEvent) => void;
};

function FilterSelect(props: FilterSelectProps) {
  return (
    <Select
      value={props.value}
      onChange={props.onChange}
      displayEmpty
      size="small"
      sx={{
        color: 'var(--color-white)',
        backgroundColor: 'var(--color-black)',
        fontSize: 'var(--font-sub-body)',
        padding: 0,
        opacity: 0.9,
        borderRadius: '15px',
        '& .MuiSelect-select': {
          padding: '6px 12px',
        },
        '& .MuiOutlinedInput-notchedOutline': {
          border: 'none',
        },
        '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
          border: 'none',
        },
        '& .MuiSelect-icon': {
          color: 'var(--color-white)',
        },
        '& .MuiSelect-select.MuiSelect-select': {
          backgroundColor: 'var(--color-black)',
        },
      }}
      MenuProps={{
        PaperProps: {
          sx: {
            backgroundColor: 'var(--color-black)',
            '& .MuiMenuItem-root': {
              color: 'var(--color-white)',
              backgroundColor: 'var(--color-black)',
              fontSize: 'var(--font-sub-body)',
              padding: '6px 12px',
              '&:hover': {
                backgroundColor: 'rgba(255,255,255,0.1)',
              },
              '&.Mui-selected': {
                backgroundColor: 'var(--color-black)',
              },
              '&.Mui-selected:hover': {
                backgroundColor: 'rgba(255,255,255,0.1)',
              },
            },
          },
        },
      }}
    >
      {FILTERS.map((filter) => (
        <MenuItem key={filter.value} value={filter.value}>
          {filter.label}
        </MenuItem>
      ))}
    </Select>
  );
}

export default FilterSelect;
