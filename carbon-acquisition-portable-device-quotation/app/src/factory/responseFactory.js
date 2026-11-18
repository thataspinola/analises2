const { logger } = require('../service')
const CONSTANTS = require('../property')

exports.quotationSuccess = (
	inputRequest,
	quotation,
	leadInformation,
	couponData
) => {
	try {
		const currentDate = new Date()
		const expirationDate = new Date(
			currentDate.getTime() + 5 * 24 * 60 * 60 * 1000
		)
		const response = {
			idLead: leadInformation.idLead,
			pescod: leadInformation.pescod,
			vdoCode: leadInformation.vdoCode,
			brokerData: {
				susep_code: leadInformation.susepCode,
				name: leadInformation.brokerName,
				email: leadInformation.brokerEmail,
				phone: leadInformation.brokerPhone,
			},
			productQuotationId: quotation.hash,
			numeroOrcExterno: quotation.numeroOrcExterno,
			valorAparelho: quotation.valorAparelho,
			valorAparelhoDepreciado: quotation.valorAparelhoDepreciado,
			riscoAceito: quotation.riscoAceito,
			scoreAceito: quotation.scoreAceito,
			susepBloqueada: quotation.susepBloqueada,
			possuiCriticas: quotation.possuiCriticas,
			mensagem: quotation.mensagem,
			quotationDate: currentDate.toISOString(),
			expirationDate: expirationDate.toISOString(),
			discountPercentage: couponData?.percentualDesconto,
			...(couponData && { isCouponValid: true }),
			...groupQuotationData(quotation, couponData),
		}
		return success(response)
	} catch (err) {
		logger.error(
			`Erro ao montar payload de resposta: ${err.message}`,
			err.stack
		)
		throw err
	}
}

exports.invalidCoupon = (message = 'invalid coupon') => ({
	statusCode: 200,
	body: {
		isCouponValid: false,
		message: message,
	},
})

const success = (bodyContent = {}) => ({
	statusCode: 200,
	body: bodyContent,
})

exports.error = (message, code = 500) => {
	const response = {
		statusCode: code,
		body: {
			status: 'error',
		},
	}

	if (message) {
		Object.assign(response.body, { message })
	}

	return response
}

exports.badRequestError = (message) => {
	return {
		statusCode: 400,
		body: {
			message,
		},
	}
}

const error = (message, code = 500) => ({
	statusCode: code,
	body: {
		status: 'error',
		message:
			message ||
			'Ocorreu um erro interno. Por favor, tente novamente mais tarde.',
	},
})

const badRequestError = (message) => ({
	statusCode: 400,
	body: {
		message: message || 'Requisição inválida.',
	},
})

const PACKAGE_NAMES = {
	1: 'Roubo',
	2: 'Quebra + Roubo',
	3: 'Quebra + Roubo + Perda de Aluguel',
}

const groupQuotationData = (quotation, couponData) => {
	if (!quotation || !quotation.pacotes) {
		return { quotations: [] }
	}

	const discountFactor = getDiscountFactor(couponData)

	const maxCodigoPacote = Math.max(
		...quotation.pacotes.map((p) => p.codigoPacote)
	)

	const quotations = quotation.pacotes
		.map((pacote) => {
			const packageName = PACKAGE_NAMES[pacote.codigoPacote]
			if (!packageName) return null

			const paymentOptions = groupPlansByInstallment(pacote.parcelas)

			const badge =
				pacote.codigoPacote === maxCodigoPacote
					? 'Melhor custo-benefício'
					: null
			return {
				name: packageName,
				packageCode: pacote.codigoPacote,
				budgetNumber: `${pacote.codigoPacote}-${pacote.codigoPlanoCobertura}`,
				coverages: getCoveragesTitles(pacote.coberturas),
				details: getCoveragesDescriptions(pacote.coberturas),
				badge: badge,
				couponDiscountPercentage: discountFactor
					? couponData.percentualDesconto
					: null,
				couponDescription: discountFactor ? couponData.descricao : null,
				paymentOptions: formatPaymentOptions(paymentOptions, discountFactor),
			}
		})
		.filter(Boolean) // Remove pacotes nulos
	quotations.sort((a, b) => b.packageCode - a.packageCode)
	return { quotations }
}

const roundMoney = (value) => parseFloat(value.toFixed(2))

