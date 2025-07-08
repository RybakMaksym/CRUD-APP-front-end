import Link from 'next/link';
import { ReactNode } from 'react';

import styles from '@/components/ui/CustomLink/CustomLink.module.scss';

type CustomLinkProps = {
  href: string;
  children: ReactNode;
  linkVariant?: 'white' | 'red';
};

function CustomLink({ href, linkVariant = 'red', children }: CustomLinkProps) {
  const classes = `${styles.link} ${styles[linkVariant]}`;

  return (
    <Link className={classes} href={href}>
      {children}
    </Link>
  );
}

export default CustomLink;
