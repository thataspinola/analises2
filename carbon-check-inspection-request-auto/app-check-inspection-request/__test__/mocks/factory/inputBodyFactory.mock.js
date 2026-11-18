const nodeCrypto = require('node:crypto')

const VALID_BODY = {
    contactEmail: 'teste@teste.com.br',
    idTransaction: '00123456',
    inspectionRequestDate: '2023-11-21T01:30:00.000-05:00',
    quotationNumber: '30000572475',
}

const SQS_RECORD_VALUE = {
    body: JSON.stringify({
        orderNumber: '3000617082',
        externalId: '00001',
        productCode: 'f626558b-a24b-4861-b0f8-50fc184f18fc',
        scope: 'auto',
        amount: 100,
        contactEmail: 'teste@teste.com.br',
        installments: 1,
        idTransaction: '00123456',
        inspectionStatusProcessCount: 0,
        inspectionRequestDate: '2023-11-21T01:30:00.000-05:00',
        quotationNumber: '30000572475',
    })
}

exports.INPUT_RECORD_BODY_FROM_SQS = () => SQS_RECORD_VALUE

exports.BODY_FROM_SQS = () => JSON.parse(SQS_RECORD_VALUE.body)

const DB_RECORD_VALUE = {
    eventID: `${nodeCrypto.randomUUID()}`,
    eventName: "REMOVE",
    eventVersion: "1.1",
    dynamodb: {
        ApproximateCreationDateTime: 1740139901,
        Keys: {
            HPK: {
                S: `quotationNumber#${VALID_BODY.quotationNumber}#idTransaction#${VALID_BODY.idTransaction}`
            },
            RSK: {
                S: VALID_BODY.inspectionRequestDate
            }
        },
        OldImage: {
            createdAt: {
                N: Math.floor(new Date(VALID_BODY.inspectionRequestDate).getTime() / 1000)
            },
            inspectionRequestDate: {
                S: VALID_BODY.inspectionRequestDate
            },
            quotationNumber: {
                S: VALID_BODY.quotationNumber
            },
            HPK: {
                S: `quotationNumber#${VALID_BODY.quotationNumber}#idTransaction#${VALID_BODY.idTransaction}`
            },
            contactEmail: {
                S: VALID_BODY.contactEmail
            },
            RSK: {
                S: VALID_BODY.inspectionRequestDate
            },
            expireAt: {
                N: Math.floor((new Date().getTime() + 5 * 60 * 1000) / 1000)
            },
            idTransaction: {
                S: VALID_BODY.idTransaction
            }
        },
        SequenceNumber: "18471800000000023183690635",
        SizeBytes: 339,
        StreamViewType: "NEW_AND_OLD_IMAGES"
    },
    userIdentity: {
        principalId: "dynamodb.amazonaws.com",
        type: "Service"
    },
    eventSource: 'aws:dynamodb',
    eventSourceARN:
        'arn:aws:dynamodb:ca-central-1:791702935403:table/inspection-request-auto-gather-schedule/stream',
    awsRegion: 'ca-central-1',
}

exports.INPUT_RECORD_BODY_FROM_DB = () => DB_RECORD_VALUE

exports.BODY_FROM_DB = () => {
    return {
        ...VALID_BODY,
        attemptAfterPaymentError: false,
        receivedFromDb: true
    }
}

exports.INVALID_INPUT = () => {
    return { eventName: "TESTE INVALIDO" }
}