const getDiscountFactor = (couponData) => {
	const percentage = couponData?.percentualDesconto
	if (typeof percentage !== 'number' || percentage <= 0 || percentage >= 100) {
		return null
	}
	return 1 - percentage / 100
}

const buildWithoutDiscountFields = (
	amount,
	firstInstallmentValue,
	remainingInstallmentsValue,
	discountFactor
) => {
	if (!discountFactor) {
		return {
			amount_without_discount: null,
			first_installment_value_without_discount: null,
			remaining_installments_value_without_discount: null,
			discount_percentage_amount: null,
		}
	}

	const amountWithoutDiscount = roundMoney(amount / discountFactor)
	return {
		amount_without_discount: amountWithoutDiscount,
		first_installment_value_without_discount: roundMoney(
			firstInstallmentValue / discountFactor
		),
		remaining_installments_value_without_discount: roundMoney(
			remainingInstallmentsValue / discountFactor
		),
		discount_percentage_amount: roundMoney(amountWithoutDiscount - amount),
	}
}

const groupPlansByInstallment = (parcelas) => {
	if (!parcelas) return {}
	return parcelas.reduce((acc, plano) => {
		const installments = plano.quantidadeParcela
		if (installments >= 1 && installments <= 12) {
			if (!acc[installments]) {
				acc[installments] = {}
			}
			if (
				plano.codigoPlanoParcelamentoSistemaPagamento ===
				CONSTANTS.PAYMENT_CODE_NORMAL
			) {
				acc[installments].normal = plano
			} else if (
				plano.codigoPlanoParcelamentoSistemaPagamento ===
				CONSTANTS.PAYMENT_CODE_PORTOCARD
			) {
				acc[installments].portoCard = plano
			}
		}
		return acc
	}, {})
}

const getPaymentPlanValue = (
	plans,
	installmentCount,
	paymentCode,
	valueKey
) => {
	const plan = plans[installmentCount]
	if (!plan) return null

	if (paymentCode === CONSTANTS.PAYMENT_CODE_NORMAL) {
		return plan.normal?.[valueKey]
	} else if (paymentCode === CONSTANTS.PAYMENT_CODE_PORTOCARD) {
		return plan.portoCard?.[valueKey]
	}
	return null
}

const getCoveragesTitles = (coverages) => coverages.map((c) => c.titulo)
const getCoveragesDescriptions = (coverages) =>
	coverages.map((c) => c.descricao)

const formatPaymentOptions = (groupedPlans, discountFactor) => {
	const options = []
	for (let i = 1; i <= 12; i++) {
		const planData = groupedPlans[i]
		if (!planData || !planData.normal) continue

		const { normal, portoCard } = planData

		const normalAmount =
			i === 1
				? normal.valorPrimeiraParcela
				: parseFloat(
						(
							normal.valorPrimeiraParcela +
							normal.valorDemaisParcelas * (i - 1)
						).toFixed(2)
				  )
		const portoCardAmount = portoCard
			? i === 1
				? portoCard.valorPrimeiraParcela
				: parseFloat(
						(
							portoCard.valorPrimeiraParcela +
							portoCard.valorDemaisParcelas * (i - 1)
						).toFixed(2)
				  )
			: null

		const item = {
			installments: i,
			first_installment_value: normal.valorPrimeiraParcela,
			remaining_installments_value: normal.valorDemaisParcelas,
			amount: normalAmount,
			iof: normal.iof,
			first_installment_value_without_iof: normal.valorSemIOF,
			encargos: normal.encargos,
			juros: normal.juros,
			...buildWithoutDiscountFields(
				normalAmount,
				normal.valorPrimeiraParcela,
				normal.valorDemaisParcelas,
				discountFactor
			),
		}

		if (portoCard) {
			item.porto_card_first_installment_value = portoCard.valorPrimeiraParcela
			item.porto_card_remaining_installments_value =
				portoCard.valorDemaisParcelas
			item.porto_card_amount = portoCardAmount
			item.porto_card_iof = portoCard.iof
			item.porto_card_first_installment_value_without_iof =
				portoCard.valorSemIOF
			item.porto_card_encargos = portoCard.encargos
			item.porto_card_juros = portoCard.juros
		}

		options.push(item)
	}
	return options
}
