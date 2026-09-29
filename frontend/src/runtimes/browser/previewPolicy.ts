/** Public APIs the JavaScript course calls with fetch. Add a host here when the curriculum needs a new one. */
export const PREVIEW_CONNECT_HOSTS = [
  'https://jsonplaceholder.typicode.com',
  'https://api.open-meteo.com',
  'https://geocoding-api.open-meteo.com',
  'https://api.github.com',
];

/** Never add allow-same-origin: trainee code would then run as the platform and could call /api as the trainee. */
export const PREVIEW_SANDBOX = 'allow-scripts allow-modals allow-forms';

export const PREVIEW_URL_PREFIX = 'https://sandbox.local/';

/** Content-Security-Policy for the preview document (FR-8: no general browsing or AI tools from inside). */
export function buildPreviewCsp(): string {
  return [
    "default-src 'none'",
    "script-src 'unsafe-inline'",
    "style-src 'unsafe-inline' https://fonts.googleapis.com",
    'font-src https://fonts.gstatic.com data:',
    'img-src https: data: blob:',
    'media-src https: data: blob:',
    `connect-src ${PREVIEW_CONNECT_HOSTS.join(' ')}`,
    "frame-src 'none'",
    "form-action 'none'",
    "base-uri 'none'",
  ].join('; ');
}
