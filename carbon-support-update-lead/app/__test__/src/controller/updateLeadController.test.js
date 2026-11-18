const MOCKS = require('../../mocks/index.mock')
const dynamics = require('@porto-seguro/hub-vendas.carbon-service-connector-dynamics')
const controller = require('../../../src/controller')
const service = require('../../../src/service')
const factory = require('../../../src/factory')
const error = require('../../../src/error')
const tokenLayer = require('@porto-seguro/hub-vendas.carbon-token')

beforeEach(() => {
	tokenLayer.getSensediaTokenHubCloud = jest.fn(() => {
		return 'fakeToken'
	})
	tokenLayer.getPortoCertificates = jest.fn(() => {
		return ['fakeCertificates']
	})
	service.validation.inputData = jest.fn()
	service.dynamoDb.deleteItem = jest.fn()
	factory.updateLeadFactory.getPayload = jest.fn(() => {
		return MOCKS.VALID_PUT_LEAD_XML()
	})
})
afterEach(() => {
	jest.clearAllMocks()
})

describe('Given a updateLead controller process call', () => {
	test('It should update a lead with success', async () => {
		dynamics.updateLead = jest.fn(() => {
			return MOCKS.DYNAMICS_OPORTUNIDADE_UPDATE_SUCCESS()
		})

		const processReturn = await controller.updateLeadController.process(
			MOCKS.VALID_PUT_INPUT_REQUEST_DATA_UPDATE_LEAD_CONTENT()
		)

		const expectedResponse = MOCKS.DYNAMICS_OPORTUNIDADE_UPDATE_SUCCESS()

		expect(processReturn).toEqual(expectedResponse)
	})

	test('It should call methodo addTravelPmcObervacoes when id_ramo iqual travel', async () => {
		const spyfactory = jest.spyOn(factory.updateLeadFactory, 'getPayload')

		await controller.updateLeadController.process(
			MOCKS.ID_RAMO_TRAVEL_PUT_INPUT_REQUEST_DATA_UPDATE_LEAD()
		)

		const observation = `\n\tNúmero do pedido: 752183. \n\tLogradouro: Rua Professor Filadelfo Azevedo. \n\tNúmero: 12321. \n\tBairro: Vila Nova Conceição. \n\tCidade: São Paulo. \n\tComplemento: Complemento do endereço. \n\tUf: SP. \n\tSexo: null. \n\tObservações: Observações. `
		const payload = {
			codigo_vdo: 7788994555,
			id_ramo: '611',
			pmc_observacoes: observation,
			logradouro: 'Rua Professor Filadelfo Azevedo',
			bairro: 'Vila Nova Conceição',
			cidade: 'São Paulo',
			complemento: 'Complemento do endereço',
			numero: '12321',
			numero_pedido: '752183',
			sexo: null,
			uf: 'SP',
		}

		expect(spyfactory).toHaveBeenCalledWith(payload)
	})

	test('It should call dynamics layer with a valid lead and token', async () => {
		factory.updateLeadFactory.getPayload = jest.fn(() => {
			return MOCKS.VALID_PUT_LEAD_XML()
		})

		const spyDynamicsLayer = jest
			.spyOn(dynamics, 'updateLead')
			.mockReturnValueOnce(MOCKS.DYNAMICS_OPORTUNIDADE_UPDATE_SUCCESS())

		await controller.updateLeadController.process(
			MOCKS.VALID_PUT_INPUT_REQUEST_DATA_UPDATE_LEAD_CONTENT()
		)
		expect(spyDynamicsLayer).toHaveBeenCalledWith(
			MOCKS.VALID_PUT_LEAD_XML(),
			'fakeToken',
			['fakeCertificates']
		)
	})

	test('It should get an error response when an unexpected exception occur in input validation', async () => {
		service.validation.inputData.mockImplementationOnce(() => {
			throw new Error('Unexpected error')
		})
		const spyServiceLoggerError = jest.spyOn(service.logger, 'error')

		await expect(
			controller.updateLeadController.process(
				MOCKS.VALID_PUT_INPUT_REQUEST_DATA_UPDATE_LEAD_CONTENT()
			)
		).rejects.toThrow('Erro interno')

		expect(spyServiceLoggerError).toHaveBeenCalledWith(
			`Erro identificado: Unexpected error`
		)
	})
	test('It should return a 400 error response when ValidationError occurs', async () => {
		const errorMessage = 'Validation failed'
		service.validation.inputData.mockImplementationOnce(() => {
			throw new error.ValidationError(errorMessage)
		})

		await expect(
			controller.updateLeadController.process(
				MOCKS.VALID_PUT_INPUT_REQUEST_DATA_UPDATE_LEAD_CONTENT()
			)
		).rejects.toThrow('Validation failed')

		expect(service.logger.error).toHaveBeenCalledWith(
			`Erro identificado: ${errorMessage}`
		)
	})
})
