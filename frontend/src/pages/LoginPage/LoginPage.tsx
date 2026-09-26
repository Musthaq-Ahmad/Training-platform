import { useSearchParams } from 'react-router';
import LoginCard from '../../components/LoginCard';
import AccessRestrictedCard from '../../components/AccessRestrictedCard';

export default function LoginPage() {
  const [searchParams] = useSearchParams();
  const error = searchParams.get('error');

  const handleGoogleSignIn = () => {
    window.location.href = `${import.meta.env.VITE_API_URL}/api/auth/google`;
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
  return <LoginCard />;
}
