const { goodCardApi } = require('../../../src/api')
const MOCKS = require('../../mocks/src/api/goodCardApi.mock')
const axios = require('axios')

jest.mock('axios')

afterEach(() => {
	jest.clearAllMocks()
})

describe('Suite de tests for goodCardApi.js', () => {
	test('It should return success on call api for goodCard', async () => {
		axios.mockResolvedValueOnce({
			data: MOCKS.VALID_RESPONSE_SUCCESS(),
		})

		const response = await goodCardApi.getGoodCard(
			MOCKS.VALID_PAYLOAD(),
			MOCKS.SENSIDIA_TOKEN()
		)

		expect(response).toEqual(MOCKS.VALID_RESPONSE_SUCCESS())
	})

	test('It should return error on call api for goodCard', async () => {
		axios.mockImplementationOnce(async (params) => {
			const responseError = new Error()
			responseError.response = {
				status: 500,
				data: { message: 'Testing expected error' },
			}
			throw responseError
		})

		expect(async () => {
			await goodCardApi.getGoodCard(
				MOCKS.VALID_PAYLOAD(),
				MOCKS.SENSIDIA_TOKEN()
			)
		}).rejects.toThrow('{"message":"Testing expected error"}')
	})

	test('It should return error on call api for goodCard', async () => {
		axios.mockImplementationOnce(async (params) => {
			const responseError = new Error()
			responseError.request = { message: 'erro na requisicao' }
			throw responseError
		})

		expect(async () => {
			await goodCardApi.getGoodCard(
				MOCKS.VALID_PAYLOAD(),
				MOCKS.SENSIDIA_TOKEN()
			)
		}).rejects.toThrow('API did not give response')
	})

	test('It should return error on call api for goodCard', async () => {
		axios.mockImplementationOnce(async (params) => {
			const responseError = new Error()
			responseError = { message: 'erro na requisicao' }
			throw responseError
		})

		expect(async () => {
			await goodCardApi.getGoodCard(
				MOCKS.VALID_PAYLOAD(),
				MOCKS.SENSIDIA_TOKEN()
			)
		}).rejects.toThrow('API unexpected error: Assignment to constant variable.')
	})
})
