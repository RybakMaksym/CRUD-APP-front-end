import type { SelectChangeEvent } from '@mui/material';
import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';

import FilterSelect from '@/components/ui/FilterSelect/FilterSelect';
import { FilterOption } from '@/enums/filter';

const meta: Meta<typeof FilterSelect> = {
  title: 'UI/FilterSelect',
  component: FilterSelect,
  tags: ['autodocs'],
  argTypes: {
    value: { control: 'object' },
    onChange: { action: 'selected' },
  },
};

export default meta;
type Story = StoryObj<typeof FilterSelect>;

export const Default: Story = {
  render: () => {
    const [value, setValue] = useState<FilterOption>(FilterOption.DEFAULT);

    const handleChange = (e: SelectChangeEvent) => {
      setValue(e.target.value as FilterOption);
    };

    return <FilterSelect value={value} onChange={handleChange} />;
  },
};
