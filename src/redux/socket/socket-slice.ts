import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isSocketConnected: false,
};

const socketSlice = createSlice({
  name: 'socket',
  initialState,
  reducers: {
    setIsSocketConnected(state, action: PayloadAction<boolean>) {
      state.isSocketConnected = action.payload;
    },
  },
});

export const { setIsSocketConnected } = socketSlice.actions;
export const socketReducer = socketSlice.reducer;
