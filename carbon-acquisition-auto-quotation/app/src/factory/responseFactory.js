const { BusinessError, VehicleApiError } = require('../error')
const CONSTANT = require('../property')
const { logger } = require('../../config')

exports.quotationSuccess = (inputRequest, quotation, cartId) => {
	const { susepCode, idLead, typeUse } = inputRequest.auto
	return {
		susepCode: susepCode,
		idLead: idLead,
		pescod: inputRequest.pescod,
		quotations: mountQuotations(quotation, cartId, typeUse),
		quotation_data: quotation,
	}
}

exports.quotationError = (
	statusCotacao = null,
	statusCode = 400,
	stack = null
) => {
	const businessError = new BusinessError(statusCotacao, statusCode, stack)
	throw businessError
}

function mountQuotations(quotation, cartId, typeUse) {
	try {
		const budgets = getBudgets(quotation.orcamentos)

		const installment = quotation.parcelamento

		return budgets.map((budget) => {
			const segmentCode =
				budget.item?.produtoComercial?.segmento?.codigoSegmento
			const isApa = Number(segmentCode) === CONSTANT.AZUL_SEGMENT_CODES.APA

			const portoCardInstallmentData = getPortoCardInstallments(
				installment,
				budget.codigo
			)

			const portoCardInstallments = portoCardInstallmentData?.parcelamentos

			const portoCardInstallmentValues = getPortoCardInstallmentValues(
				portoCardInstallments
			)

			const otherCardsInstallmentData = getOrderCardsInstallments(
				installment,
				budget.codigo
			)

			const otherCardValues = getOtherCardsInstallmentValues(
				otherCardsInstallmentData
			)
			const isFirstPaymentDiscount =
				portoCardInstallmentData?.tipoClasseCalculoPremio === 2 ? true : false

			const portoDiscount = getDiscount(budget)
			const otherDiscount = getOtherDiscount(budget)

			const portoCardInstallmentsTotal = isApa
				? getTotalInstallment(otherCardsInstallmentData)
				: getPortoCardTotalInstallments(portoCardInstallments)

			const portoCardAmount = isApa
				? getAmount(
						otherCardValues.last_installment_value,
						otherCardsInstallmentData
				  )
				: getPortoCardAmount(portoCardInstallments)

			const portoCardDiscountPercentage = isApa ? otherDiscount : portoDiscount

			const portoCardDiscountPercentageTotal = isApa
				? getTotalDiscount(otherDiscount, budget)
				: getTotalDiscount(portoDiscount, budget)

			const portoCardFirstInstallmentValue = isApa
				? otherCardValues.first_installment_value
				: portoCardInstallmentValues.porto_card_first_installment_value

			const portoCardLastInstallmentValue = isApa
				? otherCardValues.last_installment_value
				: portoCardInstallmentValues.porto_card_last_installment_value

			return {
				porto_quotation_id: quotation.numeroCotacao,
				quotation_date: quotation.dataCriacao,
				expiration_date: quotation.dataValidade,
				product_attributes: {
					budget_number: budget.codigo?.toString(),
					name: getName(budget),
					start_date: budget.inicioVigencia,
					end_date: budget.fimVigencia,
					coverages: getCoverages(budget, typeUse),
					coverage_items: getPlanCompare(budget),
					amount: getAmount(
						otherCardValues.last_installment_value,
						otherCardsInstallmentData
					),
					installments: getTotalInstallment(otherCardsInstallmentData),
					porto_card_installments: portoCardInstallmentsTotal,
					porto_card_amount: portoCardAmount,
					porto_card_discount_percentage: portoCardDiscountPercentage,
					porto_card_discount_percentage_total:
						portoCardDiscountPercentageTotal,
					porto_card_first_installment_value: portoCardFirstInstallmentValue,
					porto_card_last_installment_value: portoCardLastInstallmentValue,
					other_card_discount_percentage: otherDiscount,
					recommend_budget: budget.tipoOferta?.codigo === budget.codigo,
					itau_account_type: getItauAccountType(budget),
					itau_discount_percentage: getItauDiscountPercentage(budget),
					first_installment_value: otherCardValues.first_installment_value,
					last_installment_value: otherCardValues.last_installment_value,
					isFirstPaymentDiscount: isFirstPaymentDiscount,
					company_code: budget.item?.produtoComercial?.segmento?.codigoMarca,
					segment_code: segmentCode,
					shopping_token: cartId,
				},
			}
		})
	} catch (error) {
		if (error instanceof TypeError) {
			const apiDataError = new VehicleApiError(
				CONSTANT.VEHICLE_API_DATA_ERROR_MESSAGE,
				500,
				error.stack
			)

			logger.error(
				{
					message: apiDataError.message,
					statusCode: apiDataError.code,
				},
				CONSTANT.VEHICLE_API_DATA_ERROR_MESSAGE
			)

			throw apiDataError
		}
	}
}

