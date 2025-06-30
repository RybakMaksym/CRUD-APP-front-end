import type { AxiosResponse } from 'axios';

import { baseAxios } from '@/shared/api/interceptors';
import { saveTokenToStorage } from '@/shared/services/auth/auth-token.service';
import { IAuthResponse } from '@/shared/types/auth';

class TokenService {
  public async getNewTokens(): Promise<AxiosResponse<IAuthResponse>> {
    const response = await baseAxios.get<IAuthResponse>('/token/refresh');

    if (response.data.accessToken) {
      saveTokenToStorage(response.data.accessToken);
    }

    return response;
  }
}

export const tokenService = new TokenService();
