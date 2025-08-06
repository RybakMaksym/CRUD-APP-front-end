import { combineReducers, configureStore } from '@reduxjs/toolkit';
import {
  FLUSH,
  PAUSE,
  PERSIST,
  persistReducer,
  PURGE,
  REGISTER,
  REHYDRATE,
} from 'redux-persist';
import persistStore from 'redux-persist/es/persistStore';
import storage from 'redux-persist/lib/storage';

import { authReducer } from '@/redux/auth/auth-slice';
import { authorizationApi } from '@/redux/auth/authorization-api';
import { logOutApi } from '@/redux/auth/log-out-api';
import { notificationApi } from '@/redux/notification/notification-api';
import { notificationReducer } from '@/redux/notification/notification-slice';
import { profileApi } from '@/redux/profile/profile-api';
import { userApi } from '@/redux/user/user-api';
import { userReducer } from '@/redux/user/user-slice';

const rootReducer = combineReducers({
  auth: authReducer,
  user: userReducer,
  notification: notificationReducer,
  [authorizationApi.reducerPath]: authorizationApi.reducer,
  [logOutApi.reducerPath]: logOutApi.reducer,
  [userApi.reducerPath]: userApi.reducer,
  [profileApi.reducerPath]: profileApi.reducer,
  [notificationApi.reducerPath]: notificationApi.reducer,
});

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['auth', 'user'],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    })
      .concat(authorizationApi.middleware)
      .concat(logOutApi.middleware)
      .concat(userApi.middleware)
      .concat(profileApi.middleware)
      .concat(notificationApi.middleware),
  devTools: process.env.NODE_ENV !== 'production',
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
