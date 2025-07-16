import { ReactNode } from 'react';

import AuthRoute from '@/components/guards/AuthRoute';
import styles from '@/styles/auth-pages.module.scss';

type AuthFormsLayoutProps = {
  children: ReactNode;
};

function AuthFormsLayout(props: AuthFormsLayoutProps) {
  return (
    <div className={styles.container}>
      <AuthRoute>{props.children}</AuthRoute>
    </div>
  );
}

export default AuthFormsLayout;
