'use client';

import Image from 'next/image';
import { usePathname } from 'next/navigation';

import CustomLink from '@/components/ui/CustomLink/CustomLink';
import styles from '@/components/ui/MenuItem/MenuItem.module.scss';

type MenuItemProps = {
  path: string;
  label: string;
  iconUrl?: string;
};

const MenuItem = (props: MenuItemProps) => {
  const pathname = usePathname();
  const isActive = pathname === props.path;
  const classes = `${styles.item} ${isActive ? styles.active : null}`;

  return (
    <div className={classes}>
      {props.iconUrl ? (
        <Image
          src={props.iconUrl}
          alt={`${props.label} icon`}
          width={30}
          height={30}
        />
      ) : null}
      <CustomLink href={props.path} linkVariant="white">
        {props.label}
      </CustomLink>
    </div>
  );
};

export default MenuItem;
