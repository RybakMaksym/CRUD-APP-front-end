'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';

import DeleteUserDialog from '@/components/features/DeleteUserDialog/DeleteUserDialog';
import CustomButton from '@/components/ui/CustomButton/CustomButton';
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
  const [open, setOpen] = useState(false);

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

    setOpen(false);
  };

  return (
    <>
      <CustomButton background="red" onClick={() => setOpen(true)}>
        Delete
      </CustomButton>

      <DeleteUserDialog
        open={open}
        onClose={() => setOpen(false)}
        onConfirm={handleDelete}
      />
    </>
  );
}

export default DeleteUserButton;
