import { describe, test, expect } from 'vitest'
import { runtime } from '../helpers/application.mjs'

describe('income bracket upstream API', () => {
  test.each([
    { data: [] },
    { data: [{ codigo: '2500', descricao: 'Synthetic bracket' }] },
  ])(
    'preserves the successful data and sends the configured endpoint and token: %j',
    async ({ data }) => {
      const rt = runtime()
      rt.axios.mockResolvedValue({ status: 200, data })
      const constants = rt.load('src/property/index.js')
      await expect(
        rt.load('src/api/index.js').vidaOn.getIncomeBracket('synthetic-token'),
      ).resolves.toBe(data)
      expect(rt.axios).toHaveBeenCalledWith({
        method: 'get',
        url:
          constants.SENSEDIA_CLOUD_URL +
          '/' +
          constants.API_VIDAON_FAIXA_RENDA_URL,
        headers: {
          Authorization: 'Bearer synthetic-token',
          'Content-Type': 'application/json',
        },
      })
    },
  )
  test.each([
    [
      {
        response: { status: 500, data: { message: 'Testing expected error' } },
      },
      'API error: code',
    ],
    [new Error('Unexpected error'), 'API unexpected error: Unexpected error'],
    [{ request: {} }, 'API did not give response'],
  ])(
    'awaits an upstream rejection and propagates its contract',
    async (failure, message) => {
      const rt = runtime()
      rt.axios.mockRejectedValue(failure)
      await expect(
        rt.load('src/api/index.js').vidaOn.getIncomeBracket('synthetic-token'),
      ).rejects.toThrow(message)
    },
  )
  test.each([null, {}, { status: 0 }, { status: 200 }])(
    'rejects an invalid upstream response: %j',
    async (response) => {
      const rt = runtime()
      rt.axios.mockResolvedValue(response)
      await expect(
        rt.load('src/api/index.js').vidaOn.getIncomeBracket('synthetic-token'),
      ).rejects.toThrow('API unexpected error: Empty or invalid response')
    },
  )
})
