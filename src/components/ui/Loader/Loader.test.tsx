import { render, screen } from '@testing-library/react';

import Loader from '@/components/ui/Loader/Loader';

jest.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string) => key.split('.')[1],
  }),
}));

describe('Loader', () => {
  it('should render loading text', () => {
    render(<Loader />);
    const loadingText = screen.getByText(/loading/i);

    expect(loadingText).toBeInTheDocument();
    expect(loadingText).toHaveClass('dark');
  });
});
