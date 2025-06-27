import { SignInForm } from '@/widgets/SignInForm';

function SignIn() {
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
      <SignInForm />
    </div>
  );
}

export default SignIn;
