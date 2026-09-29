/** Ctrl/Cmd+V, Ctrl+Shift+V (Linux terminals) or Shift+Insert */
export function isPasteShortcut(event: KeyboardEvent): boolean {
  const key = event.key.toLowerCase();
  if ((event.ctrlKey || event.metaKey) && key === 'v') return true;
  return event.shiftKey && event.key === 'Insert';
}
