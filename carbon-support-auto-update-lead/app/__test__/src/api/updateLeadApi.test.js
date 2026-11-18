const { updateLeadApi } = require('../../../src/api')
const MOCKS = require('../../mocks/src/api/updateLeadApi.mock')
const axios = require('axios')

jest.mock('axios')

afterEach(function () {
	jest.clearAllMocks()
})

describe('Validate tests for updateLeadApi.js', () => {
	test('It should return success when call api', (done) => {
		axios.mockImplementation(async (params) => {
			return MOCKS.API_UPDATE_LEAD_RESPONSE_BODY()
		})

		expect(async () => {
			const response = await updateLeadApi.putUpdateLead(
				MOCKS.API_UPDATE_LEAD_PAYLOAD_REQUEST()
			)
			expect(response).toEqual(MOCKS.API_UPDATE_LEAD_RESPONSE_BODY())
			done()
		}).not.toThrow()
	})

	test('It should get an exception when receive an http response with status code different then 200', async () => {
		axios.mockImplementationOnce(async (params) => {
			const responseError = new Error()
			responseError.response = {
				status: 500,
				data: { message: 'Testing expected error' },
			}
			throw responseError
		})

		expect(async () => {
			await updateLeadApi.putUpdateLead(MOCKS.API_UPDATE_LEAD_PAYLOAD_REQUEST())
		}).rejects.toThrow(
			'API error: code \'500\' data: \'{"message":"Testing expected error"}'
		)
	})

	test('It should return error 404', () => {
		axios.mockImplementation(async (params) => {
			const responseError = new Error()
			responseError.response = {
				status: 404,
				data: {},
			}

			throw responseError
		})
		expect(async () => {
			await updateLeadApi.putUpdateLead(MOCKS.API_UPDATE_LEAD_PAYLOAD_REQUEST())
		}).rejects.toThrow("API error: code '404' data: '{}'")
	})

	test('It should get an exception when get error from api with not response', async () => {
		axios.mockImplementation(async (params) => {
			const responseError = new Error()
			responseError.request = params

			throw responseError
		})
		await expect(async () => {
			await updateLeadApi.putUpdateLead(MOCKS.API_UPDATE_LEAD_PAYLOAD_REQUEST())
		}).rejects.toThrow('API did not give response')
	})

	test('It should get an exception when receive an unexpected error', async () => {
		axios.mockRejectedValueOnce(new Error('Unexpected error'))

		await expect(
			async () => {
                await updateLeadApi.putUpdateLead(MOCKS.API_UPDATE_LEAD_PAYLOAD_REQUEST()) 
            }).rejects.toThrow('API unexpected error: Unexpected error')
	})
})
