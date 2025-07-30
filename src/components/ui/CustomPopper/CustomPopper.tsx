import type { PopperProps } from '@mui/material';
import { Popper } from '@mui/material';

function CustomPopper(props: PopperProps) {
  return (
    <Popper
      {...props}
      modifiers={[
        {
          name: 'offset',
          options: {
            offset: [0, 4],
          },
        },
      ]}
      style={{
        ...props.style,
        backgroundColor: 'var(--color-black)',
        color: 'var(--color-white)',
        borderRadius: '8px',
        zIndex: 1300,
      }}
      data-testId="popper-content"
    />
  );
}

export default CustomPopper;
