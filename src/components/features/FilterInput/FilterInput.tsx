'use client';

import { Autocomplete, TextField } from '@mui/material';
import type { SyntheticEvent } from 'react';
import { useTranslation } from 'react-i18next';

import CustomPopper from '@/components/ui/CustomPopper/CustomPopper';

type FilterInputProps = {
  options: string[];
  inputValue: string;
  onInputChange: (event: SyntheticEvent, newInputValue: string) => void;
  onChange: (event: SyntheticEvent, newValue: string | null) => void;
};

function FilterInput({
  options,
  inputValue,
  onInputChange,
  onChange,
}: FilterInputProps) {
  const { t } = useTranslation();

  return (
    <Autocomplete
      freeSolo
      disableClearable
      options={options}
      inputValue={inputValue}
      onInputChange={onInputChange}
      onChange={onChange}
      size="small"
      sx={{
        width: 250,
        '& .MuiInputBase-root': {
          color: 'var(--color-white)',
          backgroundColor: 'var(--color-black)',
          borderRadius: '8px',
          fontSize: 'var(--font-sub-body)',
          paddingRight: '8px',
        },
        '& .MuiOutlinedInput-notchedOutline': {
          border: 'none',
        },
        '& .MuiAutocomplete-popupIndicator': {
          color: 'var(--color-white)',
        },
        '& .MuiAutocomplete-clearIndicator': {
          display: 'none',
        },
      }}
      renderInput={(params) => (
        <TextField
          {...params}
          placeholder={t('profilesPage.typeToFilter')}
          variant="outlined"
          InputProps={{
            ...params.InputProps,
            style: {
              padding: '4px 8px',
            },
          }}
        />
      )}
      PopperComponent={CustomPopper}
      componentsProps={{
        paper: {
          sx: {
            backgroundColor: 'var(--color-black)',
            color: 'var(--color-white)',
            fontSize: 'var(--font-sub-body)',
            '& .MuiAutocomplete-option': {
              padding: '8px 12px',
              '&[aria-selected="true"]': {
                backgroundColor: 'rgba(255, 255, 255, 0.08)',
              },
              '&:hover': {
                backgroundColor: 'rgba(255, 255, 255, 0.1)',
              },
            },
          },
        },
      }}
    />
  );
}

export default FilterInput;
