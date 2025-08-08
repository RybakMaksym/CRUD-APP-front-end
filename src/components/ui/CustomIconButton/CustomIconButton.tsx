import type { IconButtonProps } from '@mui/material';
import { IconButton } from '@mui/material';
import Image from 'next/image';

type CustomIconButtonProps = {
  icon: string;
} & IconButtonProps;

function CustomIconButton({ icon, ...props }: CustomIconButtonProps) {
  return (
    <IconButton {...props} color="default">
      <Image src={icon} alt="notification button" width={33} height={33} />
    </IconButton>
  );
}

export default CustomIconButton;
