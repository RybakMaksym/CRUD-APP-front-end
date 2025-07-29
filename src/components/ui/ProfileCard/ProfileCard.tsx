'use client';

import DeleteProfileButton from '@/components/features/DeleteProfileButton/DeleteProfileButton';
import UpdateProfileButton from '@/components/features/UpdateProfileButton/UpdateProfileButton';
import Avatar from '@/components/ui/Avatar/Avatar';
import Paragraph from '@/components/ui/Paragraph/Paragraph';
import styles from '@/components/ui/ProfileCard/ProfileCard.module.scss';
import { DEFAULT_AVATAR } from '@/lib/constants/avatar';
import { formatDate } from '@/lib/helpers/format-date';
import type { IProfile } from '@/types/profile';

type ProfileCardProps = {
  profile: IProfile;
  actionSuccess?: () => void;
};

function ProfileCard(props: ProfileCardProps) {
  return (
    <div className={styles.card}>
      <div className={styles['card-header']}>
        <Avatar
          src={props.profile.avatarUrl ?? DEFAULT_AVATAR}
          alt="Profile avatar"
          width={50}
          height={50}
        />
        <Paragraph size="18px">{props.profile.name}</Paragraph>
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
          <Paragraph size="18px">{props.profile.gender}</Paragraph>
          <Paragraph size="18px">
            {formatDate(props.profile.birthDate)}
          </Paragraph>
          <Paragraph size="18px">{props.profile.country}</Paragraph>
          <Paragraph size="18px">{props.profile.city}</Paragraph>
        </div>
      </div>
      <div className={styles['card-actions']}>
        <UpdateProfileButton
          profile={props.profile}
          onConfirm={props.actionSuccess}
        />
        <DeleteProfileButton
          profileId={props.profile.id}
          onConfirm={props.actionSuccess}
        />
      </div>
    </div>
  );
}

export default ProfileCard;
