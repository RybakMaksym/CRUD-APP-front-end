import { Form } from '@/entity/Form';
import { LogInForm } from '@/features/LogInForm';

function SignInForm() {
  return (
    <Form title="Sign In">
      <LogInForm />
    </Form>
  );
}

export default SignInForm;
