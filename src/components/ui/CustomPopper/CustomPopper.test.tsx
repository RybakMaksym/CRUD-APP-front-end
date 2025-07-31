import { render, screen } from '@testing-library/react';

import CustomPopper from '@/components/ui/CustomPopper/CustomPopper';

describe('CustomPopper', () => {
  it('should render children when open', () => {
    render(
      <CustomPopper open={true} anchorEl={document.createElement('div')}>
        <div>Popper content</div>
      </CustomPopper>,
    );

    expect(screen.getByText('Popper content')).toBeInTheDocument();
  });

  it('should not render children when closed', () => {
    render(
      <CustomPopper open={false} anchorEl={document.createElement('div')}>
        <div>Popper content</div>
      </CustomPopper>,
    );

    expect(screen.queryByText('Popper content')).not.toBeInTheDocument();
  });
});
