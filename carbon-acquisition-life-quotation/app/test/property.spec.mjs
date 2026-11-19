import { expect, test, vi } from 'vitest'
import { runtime } from './helpers/application.mjs'

test.each(['local', 'test', 'development', 'production', ' local ', undefined])(
  'selects the token package or layer for %s',
  (environment) => {
    const rt = runtime()
    vi.stubEnv('NODE_ENV', environment)
    const constants = rt.load('src/property')
    expect(constants.NODE_ENV).toBe(environment || 'development')
    expect(constants.TOKEN_LIBRARY_LOCATION).toBe(
      ['local', 'test'].includes(environment?.trim())
        ? '@porto-seguro/hub-vendas.carbon-token'
        : '/opt/nodejs/carbon-token/',
    )
  },
)

test('preserves explicitly configured gateway and offers path', () => {
  const rt = runtime()
  vi.stubEnv('SENSEDIA_URL', 'https://gateway.example.test')
  vi.stubEnv('OFERTAS_PATH', 'synthetic/offers')
  const constants = rt.load('src/property')
  expect(constants.SENSEDIA_URL).toBe('https://gateway.example.test')
  expect(constants.OFERTAS_PATH).toBe('synthetic/offers')
})
