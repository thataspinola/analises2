const MOCKS = require('../../mocks/index.mock')
const controller = require('../../../src/controller/createDealsController')
const service = require('../../../src/service')
const integration = require('../../../src/integration')
const CONSTANTS = require('../../../src/property')

jest.mock('../../../src/service')

afterEach(() => {
	jest.restoreAllMocks()
	jest.clearAllMocks()
})

beforeAll(() => {
	service.cpfValidation.isValidCPF.mockImplementation(() => {
		return true
	})

	integration.sns.sendNotification = jest.fn(() => {
		return '1234567'
	})

	service.schemaValidation.validate.mockImplementation(() => {})

	service.logger = {
		info: jest.fn(),
		error: jest.fn(),
		warn: jest.fn(),
		debug: jest.fn(),
	}
})

describe('Suite tests for ceateDealsController.js', () => {
	test('It should pass without exceptions calling cpf validation', async () => {
		const spyCpfValidation = jest.spyOn(service.cpfValidation, 'isValidCPF')

		const spySNS = jest.spyOn(integration.sns, 'sendNotification')

		await controller.process(MOCKS.VALID_INPUT_DATA())

		expect(spyCpfValidation).toHaveBeenCalled()

		expect(spySNS).toHaveBeenCalled()
		expect(spySNS).toHaveBeenCalledWith(MOCKS.VALID_INPUT_DATA())
	})

	test('It should get an error response when an unexpected exception occur in input validation', async () => {
		service.schemaValidation.validate.mockImplementationOnce(() => {
			throw new Error('Unexpected error')
		})
		const spyServiceLoggerError = jest.spyOn(service.logger, 'error')

		const response = await controller.process(MOCKS.INVALID_INPUT_DATA())

		expect(spyServiceLoggerError).toHaveBeenCalledWith(
			`Erro identificado: Unexpected error`
		)
		expect(response).toEqual(MOCKS.CONTROLLER_REQUEST_INTERNAL_ERROR())
	})

	test('It should get an bad request response when receives an invalid CPF value', async () => {
		service.cpfValidation.isValidCPF.mockImplementationOnce(() => {
			return false
		})
		const response = await controller.process(
			MOCKS.INVALID_INPUT_DATA_CPF_INVALID()
		)
		expect(response).toEqual(MOCKS.CONTROLLER_REQUEST_BAD_REQUEST())
	})
})
