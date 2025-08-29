'use client';

import { Dialog, DialogActions } from '@mui/material';
import { useTranslation } from 'react-i18next';

import CustomButton from '@/components/ui/CustomButton/CustomButton';
import styles from '@/components/ui/CustomDialog/CustomDialog.module.scss';
import Paragraph from '@/components/ui/Paragraph/Paragraph';

type CustomDialogProps = {
  title: string;
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  isLoading?: boolean;
};

function CustomDialog({
  title,
  isOpen,
  onClose,
  onConfirm,
  isLoading,
}: CustomDialogProps) {
  const { t } = useTranslation();

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
        <CustomButton
          background="green"
          onClick={onConfirm}
          isLoading={isLoading}
        >
          {t('general.yes')}
        </CustomButton>
        <CustomButton background="red" onClick={onClose}>
          {t('general.no')}
        </CustomButton>
      </DialogActions>
    </Dialog>
  );
}

export default CustomDialog;
