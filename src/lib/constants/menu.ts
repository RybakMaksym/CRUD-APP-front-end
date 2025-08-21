import { PAGES_URL } from '@/enums/pages-url';

export const USER_LINKS = [
  {
    path: PAGES_URL.PROFILES,
    label: 'profiles',
    iconUrl: '/assets/icons/profiles.svg',
  },
  {
    path: PAGES_URL.SETTINGS,
    label: 'settings',
    iconUrl: '/assets/icons/settings.svg',
  },
];

export const ADMIN_LINKS = [
  ...USER_LINKS,
  { path: PAGES_URL.USERS, label: 'users', iconUrl: '/assets/icons/users.svg' },
  {
    path: PAGES_URL.DASHBOARD,
    label: 'dashboard',
    iconUrl: '/assets/icons/dashboard.svg',
  },
];
