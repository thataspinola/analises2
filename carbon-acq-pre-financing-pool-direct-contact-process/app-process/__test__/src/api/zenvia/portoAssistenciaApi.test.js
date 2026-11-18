const api = require('../../../../src/api')
const CONSTANT = require('../../../../src/property')
const MOCKS = require('../../../mocks/index.mock')
const axios = require('axios')

jest.mock('axios')

beforeEach(function () {
	axios.mockImplementation(async (params) => {
		if (
			params.url.search(
				CONSTANT.ZENVIA_PORTOASSISTENCIA_WHATSAPPBOT_PORTOSEGURO_SENDER_API_PATH
			) !== -1
		) {
			return {
				status: 200,
				data: MOCKS.API_ZENVIA_PORTOASSISTENCIA_POSTWHATSAPPPORTOBOTTRIGGER_SUCCESS_RESPONSE_DATA(),
			}
		}
		const responseError = new Error()
		responseError.response = {
			status: 404,
			data: {},
		}

		throw responseError
	})
})

afterEach(function () {
	jest.clearAllMocks()
})

describe('Given a postWhatsappPortoBotTrigger call', () => {
	test('It should return expected value and do not get an exception', (done) => {
		expect(async () => {
			const postWhatsappPortoBotTriggerReturn =
				await api.zenvia.portoAssistencia.postWhatsappPortoBotTrigger(
					MOCKS.API_ZENVIA_PORTOASSISTENCIA_POSTWHATSAPPPORTOBOTTRIGGER_VALID_PAYLOAD()
				)
			try {
				expect(postWhatsappPortoBotTriggerReturn).toEqual(
					MOCKS.API_ZENVIA_PORTOASSISTENCIA_POSTWHATSAPPPORTOBOTTRIGGER_VALID_RETURN()
				)
				done()
			} catch (testError) {
				done(testError)
			}
		}).not.toThrow()
	})
	test('It should get an exception when receive an http response with status code different then 200', async () => {
		axios.mockImplementationOnce(async (params) => {
			const responseError = new Error()

			if (
				params.url.search(
					CONSTANT.ZENVIA_PORTOASSISTENCIA_WHATSAPPBOT_PORTOSEGURO_SENDER_API_PATH
				) !== -1
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

		await expect(async () => {
			await api.zenvia.portoAssistencia.postWhatsappPortoBotTrigger(
				MOCKS.API_ZENVIA_PORTOASSISTENCIA_POSTWHATSAPPPORTOBOTTRIGGER_VALID_PAYLOAD()
			)
		}).rejects.toThrow(
			'API error: code \'500\' data: \'{"message":"Testing expected error"}'
		)
	})
	test('It should get an exception when receive an unexpected error', async () => {
		axios.mockRejectedValueOnce(new Error('Unexpected error'))

		await expect(async () => {
			await api.zenvia.portoAssistencia.postWhatsappPortoBotTrigger(
				MOCKS.API_ZENVIA_PORTOASSISTENCIA_POSTWHATSAPPPORTOBOTTRIGGER_VALID_PAYLOAD()
			)
		}).rejects.toThrow('API unexpected error: Unexpected error')
	})
	test('It should get an exception when receive an empty response', async () => {
		axios.mockResolvedValueOnce(null)

		await expect(async () => {
			await api.zenvia.portoAssistencia.postWhatsappPortoBotTrigger(
				MOCKS.API_ZENVIA_PORTOASSISTENCIA_POSTWHATSAPPPORTOBOTTRIGGER_VALID_PAYLOAD()
			)
		}).rejects.toThrow('API unexpected error: Empty or invalid response')
	})
	test('It should get an exception when receive an invalid response', async () => {
		axios.mockResolvedValueOnce({ unexpectedKey: 'unexpected value' })

		await expect(async () => {
			await api.zenvia.portoAssistencia.postWhatsappPortoBotTrigger(
				MOCKS.API_ZENVIA_PORTOASSISTENCIA_POSTWHATSAPPPORTOBOTTRIGGER_VALID_PAYLOAD()
			)
		}).rejects.toThrow('API unexpected error: Empty or invalid response')
	})
	test('It should get an exception when the API does not give a response', async () => {
		
		axios.mockImplementationOnce(async () => {
			const requestError = new Error('Request made but no response received')
			requestError.request = {} 
			throw requestError
		})
	
		await expect(async () => {
			await api.zenvia.portoAssistencia.postWhatsappPortoBotTrigger(
				MOCKS.API_ZENVIA_PORTOASSISTENCIA_POSTWHATSAPPPORTOBOTTRIGGER_VALID_PAYLOAD()
			)
		}).rejects.toThrow('API did not give response')
	})
})

//TODO: Cobrir com testes unitários os caminhos não felizes
