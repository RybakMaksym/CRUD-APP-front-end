import type { Meta, StoryObj } from '@storybook/react';
import { Provider } from 'react-redux';

import LogInForm from '@/components/features/LogInForm/LogInForm';
import { store } from '@/redux/store';

const meta: Meta<typeof LogInForm> = {
  title: 'Forms/LogInForm',
  component: LogInForm,
  tags: ['autodocs'],
  args: {
    title: 'Log In',
  },
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
type Story = StoryObj<typeof LogInForm>;

export const Default: Story = {};
