const service = require('./../../../../src/service')
const activity = require('./../../../../src/controller/activity')
const MOCKS = require('./../../../mocks/src/controller/activity/validationActivity.mock')

jest.mock('./../../../../src/service')

beforeEach(() => {
    service.validation.inputData.mockImplementation(() => {})
    service.cpfValidation.isValidCPF.mockImplementation(() => true)
})

describe('ValidationService test suite', () => {
    test('Should Throw validationError', async () => {
        service.validation.inputData.mockImplementation(() => {
            throw MOCKS.VALIDATION_ERROR()
        })

        expect(() => {activity.validation.execute()}).toThrow(MOCKS.VALIDATION_ERROR())
    })

    test('Should Throw validationError CPF', async () => {
        service.cpfValidation.isValidCPF.mockImplementation(() => false)

        expect(() => {
            activity.validation.execute(MOCKS.VALID_SCHEMA(), 'traceId')
        }).toThrow(MOCKS.VALIDATION_ERROR_CPF())
    })

    test('Should return not error', async () => {
        expect(() => {
            activity.validation.execute(MOCKS.VALID_SCHEMA(), 'traceId')
        }).not.toThrow()
    })
})