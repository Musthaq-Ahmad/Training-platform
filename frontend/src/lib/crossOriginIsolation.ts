// The User-Agent Client Hints API (navigator.userAgentData) isn't in
// TypeScript's lib.dom.d.ts yet, so it's typed locally here.
type NavigatorUAData = {
  brands: { brand: string; version: string }[];
};

export function isCrossOriginIsolated(): boolean {
  return window.crossOriginIsolated === true;
}

export function isChromium(): boolean {
  const uaData = (navigator as Navigator & { userAgentData?: NavigatorUAData }).userAgentData;
  if (uaData) {
    return uaData.brands.some((brand) => brand.brand === 'Chromium');
  }
  return /Chrome\//.test(navigator.userAgent);
}
