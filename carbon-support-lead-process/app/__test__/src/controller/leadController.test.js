const controller = require('../../../src/controller/index')
const service = require('../../../src/service')
const activity = require('../../../src/controller/activity')
const factory = require('../../../src/factory')
const error = require('../../../src/error')
const CONSTANTS = require('../../../src/property')
const MOCKS = require('../../mocks/index.mock')

jest.mock('../../../src/service/index')
jest.mock('../../../src/factory/index')
jest.mock('../../../src/controller/activity/index')

describe('Lead Controller', () => {
    beforeEach(() => {
        jest.clearAllMocks()
        activity.sendSqs.execute.mockImplementation(() => {
            return MOCKS.LEAD_CONTROLLER.MESSAGE_ID()
        })
        activity.validation.execute.mockImplementation((params) => {
            if (params.client.cpf === null) {
                throw new error.ValidationError(MOCKS.LEAD_CONTROLLER.VALIDATION_ERROR_MESSAGE())
            }
            if (params.client.name == null) {
                throw new Error(MOCKS.LEAD_CONTROLLER.VALIDATION_ERROR_MESSAGE())
            }
        })
        factory.response.success.mockImplementation(() => {
            return MOCKS.LEAD_CONTROLLER.MESSAGE_ID()
        })
        factory.response.badRequestError.mockImplementation(() => {
            return MOCKS.LEAD_CONTROLLER.VALIDATION_ERROR_MESSAGE()
        })
        factory.response.error.mockImplementation(() => {
            return MOCKS.LEAD_CONTROLLER.VALIDATION_ERROR_MESSAGE()
        })
    })
    test('process should log input data and call validation and sendSqs and return success response', async () => {
        await controller.leadController.process(MOCKS.VALID_INPUT_DATA())

        expect(service.logger.info).toHaveBeenCalledWith(
            { request: JSON.stringify(MOCKS.VALID_INPUT_DATA()) },
            CONSTANTS.MESSAGES.LEAD_CONTROLLER.INPUT_DATA
        )
        expect(activity.validation.execute).toHaveBeenCalledWith(MOCKS.VALID_INPUT_DATA())
        expect(activity.sendSqs.execute).toHaveBeenCalledWith(MOCKS.VALID_INPUT_DATA())
        expect(service.logger.info).toHaveBeenCalledWith(MOCKS.LEAD_CONTROLLER.LOGGER_INFO_MESSAGE())
        expect(factory.response.success).toHaveBeenCalledWith(MOCKS.LEAD_CONTROLLER.MESSAGE_ID())
    })
    test('process should log warning and return bad request error when validation fails', async () => {
        const result = await controller.leadController.process(MOCKS.INVALID_INPUT_DATA_NULL_CPF())
        expect(service.logger.warn).toHaveBeenCalledWith(
            {
                rawError: new error.ValidationError(MOCKS.LEAD_CONTROLLER.VALIDATION_ERROR_MESSAGE()),
                carbonErrorData: {
                    layer: CONSTANTS.MESSAGES.LAYER.LEAD_CONTROLLER,
                    currentActivity: MOCKS.LEAD_CONTROLLER.CURRENT_ACTIVITY_ERROR(),
                    errorMessage: MOCKS.LEAD_CONTROLLER.VALIDATION_ERROR_MESSAGE()
                }
            },
            MOCKS.LEAD_CONTROLLER.CURRENT_ACTIVITY_ERROR()
        )
        expect(factory.response.badRequestError).toHaveBeenCalledWith(MOCKS.LEAD_CONTROLLER.VALIDATION_ERROR_MESSAGE())
        expect(result).toEqual(MOCKS.LEAD_CONTROLLER.VALIDATION_ERROR_MESSAGE())
    })
    test('process should log error and return error response when an unexpected error occurs', async () => {
        const result = await controller.leadController.process(MOCKS.INVALID_INPUT_DATA_NULL_NAME())
        expect(service.logger.error).toHaveBeenCalledWith(
            {
                rawError: new Error(MOCKS.LEAD_CONTROLLER.VALIDATION_ERROR_MESSAGE()),
                carbonErrorData: {
                    layer: CONSTANTS.MESSAGES.LAYER.LEAD_CONTROLLER,
                    currentActivity: MOCKS.LEAD_CONTROLLER.CURRENT_ACTIVITY_ERROR(),
                    errorMessage: MOCKS.LEAD_CONTROLLER.VALIDATION_ERROR_MESSAGE()
                }
            },
            MOCKS.LEAD_CONTROLLER.CURRENT_ACTIVITY_ERROR()
        )
        expect(factory.response.error).toHaveBeenCalledWith(MOCKS.LEAD_CONTROLLER.VALIDATION_ERROR_MESSAGE())
        expect(result).toEqual(MOCKS.LEAD_CONTROLLER.VALIDATION_ERROR_MESSAGE())
    })
})
