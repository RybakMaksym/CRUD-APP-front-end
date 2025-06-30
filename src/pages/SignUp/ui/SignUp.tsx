import styles from '@/pages/SignUp/ui/SignUp.module.css';
import { SignUpForm } from '@/widgets/SignUpForm';

function SignUp() {
  return (
    <div className={styles.container}>
      <SignUpForm />
    </div>
  );
}

export default SignUp;
