import type { SelfCheckItem } from '@itp/types';
import { useSelfCheckProgress } from '../../hooks/useSelfCheckProgress';
import styles from './SelfCheckChecklist.module.css';

interface SelfCheckChecklistProps {
  dayId: string;
  items: SelfCheckItem[];
  description?: string;
}

export default function SelfCheckChecklist({
  dayId,
  items,
  description = 'Self-check verification criteria separate from the practical coding tasks.',
}: SelfCheckChecklistProps) {
  const { checkedIds, isLoaded, toggle } = useSelfCheckProgress(dayId);

  const checkedSet = new Set(checkedIds);
  // Count only items that still exist, in case the curriculum changed after saving.
  const completedCount = items.filter((item) => checkedSet.has(item.id)).length;

  return (
    <section className={styles.selfCheck}>
      <div className={styles.selfCheckHeader}>
        <div>
          <span className={styles.selfCheckLabel}>END OF THE DAY CHECKLIST</span>
          <p className={styles.selfCheckDescription}>{description}</p>
        </div>

        <span className={styles.selfCheckProgress}>
          {completedCount} of {items.length} completed
        </span>
      </div>

      <div className={styles.selfCheckList}>
        {items.map((item, index) => {
          const isChecked = checkedSet.has(item.id);

          return (
            <label
              key={item.id}
              className={`${styles.selfCheckItem} ${isChecked ? styles.selfCheckItemChecked : ''}`}
            >
              <input
                type="checkbox"
                checked={isChecked}
                disabled={!isLoaded} // prevents toggling before saved state is loaded
                onChange={() => toggle(item.id)}
                className={styles.selfCheckCheckbox}
              />

              <div className={styles.selfCheckContent}>
                <div className={styles.selfCheckItemHeader}>
                  <p className={styles.selfCheckItemLabel}>
                    {index + 1}. {item.label}
                  </p>
                  <span className={styles.selfCheckCode}>{item.code}</span>
                </div>
                <p className={styles.selfCheckItemDescription}>{item.description}</p>
              </div>
            </label>
          );
        })}
      </div>
    </section>
  );
}
