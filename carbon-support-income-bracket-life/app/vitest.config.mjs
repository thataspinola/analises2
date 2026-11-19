import { defineConfig } from 'vitest/config'
export default defineConfig({
  test: {
    environment: 'node',
    include: ['test/**/*.spec.mjs'],
    pool: 'forks',
    isolate: true,
    coverage: {
      provider: 'v8',
      include: ['index.js', 'src/**/*.js', 'config/**/*.js'],
      reporter: ['text', 'lcov', 'json-summary'],
      thresholds: { statements: 95, branches: 95, functions: 95, lines: 95 },
    },
  },
})
