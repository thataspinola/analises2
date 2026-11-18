const activity = require("../../../../src/controller/activity/index")
const service = require("../../../../src/service")
const CONSTANT = require("../../../../src/property")
const MOCKS = require("../../../mocks/index.mock")

jest.mock("../../../../src/service/index")

describe("Given an execute call", () => {
    beforeEach(() => {
        jest.clearAllMocks()
        service.sqs.message.sendMessage.mockImplementation(
            (params) => {
                if (params.client.cpf === null) {
                    throw new Error(CONSTANT.MESSAGES.LEAD_CONTROLLER.CURRENT_ACTIVITY)
                }
                if (params.client.name === null) {
                    return MOCKS.ACTIVITY_SEND_SQS.NULL_RETURN()
                }
                return MOCKS.ACTIVITY_SEND_SQS.SUCCESS_RETURN()
            }
        )
    })

    test("It should call the sendMessage method with the correct parameters", async () => {
        const result = await activity.sendSqs.execute(MOCKS.VALID_INPUT_DATA())
        expect(service.sqs.message.sendMessage).toHaveBeenCalledWith(MOCKS.VALID_INPUT_DATA(), CONSTANT.LEAD_QUEUE_URL)
        expect(result).toBe(MOCKS.ACTIVITY_SEND_SQS.MESSAGE_ID())
    })

    test("It should log an error and throw if an error occurs", async () => {
        const errorMessage = CONSTANT.MESSAGES.LEAD_CONTROLLER.CURRENT_ACTIVITY
        await expect(activity.sendSqs.execute(MOCKS.INVALID_INPUT_DATA_NULL_CPF())).rejects.toThrow(errorMessage)
        expect(service.logger.error).toHaveBeenCalledWith(MOCKS.ACTIVITY_SEND_SQS.LOGGER_ERROR_MESSAGE(errorMessage))
    })

    test("It should return null if the message ID is null", async () => {
        const result = await activity.sendSqs.execute(MOCKS.INVALID_INPUT_DATA_NULL_NAME())
        expect(result).toBe(null)
    })
})