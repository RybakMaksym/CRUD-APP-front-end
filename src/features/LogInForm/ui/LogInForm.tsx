'use client';

import CustomButton from '@/shared/components/CustomButton/CustomButton';
import CustomImput from '@/shared/components/CustomImput/CustomImput';
import CustomLink from '@/shared/components/CustomLink/CustomLink';
import Paragraph from '@/shared/components/Paragraph/Paragraph';
import { PAGES_URL } from '@/shared/config/pages-url.config';
import { useLogIn } from '@/shared/hooks/auth/useLogIn';
import { Form, Formik } from 'formik';
import { logInFormSchema } from '../config/log-in-form.schema';

function LogInForm() {
  const { onSubmit } = useLogIn();

  return (
    <Formik
      initialValues={{ email: '', password: '' }}
      validationSchema={logInFormSchema}
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
          {status && <Paragraph variant="error">{status}</Paragraph>}

          <CustomImput name="email" type="email" placeholder="email" />
          <CustomImput name="password" type="password" placeholder="password" />
          <CustomButton type="submit" style={{ marginTop: '24px' }}>
            Submit
          </CustomButton>
          <Paragraph>
            {"Don't have an accouunt?"}
            <CustomLink href={PAGES_URL.REGISTER}>Sign up</CustomLink>
          </Paragraph>
        </Form>
      )}
    </Formik>
  );
}

export default LogInForm;

