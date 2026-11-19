import { describe, test, expect } from 'vitest'
import MOCKS from '../helpers/fixtures.mjs'
import { runtime } from '../helpers/application.mjs'
describe('Vida offers API', () => {
  test('preserves the successful upstream response', async () => {
    const rt = runtime()
    rt.axios.mockResolvedValue(MOCKS.OFERTAS_DATA())
    expect(
      await rt
        .load('src/api')
        .vidaOnApi.ofertas(MOCKS.INPUT_REQUEST_QUOTATION_API(), 'token'),
    ).toEqual(MOCKS.OFERTAS_DATA())
  })
  test('preserves the rejected upstream status and body', async () => {
    const rt = runtime()
    rt.axios.mockRejectedValue(MOCKS.RESPONSE_OFERTAS_ERROR())
    expect(
      (
        await rt
          .load('src/api')
          .vidaOnApi.ofertas(MOCKS.INPUT_REQUEST_QUOTATION_API(), 'token')
      ).data,
    ).toEqual(MOCKS.RESPONSE_OFERTAS_ERROR().response.data)
  })
})
