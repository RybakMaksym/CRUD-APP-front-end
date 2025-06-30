import styles from '@/pages/SignIn/ui/SignIn.module.css';
import { SignInForm } from '@/widgets/SignInForm';

function SignIn() {
  return (
    <div className={styles.container}>
      <SignInForm />
    </div>
  );
}

export default SignIn;
