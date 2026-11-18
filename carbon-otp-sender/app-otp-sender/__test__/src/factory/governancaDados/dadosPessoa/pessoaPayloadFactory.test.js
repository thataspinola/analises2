const factory = require('../../../../../src/factory')
const MOCKS = require('../../../../mocks/index.mock')

describe('Given a pessoa.getPayload call', () => {
	test('It should return a valid payload object that will be used to call pessoa endpoint from governancaDados/dadosPessoa API', async () => {
		const getPayloadReturnValue =
			factory.governancaDados.dadosPessoa.pessoa.getPayload(
				MOCKS.FACTORY_GOVERNANCADADOS_DADOS_PESSOA_PESSOA_GETPAYLOAD_VALID_CLIENTDATA_INPUT()
			)
		expect(getPayloadReturnValue).toEqual(
			MOCKS.FACTORY_GOVERNANCADADOS_DADOS_PESSOA_PESSOA_GETPAYLOAD_VALID_RETURN()
		)
	})
})
