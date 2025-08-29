'use client';

import { useTranslation } from 'react-i18next';

import Paragraph from '@/components/ui/Paragraph/Paragraph';

function Loader() {
  const { t } = useTranslation();

  return <Paragraph color="dark">{t('general.loading')}</Paragraph>;
}

export default Loader;
