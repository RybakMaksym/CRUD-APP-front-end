'use client';

import type { SelectChangeEvent } from '@mui/material';
import { MenuItem } from '@mui/material';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

import CustomSelect from '@/components/ui/CustomSelect/CustomSelect';
import { useAppDispatch } from '@/hooks/use-app-dispatch';
import { useAppSelector } from '@/hooks/use-app-selector';
import { LANGUAGES } from '@/lib/constants/languages';
import { useUpdateSettingsMutation } from '@/redux/settings/settings-api';
import settingsSelectors from '@/redux/settings/settings-selectors';
import { setUserLanguage } from '@/redux/settings/settings-slice';
import type { Languages } from '@/types/languages';

function LanguageSelect() {
  const language = useAppSelector(settingsSelectors.getUserLanguage);
  const [selectedLanguage, setSelectedLanguage] = useState<Languages>(
    language as Languages,
  );

  const { i18n, t } = useTranslation();

  const [updateSettings] = useUpdateSettingsMutation();
  const dispatch = useAppDispatch();

  const handleChange = async (event: SelectChangeEvent) => {
    const newLang = event.target.value as Languages;
    setSelectedLanguage(newLang);
    await i18n.changeLanguage(newLang);

    const res = await updateSettings({
      language: newLang,
    });

    if (res) {
      dispatch(setUserLanguage(newLang));
    }
  };

  return (
    <CustomSelect value={selectedLanguage} onChange={handleChange}>
      {LANGUAGES.map((language) => (
        <MenuItem key={language.value} value={language.value}>
          {t(`settingsPage.${language.label}`)}
        </MenuItem>
      ))}
    </CustomSelect>
  );
}

export default LanguageSelect;
