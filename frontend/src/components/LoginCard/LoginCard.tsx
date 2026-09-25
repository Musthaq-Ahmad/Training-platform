import googleLogo from './assets/google-logo.svg';
import shieldCheckIcon from './assets/shield-check.svg';
import LockIcon from './assets/icons/lockIcon';
import styles from './LoginCard.module.css';

export default function LoginCard() {
  const handleGoogleSignIn = () => {
    // window.location.href = `${import.meta.env.VITE_API_URL}/api/auth/google`;
    window.location.href = 'http://localhost:3000/api/auth/google';
    console.log(`Now user in ${import.meta.env.VITE_API_URL}`);
  };

  return (
    <div className={styles.page}>
      <div className={styles.card}>
        <div className={styles.badgeWrap}>
          <div className={styles.badgeGlow} />
          <div className={styles.badge}>
            <span className={styles.badgeText}>{'>_'}</span>
          </div>
        </div>

        <div className={styles.headings}>
          <h1 className={styles.title}>In-House Trainee Training Platform</h1>
          <p className={styles.subtitle}>
            Learn, practice, and track your technical training progress.
          </p>
        </div>

        <div className={styles.actionSection}>
          <button type="button" className={styles.googleButton} onClick={handleGoogleSignIn}>
            <img src={googleLogo} alt="" className={styles.googleIcon} />
            <span className={styles.googleButtonText}>Continue with Google</span>
          </button>

          <div className={styles.subtext}>
            <img src={shieldCheckIcon} alt="" className={styles.subtextIcon} />
            <span>Sign in using your authorized google account</span>
          </div>
        </div>

        <div className={styles.restrictedPanel}>
          <div className={styles.lockBadge}>
            <LockIcon />
          </div>

          <div className={styles.securityText}>
            <p className={styles.securityLabel}>ENTERPRISE SECURITY</p>
            <p className={styles.securityDesc}>
              Access restricted to authorized
              <span className={styles.domainHighlight}> @vonnue.com </span> accounts only.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
