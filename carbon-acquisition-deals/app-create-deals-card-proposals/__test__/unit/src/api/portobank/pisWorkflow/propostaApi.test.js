const axios = require('axios')
const api = require('../../../../../../src/api')
const CONSTANTS = require('../../../../../../src/property')
const MOCKS = require('../../../../mocks/index.mock')

jest.mock('axios')

describe('Suite tests for propostaApi.js', () => {
	test('It should return expected value and do not get an exception', async () => {
		axios.mockResolvedValueOnce({
			data: MOCKS.API_PROPOSTA_MOCKS.SUCCESS_RETURN_BODY_VALUE(),
		})

		const result =
			await api.portobank.pisWorkflow.propostaApi.getCardProposalsInProgressByDocument(
				MOCKS.API_PROPOSTA_MOCKS.VALID_DOCUMENT(),
				MOCKS.API_PROPOSTA_MOCKS.VALID_SENSEDIA_TOKEN_HUB_CLOUD()
			)

		expect(result).toEqual(MOCKS.API_PROPOSTA_MOCKS.SUCCESS_RETURN_BODY_VALUE())
		expect(axios).toHaveBeenCalledWith({
			method: 'GET',
			url: `${CONSTANTS.SENSEDIA_CLOUD_URL}/${
				CONSTANTS.PROPOSTA_PATH
			}/documento/${MOCKS.API_PROPOSTA_MOCKS.VALID_DOCUMENT()}?periodo=15&situacao=Pendências`,
			headers: {
				Authorization: `Bearer ${MOCKS.API_PROPOSTA_MOCKS.VALID_SENSEDIA_TOKEN_HUB_CLOUD()}`,
				partner: CONSTANTS.PARTNER_HEADER_VALUE,
				accept: 'application/json',
				'Content-Type': 'application/json',
			},
		})
	})

	test('It should get an exception when receive an http response', async () => {
		axios.mockImplementationOnce(async (params) => {
			const responseError = new Error()

			if (
				params.url.search(MOCKS.API_PROPOSTA_MOCKS.URL_PATH_PROPOSTA()) !== -1
			) {
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
			api.portobank.pisWorkflow.propostaApi.getCardProposalsInProgressByDocument(
				MOCKS.API_PROPOSTA_MOCKS.VALID_DOCUMENT(),
				MOCKS.API_PROPOSTA_MOCKS.VALID_SENSEDIA_TOKEN_HUB_CLOUD()
			)
		).rejects.toThrow(`{"message":"Testing expected error"}`)
	})

	test('It should get an exception when receive an unexpected error', async () => {
		axios.mockRejectedValueOnce(new Error('Unexpected error'))

		await expect(
			api.portobank.pisWorkflow.propostaApi.getCardProposalsInProgressByDocument(
				MOCKS.API_PROPOSTA_MOCKS.VALID_DOCUMENT(),
				MOCKS.API_PROPOSTA_MOCKS.VALID_SENSEDIA_TOKEN_HUB_CLOUD()
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

		const result =
			await api.portobank.pisWorkflow.propostaApi.getCardProposalsInProgressByDocument(
				MOCKS.API_PROPOSTA_MOCKS.VALID_DOCUMENT(),
				MOCKS.API_PROPOSTA_MOCKS.VALID_SENSEDIA_TOKEN_HUB_CLOUD()
			)
		expect(result).toBeNull()
	})
})
