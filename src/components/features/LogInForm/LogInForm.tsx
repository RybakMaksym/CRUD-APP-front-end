'use client';

import { Form, Formik, FormikHelpers } from 'formik';
import { useRouter } from 'next/navigation';

import CustomButton from '@/components/ui/CustomButton/CustomButton';
import CustomInput from '@/components/ui/CustomInput/CustomInput';
import CustomLink from '@/components/ui/CustomLink/CustomLink';
import Headline from '@/components/ui/Headline/Headline';
import Paragraph from '@/components/ui/Paragraph/Paragraph';
import { useAppDispatch } from '@/hooks/use-app-despatch';
import {
  LOG_IN_FORM_DEFAULT_VALUES,
  LOG_IN_FORM_SCHEMA,
} from '@/lib/config/auth-forms';
import { PAGES_URL } from '@/lib/config/pages-url';
import { useLogInMutation } from '@/redux/auth/auth.api';
import { setTokens } from '@/redux/auth/auth.slice';
import styles from '@/styles/form.module.scss';
import { ILogInForm } from '@/types/auth';
import { FormProps } from '@/types/form';

function LogInForm(props: FormProps) {
  const [logIn] = useLogInMutation();
  const dispatch = useAppDispatch();
  const router = useRouter();

  const handleSubmit = async (
    values: typeof LOG_IN_FORM_DEFAULT_VALUES,
    { setStatus }: FormikHelpers<ILogInForm>,
  ) => {
    try {
      const res = await logIn(values).unwrap();

      dispatch(
        setTokens({
          accessToken: res.accessToken,
          refreshToken: res.refreshToken,
        }),
      );
      router.push(PAGES_URL.PROFILES);
    } catch (error: any) {
      setStatus(error?.data?.message || 'Login error');
    }
  };

  return (
    <Formik
      initialValues={LOG_IN_FORM_DEFAULT_VALUES}
      validationSchema={LOG_IN_FORM_SCHEMA}
      onSubmit={handleSubmit}
    >
      {({ status }) => (
        <Form className={styles.form}>
          <Headline>{props.title}</Headline>
          {status && <Paragraph color="error">{status}</Paragraph>}

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
