const controller = require('../../../src/controller')
const MOCKS = require('../../mocks/index')
const activity = require('../../../src/controller/activity')
const service = require('./../../../src/service')

jest.mock('./../../../src/service')
jest.mock('./../../../src/controller/activity')

beforeEach(() => {
	activity.validation.execute.mockImplementation((params) => {
		if(!params){
			throw MOCKS.LEAD_CONTROLLER.GET_VALIDATION_ERROR()
		}
	})

	activity.getTokenCarbonCloud.execute.mockImplementation(() => MOCKS.LEAD_CONTROLLER.TOKEN_CLOUD())
    activity.getTokenCloud.execute.mockImplementation(() => MOCKS.LEAD_CONTROLLER.TOKEN())
    activity.getCertificate.execute.mockImplementation(() => MOCKS.LEAD_CONTROLLER.CERTIFICATE())
   
	activity.createLeadDynamics.execute.mockImplementation((params) => {
		if(params.cpf == MOCKS.LEAD_CONTROLLER.INPUT_DATA_TOKEN_ERROR().cpf){
			throw MOCKS.LEAD_CONTROLLER.GET_TOKEN_ERROR() 
		}
		
		return MOCKS.LEAD_CONTROLLER.LEAD_DAYNAMICS()
	})
})

describe('Suite de testes de leadController.js', () => {
    test('It should return success when call leadController', async () => {
		await controller.leadController.process(MOCKS.LEAD_CONTROLLER.INPUT_DATA_VALID())

		expect(activity.createLeadDynamics.execute).toHaveBeenCalledWith(
            MOCKS.LEAD_CONTROLLER.INPUT_DATA_VALID(),
            MOCKS.LEAD_CONTROLLER.TOKEN_CLOUD(),
            MOCKS.LEAD_CONTROLLER.TOKEN(),
            MOCKS.LEAD_CONTROLLER.CERTIFICATE()
        )
	})

	test('Should throw get token', async () => {
		const errorSpy = jest.spyOn(service.logger, 'warn')

		await expect(controller.leadController.process()).rejects.toThrow(
			MOCKS.LEAD_CONTROLLER.GET_VALIDATION_ERROR()
		)

		expect(errorSpy).toHaveBeenCalledWith(
			MOCKS.LEAD_CONTROLLER.LOG_VALIDATION_ERROR(), 
			MOCKS.LEAD_CONTROLLER.LOG_VALIDATION_ERROR_MESSAGE()
		)
	})

	test('Should throw error create lead', async () => {
		const errorSpy = jest.spyOn(service.logger, 'error')

		await expect(controller.leadController.process(
			MOCKS.LEAD_CONTROLLER.INPUT_DATA_TOKEN_ERROR())
		).rejects.toThrow(
			MOCKS.LEAD_CONTROLLER.GET_TOKEN_ERROR()
		)

		expect(errorSpy).toHaveBeenCalledWith(
			MOCKS.LEAD_CONTROLLER.LOG_TOKEN_ERROR(), 
			MOCKS.LEAD_CONTROLLER.LOG_TOKEN_ERROR_MESSAGE()
		)
	})
})
