import { describe, it, expect, afterEach } from 'vitest';
import { isCrossOriginIsolated, isChromium } from './crossOriginIsolation';

describe('isCrossOriginIsolated', () => {
  afterEach(() => {
    Object.defineProperty(window, 'crossOriginIsolated', { value: false, configurable: true });
  });

  it('follows window.crossOriginIsolated', () => {
    Object.defineProperty(window, 'crossOriginIsolated', { value: true, configurable: true });
    expect(isCrossOriginIsolated()).toBe(true);

    Object.defineProperty(window, 'crossOriginIsolated', { value: false, configurable: true });
    expect(isCrossOriginIsolated()).toBe(false);
  });
});

describe('isChromium', () => {
  const originalUserAgent = navigator.userAgent;

  afterEach(() => {
    Object.defineProperty(navigator, 'userAgent', { value: originalUserAgent, configurable: true });
  });

  it('is true for a Chrome user agent', () => {
    Object.defineProperty(navigator, 'userAgent', {
      value:
        'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
      configurable: true,
    });
    expect(isChromium()).toBe(true);
  });

  it('is false for a Firefox user agent', () => {
    Object.defineProperty(navigator, 'userAgent', {
      value: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:120.0) Gecko/20100101 Firefox/120.0',
      configurable: true,
    });
    expect(isChromium()).toBe(false);
  });
});
