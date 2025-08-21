'use client';

import { useTranslation } from 'react-i18next';

import styles from '@/components/features/StatsBox/StatsBox.module.scss';
import Loader from '@/components/ui/Loader/Loader';
import Paragraph from '@/components/ui/Paragraph/Paragraph';
import StatsBar from '@/components/ui/StatsBar/StatsBar';
import { STATS } from '@/lib/constants/dashboard';
import { useProfilesStatsQuery } from '@/redux/profile/profile-api';

function StatsBox() {
  const { t } = useTranslation();

  const { data: stats, isLoading, isError } = useProfilesStatsQuery();

  const FILLED_STATS = [
    {
      ...STATS[0],
      count: stats?.totalUsers,
    },
    {
      ...STATS[1],
      count: stats?.totalProfiles,
    },
    {
      ...STATS[2],
      count: stats?.totalAdults,
    },
  ];

  if (isLoading) return <Loader />;

  if (isError) {
    return (
      <Paragraph color="error">
        {t('dashboardPage.couldNotFindAnyInformation')}
      </Paragraph>
    );
  }

  return (
    <div className={styles.box}>
      {stats &&
        FILLED_STATS.map((elem) => (
          <StatsBar
            key={elem.label}
            label={t(`dashboardPage.${elem.label}`)}
            icon={elem.iconUrl}
            count={elem.count ?? 0}
          />
        ))}
    </div>
  );
}

export default StatsBox;
