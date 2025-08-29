'use client';

import { useTranslation } from 'react-i18next';

import styles from '@/components/features/LogOutButton/LogOutButton.module.scss';
import Paragraph from '@/components/ui/Paragraph/Paragraph';
import { useAppDispatch } from '@/hooks/use-app-dispatch';
import { fullLogOut } from '@/redux/actions/full-log-out';
import { useLogOutMutation } from '@/redux/auth/log-out-api';

function LogOutButton() {
  const { t } = useTranslation();

  const dispatch = useAppDispatch();
  const [logOut] = useLogOutMutation();

  const logOutHandler = async () => {
    const res = await logOut();

    if (res) {
      dispatch(fullLogOut());
    }
  };

  return (
    <div className={styles.button} onClick={logOutHandler}>
      <Paragraph>{t('general.logOut')}</Paragraph>
    </div>
  );
}

export default LogOutButton;
