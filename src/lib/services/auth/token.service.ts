import type { AxiosResponse } from 'axios';

import { baseAxios } from '@/lib/api/interceptors';
import { saveTokenToStorage } from '@/lib/services/auth/auth-token.service';
import { IAuthResponse } from '@/types/auth';

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
