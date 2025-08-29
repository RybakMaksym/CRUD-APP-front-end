import type { SelectChangeEvent } from '@mui/material';
import MenuItem from '@mui/material/MenuItem';
import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';

import CustomSelect from '@/components/ui/CustomSelect/CustomSelect';
import { FilterOption } from '@/enums/filter';

const meta: Meta<typeof CustomSelect> = {
  title: 'UI/CustomSelect',
  component: CustomSelect,
  tags: ['autodocs'],
  argTypes: {
    value: { control: 'text' },
    onChange: { action: 'selected' },
  },
};

export default meta;
type Story = StoryObj<typeof CustomSelect>;

export const Default: Story = {
  render: () => {
    const [value, setValue] = useState<FilterOption>(FilterOption.DEFAULT);

    const handleChange = (e: SelectChangeEvent) => {
      setValue(e.target.value as FilterOption);
    };

    return (
      <CustomSelect value={value} onChange={handleChange}>
        <MenuItem value={FilterOption.DEFAULT}>Default</MenuItem>
        <MenuItem value={FilterOption.COUNTRY}>Country</MenuItem>
        <MenuItem value={FilterOption.CITY}>City</MenuItem>
        <MenuItem value={FilterOption.AGE}>Age</MenuItem>
      </CustomSelect>
    );
  },
};
