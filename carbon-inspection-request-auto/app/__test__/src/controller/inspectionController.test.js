const MOCKS = require('../../mocks/index.mock')

const tokenLayer = require('@porto-seguro/hub-vendas.carbon-token')
const paymentDatalayer = require('@porto-seguro/hub-vendas.carbon-postponed-payment-data-layer')

const api = require('../../../src/api')
const factory = require('../../../src/factory')
const service = require('../../../src/service')
const errors = require('../../../src/error')

const controller = require('../../../src/controller')
const CONSTANTS = require('../../../src/property')

jest.mock('@porto-seguro/hub-vendas.carbon-token')
jest.mock('@porto-seguro/hub-vendas.carbon-postponed-payment-data-layer')
jest.mock('../../../src/api')
jest.mock('../../../src/factory')
jest.mock('../../../src/service')
jest.mock('pino', () => {
	const info = jest.fn()
	const error = jest.fn()
	const warn = jest.fn()
	const debug = jest.fn()
	const silent = jest.fn() // 'silent' log level is also a method in newer versions
	const child = jest.fn(() => ({ info, error, warn, debug, silent, child })) // child returns a logger instance

	return () => ({
		info,
		error,
		warn,
		debug,
		silent,
		child,
	})
})

afterEach(() => {
	jest.clearAllMocks()
	jest.restoreAllMocks()
	jest.resetModules()
})

beforeEach(() => {
	jest.useFakeTimers('modern').setSystemTime(new Date(2023, 10, 16))

	service.validation.inputData.mockImplementation((leadData, schema) => {
		//Do nothing (no input validation errors)
	})

	tokenLayer.getSensediaTokenHub.mockImplementation(async () => {
		return MOCKS.CARBONTOKENLIBRARY.SENSEDIA_CORP_CARBON_TOKEN()
	})

	api.vehicleApi.get.mockImplementation(async (plate) => {
		return MOCKS.API_VEHICLE.GET_API_VEHICLE_SEARCH_SUCCESS_RESPONSE()
	})

	factory.api.proposalTransmission.getPayload.mockImplementation(
		(itemInput) => {
			return MOCKS.FACTORY_API_PROPOSALTRANSMISSION.GETPAYLOAD_SUCCESS_RETURN()
		}
	)

	api.proposalTransmission.post.mockImplementation(
		async (proposalTransmissionPayload, sensediaToken) => {
			return MOCKS.API_PROPOSALTRANSMISSION.POST_API_PROPOSAL_TRANSMISSION_SUCCESS_RETURN()
		}
	)

	paymentDatalayer.savePaymentData.mockImplementation((itemInput) => {
		return {}
	})

	factory.service.sqs.checkInspectionRequestQueueMessage.getMessage.mockImplementation(
		(itemInput, idTransaction) => {
			return MOCKS.FACTORY_SERVICE_SQS_CHECKINSPECTIONREQUESTQUEUEMESSAGE.GETMESSAGE_SUCCESS_RETURN()
		}
	)

	service.sqs.queueService.sendMessage.mockImplementation(
		(message, queueUrl) => {
			return MOCKS.SERVICE_SQS_QUEUE.SENDMESSAGECOMMAND_SUCCESS_RETURN()
		}
	)

	factory.api.updateLead.getPayload.mockImplementation(
		(itemInput, observation) => {
			return MOCKS.FACTORY_API_UPDATELEAD.GETPAYLOAD_SUCCESS_RETURN()
		}
	)

	api.updateLeadApi.put.mockImplementation(async (putPayload) => {
		return MOCKS.API_UPDATELEAD.PUT_API_UPDATE_LEAD_SUCCESS_RETURN()
	})

	factory.response.success.mockImplementation((data) => {
		return MOCKS.FACTORY_RESPONSE.SUCCESS_RETURN()
	})
})

