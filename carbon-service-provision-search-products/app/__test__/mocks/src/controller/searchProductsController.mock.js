const MOCKS_FACTORY_RESPONSE = require('../factory/searchProductsControllerResponse.mock')

const PROCESS_VALID_PARSEDJSON_INPUT_VALUE = {
	type: 'all',
	value:
		'LI001, ER006, EC100, HR015, HC100, LD001, DI001, DI002, DI003, DE001, LR003, LR006, LR011, LR005, PR004',
}

exports.PROCESS_EXCEPTION_SIMULATE_VALID_PARSEDJSON_INPUT = () => {
	return {
		type: 'all',
		value: 'Except',
	}
}

exports.PROCESS_EXCEPTION_SIMULATE_MESSAGE = () => {
	return `Erro recebido da chamada da API: código '500' dados: '{ "message": "Simulação de falha" }'`
}

exports.PROCESS_VALID_PARSEDJSON_INPUT = () => {
	return PROCESS_VALID_PARSEDJSON_INPUT_VALUE
}

exports.PROCESS_INVALID_PARSEDJSON_INPUT = () => {
	const PROCESS_INVALID_PARSEDJSON_INPUT_VALUE = {
		...PROCESS_VALID_PARSEDJSON_INPUT_VALUE,
	}
	delete PROCESS_INVALID_PARSEDJSON_INPUT_VALUE.value
	return PROCESS_INVALID_PARSEDJSON_INPUT_VALUE
}

exports.PROCESS_INVALID_JSON_INPUT_EXCEPTION_MESSAGE = () => {
	return 'Erro no processamento: Validation'
}

exports.PROCESS_UNEXPECTED_INPUT_VALIDATION_EXCEPTION_MESSAGE = () => {
	return 'Erro no processamento: Unexpected validation error'
}

exports.PROCESS_VALID_RETURN = (body) => {
	const validReturn = MOCKS_FACTORY_RESPONSE.SUCCESS_RETURN()
	return {...validReturn, body: body ?? validReturn.body}
}

exports.PROCESS_INTERNALERROR_RETURN = () => {
	return MOCKS_FACTORY_RESPONSE.ERROR_WITH_MESSAGE_RETURN()
}

exports.PROCESS_BADREQUEST_RETURN = () => {
	return MOCKS_FACTORY_RESPONSE.BAD_REQUEST_ERROR_WITH_MESSAGE_RETURN()
}

exports.PROCESS_GENERIC_EXCEPTION_MESSAGE_BEGINNING = (errorMessage) => {
	return `Erro no processamento: ${errorMessage}`
}

exports.MOCK_CATEGORIES = () => {
	return [
		{
			category: 'Conserto',
			icon: 'icon-porto-ic-wrench-tool',
			menu: 'CASA',
			products: [
				{ description: 'RESIDENCIA', id: 28, sku: ['LI001', 'L9883'] },
			],
		},
		{
			category: 'Hidráulica',
			icon: 'icon-tap',
			menu: 'CASA',
			products: [{ description: 'RESIDENCIA', id: 28, sku: ['LI001'] }],
		},
		{
			category: 'Elétrica',
			icon: 'icon-porto-ic-flash',
			menu: 'CASA',
			products: [{ description: 'RESIDENCIA', id: 28, sku: ['LI001'] }],
		},
		{
			category: 'Limpeza',
			icon: 'icon-porto-ic-armchair',
			menu: 'CASA',
			products: [{ description: 'RESIDENCIA', id: 28, sku: ['LI001'] }],
		},
		{
			category: 'Instalação e Fixação',
			icon: 'icon-porto-ic-drill',
			menu: 'CASA',
			products: [{ description: 'RESIDENCIA', id: 28, sku: ['LI001'] }],
		},
		{
			category: 'Manutenção',
			icon: 'icon-porto-ic-tools',
			menu: 'CASA',
			products: [{ description: 'RESIDENCIA', id: 28, sku: ['LI001'] }],
		},
		{
			category: 'Chaveiro',
			icon: 'icon-porto-ic-key',
			menu: 'CASA',
			products: [{ description: 'RESIDENCIA', id: 28, sku: ['LI001'] }],
		},
		{
			category: 'Remoção',
			icon: 'icon-porto-ic-car1',
			menu: 'AUTO',
			products: [
				{ description: 'APOIO_AUTO', id: 266, sku: ['00022', 'A9883'] },
			],
		},
		{
			category: 'Chaveiro',
			icon: 'icon-porto-ic-key',
			menu: 'AUTO',
			products: [
				{ description: 'APOIO_AUTO', id: 266, sku: ['00022', 'A9883'] },
				{ description: 'APOIO_TAXI', id: 292, sku: ['00023', 'A9887'] },
			],
		},
		{
			category: 'Carregador',
			icon: 'icon-porto-ic-flash',
			menu: 'AUTO',
			products: [
				{ description: 'APOIO_AUTO', id: 266, sku: ['00022', 'A9883'] },
			],
		},
	]
}
