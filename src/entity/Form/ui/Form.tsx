import { ReactNode } from 'react';

import styles from '@/entity/Form/ui/Form.module.css';
import Headline from '@/shared/components/Headline/Headline';

type FormProps = {
  title: string;
  children: ReactNode;
};

function Form({ title, children }: FormProps) {
  return (
    <div className={styles.container}>
      <Headline>{title}</Headline>
      {children}
    </div>
  );
}

export default Form;
