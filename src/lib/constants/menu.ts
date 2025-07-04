export const USER_LINKS = [
  {
    path: '/profiles',
    label: 'Profiles',
    iconUrl: '/assets/icons/profiles.svg',
  },
];

export const ADMIN_LINKS = [
  ...USER_LINKS,
  { path: '/users', label: 'Users', iconUrl: '/assets/icons/users.svg' },
  {
    path: '/dashboard',
    label: 'Dashboard',
    iconUrl: '/assets/icons/dashboard.svg',
  },
];
