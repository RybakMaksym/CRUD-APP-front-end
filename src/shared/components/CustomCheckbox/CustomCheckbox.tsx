import { Checkbox, CheckboxProps } from '@mui/material';
import Paragraph from '../Paragraph/Paragraph';

type CustomCheckboxProps = CheckboxProps & {
  label: string;
};

function CustomCheckbox({ label, ...props }: CustomCheckboxProps) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
      <Checkbox
        sx={{
          color: '#AF253C',
          '&:hover': {
            backgroundColor: '#fff2f5',
          },
          '&.Mui-checked': {
            color: '#AF253C',
          },
          '&.Mui-checked:hover': {
            backgroundColor: '#fff2f5',
          },
        }}
        {...props}
      />
      <Paragraph>{label}</Paragraph>
    </div>
  );
}

export default CustomCheckbox;

