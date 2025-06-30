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
        fontFamily: 'var(--primary-font), sans-serif',
        fontWeight: 700,
        fontSize: 'var(--font-body)',
        borderRadius: '20px',
        textTransform: 'none',
        cursor: 'pointer',
        border: 'none',
        transition: 'background-color 0.3s ease',
        backgroundColor:
          customVariant === 'green' ? 'var(--color-green)' : 'var(--color-red)',
        color:
          customVariant === 'green'
            ? 'var(--color-black)'
            : 'var(--color-white)',
        '&:hover': {
          opacity: 0.9,
        },
      }}
      {...props}
    >
      {children}
    </Button>
  );
}

export default CustomButton;
