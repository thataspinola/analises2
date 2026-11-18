exports.GET_COUPON_API_SUCCESS_RESPONSE = () => {
	return {
		produto: 'celular',
		codigo: 'TESTE',
		inicio: '06-06-2024',
		fim: '20-06-2024',
		percentualDesconto: 10,
		ativo: true,
	}
}

exports.GET_COUPON_API_ERROR_404_RESPONSE = () => {
	return {
		codigo: 'INVALIDCOUPON',
		mensagem: 'Cupom não encontrado',
		produto: 'PortableDevice',
	}
}

exports.GET_COUPON_API_ERROR_400_RESPONSE = () => {
	return {
		produto: 'celular',
		codigo: 'INATIVO',
		inicio: '06-06-2024',
		fim: '20-06-2024',
		percentualDesconto: 10,
		ativo: false,
	}
}
