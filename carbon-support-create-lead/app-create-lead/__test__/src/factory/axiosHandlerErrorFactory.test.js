const axiosHandlerError = require('../../../src/factory/axiosHandlerErrorFactory')
const { getDefaultCode } = require('../../../src/factory/errorCodeFactory')

jest.mock('../../../src/factory/errorCodeFactory')

afterEach(() => {
	jest.clearAllMocks()
	jest.restoreAllMocks()
})

beforeEach(() => {
	getDefaultCode.mockReturnValue('1000000')
})

describe('Suite de testes de axiosHandlerErrorFactory.js', () => {
	test('Deve lidar com erros com um objeto de resposta', () => {
		const error = {
			response: {
				status: 404,
				data: 'Not Found',
			},
		}
		const result = axiosHandlerError(error)
		expect(result).toEqual({
			status: 404,
			message: 'Not Found',
			errorCode: '1000000',
		})
	})

	test('Deve lidar com os dados de resposta do erro se for um objeto', () => {
		const error = {
			response: {
				status: 400,
				data: { message: 'Bad Request' },
			},
		}
		const result = axiosHandlerError(error)
		expect(result).toEqual({
			status: 400,
			message: JSON.stringify({ message: 'Bad Request' }),
			errorCode: '1000000',
		})
	})

	test('Deve lidar com erros sem response, mas com um request', () => {
		const error = {
			request: {},
			code: 'ECONNABORTED',
			message: 'timeout of 0ms exceeded',
		}
		const result = axiosHandlerError(error)
		expect(result).toEqual({
			status: 500,
			message: 'ECONNABORTED - timeout of 0ms exceeded',
			errorCode: '1000000',
		})
	})

	test('Deve lidar com erros sem response ou request', () => {
		const error = {
			message: 'An unknown error occurred',
		}
		const result = axiosHandlerError(error)
		expect(result).toEqual({
			status: 500,
			message: 'An unknown error occurred',
			errorCode: '1000000',
		})
	})
})
