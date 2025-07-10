'use client';

import { Modal } from '@mui/material';
import { ReactNode } from 'react';

import styles from '@/components/ui/CustomModal/CustomModal.module.scss';

type CustomModalProps = {
  isOpen: boolean;
  children: ReactNode;
};

function CustomModal({ isOpen, children }: CustomModalProps) {
  return (
    <Modal open={isOpen}>
      <div className={styles.overlay}>
        <div className={styles.content}>{children}</div>
      </div>
    </Modal>
  );
}

export default CustomModal;
