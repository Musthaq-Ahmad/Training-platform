import { useSearchParams } from 'react-router';
import LoginCard from '../../components/LoginCard';
import AccessRestrictedCard from '../../components/AccessRestrictedCard';

export default function LoginPage() {
  const [searchParams] = useSearchParams();
  const error = searchParams.get('error');

  const handleGoogleSignIn = () => {
    window.location.href = `${import.meta.env.VITE_API_URL}/api/auth/google`;
  };
  if (error === 'domain_not_permitted') {
    return (
      <AccessRestrictedCard
        detectedEmail={searchParams.get('email') ?? 'unknown'}
        domainInfo="External Personal Domain • OAuth2 / IdP Ingress"
        allowedDomain="vonnue.com"
        onSignInRetry={handleGoogleSignIn}
      />
    );
  }
  return <LoginCard />;
}
