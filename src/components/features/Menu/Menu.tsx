'use client';

import { useTranslation } from 'react-i18next';

import MenuItem from '@/components/ui/MenuItem/MenuItem';
import { Role } from '@/enums/role';
import { useAppSelector } from '@/hooks/use-app-selector';
import { ADMIN_LINKS, USER_LINKS } from '@/lib/constants/menu';
import userSelectors from '@/redux/user/user-selectors';

const Menu = () => {
  const { t } = useTranslation();
  const role = useAppSelector(userSelectors.getUserRole);

  const links = role === Role.ADMIN ? ADMIN_LINKS : USER_LINKS;

  return (
    <nav>
      {links.map((link) => (
        <MenuItem key={link.path} {...link} label={t(link.label)} />
      ))}
    </nav>
  );
};

export default Menu;
