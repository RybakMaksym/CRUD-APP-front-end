'use client';

import Image from 'next/image';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

import Paragraph from '@/components/ui/Paragraph/Paragraph';
import styles from '@/components/ui/PicturePicker/PicturePicker.module.scss';
import {
  ALLOWED_IMAGE_TYPES,
  DEFAULT_AVATAR,
  MAX_FILE_SIZE_MB,
} from '@/lib/constants/avatar';

type PictureInputProps = {
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  preview?: string;
  labalColor?: 'white' | 'dark';
};

function PicturePicker({
  onChange,
  preview,
  labalColor = 'white',
}: PictureInputProps) {
  const { t } = useTranslation();

  const [avatarPreview, setAvatarPreview] = useState<string | undefined>(
    preview,
  );

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (file) {
      if (file.size > MAX_FILE_SIZE_MB * 1024 * 1024) {
        alert(`Image size must not exceed ${MAX_FILE_SIZE_MB}MB`);

        return;
      }

      setAvatarPreview(URL.createObjectURL(file));
    }

    onChange(event);
  };

  return (
    <div className={styles.wrapper}>
      <label className={styles.label}>
        <Image
          src={avatarPreview || DEFAULT_AVATAR}
          alt="Avatar preview"
          width={100}
          height={100}
          className={styles.avatar}
        />
        <input
          type="file"
          accept={ALLOWED_IMAGE_TYPES}
          className={styles.input}
          onChange={handleChange}
          data-testid="avatar-upload"
        />
      </label>
      <Paragraph color={labalColor}>{t('general.choosePicture')}</Paragraph>
    </div>
  );
}

export default PicturePicker;
