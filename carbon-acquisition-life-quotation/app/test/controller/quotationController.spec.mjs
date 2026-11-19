import { test, expect } from 'vitest'
import MOCKS from '../helpers/fixtures.mjs'
import { runtime } from '../helpers/application.mjs'
test('returns a controlled server error for unexpected validation failures', async () => {
  const rt = runtime({
    'src/service/validationService.js': {
      inputData() {
        throw new Error('synthetic failure')
      },
    },
  })
  expect(
    await rt
      .load('src/controller')
      .quotation.getQuotation(MOCKS.INPUT_REQUEST_INVALID),
  ).toEqual(MOCKS.RESPONSE_CONTROLLER_ERROR())
})
