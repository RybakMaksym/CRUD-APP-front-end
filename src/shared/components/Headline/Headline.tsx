import { ReactNode } from 'react';

import styles from '@/shared/components/Headline/Headline.module.css';

type HeadlineProps = {
  children: ReactNode;
  size?: '45px' | '35px' | '32px';
  variant?: 'white' | 'dark';
};

const sizeMap = {
  '45px': styles.size45,
  '35px': styles.size35,
  '32px': styles.size32,
} as const;

function Headline({
  children,
  size = '45px',
  variant = 'white',
}: HeadlineProps) {
  const sizeClass = sizeMap[size] ?? styles.size45;

  const variantClass = variant === 'dark' ? styles.dark : '';

  return (
    <h1 className={`${styles.headline} ${sizeClass} ${variantClass}`}>
      {children}
    </h1>
  );
}

export default Headline;
