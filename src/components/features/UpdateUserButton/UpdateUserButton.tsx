'use client';

import { useState } from 'react';

import UpdateUserDialog from '@/components/features/UpdateUserDialog/DeleteUserDialog';
import CustomButton from '@/components/ui/CustomButton/CustomButton';
import { IUser } from '@/types/user';

type UpdateUserButtonProps = {
  user: IUser;
};

function UpdateUserButton({ user }: UpdateUserButtonProps) {
  const [open, setOpen] = useState(false);

  const closeForm = () => () => setOpen(false);

  return (
    <>
      <CustomButton background="green" onClick={() => setOpen(true)}>
        Update
      </CustomButton>

      <UpdateUserDialog
        user={user}
        open={open}
        onClose={closeForm}
        onConfirm={closeForm}
      />
    </>
  );
}

export default UpdateUserButton;
