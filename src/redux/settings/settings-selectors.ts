import type { RootState } from '@/redux/store';

const getUserLanguage = (state: RootState) => state.settings.language;

const settingsSelectors = {
  getUserLanguage,
};

export default settingsSelectors;
