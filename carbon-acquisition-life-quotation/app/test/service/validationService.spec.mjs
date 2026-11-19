import { describe, test, expect, vi, beforeEach } from 'vitest'
import MOCKS from '../helpers/fixtures.mjs'
import { runtime } from '../helpers/application.mjs'
import Ajv from 'ajv'
let service
beforeEach(() => {
  service = runtime().load('src/service')
})
describe('Given a inputData call', () => {
  test('It should not throw errors after validating an object that follows the expected schema', async () => {
    expect(() => {
      service.validation.inputData(MOCKS.SCHEMA_VALIDE(), MOCKS.SCHEMA())
    }).not.toThrow()
  })

  test('It should throw an error after validating an object that follows the expected schema with an invalid property type', async () => {
    expect(() => {
      service.validation.inputData(MOCKS.SCHEMA_NOT_SUSEP(), MOCKS.SCHEMA())
    }).toThrow(MOCKS.VALIDATION_SERVICE_INVALID_INPUT_DATA('susep'))
  })

  test('It should throw an error after an unexpected validation error', async () => {
    vi.spyOn(Ajv.prototype, 'compile').mockImplementation(() => {
      const returnObj = vi.fn(() => {})
      returnObj.errors = [
        {
          keyword: 'unexpected',
        },
      ]

      return returnObj
    })

    expect(() => {
      service.validation.inputData(MOCKS.SCHEMA_VALIDE(), MOCKS.SCHEMA())
    }).toThrow(
      'The attributes values are not valid: can not determine property',
    )

    vi.restoreAllMocks()

    vi.spyOn(Ajv.prototype, 'compile').mockImplementation(() => {
      const returnObj = vi.fn(() => {})
      returnObj.errors = [
        {
          keyword: 'type',
          instancePath: '',
        },
      ]

      return returnObj
    })

    expect(() => {
      service.validation.inputData(MOCKS.SCHEMA_VALIDE(), MOCKS.SCHEMA())
    }).toThrow(
      'The attributes values are not valid: can not determine property',
    )
  })
})
