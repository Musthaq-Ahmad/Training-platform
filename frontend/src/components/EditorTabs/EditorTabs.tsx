import { useEffect, useRef, useState, type KeyboardEvent, type MouseEvent } from 'react';
import { MoreVertical, X } from 'lucide-react';
import FileTypeBadge from '../FileTypeBadge';
import styles from './EditorTabs.module.css';

type EditorTabsProps = {
  openPaths: string[];
  activePath: string | null;
  dirtyPaths: ReadonlySet<string>;
  onActivate: (path: string) => void;
  onClose: (path: string) => void;
  onCloseAll: () => void;
};

function nameOf(path: string): string {
  return path.split('/').pop() ?? path;
}

function folderOf(path: string): string | null {
  const name = nameOf(path);
  return path.length > name.length ? path.slice(0, path.length - name.length - 1) : null;
}

export default function EditorTabs({
  openPaths,
  activePath,
  dirtyPaths,
  onActivate,
  onClose,
  onCloseAll,
}: EditorTabsProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const tabRefs = useRef<Record<string, HTMLButtonElement | null>>({});
  const kebabButtonRef = useRef<HTMLButtonElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!activePath) return;
    tabRefs.current[activePath]?.scrollIntoView({ block: 'nearest' });
  }, [activePath]);

  useEffect(() => {
    if (!isMenuOpen) return;

    menuRef.current?.querySelector<HTMLElement>('[role="menuitem"]')?.focus();

    function handlePointerDown(event: PointerEvent) {
      const target = event.target as Node;
      if (menuRef.current?.contains(target) || kebabButtonRef.current?.contains(target)) return;
      setIsMenuOpen(false);
    }

    document.addEventListener('pointerdown', handlePointerDown);
    return () => document.removeEventListener('pointerdown', handlePointerDown);
  }, [isMenuOpen]);

  function closeMenu() {
    setIsMenuOpen(false);
    kebabButtonRef.current?.focus();
  }

  function handleMenuKeyDown(event: KeyboardEvent<HTMLDivElement>) {
    if (event.key === 'Escape') {
      event.preventDefault();
      closeMenu();
      return;
    }

    if (event.key !== 'ArrowDown' && event.key !== 'ArrowUp') return;
    event.preventDefault();

    const items = menuRef.current
      ? [...menuRef.current.querySelectorAll<HTMLElement>('[role="menuitem"]')]
      : [];
    if (items.length === 0) return;

    const currentIndex = items.indexOf(document.activeElement as HTMLElement);
    const delta = event.key === 'ArrowDown' ? 1 : -1;
    items[(currentIndex + delta + items.length) % items.length]?.focus();
  }

  const nameCounts = new Map<string, number>();
  for (const path of openPaths) {
    const name = nameOf(path);
    nameCounts.set(name, (nameCounts.get(name) ?? 0) + 1);
  }

  function handleKeyDown(event: KeyboardEvent<HTMLButtonElement>, index: number) {
    if (event.key !== 'ArrowLeft' && event.key !== 'ArrowRight') return;
    event.preventDefault();

    const delta = event.key === 'ArrowRight' ? 1 : -1;
    const nextPath = openPaths[(index + delta + openPaths.length) % openPaths.length];
    if (!nextPath) return;

    onActivate(nextPath);
    tabRefs.current[nextPath]?.focus();
  }

  return (
    <div className={styles.container}>
      <div role="tablist" aria-label="Open files" className={styles.tabs}>
        {openPaths.map((path, index) => {
          const isActive = path === activePath;
          const isDirty = dirtyPaths.has(path);
          const name = nameOf(path);
          const folder = (nameCounts.get(name) ?? 0) > 1 ? folderOf(path) : null;

          return (
            <div key={path} className={isActive ? `${styles.tab} ${styles.tabActive}` : styles.tab}>
              <button
                ref={(el) => {
                  tabRefs.current[path] = el;
                }}
                role="tab"
                type="button"
                aria-selected={isActive}
                tabIndex={isActive ? 0 : -1}
                className={styles.tabButton}
                onClick={() => onActivate(path)}
                onMouseDown={(event: MouseEvent<HTMLButtonElement>) => {
                  if (event.button === 1) onClose(path);
                }}
                onKeyDown={(event) => handleKeyDown(event, index)}
              >
                <FileTypeBadge path={path} />
                <span className={styles.name}>{name}</span>
                {folder && <span className={styles.folder}>{folder}</span>}
              </button>

              {isDirty && <span className={styles.dirtyDot} aria-label="Unsaved changes" />}
              <button
                type="button"
                className={isDirty ? styles.closeButtonDirty : styles.closeButton}
                aria-label={`Close ${name}`}
                onClick={() => onClose(path)}
              >
                <X size={12} aria-hidden="true" />
              </button>
            </div>
          );
        })}
      </div>

      <div className={styles.menuWrapper}>
        <button
          ref={kebabButtonRef}
          type="button"
          aria-label="Tab options"
          aria-haspopup="menu"
          aria-expanded={isMenuOpen}
          className={styles.kebabButton}
          onClick={() => setIsMenuOpen((open) => !open)}
        >
          <MoreVertical size={14} aria-hidden="true" />
        </button>

        {isMenuOpen && (
          <div ref={menuRef} role="menu" className={styles.menu} onKeyDown={handleMenuKeyDown}>
            <button
              type="button"
              role="menuitem"
              className={styles.menuItem}
              onClick={() => {
                closeMenu();
                onCloseAll();
              }}
            >
              Close all tabs
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
