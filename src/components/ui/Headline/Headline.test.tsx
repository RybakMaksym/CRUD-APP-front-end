import { render, screen } from '@testing-library/react';

import Headline from '@/components/ui/Headline/Headline';

describe('Headline', () => {
  it('should render children text', () => {
    render(<Headline>Test Headline</Headline>);

    expect(screen.getByText('Test Headline')).toBeInTheDocument();
  });

  it('should applie default size and color classes', () => {
    render(<Headline>Default Headline</Headline>);
    const heading = screen.getByText('Default Headline');

    expect(heading).toHaveClass('headline');
    expect(heading).toHaveClass('size45');
    expect(heading).toHaveClass('white');
  });

  it('should applie specified size and color classes', () => {
    render(
      <Headline size="35px" color="dark">
        Custom Headline
      </Headline>,
    );
    const heading = screen.getByText('Custom Headline');

    expect(heading).toHaveClass('size35');
    expect(heading).toHaveClass('dark');
  });
});
