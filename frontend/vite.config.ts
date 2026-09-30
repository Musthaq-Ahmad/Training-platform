import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

// WebContainer  needs the page to be cross-origin isolated. It's a
// single-page app, so the page that first loads (often the dashboard) must
// already have these headers — every route needs them, not just task pages.
const isolationHeaders = {
  'Cross-Origin-Opener-Policy': 'same-origin',
  'Cross-Origin-Embedder-Policy': 'credentialless',
};

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],

  // PGlite  loads its .wasm and data files relative to its own module. Pre-bundling
  // would move the module away from those files, so Vite serves the package as it is.
  optimizeDeps: {
    exclude: ['@electric-sql/pglite'],
  },

  server: {
    port: 5173,
    headers: isolationHeaders,
    proxy: {
      '/api': 'http://localhost:3000',
    },
  },
  preview: {
    headers: isolationHeaders,
  },
});
