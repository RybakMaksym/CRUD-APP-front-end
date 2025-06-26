import { Form } from '@/entity/Form';
import { RegisterForm } from '@/features/RegisterForm';

function SignUpForm() {
  return (
    <Form title="Sign Up">
      <RegisterForm />
    </Form>
  );
}

export default SignUpForm;
