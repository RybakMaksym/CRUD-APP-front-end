'use client';

import Image from 'next/image';
import { useState } from 'react';

import Paragraph from '@/components/ui/Paragraph/Paragraph';
import styles from '@/components/ui/PictureInput/PictureInput.module.scss';
import { DEFAULT_AVATAR } from '@/lib/constants/avatar';

type PictureInputProps = {
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

function PictureInput({ onChange }: PictureInputProps) {
  const [preview, setPreview] = useState<string | null>(null);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
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
          accept="image/*"
          className={styles.input}
          onChange={handleChange}
        />
      </label>
      <Paragraph>Choose picture</Paragraph>
    </div>
  );
}

export default PictureInput;
