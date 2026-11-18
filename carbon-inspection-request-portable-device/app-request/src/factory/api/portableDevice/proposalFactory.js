const CONSTANTS = require('../../../property')
const service = require('../../../service')

exports.makePayload = async (
	integrationData,
	amount,
	installments,
	externalId,
	charges
) => {
	const enderecosAtualizados = integrationData.proponente.enderecos.map(
		(endereco) => ({
			...endereco,
			tipoLogradouro: getTipoLogradouro(endereco.logradouro),
			latitude: endereco.latitude || 41.19301,
			longitude: endereco.longitude || 41.19301,
			numero: endereco.numero || 0,
		})
	)
	const payload = {
		correlationId: integrationData.correlationId,
		vdoCode: integrationData.vdoCode,
		pacote: 1,
		codigoCanal: integrationData.codigoCanal,
		codigoOferta: integrationData.codigoOferta,
		brokerData: integrationData.brokerData,
		proponente: {
			...integrationData.proponente,
			nomePessoa: service.string.removeAccents(integrationData.proponente?.nomePessoa),
			nomeSocial: integrationData.proponente?.nomeSocial ?
				service.string.removeAccents(integrationData.proponente.nomeSocial) : null,
			codigoOcupacao: CONSTANTS.CODIGO_OCUPACAO,
			descricaoOcupacao: CONSTANTS.DESCRICAO_OCUPACAO,
			enderecos: enderecosAtualizados,
		},
		pagamento: getPagamento(
			integrationData,
			installments,
			amount,
			charges,
			externalId
		),
		itens: [
			{
				numeroItem: 1,
				pacote: integrationData.pacote,
				numeroSerie: integrationData.numeroSerie,
				nomeModelo: integrationData.nomeModelo,
			},
		],
	}

	return payload
}

/**
 * Normaliza uma string de texto, removendo acentos e convertendo para minúsculas.
 * @param {string} text - O texto a ser normalizado.
 * @returns {string} - O texto normalizado.
 */
function normalizeText(text) {
	if (!text) return ''
	return text
		.normalize('NFD')
		.replace(/[\u0300-\u036f]/g, '')
		.toUpperCase()
		.trim()
}

/**
 * Pega o tipo de logradouro abreviado a partir do início da string do logradouro.
 * @param {string} logradouro - A string completa do logradouro (ex: "R Artur Bernardes").
 * @returns {string|null} - O tipo de logradouro abreviado (ex: "R") ou null se não for encontrado.
 */
function getTipoLogradouro(logradouro) {
	if (!logradouro) {
		return null
	}

	const normalizedLogradouro = normalizeText(logradouro)

	// 1. Coleta todas as chaves (nomes completos) do mapa
	const logradouroKeys = Object.keys(CONSTANTS.TIPO_LOGRADOURO_MAP)

	// 2. Coleta todos os valores (abreviações) do mapa e garante que sejam únicos
	const logradouroValues = [
		...new Set(Object.values(CONSTANTS.TIPO_LOGRADOURO_MAP)),
	]

	// 3. Combina as chaves e os valores, criando uma lista de TODOS os possíveis inícios
	const allPossibleStarts = [...logradouroKeys, ...logradouroValues]

	// 4. Cria um mapa reverso para buscar o valor abreviado a partir de um nome completo
	// ou simplesmente usar o valor como abreviação se for o caso
	const startsMap = {}

	// Preenche o mapa com Nome Completo -> Abreviacão
	for (const [key, value] of Object.entries(CONSTANTS.TIPO_LOGRADOURO_MAP)) {
		startsMap[key] = value // Ex: 'Rua' -> 'R'
	}

	// Preenche o mapa com Abreviacão -> Abreviacão (para o caso de o input já ser abreviado)
	for (const value of logradouroValues) {
		// Usa a própria abreviação como valor para o caso de o logradouro começar pela abreviação
		// Ex: 'R' -> 'R'
		startsMap[value] = value
	}

	// 5. Ordena os possíveis inícios do mais longo para o mais curto.
	// Isso é crucial para garantir que "Entrada Particular" seja testado antes de "Entrada"
	// e "Rua" antes de "R".
	allPossibleStarts.sort((a, b) => b.length - a.length)

	for (const tipoDeInicio of allPossibleStarts) {
		// Normaliza o tipo de início para comparação (remove acentos, caixa alta)
		const normalizedTipo = normalizeText(tipoDeInicio)

		// Verifica se a string do logradouro começa com o tipo de início,
		// e se o próximo caractere é um espaço ou o fim da string.
		if (
			normalizedLogradouro.startsWith(normalizedTipo) &&
			(normalizedLogradouro.length === normalizedTipo.length ||
				normalizedLogradouro[normalizedTipo.length] === ' ')
		) {
			// Se encontrou, retorna o valor abreviado, que está mapeado no 'startsMap'
			return startsMap[tipoDeInicio]
		}
	}

	// Retorna null se não encontrar nenhum tipo de logradouro correspondente
	return null
}

