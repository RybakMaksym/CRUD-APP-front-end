'use client';

import type { FormikHelpers } from 'formik';
import { Form, Formik } from 'formik';
import { useRouter } from 'next/navigation';

import CustomButton from '@/components/ui/CustomButton/CustomButton';
import CustomInput from '@/components/ui/CustomInput/CustomInput';
import CustomLink from '@/components/ui/CustomLink/CustomLink';
import Headline from '@/components/ui/Headline/Headline';
import Paragraph from '@/components/ui/Paragraph/Paragraph';
import { PAGES_URL } from '@/enums/pages-url';
import { useAppDispatch } from '@/hooks/use-app-dispatch';
import {
  LOG_IN_FORM_DEFAULT_VALUES,
  LOG_IN_FORM_SCHEMA,
} from '@/lib/constants/forms-validation';
import { fullLogIn } from '@/redux/actions/full-log-in';
import { useLogInMutation } from '@/redux/auth/authorization-api';
import styles from '@/styles/form.module.scss';
import type { ILogInForm } from '@/types/auth';
import type { AuthFormProps } from '@/types/auth-form';

function LogInForm(props: AuthFormProps) {
  const [logIn] = useLogInMutation();
  const dispatch = useAppDispatch();
  const router = useRouter();

  const handleSubmit = async (
    values: ILogInForm,
    { setStatus }: FormikHelpers<ILogInForm>,
  ) => {
    try {
      const res = await logIn(values).unwrap();
      dispatch(fullLogIn(res));
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
      {({ status, errors }) => {
        const validationErrors = Object.values(errors);

        return (
          <Form className={`${styles.form} ${styles.dark}`}>
            <Headline>{props.title}</Headline>

            {(status || validationErrors.length > 0) && (
              <div>
                {status && <Paragraph color="error">{status}</Paragraph>}
                {validationErrors.map((err, idx) => (
                  <Paragraph key={idx} color="error">
                    {err}
                  </Paragraph>
                ))}
              </div>
            )}

            <CustomInput
              name="email"
              type="email"
              placeholder="Email"
              showError={false}
            />
            <CustomInput
              name="password"
              type="password"
              placeholder="Password"
              showError={false}
            />

            <CustomButton type="submit">Sign In</CustomButton>

            <Paragraph>
              <div className={styles.link}>
                {"Don't have an account?"}
                <CustomLink href={PAGES_URL.REGISTER}>Sign up</CustomLink>
              </div>
            </Paragraph>
          </Form>
        );
      }}
    </Formik>
  );
}

export default LogInForm;
