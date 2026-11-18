exports.FACTORY_API_PORTABLEDEVICE_QUOTATIONREQUESTPAYLOAD = require('./src/factory/api/portableDevice/quotationRequestPayload.mock')
exports.FACTORY_API_CREATELEADAPIREQUESTPAYLOAD = require('./src/factory/api/hub-vendas-carbon/support/createLeadApiRequestPayload.mock')
exports.API_PORTABLEDEVICE = require('./src/api/portableDeviceApi.mock')
exports.API_HUBVENDASCARBON_SUPPORT_CREATELEADAPI = require('./src/api/hub-vendas-carbon/support/createLeadApi.mock')
exports.API_COUPONAPI = require('./src/api/couponApi.mock')
exports.CONTROLLER_QUOTATIONCONTROLLER = require('./src/controller/quotationController.mock')
exports.FACTORY_AXIOSRESPONSEERRORDATA = require('./src/factory/axiosResponseErrorDataFactory.mock')
exports.FACTORY_RESPONSEFACTORY = require('./src/factory/responseFactory.mock')

const VALID_INPUT_DATA = {
	portableDevice: {
		client: {
			cpf: '33994753813',
			name: 'João Silva Joana d\'Arc Lourenço',
			socialName: 'Maria Test',
			phone: '11922225555',
			email: 'email@dominio.com',
			zipCode: '02460-030',
		},
		marketingOptInFlag: true,
		sessionId: '202493010587755556506-6T4XUGKR',
		userAgent:
			'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0.0.0 Safari/537.36 Edg/130.0.0.0',
		ipAddress: '192.168.1.1',
		productDetails: {
			offerCode: 5221,
			deviceTypeCode: 33,
			brandCode: 458,
			deviceModel: 'P50 Pro',
			acquisitionDate: '10/09/2024',
			acquisitionValue: 2500.0,
			rentedDevice: false,
		},
	},
	// susep: 'COL10J',
}

exports.VALID_HANDLER_POST_INPUT_REQUEST_DATA = () => {
	return {
		httpMethod: 'POST',
		body: JSON.stringify(VALID_INPUT_DATA),
	}
}

exports.VALID_INPUT_DATA_WITH_INEXISTENT_CUPOM = {
	...VALID_INPUT_DATA,
	portableDevice: {
		...VALID_INPUT_DATA.portableDevice,
		coupon: 'INEXISTENTE',
	},
}

exports.VALID_INPUT_DATA_WITH_INACTIVE_CUPOM = {
	...VALID_INPUT_DATA,
	portableDevice: {
		...VALID_INPUT_DATA.portableDevice,
		coupon: 'INATIVO',
	},
}

exports.VALID_INPUT_DATA = VALID_INPUT_DATA

const QUOTATION_FACTORY_PAYLOAD_RESPONSE = {
	idOportunidadeMulticanal: 'hash123',
	numeroExtOrc: '58124000000001',
	codigoCanal: 58,
	codigoOferta: 5221,
	codigoRamo: 201,
	codigoTipoCalculo: 2,
	codigoTipoSeguro: 1,
	cupom: null,
	corretor: {
		codigoOperacao: '597',
		flagMulticanal: true,
		flagVinculo: true,
		susep: 'COL10J',
	},
	proponente: {
		cpf: '33994753813',
		nomePessoa: 'Maria Santos',
		nomeSocial: 'Maria Test',
		telefone: '11222225555',
		email: 'email@dominio.com',
		codigoPessoa: 12345678,
		cep: '02460-030',
		tipoTelefone: 1,
	},
	itens: [
		{
			numeroItem: 1,
			codigoEquipamento: 124,
			codigoFaixaEtariaPrincipalUsuario: 1,
			codigoMarca: 458,
			codigoRelevancia: 1,
			codigoTipoEquipamento: 33,
			idadeAparelho: 1,
			equipamentoLocado: false,
			dataAquisicao: '10/09/2024',
			modelo: {
				nomeModelo: 'P50 Pro',
				valorModelo: 10023,
			},
			pacotes: [
				{
					codigoPacote: 1,
					codigoPlanoCobertura: 6,
					coberturas: [
						{
							codigoCobertura: 644,
							percentualParticipacaoSegurado: 0,
						},
					],
				},
				{
					codigoPacote: 2,
					codigoPlanoCobertura: 7,
					coberturas: [
						{
							codigoCobertura: 644,
							percentualParticipacaoSegurado: 0,
						},
						{
							codigoCobertura: 643,
							percentualParticipacaoSegurado: 0,
						},
					],
				},
				{
					codigoPacote: 3,
					codigoPlanoCobertura: 8,
					coberturas: [
						{
							codigoCobertura: 644,
							percentualParticipacaoSegurado: 0,
						},
						{
							codigoCobertura: 643,
							percentualParticipacaoSegurado: 0,
						},
						{
							codigoCobertura: 4,
							percentualParticipacaoSegurado: 0,
						},
					],
				},
			],
		},
	],
}

