import Image from 'next/image';

import styles from '@/components/ui/Notification/Notification.module.scss';
import Paragraph from '@/components/ui/Paragraph/Paragraph';
import { formatDate } from '@/lib/helpers/format-date';
import type { INotification } from '@/types/notification';

type NotificationProps = {
  notification: INotification;
};

const ICONS = {
  madeAdmin: '/assets/icons/diamond.svg',
  profileEdit: '/assets/icons/edit-profile.svg',
  profileDelete: '/assets/icons/delete-profile.svg',
};

function Notification(props: NotificationProps) {
  const classes = `${styles.notification} ${props.notification.isNew && styles.new}`;

  return (
    <div className={classes}>
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
        {formatDate(props.notification.createdAt, { format: 'D Mon YYYY' })}
      </Paragraph>
    </div>
  );
}

export default Notification;
