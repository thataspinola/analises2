import { createRequire } from 'node:module'
import { fileURLToPath } from 'node:url'
import path from 'node:path'
import mock from 'mock-require'
import { afterEach, vi } from 'vitest'
const require = createRequire(import.meta.url)
const root = fileURLToPath(new URL('../../', import.meta.url))

afterEach(() => {
  mock.stopAll()
  vi.restoreAllMocks()
  vi.unstubAllEnvs()
})

export function createApplication(stubs = {}) {
  mock.stopAll()
  for (const key of Object.keys(require.cache)) {
    if (
      key === path.join(root, 'index.js') ||
      ['src', 'config'].some((dir) =>
        key.startsWith(path.join(root, dir) + path.sep),
      )
    )
      delete require.cache[key]
  }
  mock('dotenv', { config: () => ({ parsed: {} }) })
  for (const [specifier, value] of Object.entries(stubs))
    mock(
      specifier.startsWith('.') ? path.resolve(root, specifier) : specifier,
      value,
    )
  return (relative) => require(path.resolve(root, relative))
}

export function runtime(overrides = {}) {
  vi.stubEnv('NODE_ENV', 'test')
  const lines = []
  const token = {
    getSensediaTokenCarbonCloud: vi.fn(async () => 'synthetic-token'),
  }
  const axios = vi.fn(async () => ({ status: 200, data: [] }))
  const pino = require('pino')
  const stubs = Object.fromEntries(
    Object.entries(overrides).map(([p, v]) => ['./' + p, v]),
  )
  const load = createApplication({
    axios,
    '@porto-seguro/hub-vendas.carbon-token': token,
    pino: (options) => pino(options, { write: (line) => lines.push(line) }),
    ...stubs,
  })
  return { load, token, axios, lines }
}

export function expectProxyResponse(expect, response, statusCode) {
  expect(response.isBase64Encoded).toBe(false)
  expect(response.headers).toEqual({})
  expect(response.statusCode).toBe(statusCode)
  expect(typeof response.body).toBe('string')
  return JSON.parse(response.body)
}
