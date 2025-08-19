'use client';

import { useTranslation } from 'react-i18next';

import styles from '@/components/features/StatsBoard/StatsBoard.module.scss';
import StatsBox from '@/components/features/StatsBox/StatsBox';
import Headline from '@/components/ui/Headline/Headline';

function StatsBoard() {
  const { t } = useTranslation();

  return (
    <div className={styles.board}>
      <Headline color="dark">{t('dashboard')}</Headline>

      <StatsBox />
    </div>
  );
}

export default StatsBoard;
