import { render, screen } from '@testing-library/react';

import SideBar from '@/components/features/SideBar/SideBar';

jest.mock('@/components/ui/UserProfile/UserProfile', () => {
  const MockComponent = () => <div data-testid="UserProfile" />;
  MockComponent.displayName = 'MockUserProfile';

  return MockComponent;
});

jest.mock('@/components/features/Menu/Menu', () => {
  const MockComponent = () => <div data-testid="Menu" />;
  MockComponent.displayName = 'MockMenu';

  return MockComponent;
});

jest.mock('@/components/features/LogOutButton/LogOutButton', () => {
  const MockComponent = () => <div data-testid="LogOutButton" />;
  MockComponent.displayName = 'MockLogOutButton';

  return MockComponent;
});

describe('SideBar', () => {
  it('should render UserProfile, Menu, and LogOutButton', () => {
    render(<SideBar />);

    expect(screen.getByTestId('UserProfile')).toBeInTheDocument();
    expect(screen.getByTestId('Menu')).toBeInTheDocument();
    expect(screen.getByTestId('LogOutButton')).toBeInTheDocument();
  });
});
