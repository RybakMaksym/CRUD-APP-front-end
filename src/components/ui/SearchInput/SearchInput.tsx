'use client';

import type { InputProps } from '@mui/material';
import { Input } from '@mui/material';
import Image from 'next/image';
import { useTranslation } from 'react-i18next';

import styles from '@/components/ui/SearchInput/SearchInput.module.scss';

function SearchInput({ ...props }: InputProps) {
  const { t } = useTranslation();

  return (
    <div className={styles['input-wrapper']}>
      <Image
        src={'/assets/icons/search.svg'}
        alt="search icon"
        width={16}
        height={15}
        className={styles.icon}
      />
      <Input
        disableUnderline
        className={styles.input}
        {...props}
        placeholder={t('search')}
      />
    </div>
  );
}

export default SearchInput;
