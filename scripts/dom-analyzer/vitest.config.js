import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    // Test environment
    environment: 'node',

    // Test files pattern
    include: ['tests/**/*.test.js'],

    // Timeout for async tests (Playwright needs more time)
    testTimeout: 30000,

    // Run tests sequentially (Playwright browser instances)
    pool: 'forks',
    poolOptions: {
      forks: {
        singleFork: true
      }
    },

    // Coverage configuration
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html'],
      include: ['checks/**/*.js', 'utils/**/*.js'],
      exclude: ['tests/**', 'node_modules/**']
    },

    // Global setup/teardown for browser
    globalSetup: './tests/setup.js'
  }
});
