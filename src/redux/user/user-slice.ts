import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { IUserState } from '@/types/user';

const initialState: IUserState = {
  id: undefined,
  username: undefined,
  email: undefined,
  role: undefined,
  avatarUrl: undefined,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser(state, action: PayloadAction<IUserState>) {
      state.id = action.payload.id;
      state.username = action.payload.username;
      state.email = action.payload.email;
      state.role = action.payload.role;
      state.avatarUrl = action.payload.avatarUrl;
    },
    clearUser: () => initialState,
  },
});

export const { setUser, clearUser } = userSlice.actions;
export const userReducer = userSlice.reducer;
