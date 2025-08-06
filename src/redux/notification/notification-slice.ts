import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';

import type { INotification, INotificationState } from '@/types/notification';

const initialState: INotificationState = {
  hasNew: false,
  notifications: [],
};

const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    setHasNewNotification(state, action: PayloadAction<boolean>) {
      state.hasNew = action.payload;
    },
    addNotification(state, action: PayloadAction<INotification>) {
      const exists = state.notifications.find(
        (n) => n.id === action.payload.id,
      );

      if (!exists) {
        state.notifications.unshift({ ...action.payload, isNew: true });
        state.hasNew = true;
      }
    },
    clearSocketNotifications(state) {
      state.notifications = [];
    },
  },
});

export const {
  setHasNewNotification,
  addNotification,
  clearSocketNotifications,
} = notificationSlice.actions;
export const notificationReducer = notificationSlice.reducer;
