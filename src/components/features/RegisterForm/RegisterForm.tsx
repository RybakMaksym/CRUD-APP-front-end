'use client';

import { Form, Formik, FormikHelpers } from 'formik';
import { useRouter } from 'next/navigation';

import CustomButton from '@/components/ui/CustomButton/CustomButton';
import CustomCheckbox from '@/components/ui/CustomCheckbox/CustomCheckbox';
import CustomInput from '@/components/ui/CustomInput/CustomInput';
import CustomLink from '@/components/ui/CustomLink/CustomLink';
import Headline from '@/components/ui/Headline/Headline';
import Paragraph from '@/components/ui/Paragraph/Paragraph';
import { useAppDispatch } from '@/hooks/use-app-dipatch';
import {
  REGISTER_FORM_DEFAULT_VALUES,
  REGISTER_FORM_SCHEMA,
} from '@/lib/config/auth-forms';
import { PAGES_URL } from '@/lib/config/pages-url';
import { useRegisterMutation } from '@/redux/auth/auth.api';
import { setTokens } from '@/redux/auth/auth.slice';
import styles from '@/styles/form.module.scss';
import { IRegisterForm } from '@/types/auth';
import { FormProps } from '@/types/form';

function RegisterForm(props: FormProps) {
  const [register] = useRegisterMutation();
  const dispatch = useAppDispatch();
  const router = useRouter();

  const handleSubmit = async (
    values: typeof REGISTER_FORM_DEFAULT_VALUES,
    { setStatus }: FormikHelpers<IRegisterForm>,
  ) => {
    try {
      const res = await register(values).unwrap();

      dispatch(
        setTokens({
          accessToken: res.accessToken,
          refreshToken: res.refreshToken,
        }),
      );
      router.push(PAGES_URL.PROFILES);
    } catch (error: any) {
      setStatus(error?.data?.message || 'Registration error');
    }
  };

  return (
    <Formik
      initialValues={REGISTER_FORM_DEFAULT_VALUES}
      validationSchema={REGISTER_FORM_SCHEMA}
      onSubmit={handleSubmit}
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
