const api = require('../../../src/api')
const CONSTANT = require('../../../src/property')
const MOCKS = require('../../mocks/index.mock')
const axios = require('axios')

jest.mock('axios')
jest.mock('https')

beforeEach(function () {
	axios.mockImplementation(async (params) => {
		if (params.url.search(CONSTANT.API_PATH) !== -1) {
			return MOCKS.API_SERVICE_APPOINTMENT.POSTSERVICEAPPOINTMENT_AXIOS_SUCCESS_RESPONSE_DATA()
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

describe('Suite de teste de postServiceAppointment.js', () => {
	describe('Dada uma chamada para o metodo postServiceAppointment', () => {
		describe('Quando sucesso', () => {
			test('Deve retornar o valor esperado e não receber nenhuma exceção', async () => {
				await expect(
					api.serviceAppointmentApi.postServiceAppointment(
						MOCKS.API_SERVICE_APPOINTMENT.POSTSERVICEAPPOINTMENT_VALID_PAYLOAD_INPUT(),
						MOCKS.CONTROLLER_REQUEST.API_GATEWAY_TOKEN
					)
				).resolves.toEqual(
					MOCKS.API_SERVICE_APPOINTMENT.POSTSERVICEAPPOINTMENT_VALID_RETURN()
				)
			})
		})

		describe('Quando falha', () => {
			test('Deve receber uma exceção quando receber um response http com status code diferente de 200', async () => {
				axios.mockImplementationOnce(async (params) => {
					const responseError = new Error()

					if (params.url.search(CONSTANT.API_PATH) !== -1) {
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
					api.serviceAppointmentApi.postServiceAppointment(
						MOCKS.API_SERVICE_APPOINTMENT.POSTSERVICEAPPOINTMENT_VALID_PAYLOAD_INPUT(),
						MOCKS.API_GATEWAY_TOKEN
					)
				).rejects.toThrow(
					`Erro recebido da chamada da API: código '500' dados: '{"message":"Testing expected error"}'`
				)
			})

			test('Deve receber uma exceção quando o endpoint da API não der um response', async () => {
				axios.mockImplementationOnce(async (params) => {
					const responseError = new Error()

					if (params.url.search(CONSTANT.API_PATH) !== -1) {
						responseError.request = params
					} else {
						responseError.response = {
							status: 404,
							data: {},
						}
					}

					throw responseError
				})

				await expect(
					api.serviceAppointmentApi.postServiceAppointment(
						MOCKS.API_SERVICE_APPOINTMENT.POSTSERVICEAPPOINTMENT_VALID_PAYLOAD_INPUT(),
						MOCKS.API_GATEWAY_TOKEN
					)
				).rejects.toThrow('API não respondeu à chamada')
			})

			test('Deve receber uma exceção quando ocorrer um erro não esperado pelo tratamento de erros', async () => {
				axios.mockRejectedValueOnce(new Error('Unexpected error'))

				await expect(
					api.serviceAppointmentApi.postServiceAppointment(
						MOCKS.API_SERVICE_APPOINTMENT.POSTSERVICEAPPOINTMENT_VALID_PAYLOAD_INPUT(),
						MOCKS.API_GATEWAY_TOKEN
					)
				).rejects.toThrow(
					'Erro inesperado recebido da chamada da API: Unexpected error'
				)
			})

			test('Deve receber uma exceção quando o endpoint da API devolver um response vazio', async () => {
				axios.mockResolvedValueOnce(null)

				await expect(
					api.serviceAppointmentApi.postServiceAppointment(
						MOCKS.API_SERVICE_APPOINTMENT.POSTSERVICEAPPOINTMENT_VALID_PAYLOAD_INPUT(),
						MOCKS.API_GATEWAY_TOKEN
					)
				).rejects.toThrow(
					'Erro inesperado recebido da chamada da API: Resultado de chamada vazio ou inválido'
				)
			})

			test('Deve receber uma exceção quando o endpoint da API devolver um response inválido', async () => {
				axios.mockResolvedValueOnce({ unexpectedKey: 'unexpected value' })

				await expect(
					api.serviceAppointmentApi.postServiceAppointment(
						MOCKS.API_SERVICE_APPOINTMENT.POSTSERVICEAPPOINTMENT_VALID_PAYLOAD_INPUT(),
						MOCKS.API_GATEWAY_TOKEN
					)
				).rejects.toThrow(
					'Erro inesperado recebido da chamada da API: Resultado de chamada vazio ou inválido'
				)
			})
			test('Deve receber uma exceção quando a resposta da API contém um erro', async () => {
				axios.mockImplementationOnce(async (params) => {
					return {
						data: {
							erro: {
								mensagemErro: 'Mensagem de erro simulada',
							},
						},
					}
				})

				await expect(
					api.serviceAppointmentApi.postServiceAppointment(
						MOCKS.API_SERVICE_APPOINTMENT.POSTSERVICEAPPOINTMENT_VALID_PAYLOAD_INPUT(),
						MOCKS.API_GATEWAY_TOKEN
					)
				).rejects.toThrow('Mensagem de erro simulada')
			})
		})
	})
})
