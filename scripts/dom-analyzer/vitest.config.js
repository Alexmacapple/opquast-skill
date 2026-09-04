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
      include: ['checks/**/*.js', 'utils/**/*.js', 'lib/**/*.js', 'index.js'],
      exclude: ['tests/**', 'node_modules/**'],

      // Cliquet de non-régression : seuils posés sous la mesure du
      // 4 septembre 2026 (59.42 % stmts, 79.31 % branches, 56.75 % funcs,
      // 59.42 % lines), donc verts aujourd'hui. Ils ne montent que sur
      // décision explicite ; index.js reste à 0 % car il n'est exercé
      // que par sous-processus (tests/cli-exit-code.test.js).
      thresholds: {
        statements: 55,
        branches: 75,
        functions: 55,
        lines: 55
      }
    },

    // Global setup/teardown for browser
    globalSetup: './tests/setup.js'
  }
});
