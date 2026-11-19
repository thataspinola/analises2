import { test, expect, vi } from 'vitest'
import { createApplication } from './helpers/application.mjs'

test.each([undefined, '', 'development', 'production', 'local', 'test'])(
  'resolves configuration for environment %j',
  (env) => {
    vi.stubEnv('NODE_ENV', env)
    vi.stubEnv('GATEWAY_URL', undefined)
    vi.stubEnv('API_PATH', undefined)
    const constants = createApplication()('src/property/index.js')
    expect(constants.NODE_ENV).toBe(env || 'development')
    expect(constants.SENSEDIA_CLOUD_URL).toBe(
      'https://portoapicloud-hml.portoseguro.com.br',
    )
    expect(constants.API_VIDAON_FAIXA_RENDA_URL).toBe(
      'vida/vida-on/v1/dominios/tipos-faixa-renda',
    )
    expect(constants.TOKEN_LIBRARY_LOCATION).toBe(
      ['local', 'test'].includes(env)
        ? '@porto-seguro/hub-vendas.carbon-token'
        : '/opt/nodejs/carbon-token/',
    )
  },
)
test('uses configured gateway and endpoint values', () => {
  vi.stubEnv('GATEWAY_URL', 'https://synthetic.invalid')
  vi.stubEnv('API_PATH', 'synthetic/path')
  const constants = createApplication()('src/property/index.js')
  expect(constants.SENSEDIA_CLOUD_URL).toBe('https://synthetic.invalid')
  expect(constants.API_VIDAON_FAIXA_RENDA_URL).toBe('synthetic/path')
})
