exports.MAILSERVICE_API_SENDEMAIL_SUCCESS_RESPONSE_BODY = () => {
	return {
		data: 'API call success',
	}
}

exports.SENSEDIA_HUB_TOKEN = () => {
	return 'token'
}

exports.MAILSERVICE_API_SENDEMAIL_VALID_INPUT_DATA = () => {
	return {
		idAplicacaoUtilizadora: 0,
		unidadeNegocio: 'GER PROJETO HUB DE VENDAS',
		centroDeCustoPagador: 17312,
		from: 'comunicacao@novidades.portoseguro.com.br',
		to: ['nomenilson.sobrenomeson@someemaildomain.com'],
		cc: [],
		bcc: [],
		subject: 'Solicitação de cancelamento da apólice do seguro Residência',
		emailType: 'HTML',
		body: '<p>Dummy HTML Mail Body</p>',
	}
}

exports.FACTORY_MAILSERVICE_RETURN = () => {
	return {
		idAplicacaoUtilizadora: 0,
		unidadeNegocio: 'GER PROJETO HUB DE VENDAS',
		centroDeCustoPagador: 17312,
		emailDoResponsavelEmEnviar: 'comunicacao@novidades.portoseguro.com.br',
		emailsRecebedores: ['nomenilson.sobrenomeson@someemaildomain.com'],
		emailsRecebedoresEmCopia: [],
		emailsRecebedoresDeCopiaOculta: [],
		assuntoEmail: 'Solicitação de cancelamento da apólice do seguro Residência',
		tipoCorpoEmail: 'HTML',
		corpoEmail: '<p>Dummy HTML Mail Body</p>',
	}
}

exports.MAILSERVICE_API_SENDEMAIL_SUCCESS_RESPONSE = () => {
	return {
		status: 200,
		data: 'API call success',
	}
}

exports.MAILSERVICE_API_SENDEMAIL_ERROR_RESPONSE = () => {
	return {
		statusCode: 500,
		body: {
			status: 'error',
		},
	}
}

exports.TOKEN_SENSEDIA_HUB = 'token'

exports.RENDERED_TEMPLATE = (name) => {
	let defaultName = name || 'Joao da silva'
	return `<html> Nome: ${defaultName} </html>`
}
exports.TEMPLATE = '<html> Nome: {{CUSTOMER_NAME}} </html>'

exports.PAYLOAD_VALID = {
	from: 'porto@portoseguro.com.br',
	to: ['joao@email.com.br'],
	cc: ['maria@email.com.br'],
	bcc: ['jose@email.com.br'],
	subject: 'Sua apolice está quase pronta',
	emailType: 'HTML',
	template: 'notify-product-team.edge',
	metadata: { CUSTOMER_NAME: 'joao da silva' },
}

exports.SQS_BODY_VALID = JSON.stringify({
	Type: 'Notification',
	MessageId: 'd54ed454-d39a-5ee2-a6c3-884205253d7b',
	Message: JSON.stringify({
		eventTime: '2023-05-23T21:10:47.070Z',
		payload: this.PAYLOAD_VALID,
	}),
})

exports.SQS_BODY_INVALID = JSON.stringify({
	Type: 'Notification',
	MessageId: 'd54ed454-d39a-5ee2-a6c3-884205253d7b',
	Message: JSON.stringify({
		eventTime: '2023-05-23T21:10:47.070Z',
		payload: {},
	}),
})

exports.SQS_PAYLOAD_NULL = JSON.stringify({
	Type: 'Notification',
	MessageId: 'd54ed454-d39a-5ee2-a6c3-884205253d7b',
	Message: JSON.stringify({
		eventTime: '2023-05-23T21:10:47.070Z',
	}),
})

