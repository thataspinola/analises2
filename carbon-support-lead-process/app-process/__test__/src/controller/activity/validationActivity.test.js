const service = require('../../../../src/service')
const activity = require('../../../../src/controller/activity')
const CONSTANT = require('./../../../../src/property')
const MOCKS = require('../../../mocks/index')

jest.mock('../../../../src/service')

beforeEach(() => {
    service.validation.validate.mockImplementation((params) => {
        if(!params){
            throw MOCKS.ACTIVITY_VALIDATION.GET_VALIDATION_ERROR()
        }
        return
    })
})

describe('validationActivity test suite', () => {
    test('Should return success', async () => {
       const errorSpy = jest.spyOn(service.validation, "validate")

        await activity.validation.execute(MOCKS.ACTIVITY_VALIDATION.INPUT_DATA_VALID())

        expect(errorSpy).toHaveBeenCalledWith(
            MOCKS.ACTIVITY_VALIDATION.INPUT_DATA_VALID(), 
            CONSTANT.LEAD_SCHEMA
        )
    })

    test('Should return throw error validation', () => {
        expect(() => activity.validation.execute()).toThrow(
            MOCKS.ACTIVITY_VALIDATION.GET_VALIDATION_ERROR()
        )
    })


})