exports.QUOTATION_FACTORY_PAYLOAD_RESPONSE = QUOTATION_FACTORY_PAYLOAD_RESPONSE

exports.QUOTATION_FACTORY_PAYLOAD_RESPONSE_WITH_CUPOM = {
	...QUOTATION_FACTORY_PAYLOAD_RESPONSE,
	cupom: {
		codigo: 'TESTE',
		percentualDesconto: 10,
	},
}

const RESPONSE_FACTORY_QUOTATIONS = [
	{
		productQuotationId: '032dd8ed-cde4-4faf-87c4-c645cec0f5c4',
		product_attributes: {
			budgetNumber: '1-5',
			name: 'Quebra acidental',
			quotationDate: '2023-06-15T15:12:00.000Z',
			expirationDate: '2023-06-20T15:12:00.000Z',
			coverages: ['Quebra Acidental'],
			details: [
				'<p><strong>Quebra por queda acidental</strong>Imagine que você tropeçou e o equipamento caiu da sua mão, isso é um exemplo de quebra acidental. </p><p><strong>Derramamento de líquidos ou oxidação</strong> Por um acidente, você caiu na piscina e o smartphone estava junto, neste exemplo pode acionar esse plano.</p><p><strong>Danos elétricos durante a carga</strong>Enquanto o equipamento estava sendo recarregado, houve oscilação de energia e causou o dano. Nesse exemplo, seu equipamento tem amparo.</p><p><strong>Garantia Internacional</strong>Viaje com tranquilidade, pois esse benefício estende as coberturas do plano contratado para qualquer lugar do mundo.</p>',
			],
			installments: 12,
			first_installment_value: 22.99,
			remaining_installments_value: 22.99,
			amount: 275.88,
			porto_card_amount: 262.09,
			recommend_budget: false,
		},
	},
	{
		productQuotationId: '032dd8ed-cde4-4faf-87c4-c645cec0f5c4',
		product_attributes: {
			budgetNumber: '2-6',
			name: 'Roubo',
			quotationDate: '2023-06-15T15:12:00.000Z',
			expirationDate: '2023-06-20T15:12:00.000Z',
			coverages: ['Roubo e Furto Mediante Arrombamento'],
			details: [
				'<p><strong>Roubo</strong> Infelizmente você foi abordado, o bandido ameaçou com revólver e levou seu smartphone ou a residência foi arrombada e levaram o smartphone. Fique tranquilo, pois nesses exemplos seu equipamento tem amparo.</p> <p><strong>Garantia Internacional</strong> Viaje com tranquilidade, pois esse benefício estende as coberturas do plano contratado para qualquer lugar do mundo.</p>',
			],
			installments: 12,
			first_installment_value: 22.99,
			remaining_installments_value: 22.99,
			amount: 275.88,
			porto_card_amount: 262.09,
			recommend_budget: false,
		},
	},
	{
		productQuotationId: '032dd8ed-cde4-4faf-87c4-c645cec0f5c4',
		product_attributes: {
			budgetNumber: '3-7',
			name: 'Quebra + Roubo',
			quotationDate: '2023-06-15T15:12:00.000Z',
			expirationDate: '2023-06-20T15:12:00.000Z',
			coverages: ['Quebra Acidental', 'Roubo e Furto Mediante Arrombamento'],
			details: [
				'<p><strong>Quebra por queda acidental</strong>Imagine que você tropeçou e o equipamento caiu da sua mão, isso é um exemplo de quebra acidental. </p><p><strong>Derramamento de líquidos ou oxidação</strong> Por um acidente, você caiu na piscina e o smartphone estava junto, neste exemplo pode acionar esse plano.</p><p><strong>Danos elétricos durante a carga</strong>Enquanto o equipamento estava sendo recarregado, houve oscilação de energia e causou o dano. Nesse exemplo, seu equipamento tem amparo.</p><p><strong>Garantia Internacional</strong>Viaje com tranquilidade, pois esse benefício estende as coberturas do plano contratado para qualquer lugar do mundo.</p>',
				'<p><strong>Roubo</strong> Infelizmente você foi abordado, o bandido ameaçou com revólver e levou seu smartphone ou a residência foi arrombada e levaram o smartphone. Fique tranquilo, pois nesses exemplos seu equipamento tem amparo.</p> <p><strong>Garantia Internacional</strong> Viaje com tranquilidade, pois esse benefício estende as coberturas do plano contratado para qualquer lugar do mundo.</p>',
			],
			installments: 12,
			first_installment_value: 28.98,
			remaining_installments_value: 28.98,
			amount: 347.76,
			porto_card_amount: 330.37,
			recommend_budget: false,
		},
	},
	{
		productQuotationId: '032dd8ed-cde4-4faf-87c4-c645cec0f5c4',
		product_attributes: {
			budgetNumber: '4-8',
			name: 'Quebra + Roubo + furto simples',
			quotationDate: '2023-06-15T15:12:00.000Z',
			expirationDate: '2023-06-20T15:12:00.000Z',
			coverages: [
				'Quebra Acidental',
				'Roubo e Furto Mediante Arrombamento',
				'Furto Simples',
			],
			details: [
				'<p><strong>Quebra por queda acidental</strong>Imagine que você tropeçou e o equipamento caiu da sua mão, isso é um exemplo de quebra acidental. </p><p><strong>Derramamento de líquidos ou oxidação</strong> Por um acidente, você caiu na piscina e o smartphone estava junto, neste exemplo pode acionar esse plano.</p><p><strong>Danos elétricos durante a carga</strong>Enquanto o equipamento estava sendo recarregado, houve oscilação de energia e causou o dano. Nesse exemplo, seu equipamento tem amparo.</p><p><strong>Garantia Internacional</strong>Viaje com tranquilidade, pois esse benefício estende as coberturas do plano contratado para qualquer lugar do mundo.</p>',
				'<p><strong>Roubo</strong> Infelizmente você foi abordado, o bandido ameaçou com revólver e levou seu smartphone ou a residência foi arrombada e levaram o smartphone. Fique tranquilo, pois nesses exemplos seu equipamento tem amparo.</p> <p><strong>Garantia Internacional</strong> Viaje com tranquilidade, pois esse benefício estende as coberturas do plano contratado para qualquer lugar do mundo.</p>',
				'<p><strong>Furto Simples</strong> Imagine que você deixou seu smartphone em cima da mesa de um restaurante e foi ao banheiro, quando voltou percebeu que não estava mais. Este é um exemplo de furto simples, pois não houve ameaça ou arrombamento. Não se preocupe, neste plano tem esta garantia.</p>',
			],
			installments: 12,
			first_installment_value: 36.98,
			remaining_installments_value: 36.98,
			amount: 443.76,
			porto_card_amount: 421.57,
			recommend_budget: true,
		},
	},
	{
		productQuotationId: '032dd8ed-cde4-4faf-87c4-c645cec0f5c4',
		product_attributes: {
			budgetNumber: '5-9',
			name: 'Quebra + Roubo + furto simples + transações digitais e Pix',
			quotationDate: '2023-06-15T15:12:00.000Z',
			expirationDate: '2023-06-20T15:12:00.000Z',
			coverages: ['Carteira digital'],
			details: ['Carteira digital'],
			installments: 12,
			first_installment_value: 4.32,
			remaining_installments_value: 4.35,
			amount: 52.17,
			porto_card_amount: 49.56,
			recommend_budget: false,
		},
	},
]

