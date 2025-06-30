import { ReactNode } from 'react';

import styles from '@/shared/components/Paragraph/Paragraph.module.css';

type ParagraphProps = {
  children: ReactNode;
  variant?: 'white' | 'dark' | 'error';
};

function Paragraph({ children, variant = 'white' }: ParagraphProps) {
  const classes = `${styles.paragraph} ${styles[variant]}`;

  return <h1 className={classes}>{children}</h1>;
}

export default Paragraph;
