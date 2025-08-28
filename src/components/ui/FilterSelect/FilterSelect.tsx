'use client';

import type { SelectChangeEvent } from '@mui/material';
import { MenuItem, Select } from '@mui/material';
import { useState } from 'react';

import type { FilterOption } from '@/enums/filter';
import { FILTERS } from '@/lib/constants/filters';

type FilterSelectProps = {
  value: FilterOption;
  onChange: (e: SelectChangeEvent) => void;
};

function FilterSelect(props: FilterSelectProps) {
  const [open, setOpen] = useState(false);

  return (
    <Select
      value={props.value}
      onChange={props.onChange}
      open={open}
      onOpen={() => setOpen(true)}
      onClose={() => setOpen(false)}
      displayEmpty
      size="small"
      sx={{
        minWidth: '140px',
        color: 'var(--color-white)',
        backgroundColor: 'var(--color-black-90)',
        fontSize: 'var(--font-sub-body)',
        borderRadius: open ? '15px 15px 0 0' : '15px',
        '& .MuiSelect-select': {
          padding: '6px 12px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        },
        '& .MuiOutlinedInput-notchedOutline': { border: 'none' },
        '& .MuiOutlinedInput-root': {
          borderRadius: '15px 15px 0 0',
          '& fieldset': {
            border: 'none !important',
          },
        },
        '& .MuiSvgIcon-root': {
          color: 'var(--color-white)',
          right: '8px',
          position: 'absolute',
        },
      }}
      MenuProps={{
        PaperProps: {
          sx: {
            minWidth: '140px',
            backgroundColor: 'var(--color-black-90)',
            borderRadius: '0 0 15px 15px',
            '& .MuiMenuItem-root': {
              color: 'var(--color-white)',
              fontSize: 'var(--font-sub-body)',
              '&:hover': {
                backgroundColor: 'var(--color-black-90)',
              },
              '&.Mui-selected': {
                backgroundColor: 'var(--color-black-90)',
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
