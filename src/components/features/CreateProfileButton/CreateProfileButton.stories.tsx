import { store } from '@/redux/store';
import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { Provider } from 'react-redux';

import CreateProfileButton from '@/components/features/CreateProfileButton/CreateProfileButton';

const meta: Meta<typeof CreateProfileButton> = {
  title: 'Features/CreateProfileButton',
  component: CreateProfileButton,
  tags: ['autodocs'],
  argTypes: {
    userId: { control: 'text' },
    onConfirm: { action: 'confirmed' },
  },
};

export default meta;
type Story = StoryObj<typeof CreateProfileButton>;

const Template = (args: any) => {
  const [openCount, setOpenCount] = useState(0);

  return (
    <Provider store={store}>
      <CreateProfileButton
        {...args}
        onConfirm={() => {
          args.onConfirm?.();
          setOpenCount(openCount + 1);
        }}
      />
    </Provider>
  );
};

export const Default: Story = {
  render: (args) => <Template {...args} />,
  args: {
    userId: '123',
  },
};
