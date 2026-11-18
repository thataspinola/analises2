const MOCKS = require('../../mocks/index.mock')
const controller = require('../../../src/controller')
const service = require('../../../src/service')
const factory = require('../../../src/factory')
const dealsDataLayer = require('@porto-seguro/hub-vendas.carbon-acquisition-deals-data-layer')

jest.mock('../../../src/property')
jest.mock('../../../src/service')
jest.mock('../../../src/factory')
jest.mock(
	'@porto-seguro/hub-vendas.carbon-acquisition-deals-data-layer',
	() => ({
		getDealsData: jest.fn(),
	})
)

describe('findDealsController test suite', () => {
	beforeEach(() => {
		jest.clearAllMocks()
	})

	test('Should process with success', async () => {
		service.cpfValidation.isValidCPF.mockReturnValueOnce(true)
		factory.dataFormatFactory.buildResponse.mockReturnValueOnce(
			MOCKS.FACTORY_DATA_FORMAT_MOCKS.VALID_RESPONSE()
		)

		await controller.findDealsController.process(
			MOCKS.CONTROLLER_FIND_DEALS_MOCKS.VALID_INPUT_DATA()
		)

		expect(service.cpfValidation.isValidCPF).toBeCalledWith(
			MOCKS.CONTROLLER_FIND_DEALS_MOCKS.VALID_INPUT_DATA()
		)

		expect(dealsDataLayer.getDealsData).toBeCalled()
		expect(factory.dataFormatFactory.buildResponse).toBeCalled()
		expect(factory.response.success).toBeCalledWith(
			MOCKS.FACTORY_DATA_FORMAT_MOCKS.VALID_RESPONSE()
		)
	})

	test('Should return a validation error if the CPF is invalid', async () => {
		service.cpfValidation.isValidCPF.mockImplementationOnce(() => {
			return false
		})

		await controller.findDealsController.process(
			MOCKS.CONTROLLER_FIND_DEALS_MOCKS.VALID_INPUT_DATA()
		)

		expect(service.logger.error).toBeCalledWith(
			'Erro identificado: Número de CPF inválido'
		)
		expect(factory.response.error).toBeCalledWith('Número de CPF inválido', 400)
	})

	it('Should return an internal error if an unknown error occurs', async () => {
		service.cpfValidation.isValidCPF.mockReturnValueOnce(true)
		const error = new Error('Erro desconhecido')

		dealsDataLayer.getDealsData.mockRejectedValue(error)
		factory.response.error.mockReturnValue({
			name: 'Error',
			message: 'Erro interno',
		})

		const result = await controller.findDealsController.process(
			MOCKS.CONTROLLER_FIND_DEALS_MOCKS.VALID_INPUT_DATA()
		)

		expect(dealsDataLayer.getDealsData).toHaveBeenCalledWith({
			document: MOCKS.CONTROLLER_FIND_DEALS_MOCKS.VALID_INPUT_DATA(),
		})
		expect(factory.response.error).toHaveBeenCalledWith('Erro interno')
		expect(result).toEqual({ name: 'Error', message: 'Erro interno' })
	})
})
