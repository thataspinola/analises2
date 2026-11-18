// Mock do módulo 'property'
const CONSTANT = {
	SERVICE_SQS_EMAIL_SENDER_QUEUE_MESSAGE_SENDER: 'no-reply@example.com',
	SERVICE_SQS_EMAIL_SENDER_QUEUE_MESSAGE_SUBJECT: 'Your OTP Code: ',
};

// Mockear o módulo 'property'
jest.mock('../../property', () => CONSTANT);

const { getMessage } = require('../sqs/emailSenderQueueMessageFactory');

describe('getMessage', () => {
	it('deve criar uma mensagem corretamente', () => {
		const destinationEmail = 'user@example.com';
		const clientName = 'John Doe';
		const otpCode = '123456';

		const expectedMessage = {
			from: CONSTANT.SERVICE_SQS_EMAIL_SENDER_QUEUE_MESSAGE_SENDER,
			to: [destinationEmail],
			cc: [],
			bcc: [],
			subject: `${CONSTANT.SERVICE_SQS_EMAIL_SENDER_QUEUE_MESSAGE_SUBJECT}${otpCode}`,
			emailType: 'HTML',
			template: 'template/email-otp-message.edge',
			metadata: {
				NOME_USUARIO: clientName,
				CODIGO_OTP: otpCode,
			},
		};

		const message = getMessage(destinationEmail, clientName, otpCode);

		expect(message).toEqual(expectedMessage);
	});
});