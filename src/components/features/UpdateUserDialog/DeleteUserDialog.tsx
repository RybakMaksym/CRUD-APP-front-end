'use client';

import { Dialog, DialogActions } from '@mui/material';
import { Form, Formik, FormikHelpers } from 'formik';
import { useRouter } from 'next/navigation';

import CustomButton from '@/components/ui/CustomButton/CustomButton';
import CustomCheckbox from '@/components/ui/CustomCheckbox/CustomCheckbox';
import CustomInput from '@/components/ui/CustomInput/CustomInput';
import Paragraph from '@/components/ui/Paragraph/Paragraph';
import PicturePicker from '@/components/ui/PicturePicker/PicturePicker';
import { PAGES_URL } from '@/enums/pages-url';
import { Role } from '@/enums/role';
import { DEFAULT_AVATAR } from '@/lib/constants/avatar';
import { UPDATE_USER_FORM_SCHEMA } from '@/lib/constants/forms-validation';
import { useUpdateUserByIdMutation } from '@/redux/user/user-api';
import { IUser, UpdateUserForm } from '@/types/user';

type UpdateUserDialogProps = {
  user: IUser;
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
};

function UpdateUserDialog({
  user,
  open,
  onClose,
  onConfirm,
}: UpdateUserDialogProps) {
  const [updateUser] = useUpdateUserByIdMutation();
  const router = useRouter();

  const initialValues: UpdateUserForm = {
    avatar: null,
    username: user.username,
    email: user.email,
    isAdmin: user.role === Role.ADMIN,
  };

  const handleSubmit = async (
    values: UpdateUserForm,
    { setStatus }: FormikHelpers<UpdateUserForm>,
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
        id: user._id,
        formData,
      }).unwrap();

      if (res) {
        router.push(PAGES_URL.USERS);
      }
    } catch (error: any) {
      setStatus(error?.data?.message || 'Registration error');
    }
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <Paragraph color="dark">Edit</Paragraph>
      <Formik
        initialValues={initialValues}
        validationSchema={UPDATE_USER_FORM_SCHEMA}
        onSubmit={handleSubmit}
      >
        {({ status, setFieldValue }) => (
          <Form>
            <PicturePicker
              onChange={(event) =>
                setFieldValue('avatar', event.target.files?.[0])
              }
              prewiew={user.avatarUrl ?? DEFAULT_AVATAR}
            />

            <CustomInput name="username" placeholder="username" />
            <CustomInput name="email" type="email" placeholder="email" />

            <CustomCheckbox label="Is admin" name="isAdmin" />

            {status && <Paragraph color="error">{status}</Paragraph>}

            <DialogActions>
              <CustomButton
                type="submit"
                background="green"
                onClick={onConfirm}
              >
                Save
              </CustomButton>
              <CustomButton background="red" onClick={onClose}>
                Close
              </CustomButton>
            </DialogActions>
          </Form>
        )}
      </Formik>
    </Dialog>
  );
}

export default UpdateUserDialog;
