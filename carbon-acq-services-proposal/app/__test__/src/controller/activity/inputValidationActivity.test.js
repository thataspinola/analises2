const activity = require('../../../../src/controller/activity')
const service = require('../../../../src/service')
const MOCKS = require('../../../mocks/index.mock')
const errors = require('../../../../src/error')

jest.mock('../../../../src/service')

describe('inputValidationActivity.execute', () => {
	beforeEach(() => {
		jest.clearAllMocks()

		service.validation = {
			inputData: jest.fn(),
		}
		service.logger = {
			warn: jest.fn(),
			error: jest.fn(),
		}
	})

	it('should not throw an error for valid input (default product)', () => {
		const parsedInputData = MOCKS.CONTROLLER_REQUEST.VALID_PARSEDJSON_INPUT()
		expect(() =>
			activity.inputValidation.execute(parsedInputData)
		).not.toThrow()
	})

	it('should throw ValidationError if default product is missing origin address', () => {
		const parsedInputData = MOCKS.CONTROLLER_REQUEST.VALID_PARSEDJSON_INPUT()
		parsedInputData.serviceProvision.serviceOrder.serviceAddresses = [
			{ type: 'destino' },
		]
		expect(() => activity.inputValidation.execute(parsedInputData)).toThrow(
			errors.ValidationError
		)
		expect(service.logger.warn).toHaveBeenCalled()
	})

	it('should throw ValidationError if default product has destination address', () => {
		const parsedInputData = MOCKS.CONTROLLER_REQUEST.VALID_PARSEDJSON_INPUT()
		parsedInputData.serviceProvision.serviceOrder.serviceAddresses = [
			{ type: 'origem' },
			{ type: 'destino' },
		]
		expect(() => activity.inputValidation.execute(parsedInputData)).toThrow(
			errors.ValidationError
		)
		expect(service.logger.warn).toHaveBeenCalled()
	})

	it('should throw ValidationError if default product scheduleType is not "agendamento-programado"', () => {
		const parsedInputData = MOCKS.CONTROLLER_REQUEST.VALID_PARSEDJSON_INPUT()
		parsedInputData.serviceProvision.schedule.scheduleType = 'agendamento-imediato'
		expect(() => activity.inputValidation.execute(parsedInputData)).toThrow(
			errors.ValidationError
		)
		expect(service.logger.warn).toHaveBeenCalled()
	})

	it('should not throw an error for valid guincho input', () => {
		const parsedInputData = MOCKS.CONTROLLER_REQUEST.VALID_PARSEDJSON_INPUT()
		parsedInputData.serviceProvision.products[0].type = 'guincho'
		parsedInputData.serviceProvision.serviceOrder.serviceAddresses = [
			{ type: 'origem' },
			{ type: 'destino' },
		]
		expect(() =>
			activity.inputValidation.execute(parsedInputData)
		).not.toThrow()
	})

	it('should throw ValidationError if guincho is missing origin address', () => {
		const parsedInputData = MOCKS.CONTROLLER_REQUEST.VALID_PARSEDJSON_INPUT()
		parsedInputData.serviceProvision.products[0].type = 'guincho'
		parsedInputData.serviceProvision.serviceOrder.serviceAddresses = [
			{ type: 'destino' }
		]
		expect(() => activity.inputValidation.execute(parsedInputData)).toThrow(errors.ValidationError)
		expect(service.logger.warn).toHaveBeenCalled()
	})

	it('should throw ValidationError if guincho is missing destination address', () => {
		const parsedInputData = MOCKS.CONTROLLER_REQUEST.VALID_PARSEDJSON_INPUT()
		parsedInputData.serviceProvision.products[0].type = 'guincho'
		parsedInputData.serviceProvision.serviceOrder.serviceAddresses = [
			{ type: 'origem' }
		]
		expect(() => activity.inputValidation.execute(parsedInputData)).toThrow(errors.ValidationError)
		expect(service.logger.warn).toHaveBeenCalled()
	})

})
