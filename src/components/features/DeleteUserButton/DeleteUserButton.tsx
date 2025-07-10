'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';

import CustomButton from '@/components/ui/CustomButton/CustomButton';
import CustomDialog from '@/components/ui/CustomDialog/CustomDialog';
import { PAGES_URL } from '@/enums/pages-url';
import { useAppDispatch } from '@/hooks/use-app-dipatch';
import { useDeleteUserByIdMutation, userApi } from '@/redux/user/user-api';

type DeleteUserButtonProps = {
  userId: string;
};

function DeleteUserButton({ userId }: DeleteUserButtonProps) {
  const [deleteUser] = useDeleteUserByIdMutation();
  const dispatch = useAppDispatch();
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);

  const handleDelete = async () => {
    const res = await deleteUser(userId);

    if (res.data) {
      dispatch(
        userApi.util.updateQueryData('usersList', undefined, (draft) =>
          draft.filter((user) => user._id !== userId),
        ),
      );
      router.replace(PAGES_URL.USERS);
    }

    setIsOpen(false);
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
