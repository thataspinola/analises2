const app = require('../../index')
const controller = require('../../src/controller')
const api = require('../../src/api')
const factory = require('../../src/factory')
const MOCKS = require('./mocks/cardProposals.mock')
const tokenLayer = require('@porto-seguro/hub-vendas.carbon-token')
const axios = require('axios')
const dealsDataLayer = require('@porto-seguro/hub-vendas.carbon-acquisition-deals-data-layer')
const service = require('../../src/service')

jest.mock('axios')
jest.mock('@porto-seguro/hub-vendas.carbon-token')
jest.mock(
	'@porto-seguro/hub-vendas.carbon-acquisition-deals-data-layer',
	() => ({
		saveDealsData: jest.fn(),
	})
)

describe('Get card proposals in progress integration test suite', () => {
	let event
	let record

	beforeEach(() => {
		jest.clearAllMocks()

		record = {
			body: JSON.stringify(MOCKS.VALID_INPUT_CONTROLLER()),
			messageId: 'testId',
		}
		event = { Records: [record] }

		service.logger = {
			info: jest.fn(),
			error: jest.fn(),
		}
	})

	test('Should execute entire process and returns valid response', async () => {
		// given
		const controllerSpy = jest.spyOn(
			controller.cardProposalsController,
			'process'
		)
		const apiSpy = jest.spyOn(
			api.portobank.pisWorkflow.propostaApi,
			'getCardProposalsInProgressByDocument'
		)
		const serviceFilterSpy = jest.spyOn(
			service.filterCardProposalsInProgress,
			'filter'
		)
		const factoryDataSpy = jest.spyOn(
			factory.cardProposalsDataFactory,
			'getSaveDealsData'
		)
		const factorySaveSpy = jest.spyOn(factory.saveFactory, 'build')
		const dealsDataLayerSpy = jest.spyOn(dealsDataLayer, 'saveDealsData')
		const factorySuccessSpy = jest.spyOn(factory.response, 'success')
		axios.mockResolvedValueOnce({ data: MOCKS.VALID_AXIOS_RESPONSE() })
		tokenLayer.getSensediaTokenHubCloud.mockReturnValueOnce(
			MOCKS.SENSEDIA_TOKEN_HUB_CLOUD()
		)

		// when
		await app.handler(event)

		// then
		expect(controllerSpy).toHaveBeenCalledWith(MOCKS.VALID_INPUT_CONTROLLER())
		expect(apiSpy).toHaveBeenCalledWith(
			MOCKS.VALID_DOCUMENT(),
			MOCKS.SENSEDIA_TOKEN_HUB_CLOUD()
		)
		expect(serviceFilterSpy).toHaveBeenCalledWith(MOCKS.VALID_AXIOS_RESPONSE())
		expect(factoryDataSpy).toHaveBeenCalledWith(MOCKS.VALID_FILTER_RESPONSE())
		expect(factorySaveSpy).toHaveBeenCalledWith(
			MOCKS.VALID_DOCUMENT(),
			MOCKS.VALID_FACTORY_DATA_RETURN()
		)
		expect(dealsDataLayerSpy).toHaveBeenCalledWith(
			MOCKS.VALID_FACTORY_SAVE_RETURN()
		)
		expect(factorySuccessSpy).toHaveBeenCalledWith('Success')
	})

	test('Should process successfully when there is no data', async () => {
		// given
		const controllerSpy = jest.spyOn(
			controller.cardProposalsController,
			'process'
		)
		const apiSpy = jest.spyOn(
			api.portobank.pisWorkflow.propostaApi,
			'getCardProposalsInProgressByDocument'
		)
		const serviceFilterSpy = jest.spyOn(
			service.filterCardProposalsInProgress,
			'filter'
		)
		const factoryDataSpy = jest.spyOn(
			factory.cardProposalsDataFactory,
			'getSaveDealsData'
		)
		const factorySaveSpy = jest.spyOn(factory.saveFactory, 'build')
		const dealsDataLayerSpy = jest.spyOn(dealsDataLayer, 'saveDealsData')
		const factorySuccessSpy = jest.spyOn(factory.response, 'success')
		axios.mockImplementationOnce(async (params) => {
			const responseError = new Error()

			responseError.response = {
				status: 404,
				data: {},
			}

			throw responseError
		})
		tokenLayer.getSensediaTokenHubCloud.mockReturnValueOnce(
			MOCKS.SENSEDIA_TOKEN_HUB_CLOUD()
		)

		// when
		await app.handler(event)

		// then
		expect(controllerSpy).toHaveBeenCalledWith(MOCKS.VALID_INPUT_CONTROLLER())
		expect(apiSpy).toHaveBeenCalledWith(
			MOCKS.VALID_DOCUMENT(),
			MOCKS.SENSEDIA_TOKEN_HUB_CLOUD()
		)
		expect(serviceFilterSpy).toHaveBeenCalledWith(null)
		expect(factoryDataSpy).toHaveBeenCalledWith(undefined)
		expect(factorySaveSpy).not.toHaveBeenCalled()
		expect(dealsDataLayerSpy).not.toHaveBeenCalled()
		expect(factorySuccessSpy).toHaveBeenCalledWith('Success')
	})
})
