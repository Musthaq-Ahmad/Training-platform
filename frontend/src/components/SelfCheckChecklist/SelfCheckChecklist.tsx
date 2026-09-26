import { useState } from 'react';
import type { SelfCheckItem } from '@itp/types';
import styles from './SelfCheckChecklist.module.css';

interface SelfCheckChecklistProps {
  items: SelfCheckItem[];
  description?: string;
}

export default function SelfCheckChecklist({
  items,
  description = 'Self-check verification criteria separate from the practical coding tasks.',
}: SelfCheckChecklistProps) {
  const [checkedItems, setCheckedItems] = useState<string[]>([]);

  const handleToggle = (id: string) => {
    setCheckedItems((previous) =>
      previous.includes(id) ? previous.filter((itemId) => itemId !== id) : [...previous, id]
    );
  };

  const completedCount = checkedItems.length;
  const requiredCount = items.filter((item) => item.isRequired).length;

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
          const isChecked = checkedItems.includes(item.id);

          return (
            <label
              key={item.id}
              className={`${styles.selfCheckItem} ${isChecked ? styles.selfCheckItemChecked : ''}`}
            >
              <input
                type="checkbox"
                checked={isChecked}
                onChange={() => handleToggle(item.id)}
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

      <p className={styles.selfCheckFootnote}>
        The day is considered complete when all {requiredCount} required checklist items are
        verified and tasks are completed.
      </p>
    </section>
  );
}
