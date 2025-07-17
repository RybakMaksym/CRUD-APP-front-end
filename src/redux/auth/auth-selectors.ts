import type { RootState } from '@/redux/store';

const getAccessToken = (state: RootState) => state.auth.accessToken;

const authSelectors = {
  getAccessToken,
};

export default authSelectors;
