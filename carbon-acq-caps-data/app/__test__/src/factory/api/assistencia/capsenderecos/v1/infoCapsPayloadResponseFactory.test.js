const factory = require('../../../../../../../src/factory')
const MOCKS = require('../../../../../../mocks/index.mock')

describe('Suite de teste de factory api getCapsInfoPayloadFactory.js', () => {
	describe('Dada uma chamada para o metodo getPayload', () => {
		test('Deve retornar um payload com o formato e estrutura esperados', () => {
			const apiResponseData =
				MOCKS.FACTORY_API_ASSISTENCIA_CAPSENDERECO_V1_INFOCAPSPAYLOADRESPONSE.GETPAYLOAD_PARSEDJSON_VALID_INPUT()
			const parsedInputData =
				MOCKS.CONTROLLER_REQUEST.PROCESS_VALID_PARSEDJSON_INPUT()
			const expected =
				MOCKS.FACTORY_API_ASSISTENCIA_CAPSENDERECO_V1_INFOCAPSPAYLOADRESPONSE.GETPAYLOAD_VALID_RETURN()
			const result =
				factory.api.assistencia.capsEnderecos.v1.infoCapsPayloadResponse.getPayload(
					apiResponseData,
					parsedInputData
				)

			expect(result).toEqual(expected)
		})

		test('Deve retornar um payload com o formato e estrutura esperados mesmo sem imagens', () => {
			const apiResponseData =
				MOCKS.FACTORY_API_ASSISTENCIA_CAPSENDERECO_V1_INFOCAPSPAYLOADRESPONSE.GETPAYLOAD_PARSEDJSON_VALID_INPUT_WITHOUT_IMAGES()
			const parsedInputData =
				MOCKS.CONTROLLER_REQUEST.PROCESS_VALID_PARSEDJSON_INPUT()
			const expected =
				MOCKS.FACTORY_API_ASSISTENCIA_CAPSENDERECO_V1_INFOCAPSPAYLOADRESPONSE.GETPAYLOAD_VALID_RETURN_WITHOUT_IMAGES()
			const result =
				factory.api.assistencia.capsEnderecos.v1.infoCapsPayloadResponse.getPayload(
					apiResponseData,
					parsedInputData
				)

			expect(result).toEqual(expected)
		})
	})

	describe('Validação de formatação de CEP, Telefone, Latitude, Longitude e Distância', () => {
		let apiResponseData, parsedInputData, result

		beforeEach(() => {
			apiResponseData =
				MOCKS.FACTORY_API_ASSISTENCIA_CAPSENDERECO_V1_INFOCAPSPAYLOADRESPONSE.GETPAYLOAD_PARSEDJSON_VALID_INPUT()
			parsedInputData =
				MOCKS.CONTROLLER_REQUEST.PROCESS_VALID_PARSEDJSON_INPUT()
			result =
				factory.api.assistencia.capsEnderecos.v1.infoCapsPayloadResponse.getPayload(
					apiResponseData,
					parsedInputData
				)
		})

		test('Deve formatar corretamente o CEP com 8 dígitos', () => {
			const rawCep = apiResponseData[0].EmpresaCEP.trim()
			const expected =
				rawCep.length === 8 ? rawCep.replace(/(\d{5})(\d{3})/, '$1-$2') : rawCep
			expect(result[0].zipCode).toBe(expected)
		})

		test('Deve manter CEP sem formatação quando não tiver 8 dígitos', () => {
			apiResponseData[0].EmpresaCEP = '1234567'
			let res1 =
				factory.api.assistencia.capsEnderecos.v1.infoCapsPayloadResponse.getPayload(
					apiResponseData,
					parsedInputData
				)
			expect(res1[0].zipCode).toBe('1234567')

			apiResponseData[0].EmpresaCEP = '123456789'
			const res2 =
				factory.api.assistencia.capsEnderecos.v1.infoCapsPayloadResponse.getPayload(
					apiResponseData,
					parsedInputData
				)
			expect(res2[0].zipCode).toBe('123456789')
		})

		test('Deve formatar corretamente o telefone com DDD e 8 dígitos', () => {
			const parts = apiResponseData[0].TelefoneNumero.trim().split(/\s+/)
			const hasDDD = parts.length > 1
			const expectedArea = hasDDD ? parts[0] : ''
			const num = hasDDD ? parts.slice(1).join('') : parts[0]
			const expectedPhone =
				num.length === 8 ? num.replace(/(\d{4})(\d{4})/, '$1-$2') : num

			expect(result[0].areaCode).toBe(expectedArea)
			expect(result[0].phone).toBe(expectedPhone)
		})

		test('Deve tratar telefone sem DDD corretamente', () => {
			apiResponseData[0].TelefoneNumero = '31298525'
			const res =
				factory.api.assistencia.capsEnderecos.v1.infoCapsPayloadResponse.getPayload(
					apiResponseData,
					parsedInputData
				)
			expect(res[0].areaCode).toBe('')
			expect(res[0].phone).toBe('31298525')
		})

		test('Deve remover espaços extras do telefone', () => {
			apiResponseData[0].TelefoneNumero = '  11   3129  8525  '
			const res =
				factory.api.assistencia.capsEnderecos.v1.infoCapsPayloadResponse.getPayload(
					apiResponseData,
					parsedInputData
				)
			expect(res[0].areaCode).toBe('11')
			expect(res[0].phone).toBe('3129-8525')
		})

		test('Deve manter telefone com 9 dígitos sem formatação extra', () => {
			apiResponseData[0].TelefoneNumero = '11 987654321'
			const res =
				factory.api.assistencia.capsEnderecos.v1.infoCapsPayloadResponse.getPayload(
					apiResponseData,
					parsedInputData
				)
			expect(res[0].areaCode).toBe('11')
			expect(res[0].phone).toBe('987654321')
		})

		test('Deve retornar telefone vazio quando for nulo ou string vazia', () => {
			apiResponseData[0].TelefoneNumero = null
			let res =
				factory.api.assistencia.capsEnderecos.v1.infoCapsPayloadResponse.getPayload(
					apiResponseData,
					parsedInputData
				)
			expect(res[0].areaCode).toBe('')
			expect(res[0].phone).toBe('')

			apiResponseData[0].TelefoneNumero = ''
			res =
				factory.api.assistencia.capsEnderecos.v1.infoCapsPayloadResponse.getPayload(
					apiResponseData,
					parsedInputData
				)
			expect(res[0].areaCode).toBe('')
			expect(res[0].phone).toBe('')
		})

		test('Deve retornar latitude e longitude como strings', () => {
			expect(typeof result[0].latitude).toBe('string')
			expect(result[0].latitude).toBe(
				apiResponseData[0].EmpresaLatitude.toString()
			)
			expect(typeof result[0].longitude).toBe('string')
			expect(result[0].longitude).toBe(
				apiResponseData[0].EmpresaLongitude.toString()
			)
		})

		test('Deve retornar latitude vazia quando for nula', () => {
			apiResponseData[0].EmpresaLatitude = null
			const res =
				factory.api.assistencia.capsEnderecos.v1.infoCapsPayloadResponse.getPayload(
					apiResponseData,
					parsedInputData
				)
			expect(res[0].latitude).toBe('')
		})

		test('Deve retornar longitude vazia quando for nula', () => {
			apiResponseData[0].EmpresaLongitude = null
			const res =
				factory.api.assistencia.capsEnderecos.v1.infoCapsPayloadResponse.getPayload(
					apiResponseData,
					parsedInputData
				)
			expect(res[0].longitude).toBe('')
		})

		test('Deve formatar corretamente a distância em km', () => {
			expect(result[0].distance).toBe('2 km')
		})

		test('Deve retornar distância como null quando for nula', () => {
			apiResponseData[0].distancia = null
			const res =
				factory.api.assistencia.capsEnderecos.v1.infoCapsPayloadResponse.getPayload(
					apiResponseData,
					parsedInputData
				)
			expect(res[0].distance).toBe(null)
		})

		test('Deve retornar lista vazia porque oficinas estão com número nulo', () => {
			const apiResponseData =
				MOCKS.FACTORY_API_ASSISTENCIA_CAPSENDERECO_V1_INFOCAPSPAYLOADRESPONSE.GETPAYLOAD_PARSEDJSON_VALID_INPUT_WITHOUT_NUMBER()
			const parsedInputData =
				MOCKS.CONTROLLER_REQUEST.PROCESS_VALID_PARSEDJSON_INPUT()
			const expected = []
			const result =
				factory.api.assistencia.capsEnderecos.v1.infoCapsPayloadResponse.getPayload(
					apiResponseData,
					parsedInputData
				)

			expect(result).toEqual(expected)
		})
	})

	describe('Retornos vazios de operatingHours e operatesAtNight', () => {
		test('Se não houver horários válidos retorna string vazia e operatesAtNight false', () => {
			const base =
				MOCKS.FACTORY_API_ASSISTENCIA_CAPSENDERECO_V1_INFOCAPSPAYLOADRESPONSE.GETPAYLOAD_PARSEDJSON_VALID_INPUT()[0]

			const item = {
				...base,
				AgendaHoraInicioSegunda: '1753-01-01T00:00:00',
				AgendaHoraFimSegunda: '1753-01-01T00:00:00',
				AgendaHoraInicioSabado: '1753-01-01T00:00:00',
				AgendaHoraFimSabado: '1753-01-01T00:00:00',
			}
			const result =
				factory.api.assistencia.capsEnderecos.v1.infoCapsPayloadResponse.getPayload(
					[item],
					{}
				)
			expect(result[0].operatingHours).toBe('')
			expect(result[0].operatesAtNight).toBe(false)
		})
	})

	describe('Retornos dos filtros operatesAtNight,workingSaturday e electricCharger', () => {
		test('Deve retornar somente as oficinas que não possuem carregador elétrico', () => {
			const apiResponseData = {
				apiResponseData:
					MOCKS.API_ASSISTENCIA_CAPSENDERECO_V1_INFOCAPS.GETCAPSINFOENDPOINT_VALID_RETURN(),
				inputParsedData: {
					...MOCKS.CONTROLLER_REQUEST.PROCESS_VALID_PARSEDJSON_INPUT(),
					electricCharger: 'false',
				},
			}

			const result =
				factory.api.assistencia.capsEnderecos.v1.infoCapsPayloadResponse.getPayload(
					apiResponseData.apiResponseData,
					apiResponseData.inputParsedData
				)

			expect(result.every((oficina) => oficina.electricCharger === 0)).toBe(
				true
			)
		})
		test('Deve retornar somente as oficinas que possuem carregador elétrico', () => {
			const apiResponseData = {
				apiResponseData:
					MOCKS.API_ASSISTENCIA_CAPSENDERECO_V1_INFOCAPS.GETCAPSINFOENDPOINT_VALID_RETURN(),
				inputParsedData: {
					...MOCKS.CONTROLLER_REQUEST.PROCESS_VALID_PARSEDJSON_INPUT(),
					electricCharger: 'true',
				},
			}

			const result =
				factory.api.assistencia.capsEnderecos.v1.infoCapsPayloadResponse.getPayload(
					apiResponseData.apiResponseData,
					apiResponseData.inputParsedData
				)

			expect(result.every((oficina) => oficina.electricCharger === 1)).toBe(
				true
			)
		})
		test('Deve retornar somente as oficinas que operam após as 18h', () => {
			const apiResponseData = {
				apiResponseData:
					MOCKS.API_ASSISTENCIA_CAPSENDERECO_V1_INFOCAPS.GETCAPSINFOENDPOINT_VALID_RETURN(),
				inputParsedData: {
					...MOCKS.CONTROLLER_REQUEST.PROCESS_VALID_PARSEDJSON_INPUT(),
					operatesAtNight: 'true',
				},
			}

			const result =
				factory.api.assistencia.capsEnderecos.v1.infoCapsPayloadResponse.getPayload(
					apiResponseData.apiResponseData,
					apiResponseData.inputParsedData
				)

			expect(result.every((oficina) => oficina.operatesAtNight)).toBe(true)
		})

		test('Deve retornar somente as oficinas que trabalham aos sábados', () => {
			const apiResponseData = {
				apiResponseData:
					MOCKS.API_ASSISTENCIA_CAPSENDERECO_V1_INFOCAPS.GETCAPSINFOENDPOINT_VALID_RETURN(),
				inputParsedData: {
					...MOCKS.CONTROLLER_REQUEST.PROCESS_VALID_PARSEDJSON_INPUT(),
					workingSaturday: 'true',
				},
			}

			const result =
				factory.api.assistencia.capsEnderecos.v1.infoCapsPayloadResponse.getPayload(
					apiResponseData.apiResponseData,
					apiResponseData.inputParsedData
				)

			expect(result.every((oficina) => oficina.workingSaturday)).toBe(true)
		})

		test('Deve retornar oficinas que operam após as 18h e trabalham aos sábados', () => {
			const apiResponseData = {
				apiResponseData:
					MOCKS.API_ASSISTENCIA_CAPSENDERECO_V1_INFOCAPS.GETCAPSINFOENDPOINT_VALID_RETURN(),
				inputParsedData: {
					...MOCKS.CONTROLLER_REQUEST.PROCESS_VALID_PARSEDJSON_INPUT(),
					operatesAtNight: 'true',
					workingSaturday: 'true',
				},
			}

			const result =
				factory.api.assistencia.capsEnderecos.v1.infoCapsPayloadResponse.getPayload(
					apiResponseData.apiResponseData,
					apiResponseData.inputParsedData
				)

			expect(
				result.every(
					(oficina) => oficina.operatesAtNight && oficina.workingSaturday
				)
			).toBe(true)
		})

		test('Deve retornar lista vazia se nenhuma oficina atender aos filtros', () => {
			const rawInput =
				MOCKS.API_ASSISTENCIA_CAPSENDERECO_V1_INFOCAPS.GETCAPSINFOENDPOINT_VALID_RETURN()

			const mockSemOperacaoNoiteESabado = rawInput.map((oficina) => ({
				...oficina,
				AgendaHoraFimSegunda: '2023-01-01T17:00:00',
				AgendaHoraFimTerca: '2023-01-01T17:00:00',
				AgendaHoraFimQuarta: '2023-01-01T17:00:00',
				AgendaHoraFimQuinta: '2023-01-01T17:00:00',
				AgendaHoraFimSexta: '2023-01-01T17:00:00',
				AgendaHoraInicioSabado: null,
				AgendaHoraFimSabado: null,
			}))

			const inputSemFiltro = {
				apiResponseData: mockSemOperacaoNoiteESabado,
				inputParsedData: {
					...MOCKS.CONTROLLER_REQUEST.PROCESS_VALID_PARSEDJSON_INPUT(),
					operatesAtNight: 'true',
					workingSaturday: 'true',
				},
			}

			const result =
				factory.api.assistencia.capsEnderecos.v1.infoCapsPayloadResponse.getPayload(
					inputSemFiltro.apiResponseData,
					inputSemFiltro.inputParsedData
				)

			expect(result).toHaveLength(0)
		})
	})
})
