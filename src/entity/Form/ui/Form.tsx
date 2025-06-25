import Headline from '@/shared/components/Headline/Headline';
import { ReactNode } from 'react';

type FormProps = {
  title: string;
  children: ReactNode;
};

function Form(props: FormProps) {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        width: 'fit-content',
        padding: '41px 46px 51px 46px',
        backgroundColor: '#12130FEB',
        borderRadius: '38px',
      }}
    >
      <Headline>{props.title}</Headline>
      {props.children}
    </div>
  );
}

export default Form;

