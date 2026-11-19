import { describe, test, expect } from 'vitest'
import { runtime } from '../helpers/application.mjs'
import MOCKS from '../helpers/fixtures.mjs'

describe('test for response factory', () => {
  const factory = () => runtime({}, { realSuccess: true }).load('src/factory')
  test('should convert the response successfully', () => {
    const dateOfBirth = '2000-06-25'

    let result = factory().responseSuccess.quotationSuccess(
      MOCKS.OFERTAS_DATA(),
      dateOfBirth,
    )

    expect(result).toEqual(MOCKS.RESPONSE_QUOTATION_DATA_SUCCESS(dateOfBirth))
  })
})
