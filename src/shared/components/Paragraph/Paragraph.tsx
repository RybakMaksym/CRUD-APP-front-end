import { ReactNode } from 'react';

const variants = {
  white: '#FFFFFF',
  dark: '#242420',
  error: '#FFC1CB',
};

type ParagraphProps = {
  children: ReactNode;
  variant?: 'white' | 'dark' | 'error';
};

function Paragraph(props: ParagraphProps) {
  return (
    <h1
      style={{
        fontFamily: 'Open Sans',
        fontWeight: '400',
        fontSize: '21px',
        color: variants[props.variant ?? 'white'],
      }}
    >
      {props.children}
    </h1>
  );
}

export default Paragraph;
