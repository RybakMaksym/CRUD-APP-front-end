import { render, screen } from '@testing-library/react';

import Settings from '@/components/features/Settings/Settings';

jest.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string) => key,
  }),
}));

jest.mock('@/components/features/LanguageSelect/LanguageSelect', () => {
  const MockComponent = () => <div data-testid="LanguageSelect" />;
  MockComponent.displayName = 'MockLanguageSelect';

  return MockComponent;
});

describe('Settings', () => {
  it('should render headline and language select', () => {
    render(<Settings />);

    expect(screen.getByText(/settings/i)).toBeInTheDocument();
    expect(screen.getByText(/language/i)).toBeInTheDocument();
    expect(screen.getByTestId('LanguageSelect')).toBeInTheDocument();
  });
});
