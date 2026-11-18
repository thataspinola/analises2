const controller = require('../../../src/controller')
const service = require('../../../src/service')
const MOCKS = require('../../mocks/index.mock')
const factory = require('../../../src/factory')
const api = require('../../../src/api')
const { ValidationError } = require('../../../src/error')

jest.mock('../../../src/service')
jest.mock('../../../src/factory')
jest.mock('../../../src/api')

describe('Suite de testes de updateLeadController.js', () => {
	beforeEach(() => {
		jest.clearAllMocks()
		service.validation.inputData.mockRestore()
	})

	test('Deve validar a entrada e enviar o update do lead em processamento com sucesso', async () => {
		factory.updateLead.createPayload.mockReturnValue(
			MOCKS.EXPECT_PAYLOAD_PHONE_PAID
		)
		api.carbonInternal.updateLead.mockResolvedValue()

		await controller.updateLead.processSqsMessage(MOCKS.VALID_INPUT_DATA_PAID)

		expect(service.validation.inputData).toHaveBeenCalledWith(
			MOCKS.VALID_INPUT_DATA_PAID
		)
		expect(factory.updateLead.createPayload).toHaveBeenCalledWith(
			MOCKS.VALID_INPUT_DATA_PAID
		)
		expect(api.carbonInternal.updateLead).toHaveBeenCalledWith(
			MOCKS.EXPECT_PAYLOAD_PHONE_PAID
		)
	})

	test('Deve validar a entrada e enviar o update do lead em processamento com sucesso para portable_device', async () => {
		factory.updateLead.createPayload.mockReturnValue(
			MOCKS.EXPECT_PAYLOAD_PORTABLE_DEVICE_PAGA
		)
		api.carbonInternal.updateLead.mockResolvedValue()

		await controller.updateLead.processSqsMessage(
			MOCKS.INPUT_PAYLOAD_PORTABLE_DEVICE('PAGA')
		)

		expect(service.validation.inputData).toHaveBeenCalledWith(
			MOCKS.INPUT_PAYLOAD_PORTABLE_DEVICE('PAGA')
		)
		expect(factory.updateLead.createPayload).toHaveBeenCalledWith(
			MOCKS.INPUT_PAYLOAD_PORTABLE_DEVICE('PAGA')
		)
		expect(api.carbonInternal.updateLead).toHaveBeenCalledWith(
			MOCKS.EXPECT_PAYLOAD_PORTABLE_DEVICE_PAGA
		)
	})

	test('Deve retornar um erro quando a validação da entrada falhar', async () => {
		const validationError = new Error('Validation failed')
		service.validation.inputData.mockImplementation(() => {
			throw validationError
		})

		await expect(() =>
			controller.updateLead.processSqsMessage(MOCKS.VALID_INPUT_DATA_PAID)
		).rejects.toThrow('Validation failed')
	})

	test('Deve retornar um erro id_ramo not found quando a validação da entrada falhar', () => {
		expect(() =>
			controller.updateLead.processSqsMessage(
				MOCKS.INVALID_INPUT_DATA_WITHOUT_SCOPE_IDBRANCH
			)
		).rejects.toThrow('id_ramo not found')
	})
})
