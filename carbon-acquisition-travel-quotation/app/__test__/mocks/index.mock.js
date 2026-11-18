exports.STRING_SERVICE = require('./service/stringService')
exports.QUOTATION_FACTORY = require('./factory/quotationFactory')

exports.VALID_INPUT_DATA = {
	susep: 'COL10J',
	isFromNewPdp: true,
	informacoes: [
		{
			codigo: 'DICIO_NOME',
			conteudo: ''
		},
		{
			codigo: 'TIPO_VIAGEM',
			conteudo: 'NACIONAL'
		},
		{
			codigo: 'ORIGEM',
			conteudo: 'Brasil'
		},
		{
			codigo: 'DESTINO',
			conteudo: 'Brasil'
		},
		{
			codigo: 'DICIO_DATA_SAIDA',
			conteudo: '2024-06-28'
		},
		{
			codigo: 'DICIO_DATA_RETORNO',
			conteudo: '2024-07-28'
		},
		{
			codigo: 'DICIO_AVENTURA',
			conteudo: false
		},
		{
			codigo: 'DICIO_MOTOCICLETA',
			conteudo: false
		},
		{
			codigo: 'DICIO_QTD_JOVENS',
			conteudo: '1'
		},
		{
			codigo: 'DICIO_QTD_IDOSOS',
			conteudo: '0'
		},
		{
			codigo: 'DICIO_CORRETAGEM',
			conteudo: '25'
		},
		{
			codigo: 'DICIO_CUPOM',
			conteudo: 'TESTEHUB15'
		}
	]
}

exports.TRACE_HEADER_ID = {
	headers : {
		'carbon-trace-id' : 'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11'
	}
}

exports.VALID_INPUT_DATA_ERROR = {
	susep: 'COL10J',
	informacoes: [
		{
			codigo: 'DICIO_NOME',
			conteudo: ''
		},
		{
			codigo: 'DICIO_MOTOCICLETA',
			conteudo: [{}]
		},
	]
}

exports.SENSIDIA_API_SUCCESS_RESPONSE = () => {[
	{
		orcamento: {
			tipoVigencia: "Determinado",
			vigenciaFinal: "2021-08-30",
			numeroOrcamento: "00144882",
			customizavel: true,
			contratantes: [{}]
		}
	}
]}

exports.API_DATA_QUOTACAO = {
	orcamento: {
		tipoVigencia: "Determinado",
		vigenciaFinal: "2021-08-30",
		numeroOrcamento: "00144882",
		customizavel: true,
		contratantes: [{}]
	}
}

exports.HANDLER_SUCCESS_RESPONSE = {
	isBase64Encoded: false,
	headers: this.TRACE_HEADER_ID.headers,
	statusCode: 201,
	body: JSON.stringify(this.API_DATA_QUOTACAO)
}

exports.HANDLER_ERROR_RESPONSE = {
	isBase64Encoded: false,
	headers: {"carbon-trace-id": "undefined"},
	statusCode: 500,
	body: JSON.stringify({
		status: 'error',
		message: 'Error'
	})
}