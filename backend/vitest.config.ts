import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    environment: 'node',
    include: ['src/**/*.test.ts'],
    exclude: ['src/test/api/**', 'node_modules/**'],
    setupFiles: ['./src/setup/env.ts'],
  },
});