function getPartsCoverage(codigoMarca, codigoSegmento) {
	if (
		codigoMarca === CONSTANT.BRAND_CODES.AZUL &&
		(codigoSegmento === CONSTANT.AZUL_SEGMENT_CODES.COMPACTO ||
			CONSTANT.AZUL_SEGMENT_CODES.MOTO_AZUL.includes(codigoSegmento))
	) {
		return 'Peças novas de reposição'
	}
	if (
		codigoMarca === CONSTANT.BRAND_CODES.AZUL &&
		codigoSegmento === CONSTANT.AZUL_SEGMENT_CODES.ROUBO_E_FURTO
	) {
		return undefined
	}
	if (
		codigoMarca === CONSTANT.BRAND_CODES.ITAU &&
		codigoSegmento === CONSTANT.ITAU_SEGMENT_CODES.COMPACTO
	) {
		return undefined
	}
	return 'Peças originais'
}

function getDiscountPercentage(segmentCode, typeUse) {
	if (
		typeUse === CONSTANT.APP_DRIVER_CODE ||
		CONSTANT.EIGHTY_PERCENT_DISCOUNT_LIST_CODES.includes(segmentCode)
	) {
		return '80%'
	} else if (
		CONSTANT.EIGHTY_FIVE_PERCENT_DISCOUNT_LIST_CODES.includes(segmentCode)
	) {
		return '85%'
	} else if (
		CONSTANT.NINETY_PERCENT_DISCOUNT_LIST_CODES.includes(segmentCode)
	) {
		return '90%'
	} else {
		return '100%'
	}
}

function getPlanCompare(budget, typeUse) {
	const coveragesCodes = new Set(budget.item.coberturas.map((c) => c.codigo))

	const mainCoverageCode = Object.keys(CONSTANT.MAIN_COVERAGES)
		.map(Number)
		.find((codigo) => coveragesCodes.has(codigo))

	let coverages = Object.values(CONSTANT.MAIN_COVERAGES_MAPPING).map(
		({ description, codes }) => ({
			description,
			isIncluded: codes.includes(mainCoverageCode),
		})
	)

	coverages.push(
		...Object.entries(CONSTANT.COVERAGES).map(([codigo, descricao]) => ({
			description: descricao,
			isIncluded: coveragesCodes.has(Number(codigo)),
		}))
	)

	const { codigoMarca, codigoSegmento } = budget.item.produtoComercial.segmento

	const partsCoverage = getPartsCoverage(codigoMarca, codigoSegmento)

	coverages.push({
		description: partsCoverage || 'Sem troca de peças',
		isIncluded: !!partsCoverage,
	})

	const indemnityCoverage = `Indenização máxima (FIPE) ${getDiscountPercentage(
		codigoSegmento,
		typeUse
	)}`

	coverages.push({
		description: indemnityCoverage,
		isIncluded: true,
	})

	return coverages
}

function getCoverages(budget, typeUse) {
	const coverages = budget.item.coberturas
		.map(
			(item) =>
				CONSTANT.MAIN_COVERAGES[item.codigo] ||
				CONSTANT.COVERAGES[item.codigo] ||
				item.descricao
		)
		.join('; ')

	const { codigoMarca, codigoSegmento } = budget.item.produtoComercial.segmento

	const partsCoverage = getPartsCoverage(codigoMarca, codigoSegmento)

	const indemnityCoverage = `Indenização máxima (FIPE) ${getDiscountPercentage(
		codigoSegmento,
		typeUse
	)}`

	return {
		description: [coverages, partsCoverage, indemnityCoverage]
			.filter(Boolean)
			.join('; '),
	}
}

function getAmount(lastInstallmentValue, installmentData) {
	const parcelamentos = installmentData?.parcelamentos

	if (!parcelamentos || parcelamentos.length === 0) {
		return 0
	}

	const installmentNumbers = parcelamentos.map(p => p.numero)

	const numberOfInstallments = Math.max(...installmentNumbers)

	const valueWithoutDiscount = lastInstallmentValue * numberOfInstallments

	return Number(valueWithoutDiscount.toFixed(2))
}

function getPortoCardAmount(installment) {
	const installments = installment?.find((item) => item.numero === 1)

	return parseFloat(installments?.valor.replace(',', '.'))
}

function getTotalInstallment(installments) {
	let lastInstallment = installments?.parcelamentos.reduce((max, installment) =>
		max.numero > installment.numero ? max : installment
	)

	return lastInstallment.numero
}

function getPortoCardTotalInstallments(installments) {
	let lastInstallment = installments?.reduce((max, installment) =>
		max.numero > installment.numero ? max : installment
	)

	return lastInstallment?.numero
}

function getDiscount(budget) {
	const autoConsumerDiscount = budget.item.descontos?.find(
		(desconto) => desconto.codigo === CONSTANT.AUTO_CONSUMER_DISCOUNT_CODE
	)
	const discountPercentage = autoConsumerDiscount
		? autoConsumerDiscount.percentual
		: 0

	return discountPercentage
}

