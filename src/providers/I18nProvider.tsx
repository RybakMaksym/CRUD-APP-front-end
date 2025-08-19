'use client';

import type { ReactNode } from 'react';
import { useEffect } from 'react';
import { I18nextProvider } from 'react-i18next';

import { useAppSelector } from '@/hooks/use-app-selector';
import i18n from '@/i18n/i18n';
import settingsSelectors from '@/redux/settings/settings-selectors';

export default function I18nProvider({ children }: { children: ReactNode }) {
  const userLang = useAppSelector(settingsSelectors.getUserLanguage);

  useEffect(() => {
    if (userLang) {
      i18n.changeLanguage(userLang);
    }
  }, [userLang]);

  return <I18nextProvider i18n={i18n}>{children}</I18nextProvider>;
}
