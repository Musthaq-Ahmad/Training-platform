import googleGIcon from './assets/google-g.svg';
import styles from './AccessRestrictedCard.module.css';
import UserIcon from './assets/icons/userIcon';
import ShieldIcon from './assets/icons/shieldIcon';
import LockIcon from './assets/icons/lockIcon';
import CrossIcon from './assets/icons/crossIcon';
import WarningTriangleIcon from './assets/icons/warningTriangleIcon';

interface AccessRestrictedCardProps {
  detectedEmail: string;
  domainInfo: string;
  allowedDomain: string;
  onSignInRetry: () => void;
}

export default function AccessRestrictedCard({
  detectedEmail,
  domainInfo,
  allowedDomain,
  onSignInRetry,
}: AccessRestrictedCardProps) {
  return (
    <div className={styles.page}>
      <div className={styles.card}>
        <div className={styles.iconWrap}>
          <div className={styles.iconCircle}>
            <ShieldIcon />
          </div>
          <div className={styles.lockBadge}>
            <LockIcon />
          </div>
        </div>

        <h1 className={styles.title}>Access Restricted</h1>

        <p className={styles.description}>
          Your account is not authorized to access this internal training platform. Please sign in
          using your verified enterprise identity under{' '}
          <span className={styles.domainHighlight}>@{allowedDomain}</span>.
        </p>

        <div className={styles.identityPanel}>
          <div className={styles.identityHeader}>
            <span className={styles.identityLabel}>Detected identity</span>
            <span className={styles.realmBadge}>Untrusted realm</span>
          </div>

          <div className={styles.identityRow}>
            <div className={styles.avatarCircle}>
              <div className={styles.avatarIcon}>
                <UserIcon />
              </div>
            </div>
            <div className={styles.identityDetails}>
              <div className={styles.emailRow}>
                <span className={styles.email}>{detectedEmail}</span>
                <span className={styles.emailFlag} aria-hidden="true">
                  <CrossIcon />
                </span>
              </div>
              <p className={styles.domainInfo}>{domainInfo}</p>
            </div>
          </div>

          <div className={styles.policyBox}>
            <WarningTriangleIcon />
            <p className={styles.policyText}>
              Platform boundary policy mandates provisioned engineering trainee accounts governed
              under the Vonnue Zero-Trust Directory service.
            </p>
          </div>
        </div>

        <button type="button" className={styles.retryButton} onClick={onSignInRetry}>
          <span className={styles.retryIconCircle}>
            <img src={googleGIcon} alt="" className={styles.retryIcon} />
          </span>
          Sign In with Google Account
        </button>
      </div>
    </div>
  );
}
