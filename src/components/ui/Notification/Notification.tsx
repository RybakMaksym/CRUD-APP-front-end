import Image from 'next/image';

import styles from '@/components/ui/Notification/Notification.module.scss';
import Paragraph from '@/components/ui/Paragraph/Paragraph';
import { formatDateToText } from '@/lib/helpers/format-date';
import type { INotification } from '@/types/notification';

type NotificationProps = {
  notification: INotification;
};

const ICONS = {
  madeAdmin: '/assets/icons/diamond.png',
  profileEdit: '/assets/icons/edit-profile.png',
  profileDelete: '/assets/icons/delete-profile.png',
};

function Notification(props: NotificationProps) {
  return (
    <div className={styles.notification}>
      <Image
        src={ICONS[props.notification.type]}
        alt="create profile icon"
        width={17}
        height={17}
      />
      <div className={styles.message}>
        <Paragraph size="14px" color="dark">
          {props.notification.message}
        </Paragraph>
      </div>
      <div className={styles.devider}></div>
      <Paragraph size="14px" color="blue">
        {formatDateToText(props.notification.createdAt)}
      </Paragraph>
    </div>
  );
}

export default Notification;
