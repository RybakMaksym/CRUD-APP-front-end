import { RootState } from '@/redux/store';

const getUserRole = (state: RootState) => state.user.role;

const userSelectors = {
  getUserRole,
};

export default userSelectors;
