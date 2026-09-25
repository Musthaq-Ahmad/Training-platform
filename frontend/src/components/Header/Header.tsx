import styles from './Header.module.css';

type HeaderProps = {
  currentPageLabel: string;
  onLogout: () => void;
  onProfileClick: () => void;
};
const userName = 'Rahul Sharma';

export default function Header({ currentPageLabel, onLogout, onProfileClick }: HeaderProps) {
  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <span className={styles.appName}>In-House Trainee Training Platform</span>

        <nav className={styles.nav}>
          <span className={styles.pageLabel}>{currentPageLabel}</span>
          <span className={styles.divider}>/</span>
          {userName && (
            <button className={styles.userName} onClick={onProfileClick}>
              {userName}
            </button>
          )}
          <span className={styles.divider}>/</span>
          <button className={styles.logoutButton} onClick={onLogout}>
            Log out
          </button>
        </nav>
      </div>
    </header>
  );
}
