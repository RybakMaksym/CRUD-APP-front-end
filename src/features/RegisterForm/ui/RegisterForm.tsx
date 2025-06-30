'use client';

import { Form, Formik } from 'formik';

import { REGISTER_FORM_SCHEMA } from '@/features/RegisterForm/config/register-form.schema';
import styles from '@/features/RegisterForm/ui/RegisterForm.module.css';
import CustomButton from '@/shared/components/CustomButton/CustomButton';
import CustomCheckbox from '@/shared/components/CustomCheckbox/CustomCheckbox';
import CustomInput from '@/shared/components/CustomInput/CustomInput';
import CustomLink from '@/shared/components/CustomLink/CustomLink';
import Paragraph from '@/shared/components/Paragraph/Paragraph';
import { PAGES_URL } from '@/shared/config/pages-url.config';
import { useRegister } from '@/shared/hooks/auth/useRegister';

function RegisterForm() {
  const { onSubmit } = useRegister();

  return (
    <Formik
      initialValues={{ username: '', email: '', password: '', isAdmin: false }}
      validationSchema={REGISTER_FORM_SCHEMA}
      onSubmit={onSubmit}
    >
      {({ status }) => (
        <Form className={styles.form}>
          <CustomInput name="username" placeholder="username" />
          <CustomInput name="email" type="email" placeholder="email" />
          <CustomInput name="password" type="password" placeholder="password" />

          <div className={styles.checkboxWrapper}>
            <CustomCheckbox label="Is admin" name="isAdmin" />
          </div>

          {status && <Paragraph variant="error">{status}</Paragraph>}

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
