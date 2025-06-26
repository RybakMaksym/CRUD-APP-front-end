import { baseAxios } from '@/shared/api/interceptors';
import {
  removeTokenFromStorage,
  saveTokenToStorage,
} from '@/shared/services/auth/auth-token.service';
import {
  IAuthResponse,
  ILogInForm,
  IRegisterForm,
} from '@/shared/types/auth.types';

class AuthService {
  async register(data: IRegisterForm) {
    const response = await baseAxios.post<IAuthResponse>(
      `/auth/register`,
      data,
    );

    if (response.data.accessToken) {
      saveTokenToStorage(response.data.accessToken);
    }

    return response;
  }

  async logIn(data: ILogInForm) {
    const response = await baseAxios.post<IAuthResponse>(`/auth/log-in`, data);

    if (response.data.accessToken) {
      saveTokenToStorage(response.data.accessToken);
    }

    return response;
  }

  async getNewTokens() {
    const response = await baseAxios.get<IAuthResponse>(
      `/auth/log-in/access-token`,
    );

    if (response.data.accessToken) {
      saveTokenToStorage(response.data.accessToken);
    }

    return response;
  }

  async logOut() {
    const response = await baseAxios.get<boolean>(`/auth/log-out`);

    if (response.data) {
      removeTokenFromStorage();
    }

    return response;
  }
}

export const authService = new AuthService();
