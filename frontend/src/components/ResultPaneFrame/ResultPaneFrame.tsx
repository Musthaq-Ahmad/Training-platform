import { useRef, type KeyboardEvent, type ReactNode } from 'react';
import type { LucideIcon } from 'lucide-react';
import styles from './ResultPaneFrame.module.css';

export type ResultTab = {
  id: string;
  label: string;
  icon: LucideIcon;
  badge?: { text: string; tone: 'neutral' | 'error' };
};

type ResultPaneFrameProps = {
  tabs: ResultTab[];
  activeTab: string;
  onTabChange: (id: string) => void;
  toolbarEnd?: ReactNode;
  footer?: ReactNode;
  children: ReactNode;
};

export default function ResultPaneFrame({
  tabs,
  activeTab,
  onTabChange,
  toolbarEnd,
  footer,
  children,
}: ResultPaneFrameProps) {
  const tabRefs = useRef<Record<string, HTMLButtonElement | null>>({});

  function handleKeyDown(event: KeyboardEvent<HTMLButtonElement>, index: number) {
    if (event.key !== 'ArrowLeft' && event.key !== 'ArrowRight') return;
    event.preventDefault();

    const delta = event.key === 'ArrowRight' ? 1 : -1;
    const next = tabs[(index + delta + tabs.length) % tabs.length];
    if (!next) return;

    onTabChange(next.id);
    tabRefs.current[next.id]?.focus();
  }

  return (
    <div className={styles.frame}>
      <div className={styles.tabBar}>
        <div role="tablist" aria-label="Result" className={styles.tabList}>
          {tabs.map((tab, index) => {
            const isActive = tab.id === activeTab;
            const Icon = tab.icon;

            return (
              <button
                key={tab.id}
                ref={(el) => {
                  tabRefs.current[tab.id] = el;
                }}
                role="tab"
                type="button"
                aria-selected={isActive}
                tabIndex={isActive ? 0 : -1}
                className={isActive ? `${styles.tab} ${styles.tabActive}` : styles.tab}
                onClick={() => onTabChange(tab.id)}
                onKeyDown={(event) => handleKeyDown(event, index)}
              >
                <Icon size={16} aria-hidden="true" />
                {tab.label}
                {tab.badge && (
                  <span
                    className={
                      tab.badge.tone === 'error'
                        ? `${styles.badge} ${styles.badgeError}`
                        : styles.badge
                    }
                  >
                    {tab.badge.text}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {toolbarEnd && <div className={styles.toolbarEnd}>{toolbarEnd}</div>}
      </div>

      <div className={styles.body}>{children}</div>

      {footer && <div className={styles.footer}>{footer}</div>}
    </div>
  );
}
