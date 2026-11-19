import { test, expect } from 'vitest'
import { createApplication } from '../helpers/application.mjs'
test('success factory retains the upstream object without serializing twice', () => {
  const data = [{ codigo: 1 }],
    response = createApplication()('src/factory/index.js').response.success(
      data,
    )
  expect(response).toEqual({ statusCode: 200, body: data })
  expect(response.body).toBe(data)
})
test('error factory returns a fresh generic HTTP failure', () => {
  const factory = createApplication()('src/factory/index.js').response
  expect(factory.error()).toEqual({
    statusCode: 500,
    body: { status: 'error', message: 'Unable to retrieve income brackets' },
  })
  expect(factory.error()).not.toBe(factory.error())
})
