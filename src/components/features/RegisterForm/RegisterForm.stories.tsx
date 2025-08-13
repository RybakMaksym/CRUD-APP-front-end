import type { Meta, StoryObj } from '@storybook/react';
import { Provider } from 'react-redux';

import RegisterForm from '@/components/features/RegisterForm/RegisterForm';
import { store } from '@/redux/store';

const meta: Meta<typeof RegisterForm> = {
  title: 'Forms/RegisterForm',
  component: RegisterForm,
  tags: ['autodocs'],
  parameters: {
    nextjs: {
      appDirectory: true,
      navigation: {
        push: (path: string) => console.log(`Navigating to: ${path}`),
      },
    },
  },
  decorators: [
    (Story) => (
      <Provider store={store}>
        <Story />
      </Provider>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof RegisterForm>;

export const Default: Story = {
  args: {
    title: 'Register',
  },
};
