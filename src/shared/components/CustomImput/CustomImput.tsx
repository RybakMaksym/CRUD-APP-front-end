import { Input, InputProps } from '@mui/material';

type CustomInputProps = InputProps & {
  customVariant?: 'white' | 'dark';
};

function CustomImput({ customVariant, ...props }: CustomInputProps) {
  return (
    <Input
      disableUnderline
      sx={{
        padding: '19px 19px 22px 21px',
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
    />
  );
}

export default CustomImput;