exports.RESPONSE_FACTORY_QUOTATIONS = RESPONSE_FACTORY_QUOTATIONS

exports.POST_PORTABLE_DEVICE_API_SUCCESS_RESPONSE = {
	hash: '25d3b73d-dda2-4625-bc1f-a27387874b90',
	numeroOrcExterno: 56123456789,
}

exports.POST_PORTABLE_DEVICE_API_ERROR_400_RESPONSE = {
	message: 'Error Paramenter Request',
}

const POST_PORTABLE_DEVICE_API_ERROR_500_RESPONSE = {
	'proponente.cpf':
		'invalid Brazilian individual taxpayer registry number (CPF)',
}

exports.POST_PORTABLE_DEVICE_API_ERROR_500_RESPONSE =
	POST_PORTABLE_DEVICE_API_ERROR_500_RESPONSE

const GET_PORTABLE_DEVICE_API_SUCCESS_RESPONSE_WITHOUT_INSTALLMENT = {
	hash: '25d3b73d-dda2-4625-bc1f-a27387874b90',
	numeroOrcExterno: 56123456789,
	scoreSerasa: -1,
	pacotes: [
		{
			codigoPacote: 1,
			codigoPlanoCobertura: 5,
			valorPremioLiquidoTotal: 1307.39,
			valorPremioTotalAVista: 1307.39,
			coberturas: [
				{
					codigoCobertura: 643,
					valorPremioCobertura: 1307.39,
					titulo: 'Quebra por queda acidental',
					descricao:
						'Imagine que você tropeçou e o equipamento caiu da sua mão, isso é um exemplo de quebra acidental. Derramamento de líquidos ou oxidação Por um acidente, você caiu na piscina e o smartphone estava junto, neste exemplo pode acionar esse plano. Danos elétricos durante a carga – Enquanto o equipamento estava sendo recarregado, houve oscilação de energia e causou o dano. Nesse exemplo, seu equipamento tem amparo. Garantia Internacional – Viaje com tranquilidade, pois esse benefício estende as coberturas do plano contratado para qualquer lugar do mundo.',
				},
			],
		},
		{
			codigoPacote: 2,
			codigoPlanoCobertura: 6,
			valorPremioLiquidoTotal: 1296.22,
			valorPremioTotalAVista: 1296.22,
			coberturas: [
				{
					codigoCobertura: 644,
					valorPremioCobertura: 1296.22,
					titulo: 'Roubo',
					descricao:
						'Infelizmente você foi abordado, o bandido ameaçou com revólver e levou seu smartphone ou a residência foi arrombada e levaram o smartphone. Fique tranquilo, pois nesses exemplos seu equipamento tem amparo. Garantia Internacional Viaje com tranquilidade, pois esse benefício estende as coberturas do plano contratado para qualquer lugar do mundo.',
				},
			],
		},
		{
			codigoPacote: 3,
			codigoPlanoCobertura: 7,
			valorPremioLiquidoTotal: 1631.36,
			valorPremioTotalAVista: 1631.36,
			coberturas: [
				{
					codigoCobertura: 643,
					valorPremioCobertura: 513.95,
					titulo: 'Quebra por queda acidental',
					descricao:
						'Imagine que você tropeçou e o equipamento caiu da sua mão, isso é um exemplo de quebra acidental. Derramamento de líquidos ou oxidação Por um acidente, você caiu na piscina e o smartphone estava junto, neste exemplo pode acionar esse plano. Danos elétricos durante a carga – Enquanto o equipamento estava sendo recarregado, houve oscilação de energia e causou o dano. Nesse exemplo, seu equipamento tem amparo. Garantia Internacional – Viaje com tranquilidade, pois esse benefício estende as coberturas do plano contratado para qualquer lugar do mundo.',
				},
				{
					codigoCobertura: 644,
					valorPremioCobertura: 1117.41,
					titulo: 'Roubo',
					descricao:
						'Infelizmente você foi abordado, o bandido ameaçou com revólver e levou seu smartphone ou a residência foi arrombada e levaram o smartphone. Fique tranquilo, pois nesses exemplos seu equipamento tem amparo. Garantia Internacional Viaje com tranquilidade, pois esse benefício estende as coberturas do plano contratado para qualquer lugar do mundo.',
				},
			],
		},
		{
			codigoPacote: 4,
			codigoPlanoCobertura: 8,
			valorPremioLiquidoTotal: 2100.72,
			valorPremioTotalAVista: 2100.72,
			coberturas: [
				{
					codigoCobertura: 643,
					valorPremioCobertura: 513.95,
					titulo: 'Quebra por queda acidental',
					descricao:
						'Imagine que você tropeçou e o equipamento caiu da sua mão, isso é um exemplo de quebra acidental. Derramamento de líquidos ou oxidação Por um acidente, você caiu na piscina e o smartphone estava junto, neste exemplo pode acionar esse plano. Danos elétricos durante a carga – Enquanto o equipamento estava sendo recarregado, houve oscilação de energia e causou o dano. Nesse exemplo, seu equipamento tem amparo. Garantia Internacional – Viaje com tranquilidade, pois esse benefício estende as coberturas do plano contratado para qualquer lugar do mundo.',
				},
				{
					codigoCobertura: 644,
					valorPremioCobertura: 1117.41,
					titulo: 'Roubo',
					descricao:
						'Infelizmente você foi abordado, o bandido ameaçou com revólver e levou seu smartphone ou a residência foi arrombada e levaram o smartphone. Fique tranquilo, pois nesses exemplos seu equipamento tem amparo. Garantia Internacional Viaje com tranquilidade, pois esse benefício estende as coberturas do plano contratado para qualquer lugar do mundo.',
				},
				{
					codigoCobertura: 645,
					valorPremioCobertura: 469.36,
					titulo: 'Furto Simples',
					descricao:
						'Imagine que você deixou seu smartphone em cima da mesa de um restaurante e foi ao banheiro, quando voltou percebeu que não estava mais. Este é um exemplo de furto simples, pois não houve ameaça ou arrombamento. Não se preocupe, neste plano tem esta garantia.',
				},
			],
		},
	],
}

