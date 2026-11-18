const { handler } = require('../')

const mockedLocalData = {
	Records: [
            {
                eventID: "1eab16915f2dd87b9c1ba5fd794ceb6a",
                eventName: "REMOVE",
                eventVersion: "1.1",
                eventSource: "aws:dynamodb",
                awsRegion: "ca-central-1",
                dynamodb: {
                    ApproximateCreationDateTime: 1729810787,
                    Keys: {
                        "vdoCode": {
                            "S": "1729808266991"
                        }
                    },
                    OldImage: {
                        createdAt: {
                            "N": "1729808308"
                        },
                        idBranch: {
                            "S": "27"
                        },
                        expireAt: {
                            "N": "1729810108"
                        },
                        vdoCode: {
                            "S": "1729808266991"
                        }
                    },
                    SequenceNumber: "5658100000539522669867741",
                    SizeBytes: 92,
                    StreamViewType: "NEW_AND_OLD_IMAGES"
                },
                userIdentity: {
                    principalId: "dynamodb.amazonaws.com",
                    type: "Service"
                },
                eventSourceARN: "arn:aws:dynamodb:ca-central-1:791702935403:table/carbon-lead-in-progress/stream/2024-10-23T17:58:07.288"
            }
        ]
}

handler(mockedLocalData)
	.then((res) => {
		console.log(JSON.stringify(res, null, 2))
	})
	.catch((err) => {
		console.log(err)
	})
