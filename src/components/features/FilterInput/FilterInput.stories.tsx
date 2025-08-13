import type { Meta, StoryObj } from '@storybook/react';
import type { SyntheticEvent } from 'react';
import { useState } from 'react';

import FilterInput from '@/components/features/FilterInput/FilterInput';

const meta: Meta<typeof FilterInput> = {
  title: 'Features/FilterInput',
  component: FilterInput,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
};

export default meta;
type Story = StoryObj<typeof FilterInput>;

export const Default: Story = {
  render: () => {
    const [inputValue, setInputValue] = useState('');
    const options = ['Ukraine', 'USA', 'Germany', 'France', 'Canada'];

    const handleInputChange = (_: SyntheticEvent, newInputValue: string) => {
      setInputValue(newInputValue);
    };

    const handleChange = (_: SyntheticEvent, newValue: string | null) => {
      alert(`Selected: ${newValue}`);
    };

    return (
      <FilterInput
        options={options}
        inputValue={inputValue}
        onInputChange={handleInputChange}
        onChange={handleChange}
      />
    );
  },
};
