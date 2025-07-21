import ProfilesBoard from '@/components/features/ProfilesBoard/ProfilesBoard';
import styles from '@/styles/profiles-users-page.module.scss';

function ProfilesPage() {
  return (
    <div className={styles.container}>
      <ProfilesBoard />
    </div>
  );
}

export default ProfilesPage;
