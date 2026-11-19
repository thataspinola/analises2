import { createRequire } from 'node:module'
import { fileURLToPath } from 'node:url'
import path from 'node:path'
import mock from 'mock-require'
import { afterEach, vi } from 'vitest'
const require = createRequire(import.meta.url)
const root = fileURLToPath(new URL('../../', import.meta.url))
const pino = require('pino')

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
      ['src', 'logger'].some((dir) =>
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

export function runtime(overrides = {}, { realSuccess = false } = {}) {
  vi.stubEnv('NODE_ENV', 'test')
  const lines = []
  const token = {
    getSensediaTokenCarbonCloud: vi.fn(async () => 'synthetic-token'),
  }
  const axios = vi.fn(async () => ({ status: 201, data: { accepted: true } }))
  const stubs = Object.fromEntries(
    Object.entries(overrides).map(([p, v]) => ['./' + p, v]),
  )
  const success = vi.fn(() => ({
    statusCode: 200,
    body: { quotations: [{ id: 'synthetic' }] },
  }))
  const defaults = {
    './src/factory/responseFactorySuccess.js': { quotationSuccess: success },
  }
  if (realSuccess) delete defaults['./src/factory/responseFactorySuccess.js']
  const load = createApplication({
    ...defaults,
    axios,
    '@porto-seguro/hub-vendas.carbon-token': token,
    pino: (options) => pino(options, { write: (line) => lines.push(line) }),
    ...stubs,
  })
  return { load, token, axios, lines, success }
}

export function expectProxyResponse(expect, response, statusCode) {
  expect(response.isBase64Encoded).toBe(false)
  expect(response.headers).toEqual({})
  expect(response.statusCode).toBe(statusCode)
  expect(typeof response.body).toBe('string')
  return JSON.parse(response.body)
}
