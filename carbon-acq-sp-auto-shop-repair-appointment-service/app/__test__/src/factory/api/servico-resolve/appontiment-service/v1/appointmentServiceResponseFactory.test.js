const factory = require('../../../../../../../src/factory')
const MOCKS = require('../../../../../../mocks/index.mock')

describe('Suite de teste de factory api appointmentServicePayloadResponseFactory.js', () => {
	describe('Dada uma chamada para o metodo getPayload', () => {
		test('Deve retornar um payload com o formato e estrutura esperados', () => {
			expect(
				factory.api.servicoResolve.orcamentoCore.v1.AgendamentoApiPayloadResponse.getPayload(
					MOCKS.API_SERVICO_RESOLVE_APPOINTMENT_SERVICE_V1.VALID_RETURN()
				)
			).toEqual(
				MOCKS.FACTORY_API_SERVICO_RESOLVE_APPOINTMENT_SERVICE_V1_APPOINTMENTSERVICERESPONSE.GETPAYLOAD_VALID_RETURN()
			)
		})
	})
})
