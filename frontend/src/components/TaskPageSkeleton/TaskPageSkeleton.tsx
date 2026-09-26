import styles from './TaskPageSkeleton.module.css';

export default function TaskPageSkeleton() {
  return (
    <div className={styles.skeleton} role="status" aria-hidden="true" aria-label="Loading task">
      <div className={styles.toolbar}>
        <div className={styles.toolbarLeft}>
          <div className={styles.skeletonIcon} />
          <div className={styles.skeletonTitle} />
        </div>

        <div className={styles.toolbarRight}>
          <div className={styles.skeletonButton} />
          <div className={styles.skeletonButton} />
        </div>
      </div>

      <div className={styles.body}>
        <aside className={styles.sidebar}>
          <div className={styles.sidebarHeader}>
            <div className={styles.skeletonSmall} />
          </div>

          <div className={styles.fileList}>
            <div className={styles.fileRow}>
              <div className={styles.skeletonFileIcon} />
              <div className={styles.skeletonFileNameShort} />
            </div>

            <div className={styles.fileRow}>
              <div className={styles.skeletonFileIcon} />
              <div className={styles.skeletonFileName} />
            </div>

            <div className={styles.fileRow}>
              <div className={styles.skeletonFileIcon} />
              <div className={styles.skeletonFileNameMedium} />
            </div>

            <div className={styles.fileRow}>
              <div className={styles.skeletonFileIcon} />
              <div className={styles.skeletonFileNameShort} />
            </div>

            <div className={styles.fileRow}>
              <div className={styles.skeletonFileIcon} />
              <div className={styles.skeletonFileName} />
            </div>
          </div>
        </aside>

        <main className={styles.editor}>
          <div className={styles.editorHeader}>
            <div className={styles.skeletonTab} />
          </div>

          <div className={styles.code}>
            <div className={styles.codeLine}>
              <span className={styles.lineNumber} />
              <span className={styles.codeShort} />
            </div>

            <div className={styles.codeLine}>
              <span className={styles.lineNumber} />
              <span className={styles.codeMedium} />
            </div>

            <div className={styles.codeLine}>
              <span className={styles.lineNumber} />
              <span className={styles.codeLong} />
            </div>

            <div className={styles.codeLine}>
              <span className={styles.lineNumber} />
              <span className={styles.codeMedium} />
            </div>

            <div className={styles.codeLine}>
              <span className={styles.lineNumber} />
              <span className={styles.codeShort} />
            </div>

            <div className={styles.codeLine}>
              <span className={styles.lineNumber} />
              <span className={styles.codeLong} />
            </div>

            <div className={styles.codeLine}>
              <span className={styles.lineNumber} />
              <span className={styles.codeMedium} />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
