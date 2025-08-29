import { Open_Sans } from 'next/font/google';

import type { Preview } from '@storybook/nextjs-vite';
import { initialize, mswLoader } from 'msw-storybook-addon';
import { I18nextProvider } from 'react-i18next';
import { Provider } from 'react-redux';
import { INITIAL_VIEWPORTS } from 'storybook/viewport';

import i18n from '@/i18n/i18n';
import { store } from '@/redux/store';

// eslint-disable-next-line no-restricted-imports
import '../src/styles/variables.scss';
// eslint-disable-next-line no-restricted-imports
import '../src/styles/globals.scss';

const primaryFont = Open_Sans({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--primary-font',
  display: 'swap',
});

initialize();

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
        <I18nextProvider i18n={i18n}>
          <div className={`${primaryFont.variable}`}>
            <Story />
          </div>
        </I18nextProvider>
      </Provider>
    ),
  ],
  loaders: [mswLoader],
};

export default preview;
