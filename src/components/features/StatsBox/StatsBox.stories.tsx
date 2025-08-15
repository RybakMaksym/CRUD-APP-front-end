import type { Meta, StoryObj } from '@storybook/react';
import { http, HttpResponse } from 'msw';

import StatsBox from '@/components/features/StatsBox/StatsBox';
import { IStatsResponse } from '@/types/response';

const meta: Meta<typeof StatsBox> = {
  title: 'Features/StatsBox',
  component: StatsBox,
  tags: ['autodocs'],
  argTypes: {},
  parameters: {
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
type Story = StoryObj<typeof StatsBox>;

export const Default: Story = {};
