import Image from 'next/image';

import Paragraph from '@/components/ui/Paragraph/Paragraph';
import styles from '@/components/ui/StatsBar/StatsBar.module.scss';

type StatsBarProps = {
  icon: string;
  label: string;
  count: number;
};

function StatsBar(props: StatsBarProps) {
  return (
    <div className={styles.bar}>
      <div className={styles.label}>
        <Image
          src={props.icon}
          alt={`${props.label} icon`}
          width={75}
          height={75}
        />
        <Paragraph size="18px">{props.label}</Paragraph>
      </div>
      <div className={styles.count}>
        <Paragraph>{props.count}</Paragraph>
      </div>
    </div>
  );
}

export default StatsBar;
