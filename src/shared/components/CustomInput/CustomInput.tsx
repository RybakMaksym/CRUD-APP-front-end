import { Input, InputProps } from '@mui/material';
import { useField } from 'formik';

import styles from '@/shared/components/CustomInput/CustomInput.module.css';
import Paragraph from '@/shared/components/Paragraph/Paragraph';

type CustomInputProps = InputProps & {
  customVariant?: 'white' | 'dark';
};

function CustomInput({ customVariant = 'white', ...props }: CustomInputProps) {
  const [field, meta] = useField(props);
  const classes = `${styles.input} ${styles[customVariant]}`;

  return (
    <div>
      <Input disableUnderline className={classes} {...props} {...field} />
      {meta.touched && meta.error ? (
        <Paragraph variant="error">{meta.error}</Paragraph>
      ) : null}
    </div>
  );
}

export default CustomInput;
