import type { Meta, StoryObj } from '@storybook/react';
import Paragraph from './Paragraph';

const meta: Meta<typeof Paragraph> = {
  title: 'UI/Paragraph',
  component: Paragraph,
  argTypes: {
    color: {
      control: { type: 'select' },
      options: ['white', 'dark', 'blue', 'error'],
    },
    size: {
      control: { type: 'select' },
      options: ['21px', '18px', '14px'],
    },
    children: {
      control: 'text',
    },
  },
  args: {
    children: 'This is a paragraph',
    color: 'white',
    size: '21px',
  },
};

export default meta;
type Story = StoryObj<typeof Paragraph>;

export const Default: Story = {};

export const BlueSmall: Story = {
  args: {
    color: 'blue',
    size: '14px',
    children: 'Blue small paragraph',
  },
};

export const ErrorLarge: Story = {
  args: {
    color: 'error',
    size: '21px',
    children: 'Error large paragraph',
  },
};
