import Link from 'next/link';
import { ReactNode } from 'react';

type CustomLinkProps = {
  href: string;
  children: ReactNode;
};

function CustomLink(props: CustomLinkProps) {
  return (
    <Link
      style={{
        fontFamily: 'Open Sans',
        fontWeight: '700',
        fontSize: '21px',
        color: '#AF253C',
        textDecoration: 'none',
      }}
      href={props.href}
    >
      {props.children}
    </Link>
  );
}

export default CustomLink;

