export function isFullscreenActive(): boolean {
  return (
    Boolean(document.fullscreenElement) ||
    (window.innerWidth === window.screen.width && window.innerHeight === window.screen.height)
  );
}
