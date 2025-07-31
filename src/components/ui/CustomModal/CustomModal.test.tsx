import { render, screen } from '@testing-library/react';

import CustomModal from '@/components/ui/CustomModal/CustomModal';

describe('CustomModal', () => {
  it('should render children when open', () => {
    render(
      <CustomModal isOpen={true}>
        <div>Test Content</div>
      </CustomModal>,
    );

    expect(screen.getByText('Test Content')).toBeInTheDocument();
  });

  it('should not render content when closed', () => {
    render(
      <CustomModal isOpen={false}>
        <div>Hidden Content</div>
      </CustomModal>,
    );

    expect(screen.queryByText('Hidden Content')).not.toBeInTheDocument();
  });
});
