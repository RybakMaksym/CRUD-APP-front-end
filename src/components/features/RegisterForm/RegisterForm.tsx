'use client';

import type { FormikHelpers } from 'formik';
import { Form, Formik } from 'formik';
import { useRouter } from 'next/navigation';

import CustomButton from '@/components/ui/CustomButton/CustomButton';
import CustomCheckbox from '@/components/ui/CustomCheckbox/CustomCheckbox';
import CustomInput from '@/components/ui/CustomInput/CustomInput';
import CustomLink from '@/components/ui/CustomLink/CustomLink';
import Headline from '@/components/ui/Headline/Headline';
import Paragraph from '@/components/ui/Paragraph/Paragraph';
import PicturePicker from '@/components/ui/PicturePicker/PicturePicker';
import { PAGES_URL } from '@/enums/pages-url';
import { useAppDispatch } from '@/hooks/use-app-dispatch';
import {
  REGISTER_FORM_DEFAULT_VALUES,
  REGISTER_FORM_SCHEMA,
} from '@/lib/constants/forms-validation';
import { fullLogIn } from '@/redux/actions/full-log-in';
import { useRegisterMutation } from '@/redux/auth/authorization-api';
import styles from '@/styles/form.module.scss';
import type { IRegisterForm } from '@/types/auth';
import type { AuthFormProps } from '@/types/auth-form';

function RegisterForm(props: AuthFormProps) {
  const [register] = useRegisterMutation();
  const dispatch = useAppDispatch();
  const router = useRouter();

  const handleSubmit = async (
    values: IRegisterForm,
    { setStatus }: FormikHelpers<IRegisterForm>,
  ) => {
    try {
      const formData = new FormData();
      formData.append('username', String(values.username));
      formData.append('email', values.email);
      formData.append('password', values.password);
      formData.append('isAdmin', String(values.isAdmin));

      if (values.avatar) {
        formData.append('avatar', values.avatar);
      }

      const res = await register(formData).unwrap();
      dispatch(fullLogIn(res));
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
      {({ status, setFieldValue }) => (
        <Form className={`${styles.form} ${styles.dark}`}>
          <Headline>{props.title}</Headline>
          {status && <Paragraph color="error">{status}</Paragraph>}

          <PicturePicker
            onChange={(event) =>
              setFieldValue('avatar', event.target.files?.[0])
            }
          />

          <CustomInput name="username" placeholder="Username" />
          <CustomInput name="email" type="email" placeholder="Email" />
          <CustomInput name="password" type="password" placeholder="Password" />

          <div className={styles['checkbox-wrapper']}>
            <CustomCheckbox label="Is admin" name="isAdmin" />
          </div>

          <CustomButton type="submit">Sign Up</CustomButton>

          <Paragraph>
            <div className={styles.link}>
              Have an account?
              <CustomLink href={PAGES_URL.LOG_IN}>Sign in</CustomLink>
            </div>
          </Paragraph>
        </Form>
      )}
    </Formik>
  );
}

export default RegisterForm;
