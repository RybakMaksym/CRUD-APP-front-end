import type { ReactNode } from 'react';

import styles from '@/components/ui/Headline/Headline.module.scss';

type HeadlineProps = {
  children: ReactNode;
  size?: '45px' | '35px' | '32px';
  color?: 'white' | 'dark';
};

const sizeMap = {
  '45px': styles.size45,
  '35px': styles.size35,
  '32px': styles.size32,
} as const;

function Headline({ children, size = '45px', color = 'white' }: HeadlineProps) {
  const classes = `${styles.headline} ${sizeMap[size]} ${styles[color]}`;

  return <h1 className={classes}>{children}</h1>;
}

export default Headline;
