const handler = require('../..')
const uuid = require('uuid')
// const geradorCpf = require('./generator')

const {
	DYNAMICS_LIBRARY_LOCATION,
	TOKEN_LIBRARY_LOCATION,
} = require('../../src/property')

const tokenLayer = require(TOKEN_LIBRARY_LOCATION)
const dynamicsLayer = require(DYNAMICS_LIBRARY_LOCATION)

const mockedCreateLeadToBeUpdateData = {
	nome: 'José Silva',
	nomeSocial: null,
	email: 'josilva@somedomain.com',
	cpf: '09560074067',
	cnpj: '',
	ddd_residencial: '11',
	tel_residencial: '999999888',
	cep: '69900-001',
	lgpd: {
		marketing: 'true',
		aceite: 'true',
		compartilhamento: 'true',
		consentimento: 'true',
		data_aceite: '2023-05-17',
		channel: 'landingpage',
		domain: 'http://portoseguro.com.br',
		environmentType: 'Site',
	},
	id_produto: '32',
	id_ramo: 303,
	codigo_vdo: '1692191922',
	id_tipo_produto: '',
	origem: '3',
	referencia: 'Long',
}

const runner = async () => {
	try {
		// const SENSEDIA_CLOUD_TOKEN = await tokenLayer.getSensediaTokenHubCloud()
		// await dynamicsLayer.createLead(
		// 	mockedCreateLeadToBeUpdateData,
		// 	SENSEDIA_CLOUD_TOKEN
		// )

		const mockedLocalData = {
			body: JSON.stringify({
				codigo_vdo: mockedCreateLeadToBeUpdateData.codigo_vdo,
				id_ramo: mockedCreateLeadToBeUpdateData.id_ramo,
				nomeSocial: mockedCreateLeadToBeUpdateData.nomeSocial,
			}),
		}

		handler
			.handler(mockedLocalData)
			.then((res) => {
				console.log('LOCAL res: ', JSON.stringify(res, null, 2))
			})
			.catch((err) => {
				console.log('LOCAL err: ', err)
			})
	} catch (error) {
		console.log('LOCAL PUT err: ', JSON.stringify(error))
	}
}

runner()
