const factory = require('../../../../../../../src/factory')
const MOCKS = require('../../../../../../mocks/index.mock')
const CONSTANT = require('../../../../../../../src/property')

describe('Suite de teste de factory api/createServiceOrderDataFactory.js', () => {
	describe('Dada uma chamada para o metodo getServiceOrderRequestMessagePayload', () => {
		test('Deve retornar um valor de retorno com o formato esperado quando parsedSqsMessageIntegrationData for um objeto válido com as propriedades esperadas', () => {
			expect(
				factory.api.hubVendasCarbon.prestacaoServico.ordemServico.createServiceOrderData.getServiceOrderRequestMessagePayload(
					MOCKS.FACTORY_API_CREATESERVICEORDERDATA.VALID_PARSEDSQSMESSAGEINTEGRATIONDATA_INPUT()
				)
			).toEqual(MOCKS.FACTORY_API_CREATESERVICEORDERDATA.VALID_RETURN())
		})
		test('Deve retornar um valor de retorno com o formato esperado, atribuindo o valor de nome social aos campos customer.contactName e customer.issuerName quando parsedSqsMessageIntegrationData for um objeto válido com as propriedades esperadas e incluir nome social com valor não branco', () => {
			expect(
				factory.api.hubVendasCarbon.prestacaoServico.ordemServico.createServiceOrderData.getServiceOrderRequestMessagePayload(
					MOCKS.FACTORY_API_CREATESERVICEORDERDATA.VALID_PARSEDSQSMESSAGEINTEGRATIONDATA_WITH_SOCIALNAME_INPUT()
				)
			).toEqual(
				MOCKS.FACTORY_API_CREATESERVICEORDERDATA.VALID_RETURN_WITH_SOCIALNAME()
			)
		})

		test('Deve retornar um valor de retorno com o formato esperado quando parsedSqsMessageIntegrationData for um objeto válido e incluir o objeto combo com perguntas agrupadas e quantidade como string', () => {
			expect(
				factory.api.hubVendasCarbon.prestacaoServico.ordemServico.createServiceOrderData.getServiceOrderRequestMessagePayload(
					MOCKS.FACTORY_API_CREATESERVICEORDERDATA.VALID_PARSEDSQSMESSAGEINTEGRATIONDATA_INPUT_WITH_COMBO()
				)
			).toEqual(
				MOCKS.FACTORY_API_CREATESERVICEORDERDATA.VALID_RETURN_WITH_COMBO()
			)
		})

		test('Em caso de serviço do tipo multiple dynamic (combo dinamico) deve conter a propriedade history e não conter questions', () => {
			expect(
				factory.api.hubVendasCarbon.prestacaoServico.ordemServico.createServiceOrderData.getServiceOrderRequestMessagePayload(
					MOCKS.FACTORY_API_CREATESERVICEORDERDATA.VALID_PARSEDSQSMESSAGEINTEGRATIONDATA_INPUT_WITH_COMBO_WITHOUT_QUESTIONS()
				)
			).toEqual(
				MOCKS.FACTORY_API_CREATESERVICEORDERDATA.VALID_RETURN_WITH_COMBO_WITHOUT_QUESTIONS()
			)
		})

		test('Deve incluir ao array serviceOrder.questions as perguntas e respostas recebidas em parsedSqsMessageIntegrationData.questions', () => {
			const base =
				MOCKS.FACTORY_API_CREATESERVICEORDERDATA.VALID_PARSEDSQSMESSAGEINTEGRATIONDATA_INPUT()

			const input = {
				...base,
				questions: [
					{
						question: 12345,
						answer: 'awswer for 12345',
					},
				],
			}

			const payload =
				factory.api.hubVendasCarbon.prestacaoServico.ordemServico.createServiceOrderData.getServiceOrderRequestMessagePayload(
					input
				)

			expect(payload.serviceOrder.questions).toEqual([
				{ questionCode: '12345', quantity: 'awswer for 12345' },
			])
		})

		test("Deve lançar um erro caso o tipo de agendamento seja ínvalido", () => {
			expect(() => {
				const base =
					MOCKS.FACTORY_API_CREATESERVICEORDERDATA.VALID_PARSEDSQSMESSAGEINTEGRATIONDATA_INPUT()

				const input = {
					...base,
					serviceOrder: {
						...base.serviceOrder,
						schedule: {
							type: 'agendagemento-invalido',
						},
					},
				}

				factory.api.hubVendasCarbon.prestacaoServico.ordemServico.createServiceOrderData.getServiceOrderRequestMessagePayload(
					input
				)
			}).toThrowError('Invalid schedule type')
		})
	})

	describe('Para serviços da categoria bicicleta', () => {
		test.each(CONSTANT.BICYCLE_SERVICES_SKUS)(
			'SKU %s: Deve adicionar a payload.serviceOrder as propriedades (vehicleModelCode, vehicleLicenseCode, vehiclemodelYear, vehicleColor)',
			(inputSKU) => {
				const base =
					MOCKS.FACTORY_API_CREATESERVICEORDERDATA.VALID_PARSEDSQSMESSAGEINTEGRATIONDATA_INPUT()

				const input = {
					...base,
					serviceOrder: {
						...base.serviceOrder,
						specialtyCode: '724',
						sku: inputSKU,
					},
				}

				expect(
					factory.api.hubVendasCarbon.prestacaoServico.ordemServico.createServiceOrderData.getServiceOrderRequestMessagePayload(
						input
					)
				).toEqual(
					MOCKS.FACTORY_API_CREATESERVICEORDERDATA.VALID_RETURN_WITH_VEHICLE()
				)
			}
		)
	})

	describe('Para o serviço de guincho', () => {
		test('Deve retornar o payload esperado para ordem de serviço com agendamento programado', () => {
			const base =
				MOCKS.FACTORY_API_CREATESERVICEORDERDATA.VALID_PARSEDSQSMESSAGEINTEGRATIONDATA_INPUT()

			const input = {
				...base,
				serviceOrder: {
					...base.serviceOrder,
					originCode: '1',
					problem: '210',
					specialtyCode: '14',
					subject: 'P08',
					sku: 'GU012',
					vehicle: {
						modelCode: '1012',
						vehicleLicenseCode: 'VEHICLE_LICENSE',
						modelYear: '2026',
						color: '2',
					},
				},
				serviceAddressDestination: {
					city: 'Sao Paulo',
					state: 'SP',
					zipCode: '01310100',
					neighborhood: 'Bela Vista 2',
					street: 'Avenida Paulista 2',
					streetType: '',
					streetNumber: '982',
					latitude: -23.5649224,
					longitude: -46.6519376,
					reference: '',
					additionalInfo: '',
				},
			}

			const result =
				factory.api.hubVendasCarbon.prestacaoServico.ordemServico.createServiceOrderData.getServiceOrderRequestMessagePayload(
					input
				)

			expect(result.serviceOrder.schedule).toEqual({
				startDateTime: '2024-09-26T08:00:00.000',
				endDateTime: '2024-09-26T10:00:00.000',
				openOsDateTime: '2024-09-26T10:00:00.000',
				key: '02092024193000161456',
				estimatedDateTime: undefined,
			})
			expect(result.serviceAddress.addressType).toEqual(1)
			expect(result.serviceAddressDestination).toEqual({
				city: 'Sao Paulo',
				state: 'SP',
				zipCodeBase: '01310',
				zipCodeSuffix: '100',
				neighborhood: 'Bela Vista 2',
				street: 'Avenida Paulista 2',
				number: '982',
				latitude: -23.5649224,
				longitude: -46.6519376,
				reference: '',
				addressType: 2,
				additionalInfo: '',
				standardizationCodeCt24h: 3,
			})
			expect(result.serviceOrder.vehicleModelCode).toEqual('1012')
			expect(result.serviceOrder.vehicleLicenseCode).toEqual('VEHICLE_LICENSE')
			expect(result.serviceOrder.vehiclemodelYear).toEqual(2026)
			expect(result.serviceOrder.vehicleColor).toEqual('2')
		})

		test('Deve retornar o payload esperado para ordem de serviço com agendamento imediato', () => {
			const base =
				MOCKS.FACTORY_API_CREATESERVICEORDERDATA.VALID_PARSEDSQSMESSAGEINTEGRATIONDATA_INPUT()

			const input = {
				...base,
				serviceOrder: {
					...base.serviceOrder,
					schedule: {
						type: 'agendamento-imediato',
						estimatedDateTime: '21-08-2026T18:43:27',
						estimatedServiceTime: '21-08-2026T01:00:00',
						openOsDateTime: '21-08-2026T18:43:27',
						key: 21082026200000194516,
					},
					originCode: '1',
					problem: '210',
					specialtyCode: '14',
					subject: 'P08',
					sku: 'GU012',
					vehicle: {
						modelCode: '1012',
						vehicleLicenseCode: 'VEHICLE_LICENSE',
						modelYear: '2026',
						color: '2',
					},
				},
				serviceAddressDestination: {
					city: 'Sao Paulo',
					state: 'SP',
					zipCode: '01310100',
					neighborhood: 'Bela Vista 2',
					street: 'Avenida Paulista 2',
					streetType: '',
					streetNumber: '982',
					latitude: -23.5649224,
					longitude: -46.6519376,
					reference: '',
					additionalInfo: '',
				},
			}

			const result =
				factory.api.hubVendasCarbon.prestacaoServico.ordemServico.createServiceOrderData.getServiceOrderRequestMessagePayload(
					input
				)

			expect(result.serviceOrder.schedule).toEqual({
				estimatedDateTime: '21-08-2026T01:00:00',
				openOsDateTime: '21-08-2026T18:43:27',
				key: 21082026200000194516,
				startDateTime: undefined,
				endDateTime: undefined,
			})
			expect(result.serviceAddress.addressType).toEqual(1)
			expect(result.serviceAddressDestination).toEqual({
				city: 'Sao Paulo',
				state: 'SP',
				zipCodeBase: '01310',
				zipCodeSuffix: '100',
				neighborhood: 'Bela Vista 2',
				street: 'Avenida Paulista 2',
				number: '982',
				latitude: -23.5649224,
				longitude: -46.6519376,
				reference: '',
				addressType: 2,
				additionalInfo: '',
				standardizationCodeCt24h: 3,
			})
			expect(result.serviceOrder.vehicleModelCode).toEqual('1012')
			expect(result.serviceOrder.vehicleLicenseCode).toEqual('VEHICLE_LICENSE')
			expect(result.serviceOrder.vehiclemodelYear).toEqual(2026)
			expect(result.serviceOrder.vehicleColor).toEqual('2')
		})
	})
})
