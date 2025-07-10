import { DialogActions } from '@mui/material';
import { Form, Formik, FormikHelpers } from 'formik';
import { useRouter } from 'next/navigation';

import CustomButton from '@/components/ui/CustomButton/CustomButton';
import CustomCheckbox from '@/components/ui/CustomCheckbox/CustomCheckbox';
import CustomInput from '@/components/ui/CustomInput/CustomInput';
import Headline from '@/components/ui/Headline/Headline';
import Paragraph from '@/components/ui/Paragraph/Paragraph';
import PicturePicker from '@/components/ui/PicturePicker/PicturePicker';
import { PAGES_URL } from '@/enums/pages-url';
import { Role } from '@/enums/role';
import { DEFAULT_AVATAR } from '@/lib/constants/avatar';
import { UPDATE_USER_FORM_SCHEMA } from '@/lib/constants/forms-validation';
import { useUpdateUserByIdMutation } from '@/redux/user/user-api';
import styles from '@/styles/form.module.scss';
import { IUser, UpdateUserFormValues } from '@/types/user';

type UpdateUserFormProps = {
  user: IUser;
  onClose: () => void;
  onConfirm: () => void;
};

function UpdateUserForm({ user, onConfirm, onClose }: UpdateUserFormProps) {
  const [updateUser] = useUpdateUserByIdMutation();
  const router = useRouter();

  const initialValues: UpdateUserFormValues = {
    avatar: undefined,
    username: user.username,
    email: user.email,
    isAdmin: user.role === Role.ADMIN,
  };

  const handleSubmit = async (
    values: UpdateUserFormValues,
    { setStatus }: FormikHelpers<UpdateUserFormValues>,
  ) => {
    try {
      const formData = new FormData();
      formData.append('username', String(values.username));
      formData.append('email', values.email);
      formData.append('isAdmin', String(values.isAdmin));

      if (values.avatar) {
        formData.append('avatar', values.avatar);
      }

      const res = await updateUser({
        id: user.id,
        formData,
      }).unwrap();

      if (res) {
        onConfirm();
        router.push(PAGES_URL.USERS);
      }
    } catch (error: any) {
      setStatus(error?.data?.message || 'Registration error');
    }
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={UPDATE_USER_FORM_SCHEMA}
      onSubmit={handleSubmit}
    >
      {({ status, setFieldValue }) => (
        <Form className={`${styles.form} ${styles.white}`}>
          <Headline color="dark">Edit</Headline>
          <PicturePicker
            onChange={(event) =>
              setFieldValue('avatar', event.target.files?.[0])
            }
            prewiew={user.avatarUrl ?? DEFAULT_AVATAR}
            labalColor="dark"
          />

          <CustomInput
            background="dark"
            name="username"
            placeholder="username"
          />
          <CustomInput
            background="dark"
            name="email"
            type="email"
            placeholder="email"
          />

          <div className={styles.checkboxWrapper}>
            <CustomCheckbox label="Is admin" labelColor="dark" name="isAdmin" />
          </div>

          {status && <Paragraph color="error">{status}</Paragraph>}

          <DialogActions className={styles.actions}>
            <CustomButton type="submit" background="green">
              Save
            </CustomButton>
            <CustomButton background="red" onClick={onClose}>
              Close
            </CustomButton>
          </DialogActions>
        </Form>
      )}
    </Formik>
  );
}

export default UpdateUserForm;
