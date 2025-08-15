import { configureStore } from '@reduxjs/toolkit';
import type { Meta, StoryObj } from '@storybook/react';
import { http, HttpResponse } from 'msw';
import { Provider } from 'react-redux';

import DashBaordPage from '@/app/(dashboard)/dashboard/page';
import { Role } from '@/enums/role';
import { profileApi } from '@/redux/profile/profile-api';
import { IStatsResponse } from '@/types/response';

const mockStore = configureStore({
  reducer: {
    user: () => ({
      username: 'JohnDoe',
      email: 'john@example.com',
      role: Role.ADMIN,
    }),
    [profileApi.reducerPath]: profileApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(profileApi.middleware),
});

const meta: Meta<typeof DashBaordPage> = {
  title: 'Pages/DashBaordPage',
  component: DashBaordPage,
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <Provider store={mockStore}>
        <Story />
      </Provider>
    ),
  ],
  parameters: {
    nextjs: {
      appDirectory: true,
      navigation: {
        push: (path: string) => console.log(`Navigating to: ${path}`),
      },
    },
    msw: {
      handlers: [
        http.get(`${process.env.NEXT_PUBLIC_API_URL}/profile/stats`, () => {
          const mockStats: IStatsResponse = {
            totalUsers: 150,
            totalProfiles: 120,
            totalAdults: 80,
          };
          return HttpResponse.json(mockStats);
        }),
      ],
    },
  },
};

export default meta;
type Story = StoryObj<typeof DashBaordPage>;

export const Default: Story = {};