exports.GET_PORTABLE_DEVICE_API_SUCCESS_RESPONSE_WITHOUT_INSTALLMENT =
	GET_PORTABLE_DEVICE_API_SUCCESS_RESPONSE_WITHOUT_INSTALLMENT

exports.GET_PORTABLE_DEVICE_API_ERROR_400_RESPONSE = {
	message: 'Request failed with status code 400',
	name: 'AxiosError',
	stack:
		'AxiosError: Request failed with status code 400\n    at settle (/home/hvdev/porto/acqsition/portableDevice/quotation/app/node_modules/axios/dist/node/axios.cjs:1970:12)\n    at Unzip.handleStreamEnd (/home/hvdev/porto/acqsition/portableDevice/quotation/app/node_modules/axios/dist/node/axios.cjs:3069:11)\n    at Unzip.emit (node:events:526:35)\n    at endReadableNT (node:internal/streams/readable:1359:12)\n    at process.processTicksAndRejections (node:internal/process/task_queues:82:21)',
	config: {
		transitional: {
			silentJSONParsing: true,
			forcedJSONParsing: true,
			clarifyTimeoutError: false,
		},
		adapter: ['xhr', 'http'],
		transformRequest: [null],
		transformResponse: [null],
		timeout: 0,
		xsrfCookieName: 'XSRF-TOKEN',
		xsrfHeaderName: 'X-XSRF-TOKEN',
		maxContentLength: -1,
		maxBodyLength: -1,
		env: {},
		headers: {
			Accept: 'application/json, text/plain, */*',
			Authorization:'Authorization',
			partner: 'HUB-VENDAS-CARBON',
			'User-Agent': 'axios/1.6.5',
			'Accept-Encoding': 'gzip, compress, deflate, br',
		},
		method: 'get',
		url: 'https://apis-hml.portoseguro.brasil/re/celular/v1/calculo',
		params: { hash: 'e04785c4-4221-40b1-80d8-80e8f7a6efb9', codigoCanal: 58 },
	},
	code: 'ERR_BAD_RESPONSE',
	status: 400,
}

