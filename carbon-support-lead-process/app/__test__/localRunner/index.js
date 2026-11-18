const app = require('../../')

const mockedLocalData = {
	body: JSON.stringify({
		"item_value": "2000.00",
		"nome": "Lucas Cruz",
		"email": "lucas.bernardes@portoseguro.com.br",
		"telefone": "(11) 96305-7279",
		"cpf": "426.932.068-04",
		"cep": "04126-000",
		"policyPrivacy": true,
		"marketing": true,
		"variant": "a",
		"referencia": "site-institucional",
		"ddd_residencial": "11",
		"tel_residencial": "963057279",
		"cnpj": "66.901.223/0001-83",
		"lgpd": {
			"newLgpd": {
				"aceite": "true",
				"consentimento": "true",
				"compartilhamento": "true",
				"data_aceite": "2025-05-08T17:23:45.386Z",
				"channel": "VendaOnline",
				"domain": "portoseguro.com.br",
				"environmentType": "site",
				"managementArea": "vendasonline",
				"nameArea": "vendasonline"
			}
		},
		"name": "seguro-bike",
		"id_produto": "9",
		"id_ramo": "16",
		"id_tipo_produto": "225",
		"origem": "36",
		"id_cliente_siebel": "1-18FG1E7C",
		"id_google": "1244214895.1675263214",
		"attr_referrer": "https://www.google.com/"
	}),
}

app
	.handler(mockedLocalData)
	.then((res) => {
		console.log(JSON.stringify(res, null, 2))
	})
	.catch((err) => {
		console.log(err)
	})
