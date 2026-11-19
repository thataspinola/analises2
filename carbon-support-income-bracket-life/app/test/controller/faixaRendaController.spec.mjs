import { test, expect } from 'vitest'
import { runtime } from '../helpers/application.mjs'

test('controller returns the income brackets from the real success factory', async () => {
  const rt = runtime(),
    data = [{ codigo: '2500', descricao: 'Synthetic bracket' }]
  rt.axios.mockResolvedValue({ status: 200, data })
  await expect(
    rt.load('src/controller/index.js').incomeBracket.verify(),
  ).resolves.toEqual({ statusCode: 200, body: data })
})
test('controller preserves a token rejection', async () => {
  const rt = runtime(),
    error = new Error('synthetic token failure')
  rt.token.getSensediaTokenCarbonCloud.mockRejectedValue(error)
  await expect(
    rt.load('src/controller/index.js').incomeBracket.verify(),
  ).rejects.toBe(error)
  expect(rt.axios).not.toHaveBeenCalled()
})
test('controller propagates the upstream failure without a global logger', async () => {
  const rt = runtime()
  rt.axios.mockRejectedValue(new Error('synthetic API failure'))
  await expect(
    rt.load('src/controller/index.js').incomeBracket.verify(),
  ).rejects.toThrow('API unexpected error: synthetic API failure')
})
