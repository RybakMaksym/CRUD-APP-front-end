import { PAGES_URL } from '@/enums/pages-url';

export const USER_LINKS = [
  {
    path: PAGES_URL.PROFILES,
    label: 'Profiles',
    iconUrl: '/assets/icons/profiles.svg',
  },
];

export const ADMIN_LINKS = [
  ...USER_LINKS,
  { path: PAGES_URL.USERS, label: 'Users', iconUrl: '/assets/icons/users.svg' },
  {
    path: PAGES_URL.DASHBOARD,
    label: 'Dashboard',
    iconUrl: '/assets/icons/dashboard.svg',
  },
];
