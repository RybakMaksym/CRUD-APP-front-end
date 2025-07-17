import type { ButtonProps } from '@mui/material';
import { Button } from '@mui/material';
import type { ReactNode } from 'react';

type CustomButtonProps = ButtonProps & {
  children: ReactNode;
  background?: 'red' | 'green';
};

function CustomButton({ children, background, ...props }: CustomButtonProps) {
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
          background === 'green' ? 'var(--color-green)' : 'var(--color-red)',
        color:
          background === 'green' ? 'var(--color-black)' : 'var(--color-white)',
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
