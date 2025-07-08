import { ReactNode } from 'react';

import styles from '@/styles/auth-pages.module.scss';

type AuthFormsLayoutProps = {
  children: ReactNode;
};

function AuthFormsLayout(props: AuthFormsLayoutProps) {
  return <div className={styles.container}>{props.children}</div>;
}

export default AuthFormsLayout;
