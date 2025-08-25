'use client';

import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';

import styles from '@/components/ui/MenuItem/MenuItem.module.scss';
import Paragraph from '@/components/ui/Paragraph/Paragraph';

type MenuItemProps = {
  path: string;
  label: string;
  iconUrl?: string;
};

const MenuItem = (props: MenuItemProps) => {
  const pathname = usePathname();
  const router = useRouter();
  const isActive = pathname === props.path;
  const classes = `${styles.item} ${isActive ? styles.active : null}`;

  return (
    <div className={classes} onClick={() => router.push(props.path)}>
      {props.iconUrl ? (
        <Image
          src={props.iconUrl}
          alt={`${props.label} icon`}
          width={30}
          height={30}
        />
      ) : null}
      <Paragraph size="21px">{props.label}</Paragraph>
    </div>
  );
};

export default MenuItem;
