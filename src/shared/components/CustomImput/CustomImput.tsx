import { Input, InputProps } from '@mui/material';
import { useField } from 'formik';
import Paragraph from '../Paragraph/Paragraph';

type CustomInputProps = InputProps & {
  customVariant?: 'white' | 'dark';
};

function CustomImput({ customVariant, ...props }: CustomInputProps) {
  const [field, meta] = useField(props);

  return (
    <div>
      <Input
        disableUnderline
        sx={{
          minWidth: '489px',
          padding: '19px 19px 22px 21px',
          marginBottom: '10px',
          fontFamily: 'Open Sans',
          fontWeight: '400',
          fontSize: '21px',
          color: customVariant === 'dark' ? '#F2EDE7' : '#341E11',
          backgroundColor: customVariant === 'dark' ? '#12130FEB' : '#F2EDE7',
          border: 'none',
          outline: 'none',
          borderRadius: '20px',
        }}
        {...props}
        {...field}
      />
      {meta.touched && meta.error ? (
        <Paragraph variant="error">{meta.error}</Paragraph>
      ) : null}
    </div>
  );
}

export default CustomImput;

