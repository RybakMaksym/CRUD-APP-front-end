'use client';

import type { SelectChangeEvent } from '@mui/material';
import { Select } from '@mui/material';
import type { ReactNode } from 'react';
import { useState } from 'react';

type CustomSelectProps = {
  value: string;
  children: ReactNode;
  onChange: (e: SelectChangeEvent) => void;
};

function CustomSelect(props: CustomSelectProps) {
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
        minWidth: '190px',
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
            minWidth: '190px',
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
      {props.children}
    </Select>
  );
}

export default CustomSelect;
