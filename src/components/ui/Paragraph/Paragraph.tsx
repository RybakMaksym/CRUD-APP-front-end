import type { ReactNode } from 'react';

import styles from '@/components/ui/Paragraph/Paragraph.module.scss';

type ParagraphProps = {
  children: ReactNode;
  color?: 'white' | 'dark' | 'error';
  size?: '21px' | '18px';
};

const sizeMap = {
  '21px': styles.size21,
  '18px': styles.size18,
} as const;

function Paragraph({
  children,
  color = 'white',
  size = '21px',
}: ParagraphProps) {
  const sizeClass = sizeMap[size] ?? styles.size21;
  const classes = `${styles.paragraph} ${styles[color]} ${sizeClass}`;

  return <h1 className={classes}>{children}</h1>;
}

export default Paragraph;