exports.SQS_MESSAGE_SUCCESS = (body) => {
	return {
		Records: [
			{
				messageId: 'f738c6fa-e2dd-4824-b7ff-5cfa454e322b',
				receiptHandle: 'MessageReceiptHandle',
				body: body || this.SQS_BODY_VALID,
				attributes: {
					ApproximateReceiveCount: '1',
					SentTimestamp: '1523232000000',
					SenderId: '123456789012',
					ApproximateFirstReceiveTimestamp: '1523232000001',
				},
				messageAttributes: {},
				md5OfBody: '{{{md5_of_body}}}',
				eventSource: 'aws:sqs',
				eventSourceARN:
					'arn:aws:sqs:ca-central-1:791702935403:carbon-service-connector-email-sender',
				awsRegion: 'ca-central-1',
			},
		],
	}
}

exports.INDEX_ERROR_RESPONSE = (constructor = {}) => {
	return {
		batchItemFailures: [
			{ itemIdentifier: 'f738c6fa-e2dd-4824-b7ff-5cfa454e322b' },
		],
	}
}

exports.GET_EMAIL_BODY_DATA_RESPONSE =
	'<table align="center" bgcolor="#ffffff" border="0" cellpadding="0" cellspacing="0" class="principal" width="600"> <tbody> <tr> <td> <img src="https://content.campanhaporto.com.br/Porto/8425//banner.jpg" style="display: block; max-width: 100%; width: 600px; height: 300px" /> </td> </tr> <tr> <td style="padding: 30px"> <table border="0" cellpadding="0" cellspacing="0" width="100%"> <tbody> <tr> <td style="padding-bottom: 10px"> <p style=" font-size: 20px; line-height: 20px; color: rgb(0, 161, 252); font-family: arial, helvetica, sans-serif; vertical-align: inherit; " > <strong>Ol&aacute;!</strong> </p> <p style=" text-align: justify; font-size: 16px; font-family: arial, helvetica, sans-serif; color: rgb(0, 0, 0); " > Infelizmente, n&atilde;o foi poss&iacute;vel fazer a confirma&ccedil;&atilde;o de pagamento de sua compra. </p> <p style=" text-align: justify; font-size: 16px; font-family: arial, helvetica, sans-serif; color: rgb(0, 0, 0); " > Mas n&atilde;o se preocupe, voc&ecirc; pode revisar suas informa&ccedil;&otilde;es e fazer uma nova compra em <a href="#" target="_blank" style="color: rgb(0, 70, 192)" >nosso site</a >. </p> <p style=" text-align: justify; font-size: 16px; font-family: arial, helvetica, sans-serif; color: rgb(0, 0, 0); " > Se precisar de ajuda ou tiver alguma d&uacute;vida, &eacute; s&oacute; entrar em contato com a gente para te auxiliar nesse processo. </p> <p style=" text-align: justify; font-size: 28px; font-family: arial, helvetica, sans-serif; color: rgb(44, 61, 168); " > <strong style="font-weight: 700" >Todo cuidado &eacute; <span style="color: rgb(0, 161, 252)">Porto</span>.</strong > </p> <div style=" width: 540px; height: 54px; border-radius: 12px; background-color: rgb(0, 161, 252); " > <table border="0" cellpadding="1" cellspacing="1" style="width: 540px; padding: 8px" > <tr> <td style=" text-align: justify; font-size: 14px; font-family: arial, helvetica, sans-serif; color: rgb(255, 255, 255); width: 230px; " > <strong style="font-weight: 700" >Siga a Porto nas redes sociais:</strong > </td> <td style="text-align: justify"> <a href="#" target="_blank" ><img src="https://content.campanhaporto.com.br/Porto/8425/instagram.png" alt="instagram" /></a> </td> <td style="text-align: justify"> <a href="#" target="_blank" ><img src="https://content.campanhaporto.com.br/Porto/8425/facebook.png" alt="facebook" /></a> </td> <td style="text-align: justify"> <a href="#" target="_blank" ><img src="https://content.campanhaporto.com.br/Porto/8425/twitter.png" alt="twitter" /></a> </td> <td style="text-align: justify"> <a href="#" target="_blank" ><img src="https://content.campanhaporto.com.br/Porto/8425/linkedin.png" alt="linkedin" /></a> </td> <td style="text-align: justify"> <a href="#" target="_blank" ><img src="https://content.campanhaporto.com.br/Porto/8425/youtube.png" alt="youtube" /></a> </td> </tr> </table> </div> <br /> <table border="0" cellpadding="1" cellspacing="1" style="width: 540px" > <tr> <td style=" text-align: justify; font-size: 12px; font-family: arial, helvetica, sans-serif; width: 135px; " > <a href="#" target="_blank" style="color: rgb(0, 161, 252)" >&Aacute;rea do Cliente</a > </td> <td style=" text-align: center; font-size: 12px; font-family: arial, helvetica, sans-serif; width: 135px; " > <a href="#" target="_blank" style="color: rgb(0, 161, 252)" >Atendimento</a > </td> <td style=" text-align: center; font-size: 12px; font-family: arial, helvetica, sans-serif; width: 135px; " > <a href="#" target="_blank" style="color: rgb(0, 161, 252)" >Sustentabilidade</a > </td> <td style="text-align: right; width: 135px"> <a href="#" target="_blank" ><img src="https://content.campanhaporto.com.br/Porto/8425/porto.png" width="108" height="25px" "Porto"/></a > </td> </tr> </table> <br /> <div style=" width: 540px; background-color: rgb(239, 244, 239); border-radius: 12px; padding: 20px 0; " > <table border="0" cellpadding="1" cellspacing="1"> <tr> <td style=" text-align: justify; font-size: 12px; font-family: arial, helvetica, sans-serif; padding: 0px 0px 15px 30px; " > <img src="https://content.campanhaporto.com.br/Porto/8425/porto-icon.png" width="38" height="38" alt="Porto" /> </td> <td style=" text-align: justify; padding: 20px 30px 15px 10px; " > <p style=" font-size: 12px; font-family: arial, helvetica, sans-serif; color: rgb(0, 0, 0); margin-bottom: -5px; " > <strong style="font-weight: 700; font-size: 16px" >App Porto</strong > </p> <p style=" font-size: 12px; font-family: arial, helvetica, sans-serif; color: rgb(0, 0, 0); " > Simplifique sua vida, gerencie seu cart&atilde;o pelo app, acompanhe compras e movimenta&ccedil;&otilde;es na tela do seu celular. Caso ainda n&atilde;o tenha, <a href="#" target="_blank" style="color: rgb(0, 0, 0); font-weight: 700" ><strong>baixe agora</strong></a >! </p> </td> </tr> <tr> <td style=" text-align: justify; font-size: 12px; font-family: arial, helvetica, sans-serif; padding: 0px 0px 15px 30px; " > <img src="https://content.campanhaporto.com.br/Porto/8425/whatsapp-icon.png" width="38" height="38" alt="Whatsapp" /> </td> <td style="text-align: justify; padding: 0px 30px 15px 10px" > <p style=" font-size: 12px; font-family: arial, helvetica, sans-serif; color: rgb(0, 0, 0); margin-bottom: -5px; " > <strong style="font-weight: 700; font-size: 16px" >Whatsapp Porto</strong > </p> <p style=" font-size: 12px; font-family: arial, helvetica, sans-serif; color: rgb(0, 0, 0); " > Salve nosso <a href="#" target="_blank" style="color: rgb(0, 0, 0); font-weight: 700" ><strong>Whatsapp</strong></a > para enviar mensagem quando precisar. Atendimento 24h por dia. Adicione na sua agenda sem o 9 na frente: <strong>55 11 3003 9303</strong> </p> </td> </tr> <tr> <td style=" text-align: justify; font-size: 12px; font-family: arial, helvetica, sans-serif; padding: 0px 0px 15px 30px; " > <img src="https://content.campanhaporto.com.br/Porto/8425/chat-icon.png" width="38" height="38" alt="Chat" /> </td> <td style="text-align: justify; padding: 0px 30px 15px 10px" > <p style=" font-size: 12px; font-family: arial, helvetica, sans-serif; color: rgb(0, 0, 0); " > Para mais informa&ccedil;&otilde;es ou d&uacute;vidas sobre o seu cart&atilde;o de cr&eacute;dito<br /> Porto Bank, acesse o nosso <a href="#" target="_blank" style="color: rgb(0, 0, 0); font-weight: 700" ><strong>Chat Online</strong></a >. </p> </td> </tr> <tr> <td style=" text-align: justify; font-size: 12px; font-family: arial, helvetica, sans-serif; padding: 0px 0px 15px 30px; " > <img src="https://content.campanhaporto.com.br/Porto/8425/cadeado-icon.png" width="38" height="38" alt="Segurança" /> </td> <td style="text-align: justify; padding: 0px 30px 15px 10px" > <p style=" font-size: 12px; font-family: arial, helvetica, sans-serif; color: rgb(0, 0, 0); " > A Porto Bank n&atilde;o solicita a sua senha e n&atilde;o retira o cart&atilde;o em sua resid&ecirc;ncia em nenhuma ocasi&atilde;o! Fique atento! </p> </td> </tr> <tr> <td style=" text-align: justify; font-size: 12px; font-family: arial, helvetica, sans-serif; padding: 0px 0px 15px 30px; " > &nbsp; </td> <td style="text-align: justify; padding: 0px 30px 15px 10px" > <p style=" font-size: 12px; font-family: arial, helvetica, sans-serif; color: rgb(0, 0, 0); " > <a href="#" target="_blank" style="color: rgb(0, 0, 0); font-weight: 700" ><strong >Confira nossas dicas de seguran&ccedil;a</strong ></a >. </p> </td> </tr> </table> </div> <br /> <p style=" font-size: 12px; font-family: arial, helvetica, sans-serif; color: rgb(94, 94, 94); margin: 0px; " > Portoseg S/A Cr&eacute;dito, Financiamento e Investimento - CNPJ: 04.862.600/0001-10.<br /> Av Rio Branco, 1489 - Campos El&iacute;seos - S&atilde;o Paulo/SP - CEP 01205-001. </p> <br /> <div style=" width: 540px; background-color: rgb(239, 244, 239); border-radius: 12px; " > <p style=" font-size: 12px; font-family: arial, helvetica, sans-serif; color: rgb(0, 0, 0); padding: 10px 18px; margin: 0px; " > A Porto respeita a sua privacidade e &eacute; contra o spam na rede. Se voc&ecirc; n&atilde;o deseja mais receber nossos e-mails, cancele sua inscri&ccedil;&atilde;o <a href="#" target="_blank" style="color: rgb(0, 161, 252)" ><strong>aqui</strong></a >. </p> </div> </td> </tr> </tbody> </table> </td> </tr> </tbody></table>'

