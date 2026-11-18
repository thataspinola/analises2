const api = require('../../../../src/api')
const activity = require('../../../../src/controller/activity')
const MOCKS = require('../../../mocks/src/controller/activity/consentsActivity.mock')
const errors = require('../../../../src/error')

jest.mock('./../../../../src/api')

beforeEach(() => {
    api.privacidade.consentimentos.v1.customer.get.mockImplementation(async () => MOCKS.RESPONSE_CONSENTS_API())
})

describe('consentsActivity test suite', () => {
    test('Should get commerce token with success', async () => {
        const result = await activity.consentsAPI.execute(MOCKS.INPUT_SUBMIT_CONSENTS())

        expect(result).toEqual(MOCKS.RESPONSE_CONSENTS_API())
    })

    test('Should throw an error when calls consentsActivity with fail', async () => {
        const errorMessage = 'api error'
        const error = new errors.ExternalApiError.NotFoundError(errorMessage)

        api.privacidade.consentimentos.v1.customer.get.mockImplementation(async () => {
            throw error
        })

        expect(async () => {
			await activity.consentsAPI.execute(MOCKS.INPUT_SUBMIT_CONSENTS())
		}).rejects.toThrow(error)
    })
})
