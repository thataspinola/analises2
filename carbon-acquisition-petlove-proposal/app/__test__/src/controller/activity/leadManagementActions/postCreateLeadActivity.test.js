const service = require('../../../../../src/service')
const factory = require('../../../../../src/factory')
const api = require('../../../../../src/api')
const postCreateLeadActivity = require('../../../../../src/controller/activity/leadManagementActions/postCreateLeadActivity')
const MOCKS = require('../../../../mocks/index.mock')

jest.mock('../../../../../src/service')
jest.mock('../../../../../src/factory')
jest.mock('../../../../../src/api')

afterEach(() => {
	jest.clearAllMocks()
	jest.restoreAllMocks()
	jest.resetModules()
})

beforeAll(() => {
	service.logger.info.mockImplementation((message) => {})
	service.logger.error.mockImplementation((message) => {})

	api.hubVendasCarbon.support.createLead.postCreateLead.mockImplementation(() =>
		MOCKS.CREATE_LEAD_REQUEST.API_SUPPORTCREATELEAD_POSTCREATELEAD_VALID_RETURN()
	)
})

beforeEach(() => {
	factory.controllerResponse.success.mockImplementation(() => {
		return MOCKS.FACTORY_CONTROLLERRESPONSE.CONTROLLER_SUCCESS_RETURN()
	})
})

describe('Suite de teste de postCreateLeadActivity.js', () => {
	test('It should pass, call execute api and return success', async () => {
		const parsedInputData =
			MOCKS.CREATE_LEAD_REQUEST.PROCESS_VALID_PARSEDJSON_INPUT()

		const result = await postCreateLeadActivity.execute(parsedInputData)

		expect(result).toEqual(MOCKS.CREATE_LEAD_REQUEST.PROCESS_VALID_RETURN())

		const spyServiceLoggerError = jest.spyOn(service.logger, 'info')
		expect(spyServiceLoggerError).toHaveBeenCalled()
	})

	test('It should return internal error from the create lead api', async () => {
		api.hubVendasCarbon.support.createLead.postCreateLead.mockImplementationOnce(
			MOCKS.CREATE_LEAD_REQUEST
				.API_SUPPORTCREATELEAD_POSTCREATELEAD_ERROR_RETURN
		)

		const parsedInputData =
			MOCKS.CREATE_LEAD_REQUEST.PROCESS_VALID_PARSEDJSON_INPUT()

		await expect(
			postCreateLeadActivity.execute(parsedInputData)
		).rejects.toThrow('API failure')

		const spyServiceLoggerError = jest.spyOn(service.logger, 'error')
		expect(spyServiceLoggerError).toHaveBeenCalled()
	})
})
