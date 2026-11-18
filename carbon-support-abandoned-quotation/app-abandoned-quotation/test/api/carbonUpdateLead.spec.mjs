import { describe, it, expect, beforeEach, vi } from 'vitest'
import { createApplication } from '../helpers/application.mjs'
let axios, axiosHandlerError, logger, carbonUpdateLeadApi, CONSTANTS

describe('Suite de testes de carbonUpdateLeadApi.js', () => {
	const payload = { test: 'data' }

	beforeEach(() => {
		axios = vi.fn()
		axiosHandlerError = vi.fn()
		logger = { error: vi.fn() }
		const load = createApplication({
			axios,
			'./src/factory/index.js': { axiosHandlerError },
			'./src/service/index.js': { logger },
		})
		carbonUpdateLeadApi = load('src/api/index.js').carbonUpdateLeadApi
		CONSTANTS = load('src/property/index.js')
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
