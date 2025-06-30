import { Checkbox, CheckboxProps } from '@mui/material';
import { useField } from 'formik';

import styles from '@/shared/components/CustomCheckbox/custom-checkbox.module.css';
import Paragraph from '@/shared/components/Paragraph/Paragraph';

type CustomCheckboxProps = CheckboxProps & {
  label: string;
};

function CustomCheckbox({ label, ...props }: CustomCheckboxProps) {
  const [field, meta] = useField({ ...props, type: 'checkbox' });

  return (
    <>
      <div className={styles.checkbox}>
        <Checkbox
          sx={{
            color: 'var(--color-red)',
            '&:hover': {
              backgroundColor: 'var(--color-white)',
              opacity: '0.1',
            },
            '&.Mui-checked': {
              color: 'var(--color-red)',
            },
            '&.Mui-checked:hover': {
              backgroundColor: 'var(--color-white)',
            },
          }}
          {...props}
          {...field}
        />
        <Paragraph>{label}</Paragraph>
      </div>
      {meta.touched && meta.error ? (
        <Paragraph variant="error">{meta.error}</Paragraph>
      ) : null}
    </>
  );
}

export default CustomCheckbox;
