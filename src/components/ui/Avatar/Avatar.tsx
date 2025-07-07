import Image from 'next/image';

import styles from '@/components/ui/Avatar/Avatar.module.scss';

type AvatarProps = {
  src: string;
  alt: string;
  width: number;
  height: number;
};

function Avatar(props: AvatarProps) {
  return (
    <Image
      src={props.src}
      alt={props.alt}
      width={props.width}
      height={props.height}
      className={styles.avatar}
    />
  );
}

export default Avatar;
