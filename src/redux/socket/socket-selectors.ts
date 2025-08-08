import type { RootState } from '@/redux/store';

const getIsSocketConnected = (state: RootState) =>
  state.socket.isSocketConnected;

const socketSelectors = {
  getIsSocketConnected,
};

export default socketSelectors;
