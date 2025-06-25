import { Button, ButtonProps } from '@mui/material';
import { ReactNode } from 'react';

type CustomButtonProps = ButtonProps & {
  children: ReactNode;
  customVariant?: 'red' | 'green';
};

function CustomButton({
  children,
  customVariant,
  ...props
}: CustomButtonProps) {
  return (
    <Button
      sx={{
        width: 'fit-content',
        padding: '16px 94px 25px 94px',
        fontFamily: 'Open Sans',
        fontWeight: '700',
        fontSize: '21px',
        color: customVariant === 'green' ? '#12130F' : '#FFFFFF',
        backgroundColor: customVariant === 'green' ? '#8FCB9B' : '#AF253C',
        borderRadius: '20px',
      }}
      {...props}
    >
      {children}
    </Button>
  );
}

export default CustomButton;

