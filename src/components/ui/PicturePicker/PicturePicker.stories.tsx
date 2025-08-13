import type { Meta, StoryObj } from '@storybook/react';

import PicturePicker from '@/components/ui/PicturePicker/PicturePicker';

const meta: Meta<typeof PicturePicker> = {
  title: 'UI/PicturePicker',
  component: PicturePicker,
  tags: ['autodocs'],
  argTypes: {
    labelColor: {
      control: 'radio',
      options: ['white', 'dark'],
    },
    preview: {
      control: 'text',
    },
    onChange: { action: 'changed' },
  },
  parameters: {
    layout: 'centered',
  },
};

export default meta;
type Story = StoryObj<typeof PicturePicker>;

export const Default: Story = {
  args: {
    preview: undefined,
    labelColor: 'white',
  },
  globals: {
    backgrounds: { value: 'dark' },
  },
};

export const WithPreview: Story = {
  args: {
    preview:
      'https://images.unsplash.com/photo-1503023345310-bd7c1de61c7d?w=100&h=100&fit=crop',
    labelColor: 'dark',
  },
};
