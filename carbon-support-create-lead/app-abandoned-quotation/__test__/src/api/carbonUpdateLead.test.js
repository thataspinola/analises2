const { carbonUpdateLeadApi } = require('../../../src/api')
const { axiosHandlerError } = require('../../../src/factory')
const CONSTANTS = require('../../../src/property')
const { logger } = require('../../../src/service')
const axios = require('axios')

jest.mock('../../../src/factory')
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
jest.mock('axios')

describe('Suite de testes de carbonUpdateLeadApi.js', () => {
	const payload = { test: 'data' }

	beforeEach(() => {
		jest.clearAllMocks()
	})

	it('Deve enviar com sucesso os dados e retornar a resposta', async () => {
		const responseData = { success: true }
		axios.mockResolvedValue({ data: responseData })

		const result = await carbonUpdateLeadApi.updateLead(payload)

		expect(result).toEqual(responseData)
		expect(axios).toHaveBeenCalledWith({
			method: 'PUT',
			url: `${CONSTANTS.UPDATE_LEAD}`,
			headers: {
				accept: 'application/json',
				'Content-Type': 'application/json',
				partner: CONSTANTS.PARTNER_HEADER_VALUE,
			},
			data: payload,
		})
	})

	it('Deve lidar com o erro do Axios corretamente', async () => {
		const error = new Error('Test error')
		axios.mockRejectedValue(error)
		axiosHandlerError.mockReturnValue({ message: 'Axios error', status: 500 })

		await expect(carbonUpdateLeadApi.updateLead(payload)).rejects.toThrow(
			'Axios error'
		)

		expect(axiosHandlerError).toHaveBeenCalledWith(error)
		expect(logger.error).toHaveBeenCalledWith({
			updateLeadPayload: payload,
			message: 'Axios error',
			statusCode: 500,
		})
	})
})
