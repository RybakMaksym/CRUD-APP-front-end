import NotificationButton from '@/components/features/NotificationButton/NotificationButton';
import ProfilesBoard from '@/components/features/ProfilesBoard/ProfilesBoard';
import styles from '@/styles/profiles-users-page.module.scss';

function ProfilesPage() {
  return (
    <div className={styles.container}>
      <div className={styles.notifications}>
        <NotificationButton />
      </div>
      <ProfilesBoard />
    </div>
  );
}

export default ProfilesPage;
