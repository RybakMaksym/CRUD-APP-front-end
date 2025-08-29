'use client';

import { useState } from 'react';
import { useTranslation } from 'react-i18next';

import styles from '@/components/features/UpdateProfileButton/UpdateProfileButton.module.scss';
import UpdateProfileForm from '@/components/features/UpdateProfileForm/UpdateProfileForm';
import CustomModal from '@/components/ui/CustomModal/CustomModal';
import Paragraph from '@/components/ui/Paragraph/Paragraph';
import type { IProfile } from '@/types/profile';

type UpdateProfileButtonProps = {
  profile: IProfile;
  onConfirm?: () => void;
};

function UpdateProfileButton(props: UpdateProfileButtonProps) {
  const { t } = useTranslation();

  const [isOpen, setIsOpen] = useState(false);
  const closeForm = () => setIsOpen(false);

  return (
    <>
      <div className={styles.button} onClick={() => setIsOpen(true)}>
        <Paragraph>{t('general.edit')}</Paragraph>
      </div>

      <CustomModal isOpen={isOpen}>
        <UpdateProfileForm
          profile={props.profile}
          onConfirm={() => {
            props.onConfirm?.();
            closeForm();
          }}
          onClose={closeForm}
        />
      </CustomModal>
    </>
  );
}

export default UpdateProfileButton;
