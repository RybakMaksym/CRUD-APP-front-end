import * as Yup from 'yup';

export const registerFormSchema = Yup.object({
  username: Yup.string().required('Required'),
  email: Yup.string().email('Invalid email').required('Required'),
  password: Yup.string().required('Required'),
  isAdmin: Yup.boolean().default(false),
});
