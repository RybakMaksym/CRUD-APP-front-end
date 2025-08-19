'use client';

import { useTranslation } from 'react-i18next';

import LanguageSelect from '@/components/features/LanguageSelect/LanguageSelect';
import styles from '@/components/features/Settings/Settings.module.scss';
import Headline from '@/components/ui/Headline/Headline';
import Paragraph from '@/components/ui/Paragraph/Paragraph';

function Settings() {
  const { t } = useTranslation();

  return (
    <div className={styles.settings}>
      <Headline color="dark">{t('settings')}</Headline>
      <div className={styles.setting}>
        <Paragraph color="dark">{t('language')}</Paragraph>
        <LanguageSelect />
      </div>
    </div>
  );
}

export default Settings;
