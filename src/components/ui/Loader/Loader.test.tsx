import { render, screen } from '@testing-library/react';

import Loader from '@/components/ui/Loader/Loader';

describe('Loader', () => {
  it('should render loading text', () => {
    render(<Loader />);
    const loadingText = screen.getByText(/loading.../i);

    expect(loadingText).toBeInTheDocument();
    expect(loadingText).toHaveClass('dark');
  });
});
