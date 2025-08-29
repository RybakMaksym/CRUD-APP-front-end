import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';

import { Languages } from '@/types/languages';
import type { ISettingsState } from '@/types/settings';

const initialState: ISettingsState = {
  language: Languages.ENGLISH,
};

const settingsSlice = createSlice({
  name: 'settings',
  initialState,
  reducers: {
    setUserLanguage(state, action: PayloadAction<Languages>) {
      state.language = action.payload;
    },
  },
});

export const { setUserLanguage } = settingsSlice.actions;
export const settingsReducer = settingsSlice.reducer;
