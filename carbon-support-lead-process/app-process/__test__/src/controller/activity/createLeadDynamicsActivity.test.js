const dynamicsLayer = require('@porto-seguro/hub-vendas.carbon-service-connector-dynamics')
const service = require('../../../../src/service')
const activity = require('../../../../src/controller/activity')
const MOCKS = require('../../../mocks/index')

jest.mock('@porto-seguro/hub-vendas.carbon-service-connector-dynamics')

beforeEach(() => {
	dynamicsLayer.createLead.mockImplementation(async (params) => {
		if(params){
			return MOCKS.ACTIVITY_DYNAMICS.RESPONSE_SUCCESS()
		}

		throw new Error(MOCKS.ACTIVITY_DYNAMICS.MESSAGE_ERROR_DYNAMICS())
	})
})

describe('tokenActivity test suite', () => {
	test('Should create lead success', async () => {
		const result = await activity.createLeadDynamics.execute(
			MOCKS.ACTIVITY_DYNAMICS.INPUT_DATA_VALID()
		)

		expect(result).toEqual(MOCKS.ACTIVITY_DYNAMICS.RESPONSE_SUCCESS())
	})

	test('Should throw an error when calls token layer with fail', async () => {
		const errorSpy = jest.spyOn(service.logger, 'error')

		await expect(activity.createLeadDynamics.execute()).rejects.toThrow(
			new Error(MOCKS.ACTIVITY_DYNAMICS.MESSAGE_ERROR_DYNAMICS())
		)

		expect(errorSpy).toHaveBeenCalledWith(MOCKS.ACTIVITY_DYNAMICS.LOG_ERROR_TOKEN())
	})
})