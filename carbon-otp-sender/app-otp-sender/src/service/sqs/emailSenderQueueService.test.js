const { SQSClient, SendMessageCommand } = require('@aws-sdk/client-sqs');
const { sendMessage } = require('../sqs/emailSenderQueueService');
const CONSTANT = require('../../property');

jest.mock('@aws-sdk/client-sqs', () => {
  const mSQSClient = {
    send: jest.fn().mockResolvedValue({ MessageId: '12345' })
  };
  return {
    SQSClient: jest.fn(() => mSQSClient),
    SendMessageCommand: jest.fn()
  };
});

describe('sendMessage', () => {
  let sqsClient;

  beforeEach(() => {
    jest.clearAllMocks();
    sqsClient = new SQSClient();
  });

  it('deve enviar uma mensagem para a fila e retornar o MessageId', async () => {
    const message = { key: 'value' };
    const expectedParams = {
      DelaySeconds: 5,
      MessageAttributes: null,
      MessageBody: JSON.stringify(message),
      QueueUrl: CONSTANT.CARBON_EMAIL_SENDER_QUEUE_URL,
    };

    const messageId = await sendMessage(message);

    expect(SendMessageCommand).toHaveBeenCalledWith(expectedParams);
    expect(sqsClient.send).toHaveBeenCalledWith(expect.any(SendMessageCommand));
    expect(messageId).toBe('12345');
  });

  it('deve retornar o MessageId correto', async () => {
    const message = { key: 'value' };
    const response = await sendMessage(message);

    // Verifica se a função retorna o MessageId correto
    expect(response).toBe('12345');
  });
});