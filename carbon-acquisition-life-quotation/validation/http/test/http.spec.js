import { describe, expect, test, vi } from 'vitest'
import { runtime, expectProxyResponse } from './runtime.js'

const valid = { lifeinsurance: { date_of_birth: '1988-03-27', salesMedium: 'synthetic', susep: 'synthetic' } }
const PRIVATE = 'synthetic-secret@example.test'

function assertInvalid(rt, response) {
  expect(expectProxyResponse(expect, response, 400)).toEqual({
    status: 'error', custom: false, message: 'Invalid request body',
  })
  expect(rt.token.getSensediaTokenCarbonCloud).not.toHaveBeenCalled()
  expect(rt.axios).not.toHaveBeenCalled()
}

describe('life quotation HTTP validation', () => {
  test.each([undefined, null, {}, { body: undefined }, { body: null }, { body: {} }, { body: [] }, { body: 123 }])(
    'returns 400 for a missing or non-string body: %j', async (event) => {
      const rt = runtime()
      assertInvalid(rt, await rt.load('index.js').handler(event))
    }
  )

  test.each(['', ' ', '{', 'invalid JSON ' + PRIVATE])('returns 400 for malformed JSON: %j', async (body) => {
    const rt = runtime()
    assertInvalid(rt, await rt.load('index.js').handler({ body }))
    expect(rt.lines.join('')).not.toContain(PRIVATE)
  })

  test.each([null, [], 'text', 123, true])('rejects non-object JSON before calling the controller: %j', async (input) => {
    const process = vi.fn()
    const rt = runtime({ 'src/controller/index.js': { quotation: { getQuotation: process } } })
    assertInvalid(rt, await rt.load('index.js').handler({ body: JSON.stringify(input) }))
    expect(process).not.toHaveBeenCalled()
  })

  test.each([{}, { lifeinsurance: null }, { lifeinsurance: {} },
    { lifeinsurance: { ...valid.lifeinsurance, date_of_birth: 123 } },
    { lifeinsurance: { ...valid.lifeinsurance, salesMedium: false } },
    { lifeinsurance: { date_of_birth: '1988-03-27', salesMedium: 'synthetic' } },
  ])('uses the real Ajv schema and returns 400 without requesting a token: %j', async (input) => {
    const rt = runtime()
    assertInvalid(rt, await rt.load('index.js').handler({ body: JSON.stringify(input) }))
  })

  test('preserves valid business input, outbound API payload and success response', async () => {
    const rt = runtime()
    const response = await rt.load('index.js').handler({ body: JSON.stringify(valid) })
    expect(expectProxyResponse(expect, response, 200)).toEqual({ quotations: [{ id: 'synthetic' }] })
    expect(rt.token.getSensediaTokenCarbonCloud).toHaveBeenCalledOnce()
    expect(rt.axios.mock.calls[0][0].data).toEqual({
      susep: 'synthetic', meioComercializacao: 'synthetic',
      informacoes: [{ codigo: 'DICIO_DATANASCIMENTO', conteudo: '1988-03-27' }],
    })
    expect(rt.success).toHaveBeenCalledWith({ accepted: true }, '1988-03-27')
  })

  test.each(['GN01', 'GN02', 'OR04', 'OR06',
    ...Array.from({ length: 20 }, (_, i) => 'OR' + String(i + 1).padStart(2, '0')).filter(c => !['OR04', 'OR06'].includes(c)),
    'XPTO',
  ])('preserves the existing upstream business contract for %s', async (codigo) => {
    const rt = runtime()
    rt.axios.mockResolvedValue({ status: 400, data: { codigo } })
    const expected = rt.load('src/service/errorService.js').filterError(codigo)
    const response = await rt.load('index.js').handler({ body: JSON.stringify(valid) })
    expect(expectProxyResponse(expect, response, expected.statusCode)).toEqual(expected.body)
  })

  test.each([null, undefined, new Error(PRIVATE), new SyntaxError(PRIVATE)])(
    'returns generic 500 for unexpected controller rejections: %j', async (failure) => {
      const rt = runtime({ 'src/controller/index.js': { quotation: { getQuotation: vi.fn(async () => { throw failure }) } } })
      const response = await rt.load('index.js').handler({ body: JSON.stringify(valid) })
      expect(expectProxyResponse(expect, response, 500)).toEqual({ custom: false })
      expect(response.body + rt.lines.join('')).not.toContain(PRIVATE)
    }
  )

  test('handles a token rejection with null without masking it with another exception', async () => {
    const rt = runtime()
    rt.token.getSensediaTokenCarbonCloud.mockRejectedValue(null)
    expectProxyResponse(expect, await rt.load('index.js').handler({ body: JSON.stringify(valid) }), 500)
    expect(rt.axios).not.toHaveBeenCalled()
  })

  test('does not classify an upstream error as client input merely by its name', async () => {
    const rt = runtime()
    const error = new Error(PRIVATE)
    error.name = 'ValidationError'
    rt.token.getSensediaTokenCarbonCloud.mockRejectedValue(error)
    const response = await rt.load('index.js').handler({ body: JSON.stringify(valid) })
    expectProxyResponse(expect, response, 500)
    expect(response.body + rt.lines.join('')).not.toContain(PRIVATE)
  })

  test('unexpected schema failure remains 500 and stops outbound calls', async () => {
    const rt = runtime({ 'src/service/validationService.js': { inputData() { throw null } } })
    expectProxyResponse(expect, await rt.load('index.js').handler({ body: JSON.stringify(valid) }), 500)
    expect(rt.token.getSensediaTokenCarbonCloud).not.toHaveBeenCalled()
  })
})
