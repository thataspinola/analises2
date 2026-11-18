const app = require('../../index')
const controller = require('../../src/controller')
const api = require('../../src/api')
const factory = require('../../src/factory')
const MOCKS = require('./mocks/createDealsPortoTag.mock')
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
			controller.dealsPortoTagController,
			'process'
		)
		const apiSpy = jest.spyOn(api.portoTag.tagsApi, 'getTagsByDocument')
		const factorySaveSpy = jest.spyOn(factory.saveFactory, 'build')
		const dealsDataLayerSpy = jest.spyOn(dealsDataLayer, 'saveDealsData')
		const factorySuccessSpy = jest.spyOn(factory.response, 'success')
		axios.mockResolvedValueOnce({ data: MOCKS.VALID_AXIOS_RESPONSE() })
		tokenLayer.getPortoSegTokenHub.mockReturnValueOnce(
			MOCKS.PORTOSEG_TOKEN_HUB()
		)

		// when
		await app.handler(event)

		// then
		expect(controllerSpy).toHaveBeenCalledWith(MOCKS.VALID_INPUT_CONTROLLER())
		expect(apiSpy).toHaveBeenCalledWith(
			MOCKS.VALID_DOCUMENT(),
			MOCKS.PORTOSEG_TOKEN_HUB()
		)
		expect(factorySaveSpy).toHaveBeenCalledWith(
			MOCKS.VALID_DOCUMENT(),
			MOCKS.VALID_AXIOS_RESPONSE()
		)
		expect(dealsDataLayerSpy).toHaveBeenCalledWith(
			MOCKS.VALID_FACTORY_SAVE_RETURN()
		)
		expect(factorySuccessSpy).toHaveBeenCalledWith('Success')
	})

	test('Should process successfully when there is no data', async () => {
		// given
		const controllerSpy = jest.spyOn(
			controller.dealsPortoTagController,
			'process'
		)
		const apiSpy = jest.spyOn(api.portoTag.tagsApi, 'getTagsByDocument')
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
		tokenLayer.getPortoSegTokenHub.mockReturnValueOnce(
			MOCKS.PORTOSEG_TOKEN_HUB()
		)

		// when
		await app.handler(event)

		// then
		expect(controllerSpy).toHaveBeenCalledWith(MOCKS.VALID_INPUT_CONTROLLER())
		expect(apiSpy).toHaveBeenCalledWith(
			MOCKS.VALID_DOCUMENT(),
			MOCKS.PORTOSEG_TOKEN_HUB()
		)
		expect(factorySaveSpy).not.toHaveBeenCalled()
		expect(dealsDataLayerSpy).not.toHaveBeenCalled()
		expect(factorySuccessSpy).toHaveBeenCalledWith('Success')
	})
})
