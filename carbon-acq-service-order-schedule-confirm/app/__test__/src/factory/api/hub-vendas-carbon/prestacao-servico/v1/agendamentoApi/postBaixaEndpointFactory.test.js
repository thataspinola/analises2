const factory = require('../../../../../../../../src/factory')
const MOCKS = require('../../../../../../../mocks/index.mock')

describe('getDataReport', () => {
	test('should return coupon, document number, and order number when all values are valid', () => {
		const input =
			MOCKS.FACTORY_API_PROCESSEDDATAREPORT.GETDATAREPORT_PARSEDSNSMESSAGEPAYLOAD_VALID_INPUT()
		const expectedOutput = {
			reservationKey: '02092024193000161456',
			serviceOrderNumber: '1087471',
			serviceOrderYear: '24',
		}
		expect(
			factory.api.hubVendasCarbon.prestacaoServico.v1.agendamentoApi.postBaixaEndpointFactory.getPayload(input)
		).toEqual(expectedOutput)
	})
})
