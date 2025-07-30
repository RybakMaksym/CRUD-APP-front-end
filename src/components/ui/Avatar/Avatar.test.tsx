import { render, screen } from '@testing-library/react';

import Avatar from '@/components/ui/Avatar/Avatar';

describe('Avatar', () => {
  it('renders image with correct props', () => {
    render(
      <Avatar src="/avatar.png" alt="User avatar" width={100} height={100} />,
    );

    const img = screen.getByAltText('User avatar') as HTMLImageElement;
    expect(img).toBeInTheDocument();
    expect(decodeURIComponent(img.src)).toContain('/avatar.png');
    expect(img.width).toBe(100);
    expect(img.height).toBe(100);
    expect(img).toHaveClass('avatar');
  });
});
