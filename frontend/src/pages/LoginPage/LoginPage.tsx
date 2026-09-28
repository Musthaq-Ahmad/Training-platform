import { useSearchParams } from 'react-router';
import LoginCard from '../../components/LoginCard';
import AccessRestrictedCard from '../../components/AccessRestrictedCard';
import { useAuth } from '../../context/Useauth';

export default function LoginPage() {
  const { login } = useAuth();
  const [searchParams] = useSearchParams();
  const error = searchParams.get('error');

  const handleGoogleSignIn = () => {
    login();
  };
  if (error === 'DOMAIN_NOT_PERMITTED' || error === 'NOT_PROVISIONED' || error === 'LOGIN_FAILED') {
    return (
      <AccessRestrictedCard
        detectedEmail={searchParams.get('email') ?? 'unknown'}
        domainInfo={
          error === 'DOMAIN_NOT_PERMITTED'
            ? 'External Personal Domain • OAuth2 / IdP Ingress'
            : 'Valid Domain • Account Not Provisioned'
        }
        allowedDomain="vonnue.com"
        onSignInRetry={handleGoogleSignIn}
      />
    );
  }
  return <LoginCard handleGoogleSignIn={handleGoogleSignIn} />;
}
