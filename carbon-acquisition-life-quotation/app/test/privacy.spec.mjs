import { readFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import path from 'node:path'
import { describe, expect, test, vi } from 'vitest'
import { runtime as applicationRuntime } from './helpers/application.mjs'
const TRACE = 'f47ac10b-58cc-4372-a567-0e02b2c3d479'
const QUOTATION = '1234567890'
const PRIVATE = {
  cpf: '11122233344',
  email: 'synthetic-client@example.test',
  phone: '11987654321',
  name: 'Synthetic Private Client',
  dateOfBirth: '1988-03-27',
  token: 'synthetic-super-secret-token',
  certificate: 'synthetic-private-certificate',
}

const project = fileURLToPath(new URL('../../', import.meta.url))
function makeError(name = 'AxiosError') {
  const error = new Error(JSON.stringify(PRIVATE))
  error.name = name
  error.code = 'ERR_BAD_REQUEST'
  error.stack = `synthetic stack ${PRIVATE.token}`
  error.config = { headers: { Authorization: PRIVATE.token }, data: PRIVATE }
  error.request = { privateKey: PRIVATE.certificate }
  error.response = { status: 503, data: PRIVATE }
  return error
}

function runtime(overrides = {}) {
  const rt = applicationRuntime({
    'src/service/validationService.js': { inputData() {} },
    ...overrides,
  })
  return {
    ...rt,
    metadata: () => rt.load('src/service/logMetadata.js'),
    logger: () => rt.load('logger/index.js'),
  }
}
function assertPrivateValuesAbsent(lines) {
  expect(lines.length).toBeGreaterThan(0)
  const output = lines.join('')
  for (const value of Object.values(PRIVATE))
    expect(output).not.toContain(value)
  return lines.flatMap((line) => line.trim().split('\n').map(JSON.parse))
}

describe('quotation log privacy', () => {
  test('summarizes errors without copying messages, stack, HTTP bodies, headers or certificates', () => {
    const rt = runtime()
    const summary = rt.metadata().errorSummary(makeError())
    expect(summary).toEqual({
      type: 'AxiosError',
      code: 'ERR_BAD_REQUEST',
      statusCode: 503,
    })
    expect(JSON.stringify(summary)).not.toContain(PRIVATE.token)
    expect(
      rt.metadata().errorSummary({ name: PRIVATE.name, code: PRIVATE.token }),
    ).toEqual({
      type: 'Error',
      code: undefined,
      statusCode: undefined,
    })
  })

  test.each([undefined, null, 'string rejection'])(
    'handles non-Error failures safely: %j',
    (error) => {
      expect(runtime().metadata().errorSummary(error).type).toBe('Error')
    },
  )

  test('retains valid correlation identifiers and rejects free-text sensitive identifiers', () => {
    const metadata = runtime().metadata()
    expect(metadata.traceId(TRACE)).toBe(TRACE)
    expect(metadata.quotationId(QUOTATION)).toBe(QUOTATION)
    expect(metadata.quotationId(123)).toBe('123')
    expect(metadata.quotationId(TRACE)).toBe(TRACE)
    expect(metadata.traceId(PRIVATE.email)).toBeUndefined()
    expect(metadata.traceId(`${TRACE}\n${PRIVATE.token}`)).toBeUndefined()
    expect(metadata.quotationId(PRIVATE.name)).toBeUndefined()
    expect(metadata.quotationId(Number.MAX_SAFE_INTEGER + 1)).toBeUndefined()
  })

  test('real Pino removes protected object fields and serializes Error instances safely', () => {
    const rt = runtime()
    const logger = rt.logger()
    logger.error(makeError())
    logger.error(makeError(), PRIVATE.token)
    logger.error(
      {
        error: makeError(),
        rawError: makeError(),
        body: PRIVATE,
        payload: PRIVATE,
        event: PRIVATE,
        Event: PRIVATE,
        request: PRIVATE,
        response: PRIVATE,
        config: PRIVATE,
        headers: { Authorization: PRIVATE.token },
        token: PRIVATE.token,
        password: PRIVATE.token,
        traceId: TRACE,
        quotationId: QUOTATION,
      },
      'Upstream failed',
    )
    const entries = assertPrivateValuesAbsent(rt.lines)
    expect(entries[2].traceId).toBe(TRACE)
    expect(entries[2].quotationId).toBe(QUOTATION)
    expect(entries[2].error).toEqual({
      type: 'AxiosError',
      code: 'ERR_BAD_REQUEST',
      statusCode: 503,
    })
    expect(entries[2]).toHaveProperty('application')
    expect(entries[2]).toHaveProperty('log_level', 'ERROR')
  })

  test.each(['err', 'error', 'rawError'])(
    'does not derive a free-text message from a wrapped error: %s',
    (key) => {
      const rt = runtime()
      rt.logger().error({ [key]: makeError(), traceId: TRACE })
      rt.logger().error({
        [key]: {
          name: 'AxiosError',
          message: PRIVATE.email,
          code: 'ERR_BAD_REQUEST',
          stack: PRIVATE.token,
        },
      })
      const entries = assertPrivateValuesAbsent(rt.lines)
      expect(entries[0].traceId).toBe(TRACE)
      expect(entries[0].error.type).toBe('AxiosError')
    },
  )

  test('handler logs metadata while preserving the input and HTTP business response', async () => {
    const process = vi.fn(async () => ({
      statusCode: 200,
      body: { quotations: [], accepted: true },
    }))
    const rt = runtime({
      'src/controller/index.js': { quotation: { getQuotation: process } },
    })
    const input = {
      ...PRIVATE,
      numeroOrcamento: QUOTATION,
      lifeinsurance: { ...PRIVATE, porto_quotation_id: QUOTATION },
    }
    const event = {
      body: JSON.stringify(input),
      headers: { 'carbon-trace-id': TRACE, Authorization: PRIVATE.token },
    }
    const response = await rt
      .load('index.js')
      .handler(event, { awsRequestId: TRACE })
    expect(response.statusCode).toBe(200)
    expect(JSON.parse(response.body)).toEqual({
      quotations: [],
      accepted: true,
    })
    expect(process.mock.calls[0][0]).toEqual(input)
    const entries = assertPrivateValuesAbsent(rt.lines)
    expect(JSON.stringify(entries)).toContain(TRACE)
  })

  test('handler failure does not log a rich external error or its interpolated message', async () => {
    const process = vi.fn(async () => {
      throw makeError()
    })
    const rt = runtime({
      'src/controller/index.js': { quotation: { getQuotation: process } },
    })
    const response = await rt
      .load('index.js')
      .handler({
        body: JSON.stringify({
          numeroOrcamento: QUOTATION,
          lifeinsurance: { porto_quotation_id: QUOTATION },
        }),
        headers: { 'carbon-trace-id': TRACE },
      })
    expect(response.statusCode).toBe(500)
    const entries = assertPrivateValuesAbsent(rt.lines)
    expect(entries.some((entry) => entry.error?.type === 'AxiosError')).toBe(
      true,
    )
  })

  test('JSON parse errors never log the invalid request text', async () => {
    const rt = runtime({ 'src/controller/index.js': {} })
    await rt
      .load('index.js')
      .handler({
        body: `invalid JSON ${PRIVATE.email}`,
        headers: { 'carbon-trace-id': TRACE },
      })
    assertPrivateValuesAbsent(rt.lines)
  })

  test('controller token failure keeps diagnostic metadata without token-layer errors', async () => {
    const rt = runtime()
    const error = makeError()
    rt.token.getSensediaTokenCarbonCloud.mockRejectedValue(error)
    const controller = rt.load('src/controller/index.js')
    const response = await controller.quotation.getQuotation({
      lifeinsurance: PRIVATE,
    })
    expect(response.statusCode).toBe(500)
    assertPrivateValuesAbsent(rt.lines)
  })

  test('controller validation failure does not copy the rejected value into logs', async () => {
    const rt = runtime({
      'src/service/validationService.js': {
        inputData() {
          throw makeError('ValidationError')
        },
      },
    })
    const controller = rt.load('src/controller/index.js')
    const response = await controller.quotation.getQuotation({
      lifeinsurance: PRIVATE,
    })
    expect(response.statusCode).toBe(500)
    assertPrivateValuesAbsent(rt.lines)
  })

  test('API failure preserves the outbound payload but logs only a safe error summary', async () => {
    const rt = runtime()
    rt.axios.mockRejectedValue(makeError())
    const input = {
      ...PRIVATE,
      lifeinsurance: {
        susep: 'synthetic',
        salesMedium: 'synthetic',
        date_of_birth: PRIVATE.dateOfBirth,
      },
    }
    const response = await rt
      .load('src/api/vidaOnApi.js')
      .ofertas(input, PRIVATE.token)
    expect(response.status).toBe(503)
    expect(rt.axios.mock.calls[0][0].data).toEqual({
      susep: 'synthetic',
      meioComercializacao: 'synthetic',
      informacoes: [
        { codigo: 'DICIO_DATANASCIMENTO', conteudo: PRIVATE.dateOfBirth },
      ],
    })
    expect(rt.axios.mock.calls[0][0].headers.Authorization).toContain(
      PRIVATE.token,
    )
    assertPrivateValuesAbsent(rt.lines)
  })

  test('controller integration failure does not reintroduce the upstream body into error logs', async () => {
    const rt = runtime()
    rt.axios.mockRejectedValue(makeError())
    const controller = rt.load('src/controller/index.js')
    const input = {
      ...PRIVATE,
      lifeinsurance: { date_of_birth: PRIVATE.dateOfBirth },
    }
    const response = await controller.quotation.getQuotation(input)
    expect(response.statusCode).toBe(500)
    assertPrivateValuesAbsent(rt.lines)
  })

  test('disables full request/response payload tracing in its API Gateway', () => {
    const infrastructure = readFileSync(
      path.join(project, 'infra/modules/api-gateway/main.tf'),
      'utf8',
    )
    expect(infrastructure).toMatch(/data_trace_enabled\s*=\s*false/)
    expect(infrastructure).toMatch(/metrics_enabled\s*=\s*true/)
  })
})

test('quotation rejection and unmapped codes never log birth dates, response bodies or arbitrary text', async () => {
  const rt = runtime()
  rt.axios.mockResolvedValue({
    status: 503,
    data: { ...PRIVATE, codigo: PRIVATE.token },
  })
  await rt
    .load('src/controller/index.js')
    .quotation.getQuotation({
      lifeinsurance: { date_of_birth: PRIVATE.dateOfBirth },
    })
  assertPrivateValuesAbsent(rt.lines)
})
