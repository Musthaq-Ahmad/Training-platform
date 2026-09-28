import { useRef, type KeyboardEvent, type ReactNode } from 'react';
import { FileText, Folder, ChevronsLeft } from 'lucide-react';
import type { SidebarTab } from '../../types/workspaceTypes';
import styles from './WorkspaceSidebar.module.css';

type WorkspaceSidebarProps = {
  activeTab: SidebarTab;
  onTabChange: (tab: SidebarTab) => void;
  fileCount: number;
  onCollapse: () => void;
  instructions: ReactNode;
  files: ReactNode;
};

const TABS: { id: SidebarTab; label: string }[] = [
  { id: 'instructions', label: 'Instructions' },
  { id: 'files', label: 'Files' },
];

export default function WorkspaceSidebar({
  activeTab,
  onTabChange,
  fileCount,
  onCollapse,
  instructions,
  files,
}: WorkspaceSidebarProps) {
  const tabRefs = useRef<Record<SidebarTab, HTMLButtonElement | null>>({
    instructions: null,
    files: null,
  });

  function handleKeyDown(event: KeyboardEvent<HTMLButtonElement>) {
    if (event.key !== 'ArrowLeft' && event.key !== 'ArrowRight') return;
    event.preventDefault();

    const currentIndex = TABS.findIndex((tab) => tab.id === activeTab);
    const delta = event.key === 'ArrowRight' ? 1 : -1;
    const nextTab = TABS[(currentIndex + delta + TABS.length) % TABS.length];

    onTabChange(nextTab.id);
    tabRefs.current[nextTab.id]?.focus();
  }

  return (
    <div className={styles.sidebar}>
      <div role="tablist" aria-label="Sidebar" className={styles.tabRow}>
        {TABS.map((tab) => {
          const isActive = tab.id === activeTab;
          const Icon = tab.id === 'instructions' ? FileText : Folder;

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
              onKeyDown={handleKeyDown}
            >
              <Icon size={14} aria-hidden="true" />
              {tab.label}
              {tab.id === 'files' && <span className={styles.badge}>{fileCount}</span>}
            </button>
          );
        })}

        <button
          type="button"
          className={styles.collapseButton}
          aria-label="Hide sidebar"
          onClick={onCollapse}
        >
          <ChevronsLeft size={16} aria-hidden="true" />
        </button>
      </div>

      <div
        role="tabpanel"
        id="sidebar-panel-instructions"
        aria-label="Instructions"
        hidden={activeTab !== 'instructions'}
        className={styles.panel}
      >
        {instructions}
      </div>

      <div
        role="tabpanel"
        id="sidebar-panel-files"
        aria-label="Files"
        hidden={activeTab !== 'files'}
        className={styles.panel}
      >
        {files}
      </div>
    </div>
  );
}
