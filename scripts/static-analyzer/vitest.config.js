import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    environment: 'node',
    include: ['tests/**/*.test.js', 'spa-detector.test.js'],
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json'],
      include: ['validators.js', 'validators/**/*.js', 'spa-detector.js'],
      exclude: ['tests/**', 'node_modules/**'],
      // Seuils posés en cliquet de non-régression, sous la mesure du 4 septembre 2026
      // (98,74 % statements, 94,75 % branches, 97,72 % functions, 98,74 % lines).
      // Ils ne montent que sur décision explicite (audit ShipGuard, r1-z05-022).
      thresholds: {
        statements: 95,
        branches: 90,
        functions: 95,
        lines: 95
      }
    }
  }
});
