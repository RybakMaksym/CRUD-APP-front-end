import type { ButtonProps } from '@mui/material';
import { Button } from '@mui/material';
import type { ReactNode } from 'react';

import Loader from '@/components/ui/Loader/Loader';

type CustomButtonProps = ButtonProps & {
  children: ReactNode;
  background?: 'red' | 'green';
  isLoading?: boolean;
};

function CustomButton({
  children,
  background,
  isLoading,
  ...props
}: CustomButtonProps) {
  return (
    <Button
      sx={{
        width: 'fit-content',
        padding: '12px 83px 20px',
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
      {!isLoading ? children : <Loader />}
    </Button>
  );
}

export default CustomButton;
