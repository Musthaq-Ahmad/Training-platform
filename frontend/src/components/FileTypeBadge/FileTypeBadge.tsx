import { Image } from 'lucide-react';
import { getFileType } from '../../lib/fileTypes';
import styles from './FileTypeBadge.module.css';

type FileTypeBadgeProps = {
  path: string;
};

export default function FileTypeBadge({ path }: FileTypeBadgeProps) {
  const fileType = getFileType(path);

  if (!fileType.isText) {
    return <Image size={14} className={styles.imageIcon} aria-hidden="true" />;
  }

  return (
    <span
      className={styles.badge}
      style={{ color: `var(${fileType.colorVar})` }}
      aria-hidden="true"
    >
      {fileType.label}
    </span>
  );
}
