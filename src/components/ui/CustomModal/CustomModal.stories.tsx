import { Button } from '@mui/material';
import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';

import CustomModal from '@/components/ui/CustomModal/CustomModal';

const meta: Meta<typeof CustomModal> = {
  title: 'UI/CustomModal',
  component: CustomModal,
  tags: ['autodocs'],
  argTypes: {
    isOpen: { control: 'boolean' },
    children: { control: false },
  },
};

export default meta;
type Story = StoryObj<typeof CustomModal>;

export const Default: Story = {
  render: () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
      <>
        <Button onClick={() => setIsOpen(true)}>Open Modal</Button>
        <CustomModal isOpen={isOpen}>
          <div style={{ padding: '20px', textAlign: 'center' }}>
            <h2>Modal Content</h2>
            <Button onClick={() => setIsOpen(false)}>Close</Button>
          </div>
        </CustomModal>
      </>
    );
  },
};
