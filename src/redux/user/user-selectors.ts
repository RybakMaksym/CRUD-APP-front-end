import { RootState } from '@/redux/store';

const getUserRole = (state: RootState) => state.user.role;
const getUserId = (state: RootState) => state.user.id;

const userSelectors = {
  getUserRole,
  getUserId,
};

export default userSelectors;
