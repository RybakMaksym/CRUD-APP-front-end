import { ReactNode } from 'react';

import styles from '@/shared/components/Paragraph/Paragraph.module.css';

type ParagraphProps = {
  children: ReactNode;
  color?: 'white' | 'dark' | 'error';
};

function Paragraph({ children, color = 'white' }: ParagraphProps) {
  const classes = `${styles.paragraph} ${styles[color]}`;

  return <h1 className={classes}>{children}</h1>;
}

export default Paragraph;
