import type { CheckboxProps } from '@mui/material';
import { Checkbox } from '@mui/material';
import { useField } from 'formik';

import styles from '@/components/ui/CustomCheckbox/CustomCheckbox.module.scss';
import Paragraph from '@/components/ui/Paragraph/Paragraph';

type CustomCheckboxProps = CheckboxProps & {
  label: string;
  labelColor?: 'white' | 'dark';
};

function CustomCheckbox({
  label,
  labelColor = 'white',
  ...props
}: CustomCheckboxProps) {
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
        <Paragraph color={labelColor}>{label}</Paragraph>
      </div>
      {meta.touched && meta.error ? (
        <Paragraph color="error">{meta.error}</Paragraph>
      ) : null}
    </>
  );
}

export default CustomCheckbox;
