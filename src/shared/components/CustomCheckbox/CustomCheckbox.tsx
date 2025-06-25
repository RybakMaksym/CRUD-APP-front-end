import { Checkbox, CheckboxProps } from '@mui/material';
import { useField } from 'formik';
import Paragraph from '../Paragraph/Paragraph';

type CustomCheckboxProps = CheckboxProps & {
  label: string;
};

function CustomCheckbox({ label, ...props }: CustomCheckboxProps) {
  const [field, meta] = useField({ ...props, type: 'checkbox' });

  return (
    <>
      <div style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
        <Checkbox
          sx={{
            color: '#AF253C',
            '&:hover': {
              backgroundColor: '#fff2f5',
              opacity: '0.1',
            },
            '&.Mui-checked': {
              color: '#AF253C',
            },
            '&.Mui-checked:hover': {
              backgroundColor: '#fff2f5',
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

