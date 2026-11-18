exports.QUOTATION_REQUEST_PAYLOAD_INPUT_DATA = () => {
	return QUOTATION_REQUEST_PAYLOAD_INPUT_DATA
}

exports.QUOTATION_REQUEST_PAYLOAD_INPUT_DATA_WITH_CUPOM = () => {
	return {
		...QUOTATION_REQUEST_PAYLOAD_INPUT_DATA,
		portableDevice: {
			...QUOTATION_REQUEST_PAYLOAD_INPUT_DATA.portableDevice,
			coupon: 'TESTE',
		},
	}
}

exports.QUOTATION_REQUEST_PAYLOAD_INPUT_DATA_WITHOUT_SOCIAL_NAME = () => {
	return {
		...QUOTATION_REQUEST_PAYLOAD_INPUT_DATA,
		portableDevice: {
			...QUOTATION_REQUEST_PAYLOAD_INPUT_DATA.portableDevice,
			client: {
				...QUOTATION_REQUEST_PAYLOAD_INPUT_DATA.portableDevice.client,
				socialName: '',
			},
		},
	}
}

exports.VALID_INPUT_DATA_WITH_COMMISSION_RATE = () => {
	return {
		...QUOTATION_REQUEST_PAYLOAD_INPUT_DATA,
		portableDevice: {
			...QUOTATION_REQUEST_PAYLOAD_INPUT_DATA.portableDevice,
			commissionRate: '20%',
		},
		activeSusepOriginLP: true,
	}
}

const QUOTATION_REQUEST_PAYLOAD_INPUT_DATA = {
	portableDevice: {
		client: {
			cpf: '33994753813',
			name: 'Maria Santos',
			socialName: 'Maria Test',
			phone: '11222225555',
			email: 'email@dominio.com',
			zipCode: '02460-030',
		},
		productDetails: {
			offerCode: 5221,
			deviceTypeCode: 33,
			brandCode: 458,
			deviceModel: 'P50 Pro',
			acquisitionDate: '10/09/2024',
			acquisitionValue: 10023,
			rentedDevice: false,
		},
	},
}

exports.QUOTATION_REQUEST_PAYLOAD_RESPONSE = () => {
	return QUOTATION_REQUEST_PAYLOAD_RESPONSE
}

exports.QUOTATION_REQUEST_PAYLOAD_RESPONSE_WITH_CUPOM = () => {
	return {
		...QUOTATION_REQUEST_PAYLOAD_RESPONSE,
		cupom: {
			codigo: 'TESTE',
			percentualDesconto: 10,
		},
	}
}

exports.QUOTATION_REQUEST_PAYLOAD_RESPONSE_WITHOUT_SOCIAL_NAME = () => {
	const { nomeSocial, ...proponenteSemNomeSocial } =
		QUOTATION_REQUEST_PAYLOAD_RESPONSE.proponente
	return {
		...QUOTATION_REQUEST_PAYLOAD_RESPONSE,
		proponente: proponenteSemNomeSocial,
	}
}

exports.QUOTATION_REQUEST_PAYLOAD_RESPONSE_WITH_COMMISSION_RATE = () => {
	return {
		...QUOTATION_REQUEST_PAYLOAD_RESPONSE,
		corretor: {
			...QUOTATION_REQUEST_PAYLOAD_RESPONSE.corretor,
			codigoOperacao: '597',
		},
	}
}

exports.QUOTATION_REQUEST_PAYLOAD_RESPONSE_WITH_SUSEP_FUNCIONARIO = () => {
	return {
		...QUOTATION_REQUEST_PAYLOAD_RESPONSE,
		corretor: {
			...QUOTATION_REQUEST_PAYLOAD_RESPONSE.corretor,
			susep: 'S5005J',
			codigoOperacao: '708',
		},
	}
}

exports.QUOTATION_FACTORY_PAYLOAD_RESPONSE_WITH_COMMISSION_RATE_OTHER = () => {
	return {
		...QUOTATION_REQUEST_PAYLOAD_RESPONSE,
		corretor: {
			...QUOTATION_REQUEST_PAYLOAD_RESPONSE.corretor,
			codigoOperacao: '597',
		},
	}
}

const QUOTATION_REQUEST_PAYLOAD_RESPONSE = {
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

exports.GET_COUPON_API_SUCCESS_RESPONSE = () => {
	return {
		produto: 'celular',
		codigo: 'TESTE',
		inicio: '06-06-2024',
		fim: '20-06-2024',
		percentualDesconto: 10,
		ativo: true,
	}
}

const LEAD_INFORMATION = {
	susepCode: 'COL10J',
	idLead: 'hash123',
	vdoCode: '9999999999999',
	brokerName: '',
	brokerEmail: '',
	brokerPhone: '',
	pescod: 12345678,
	brokerId: null,
	activeSusepOriginLP: false,
}

exports.LEAD_INFORMATION = () => {
	return LEAD_INFORMATION
}

exports.LEAD_INFORMATION_ACTIVE_SUSEP_ORIGIN_LP = () => {
	return {
		...LEAD_INFORMATION,
		activeSusepOriginLP: true,
	}
}

exports.LEAD_INFORMATION_ACTIVE_SUSEP_ORIGIN_LP_SUSEP_S5005J = () => {
	return {
		...LEAD_INFORMATION,
		susepCode: 'S5005J',
		activeSusepOriginLP: true,
	}
}
