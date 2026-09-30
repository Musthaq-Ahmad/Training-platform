/** Must be called from a click or key press; browsers reject it otherwise. */
export async function requestAppFullscreen(): Promise<boolean> {
  if (document.fullscreenElement) return true;
  try {
    await document.documentElement.requestFullscreen();
    return true;
  } catch {
    return false; // not allowed, or unsupported (older browsers, jsdom)
  }
}
