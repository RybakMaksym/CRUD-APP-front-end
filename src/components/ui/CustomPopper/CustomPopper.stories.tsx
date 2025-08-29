import { Button } from '@mui/material';
import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';

import CustomPopper from '@/components/ui/CustomPopper/CustomPopper';

const meta: Meta<typeof CustomPopper> = {
  title: 'UI/CustomPopper',
  component: CustomPopper,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof CustomPopper>;

export const Default: Story = {
  render: () => {
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
      setAnchorEl(anchorEl ? null : event.currentTarget);
    };

    const open = Boolean(anchorEl);

    return (
      <>
        <Button onClick={handleClick}>Toggle Popper</Button>
        <CustomPopper open={open} anchorEl={anchorEl} placement="bottom">
          <div style={{ padding: '10px' }}>This is a custom popper!</div>
        </CustomPopper>
      </>
    );
  },
};
