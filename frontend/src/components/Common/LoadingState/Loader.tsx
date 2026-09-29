import type { CSSProperties } from 'react';
// import type { ReactNode } from "react";
import styles from './Loader.module.css';

type Size = number | string;

// const toCss = (value: Size | undefined): string | undefined =>
//     typeof value === "number" ? `${value}px` : value;

/* =========================================================
   LoaderOverlay
   ========================================================= */

export interface LoaderOverlayProps {
  /** Main text under the spinner. */
  label?: string;
  /** Optional smaller text under the label. */
  description?: string;
  /** Cover the whole screen. When false, covers the nearest positioned parent. */
  fullPage?: boolean;
  className?: string;
}

export function LoaderOverlay({
  label = 'Loading…',
  description,
  fullPage = false,
  className,
}: LoaderOverlayProps) {
  const classes = [styles.overlay, fullPage ? styles.fullPage : styles.contained, className]
    .filter(Boolean)
    .join(' ');

  return (
    <div className={classes} role="status" aria-live="polite" aria-busy="true">
      <div className={styles.box}>
        <div className={styles.spinner} aria-hidden="true" />
        <p className={styles.label}>{label}</p>
        {description && <p className={styles.description}>{description}</p>}
      </div>
    </div>
  );
}

/* =========================================================
   Skeleton
   ========================================================= */

export interface SkeletonProps {
  /** Width of the block. Numbers are treated as px. Default: 100%. */
  width?: Size;
  /** Height of the block. Numbers are treated as px. Default: 12. */
  height?: Size;
  /** Corner radius. Default: 6. Ignored when `circle` is set. */
  radius?: Size;
  /** Render a circle. Uses `size` for both width and height. */
  circle?: boolean;
  /** Diameter of the circle. Default: 40. */
  size?: Size;
  /** Render a stack of text lines. The last line is shorter. */
  lines?: number;
  /** Center this skeleton in a full-viewport-height container. */
  fullPage?: boolean;
  className?: string;
  style?: CSSProperties;
}

// export interface SkeletonProps {
//     /** Width of the block. Numbers are treated as px. Default: 100%. */
//     width?: Size;
//     /** Height of the block. Numbers are treated as px. Default: 12. */
//     height?: Size;
//     /** Corner radius. Default: 6. Ignored when `circle` is set. */
//     radius?: Size;
//     /** Render a circle. Uses `size` for both width and height. */
//     circle?: boolean;
//     /** Diameter of the circle. Default: 40. */
//     size?: Size;
//     /** Render a stack of text lines. The last line is shorter. */
//     lines?: number;
//     /** Center this skeleton in a full-viewport-height container. */
//     fullPage?: boolean;
//     className?: string;
//     style?: CSSProperties;
// }

// export function Skeleton({
//     width = "100%",
//     height = 12,
//     radius = 6,
//     circle = false,
//     size = 40,
//     lines,
//     fullPage = false,
//     className,
//     style,
// }: SkeletonProps) {
//     let content: ReactNode;

//     if (lines && lines > 1) {
//         content = (
//             <div className={styles.lines} aria-hidden="true">
//                 {Array.from({ length: lines }, (_, i) => (
//                     <Skeleton
//                         key={i}
//                         height={height}
//                         radius={radius}
//                         width={i === lines - 1 ? "60%" : "100%"}
//                         className={className}
//                     />
//                 ))}
//             </div>
//         );
//     } else {
//         const dimensions: CSSProperties = circle
//             ? { width: toCss(size), height: toCss(size), borderRadius: "50%" }
//             : { width: toCss(width), height: toCss(height), borderRadius: toCss(radius) };

//         content = (
//             <span
//                 className={[styles.skeleton, className].filter(Boolean).join(" ")}
//                 style={{ ...dimensions, ...style }}
//                 aria-hidden="true"
//             />
//         );
//     }

//     // fullPage only wraps the OUTER call. A recursive call from the `lines`
//     // branch above never sets fullPage, so nested lines don't each get their
//     // own full-viewport wrapper.
//     if (fullPage) {
//         return (
//             <div className={styles.fullPage} role="status">
//                 {content}
//             </div>
//         );
//     }

//     return content;
// }
