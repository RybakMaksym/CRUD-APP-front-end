'use client';

import { Form, Formik } from 'formik';

import { LOG_IN_FORM_SCHEMA } from '@/features/LogInForm/config/log-in-form.schema';
import styles from '@/features/LogInForm/ui/LogInForm.module.css';
import CustomButton from '@/shared/components/CustomButton/CustomButton';
import CustomInput from '@/shared/components/CustomInput/CustomInput';
import CustomLink from '@/shared/components/CustomLink/CustomLink';
import Paragraph from '@/shared/components/Paragraph/Paragraph';
import { PAGES_URL } from '@/shared/config/pages-url.config';
import { useLogIn } from '@/shared/hooks/auth/useLogIn';

function LogInForm() {
  const { onSubmit } = useLogIn();

  return (
    <Formik
      initialValues={{ email: '', password: '' }}
      validationSchema={LOG_IN_FORM_SCHEMA}
      onSubmit={onSubmit}
    >
      {({ status }) => (
        <Form className={styles.form}>
          {status && <Paragraph variant="error">{status}</Paragraph>}

          <CustomInput name="email" type="email" placeholder="email" />
          <CustomInput name="password" type="password" placeholder="password" />

          <CustomButton type="submit">Submit</CustomButton>

          <Paragraph>
            {"Don't have an account?"}
            <CustomLink href={PAGES_URL.REGISTER}>Sign up</CustomLink>
          </Paragraph>
        </Form>
      )}
    </Formik>
  );
}

export default LogInForm;
