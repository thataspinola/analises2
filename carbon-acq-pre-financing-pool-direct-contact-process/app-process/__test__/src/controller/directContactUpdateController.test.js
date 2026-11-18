const MOCKS = require('../../mocks/index.mock')
const controller = require('../../../src/controller')
const api = require('../../../src/api')
const service = require('../../../src/service')
const error = require('../../../src/error')
const token = require('@porto-seguro/hub-vendas.carbon-token')
jest.mock('@porto-seguro/hub-vendas.carbon-token')
jest.mock('../../../src/api')
jest.mock('../../../src/service')

beforeEach(() => {
	service.logger = {
		info: jest.fn(),
		error: jest.fn(),
		warn: jest.fn(),
		debug: jest.fn(),
	}
	jest.clearAllMocks()
	service.validation.inputData.mockImplementation((paramters) => {
		const vdoCodeValidadeError = "1234"

		if(paramters.lead.vdoCode === vdoCodeValidadeError){
			throw new error.ValidationError('Invalid payload')
		}
	})

	token.getSensediaTokenCarbonCloudInternal.mockImplementation(() => {
		return MOCKS.SENSEDIA_TOKEN_CARBON_CLOUD_INTERNAL()
	})

	token.getPortoCertificates.mockImplementation(() => {
		return MOCKS.CERTIFICATES()
	})

	service.dynamoDb.preFinancingLeadDataCache.get.mockImplementation((vdoCode) => {
		if(vdoCode === "123") throw new Error('Get lead cache Error')
		if(vdoCode === "123456") {
			return MOCKS.SERVICE_PRE_FINANCING_LEAD_DYNAMODB.GET_SECOUND_LEAD_CACHE_RETURN()
		}
		return MOCKS.SERVICE_PRE_FINANCING_LEAD_DYNAMODB.GET_LEAD_CACHE_RETURN()
	})

	api.producaoComercial.multicanal.leads.putContactRequestLead.mockImplementation(
		(leadPayload, sensediaCloudToken, certificates) => {

			if(leadPayload === MOCKS.SERVICE_PRE_FINANCING_LEAD_DYNAMODB
				.GET_SECOUND_LEAD_CACHE_RETURN().LEAD_ID
			) throw new Error('Update api Error')

			return MOCKS.API_PRODUCAOCOMERCIAL_MULTICANAL_LEADS
				.PUT_UPDATE_CONTACT_REQUEST_SUCCESS_RESPONSE()
		}
	)

})

describe('Given a valid input', () => {
	test('It should pass with no exceptions, updated lead and return success', async () => {
		await expect(
			controller.directContactUpdate.process(
				MOCKS.CONTROLLER_DIRECTCONTACT_UPDATED.PROCESSCONTACT_UPDATE_VALID_INPUT()
			)
    	).resolves.not.toThrow()
	})

	test('It should return with exceptions, when payload is not valid', async () => {
		await expect(
			controller.directContactUpdate.process(
				MOCKS.CONTROLLER_DIRECTCONTACT_UPDATED
				.PROCESSCONTACT_UPDATE_VALID_SECOUND_INPUT('1234')
			)
    	).rejects.toThrow('Direct contact request Update processing error: Invalid payload')
	})

	test('It should return with exceptions, when not found lead', async () => {
		await expect(
			controller.directContactUpdate.process(
				MOCKS.CONTROLLER_DIRECTCONTACT_UPDATED
				.PROCESSCONTACT_UPDATE_VALID_SECOUND_INPUT('123')
			)
    	).rejects.toThrow('Direct contact request Update processing error: Get lead cache Error')
	})

	test('It should return with exceptions, when not found lead', async () => {
		await expect(
			controller.directContactUpdate.process(
				MOCKS.CONTROLLER_DIRECTCONTACT_UPDATED
				.PROCESSCONTACT_UPDATE_VALID_SECOUND_INPUT('123456')
			)
    	).rejects.toThrow('Direct contact request Update processing error: Update api Error')
	})
})