import { Provider } from 'react-redux';

import CreateProfileForm from '@/components/features/CreateProfileForm/CreateProfileForm';
import { store } from '@/redux/store';

export default {
  title: 'Forms/CreateProfileForm',
  component: CreateProfileForm,
  tags: ['autodocs'],
};

export const Default = () => (
  <Provider store={store}>
    <CreateProfileForm userId="123" onClose={() => {}} onConfirm={() => {}} />
  </Provider>
);
