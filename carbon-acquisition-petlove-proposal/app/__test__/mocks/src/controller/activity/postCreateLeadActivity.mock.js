const PROCESS_VALID_PARSEDJSON_INPUT_VALUE = {
	name: 'John Doe',
	email: 'johndoe@example.com',
	phone: '19981458065',
	address: {
		cep: '01310100',
		street: 'Avenida Paulista',
		number: '982',
		complement: 'Apto 30',
		city: 'São Paulo',
		state: 'SP',
	},
}

exports.PROCESS_VALID_PARSEDJSON_INPUT = () => {
	return PROCESS_VALID_PARSEDJSON_INPUT_VALUE
}

exports.API_SUPPORTCREATELEAD_POSTCREATELEAD_VALID_RETURN = () => {
	return {
		susepCode: 'CM056J',
		otherData: 'Some other data',
	}
}

exports.PROCESS_VALID_RETURN = () => {
	return {
		susepCode: 'CM056J',
		brokerEmail: 'diamante@aguiacorretagem.com.br',
		otherData: 'Some other data',
	}
}

exports.API_SUPPORTCREATELEAD_POSTCREATELEAD_ERROR_RETURN = () => {
	throw new Error('API failure')
}
