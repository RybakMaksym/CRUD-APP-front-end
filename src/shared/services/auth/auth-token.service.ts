import Cookies from 'js-cookie';

import { Tokens } from '@/shared/constants/token.constants';

export const getAccessToken = () => {
  const accessToken = Cookies.get(Tokens.ACCESS_TOKEN);
  return accessToken || null;
};

export const saveTokenToStorage = (accessToken: string) => {
  Cookies.set(Tokens.ACCESS_TOKEN, accessToken, {
    sameSite: 'strict',
    expires: 1,
  });
};

export const removeTokenFromStorage = () => {
  Cookies.remove(Tokens.ACCESS_TOKEN);
};