describe('Test suite for the inspectionController.js.', () => {
	describe('When success', () => {
		test('It execute inspection with success and update lead when inspection required', async () => {
			const spyCheckInspectionRequestMessage = jest.spyOn(
				factory.service.sqs.checkInspectionRequestQueueMessage,
				'getMessage'
			)
			const spyApiProposalTransmission = jest.spyOn(
				api.proposalTransmission,
				'post'
			)

			const spyServiceSendMessage = jest.spyOn(
				service.sqs.queueService,
				'sendMessage'
			)

			await expect(
				controller.inspection.process(
					MOCKS.CONTROLLER_INSPECTION.CONTROLLER_VALID_INPUT()
				)
			).resolves.toEqual(
				MOCKS.CONTROLLER_INSPECTION.CONTROLLER_SUCCESS_RESPONSE()
			)

			expect(paymentDatalayer.savePaymentData).toHaveBeenCalled()
			expect(tokenLayer.getSensediaTokenHub).toHaveBeenCalled()
			expect(spyCheckInspectionRequestMessage).toHaveBeenCalled()
			expect(spyServiceSendMessage).toHaveBeenCalledTimes(1)
			expect(spyServiceSendMessage).toHaveBeenLastCalledWith(
				MOCKS.FACTORY_SERVICE_SQS_CHECKINSPECTIONREQUESTQUEUEMESSAGE.GETMESSAGE_SUCCESS_RETURN(),
				CONSTANTS.CHECK_INSPECTION_REQUEST_QUEUE_URL
			)

			expect(spyApiProposalTransmission).toHaveBeenCalledWith(
				MOCKS.FACTORY_API_PROPOSALTRANSMISSION.GETPAYLOAD_SUCCESS_RETURN(),
				MOCKS.CARBONTOKENLIBRARY.SENSEDIA_CORP_CARBON_TOKEN()
			)
		})

		test('It execute inspection with success and update lead when no inspection is required', async () => {
			api.proposalTransmission.post.mockImplementation(
				async (proposalTransmissionPayload, sensediaToken) => {
					return MOCKS.API_PROPOSALTRANSMISSION.POST_API_PROPOSAL_TRANSMISSION_EMPTY_RESPONSE()
				}
			)

			const spyCheckInspectionRequestMessage = jest.spyOn(
				factory.service.sqs.checkInspectionRequestQueueMessage,
				'getMessage'
			)

			const spyApiProposalTransmission = jest.spyOn(
				api.proposalTransmission,
				'post'
			)

			const spyUpdateLead = jest.spyOn(api.updateLeadApi, 'put')

			const spyServiceSendMessage = jest.spyOn(
				service.sqs.queueService,
				'sendMessage'
			)

			await expect(
				controller.inspection.process(
					MOCKS.CONTROLLER_INSPECTION.CONTROLLER_VALID_INPUT()
				)
			).resolves.toEqual(
				MOCKS.CONTROLLER_INSPECTION.CONTROLLER_SUCCESS_RESPONSE()
			)

			expect(paymentDatalayer.savePaymentData).toHaveBeenCalled()
			expect(tokenLayer.getSensediaTokenHub).toHaveBeenCalled()
			expect(spyCheckInspectionRequestMessage).toHaveBeenCalled()
			expect(spyUpdateLead).toHaveBeenCalled()
			expect(spyServiceSendMessage).toHaveBeenCalledTimes(1)
			expect(spyServiceSendMessage).toHaveBeenLastCalledWith(
				MOCKS.FACTORY_SERVICE_SQS_CHECKINSPECTIONREQUESTQUEUEMESSAGE.GETMESSAGE_SUCCESS_RETURN(),
				CONSTANTS.CHECK_INSPECTION_REQUEST_QUEUE_URL
			)

			expect(spyApiProposalTransmission).toHaveBeenCalledWith(
				MOCKS.FACTORY_API_PROPOSALTRANSMISSION.GETPAYLOAD_SUCCESS_RETURN(),
				MOCKS.CARBONTOKENLIBRARY.SENSEDIA_CORP_CARBON_TOKEN()
			)
		})
	})

	describe('When fails', () => {
		test('It execute inspection with success when placa is empty', async () => {
			const spyCheckInspectionRequestMessage = jest.spyOn(
				factory.service.sqs.checkInspectionRequestQueueMessage,
				'getMessage'
			)

			const spyUpdateLead = jest.spyOn(api.updateLeadApi, 'put')

			const spyApiProposalTransmission = jest.spyOn(
				api.proposalTransmission,
				'post'
			)

			const spyServiceSendMessage = jest.spyOn(
				service.sqs.queueService,
				'sendMessage'
			)

			await expect(
				controller.inspection.process(
					MOCKS.CONTROLLER_INSPECTION.CONTROLLER_VALID_INPUT_WITHOUT_PLATE()
				)
			).resolves.toEqual(
				MOCKS.CONTROLLER_INSPECTION.CONTROLLER_SUCCESS_RESPONSE()
			)

			expect(paymentDatalayer.savePaymentData).toHaveBeenCalled()
			expect(tokenLayer.getSensediaTokenHub).toHaveBeenCalled()
			expect(spyCheckInspectionRequestMessage).toHaveBeenCalled()
			expect(spyUpdateLead).toHaveBeenCalled()
			expect(spyServiceSendMessage).toHaveBeenCalledTimes(1)
			expect(spyServiceSendMessage).toHaveBeenLastCalledWith(
				MOCKS.FACTORY_SERVICE_SQS_CHECKINSPECTIONREQUESTQUEUEMESSAGE.GETMESSAGE_SUCCESS_RETURN(),
				CONSTANTS.CHECK_INSPECTION_REQUEST_QUEUE_URL
			)
			expect(spyApiProposalTransmission).toHaveBeenCalledWith(
				MOCKS.FACTORY_API_PROPOSALTRANSMISSION.GETPAYLOAD_SUCCESS_RETURN(),
				MOCKS.CARBONTOKENLIBRARY.SENSEDIA_CORP_CARBON_TOKEN()
			)
		})

		test('It execute inspection with success without card data', async () => {
			const spyCheckInspectionRequestMessage = jest.spyOn(
				factory.service.sqs.checkInspectionRequestQueueMessage,
				'getMessage'
			)

			const spyUpdateLead = jest.spyOn(api.updateLeadApi, 'put')

			const spyApiProposalTransmission = jest.spyOn(
				api.proposalTransmission,
				'post'
			)

			const spyServiceSendMessage = jest.spyOn(
				service.sqs.queueService,
				'sendMessage'
			)

			await expect(
				controller.inspection.process(
					MOCKS.CONTROLLER_INSPECTION.CONTROLLER_VALID_INPUT_WITHOUT_PLATE()
				)
			).resolves.toEqual(
				MOCKS.CONTROLLER_INSPECTION.CONTROLLER_SUCCESS_RESPONSE()
			)

			expect(paymentDatalayer.savePaymentData).toHaveBeenCalled()
			expect(tokenLayer.getSensediaTokenHub).toHaveBeenCalled()
			expect(spyCheckInspectionRequestMessage).toHaveBeenCalled()
			expect(spyUpdateLead).toHaveBeenCalled()
			expect(spyServiceSendMessage).toHaveBeenCalledTimes(1)
			expect(spyServiceSendMessage).toHaveBeenLastCalledWith(
				MOCKS.FACTORY_SERVICE_SQS_CHECKINSPECTIONREQUESTQUEUEMESSAGE.GETMESSAGE_SUCCESS_RETURN(),
				CONSTANTS.CHECK_INSPECTION_REQUEST_QUEUE_URL
			)
			expect(spyApiProposalTransmission).toHaveBeenCalledWith(
				MOCKS.FACTORY_API_PROPOSALTRANSMISSION.GETPAYLOAD_SUCCESS_RETURN(),
				MOCKS.CARBONTOKENLIBRARY.SENSEDIA_CORP_CARBON_TOKEN()
			)
		})

		test('It execute inspection with success without chassi', async () => {
			const spyCheckInspectionRequestMessage = jest.spyOn(
				factory.service.sqs.checkInspectionRequestQueueMessage,
				'getMessage'
			)
			const spyUpdateLead = jest.spyOn(api.updateLeadApi, 'put')

			const spyApiProposalTransmission = jest.spyOn(
				api.proposalTransmission,
				'post'
			)

			const spyVehicleApi = jest.spyOn(api.vehicleApi, 'get')

			const spyServiceSendMessage = jest.spyOn(
				service.sqs.queueService,
				'sendMessage'
			)

			await expect(
				controller.inspection.process(
					MOCKS.CONTROLLER_INSPECTION.CONTROLLER_VALID_INPUT_WITHOUT_CHASSI()
				)
			).resolves.toEqual(
				MOCKS.CONTROLLER_INSPECTION.CONTROLLER_SUCCESS_RESPONSE()
			)

			expect(paymentDatalayer.savePaymentData).toHaveBeenCalled()
			expect(tokenLayer.getSensediaTokenHub).toHaveBeenCalled()
			expect(spyCheckInspectionRequestMessage).toHaveBeenCalled()
			expect(spyUpdateLead).toHaveBeenCalled()
			expect(spyServiceSendMessage).toHaveBeenCalledTimes(1)
			expect(spyServiceSendMessage).toHaveBeenLastCalledWith(
				MOCKS.FACTORY_SERVICE_SQS_CHECKINSPECTIONREQUESTQUEUEMESSAGE.GETMESSAGE_SUCCESS_RETURN(),
				CONSTANTS.CHECK_INSPECTION_REQUEST_QUEUE_URL
			)
			expect(spyApiProposalTransmission).toHaveBeenCalledWith(
				MOCKS.FACTORY_API_PROPOSALTRANSMISSION.GETPAYLOAD_SUCCESS_RETURN(),
				MOCKS.CARBONTOKENLIBRARY.SENSEDIA_CORP_CARBON_TOKEN()
			)
			expect(spyVehicleApi).toHaveBeenCalledWith(
				MOCKS.API_VEHICLE.API_VEHICLE_SEARCH_VALID_INPUT()
			)
		})

		test('It should return validation error schema', async () => {
			const spyCheckInspectionRequestMessage = jest.spyOn(
				factory.service.sqs.checkInspectionRequestQueueMessage,
				'getMessage'
			)
			const spyUpdateLead = jest.spyOn(api.updateLeadApi, 'put')

			const thrownErrorMessage = 'validation'
			const thrownError = new errors.ValidationError(thrownErrorMessage)

			service.validation.inputData.mockImplementationOnce(() => {
				throw thrownError
			})

			const jestApi = jest.spyOn(api.proposalTransmission, 'post')
			const spyServiceSendMessage = jest.spyOn(
				service.sqs.queueService,
				'sendMessage'
			)

			await expect(
				controller.inspection.process(
					MOCKS.CONTROLLER_INSPECTION.CONTROLLER_VALID_INPUT()
				)
			).rejects.toThrow(thrownErrorMessage)

			expect(jestApi).not.toHaveBeenCalled()
			expect(paymentDatalayer.savePaymentData).not.toHaveBeenCalled()
			expect(tokenLayer.getSensediaTokenHub).not.toHaveBeenCalled()
			expect(spyCheckInspectionRequestMessage).not.toHaveBeenCalled()
			expect(spyUpdateLead).not.toHaveBeenCalled()
			expect(spyServiceSendMessage).not.toHaveBeenCalled()
		})

		test('It should return error on call api', async () => {
			const spyCheckInspectionRequestMessage = jest.spyOn(
				factory.service.sqs.checkInspectionRequestQueueMessage,
				'getMessage'
			)
			const spyUpdateLead = jest.spyOn(api.updateLeadApi, 'put')
			const jestApi = jest.spyOn(api.proposalTransmission, 'post')
			const thrownErrorMessage = 'Error call api'
			const thrownError = new Error(thrownErrorMessage)

			api.proposalTransmission.post.mockImplementationOnce(() => {
				throw thrownError
			})
			const spyServiceSendMessage = jest.spyOn(
				service.sqs.queueService,
				'sendMessage'
			)
			await expect(
				controller.inspection.process(
					MOCKS.CONTROLLER_INSPECTION.CONTROLLER_VALID_INPUT()
				)
			).rejects.toThrow(thrownErrorMessage)

			expect(jestApi).toHaveBeenCalledWith(
				MOCKS.FACTORY_API_PROPOSALTRANSMISSION.GETPAYLOAD_SUCCESS_RETURN(),
				MOCKS.CARBONTOKENLIBRARY.SENSEDIA_CORP_CARBON_TOKEN()
			)
			expect(tokenLayer.getSensediaTokenHub).toHaveBeenCalled()
			expect(paymentDatalayer.savePaymentData).not.toHaveBeenCalled()
			expect(spyCheckInspectionRequestMessage).not.toHaveBeenCalled()
			expect(spyUpdateLead).not.toHaveBeenCalled()
			expect(spyServiceSendMessage).not.toHaveBeenCalled()
		})

		test('It should return error on call layer to save database', async () => {
			const spyLayerDatabase = jest.spyOn(paymentDatalayer, 'savePaymentData')
			const thrownErrorMessage = 'Error persistence database'
			const thrownError = new Error(thrownErrorMessage)

			paymentDatalayer.savePaymentData.mockImplementationOnce(() => {
				throw thrownError
			})

			await expect(
				controller.inspection.process(
					MOCKS.CONTROLLER_INSPECTION.CONTROLLER_VALID_INPUT()
				)
			).rejects.toThrow(thrownErrorMessage)

			expect(spyLayerDatabase).toHaveBeenCalledWith(
				MOCKS.CONTROLLER_INSPECTION.CONTROLLER_VALID_INPUT()
			)
		})

		test('It should return error on call to send message to sqs', async () => {
			const spyCheckInspectionRequestMessage = jest.spyOn(
				factory.service.sqs.checkInspectionRequestQueueMessage,
				'getMessage'
			)
			const spyUpdateLead = jest.spyOn(api.updateLeadApi, 'put')

			const thrownErrorMessage = 'Error send message'
			const thrownError = new Error(thrownErrorMessage)

			const spyServiceSendMessage = jest.spyOn(
				service.sqs.queueService,
				'sendMessage'
			)
			service.sqs.queueService.sendMessage.mockImplementation(() => {
				throw thrownError
			})

			await expect(
				controller.inspection.process(
					MOCKS.CONTROLLER_INSPECTION.CONTROLLER_VALID_INPUT()
				)
			).rejects.toThrow(thrownErrorMessage)

			expect(tokenLayer.getSensediaTokenHub).toHaveBeenCalled()
			expect(paymentDatalayer.savePaymentData).toHaveBeenCalled()
			expect(spyCheckInspectionRequestMessage).toHaveBeenCalled()
			expect(spyUpdateLead).not.toHaveBeenCalled()
			expect(spyServiceSendMessage).toHaveBeenCalled()
		})
	})
})
