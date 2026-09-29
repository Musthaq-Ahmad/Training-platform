/**
 * Postgres reports a 1-based character offset into the text that was run.
 * `selectionStartOffset` is where that text starts in the full file (0 when the whole file ran).
 * Returns the 1-based line and column in the full file.
 */
export function sqlErrorLocation(
  fileText: string,
  selectionStartOffset: number,
  position: number
): { line: number; column: number } {
  // Postgres counts characters (code points); JavaScript strings and Monaco count UTF-16 units.
  let index = Math.min(Math.max(selectionStartOffset, 0), fileText.length);
  for (let remaining = position - 1; remaining > 0 && index < fileText.length; remaining -= 1) {
    const codePoint = fileText.codePointAt(index) ?? 0;
    index += codePoint > 0xffff ? 2 : 1;
  }

  let line = 1;
  let lineStart = 0;
  for (let i = 0; i < index; i += 1) {
    // Counting only \n handles \r\n too: the \r stays at the end of the previous line.
    if (fileText[i] === '\n') {
      line += 1;
      lineStart = i + 1;
    }
  }

  return { line, column: index - lineStart + 1 };
}