exports.GET_PORTABLE_DEVICE_API_ERROR_500_RESPONSE = {
	message: 'Request failed with status code 500',
	name: 'AxiosError',
	stack:
		'AxiosError: Request failed with status code 500\n    at settle (/home/hvdev/porto/acquisition/portable-device/quotation/app/node_modules/axios/dist/node/axios.cjs:1970:12)\n    at Unzip.handleStreamEnd (/home/hvdev/porto/acqsition/portableDevice/quotation/app/node_modules/axios/dist/node/axios.cjs:3069:11)\n    at Unzip.emit (node:events:526:35)\n    at endReadableNT (node:internal/streams/readable:1359:12)\n    at process.processTicksAndRejections (node:internal/process/task_queues:82:21)',
	config: {
		transitional: {
			silentJSONParsing: true,
			forcedJSONParsing: true,
			clarifyTimeoutError: false,
		},
		adapter: ['xhr', 'http'],
		transformRequest: [null],
		transformResponse: [null],
		timeout: 0,
		xsrfCookieName: 'XSRF-TOKEN',
		xsrfHeaderName: 'X-XSRF-TOKEN',
		maxContentLength: -1,
		maxBodyLength: -1,
		env: {},
		headers: {
			Accept: 'application/json, text/plain, */*',
			Authorization:'Authorization',
			partner: 'HUB-VENDAS-CARBON',
			'User-Agent': 'axios/1.6.5',
			'Accept-Encoding': 'gzip, compress, deflate, br',
		},
		method: 'get',
		url: 'https://apis-hml.portoseguro.brasil/re/celular/v1/calculo',
		params: { hash: 'e04785c4-4221-40b1-80d8-80e8f7a6efb9', codigoCanal: 58 },
	},
	code: 'ERR_BAD_RESPONSE',
	status: 500,
}

