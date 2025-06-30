import { ReactNode } from 'react';

import styles from '@/styles/auth-pages.module.css';

type layoutProps = {
  children: ReactNode;
};

function layout(props: layoutProps) {
  return <div className={styles.container}>{props.children}</div>;
}

export default layout;
