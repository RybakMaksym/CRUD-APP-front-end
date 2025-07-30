import { render, screen } from '@testing-library/react';

import CustomPopper from '@/components/ui/CustomPopper/CustomPopper';

describe('CustomPopper', () => {
  it('renders children when open', () => {
    render(
      <CustomPopper open={true} anchorEl={document.createElement('div')}>
        <div>Popper content</div>
      </CustomPopper>,
    );

    expect(screen.getByText('Popper content')).toBeInTheDocument();
  });

  it('does not render children when closed', () => {
    render(
      <CustomPopper open={false} anchorEl={document.createElement('div')}>
        <div>Popper content</div>
      </CustomPopper>,
    );

    expect(screen.queryByText('Popper content')).not.toBeInTheDocument();
  });
});
