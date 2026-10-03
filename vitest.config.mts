import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    environment: 'node',
    include: ['src/**/*.spec.ts'],
    fileParallelism: false,
    maxWorkers: 1,
    testTimeout: 180000,
    setupFiles: ['./vitest.setup.ts'],
    globals: true,
  },
});
