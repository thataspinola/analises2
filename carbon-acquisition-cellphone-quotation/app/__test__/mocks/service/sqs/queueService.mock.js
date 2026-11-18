exports.QUEUE_URL = 'https://sqs.us-east-1.amazonaws.com/123/queue-test'

exports.MESSAGE_BODY = { id: 1, active: true }

exports.SQS_SERVICE_PARAMS = {
    DelaySeconds: 5,
    MessageAttributes: null,
    MessageBody: JSON.stringify(this.MESSAGE_BODY),
    QueueUrl: this.QUEUE_URL,
}

exports.MESSAGE_ID = 'abc-123'

exports.SQS_SERVICE_RESPONSE = {
    MessageId: this.MESSAGE_ID,
}