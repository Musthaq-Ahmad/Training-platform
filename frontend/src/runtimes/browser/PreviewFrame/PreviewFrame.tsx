import type { RefObject } from 'react';
import { PREVIEW_SANDBOX } from '../previewPolicy';
import styles from './PreviewFrame.module.css';

type PreviewFrameProps = {
  srcdoc: string;
  runId: string;
  entryPath: string;
  iframeRef: RefObject<HTMLIFrameElement | null>;
};

export default function PreviewFrame({ srcdoc, runId, entryPath, iframeRef }: PreviewFrameProps) {
  return (
    <iframe
      // A new key per run gives every run a fresh page (no leftover timers or listeners).
      key={runId}
      ref={iframeRef}
      className={styles.frame}
      srcDoc={srcdoc}
      // Never add allow-same-origin (see previewPolicy.ts).
      sandbox={PREVIEW_SANDBOX}
      referrerPolicy="no-referrer"
      title={'Preview of ' + entryPath}
    />
  );
}
