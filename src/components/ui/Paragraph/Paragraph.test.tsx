import { render, screen } from '@testing-library/react';

import Paragraph from '@/components/ui/Paragraph/Paragraph';

describe('Paragraph', () => {
  it('renders children text', () => {
    render(<Paragraph>Test Text</Paragraph>);
    expect(screen.getByText('Test Text')).toBeInTheDocument();
  });

  it('applies correct classes based on props', () => {
    render(
      <Paragraph color="error" size="18px">
        Error Text
      </Paragraph>,
    );
    const heading = screen.getByText('Error Text');
    expect(heading).toHaveClass('paragraph');
    expect(heading).toHaveClass('error');
    expect(heading).toHaveClass('size18');
  });

  it('uses default props when none provided', () => {
    render(<Paragraph>Default Props</Paragraph>);
    const heading = screen.getByText('Default Props');
    expect(heading).toHaveClass('paragraph');
    expect(heading).toHaveClass('white');
    expect(heading).toHaveClass('size21');
  });
});
