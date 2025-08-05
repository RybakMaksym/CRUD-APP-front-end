'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';

import CustomButton from '@/components/ui/CustomButton/CustomButton';
import CustomDialog from '@/components/ui/CustomDialog/CustomDialog';
import { PAGES_URL } from '@/enums/pages-url';
import { useAppDispatch } from '@/hooks/use-app-dispatch';
import { useAppSelector } from '@/hooks/use-app-selector';
import { fullLogOut } from '@/redux/actions/full-log-out';
import { useDeleteUserByIdMutation } from '@/redux/user/user-api';
import userSelectors from '@/redux/user/user-selectors';

type DeleteUserButtonProps = {
  userId: string;
};

function DeleteUserButton({ userId }: DeleteUserButtonProps) {
  const [deleteUser] = useDeleteUserByIdMutation();
  const router = useRouter();
  const adminId = useAppSelector(userSelectors.getUserId);
  const dispatch = useAppDispatch();
  const [isOpen, setIsOpen] = useState(false);

  const handleDelete = async () => {
    const res = await deleteUser(userId);

    if (res.data) {
      if (userId === adminId) {
        dispatch(fullLogOut());
        router.push(PAGES_URL.LOG_IN);
      } else {
        router.push(PAGES_URL.USERS);
      }

      setIsOpen(false);
    }
  };

  return (
    <>
      <CustomButton background="red" onClick={() => setIsOpen(true)}>
        Delete
      </CustomButton>

      <CustomDialog
        title="Are you sure you want to delete user?"
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        onConfirm={handleDelete}
      />
    </>
  );
}

export default DeleteUserButton;
