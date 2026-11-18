exports.getPriceByCalculations = (data) => {
    const found = data?.find(item =>
        item.precificacao?.descontoAgravo?.some(itemAgravo => 
            itemAgravo.tipo === 'FPG' && itemAgravo.percentual === 0
        )
    )

    return found?.precificacao?.premio?.total || null
}

exports.getPriceByInstallment = (data) => {
    if(data === null) return null

    const found = data?.find(parcelamento => 
        parcelamento?.descontoAgravo === 0 && parcelamento?.qtdParcelas === 1 
    )

    return found?.valorPrimeiraParcela || null
}

exports.getPrice = (data) => {
	let price = this.getPriceByCalculations(data?.calculos)

	if(price) return price

	price = this.getPriceByInstallment(data?.parcelamentos)

	return price ? price : 0.1
}