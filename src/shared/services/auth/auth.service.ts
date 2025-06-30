import type { AxiosResponse } from 'axios';

import { baseAxios } from '@/shared/api/interceptors';
import { saveTokenToStorage } from '@/shared/services/auth/auth-token.service';
import {
  IAuthResponse,
  ILogInForm,
  IRegisterForm,
} from '@/shared/types/auth';

class AuthService {
  public async register(
    data: IRegisterForm,
  ): Promise<AxiosResponse<IAuthResponse>> {
    const response = await baseAxios.post<IAuthResponse>(
      '/auth/register',
      data,
    );

    if (response.data.accessToken) {
      saveTokenToStorage(response.data.accessToken);
    }

    return response;
  }

  public async logIn(data: ILogInForm): Promise<AxiosResponse<IAuthResponse>> {
    const response = await baseAxios.post<IAuthResponse>('/auth/log-in', data);

    if (response.data.accessToken) {
      saveTokenToStorage(response.data.accessToken);
    }

    return response;
  }
}

export const authService = new AuthService();
