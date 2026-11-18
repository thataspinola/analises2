const activity = require("../../../../src/controller/activity/index")
const service = require("../../../../src/service/index")
const error = require("../../../../src/error")
const MOCKS = require("../../../mocks/index.mock")
const CONSTANT = require('../../../../src/property/index')

jest.mock('../../../../src/service/index')

describe("Given an execute call", () => {
    beforeEach(() => {
        jest.clearAllMocks()
        service.validation.validate.mockImplementation((params) => {
            if (!params.client.name) {
                throw new error.ValidationError(MOCKS.ACTIVITY_VALIDATION.INVALID_INPUT_MESSAGE())
            }
        })
    })
    test("It should call the inputData method with the correct parameters", async () => {
        const inputData = MOCKS.VALID_INPUT_DATA()
        activity.validation.execute(inputData)

        expect(service.validation.validate).toHaveBeenCalledWith(
            inputData,
            CONSTANT.LEAD_SCHEMA
        )
        expect(service.logger.warn).not.toHaveBeenCalled()
    })
    test("It should throw an error if inputData is invalid", async () => {
        expect(() => {
            activity.validation.execute(MOCKS.INVALID_INPUT_DATA_NULL_NAME())
        }).toThrow(error.ValidationError)
        expect(service.logger.warn).toHaveBeenCalledWith(
            MOCKS.ACTIVITY_VALIDATION.LOGGER_ERROR_MESSAGE(MOCKS.ACTIVITY_VALIDATION.INVALID_INPUT_MESSAGE())
        )
    })
})