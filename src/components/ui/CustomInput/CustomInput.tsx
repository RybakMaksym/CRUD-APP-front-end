import type { InputProps } from '@mui/material';
import { Input } from '@mui/material';
import { useField } from 'formik';

import styles from '@/components/ui/CustomInput/CustomInput.module.scss';
import Paragraph from '@/components/ui/Paragraph/Paragraph';

type CustomInputProps = InputProps & {
  background?: 'white' | 'dark';
};

function CustomInput({ background = 'white', ...props }: CustomInputProps) {
  const [field, meta] = useField(props);
  const classes = `${styles.input} ${styles[background]}`;

  return (
    <div className={styles['input-wrapper']}>
      <Input disableUnderline className={classes} {...props} {...field} />
      {meta.touched && meta.error ? (
        <Paragraph color="error">{meta.error}</Paragraph>
      ) : null}
    </div>
  );
}

export default CustomInput;
