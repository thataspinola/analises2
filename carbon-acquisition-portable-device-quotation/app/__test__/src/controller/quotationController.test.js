const tokenLayer = require('@porto-seguro/hub-vendas.carbon-token')
const { quotationController } = require('../../../src/controller')
const factory = require('../../../src/factory')
const api = require('../../../src/api')
const service = require('../../../src/service')
const MOCKS = require('../../mocks/index.mock')
const ExternalApiError = require('../../../src/common/errors/ExternalApiError')

jest.mock('@porto-seguro/hub-vendas.carbon-token')
jest.mock('../../../src/factory')
jest.mock('../../../src/api')

describe('Suite de testes de quotationController.js', () => {
	beforeEach(() => {
		tokenLayer.getPortoCertificates = jest.fn(async () => {
			return MOCKS.FAKE_CERTIFICATES
		})

		tokenLayer.getMulesoftTokenHubInternal = jest.fn(async () => {
			return MOCKS.FAKE_TOKEN
		})

		factory.api.portableDevice.quotationFactory.makePayload.mockImplementation(
			() =>
				MOCKS.FACTORY_API_PORTABLEDEVICE_QUOTATIONREQUESTPAYLOAD.QUOTATION_REQUEST_PAYLOAD_RESPONSE()
		)

		api.portableDevice.quotationRequest.mockImplementation(() =>
			MOCKS.API_PORTABLEDEVICE.POST_PORTABLE_DEVICE_API_SUCCESS_RESPONSE()
		)

		api.portableDevice.getCalculoResponse.mockImplementation(() =>
			MOCKS.API_PORTABLEDEVICE.GET_PORTABLE_DEVICE_API_SUCCESS_RESPONSE()
		)

		factory.api.hubVendasCarbon.support.createLeadApiRequestPayload.getRequestPayload.mockImplementation(
			() =>
				MOCKS.FACTORY_API_CREATELEADAPIREQUESTPAYLOAD.CREATELEADAPI_REQUEST_PAYLOAD_RETURN()
		)

		api.hubVendasCarbon.support.createLead.postCreateLead.mockImplementation(
			() =>
				MOCKS.API_HUBVENDASCARBON_SUPPORT_CREATELEADAPI.CREATELEAD_SUCCESS_RESPONSE_DATA()
		)
	})

	afterEach(() => {
		jest.clearAllMocks()
	})

	test('Deve invocar a layer de token somente uma vez', async () => {
		const spyLayer = jest.spyOn(tokenLayer, 'getMulesoftTokenHubInternal')
		await quotationController.process(
			MOCKS.CONTROLLER_QUOTATIONCONTROLLER.VALID_INPUT_REQUEST()
		)

		expect(spyLayer).toHaveBeenCalled()
		expect(spyLayer).toHaveBeenCalledTimes(1)
	})

	test('Deve invocar a layer de token somente uma vez quando tem cupom', async () => {
		const spyLayer = jest.spyOn(tokenLayer, 'getMulesoftTokenHubInternal')
		// jest
		// 	.spyOn(api.coupon, 'getCouponData')
		// 	.mockReturnValue(MOCKS.API_COUPONAPI.GET_COUPON_API_SUCCESS_RESPONSE())
		api.coupon.getCouponData.mockImplementation(() =>
			MOCKS.API_COUPONAPI.GET_COUPON_API_SUCCESS_RESPONSE()
		)
		await quotationController.process(
			MOCKS.CONTROLLER_QUOTATIONCONTROLLER.VALID_INPUT_DATA_WITH_CUPOM()
		)

		expect(spyLayer).toHaveBeenCalled()
		expect(spyLayer).toHaveBeenCalledTimes(1)
	})

	test('Deve retornar objeto com status code 500 e error message ao receber erro ao buscar o token', async () => {
		jest
			.spyOn(tokenLayer, 'getMulesoftTokenHubInternal')
			.mockImplementationOnce(() => {
				throw new Error()
			})
		await quotationController.process(
			MOCKS.CONTROLLER_QUOTATIONCONTROLLER.VALID_INPUT_REQUEST()
		)
		const spy = jest.spyOn(factory.response, 'error')
		expect(spy).toHaveBeenCalled()
		expect(spy).toHaveBeenCalledTimes(1)
	})

	test('Deve logar um erro ao receber erro ao buscar o token', async () => {
		const spyLogger = jest.spyOn(service.logger, 'error')

		jest
			.spyOn(tokenLayer, 'getMulesoftTokenHubInternal')
			.mockImplementationOnce(() => {
				throw new Error()
			})

		await quotationController.process(
			MOCKS.CONTROLLER_QUOTATIONCONTROLLER.VALID_INPUT_REQUEST()
		)

		expect(spyLogger).toHaveBeenCalled()
		expect(spyLogger).toHaveBeenCalledTimes(1)
	})

	test('Deve invocar a API de quotationRequest somente uma vez e com o payload montado pela Factory', async () => {
		const spyPortableDeviceApi = jest.spyOn(
			api.portableDevice,
			'quotationRequest'
		)

		await quotationController.process(MOCKS.VALID_INPUT_DATA)

		expect(spyPortableDeviceApi).toHaveBeenCalled()
		expect(spyPortableDeviceApi).toHaveBeenCalledTimes(1)
		expect(spyPortableDeviceApi).toHaveBeenCalledWith(
			MOCKS.QUOTATION_FACTORY_PAYLOAD_RESPONSE,
			'fakeToken',
			MOCKS.FAKE_CERTIFICATES
		)
	})

	test('Deve retornar uma exceção ao invocar o quotationRequest e o hash não for retornado', async () => {
		jest.spyOn(api.portableDevice, 'quotationRequest').mockReturnValueOnce({})

		await quotationController.process(
			MOCKS.CONTROLLER_QUOTATIONCONTROLLER.VALID_INPUT_DATA_WITH_CUPOM()
		)

		const spy = jest.spyOn(factory.response, 'error')
		expect(spy).toHaveBeenCalled()
		expect(spy).toHaveBeenCalledTimes(1)
	})

	test('Deve retornar uma exceção ao invocar o quotationRequest e a API retornar um ExternalApiError', async () => {
		jest
			.spyOn(api.portableDevice, 'quotationRequest')
			.mockImplementationOnce(() => {
				throw new ExternalApiError(
					JSON.stringify(MOCKS.POST_PORTABLE_DEVICE_API_ERROR_500_RESPONSE),
					500
				)
			})
		await quotationController.process(
			MOCKS.CONTROLLER_QUOTATIONCONTROLLER.VALID_INPUT_DATA_WITH_CUPOM()
		)
		const spy = jest.spyOn(factory.response, 'error')
		expect(spy).toHaveBeenCalledWith(
			JSON.stringify(MOCKS.POST_PORTABLE_DEVICE_API_ERROR_500_RESPONSE)
		)
	})

	test('Deve invocar a API de getCalculoResponse três vezes e com o payload montado pela Factory', async () => {
		jest
			.spyOn(api.portableDevice, 'getCalculoResponse')
			.mockReturnValueOnce('Aguarde, processando calculo!')
		jest
			.spyOn(api.portableDevice, 'getCalculoResponse')
			.mockReturnValueOnce(
				MOCKS.GET_PORTABLE_DEVICE_API_SUCCESS_RESPONSE_WITHOUT_INSTALLMENT
			)
		jest
			.spyOn(api.portableDevice, 'getCalculoResponse')
			.mockReturnValueOnce(
				MOCKS.API_PORTABLEDEVICE.GET_PORTABLE_DEVICE_API_SUCCESS_RESPONSE()
			)

		const spyPortableDeviceApi = jest.spyOn(
			api.portableDevice,
			'getCalculoResponse'
		)

		await quotationController.process(
			MOCKS.CONTROLLER_QUOTATIONCONTROLLER.VALID_INPUT_REQUEST()
		)

		expect(spyPortableDeviceApi).toHaveBeenCalled()
		expect(spyPortableDeviceApi).toHaveBeenCalledTimes(3)
		expect(spyPortableDeviceApi).toHaveBeenCalledWith(
			MOCKS.POST_PORTABLE_DEVICE_API_SUCCESS_RESPONSE.hash,
			MOCKS.QUOTATION_FACTORY_PAYLOAD_RESPONSE.codigoCanal,
			'fakeToken',
			MOCKS.FAKE_CERTIFICATES
		)
	})

	test('Deve retornar um erro ao invocar o getCouponData e a API retornar um erro', async () => {
		jest.spyOn(api.coupon, 'getCouponData').mockImplementationOnce(() => {
			throw new Error()
		})

		await quotationController.process(
			MOCKS.CONTROLLER_QUOTATIONCONTROLLER.VALID_INPUT_DATA_WITH_CUPOM()
		)
		const spy = jest.spyOn(factory.response, 'error')
		expect(spy).toHaveBeenCalled()
	})

	test.each([
		[5220, 99],
		[5221, 99],
		[5222, 99],
	])(
		'Deve retornar um erro de validação caso o deviceTypeCode (exemplo: %i) não seja compatível com o offerCode %i',
		(offerCode, deviceTypeCode) => {
			expect(() => {
				service.validation.inputData({
					...MOCKS.CONTROLLER_QUOTATIONCONTROLLER.VALID_INPUT_REQUEST(),
					portableDevice: {
						...MOCKS.CONTROLLER_QUOTATIONCONTROLLER.VALID_INPUT_REQUEST()
							.portableDevice,
						productDetails: {
							...MOCKS.CONTROLLER_QUOTATIONCONTROLLER.VALID_INPUT_REQUEST()
								.portableDevice.productDetails,
							offerCode: offerCode,
							deviceTypeCode: deviceTypeCode,
						},
					},
				})
			}).toThrow(
				'The attributes values are not valid: deviceTypeCode, productDetails'
			)
		}
	)

	test.each([
		[5220, 26],
		[5220, 29],
		[5222, 71],
		[5222, 67],
		[5222, 31],
	])(
		'Deve retornar erro de validação quando rentedDevice true para offerCode %i e deviceTypeCode %i',
		(offerCode, deviceTypeCode) => {
			expect(() => {
				service.validation.inputData({
					...MOCKS.CONTROLLER_QUOTATIONCONTROLLER.VALID_INPUT_REQUEST(),
					portableDevice: {
						...MOCKS.CONTROLLER_QUOTATIONCONTROLLER.VALID_INPUT_REQUEST()
							.portableDevice,
						productDetails: {
							...MOCKS.CONTROLLER_QUOTATIONCONTROLLER.VALID_INPUT_REQUEST()
								.portableDevice.productDetails,
							offerCode: offerCode,
							deviceTypeCode: deviceTypeCode,
							rentedDevice: true,
						},
					},
				})
			}).toThrow(
				'The attributes values are not valid: rentedDevice, productDetails'
			)
		}
	)

	test.each([
		[0, 5220, 26],
		[0, 5221, 33],
		[0, 5222, 71],
		[30001, 5220, 26],
		[20001, 5221, 33],
		[10001, 5222, 71],
	])(
		'Deve retornar um erro de validação com acquisitionValue %i inválido para offerCode %i',
		(acquisitionValue, offerCode, deviceTypeCode) => {
			expect(() => {
				service.validation.inputData({
					...MOCKS.CONTROLLER_QUOTATIONCONTROLLER.VALID_INPUT_REQUEST(),
					portableDevice: {
						...MOCKS.CONTROLLER_QUOTATIONCONTROLLER.VALID_INPUT_REQUEST()
							.portableDevice,
						productDetails: {
							...MOCKS.CONTROLLER_QUOTATIONCONTROLLER.VALID_INPUT_REQUEST()
								.portableDevice.productDetails,
							offerCode: offerCode,
							deviceTypeCode: deviceTypeCode,
							acquisitionValue: acquisitionValue,
						},
					},
				})
			}).toThrow('The attributes values are not valid: acquisitionValue')
		}
	)
})
