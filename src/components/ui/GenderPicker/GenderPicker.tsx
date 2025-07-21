import { Field } from 'formik';

import styles from '@/components/ui/GenderPicker/GenderPicker.module.scss';
import Paragraph from '@/components/ui/Paragraph/Paragraph';

function GenderPicker() {
  return (
    <div role="group" aria-labelledby="radio-group" className={styles.picker}>
      <Paragraph color="dark">Gender:</Paragraph>
      <div className={styles.labels}>
        <label>
          <Field type="radio" name="gender" value="male" />
          <Paragraph size="18px" color="dark">
            Male
          </Paragraph>
        </label>
        <label>
          <Field type="radio" name="gender" value="female" />
          <Paragraph size="18px" color="dark">
            Female
          </Paragraph>
        </label>
      </div>
    </div>
  );
}

export default GenderPicker;
