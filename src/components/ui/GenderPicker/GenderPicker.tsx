'use client';

import { Field } from 'formik';
import { useTranslation } from 'react-i18next';

import styles from '@/components/ui/GenderPicker/GenderPicker.module.scss';
import Paragraph from '@/components/ui/Paragraph/Paragraph';

function GenderPicker() {
  const { t } = useTranslation();

  return (
    <div role="group" aria-labelledby="radio-group" className={styles.picker}>
      <Paragraph color="dark">{t('profilesPage.gender')}</Paragraph>
      <div className={styles.labels}>
        <label>
          <Field type="radio" name="gender" value="male" />
          <Paragraph size="18px" color="dark">
            {t('profilesPage.male')}
          </Paragraph>
        </label>
        <label>
          <Field type="radio" name="gender" value="female" />
          <Paragraph size="18px" color="dark">
            {t('profilesPage.female')}
          </Paragraph>
        </label>
      </div>
    </div>
  );
}

export default GenderPicker;
