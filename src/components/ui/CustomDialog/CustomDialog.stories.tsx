import { Button } from '@mui/material';
import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';

import CustomDialog from '@/components/ui/CustomDialog/CustomDialog';

const meta: Meta<typeof CustomDialog> = {
  title: 'UI/CustomDialog',
  component: CustomDialog,
  tags: ['autodocs'],
  argTypes: {
    title: { control: 'text' },
    isOpen: { control: 'boolean' },
    onClose: { action: 'closed' },
    onConfirm: { action: 'confirmed' },
  },
};

export default meta;
type Story = StoryObj<typeof CustomDialog>;

export const Default: Story = {
  render: () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
      <>
        <Button onClick={() => setIsOpen(true)}>Open Dialog</Button>
        <CustomDialog
          title="Are you sure?"
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          onConfirm={() => setIsOpen(false)}
        />
      </>
    );
  },
};
