const tokenLayer = require('@porto-seguro/hub-vendas.carbon-token')
const controller = require('../../../../src/controller')
const api = require('../../../../src/api')
const MOCKS = require('../../mocks/index.mock')
const service = require('../../../../src/service')
const factory = require('../../../../src/factory')
const errors = require('../../../../src/error')
const CONSTANTS = require('../../../../src/property')
const dealsDataLayer = require('@porto-seguro/hub-vendas.carbon-acquisition-deals-data-layer')

jest.mock('@porto-seguro/hub-vendas.carbon-token')
jest.mock('../../../../src/service')
jest.mock('../../../../src/factory')
jest.mock('../../../../src/api')

jest.mock(
	'@porto-seguro/hub-vendas.carbon-acquisition-deals-data-layer',
	() => ({
		saveDealsData: jest.fn(),
	})
)

afterEach(() => {
	jest.clearAllMocks()
})

describe('Card Proposals Controller test suite', () => {
	test('Should process and return success response', async () => {
		tokenLayer.getPortoSegTokenHub.mockImplementation(async () => {
			return MOCKS.API_TAGS_MOCKS.VALID_PORTOSEG_TOKEN_HUB()
		})

		api.portoTag.tagsApi.getTagsByDocument.mockReturnValue(
			MOCKS.API_TAGS_MOCKS.SUCCESS_RETURN_BODY_VALUE()
		)

		await controller.dealsPortoTagController.process(
			MOCKS.CONTROLLER_DEALS_PORTO_TAG.VALID_INPUT_DATA()
		)

		expect(service.schemaValidation.inputData).toBeCalledWith(
			MOCKS.CONTROLLER_DEALS_PORTO_TAG.VALID_INPUT_DATA()
		)
		expect(tokenLayer.getPortoSegTokenHub).toBeCalled()
		expect(api.portoTag.tagsApi.getTagsByDocument).toBeCalledWith(
			MOCKS.API_TAGS_MOCKS.VALID_DOCUMENT(),
			MOCKS.API_TAGS_MOCKS.VALID_PORTOSEG_TOKEN_HUB()
		)
		expect(dealsDataLayer.saveDealsData).toBeCalled()
		expect(factory.response.success).toBeCalledWith('Success')
	})

	test('Should process successfully when there is no data', async () => {
		tokenLayer.getPortoSegTokenHub.mockImplementation(async () => {
			return MOCKS.API_TAGS_MOCKS.VALID_PORTOSEG_TOKEN_HUB()
		})

		api.portoTag.tagsApi.getTagsByDocument.mockReturnValueOnce(
			MOCKS.API_TAGS_MOCKS.RESPONSE_EMPTY_API()
		)

		await controller.dealsPortoTagController.process(
			MOCKS.CONTROLLER_DEALS_PORTO_TAG.VALID_INPUT_DATA()
		)

		expect(service.schemaValidation.inputData).toBeCalledWith(
			MOCKS.CONTROLLER_DEALS_PORTO_TAG.VALID_INPUT_DATA()
		)
		expect(tokenLayer.getPortoSegTokenHub).toBeCalled()
		expect(api.portoTag.tagsApi.getTagsByDocument).toBeCalledWith(
			MOCKS.API_TAGS_MOCKS.VALID_DOCUMENT(),
			MOCKS.API_TAGS_MOCKS.VALID_PORTOSEG_TOKEN_HUB()
		)
		expect(dealsDataLayer.saveDealsData).not.toBeCalled()
		expect(factory.response.success).toBeCalledWith('Success')
	})

	test('It should process and return validation error response', async () => {
		const validationError = new errors.ValidationError('Validation Error')
		service.schemaValidation.inputData.mockImplementationOnce(() => {
			throw validationError
		})

		await controller.dealsPortoTagController.process(
			MOCKS.CONTROLLER_DEALS_PORTO_TAG.VALID_INPUT_DATA()
		)

		expect(service.logger.error).toBeCalledWith(validationError.message)
		expect(factory.response.error).toBeCalledWith('Validation Error', 400)
	})

	test('It should process and return internal error response from token', async () => {
		const unknownError = new Error('Unknown error')
		tokenLayer.getPortoSegTokenHub.mockImplementationOnce(() => {
			throw unknownError
		})

		await controller.dealsPortoTagController.process(
			MOCKS.CONTROLLER_DEALS_PORTO_TAG.VALID_INPUT_DATA()
		)

		expect(service.logger.error).toBeCalledWith(
			CONSTANTS.TOKEN_ERROR_DEFAULT_MESSAGE
		)
		expect(factory.response.error).toBeCalledWith(
			'Erro ao obter o token do gateway.',
			500
		)
	})

	test('It should process and return error response from deals data layer', async () => {
		const unknownError = new Error('Unknown error')
		dealsDataLayer.saveDealsData.mockImplementationOnce(() => {
			throw unknownError
		})

		await controller.dealsPortoTagController.process(
			MOCKS.CONTROLLER_DEALS_PORTO_TAG.VALID_INPUT_DATA()
		)

		expect(service.logger.error).toBeCalledWith(
			"Erro identificado durante a atividade 'Salvando dados no banco dynamoDB': Unknown error"
		)
		expect(factory.response.error).toBeCalledWith('Unknown error', 500)
	})
})
