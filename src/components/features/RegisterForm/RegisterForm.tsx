'use client';

import { Form, Formik, FormikHelpers } from 'formik';
import { useRouter } from 'next/navigation';

import CustomButton from '@/components/ui/CustomButton/CustomButton';
import CustomCheckbox from '@/components/ui/CustomCheckbox/CustomCheckbox';
import CustomInput from '@/components/ui/CustomInput/CustomInput';
import CustomLink from '@/components/ui/CustomLink/CustomLink';
import Headline from '@/components/ui/Headline/Headline';
import Paragraph from '@/components/ui/Paragraph/Paragraph';
import PicturePicker from '@/components/ui/PicturePicker/PicturePicker';
import { PAGES_URL } from '@/enums/pages-url';
import { useAppDispatch } from '@/hooks/use-app-dipatch';
import {
  REGISTER_FORM_DEFAULT_VALUES,
  REGISTER_FORM_SCHEMA,
} from '@/lib/constants/forms-validation';
import { fullLogIn } from '@/redux/actions/full-log-in';
import { useRegisterMutation } from '@/redux/auth/authorization-api';
import styles from '@/styles/form.module.scss';
import { IRegisterForm } from '@/types/auth';
import { AuthFormProps } from '@/types/auth-form';

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
        <Form className={styles.form}>
          <Headline>{props.title}</Headline>

          <PicturePicker
            onChange={(event) =>
              setFieldValue('avatar', event.target.files?.[0])
            }
          />

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
