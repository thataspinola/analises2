const MOCKS = require('../../../mocks/index.mock')
const controllerActivity = require('../../../../src/controller/activity')
const service = require('../../../../src/service')
const carbonToken = require('@porto-seguro/hub-vendas.carbon-token')

jest.mock('@porto-seguro/hub-vendas.carbon-token')
jest.mock('../../../../src/service')
jest.mock('pino', () => {
	const info = jest.fn()
	const error = jest.fn()
	const warn = jest.fn()
	const debug = jest.fn()
	const silent = jest.fn()
	const child = jest.fn(() => ({ info, error, warn, debug, silent, child }))

	return () => ({
		info,
		error,
		warn,
		debug,
		silent,
		child,
	})
})

afterEach(() => {
	jest.clearAllMocks()
	jest.restoreAllMocks()
	jest.resetModules()
})

beforeEach(() => {
	carbonToken.getPortoCertificates.mockImplementation(async () => {
		return MOCKS.CORP_CA_CERTIFICATES()
	})
})
describe('Suite de teste de getApiGatewayCertificatesActivity.js', () => {
	describe('Quando sucesso', () => {
		test('It should pass without errors and return success', async () => {
			await expect(
				controllerActivity.getCertificate.execute()
			).resolves.toEqual(
				MOCKS.CORP_CA_CERTIFICATES()
			)
		})
	})
	describe('Quando falha', () => {
		test('It should throw error after logging message related with activity', async () => {
			const spyServiceLoggerError = jest.spyOn(service.logger, 'error')
			const thrownErrorMessage =
				'Unexpected getApiGatewayCertificatesActivity factory error'
			const thrownError = new Error(thrownErrorMessage)
			carbonToken.getPortoCertificates.mockImplementationOnce(async () => {
				throw thrownError
			})
			await expect(
				controllerActivity.getCertificate.execute()
			).rejects.toThrow(thrownError)
			expect(spyServiceLoggerError).toHaveBeenCalledWith(
				MOCKS.ERROR_CONTROLLERACTIVITY_GETAPIGATEWAYCERTIFICATES_OBJECT(
					thrownError
				),
				MOCKS.ERROR_CONTROLLERACTIVITY_GETAPIGATEWAYCERTIFICATES_MESSAGE(
					thrownErrorMessage
				)
			)
		})
	})
})
