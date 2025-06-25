import { ReactNode } from 'react';

type HeadlineProps = {
  children: ReactNode;
  size?: '45px' | '35px' | '32px';
  variant?: 'white' | 'dark';
};

function Headline(props: HeadlineProps) {
  return (
    <h1
      style={{
        fontFamily: 'Open Sans',
        fontWeight: '700',
        fontSize: props.size ?? '45px',
        color: props.variant === 'dark' ? '#12130F' : '#F2EDE7',
      }}
    >
      {props.children}
    </h1>
  );
}

export default Headline;

