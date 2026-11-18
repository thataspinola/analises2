const factory = require('../../../../../src/factory')
const MOCKS = require('../../../../mocks/index.mock')

describe('Suite de teste de factory sns/serviceOrderRequestedFactory.js', () => {
	describe('Dada uma chamada para o metodo getPayload', () => {
		test('Deve retornar um valor de retorno com o formato esperado quando parsedSqsMessage e postCreateServiceOrderResponse forem objetos válidos com as propriedades esperadas', () => {
			const expected = MOCKS.FACTORY_SNS_SERVICEORDERREQUESTED.VALID_RETURN()
			delete expected.integrationData.googleAppointmentConversion

			expect(
				factory.service.sns.serviceOrderRequested.getPayload(
					MOCKS.FACTORY_SNS_SERVICEORDERREQUESTED.VALID_PARSEDSQSMESSAGE_INPUT(),
					MOCKS.FACTORY_SNS_SERVICEORDERREQUESTED.VALID_POSTCREATESERVICEORDERRESPONSE_INPUT()
				)
			).toEqual(expected)
		})

		test('Deve retornar um valor de retorno com o formato esperado e processar itens do combo quando parsedSqsMessage contém combo', () => {
			const expected =
				MOCKS.FACTORY_SNS_SERVICEORDERREQUESTED.VALID_RETURN_WITH_COMBO()
			delete expected.integrationData.googleAppointmentConversion

			expect(
				factory.service.sns.serviceOrderRequested.getPayload(
					MOCKS.FACTORY_SNS_SERVICEORDERREQUESTED.VALID_PARSEDSQSMESSAGE_WITH_COMBO_INPUT(),
					MOCKS.FACTORY_SNS_SERVICEORDERREQUESTED.VALID_POSTCREATESERVICEORDERRESPONSE_INPUT()
				)
			).toEqual(expected)
		})
	})

	describe('Dada uma chamada para o metodo getSendMessageAttributes', () => {
		test('Deve retornar os atributos de mensagem esperados para um serviceOrderNumber válido', () => {
			const serviceOrderNumber =
				MOCKS.FACTORY_SNS_SERVICEORDERREQUESTED
					.GETSENDMESSAGEATTRIBUTES_VALID_INPUT
			expect(
				factory.service.sns.serviceOrderRequested.getSendMessageAttributes(
					serviceOrderNumber
				)
			).toEqual(
				MOCKS.FACTORY_SNS_SERVICEORDERREQUESTED.GETSENDMESSAGEATTRIBUTES_VALID_RETURN()
			)
		})

		test('Deve retornar eventId vazio quando serviceOrderNumber for nulo ou vazio', () => {
			expect(
				factory.service.sns.serviceOrderRequested.getSendMessageAttributes(null)
			).toEqual(
				MOCKS.FACTORY_SNS_SERVICEORDERREQUESTED.GETSENDMESSAGEATTRIBUTES_EMPTY_INPUT_RETURN()
			)

			expect(
				factory.service.sns.serviceOrderRequested.getSendMessageAttributes(
					undefined
				)
			).toEqual(
				MOCKS.FACTORY_SNS_SERVICEORDERREQUESTED.GETSENDMESSAGEATTRIBUTES_EMPTY_INPUT_RETURN()
			)

			expect(
				factory.service.sns.serviceOrderRequested.getSendMessageAttributes('')
			).toEqual(
				MOCKS.FACTORY_SNS_SERVICEORDERREQUESTED.GETSENDMESSAGEATTRIBUTES_EMPTY_INPUT_RETURN()
			)
		})
	})
})
