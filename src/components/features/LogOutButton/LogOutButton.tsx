'use client';

import styles from '@/components/features/LogOutButton/LogOutButton.module.scss';
import Paragraph from '@/components/ui/Paragraph/Paragraph';
import { useAppDispatch } from '@/hooks/use-app-dipatch';
import { fullLogOut } from '@/redux/actions/full-log-out';

function LogOutButton() {
  const dispatch = useAppDispatch();

  return (
    <div
      className={styles.button}
      onClick={async () => await dispatch(fullLogOut())}
    >
      <Paragraph>Log out</Paragraph>
    </div>
  );
}

export default LogOutButton;
