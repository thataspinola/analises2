import { readFileSync } from 'node:fs'
import { describe, expect, test, vi } from 'vitest'
import aslValidator from 'asl-validator'
import velocity from 'velocityjs'

const definitionSource = readFileSync(
  new URL('../infra/modules/step-function/step-function.json', import.meta.url),
  'utf8'
)
const definition = JSON.parse(
  definitionSource
    .replaceAll('${aws_region}', 'ca-central-1')
    .replaceAll('${account_id}', '123456789012')
    .replaceAll('${queue_name}', 'synthetic-update-lead')
)
const responseTemplate = readFileSync(
  new URL('../infra/modules/api-gateway/template.vtl', import.meta.url),
  'utf8'
)
const parallel = definition.States['Parallel Lead And Proposal']
const leadStates = parallel.Branches[0].States

function renderResponse(execution) {
  const statusWrites = []
  const responseOverride = {}
  Object.defineProperty(responseOverride, 'status', {
    get: () => statusWrites.at(-1),
    set: (status) => statusWrites.push(status),
  })
  const parseJson = vi.fn(JSON.parse)
  const bodyText = velocity.render(responseTemplate, {
    input: { path: () => execution },
    util: { parseJson },
    context: { responseOverride },
  }).trim()

  return {
    body: JSON.parse(bodyText),
    statusCode: statusWrites.at(-1),
    statusWrites,
    parseJson,
  }
}

describe('travel proposal workflow failure contract', () => {
  test('validates the rendered state machine against the ASL schema and paths', () => {
    const validation = aslValidator(definition, { checkPaths: true })
    expect(validation.isValid, validation.errorsText()).toBe(true)
  })

  test('routes SQS task failures to a terminal Fail state', () => {
    const sqs = leadStates['Send Message To SQS Update Lead']
    const catcher = sqs.Catch.find((entry) => entry.ErrorEquals.includes('States.ALL'))
    const failure = leadStates[catcher.Next]

    expect(sqs.Resource).toBe('arn:aws:states:::sqs:sendMessage')
    expect(failure.Type).toBe('Fail')
    expect(failure.Error).toBe('UpdateLeadEnqueueFailed')
    expect(failure.Cause).toBe('Unable to enqueue the lead update.')
    expect(failure).not.toHaveProperty('Result')
    expect(failure).not.toHaveProperty('End')
    expect(failure).not.toHaveProperty('Next')
  })

  test('does not catch the parallel failure and turn it into a successful result', () => {
    expect(parallel).not.toHaveProperty('Catch')
    expect(parallel).not.toHaveProperty('Retry')
  })

  test('keeps updateLead optional and does not enqueue when it is null', () => {
    const choice = leadStates['Do Update Lead']
    expect(choice.Choices).toContainEqual({
      Variable: '$.inputData.updateLead',
      IsNull: false,
      Next: 'Send Message To SQS Update Lead',
    })
    expect(leadStates[choice.Default].Type).toBe('Succeed')
  })

  test('preserves the lead payload and queue destination in the task', () => {
    expect(leadStates['Send Message To SQS Update Lead'].Parameters).toEqual({
      QueueUrl: 'https://sqs.ca-central-1.amazonaws.com/123456789012/synthetic-update-lead',
      'MessageBody.$': 'States.JsonToString($.inputData.updateLead)',
    })
  })
})

describe('StartSyncExecution API response template', () => {
  test.each(['FAILED', 'TIMED_OUT', 'ABORTED'])(
    'returns HTTP 500 for execution status %s even when the backend HTTP call succeeded',
    (status) => {
      const result = renderResponse({
        status,
        output: null,
        error: 'UpdateLeadEnqueueFailed',
        cause: 'AccessDenied: synthetic internal details',
      })

      expect(result.statusCode).toBe(500)
      expect(result.body).toEqual({
        statusCode: 500,
        message: 'Unable to complete travel proposal.',
      })
      expect(result.parseJson).not.toHaveBeenCalled()
      expect(result.statusWrites).toEqual([500])
    }
  )

  test('does not expose or try to parse a non-JSON internal cause', () => {
    const result = renderResponse({
      status: 'FAILED',
      cause: 'synthetic-secret: internal exception is not JSON',
    })
    expect(JSON.stringify(result.body)).not.toContain('synthetic-secret')
    expect(result.parseJson).not.toHaveBeenCalled()
  })

  test('does not let a failed execution output override its failed status', () => {
    const result = renderResponse({
      status: 'FAILED',
      output: JSON.stringify({ statusCode: 200, message: 'must not be returned' }),
    })
    expect(result.statusCode).toBe(500)
    expect(result.body.message).toBe('Unable to complete travel proposal.')
    expect(result.parseJson).not.toHaveBeenCalled()
  })

  test.each([{}, { message: 'Step Functions invocation failed' }, { status: 'RUNNING' }])(
    'fails closed when no completed execution is available: %j',
    (execution) => {
      const result = renderResponse(execution)
      expect(result.statusCode).toBe(500)
      expect(result.statusWrites).toEqual([500])
    }
  )

  test.each([undefined, null, '', 'null'])(
    'does not return success for a missing/null execution output: %j',
    (output) => {
      const result = renderResponse({ status: 'SUCCEEDED', output })
      expect(result.statusCode).toBe(500)
      expect(result.body.statusCode).toBe(500)
    }
  )

  test('preserves a successful proposal body and defaults to HTTP 200', () => {
    const payload = { proposalId: 'synthetic-123', message: "User's proposal accepted" }
    const result = renderResponse({ status: 'SUCCEEDED', output: JSON.stringify(payload) })
    expect(result.body).toEqual(payload)
    expect(result.statusCode).toBe(200)
    expect(result.statusWrites).toEqual([200])
  })

  test.each([200, 400, 422, 500])(
    'preserves an explicit business HTTP status %i in a successful execution output',
    (statusCode) => {
      const payload = { statusCode, message: 'synthetic business response' }
      const result = renderResponse({ status: 'SUCCEEDED', output: JSON.stringify(payload) })
      expect(result.body).toEqual(payload)
      expect(result.statusCode).toBe(statusCode)
      expect(result.statusWrites).toEqual([statusCode])
    }
  )
})
