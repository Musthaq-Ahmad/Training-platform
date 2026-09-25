import styles from './Header.module.css';

const userName = 'Rahul Sharma';

export default function Header() {
  const handleProfileClick = () => {
    // TODO: replace with <NavLink to="/profile"> once routing exists
    console.log('profile clicked');
  };

  const handleDashboardClick = () => {
    // TODO: replace with <NavLink to="/"> once routing exists
    console.log('dashboard clicked');
  };

  const handleLogout = () => {
    // TODO: replace with useAuth().logout() once AuthContext exists
    console.log('logout clicked');
  };

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <span className={styles.appName}>In-House Trainee Training Platform</span>

        <nav className={styles.nav}>
          <button className={styles.pageLabel} onClick={handleDashboardClick}>
            Dashboard
          </button>
          <span className={styles.divider}>/</span>
          <button className={styles.userName} onClick={handleProfileClick}>
            {userName}
          </button>
          <span className={styles.divider}>/</span>
          <button className={styles.logoutButton} onClick={handleLogout}>
            Log out
          </button>
        </nav>
      </div>
    </header>
  );
}
