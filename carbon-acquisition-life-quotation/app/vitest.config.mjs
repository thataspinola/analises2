import { defineConfig } from 'vitest/config'
export default defineConfig({
  test: {
    environment: 'node',
    include: ['test/**/*.spec.mjs'],
    pool: 'forks',
    isolate: true,
    coverage: {
      provider: 'v8',
      include: ['index.js', 'logger/**/*.js', 'src/**/*.js'],
      reporter: ['text', 'html', 'lcov', 'json-summary'],
      thresholds: { statements: 90, branches: 90, functions: 90, lines: 90 },
    },
  },
})
