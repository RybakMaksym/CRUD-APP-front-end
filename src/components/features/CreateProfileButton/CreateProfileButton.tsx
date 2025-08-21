'use client';

import Image from 'next/image';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

import styles from '@/components/features/CreateProfileButton/CreateProfileButton.module.scss';
import CreateProfileForm from '@/components/features/CreateProfileForm/CreateProfileForm';
import CustomModal from '@/components/ui/CustomModal/CustomModal';
import Paragraph from '@/components/ui/Paragraph/Paragraph';
import { useAppSelector } from '@/hooks/use-app-selector';
import userSelectors from '@/redux/user/user-selectors';

type CreateProfileButtonProps = {
  userId?: string;
  onConfirm?: () => void;
};

function CreateProfileButton(props: CreateProfileButtonProps) {
  const { t } = useTranslation();

  let ownerId = useAppSelector(userSelectors.getUserId);
  ownerId = props.userId ?? ownerId;

  const [isOpen, setIsOpen] = useState(false);

  const closeForm = () => setIsOpen(false);

  return (
    <>
      <div className={styles.button} onClick={() => setIsOpen(true)}>
        <Image
          src={'/assets/icons/profile icon.png'}
          alt="create profile icon"
          width={84}
          height={83}
        />
        <Paragraph>{t('profilesPage.createProfile')}</Paragraph>
      </div>
      <CustomModal isOpen={isOpen}>
        <CreateProfileForm
          onConfirm={() => {
            props.onConfirm?.();
            closeForm();
          }}
          userId={ownerId!}
          onClose={closeForm}
        />
      </CustomModal>
    </>
  );
}

export default CreateProfileButton;
