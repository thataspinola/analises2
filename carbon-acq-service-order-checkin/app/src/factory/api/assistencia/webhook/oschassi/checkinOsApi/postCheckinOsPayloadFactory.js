const MARITAL_STATUS_VALUE = '7'
const GENDER_VALUE = 'M'
const OCCUPATION_VALUE = '9'
const PAYMENT_METHOD_VALUE = 'CC'
const ORIGIN_SYSTEM_CODE = '36'
const DEFAULT_BIRTHDAY = '19900101'
const DEFAULT_PARENT_OS = ''
const DEFAULT_PAYMENT_TOKEN = ''
const DEFAULT_ITEM_QUANTITY = 1
const DEFAULT_SERVICE_CODE = '000001'

exports.getPayload = (parsedSnsSqsMessagePayload) => {
	const { customer, serviceAddress, serviceOrder } =
		parsedSnsSqsMessagePayload.integrationData
	const cellphone = customer.cellphone || ''

	const ddd = cellphone.substring(0, 2)
	const telefone = cellphone.substring(2)

	const isPix =  parsedSnsSqsMessagePayload?.transactionType?.toUpperCase() === 'PIX' 
    ? { formapagamento: "PIX", idpagamentopix: parsedSnsSqsMessagePayload?.transactionId } 
    : {};


	const scheduleStart = serviceOrder.schedule.startDateTime
	const dtagendamento = scheduleStart.substring(0, 10).replace(/-/g, '')
	const hragendamento = scheduleStart.substring(11, 19)

	return {
		codigoDocumento: customer.documentNumber,
		nome: customer.name,
		nomeSocial: customer.socialName || '',
		dataDeAniversario: DEFAULT_BIRTHDAY,
		email: customer.email,
		cep: serviceAddress.zipCode,
		ddd: ddd,
		telefone: telefone,
		genero: GENDER_VALUE,
		logradouro: serviceAddress.street,
		numero:
			serviceAddress.streetNumber === '' ? '0' : serviceAddress.streetNumber,
		complementoLogradouro: serviceAddress.additionalInfo || '',
		bairro: serviceAddress.neighborhood,
		cidade: serviceAddress.city,
		uf: serviceAddress.state,
		codigosusep: serviceOrder.susep,
		estadoCivil: MARITAL_STATUS_VALUE,
		ocupacao: OCCUPATION_VALUE,
		tokenpgto: DEFAULT_PAYMENT_TOKEN,
		osportosocorro:
			parsedSnsSqsMessagePayload.integrationData.serviceOrderNumber,
		osportosocorropai: DEFAULT_PARENT_OS,
		formapagamento: PAYMENT_METHOD_VALUE,
		dtagendamento: dtagendamento,
		hragendamento: hragendamento,
		codassunto: serviceOrder.subject,
		itensdaordem: [
			{
				codigoEspecialidade: serviceOrder.specialtyCode,
			},
		],
		Apontamentos: [
			{
				codigoprodutoapontamento: serviceOrder.sku,
				codigoservico: DEFAULT_SERVICE_CODE,
				quantidade: DEFAULT_ITEM_QUANTITY,
				valorunitario: parsedSnsSqsMessagePayload.amount,
				valortotal: parsedSnsSqsMessagePayload.amount,
				precolista: parsedSnsSqsMessagePayload.amount,
			},
		],
		codsistorigem: ORIGIN_SYSTEM_CODE,
		idexterno: parsedSnsSqsMessagePayload.externalId,
		...isPix
	}
}
