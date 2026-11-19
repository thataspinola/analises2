import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    environment: 'node',
    include: ['test/**/*.spec.mjs'],
    pool: 'forks',
    isolate: true,
    coverage: {
      provider: 'v8',
      include: ['index.js', 'src/**/*.js'],
      exclude: ['src/property/**'],
      reporter: ['text', 'lcov', 'json-summary'],
      thresholds: { statements: 92, branches: 90, functions: 93, lines: 92 },
    },
  },
})
