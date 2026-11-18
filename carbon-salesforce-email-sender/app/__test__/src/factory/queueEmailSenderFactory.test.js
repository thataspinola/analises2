const MOCKS = require('../../mocks/queueEmailSenderFactory.mock')
const CONSTANTS = require('../../../src/property')
const factory = require('../../../src/factory')

jest.mock('../../../src/property', () => MOCKS.PROPERTIES)

describe('Suite de testes de queueEmailSenderFactory.js', () => {
	afterEach(() => {
		jest.clearAllMocks()
	})

	test('Deve criar uma mensagem com a estrutura e dados corretos para um caso de sucesso', () => {
		const message = factory.queueEmailSender.createMessage(
			MOCKS.VALID_INPUT_DATA,
			MOCKS.ADDITIONAL_DATA
		)

		expect(message).toEqual(MOCKS.EXPECTED_EMAIL_MESSAGE_SUCCESS)
	})

	test('Deve criar uma mensagem com a estrutura e dados corretos para um caso de sucesso e com dados não preenchido', () => {
		const message = factory.queueEmailSender.createMessage(
			MOCKS.VALID_INPUT_DATA,
			{
				...MOCKS.ADDITIONAL_DATA,
				brokerName: 'Não preenchido',
				brokerPhone: 'Não preenchido',
				brokerEmail: 'Não preenchido',
			}
		)

		expect(message).toEqual(
			MOCKS.EXPECTED_EMAIL_MESSAGE_SUCCESS_WITHOUT_BROKER_DATA
		)
	})

	test('Deve criar uma mensagem com a estrutura e dados corretos para um caso de sucesso esem dados de corretor', () => {
		const message = factory.queueEmailSender.createMessage(
			MOCKS.VALID_INPUT_DATA,
			{
				...MOCKS.ADDITIONAL_DATA,
				brokerName: null,
				brokerPhone: null,
				brokerEmail: null,
			}
		)

		expect(message).toEqual(
			MOCKS.EXPECTED_EMAIL_MESSAGE_SUCCESS_WITHOUT_BROKER_DATA
		)
	})

	test('Deve criar uma mensagem com a estrutura e dados corretos para um caso de sucesso sem vistoria', () => {
		const message = factory.queueEmailSender.createMessage(
			MOCKS.VALID_INPUT_DATA_PENDING,
			MOCKS.ADDITIONAL_DATA_WITHOUT_INSPECTION
		)

		expect(message).toEqual(
			MOCKS.EXPECTED_EMAIL_MESSAGE_SUCCESS_WITHOUT_INSPECTION
		)
	})

	test('Deve criar uma mensagem com a estrutura e dados corretos para um caso de erro', () => {
		jest.replaceProperty(CONSTANTS, 'NODE_ENV', 'production')

		const message = factory.queueEmailSender.createMessage(
			{
				...MOCKS.VALID_INPUT_DATA,
				status: 'ERROR',
			},
			MOCKS.ADDITIONAL_DATA
		)

		expect(message).toEqual(MOCKS.EXPECTED_EMAIL_MESSAGE_ERROR)
	})
})
