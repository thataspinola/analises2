const controller = require('../../../src/controller')
const factory = require('../../../src/factory')
const service = require('../../../src/service')
const mock = require('../../mocks/index.mock')
const error = require('../../../src/error')
const tokenLayer = require('@porto-seguro/hub-vendas.carbon-token')

jest.mock('../../../src/factory/parseLifeProposalFactory.js')
jest.mock('../../../src/api/vida/vida-on/proposal')
jest.mock('@porto-seguro/hub-vendas.carbon-token')

jest.mock('../../../src/service', () => ({
  logger: {
    info: jest.fn(),
    error: jest.fn(),
    warn: jest.fn(),
    debug: jest.fn(),
  },
  validationService: {
	inputData: jest.fn()
  }
}))

afterEach(() => {
	jest.clearAllMocks()
})
describe('Suite de Testes proposalController.js', () => {
	test('Deve retornar erro ao validar input', async () => {
		const messageError = 'Error'
		const exception = new error.ValidationError(messageError)

		service.validationService.inputData.mockImplementation(() => {})

		service.validationService.inputData = jest.fn(() => {
			throw exception
		})

		const response = await controller.proposalController.process(
			mock.VALIDATION_SERVICE_VALID_INPUT_DATA(), 
			'123312', 
			'trace-id'
		)
		
		expect(response).toEqual(mock.CONTROLLER_PROPOSAL_OPENING_BAD_REQUEST(messageError))
	})

	test('Deve retornar erro ao buscat token', async () => {
		const messageError = 'Token layer error'
		const exception = new Error(messageError)

		service.validationService.inputData.mockImplementation(() => {})

		tokenLayer.getSensediaTokenCarbonCloud = jest.fn(() => {
			throw exception
		})

		const response = await controller.proposalController.process(
			mock.VALIDATION_SERVICE_VALID_INPUT_DATA(), 
			'123312', 
			'trace-id'
		)
		
		expect(response).toEqual(mock.CONTROLLER_PROPOSAL_OPENING_ERROR(messageError))
	})

	test('Deve retornar sucessoao chamar o método process', async () => {
		service.validationService.inputData.mockImplementation(() => {})

		tokenLayer.getSensediaTokenCarbonCloud = jest.fn(() => {
			return 'TOKEN'
		})

		const response = await controller.proposalController.process(
			mock.VALIDATION_SERVICE_VALID_INPUT_DATA(), 
			'123312', 
			'trace-id'
		)
		
		expect(response).toEqual(mock.CONTROLLER_PROPOSAL_OPENING_VALID_RESPONSE())
	})
})
