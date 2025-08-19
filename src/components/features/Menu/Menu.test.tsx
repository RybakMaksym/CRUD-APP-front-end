import { render, screen } from '@testing-library/react';

import Menu from '@/components/features/Menu/Menu';
import { Role } from '@/enums/role';
import { useAppSelector } from '@/hooks/use-app-selector';
import { ADMIN_LINKS, USER_LINKS } from '@/lib/constants/menu';

jest.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string) => key,
  }),
}));

jest.mock('@/hooks/use-app-selector', () => ({
  useAppSelector: jest.fn(),
}));

jest.mock('@/components/ui/MenuItem/MenuItem', () => ({
  __esModule: true,
  default: ({ label }: { label: string }) => <div>{label}</div>,
}));

describe('Menu', () => {
  it('should render USER links when role is USER', () => {
    (useAppSelector as jest.Mock).mockReturnValue(Role.USER);

    render(<Menu />);

    USER_LINKS.forEach((link) => {
      expect(screen.getByText(link.label)).toBeInTheDocument();
    });
  });

  it('should render ADMIN links when role is ADMIN', () => {
    (useAppSelector as jest.Mock).mockReturnValue(Role.ADMIN);

    render(<Menu />);

    ADMIN_LINKS.forEach((link) => {
      expect(screen.getByText(link.label)).toBeInTheDocument();
    });
  });
});
