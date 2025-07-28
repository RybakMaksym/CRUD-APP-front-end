import styles from '@/components/features/StatsBoard/StatsBoard.module.scss';
import StatsBox from '@/components/features/StatsBox/StatsBox';
import Headline from '@/components/ui/Headline/Headline';

function StatsBoard() {
  return (
    <div className={styles.board}>
      <Headline color="dark">Dashboard</Headline>

      <StatsBox />
    </div>
  );
}

export default StatsBoard;
