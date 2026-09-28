import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Link } from 'react-router';
import styles from './MarkdownRenderer.module.css';

type MarkdownRendererProps = {
  markdown: string;
  className?: string;
};

/** Relative paths and data: URIs only — no remote images. */
function isAllowedImageSrc(src: string | undefined): boolean {
  if (!src) return false;
  return src.startsWith('data:') || !/^[a-z][a-z0-9+.-]*:/i.test(src);
}

export default function MarkdownRenderer({ markdown, className }: MarkdownRendererProps) {
  return (
    <div className={className ? `${styles.markdown} ${className}` : styles.markdown}>
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          a: ({ href, children }) =>
            href?.startsWith('/') ? <Link to={href}>{children}</Link> : <span>{children}</span>,
          img: ({ src, alt }) =>
            isAllowedImageSrc(src) ? <img src={src} alt={alt ?? ''} /> : null,
          code: ({ children }) => <code className={styles.code}>{children}</code>,
          pre: ({ children }) => <pre className={styles.pre}>{children}</pre>,
        }}
      >
        {markdown}
      </ReactMarkdown>
    </div>
  );
}
