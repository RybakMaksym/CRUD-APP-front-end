'use client';

import { useTranslation } from 'react-i18next';

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
  const { t } = useTranslation();

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
          <div className={styles['card-row']}>
            <Paragraph color="error" size="18px">
              {t('profilesPage.gender')}
            </Paragraph>
            <Paragraph size="18px">
              {t(`profilesPage.${props.profile.gender}`)}
            </Paragraph>
          </div>
          <div className={styles['card-row']}>
            <Paragraph color="error" size="18px">
              {t('profilesPage.profileBirth')}
            </Paragraph>
            <Paragraph size="18px">
              {formatDate(props.profile.birthDate)}
            </Paragraph>
          </div>
          <div className={styles['card-row']}>
            <Paragraph color="error" size="18px">
              {t('profilesPage.profileCountry')}
            </Paragraph>
            <Paragraph size="18px">{props.profile.country}</Paragraph>
          </div>
          <div className={styles['card-row']}>
            <Paragraph color="error" size="18px">
              {t('profilesPage.profileCity')}
            </Paragraph>
            <Paragraph size="18px">{props.profile.city}</Paragraph>
          </div>
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
