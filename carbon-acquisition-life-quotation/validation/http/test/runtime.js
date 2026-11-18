import { readFileSync, existsSync } from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { createRequire } from 'node:module'
import vm from 'node:vm'
import { vi } from 'vitest'
import pino from 'pino'

const nativeRequire = createRequire(import.meta.url)
const appDirectory = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../../../app')

export function runtime(overrides = {}) {
  const lines = []
  const token = { getSensediaTokenCarbonCloud: vi.fn(async () => 'synthetic-token') }
  const axios = vi.fn(async () => ({ status: 201, data: { accepted: true } }))
  const success = vi.fn(() => ({ statusCode: 200, body: { quotations: [{ id: 'synthetic' }] } }))
  const mocks = new Map(Object.entries({
    'src/factory/responseFactorySuccess.js': { quotationSuccess: success },
    ...overrides,
  }).map(([p, value]) => [path.resolve(appDirectory, p), value]))
  const cache = new Map()

  function load(file) {
    if (!path.extname(file)) file = existsSync(file + '.js') ? file + '.js' : path.join(file, 'index.js')
    if (mocks.has(file)) return mocks.get(file)
    if (cache.has(file)) return cache.get(file).exports
    if (file.endsWith('.json')) return JSON.parse(readFileSync(file, 'utf8'))
    const module = { exports: {} }
    cache.set(file, module)
    const require = (specifier) => {
      if (specifier.startsWith('.')) return load(path.resolve(path.dirname(file), specifier))
      if (specifier === 'pino') return (options) => pino(options, { write: (line) => lines.push(line) })
      if (specifier === 'dotenv') return { config() {} }
      if (specifier === 'axios') return axios
      if (specifier.includes('carbon-token')) return token
      if (['ajv', 'ajv-formats', 'node:crypto', 'https'].includes(specifier)) return nativeRequire(specifier)
      throw new Error('Unexpected external dependency in local HTTP tests: ' + specifier)
    }
    const wrapper = vm.runInThisContext(
      '(function(exports, require, module, __filename, __dirname) {\n' + readFileSync(file, 'utf8') + '\n})',
      { filename: file }
    )
    wrapper.call(module.exports, module.exports, require, module, file, path.dirname(file))
    return module.exports
  }
  return { load: (file) => load(path.resolve(appDirectory, file)), token, axios, success, lines }
}

export function expectProxyResponse(expect, response, statusCode) {
  expect(response.isBase64Encoded).toBe(false)
  expect(response.headers).toEqual({})
  expect(response.statusCode).toBe(statusCode)
  expect(typeof response.body).toBe('string')
  return JSON.parse(response.body)
}
