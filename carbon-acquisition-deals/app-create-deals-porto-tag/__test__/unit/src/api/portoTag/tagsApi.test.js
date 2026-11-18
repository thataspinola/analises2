const axios = require('axios')
const api = require('../../../../../src/api')
const CONSTANTS = require('../../../../../src/property')
const MOCKS = require('../../../mocks/index.mock')

jest.mock('axios')

describe('Suite tests for propostaApi.js', () => {
	test('It should return expected value and do not get an exception', async () => {
		axios.mockResolvedValueOnce({
			data: MOCKS.API_TAGS_MOCKS.SUCCESS_RETURN_BODY_VALUE(),
		})

		const result = await api.portoTag.tagsApi.getTagsByDocument(
			MOCKS.API_TAGS_MOCKS.VALID_DOCUMENT(),
			MOCKS.API_TAGS_MOCKS.VALID_PORTOSEG_TOKEN_HUB()
		)

		expect(result).toEqual(MOCKS.API_TAGS_MOCKS.SUCCESS_RETURN_BODY_VALUE())
		expect(axios).toHaveBeenCalledWith({
			method: 'GET',
			url: `${CONSTANTS.PORTOSEG_URL}/${
				CONSTANTS.TAGS_PATH
			}?document=${MOCKS.API_TAGS_MOCKS.VALID_DOCUMENT()}`,
			headers: {
				Authorization: `Bearer ${MOCKS.API_TAGS_MOCKS.VALID_PORTOSEG_TOKEN_HUB()}`,
				partner: CONSTANTS.PARTNER_HEADER_VALUE,
				accept: 'application/json',
				'Content-Type': 'application/json',
			},
		})
	})

	test('It should get an exception when receive an http response', async () => {
		axios.mockImplementationOnce(async (params) => {
			const responseError = new Error()

			if (params.url.search(MOCKS.API_TAGS_MOCKS.URL_PATH_PROPOSTA()) !== -1) {
				responseError.response = {
					status: 500,
					data: { message: 'Testing expected error' },
				}
			} else {
				responseError.response = {
					status: 404,
					data: {},
				}
			}

			throw responseError
		})

		await expect(
			api.portoTag.tagsApi.getTagsByDocument(
				MOCKS.API_TAGS_MOCKS.VALID_DOCUMENT(),
				MOCKS.API_TAGS_MOCKS.VALID_PORTOSEG_TOKEN_HUB()
			)
		).rejects.toThrow(`{"message":"Testing expected error"}`)
	})

	test('It should get an exception when receive an unexpected error', async () => {
		axios.mockRejectedValueOnce(new Error('Unexpected error'))

		await expect(
			api.portoTag.tagsApi.getTagsByDocument(
				MOCKS.API_TAGS_MOCKS.VALID_DOCUMENT(),
				MOCKS.API_TAGS_MOCKS.VALID_PORTOSEG_TOKEN_HUB()
			)
		).rejects.toThrow('Unexpected error')
	})

	test('It should get a null response when API did not found response', async () => {
		axios.mockImplementationOnce(async (params) => {
			const responseError = new Error('API did not found response')

			responseError.response = {
				status: 404,
				data: {},
			}

			throw responseError
		})

		const result = await api.portoTag.tagsApi.getTagsByDocument(
			MOCKS.API_TAGS_MOCKS.VALID_DOCUMENT(),
			MOCKS.API_TAGS_MOCKS.VALID_PORTOSEG_TOKEN_HUB()
		)
		expect(result).toBeNull()
	})
})
