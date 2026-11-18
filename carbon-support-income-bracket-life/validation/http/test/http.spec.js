import { describe, expect, test, vi } from 'vitest'
import { runtime, expectProxyResponse } from './runtime.js'

const PRIVATE = 'synthetic-secret@example.test'
function assertFailure(rt, response) {
  expect(expectProxyResponse(expect, response, 500)).toEqual({
    status: 'error', message: 'Unable to retrieve income brackets',
  })
  expect(response.body + rt.lines.join('')).not.toContain(PRIVATE)
  expect(rt.lines).toHaveLength(1)
  const log = JSON.parse(rt.lines[0])
  expect(log.operation).toBe('incomeBracket.verify')
  expect(log.log_message).toBe('Income bracket request failed')
}

describe('income bracket HTTP error contract', () => {
  test('preserves a successful upstream payload and token header', async () => {
    const rt = runtime()
    const data = [{ codigo: 1, descricao: 'Synthetic bracket' }]
    rt.axios.mockResolvedValue({ status: 200, data })
    const response = await rt.load('index.js').handler({})
    expect(expectProxyResponse(expect, response, 200)).toEqual(data)
    expect(rt.token.getSensediaTokenCarbonCloud).toHaveBeenCalledOnce()
    expect(rt.axios.mock.calls[0][0].headers.Authorization).toBe('Bearer synthetic-token')
    expect(rt.lines).toHaveLength(0)
  })

  test.each([null, undefined, PRIVATE, new Error(PRIVATE)])('handles token-layer rejections safely: %j', async (failure) => {
    const rt = runtime()
    rt.token.getSensediaTokenCarbonCloud.mockRejectedValue(failure)
    assertFailure(rt, await rt.load('index.js').handler({}))
    expect(rt.axios).not.toHaveBeenCalled()
  })

  test.each([
    { response: { status: 503, data: { private: PRIVATE } } },
    { request: { private: PRIVATE } },
    new Error(PRIVATE),
    null,
  ])('converts upstream failures to controlled 500 without upstream details: %j', async (failure) => {
    const rt = runtime()
    rt.axios.mockRejectedValue(failure)
    assertFailure(rt, await rt.load('index.js').handler({}))
  })

  test.each([null, {}, { status: 0 }])('handles invalid upstream responses: %j', async (response) => {
    const rt = runtime()
    rt.axios.mockResolvedValue(response)
    assertFailure(rt, await rt.load('index.js').handler({}))
  })

  test('controller preserves the original token exception without a global logger', async () => {
    const rt = runtime()
    const failure = new Error(PRIVATE)
    rt.token.getSensediaTokenCarbonCloud.mockRejectedValue(failure)
    await expect(rt.load('src/controller/faixaRendaController.js').verify()).rejects.toBe(failure)
  })

  test('handler also contains synchronous controller failures', async () => {
    const rt = runtime({ 'src/controller/index.js': { incomeBracket: { verify: vi.fn(() => { throw new Error(PRIVATE) }) } } })
    assertFailure(rt, await rt.load('index.js').handler({}))
  })

  test('does not mutate the global logger when loading the handler', async () => {
    const before = globalThis.logger
    try {
      const sentinel = { sentinel: true }
      globalThis.logger = sentinel
      const rt = runtime()
      rt.load('index.js')
      expect(globalThis.logger).toBe(sentinel)
    } finally {
      if (before === undefined) delete globalThis.logger
      else globalThis.logger = before
    }
  })

  test('contains serialization failures within the HTTP contract', async () => {
    const circular = {}; circular.self = circular
    const rt = runtime({ 'src/controller/index.js': { incomeBracket: { verify: vi.fn(async () => ({ statusCode: 200, body: circular })) } } })
    assertFailure(rt, await rt.load('index.js').handler({}))
  })
})
