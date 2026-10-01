import { defineConfig } from 'vitest/config';

// API contract tests: real HTTP calls through `app` against a real test database.
// Run with `npm run test:api` . Needs TEST_DATABASE_URL.
export default defineConfig({
  test: {
    environment: 'node',
    include: ['src/test/api/**/*.api.test.ts'],
    setupFiles: ['./src/test/api/setup.ts'],
    // Every file resets the same database, so files must not run at the same time.
    fileParallelism: false,
    testTimeout: 20000,
    hookTimeout: 30000,
  },
});
