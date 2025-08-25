import { DialogActions } from '@mui/material';
import type { FormikHelpers } from 'formik';
import { Form, Formik } from 'formik';

import CustomButton from '@/components/ui/CustomButton/CustomButton';
import CustomInput from '@/components/ui/CustomInput/CustomInput';
import GenderPicker from '@/components/ui/GenderPicker/GenderPicker';
import Headline from '@/components/ui/Headline/Headline';
import Paragraph from '@/components/ui/Paragraph/Paragraph';
import PicturePicker from '@/components/ui/PicturePicker/PicturePicker';
import { DEFAULT_AVATAR } from '@/lib/constants/avatar';
import { CREATE_PROFILE_FORM_SCHEMA } from '@/lib/constants/forms-validation';
import { useUpdateProfileByIdMutation } from '@/redux/profile/profile-api';
import styles from '@/styles/form.module.scss';
import type { IProfile, UpdateProfileFormValues } from '@/types/profile';

type UpdateProfileFormProps = {
  profile: IProfile;
  onClose: () => void;
  onConfirm: () => void;
};

function UpdateProfileForm({
  profile,
  onConfirm,
  onClose,
}: UpdateProfileFormProps) {
  const [updateProfile, { isLoading }] = useUpdateProfileByIdMutation();

  const initialValues: UpdateProfileFormValues = {
    name: profile.name,
    gender: profile.gender,
    birthDate: new Date(profile.birthDate).toISOString().split('T')[0],
    country: profile.country,
    city: profile.city,
    avatarUrl: undefined,
  };

  const handleSubmit = async (
    values: UpdateProfileFormValues,
    { setStatus }: FormikHelpers<UpdateProfileFormValues>,
  ) => {
    try {
      const formData = new FormData();
      formData.append('name', values.name);
      formData.append('gender', values.gender);
      formData.append('birthDate', values.birthDate);
      formData.append('country', values.country);
      formData.append('city', values.city);

      if (values.avatarUrl) {
        formData.append('avatar', values.avatarUrl);
      }

      const res = await updateProfile({
        id: profile.id,
        formData,
      }).unwrap();

      if (res) {
        onConfirm();
      }
    } catch (error: any) {
      setStatus(error?.data?.message || 'Registration error');
    }
  };

  return (
    <Formik
      validationSchema={CREATE_PROFILE_FORM_SCHEMA}
      initialValues={initialValues}
      onSubmit={handleSubmit}
    >
      {({ status, setFieldValue }) => (
        <Form className={`${styles.form} ${styles.white}`}>
          <Headline color="dark">Edit profile</Headline>

          <PicturePicker
            onChange={(event) => {
              if (event.target.files?.[0]) {
                setFieldValue('avatarUrl', event.target.files[0]);
              }
            }}
            preview={profile.avatarUrl ?? DEFAULT_AVATAR}
            labelColor="dark"
          />
          <CustomInput background="dark" name="name" placeholder="Name" />

          <GenderPicker />

          <CustomInput background="dark" name="birthDate" type="date" />
          <CustomInput background="dark" name="country" placeholder="Country" />
          <CustomInput background="dark" name="city" placeholder="City" />

          {status && <Paragraph color="error">{status}</Paragraph>}

          <DialogActions className={styles.actions}>
            <CustomButton
              type="submit"
              isLoading={isLoading}
              background="green"
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
  );
}

export default UpdateProfileForm;
