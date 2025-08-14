import type { Preview } from '@storybook/nextjs-vite';
import { Provider } from 'react-redux';
import { INITIAL_VIEWPORTS } from 'storybook/viewport';

// eslint-disable-next-line no-restricted-imports
import '../src/styles/variables.scss';
// eslint-disable-next-line no-restricted-imports
import '../src/styles/globals.scss';
// eslint-disable-next-line no-restricted-imports
import { store } from '@/redux/store';
import './fonts.scss';

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    layout: 'centered',
    backgrounds: {
      default: 'light',
      values: [
        { name: 'light', value: 'var(--color-white)' },
        { name: 'dark', value: 'var(--color-black)' },
      ],
    },
    viewport: {
      options: INITIAL_VIEWPORTS,
    },
    a11y: {
      test: 'todo',
    },
  },
  initialGlobals: {
    backgrounds: { value: 'light' },
  },
  decorators: [
    (Story) => (
      <Provider store={store}>
        <Story />
      </Provider>
    ),
  ],
};

export default preview;
