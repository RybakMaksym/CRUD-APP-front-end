import type { InputProps } from '@mui/material';
import { Input } from '@mui/material';
import Image from 'next/image';

import styles from '@/components/ui/SearchInput/SearchInput.module.scss';

function SearchInput({ ...props }: InputProps) {
  return (
    <div className={styles['input-wrapper']}>
      <Image
        src={'/assets/icons/search.svg'}
        alt="search icon"
        width={16}
        height={15}
        className={styles.icon}
      />
      <Input disableUnderline className={styles.input} {...props} />
    </div>
  );
}

export default SearchInput;
