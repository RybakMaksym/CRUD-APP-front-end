'use client';

import CustomButton from '@/shared/components/CustomButton/CustomButton';
import CustomCheckbox from '@/shared/components/CustomCheckbox/CustomCheckbox';
import CustomImput from '@/shared/components/CustomImput/CustomImput';
import CustomLink from '@/shared/components/CustomLink/CustomLink';
import Paragraph from '@/shared/components/Paragraph/Paragraph';
import { PAGES_URL } from '@/shared/config/pages-url.config';
import { useRegister } from '@/shared/hooks/auth/useRegister';
import { Form, Formik } from 'formik';
import { registerFormSchema } from '../config/register-form.schema';

function RegisterForm() {
  const { onSubmit } = useRegister();

  return (
    <Formik
      initialValues={{ username: '', email: '', password: '', isAdmin: false }}
      validationSchema={registerFormSchema}
      onSubmit={onSubmit}
    >
      {({ status }) => (
        <Form
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '30px',
            marginTop: '30px',
          }}
        >
          <CustomImput name="username" placeholder="username" />
          <CustomImput name="email" type="email" placeholder="email" />
          <CustomImput name="password" type="password" placeholder="password" />
          <div style={{ alignSelf: 'start' }}>
            <CustomCheckbox label="Is admin" name="isAdmin" />
          </div>

          {status && <Paragraph variant="error">{status}</Paragraph>}

          <CustomButton type="submit" style={{ marginTop: '24px' }}>
            Submit
          </CustomButton>
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