function getTotalDiscount(portoDiscountPercentage, budget) {
	const cashPaymentDiscount = budget.item.descontos?.find(
		(desconto) => desconto.codigo === CONSTANT.CASH_PAYMENT_DISCOUNT_CODE
	)

	const cashPaymentDiscountPercentage = cashPaymentDiscount
		? cashPaymentDiscount.percentual
		: 0

	const totalDiscount = [
		portoDiscountPercentage,
		cashPaymentDiscountPercentage,
	].includes(0)
		? 0
		: portoDiscountPercentage + cashPaymentDiscountPercentage

	return totalDiscount
}

function getOtherDiscount(budget) {
	const otherCardDiscount = budget.item.descontos?.find(
		(desconto) => desconto.codigo === CONSTANT.OTHER_CARD_DISCOUNT_CODE
	)
	const discountPercentage = otherCardDiscount
		? otherCardDiscount.percentual
		: 0

	return discountPercentage
}

function getItauDiscount(budget) {
	return budget.item.descontos.find(
		(item) => item.codigo === CONSTANT.AUTO_ITAU_DISCOUNT_CODE
	)
}

function getItauAccountType(budget) {
	const itauDiscount = getItauDiscount(budget)

	if (!itauDiscount) return

	const accountTypes = CONSTANT.AUTO_ITAU_ACCOUNT_TYPES

	return accountTypes[itauDiscount.percentual] ?? 'Itaú'
}

function getItauDiscountPercentage(budget) {
	const itauDiscount = getItauDiscount(budget)

	if (!itauDiscount) return

	return itauDiscount?.percentual
}

function getPortoCardInstallments(installment, budgetNumber) {
	let installmentData = installment?.find(
		(item) =>
			item.codigoFormaPagamento === CONSTANT.PORTO_CARD &&
			item.tipoClasseCalculoPremio === CONSTANT.ID_FOR_DISCOUNT_PORTO_CARD &&
			item.codigoOrcamento === budgetNumber
	)

	//Se não existir desconto para cartão porto, devolve preço sem desconto
	if (!installmentData) {
		installmentData = installment?.find(
			(item) =>
				item.codigoFormaPagamento === CONSTANT.PORTO_CARD &&
				item.tipoClasseCalculoPremio ===
					CONSTANT.ID_FOR_NO_DISCOUNT_PORTO_CARD &&
				item.codigoOrcamento === budgetNumber
		)
	}

	return installmentData
}

function getPortoCardInstallmentValues(installments) {
	const values = {}

	values.porto_card_first_installment_value = installments?.reduce(
		(prev, current) =>
			prev.numero < current.numero
				? parseFloat(prev.valor.replace(',', '.'))
				: parseFloat(current.valor.replace(',', '.'))
	)
	values.porto_card_last_installment_value = installments?.reduce(
		(prev, current) =>
			prev.numero > current.numero
				? parseFloat(prev.valor.replace(',', '.'))
				: parseFloat(current.valor.replace(',', '.'))
	)

	return values
}

function getOrderCardsInstallments(installment, budgetNumber) {
	const installmentOtherCardsData = installment.find(
		(item) =>
			item.codigoFormaPagamento === CONSTANT.OTHERS_CARDS &&
			item.codigoOrcamento === budgetNumber
	)

	return installmentOtherCardsData
}

function getOtherCardsInstallmentValues(installments) {
	const parcelamentos = installments?.parcelamentos

	if (!parcelamentos || parcelamentos.length === 0) {
		return {
			first_installment_value: undefined,
			last_installment_value: undefined,
		}
	}

	const sortedInstallments = [...parcelamentos].sort(
		(a, b) => a.numero - b.numero
	)

	const firstInstallment = sortedInstallments[0]
	const lastInstallment = sortedInstallments[sortedInstallments.length - 1]

	return {
		first_installment_value: parseFloat(firstInstallment.valor.replace(',', '.')),
		last_installment_value: parseFloat(lastInstallment.valor.replace(',', '.')),
	}
}

function getName(budget) {
	const { codigoMarca, codigoSegmento } = budget.item.produtoComercial.segmento
	return (
		CONSTANT.SEGMENTS_NAMES[codigoMarca]?.[codigoSegmento] ??
		CONSTANT.BRAND_NAMES[codigoMarca]
	)
}

function getBudgets(budgets) {
	const permittedBrandCodes = Object.values(CONSTANT.BRAND_CODES)
	return budgets
		.filter((budget) =>
			permittedBrandCodes.includes(
				budget.item.produtoComercial.segmento.codigoMarca
			)
		)
		.sort((a, b) => {
			const codeA = a.item.produtoComercial.segmento.codigoMarca
			const codeB = b.item.produtoComercial.segmento.codigoMarca
			return (
				permittedBrandCodes.indexOf(codeA) - permittedBrandCodes.indexOf(codeB)
			)
		})
}
