const get = require('lodash.get')
const find = require('lodash.find')
const orderby = require('lodash.orderby')
const factory = require('./index')
const CONSTANTS = require('../property')

exports.quotationSuccess = (ofertaResponse, dateOfBirth) => {
	let quotations = []
	let result = {
		statusCode: 200,
		body: {}
	}

	for (let item of ofertaResponse) {
		let planAmount = getPlanAmount(get(item, 'orcamento.coberturas'))
		
		let price = factory.price.getPrice(item)

		let quotation = {
			porto_quotation_id: get(item, 'orcamento.numeroOrcamento'),
			cpf: null,
			planAmount: planAmount,
			product_attributes: {
				budget_id: get(item, 'orcamento.numeroOrcamento'),
				name: CONSTANTS.PRODUCT_NAME,
				sku: CONSTANTS.PRODUCT_SKU,
				price: price,
				quotation_date: get(item, 'orcamento.dataCalculo'),
				initial_data: get(item, 'orcamento.vigenciaInicial'),
				offer_info: getOfferinfo(planAmount),
				labelDuration: CONSTANTS.PRODUCT_DURATION,
				labelBenefits: CONSTANTS.PRODUCT_BENEFITS,
				boost_difference: CONSTANTS.BOOST_DIFFERENCE,
				coverages: JSON.stringify(getCoverages(item.orcamento.coberturas)),
				payments: JSON.stringify(getPayments(item.parcelamentos)),
				recommendation: false,
			},
			quotation_data: JSON.stringify({
				date_of_birth: dateOfBirth,
				orcamento: item.orcamento,
				parcelamentos: item.parcelamentos,
			}),
		}

		quotations.push(quotation)
	}

	quotations = sortPlan(quotations)
	result.body = {quotations: quotations}

	return result
}

function sortPlan(quotations) {
	//Ordena os planos em orderm decrescente e marca o primeiro elemento da lista como recomendado
	if (quotations.length > 0) {
		quotations = orderby(quotations, 'planAmount', 'desc')
		quotations[0].product_attributes.recommendation = true

		for (let quotation of quotations) {
			//removido atributo planAmount que só foi criado para ordenar os planos
			delete quotation.planAmount

			quotation.product_attributes = JSON.stringify(
				quotation.product_attributes
			)
		}
	}

	return quotations
}

function getPlanAmount(coberturas) {
	let coverageBAS = find(coberturas, function (o) {
		return o.sigla == 'BAS'
	})

	return coverageBAS?.valor
}

function getOfferinfo(planAmount) {
	let info

	if (planAmount >= 1000) {
		let amount = planAmount / 1000
		info = `Cobertura R$ ${amount} mil`
	} else {
		info = `Cobertura R$ ${planAmount}`
	}

	return info
}

function getCoverages(coberturas) {
	let coverages = {}
	for (let item of coberturas) {
		let coverage = {}
		coverage[item.sigla] = {
			name: item.nome,
			description: item.descricao,
			special_observation: item.caracteristicaespecialvalor,
			amount: item.valor,
			grace_period: item.carencias,
			max_limit: item.limitemaximo,
			protection_type: item.tipoprotecao,
		}
		Object.assign(coverages, coverage)
	}

	return [coverages]
}

function getPayments(parcelamentos) {
	let payments = []

	for (let parcela of parcelamentos) {
		let payment = find(payments, function (o) {
			return o.code == parcela.codigo
		})

		if (!payment) {
			payment = {
				code: parcela.codigo,
				name: parcela.nomeFormaPagamento,
				description: parcela.descricao,
				quantity: [],
			}

			payments.push(payment)
		}

		payment.quantity.push({
			quantity: parcela.qtdParcelas,
			first_installment: parcela.valorPrimeiraParcela,
			other_installments: parcela.valorDemaisParcelas,
			discount: parcela.descontoAgravo,
			interest: parcela.juros,
		})
	}

	return payments
}