import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

// eslint-disable-next-line no-restricted-imports
import en from '../../messages/en.json';
// eslint-disable-next-line no-restricted-imports
import uk from '../../messages/uk.json';

i18n.use(initReactI18next).init({
  resources: { en: { translation: en }, uk: { translation: uk } },
  lng: 'en',
  fallbackLng: 'en',
  interpolation: { escapeValue: false },
});

export default i18n;
