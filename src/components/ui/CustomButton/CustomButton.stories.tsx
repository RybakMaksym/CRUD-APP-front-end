import type { Meta, StoryObj } from '@storybook/react';

import CustomButton from '@/components/ui/CustomButton/CustomButton';

const meta: Meta<typeof CustomButton> = {
  title: 'UI/CustomButton',
  component: CustomButton,
  tags: ['autodocs'],
  argTypes: {
    background: { control: 'radio', options: ['red', 'green'] },
    disabled: { control: 'boolean' },
    children: { control: 'text' },
    onClick: { action: 'clicked' },
  },
};

export default meta;
type Story = StoryObj<typeof CustomButton>;

export const RedButton: Story = {
  args: {
    background: 'red',
    children: 'Click me',
  },
};

export const GreenButton: Story = {
  args: {
    background: 'green',
    children: 'Submit',
  },
};

export const Disabled: Story = {
  args: {
    background: 'red',
    children: 'Disabled',
    disabled: true,
  },
};

export const LargeButton: Story = {
  args: {
    background: 'green',
    children: 'Large Button',
    size: 'large',
  },
};
