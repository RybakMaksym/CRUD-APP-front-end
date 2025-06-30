'use client';

import { Form, Formik } from 'formik';

import CustomButton from '@/components/ui/CustomButton/CustomButton';
import CustomCheckbox from '@/components/ui/CustomCheckbox/CustomCheckbox';
import CustomInput from '@/components/ui/CustomInput/CustomInput';
import CustomLink from '@/components/ui/CustomLink/CustomLink';
import Headline from '@/components/ui/Headline/Headline';
import Paragraph from '@/components/ui/Paragraph/Paragraph';
import { useRegister } from '@/hooks/auth/useRegister';
import { PAGES_URL } from '@/lib/config/pages-url';
import {
  REGISTER_FORM_DEFAULT_VALUES,
  REGISTER_FORM_SCHEMA,
} from '@/lib/config/register-form';
import styles from '@/styles/form.module.css';
import { FormProps } from '@/types/form';

function RegisterForm(props: FormProps) {
  const { onSubmit } = useRegister();

  return (
    <Formik
      initialValues={REGISTER_FORM_DEFAULT_VALUES}
      validationSchema={REGISTER_FORM_SCHEMA}
      onSubmit={onSubmit}
    >
      {({ status }) => (
        <Form className={styles.form}>
          <Headline>{props.title}</Headline>
          <CustomInput name="username" placeholder="username" />
          <CustomInput name="email" type="email" placeholder="email" />
          <CustomInput name="password" type="password" placeholder="password" />

          <div className={styles.checkboxWrapper}>
            <CustomCheckbox label="Is admin" name="isAdmin" />
          </div>

          {status && <Paragraph color="error">{status}</Paragraph>}

          <CustomButton type="submit">Submit</CustomButton>

          <Paragraph>
            Have an account?{' '}
            <CustomLink href={PAGES_URL.LOG_IN}>Sign in</CustomLink>
          </Paragraph>
        </Form>
      )}
    </Formik>
  );
}

export default RegisterForm;
