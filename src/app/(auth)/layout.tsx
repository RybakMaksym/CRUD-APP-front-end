import { ReactNode } from 'react';

import styles from '@/styles/auth-pages.module.scss';

type layoutProps = {
  children: ReactNode;
};

function layout(props: layoutProps) {
  return <div className={styles.container}>{props.children}</div>;
}

export default layout;
