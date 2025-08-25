'use client';

import { useState } from 'react';

import UpdateUserForm from '@/components/features/UpdateUserForm/UpdateUserForm';
import CustomButton from '@/components/ui/CustomButton/CustomButton';
import CustomModal from '@/components/ui/CustomModal/CustomModal';
import type { IUser } from '@/types/user';

type UpdateUserButtonProps = {
  user: IUser;
};

function UpdateUserButton({ user }: UpdateUserButtonProps) {
  const [isOpen, setIsOpen] = useState(false);

  const closeForm = () => setIsOpen(false);

  return (
    <>
      <CustomButton background="green" onClick={() => setIsOpen(true)}>
        Edit
      </CustomButton>

      <CustomModal isOpen={isOpen}>
        <UpdateUserForm user={user} onConfirm={closeForm} onClose={closeForm} />
      </CustomModal>
    </>
  );
}

export default UpdateUserButton;
