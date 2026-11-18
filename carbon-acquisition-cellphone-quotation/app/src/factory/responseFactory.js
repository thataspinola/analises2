const CouponApiError = require('../common/errors/CouponApiError')
const { PRODUCT_CODE, PRODUCT_STEP, DEFAULT_ERROR_CODE } = require('../property/index')

exports.controllerSuccess = (response) => {
	return {
		statusCode: 201,
		body: response,
	}
}

exports.controllerError = (error) => {
	const isCouponError = error instanceof CouponApiError
	return {
		statusCode: isCouponError ? error.statusCode : error.code || 500,
		body: {
			status: 'error',
			message: error.message || 'Unknown Server Error',
			code: isCouponError ? error.code : null,
			errorCode: error.errorCode || `${PRODUCT_CODE}${PRODUCT_STEP}${DEFAULT_ERROR_CODE}`
		},
	}
}

exports.quotationSuccess = (inputRequest, quotation, couponData) => {
	return {
		susepCode: inputRequest.susep,
		brokerName: inputRequest.brokerName,
		brokerEmail: inputRequest.brokerEmail,
		brokerPhone: inputRequest.brokerPhone,
		idLead: inputRequest.idLead,
		pescod: inputRequest.pescod,
		vdoCode: inputRequest.vdoCode,
		quotation_data: quotation,
		quotations: mountQuotations(quotation, couponData)
	}
}

function mountQuotations(quotation, couponData) {
	const pacotes = quotation.pacotes
	const quotations = []
	const currentDate = new Date()
	const expirationDate = new Date(
		currentDate.getTime() + 5 * 24 * 60 * 60 * 1000
	)

	pacotes.forEach((packageItem) => {
		const coverage = packageItem.coberturas
		const installments = packageItem.parcelas

		quotations.push({
			product_quotation_id: quotation.hash,
			product_attributes: {
				budget_number: `${packageItem.codigoPacote}-${packageItem.codigoPlanoCobertura}`, //codigoPacote - codigoPlanoCobertura
				name: `${getCoveragesName(packageItem.codigoPacote)}`,
				quotation_date: currentDate.toISOString(), //dataAtual
				expiration_date: expirationDate.toISOString(), //dataAtual + 5 dias
				coverages: getCoverages(coverage), //coberturas[].titulo
				details: getCoveragesDescription(coverage), //coberturas[].descricao
				installments: 12, //valor fixo
				first_installment_value: getFirstInstallmentValue(installments), //valorPrimeiraParcela quando codigoPlanoParcelamentoSistemaPagamento = 62 && quantidadeParcela = 12
				remaining_installments_value:
					getRemainingInstallmentValue(installments), //valorDemaisParcelas quando codigoPlanoParcelamentoSistemaPagamento = 62 && quantidadeParcela = 12
				amount: getAmount(installments), //valorPrimeiraParcela quando codigoPlanoParcelamentoSistemaPagamento = 62 && quantidadeParcela = 1
				porto_card_amount: getPortoCardAmount(installments), //valorPrimeiraParcela quando codigoPlanoParcelamentoSistemaPagamento = 97 && quantidadeParcela = 1, usar
				recommend_budget: packageItem.codigoPacote === 4, // true para o id 4
				discount_percentage: couponData?.percentualDesconto,
				amount_without_discount: getAmountWithoutDiscount(installments, couponData?.percentualDesconto),
				first_installment_value_without_discount: getFirstInstallmentValueWithoutDiscount(installments, couponData?.percentualDesconto),
				remaining_installments_value_without_discount: getRemainingInstallmentValueWithoutDiscount(installments, couponData?.percentualDesconto),
				coupon_description: couponData?.descricao,
				discount_percentage_amount: getDiscountPercentageAmount(installments, couponData?.percentualDesconto)
			},
		})
	})

	return quotations
}

function getCoverages(coverages) {
	return coverages.map((coverage) => coverage.titulo)
}

function getCoveragesName(codigoPacote) {
	switch (codigoPacote) {
		case 1:
			return 'Quebra acidental'
		case 2:
			return 'Roubo'
		case 3:
			return 'Quebra + roubo'
		case 4:
			return 'Quebra + roubo + furto simples'
		case 5:
			return 'Quebra + roubo + furto simples + transações digitais e Pix'
		default:
			break;
	}
}

function getCoveragesDescription(coverages) {
	return coverages.map((coverage) => coverage.descricao)
}

function getAmount(installment) {
	const installmentData = installment.find(
		(item) =>
			item.codigoPlanoParcelamentoSistemaPagamento === '62' &&
			item.quantidadeParcela === 1
	)

	return installmentData?.valorPrimeiraParcela
}

function getFirstInstallmentValue(installment) {
	const installmentData = installment.find(
		(item) =>
			item.codigoPlanoParcelamentoSistemaPagamento === '62' &&
			item.quantidadeParcela === 12
	)

	return installmentData?.valorPrimeiraParcela
}

function getRemainingInstallmentValue(installment) {
	const installmentData = installment.find(
		(item) =>
			item.codigoPlanoParcelamentoSistemaPagamento === '62' &&
			item.quantidadeParcela === 12
	)

	return installmentData?.valorDemaisParcelas
}

function getPortoCardAmount(installment) {
	const installmentData = installment.find(
		(item) =>
			item.codigoPlanoParcelamentoSistemaPagamento === '97' &&
			item.quantidadeParcela === 1
	)

	return installmentData?.valorPrimeiraParcela
}

function getAmountWithoutDiscount(installment, percentualDesconto) {
	const amount = getAmount(installment)

	if (amount && percentualDesconto) {
		return Number((amount / (1 - percentualDesconto / 100)).toFixed(2))
	}

	return Number(amount.toFixed(2))
}

function getFirstInstallmentValueWithoutDiscount(installment, percentualDesconto) {
	const firstInstallmentValue = getFirstInstallmentValue(installment)

	if (firstInstallmentValue && percentualDesconto) {
		return Number((firstInstallmentValue / (1 - percentualDesconto / 100)).toFixed(2))
	}

	return Number(firstInstallmentValue.toFixed(2))
}

function getRemainingInstallmentValueWithoutDiscount(installment, percentualDesconto) {
	const remainingInstallmentsValue = getRemainingInstallmentValue(installment)

	if (remainingInstallmentsValue && percentualDesconto) {
		return Number((remainingInstallmentsValue / (1 - percentualDesconto / 100)).toFixed(2))
	}

	return Number(remainingInstallmentsValue.toFixed(2))
}

function getDiscountPercentageAmount(installment, percentualDesconto) {
	return Number((getAmountWithoutDiscount(installment, percentualDesconto) - getAmount(installment)).toFixed(2))
}