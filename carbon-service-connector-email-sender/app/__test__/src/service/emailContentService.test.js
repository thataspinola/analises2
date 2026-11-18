const MOCKS = require('../../mocks/index.mock')
const { emailContent, logger } = require('../../../src/service')
const S3 = require('@aws-sdk/client-s3')

jest.mock('@aws-sdk/client-s3', () => {
	return {
		GetObjectCommand: jest.fn(),
		S3Client: jest.fn(() => {
			return {
				send: jest.fn(() => {
					{
						return {
							Body: {
								transformToString: jest.fn(() => {
									return MOCKS.TEMPLATE
								}),
							},
						}
					}
				}),
			}
		}),
	}
})

beforeAll(() => {
	logger.error = jest.fn()
	logger.info = jest.fn()
})

afterEach(() => {
	jest.clearAllMocks()
})

describe('Given emailContentService call', () => {
	test('should get email content with sucess', async () => {
		let result = await emailContent.getEmailHtmlBody(
			MOCKS.PAYLOAD_VALID.template,
			MOCKS.PAYLOAD_VALID.metadata
		)

		expect(result).toBe(
			MOCKS.RENDERED_TEMPLATE(MOCKS.PAYLOAD_VALID.metadata.CUSTOMER_NAME)
		)
	})
})
