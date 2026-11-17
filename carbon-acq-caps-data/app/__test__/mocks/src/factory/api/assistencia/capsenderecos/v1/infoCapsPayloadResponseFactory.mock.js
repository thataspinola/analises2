const MOCKS = require('../../../../../../index.mock')

exports.GETPAYLOAD_VALID_RETURN = () => {
	return [
		{
			code: '10',
			name: 'BELA VISTA',
			address: 'RUA DR PENAFORTE MENDES, 132',
			district: 'BELA VISTA',
			city: 'SAO PAULO',
			state: 'SP',
			zipCode: '01308-010',
			areaCode: '11',
			phone: '3129-8525',
			companyName: "TATY'S CAR SERVIÇOS AUTOMOTIVOS LTDA",
			taxId: '04869840000146',
			workingSaturday: true,
			email: 'caps.belavistaporto@gmail.com',
			latitude: '-23.5316',
			longitude: '-46.6456',
			distance: '2 km',
			operatingHours: 'Seg. a sex. das 08h15 às 17h30 - Sáb. das 08h15 às 12h',
			operatesAtNight: false,
			electricCharger: 0,
			images: [
				{
					type: 'Fachada',
					url: '[https://assets-caps.portoseguro.com.br/6/imagens/fachada/3cc7e234-f77e-4816-8382-513541fe160b.png]',
				},
			],
		},
	]
}

exports.GETPAYLOAD_VALID_RETURN_WITHOUT_IMAGES = () => {
	return [
		{
			code: '10',
			name: 'BELA VISTA',
			address: 'RUA DR PENAFORTE MENDES, 132',
			district: 'BELA VISTA',
			city: 'SAO PAULO',
			state: 'SP',
			zipCode: '01308-010',
			areaCode: '11',
			phone: '3129-8525',
			companyName: "TATY'S CAR SERVIÇOS AUTOMOTIVOS LTDA",
			taxId: '04869840000146',
			workingSaturday: true,
			email: 'caps.belavistaporto@gmail.com',
			latitude: '-23.5316',
			longitude: '-46.6456',
			distance: '2 km',
			operatingHours: 'Seg. a sex. das 08h15 às 17h30 - Sáb. das 08h15 às 12h',
			operatesAtNight: false,
			electricCharger: 0,
			images: [],
		},
	]
}

exports.GETPAYLOAD_PARSEDJSON_VALID_INPUT = () => {
	return MOCKS.API_ASSISTENCIA_CAPSENDERECO_V1_INFOCAPS.GETCAPSINFOENDPOINT_VALID_RETURN()
}

exports.GETPAYLOAD_PARSEDJSON_VALID_INPUT_WITHOUT_IMAGES = () => {
	return MOCKS.API_ASSISTENCIA_CAPSENDERECO_V1_INFOCAPS.GETCAPSINFOENDPOINT_VALID_RETURN_WITHOUT_IMAGES()
}

exports.GETPAYLOAD_PARSEDJSON_VALID_INPUT_WITHOUT_NUMBER = () => {
	let data =
		MOCKS.API_ASSISTENCIA_CAPSENDERECO_V1_INFOCAPS.GETCAPSINFOENDPOINT_VALID_RETURN()
	return data.map((item) => {
		return { ...item, EmpresaLogradouroNumero: null }
	})
}
