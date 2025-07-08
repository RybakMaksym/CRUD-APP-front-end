'use client';

import Image from 'next/image';
import { useState } from 'react';

import Paragraph from '@/components/ui/Paragraph/Paragraph';
import styles from '@/components/ui/PicturePicker/PicturePicker.module.scss';
import {
  ALLOWED_IMAGE_TYPES,
  DEFAULT_AVATAR,
  MAX_FILE_SIZE_MB,
} from '@/lib/constants/avatar';

type PictureInputProps = {
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  prewiew?: string;
};

function PicturePicker({ onChange, prewiew }: PictureInputProps) {
  const [preview, setPreview] = useState<string | null>(prewiew ?? null);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (file) {
      if (file.size > MAX_FILE_SIZE_MB * 1024 * 1024) {
        alert(`Image size must not exceed ${MAX_FILE_SIZE_MB}MB`);

        return;
      }

      setPreview(URL.createObjectURL(file));
    }

    onChange(event);
  };

  return (
    <div className={styles.wrapper}>
      <label className={styles.label}>
        <Image
          src={preview || DEFAULT_AVATAR}
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
        />
      </label>
      <Paragraph>Choose picture</Paragraph>
    </div>
  );
}

export default PicturePicker;
