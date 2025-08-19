import { render, screen } from '@testing-library/react';

import LanguageSelect from '@/components/features/LanguageSelect/LanguageSelect';

jest.mock('react-i18next', () => ({
  useTranslation: () => ({
    i18n: { changeLanguage: jest.fn() },
    t: (key: string) => key,
  }),
}));

jest.mock('@/hooks/use-app-selector', () => ({
  useAppSelector: jest.fn(() => 'en'),
}));

jest.mock('@/hooks/use-app-dispatch', () => ({
  useAppDispatch: () => jest.fn(),
}));

jest.mock('@/redux/settings/settings-api', () => ({
  useUpdateSettingsMutation: () => [jest.fn(() => Promise.resolve(true))],
}));

jest.mock('@/redux/settings/settings-slice', () => ({
  setUserLanguage: jest.fn((lang) => ({
    type: 'setUserLanguage',
    payload: lang,
  })),
}));

jest.mock('@/components/ui/CustomSelect/CustomSelect', () => {
  const MockComponent = ({ children, onChange, value }: any) => (
    <select
      data-testid="CustomSelect"
      value={value}
      onChange={(e) => onChange({ target: { value: e.target.value } })}
    >
      {children}
    </select>
  );
  MockComponent.displayName = 'MockCustomSelect';

  return MockComponent;
});

describe('LanguageSelect', () => {
  it('should render language options', () => {
    render(<LanguageSelect />);

    expect(screen.getByTestId('CustomSelect')).toBeInTheDocument();
    expect(screen.getByText(/english/i)).toBeInTheDocument();
    expect(screen.getByText(/ukrainian/i)).toBeInTheDocument();
  });
});
