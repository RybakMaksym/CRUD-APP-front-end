'use client';

import { Menu } from '@mui/material';
import { useState } from 'react';

import Notifications from '@/components/features/Notifications/Notifications';
import CustomIconButton from '@/components/ui/CustomIconButton/CustomIconButton';

function NotificationButton() {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);

  return (
    <>
      <CustomIconButton
        onClick={handleOpen}
        icon="/assets/icons/notifications.png"
      />

      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        PaperProps={{
          sx: {
            borderRadius: 2,
            boxShadow: 3,
            maxHeight: 500,
            paddingTop: 1,
            overflowY: 'auto',
            backgroundColor: 'var(--color-gray)',
          },
        }}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
      >
        <Notifications />
      </Menu>
    </>
  );
}

export default NotificationButton;
