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
		tokenLayer.getSensediaTokenHubCloud.mockImplementation(async () => {
			return MOCKS.API_PROPOSTA_MOCKS.VALID_SENSEDIA_TOKEN_HUB_CLOUD()
		})

		api.portobank.pisWorkflow.propostaApi.getCardProposalsInProgressByDocument.mockReturnValue(
			MOCKS.API_PROPOSTA_MOCKS.SUCCESS_RETURN_BODY_VALUE()
		)

		factory.cardProposalsDataFactory.getSaveDealsData.mockReturnValue(
			MOCKS.FACTORY_CARD_PROPOSALS_DATA_MOCKS.VALID_RESPONSE()
		)

		await controller.cardProposalsController.process(
			MOCKS.CONTROLLER_CARD_PROPOSALS_MOCKS.VALID_INPUT_DATA()
		)

		expect(service.schemaValidation.inputData).toBeCalledWith(
			MOCKS.CONTROLLER_CARD_PROPOSALS_MOCKS.VALID_INPUT_DATA(),
			CONSTANTS.PROPOSALS_IN_PROGRESS_SCHEMA
		)
		expect(tokenLayer.getSensediaTokenHubCloud).toBeCalled()
		expect(
			api.portobank.pisWorkflow.propostaApi.getCardProposalsInProgressByDocument
		).toBeCalledWith(
			MOCKS.API_PROPOSTA_MOCKS.VALID_DOCUMENT(),
			MOCKS.API_PROPOSTA_MOCKS.VALID_SENSEDIA_TOKEN_HUB_CLOUD()
		)
		expect(dealsDataLayer.saveDealsData).toBeCalled()
		expect(factory.response.success).toBeCalledWith('Success')
	})

	test('Should process successfully when there is no data', async () => {
		tokenLayer.getSensediaTokenHubCloud.mockImplementation(async () => {
			return MOCKS.API_PROPOSTA_MOCKS.VALID_SENSEDIA_TOKEN_HUB_CLOUD()
		})

		api.portobank.pisWorkflow.propostaApi.getCardProposalsInProgressByDocument.mockReturnValueOnce(
			MOCKS.API_PROPOSTA_MOCKS.RESPONSE_EMPTY_API()
		)

		factory.cardProposalsDataFactory.getSaveDealsData.mockReturnValue([])

		await controller.cardProposalsController.process(
			MOCKS.CONTROLLER_CARD_PROPOSALS_MOCKS.VALID_INPUT_DATA()
		)

		expect(service.schemaValidation.inputData).toBeCalledWith(
			MOCKS.CONTROLLER_CARD_PROPOSALS_MOCKS.VALID_INPUT_DATA(),
			CONSTANTS.PROPOSALS_IN_PROGRESS_SCHEMA
		)
		expect(tokenLayer.getSensediaTokenHubCloud).toBeCalled()
		expect(
			api.portobank.pisWorkflow.propostaApi.getCardProposalsInProgressByDocument
		).toBeCalledWith(
			MOCKS.API_PROPOSTA_MOCKS.VALID_DOCUMENT(),
			MOCKS.API_PROPOSTA_MOCKS.VALID_SENSEDIA_TOKEN_HUB_CLOUD()
		)
		expect(dealsDataLayer.saveDealsData).not.toBeCalled()
		expect(factory.response.success).toBeCalledWith('Success')
	})

	test('It should process and return validation error response', async () => {
		const validationError = new errors.ValidationError('Validation Error')
		service.schemaValidation.inputData.mockImplementationOnce(() => {
			throw validationError
		})

		await controller.cardProposalsController.process(
			MOCKS.CONTROLLER_CARD_PROPOSALS_MOCKS.VALID_INPUT_DATA()
		)

		expect(service.logger.error).toBeCalledWith(validationError.message)
		expect(factory.response.error).toBeCalledWith('Validation Error', 400)
	})

	test('It should process and return internal error response from token', async () => {
		const unknownError = new Error('Unknown error')
		tokenLayer.getSensediaTokenHubCloud.mockImplementationOnce(() => {
			throw unknownError
		})

		await controller.cardProposalsController.process(
			MOCKS.CONTROLLER_CARD_PROPOSALS_MOCKS.VALID_INPUT_DATA()
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
		factory.cardProposalsDataFactory.getSaveDealsData.mockReturnValue(
			MOCKS.FACTORY_CARD_PROPOSALS_DATA_MOCKS.VALID_RESPONSE()
		)
		const unknownError = new Error('Unknown error')
		dealsDataLayer.saveDealsData.mockImplementationOnce(() => {
			throw unknownError
		})

		await controller.cardProposalsController.process(
			MOCKS.CONTROLLER_CARD_PROPOSALS_MOCKS.VALID_INPUT_DATA()
		)

		expect(service.logger.error).toBeCalledWith(
			"Erro identificado durante a atividade 'Salvando dados no banco dynamoDB': Unknown error"
		)
		expect(factory.response.error).toBeCalledWith('Unknown error', 500)
	})
})