exports.GETERRORDATA_RESPONSE_ERROR_WITHRESPONSE_VALID_INPUT = () => {
	return {
		response: {
			status: 400,
			data: 'Request error',
		},
	}
}

exports.GETERRORDATA_RESPONSE_ERROR_WITHREQUEST_VALID_INPUT = () => {
	return {
		request: {
			data: 'Lorem Ipsum',
		},
	}
}

exports.GETERRORDATA_RESPONSE_ERROR_UNEXPECTED_VALID_INPUT = () => {
	return {
		message: 'Unexpected',
	}
}

exports.GETERRORDATA_REQUESTERROR_VALID_RETURN = () => {
	return {
		status: 500,
		message: `Erro recebido da chamada da API: código '400' dados: '"Request error"'`,
	}
}

exports.GETERRORDATA_NORESPONSE_VALID_RETURN = () => {
	return {
		status: 500,
		message: 'API não respondeu à chamada',
	}
}

exports.GETERRORDATA_UNEXPECTED_VALID_RETURN = () => {
	return {
		status: 500,
		message: `Erro inesperado recebido da chamada da API: Unexpected`,
	}
}

exports.VALIDATION_UNEXPECTED_ERROR_ERROR_MESSAGE = () => {
	return `Erro identificado durante a atividade 'Validação dos dados': Unexpected validation error`
}

exports.VALIDATION_ERROR_WARNING_MESSAGE = () => {
	return `Erro identificado durante a atividade 'Validação dos dados': Validation`
}
