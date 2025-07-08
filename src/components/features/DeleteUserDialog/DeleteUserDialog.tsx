'use client';

import { Dialog, DialogActions } from '@mui/material';

import styles from '@/components/features/DeleteUserDialog/DeleteUserDialog.module.scss';
import CustomButton from '@/components/ui/CustomButton/CustomButton';
import Paragraph from '@/components/ui/Paragraph/Paragraph';

type DeleteUserDialogProps = {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
};

function DeleteUserDialog({ open, onClose, onConfirm }: DeleteUserDialogProps) {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      PaperProps={{
        className: styles.dialog,
      }}
    >
      <Paragraph color="dark">Are you sure you want to delete user?</Paragraph>
      <DialogActions className={styles.actions}>
        <CustomButton background="green" onClick={onConfirm}>
          Yes
        </CustomButton>
        <CustomButton background="red" onClick={onClose}>
          No
        </CustomButton>
      </DialogActions>
    </Dialog>
  );
}

export default DeleteUserDialog;
