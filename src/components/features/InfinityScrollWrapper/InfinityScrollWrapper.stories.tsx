import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';

import InfinityScrollWrapper from '@/components/features/InfinityScrollWrapper/InfinityScrollWrapper';

const meta: Meta<typeof InfinityScrollWrapper> = {
  title: 'Features/InfinityScrollWrapper',
  component: InfinityScrollWrapper,
  tags: ['autodocs'],
  argTypes: {
    onLoadMore: { action: 'load more triggered' },
    additionalConditions: { control: 'boolean' },
    children: { control: false },
  },
};

export default meta;
type Story = StoryObj<typeof InfinityScrollWrapper>;

export const Default: Story = {
  render: (args) => {
    const [items, setItems] = useState(
      Array.from({ length: 3 }, (_, i) => i + 1),
    );

    const handleLoadMore = () => {
      const nextItems = Array.from(
        { length: 5 },
        (_, i) => items.length + i + 1,
      );
      setItems([...items, ...nextItems]);
      args.onLoadMore?.();
    };

    return (
      <InfinityScrollWrapper
        onLoadMore={handleLoadMore}
        additionalConditions={args.additionalConditions}
      >
        <ul>
          {items.map((item) => (
            <li key={item}>Item {item}</li>
          ))}
        </ul>
      </InfinityScrollWrapper>
    );
  },
  args: {
    additionalConditions: true,
  },
};
