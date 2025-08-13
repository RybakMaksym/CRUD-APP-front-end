import type { Preview } from '@storybook/nextjs-vite';

// eslint-disable-next-line no-restricted-imports
import '../src/styles/variables.scss';
// eslint-disable-next-line no-restricted-imports
import '../src/styles/globals.scss';
// eslint-disable-next-line no-restricted-imports
import './fonts.scss';

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    backgrounds: {
      default: 'light',
      values: [
        { name: 'light', value: 'var(--color-white)' },
        { name: 'dark', value: 'var(--color-black)' },
      ],
    },
    initialGlobals: {
      backgrounds: { value: 'light' },
    },
    a11y: {
      test: 'todo',
    },
  },
};

export default preview;
