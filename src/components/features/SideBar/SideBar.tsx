import LogOutButton from '@/components/features/LogOutButton/LogOutButton';
import Menu from '@/components/features/Menu/Menu';
import styles from '@/components/features/SideBar/SideBar.module.scss';
import UserProfile from '@/components/ui/UserProfile/UserProfile';

function SideBar() {
  return (
    <div className={styles.sidebar}>
      <div className={styles.top}>
        <UserProfile />
        <Menu />
      </div>
      <div className={styles.buttom}>
        <LogOutButton />
      </div>
    </div>
  );
}

export default SideBar;
