'use client';

import Avatar from '@/components/ui/Avatar/Avatar';
import Paragraph from '@/components/ui/Paragraph/Paragraph';
import styles from '@/components/ui/ProfileCard/ProfileCard.module.scss';
import { DEFAULT_AVATAR } from '@/lib/constants/avatar';
import { formatDate } from '@/lib/helpers/format-date';
import type { IProfile } from '@/types/profile';

type ProfileCardProps = {
  profile: IProfile;
};

function ProfileCard({ profile }: ProfileCardProps) {
  return (
    <div className={styles.card}>
      <div className={styles['card-header']}>
        <Avatar
          src={profile.avatarUrl ?? DEFAULT_AVATAR}
          alt="Profile avatar"
          width={50}
          height={50}
        />
        <Paragraph size="18px">{profile.name}</Paragraph>
      </div>
      <div className={styles['card-body']}>
        <div className={styles['card-column']}>
          <Paragraph color="error" size="18px">
            Gender:
          </Paragraph>
          <Paragraph color="error" size="18px">
            Birthdate:
          </Paragraph>
          <Paragraph color="error" size="18px">
            Country:
          </Paragraph>
          <Paragraph color="error" size="18px">
            City:
          </Paragraph>
        </div>
        <div className={styles['card-column']}>
          <Paragraph size="18px">{profile.gender}</Paragraph>
          <Paragraph size="18px">{formatDate(profile.birthDate)}</Paragraph>
          <Paragraph size="18px">{profile.country}</Paragraph>
          <Paragraph size="18px">{profile.city}</Paragraph>
        </div>
      </div>
    </div>
  );
}

export default ProfileCard;
