import type { ReactNode } from 'react';
import { useState } from 'react';
import { useAuth } from '../../context/Useauth';
import styles from './Header.module.css';
import { useActivity } from '../../context/useActivity';
import { NavLink } from 'react-router';
import { ConfirmPopover } from '../Common/ConfirmDialog'; // adjust path if needed
import ThemeToggle from '../ThemeToggle';

type HeaderProps = {
  /** Replaces the app name on the left. The task page puts its breadcrumb here. */
  leading?: ReactNode;
  /** Shown just before the nav links. The task page's session timer goes here later. */
  status?: ReactNode;
};

function HomeIcon() {
  return (
    <svg
      width="16"
      height="18"
      viewBox="0 0 16 18"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M1.5 7.2 8 1.5l6.5 5.7v8.3a1 1 0 0 1-1 1H10v-5H6v5H2.5a1 1 0 0 1-1-1V7.2Z" />
    </svg>
  );
}

function KeyboardIcon() {
  return (
    <svg
      width="20"
      height="14"
      viewBox="0 0 20 14"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <rect x="1" y="1" width="18" height="12" rx="2" />
      <path d="M5 5h.01M8 5h.01M11 5h.01M14 5h.01M6 9h8" />
    </svg>
  );
}

function JournalIcon() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 18 18"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M3 3.5h9a2 2 0 0 1 2 2v9H5a2 2 0 0 1-2-2v-9Z" />
      <path d="M5 3.5v9a2 2 0 0 0 2 2M7 7h4M7 10h4" />
    </svg>
  );
}

function UserIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <circle cx="8" cy="5" r="3" />
      <path d="M2 14.5c.4-2.6 2.8-4.2 6-4.2s5.6 1.6 6 4.2" />
    </svg>
  );
}

function PowerIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M15.3 5.53a7.5 7.5 0 1 1-10.61 0" />
      <path d="M10 1.67V10" />
    </svg>
  );
}

function NavLabel({ text }: { text: string }) {
  return (
    <span className={styles.label} data-text={text}>
      {text}
    </span>
  );
}

export default function Header({ leading, status }: HeaderProps) {
  const activity = useActivity();
  const { user, logout } = useAuth();
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const [logoutError, setLogoutError] = useState<string | null>(null);

  const openConfirm = () => {
    setLogoutError(null);
    setConfirmOpen(true);
  };

  const closeConfirm = () => {
    if (isLoggingOut) return;
    setConfirmOpen(false);
  };

  const handleLogout = async () => {
    setIsLoggingOut(true);
    setLogoutError(null);
    try {
      // Save pending progress / active time before the session ends.
      await activity?.flushNow();
      await logout();
      // On success the auth state clears and the app leaves this page,
      // so the dialog doesn't need to be closed manually.
      setConfirmOpen(false);
    } catch (error) {
      console.error('Logout failed', error);
      setLogoutError('Could not log out. Please try again.');
    } finally {
      setIsLoggingOut(false);
    }
  };

  const profileLabel = user?.name ?? 'Profile';

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        {leading ?? (
          <span className={styles.appName}>
            Vink<span className={styles.up}>Up</span>
          </span>
        )}

        <div className={styles.end}>
          {status}
          <nav className={styles.nav}>
            <NavLink
              to="/"
              end
              className={({ isActive }) => `${styles.link} ${isActive ? styles.active : ''}`}
            >
              <HomeIcon />
              <NavLabel text="Home" />
            </NavLink>

            <NavLink
              to="/typing-test"
              end
              className={({ isActive }) => `${styles.link} ${isActive ? styles.active : ''}`}
            >
              <KeyboardIcon />
              <NavLabel text="Typing Test" />
            </NavLink>
            <NavLink
              to="/journal"
              end
              className={({ isActive }) => `${styles.link} ${isActive ? styles.active : ''}`}
            >
              <JournalIcon />
              <NavLabel text="Journal" />
            </NavLink>
            <NavLink
              to="/profile"
              className={({ isActive }) => `${styles.link} ${isActive ? styles.active : ''}`}
            >
              <UserIcon />
              <NavLabel text={profileLabel} />
            </NavLink>
          </nav>
          <ThemeToggle />
          <span className={styles.divider} aria-hidden="true" />
          <div className={styles.actions}>
            <ConfirmPopover
              open={confirmOpen}
              message="Log out?"
              confirmLabel="Log out"
              busyLabel="Logging out…"
              isBusy={isLoggingOut}
              error={logoutError}
              onConfirm={() => {
                void handleLogout();
              }}
              onCancel={closeConfirm}
            >
              <button
                type="button"
                className={styles.logoutButton}
                aria-label="Log out"
                aria-haspopup="dialog"
                aria-expanded={confirmOpen}
                title="Log out"
                onClick={openConfirm}
              >
                <PowerIcon className={styles.logoutIcon} />
              </button>
            </ConfirmPopover>
          </div>
        </div>
      </div>
    </header>
  );
}
