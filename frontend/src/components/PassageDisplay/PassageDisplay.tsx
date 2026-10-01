import { useLayoutEffect, useRef } from 'react';
import styles from './PassageDisplay.module.css';

const VISIBLE_LINES = 4;

type PassageDisplayProps = {
  passage: string;
  typed: string;
};

export default function PassageDisplay({ passage, typed }: PassageDisplayProps) {
  const viewportRef = useRef<HTMLDivElement>(null);
  const paragraphRef = useRef<HTMLParagraphElement>(null);
  const currentRef = useRef<HTMLSpanElement>(null);

  // Lock the viewport to exactly 4 lines, and slide the text up so the
  // current line stays on the second row. Direct DOM updates: no extra renders.
  useLayoutEffect(() => {
    const viewport = viewportRef.current;
    const paragraph = paragraphRef.current;
    const current = currentRef.current;
    if (!viewport || !paragraph) return;

    const lineHeight = parseFloat(getComputedStyle(paragraph).lineHeight);
    if (Number.isNaN(lineHeight)) return;

    viewport.style.height = `${lineHeight * VISIBLE_LINES}px`;

    if (!current) return;
    const lineIndex = Math.round(current.offsetTop / lineHeight);
    const offset = Math.max(0, lineIndex - 1) * lineHeight;
    paragraph.style.transform = `translateY(-${offset}px)`;
  }, [typed.length, passage]);

  return (
    <div ref={viewportRef} className={styles.viewport}>
      <p ref={paragraphRef} className={styles.passage} aria-label="Text to type">
        {passage.split('').map((char, index) => {
          let state = styles.pending;
          if (index < typed.length) {
            state = typed[index] === char ? styles.correct : styles.incorrect;
          } else if (index === typed.length) {
            state = styles.current;
          }
          return (
            <span
              key={index}
              ref={index === typed.length ? currentRef : undefined}
              className={state}
            >
              {char}
            </span>
          );
        })}
      </p>
    </div>
  );
}
