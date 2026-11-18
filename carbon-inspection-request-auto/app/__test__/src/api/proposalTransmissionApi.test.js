const MOCKS = require('../../mocks/index.mock')
const CONSTANTS = require('../../../src/property')
const axios = require('axios')
const api = require('../../../src/api')

jest.mock('axios')
jest.mock('../../../src/service')
jest.mock('pino', () => {
	const info = jest.fn()
	const error = jest.fn()
	const warn = jest.fn()
	const debug = jest.fn()
	const silent = jest.fn() // 'silent' log level is also a method in newer versions
	const child = jest.fn(() => ({ info, error, warn, debug, silent, child })) // child returns a logger instance

	return () => ({
		info,
		error,
		warn,
		debug,
		silent,
		child,
	})
})

afterEach(() => {
	jest.clearAllMocks()
	jest.restoreAllMocks()
	jest.resetModules()
})

beforeEach(() => {
	axios.mockImplementation(async (params) => {
		const url = CONSTANTS.AUTO_PROPOSAL_TRANSMISSION_PATH(
			MOCKS.FACTORY_API_PROPOSALTRANSMISSION.GETPAYLOAD_SUCCESS_RETURN()
				.numeroCotacao,
			MOCKS.FACTORY_API_PROPOSALTRANSMISSION.GETPAYLOAD_SUCCESS_RETURN()
				.orcamento.codigo
		)
		if (params.url.search(url) !== -1) {
			return MOCKS.API_PROPOSALTRANSMISSION.POST_API_PROPOSAL_TRANSMISSION_SUCCESS_RETURN()
		}
		const responseError = new Error()
		responseError.response = {
			status: 404,
			data: {},
		}

		throw responseError
	})
})

describe('Test suite for the proposalTransmissionApi.js.', () => {
	describe('When success', () => {
		test('It should return expected value and do not get an exception', async () => {
			await expect(
				api.proposalTransmission.post(
					MOCKS.API_PROPOSALTRANSMISSION.API_PROPOSAL_TRANSMISSION_VALID_PAYLOAD(),
					MOCKS.CARBONTOKENLIBRARY.SENSEDIA_CORP_CARBON_TOKEN()
				)
			).resolves.toEqual(
				MOCKS.API_PROPOSALTRANSMISSION.POST_API_PROPOSAL_TRANSMISSION_SUCCESS_RETURN()
			)
		})

		test('It should return the expected value and not throw an exception when it receives a known 400 status.', async () => {
			axios.mockImplementation(async (params) => {
				const responseError = new Error()
				responseError.response =
					MOCKS.API_PROPOSALTRANSMISSION.POST_API_PROPOSAL_TRANSMISSION_INPROCESS_RETURN()

				throw responseError
			})
			await expect(
				api.proposalTransmission.post(
					MOCKS.API_PROPOSALTRANSMISSION.API_PROPOSAL_TRANSMISSION_VALID_PAYLOAD(),
					MOCKS.CARBONTOKENLIBRARY.SENSEDIA_CORP_CARBON_TOKEN()
				)
			).resolves.toEqual(
				MOCKS.API_PROPOSALTRANSMISSION.POST_API_PROPOSAL_TRANSMISSION_INPROCESS_RETURN()
			)
		})
	})

	describe('When fails', () => {
		test('It should get an exception when receive an http response with status code different then 200', async () => {
			axios.mockImplementationOnce(async (params) => {
				const responseError = new Error()
				responseError.response = {
					status: 500,
					data: { message: 'Testing expected error' },
				}
				throw responseError
			})

			await expect(
				api.proposalTransmission.post(
					MOCKS.API_PROPOSALTRANSMISSION.API_PROPOSAL_TRANSMISSION_VALID_PAYLOAD(),
					MOCKS.CARBONTOKENLIBRARY.SENSEDIA_CORP_CARBON_TOKEN()
				)
			).rejects.toThrow(
				'API error: code \'500\' data: \'{"message":"Testing expected error"}'
			)
		})

		test('It should get an exception when get error from api with not response', async () => {
			axios.mockImplementation(async (params) => {
				const responseError = new Error()
				responseError.request = params

				throw responseError
			})
			await expect(
				api.proposalTransmission.post(
					MOCKS.API_PROPOSALTRANSMISSION.API_PROPOSAL_TRANSMISSION_VALID_PAYLOAD(),
					MOCKS.CARBONTOKENLIBRARY.SENSEDIA_CORP_CARBON_TOKEN()
				)
			).rejects.toThrow('API did not give response')
		})

		test('It should get an exception when receive an unexpected error', async () => {
			axios.mockRejectedValueOnce(new Error('Unexpected error'))

			await expect(
				api.proposalTransmission.post(
					MOCKS.API_PROPOSALTRANSMISSION.API_PROPOSAL_TRANSMISSION_VALID_PAYLOAD(),
					MOCKS.CARBONTOKENLIBRARY.SENSEDIA_CORP_CARBON_TOKEN()
				)
			).rejects.toThrow('API unexpected error: Unexpected error')
		})
	})
})
