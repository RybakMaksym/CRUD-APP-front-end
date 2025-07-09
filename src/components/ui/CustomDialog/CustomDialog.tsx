'use client';

import { Dialog, DialogActions } from '@mui/material';

import CustomButton from '@/components/ui/CustomButton/CustomButton';
import styles from '@/components/ui/CustomDialog/CustomDialog.module.scss';
import Paragraph from '@/components/ui/Paragraph/Paragraph';

type CustomDialogProps = {
  title: string;
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
};

function CustomDialog({
  title,
  isOpen,
  onClose,
  onConfirm,
}: CustomDialogProps) {
  return (
    <Dialog
      open={isOpen}
      onClose={onClose}
      PaperProps={{
        className: styles.dialog,
      }}
    >
      <Paragraph color="dark">{title}</Paragraph>
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

export default CustomDialog;
