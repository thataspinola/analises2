const factory = require('../../../src/factory')
const MOCKS = require('../../mocks/index.mock')

const api = require('../../../src/api')

afterEach(() => {
	jest.clearAllMocks()
})

beforeEach(() => {
	jest
		.useFakeTimers('modern')
		.setSystemTime(
			new Date(
				MOCKS.VALID_DYNAMICS_CREATE_LEAD_PAYLOAD_LGPD_DATA_ACEITE()
			).getTime()
		)

	api.carbonRegisterCompleteApi.getPesCod = jest.fn(() => {
		return MOCKS.RESPONSE_REGISTER_COMPLETE()
	})
})

describe('Suite de testes de createLead.js', () => {
	describe('makeCreateLeadPayload', () => {
		test('Deve retornar o payload corretamente', () => {
			const response = factory.createLead.makeCreateLeadPayload(
				MOCKS.VALID_INPUT_DATA()
			)

			expect(typeof response).toBe('object')
			expect(response).toEqual(MOCKS.CREATE_LEAD_PAYLOAD_RESPONSE())
		})

		test('Deve retornar o payload corretamente quando o telefone possuir uma  mascara aplicada', () => {
			const response = factory.createLead.makeCreateLeadPayload({
				...MOCKS.VALID_INPUT_DATA(),
				client: {
					...MOCKS.VALID_INPUT_DATA().client,
					cellPhone: '11 22222-5555',
				},
			})

			expect(typeof response).toBe('object')
			expect(response).toEqual(MOCKS.CREATE_LEAD_PAYLOAD_RESPONSE())
		})

		test('Deve retornar o payload corretamente quando o CEP possuir uma  mascara aplicada', () => {
			const response = factory.createLead.makeCreateLeadPayload({
				...MOCKS.VALID_INPUT_DATA(),
				address: {
					...MOCKS.VALID_INPUT_DATA().address,
					zipCode: '13013-161',
				},
			})

			expect(typeof response).toBe('object')
			expect(response).toEqual(MOCKS.CREATE_LEAD_PAYLOAD_RESPONSE())
		})

		test('Deve retornar o payload sem dados de endereço', () => {
			const response = factory.createLead.makeCreateLeadPayload({
				...MOCKS.VALID_INPUT_DATA(),
				address: undefined,
			})

			expect(typeof response).toBe('object')
			expect(response).toEqual(
				MOCKS.CREATE_LEAD_FACTORY_RESPONSE_WITHOUT_ADDRESS()
			)
		})

		test('Deve retornar o payload sem telefone quando o telefone possuir quantidade de caracateres invalidos', () => {
			const response = factory.createLead.makeCreateLeadPayload({
				...MOCKS.VALID_INPUT_DATA(),
				client: {
					...MOCKS.VALID_INPUT_DATA().client,
					cellPhone: '11 ',
				},
			})

			expect(typeof response).toBe('object')
			expect(response).toEqual({
				...MOCKS.CREATE_LEAD_PAYLOAD_RESPONSE(),
				tel_celular: undefined,
			})
		})

		test('Deve retornar o payload sem CEP quando possuir quantidade de caracteres invalido', () => {
			const response = factory.createLead.makeCreateLeadPayload({
				...MOCKS.VALID_INPUT_DATA(),
				address: {
					...MOCKS.VALID_INPUT_DATA().address,
					zipCode: 'A ',
				},
			})

			expect(typeof response).toBe('object')
			expect(response).toEqual({
				...MOCKS.CREATE_LEAD_PAYLOAD_RESPONSE(),
				cep: undefined,
			})
		})

		test('Deve retornar o payload corretamente quando possuir campos utmXxxx', () => {
			const response = factory.createLead.makeCreateLeadPayload(
				MOCKS.VALID_INPUT_DATA_WITH_LEGACYUTMS()
			)

			expect(typeof response).toBe('object')
			expect(response).toEqual(MOCKS.LEAD_PAYLOAD_WITH_LEGACYUTMS())
		})

		test('Deve retornar o payload corretamente quando possuir campos utm-xxxx', () => {
			const response = factory.createLead.makeCreateLeadPayload(
				MOCKS.VALID_INPUT_DATA_WITH_UTMS()
			)

			expect(typeof response).toBe('object')
			expect(response).toEqual(MOCKS.LEAD_PAYLOAD_WITH_UTMS())
		})
		test('Deve retornar o payload corretamente quando possuir campos residentialPhone', () => {
			const response = factory.createLead.makeCreateLeadPayload(
				MOCKS.VALID_INPUT_DATA_WITH_TELRESIDENCIAL()
			)

			expect(typeof response).toBe('object')
			expect(response).toEqual(MOCKS.LEAD_PAYLOAD_WITH_TELRESIDENCIAL())
		})
		test('Deve retornar o payload corretamente quando não possuir campo socialName', () => {
			const response = factory.createLead.makeCreateLeadPayload(
				MOCKS.VALID_INPUT_DATA_WITHOUT_SOCIALNAME()
			)

			expect(typeof response).toBe('object')
			expect(response).toHaveProperty('nome_social', '')
		})
		test('Deve retornar o payload corretamente quando não possuir campo reference', () => {
			const response = factory.createLead.makeCreateLeadPayload(
				MOCKS.VALID_INPUT_DATA_WITHOUT_REFERENCE()
			)

			expect(typeof response).toBe('object')
			expect(response).toHaveProperty('referencia', 'hub')
		})
		test('Deve retornar o payload corretamente quando possuir todos os campos de emprestimos e financiamentos', () => {
			const response = factory.createLead.makeCreateLeadPayload(
				MOCKS.VALID_INPUT_DATA_WITH_ALL_FINANCING_LOANS_ATTRIBUTES()
			)

			expect(typeof response).toBe('object')
			expect(response).toEqual(
				MOCKS.CREATE_LEAD_PAYLOAD_RESPONSE_WITH_ALL_FINANCING_LOANS_ATTRIBUTES()
			)
		})
		test('Deve retornar o payload corretamente quando possuir o campo financingLoansRequestedLoanAmountValue de emprestimos e financiamentos', () => {
			const response = factory.createLead.makeCreateLeadPayload(
				MOCKS.VALID_INPUT_DATA_WITH_FINANCING_LOANS_REQUESTED_LOAN_AMOUNT_VALUE()
			)

			expect(typeof response).toBe('object')
			expect(response).toEqual(
				MOCKS.CREATE_LEAD_PAYLOAD_RESPONSE_WITH_TOTAL_CREDITO_FINANCING_LOANS_ATTRIBUTE()
			)
		})
		test('Deve retornar o payload corretamente quando possuir o campo financingLoansInstallmentValue de emprestimos e financiamentos', () => {
			const response = factory.createLead.makeCreateLeadPayload(
				MOCKS.VALID_INPUT_DATA_WITH_FINANCING_LOANS_INSTALLMENT_VALUE()
			)

			expect(typeof response).toBe('object')
			expect(response).toEqual(
				MOCKS.CREATE_LEAD_PAYLOAD_RESPONSE_WITH_VALOR_PARCELA_FINANCING_LOANS_ATTRIBUTE()
			)
		})
		test('Deve retornar o payload corretamente quando possuir o campo financingLoansProposalNumber de emprestimos e financiamentos', () => {
			const response = factory.createLead.makeCreateLeadPayload(
				MOCKS.VALID_INPUT_DATA_WITH_FINANCING_LOANS_PROPOSAL_NUMBER()
			)

			expect(typeof response).toBe('object')
			expect(response).toEqual(
				MOCKS.CREATE_LEAD_PAYLOAD_RESPONSE_WITH_NUMERO_PROPOSTA_FINANCING_LOANS_ATTRIBUTE()
			)
		})
	})

	describe('makeregisterCompletePayload', () => {
		test('Deve retornar o payload corretamente', () => {
			const response = factory.createLead.makeregisterCompletePayload(
				MOCKS.VALID_INPUT_DATA()
			)

			expect(typeof response).toBe('object')
			expect(response).toEqual(MOCKS.REGISTER_COMPLETE_PAYLOAD_RESPONSE())
		})

		test('Deve retornar o payload corretamente quando o telefone possuir uma  mascara aplicada', () => {
			const response = factory.createLead.makeregisterCompletePayload({
				...MOCKS.VALID_INPUT_DATA(),
				client: {
					...MOCKS.VALID_INPUT_DATA().client,
					cellPhone: '11 22222-5555',
				},
			})

			expect(typeof response).toBe('object')
			expect(response).toEqual(MOCKS.REGISTER_COMPLETE_PAYLOAD_RESPONSE())
		})

		test('Deve retornar o payload corretamente quando o CEP possuir uma  mascara aplicada', () => {
			const response = factory.createLead.makeregisterCompletePayload({
				...MOCKS.VALID_INPUT_DATA(),
				address: {
					...MOCKS.VALID_INPUT_DATA().address,
					zipCode: '13013-161',
				},
			})

			expect(typeof response).toBe('object')
			expect(response).toEqual(MOCKS.REGISTER_COMPLETE_PAYLOAD_RESPONSE())
		})

		test('Deve retornar o payload sem dados de endereço', () => {
			const response = factory.createLead.makeregisterCompletePayload({
				...MOCKS.VALID_INPUT_DATA(),
				address: undefined,
			})

			expect(typeof response).toBe('object')
			expect(response).toEqual(
				MOCKS.REGISTER_COMPLETE_PAYLOAD_RESPONSE_WITHOUT_ADDRESS()
			)
		})

		test('Deve retornar o payload sem nome social', () => {
			const response = factory.createLead.makeregisterCompletePayload(
				MOCKS.VALID_INPUT_DATA_WITHOUT_SOCIAL_NAME()
			)

			expect(typeof response).toBe('object')
			expect(response).toEqual(
				MOCKS.REGISTER_COMPLETE_PAYLOAD_RESPONSE_WITHOUT_SOCIAL_NAME()
			)
		})
	})
})
