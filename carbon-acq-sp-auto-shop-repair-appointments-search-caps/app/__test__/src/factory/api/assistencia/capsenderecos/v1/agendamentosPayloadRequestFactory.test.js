const factory = require('../../../../../../../src/factory')
const MOCKS = require('../../../../../../mocks/index.mock')

describe('Suite de teste de factory api.agendamentosPayloadRequestFactory.js', () => {
	describe('Dada uma chamada para o metodo getPayload', () => {
		test('Deve retornar um payload com o formato e estrutura esperados', () => {
			expect(
				factory.api.assistencia.capsenderecos.v1.agendamentoPayloadRequest.getPayload(
					MOCKS.FACTORY_API_ASSISTENCIA_CAPSENDERECOS_V1_AGENDAMENTOSPAYLOADREQUEST.GETPAYLOAD_PARSEDJSON_VALID_INPUT()
				)
			).toEqual(
				MOCKS.FACTORY_API_ASSISTENCIA_CAPSENDERECOS_V1_AGENDAMENTOSPAYLOADREQUEST.GETPAYLOAD_VALID_RETURN()
			)
		})
	})
})
