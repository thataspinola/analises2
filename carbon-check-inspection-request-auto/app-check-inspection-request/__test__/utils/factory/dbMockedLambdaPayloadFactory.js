const nodeCrypto = require('node:crypto')

exports.getPayload = (dbRecordsBody) => {
	const dbRecords = []
	for (const dbRecordBody of dbRecordsBody) {
		const currentDateTime = new Date()
		const dbRecord = {
			eventID: `${nodeCrypto.randomUUID()}`,
			eventName: "REMOVE",
			eventVersion: "1.1",
			body: dbRecordBody,
			dynamodb: {
                ApproximateCreationDateTime: 1740139901,
                Keys: {
                    HPK: {
                        S: `quotationNumber#${dbRecordBody.quotationNumber}#idTransaction#${dbRecordBody.idTransaction}`
                    },
                    RSK: {
                        S: dbRecordBody.inspectionRequestDate
                    }
                },
                OldImage: {
                    createdAt: {
                        N: Math.floor(new Date(dbRecordBody.inspectionRequestDate).getTime() / 1000)
                    },
                    inspectionRequestDate: {
                        S: dbRecordBody.inspectionRequestDate
                    },
                    quotationNumber: {
                        S: dbRecordBody.quotationNumber
                    },
                    HPK: {
                        S: `quotationNumber#${dbRecordBody.quotationNumber}#idTransaction#${dbRecordBody.idTransaction}`
                    },
                    contactEmail: {
                        S: dbRecordBody.contactEmail
                    },
                    RSK: {
                        S: dbRecordBody.inspectionRequestDate
                    },
                    expireAt: {
                        N: Math.floor((currentDateTime.getTime() + 5 * 60 * 1000) / 1000)
                    },
                    idTransaction: {
                        S: dbRecordBody.idTransaction
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

		dbRecords.push(dbRecord)
	}

	return {
		Records: dbRecords,
	}
}
