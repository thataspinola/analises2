const index = require('../index')
const api = require('../src/api')
const MOCKS = require('./mocks/index.mock')
const token = require('@porto-seguro/hub-vendas.carbon-token')

beforeAll(() => {
	token.getSensediaTokenCarbonCloud = jest.fn(() => {
		return 'token'
	})
})

afterEach(() => {
	jest.clearAllMocks()
})

describe('Given a default request', () => {
	test('when validation pass, then return success', async () => {
		api.vidaOnApi.ofertas = jest.fn(() => {
			return MOCKS.RESPONSE_OFERTAS_DATA_SUCCESS()
		})

		const response = await index.handler(MOCKS.INPUT_REQUEST_QUOTATION())

		expect(response).toEqual(
			MOCKS.RESPONSE_HENDLER_SUCCES()
		)
	})

	test('should return default error when error code is unknown', async () => {
		let errorCode = 'XPTO'
		api.vidaOnApi.ofertas = jest.fn(() => {
			return MOCKS.RESPONSE_QUOTATION_ERRO(errorCode)
		})

		const response = await index.handler(MOCKS.INPUT_REQUEST_QUOTATION())

		expect(response).toEqual(MOCKS.RESPONSE_CONTROLLER_ERROR_CUSTON_FALSE(errorCode))
	})
})

describe('Given a request that depends on a broker', () => {
	test('should return broker error when service returns error code OR04', async () => {
		let errorCode = 'OR04'
		api.vidaOnApi.ofertas = jest.fn(() => {
			return MOCKS.RESPONSE_QUOTATION_ERRO(errorCode)
		})

		const response = await index.handler(MOCKS.INPUT_REQUEST_QUOTATION())

		expect(response).toEqual(MOCKS.RESPONSE_HANDLER_ERROR_WAIT_FOR_OUR_CONTACT(errorCode))
	})
})

describe('Given a request has an invalid discount coupon', () => {
	test('should return invalid discount coupon when service returns error code OR06', async () => {
		let errorCode = 'OR06'
		api.vidaOnApi.ofertas = jest.fn(() => {
			return MOCKS.RESPONSE_QUOTATION_ERRO(errorCode)
		})

		const response = await index.handler(MOCKS.INPUT_REQUEST_QUOTATION())

		expect(response).toEqual(MOCKS.RESPONSE_HANDLER_ERROR_INVALID_COUPON(errorCode))
	})
})

describe('Given a request with system unavailable error', () => {
	let errorCode = ['GN01', 'GN02']

	test.each(errorCode)(
		'should return broker error when service returns error code %s',
		async (errorCode) => {
			api.vidaOnApi.ofertas = jest.fn(() => {
				return MOCKS.RESPONSE_QUOTATION_ERRO(errorCode)
			})

			const response = await index.handler(MOCKS.INPUT_REQUEST_QUOTATION())

			expect(response).toEqual(MOCKS.RESPONSE_HANDLER_ERROR(errorCode))
		}
	)
})

describe('Given a request that cannot be completed', () => {
	let errorCode = [
		'OR01',
		'OR02',
		'OR03',
		'OR05',
		'OR07',
		'OR08',
		'OR09',
		'OR10',
		'OR11',
		'OR12',
		'OR13',
		'OR14',
		'OR15',
		'OR16',
		'OR17',
		'OR18',
		'OR19',
		'OR20',
	]

	test.each(errorCode)(
		'should return that cannot be completed when service returns error code %s',
		async (errorCode) => {
			api.vidaOnApi.ofertas = jest.fn(() => {
				return MOCKS.RESPONSE_QUOTATION_ERRO(errorCode)
			})

			const response = await index.handler(MOCKS.INPUT_REQUEST_QUOTATION())

			expect(response).toEqual(MOCKS.RESPONSE_HANDLER_ERROR_RETRY(errorCode))
		}
	)
})