/**
 * Pega o objeto de opções de pagamento correspondente ao número de parcelas.
 * @param {object} integrationData - O objeto de integração contendo paymentOptions.
 * @param {number} installments - O número de parcelas a ser buscado.
 * @returns {object|null} - O objeto de pagamento correspondente ou null se não encontrado.
 */
function getPaymentOption(integrationData, installments) {
	if (
		!integrationData ||
		!integrationData.paymentOptions ||
		!Array.isArray(integrationData.paymentOptions)
	) {
		return null
	}

	// Procura a opção de pagamento que corresponde ao número de parcelas
	const paymentOption = integrationData.paymentOptions.find(
		(option) => option.installments === installments
	)

	// Se o amount da opção for igual ao valor total, isso é o valor 'cheio' do seguro.
	// É mais robusto verificar 'amount' ou outro campo que seja confiável.
	// Como você está passando 'amount' e 'installments', vou focar em buscar pela 'installments'.

	return paymentOption || null
}

/**
 * Constrói o payload para a seção de pagamento.
 * Puxa os dados dinâmicos de 'iof' e 'encargos' do 'integrationData.paymentOptions'
 * com base no número de parcelas.
 *
 * @param {object} integrationData - O objeto de integração.
 * @param {number} amount - O valor total.
 * @param {number} installments - O número de parcelas.
 * @param {string} externalId - O ID externo (numeroOrcamento).
 * @param {object} charges - O objeto charges para extrair dados do cartão.
 * @returns {object} - O objeto de pagamento formatado.
 */
function getPagamento(
	integrationData,
	installments,
	amount,
	charges,
	externalId
) {
	// Busca a opção de pagamento correspondente
	const paymentOption = getPaymentOption(integrationData, installments)

	if (paymentOption.amount == amount) {
		return {
			encargos: paymentOption.encargos,
			iof: paymentOption.iof,
			juros: paymentOption.juros,
			parcela: installments,
			codigoPagamento: CONSTANTS.PAYMENT_CODE_NORMAL,
			valor: amount,
			valorReais: amount,
			cartao: {
				tokenCartao: charges[0].creditCard.id,
				bandeira: getBandeira(charges[0].creditCard.flag),
			},
			numeroOrcamento: externalId,
		}
	} else if (paymentOption.porto_card_amount == amount) {
		return {
			encargos: paymentOption.porto_card_encargos,
			iof: paymentOption.porto_card_iof,
			juros: paymentOption.porto_card_juros,
			parcela: installments,
			codigoPagamento: CONSTANTS.PAYMENT_CODE_PORTOCARD,
			valor: amount,
			valorReais: amount,
			cartao: {
				tokenCartao: charges[0].creditCard.id,
				bandeira: getBandeira(charges[0].creditCard.flag),
			},
			numeroOrcamento: externalId,
		}
	}

	return null
}

/**
 * Traduz a bandeira do cartão de crédito (string) para o código numérico do domínio.
 *
 * @param {string} flag - O nome da bandeira do cartão (ex: "VISA", "MASTERCARD").
 * @returns {number} - O código numérico da bandeira.
 */
function getBandeira(flag) {
	if (typeof flag !== 'string') {
		return 3
	}
	const normalizedFlag = flag.toUpperCase().trim()
	switch (normalizedFlag) {
		case 'VISA':
			return 1
		case 'MASTERCARD':
			return 2
		default:
			return 3
	}
}