exports.GET_PORTABLE_DEVICE_API_ERROR_SCORE_SUPERAPP_RESPONSE = {
	inboundAttachmentNames: [],
	exceptionPayload: null,
	inboundPropertyNames: [],
	outboundAttachmentNames: [],
	outboundPropertyNames: [],
	payload: {
		hash: '1a90173d-b2df-4453-91e0-d2262051935d',
		numeroOrcExterno: 58000000010985,
		riscoAceito: true,
		scoreAceito: false,
		susepBloqueada: false,
		possuiCriticas: false,
		mensagem: 'Score abaixo do mínimo, sem ofertas.',
	},
	attributes: {
		headers: {},
		reasonPhrase: '',
		statusCode: 400,
	},
}

exports.controllerSuccess = (response) => {
	return {
		statusCode: 201,
		body: response,
	}
}

exports.controllerError = (error) => {
	return {
		statusCode: error.code || 500,
		body: {
			status: 'error',
			message: error.message || 'Unknown Server Error',
		},
	}
}

exports.CONTROLLER_SUCCESS_RESPONSE = {
	susepCode: 'CM208J',
	brokerName: 'Cleber Pereira',
	brokerEmail: 'cp@inexistentdomain.com',
	brokerPhone: '11900099999',
	idLead: 'fb4c687-a120-4f92-a138-7bbd43fa3ede',
	pescod: '123456',
	// quotation_data: GET_PORTABLE_DEVICE_API_SUCCESS_RESPONSE,
	quotations: RESPONSE_FACTORY_QUOTATIONS,
}

const VALID_QUOTATION_DATE = '2023-06-15T15:12:00.000Z'

exports.VALID_QUOTATION_DATE = () => {
	return VALID_QUOTATION_DATE
}

const INVALID_NULL_DATA = {}
exports.INVALID_NULL_DATA = INVALID_NULL_DATA

exports.FAKE_CERTIFICATES = [
	'`-----BEGIN CERTIFICATE-----<CERTIFICATE>-----END CERTIFICATE-----',
]

exports.FAKE_TOKEN = 'fakeToken'

exports.VALID_INPUT_DATA_WITH_COMMISSION_RATE = {
	...VALID_INPUT_DATA,
	portableDevice: {
		...VALID_INPUT_DATA.portableDevice,
		commissionRate: '20%',
	},
	activeSusepOriginLP: true,
}

exports.QUOTATION_FACTORY_PAYLOAD_RESPONSE_WITH_COMMISSION_RATE = {
	...QUOTATION_FACTORY_PAYLOAD_RESPONSE,
	corretor: {
		...QUOTATION_FACTORY_PAYLOAD_RESPONSE.corretor,
		codigoOperacao: '597',
	},
}

exports.QUOTATION_FACTORY_PAYLOAD_RESPONSE_WITH_COMMISSION_RATE_OTHER = {
	...QUOTATION_FACTORY_PAYLOAD_RESPONSE,
	corretor: {
		...QUOTATION_FACTORY_PAYLOAD_RESPONSE.corretor,
		codigoOperacao: '597',
	},
}

exports.QUOTATION_FACTORY_PAYLOAD_RESPONSE_WITH_SUSEP_FUNCIONARIO = {
	...QUOTATION_FACTORY_PAYLOAD_RESPONSE,
	corretor: {
		...QUOTATION_FACTORY_PAYLOAD_RESPONSE.corretor,
		susep: 'S5005J',
		codigoOperacao: '708',
	},
}

exports.VALID_RESPONSE_SEQUENCE_TABLE = () => {
	return {
		Attributes: {
			current_number: this.VALID_EXTERNAL_BUDGET_NUMBER,
		},
	}
}

exports.VALID_EXTERNAL_BUDGET_NUMBER = 1
