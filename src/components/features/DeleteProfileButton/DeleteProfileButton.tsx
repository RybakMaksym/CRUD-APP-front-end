'use client';

import { useState } from 'react';

import styles from '@/components/features/DeleteProfileButton/DeleteProfileButton.module.scss';
import CustomDialog from '@/components/ui/CustomDialog/CustomDialog';
import Paragraph from '@/components/ui/Paragraph/Paragraph';
import { useDeleteProfileByIdMutation } from '@/redux/profile/profile-api';

type DeleteProfileButtonProps = {
  profileId: string;
  onConfirm?: () => void;
};

function DeleteProfileButton(props: DeleteProfileButtonProps) {
  const [deleteProfile] = useDeleteProfileByIdMutation();
  const [isOpen, setIsOpen] = useState(false);

  const handleDelete = async () => {
    const res = await deleteProfile(props.profileId);

    if (res.data) {
      setIsOpen(false);
    }
  };

  return (
    <>
      <div className={styles.button} onClick={() => setIsOpen(true)}>
        <Paragraph>Delete</Paragraph>
      </div>

      <CustomDialog
        title="Are you sure you want to delete profile?"
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        onConfirm={async () => {
          props.onConfirm?.();
          await handleDelete();
        }}
      />
    </>
  );
}

export default DeleteProfileButton;
