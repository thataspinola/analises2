import { describe, test, expect, beforeEach, vi } from 'vitest'
import { createApplication } from '../helpers/application.mjs'
import fixture from '../fixtures/input.cjs'
const { VALID_INPUT_DATA, FACTORY_SUCCESS_RESPONSE, API_SUCCESS_RESPONSE } = fixture
let abandonedQuotationController, updateLeadFactory, api
beforeEach(() => {
  updateLeadFactory = { makeUpdateLeadPayload: vi.fn() }
  api = { carbonUpdateLeadApi: { updateLead: vi.fn() } }
  const load = createApplication({
    './src/factory/index.js': { updateLeadFactory },
    './src/api/index.js': api,
    './src/service/index.js': { logger: { info: vi.fn(), error: vi.fn() } },
  })
  abandonedQuotationController = load('src/controller/index.js').abandonedQuotationController
})
describe('Suite de testes de abandonedQuotationController.js', () => {
	test('Deve retornar um objeto de resposta de sucesso no padrão esperado', async () => {
		updateLeadFactory.makeUpdateLeadPayload.mockReturnValueOnce(FACTORY_SUCCESS_RESPONSE)

		api.carbonUpdateLeadApi.updateLead = vi
			.fn()
			.mockResolvedValueOnce(API_SUCCESS_RESPONSE)

		const response =
			await abandonedQuotationController.process(VALID_INPUT_DATA)

		expect(response[0]).toHaveProperty('statusCode')
		expect(response[0]).toHaveProperty('statusMessage')
	})
})
