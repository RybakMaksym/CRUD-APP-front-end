import { SignUpForm } from '@/widgets/SignUpForm';

function SignUp() {
  return (
    <div
      style={{
        minWidth: '100vw',
        minHeight: '100vh',
        padding: '69px 0px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundImage: 'url("/assets/backgrounds/auth-background.png")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}
    >
      <SignUpForm />
    </div>
  );
}

export default SignUp;
