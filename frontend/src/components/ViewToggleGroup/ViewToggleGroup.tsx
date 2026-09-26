import { BookOpen, Code2, SquareTerminal, type LucideIcon } from 'lucide-react';
import type { PaneId } from '../../types/workspaceTypes';
import styles from './ViewToggleGroup.module.css';

type ViewToggleGroupProps = {
  visiblePanes: Record<PaneId, boolean>;
  onToggle: (pane: PaneId) => void;
};

const TOGGLES: { pane: PaneId; label: string; Icon: LucideIcon }[] = [
  { pane: 'sidebar', label: 'Instructions', Icon: BookOpen },
  { pane: 'code', label: 'Code', Icon: Code2 },
  { pane: 'result', label: 'Result', Icon: SquareTerminal },
];

export default function ViewToggleGroup({ visiblePanes, onToggle }: ViewToggleGroupProps) {
  const visibleCount = TOGGLES.filter(({ pane }) => visiblePanes[pane]).length;

  return (
    <div role="group" aria-label="Visible panels" className={styles.group}>
      {TOGGLES.map(({ pane, label, Icon }) => {
        const isPressed = visiblePanes[pane];
        const isOnlyVisible = isPressed && visibleCount === 1;

        return (
          <button
            key={pane}
            type="button"
            className={styles.toggle}
            aria-pressed={isPressed}
            aria-disabled={isOnlyVisible}
            title={isOnlyVisible ? 'At least one panel must stay open' : undefined}
            onClick={() => {
              if (isOnlyVisible) return;
              onToggle(pane);
            }}
          >
            <Icon size={14} aria-hidden="true" />
            {label}
          </button>
        );
      })}
    </div>
  );
}
