import Link from 'next/link';
import { ReactNode } from 'react';

import styles from '@/components/ui/CustomLink/CustomLink.module.css';

type CustomLinkProps = {
  href: string;
  children: ReactNode;
};

function CustomLink({ href, children }: CustomLinkProps) {
  return (
    <Link className={styles.link} href={href}>
      {children}
    </Link>
  );
}

export default CustomLink;
