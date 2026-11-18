const factory = require('../factory')
const service = require('../service')
const CONSTANT = require('../property')
const errors = require('../error')
const api = require('../api')
const token = require(CONSTANT.TOKEN_LIBRARY_LOCATION)
const { SQSClient, SendMessageCommand } = require('@aws-sdk/client-sqs')
const Redis = require('ioredis')
const { createHash } = require('node:crypto')

const bcpRegistryCellphoneSearch = (
	bcpRegistry,
	cellphoneAreaCodeFromForm,
	cellphoneNumberFromForm
) => {
	let currentActivity =
		'Verificação da existência de números de telefone no registro de cadastro de pessoa - BCP'
	try {
		const cellphoneFromForm = `${cellphoneAreaCodeFromForm}${cellphoneNumberFromForm}`
		let destinationCellphoneNumber = null
		let destinationCellphoneEqualsForm = false
		if (bcpRegistry.telefones?.length) {
			let foundInBcp = false
			currentActivity =
				'Busca de um número de telefone do tipo CELULAR_INTERACAO e que seja igual ao recebido no formulário, no registro de cadastro de pessoa - BCP'
			const interacaoCellphoneEqualsForm = bcpRegistry.telefones.find(
				(phone) =>
					phone.tipo === 'CELULAR_INTERACAO' &&
					`${phone.ddd}` === cellphoneAreaCodeFromForm &&
					`${phone.numero}` === cellphoneNumberFromForm
			)
			if (interacaoCellphoneEqualsForm) {
				foundInBcp = true
				destinationCellphoneEqualsForm = true
			} else {
				currentActivity =
					'Busca de um número de telefone do tipo qual possua prefixo CELULAR, que seja igual ao recebido no formulário, no registro de cadastro de pessoa - BCP'
				const cellphonesEqualsForm = bcpRegistry.telefones.find(
					(phone) =>
						phone.tipo.startsWith('CELULAR') &&
						`${phone.ddd}` === cellphoneAreaCodeFromForm &&
						`${phone.numero}` === cellphoneNumberFromForm
				)
				if (cellphonesEqualsForm) {
					foundInBcp = true
					destinationCellphoneEqualsForm = true
				} else {
					currentActivity =
						'Busca de um número de telefone do tipo CELULAR_INTERACAO, no registro de cadastro de pessoa - BCP'
					const interacaoCellphone = bcpRegistry.telefones.find(
						(telefone) => telefone.tipo === 'CELULAR_INTERACAO'
					)
					if (interacaoCellphone) {
						foundInBcp = true
						destinationCellphoneNumber = `${interacaoCellphone.ddd}${interacaoCellphone.numero}`
					} else {
						currentActivity =
							'Busca de um número de telefone do tipo qual possua prefixo CELULAR no registro de cadastro de pessoa - BCP'
						const cellPhones = bcpRegistry.telefones.filter((phone) =>
							phone.tipo.startsWith('CELULAR')
						)
						if (cellPhones && cellPhones.length) {
							foundInBcp = true
							destinationCellphoneNumber = `${cellPhones[0].ddd}${cellPhones[0].numero}`
						}
					}
				}
			}

			if (foundInBcp && destinationCellphoneEqualsForm) {
				destinationCellphoneNumber = cellphoneFromForm
			}

			if (destinationCellphoneNumber) {
				if (destinationCellphoneNumber.length < 7) {
					if (!destinationCellphoneEqualsForm) {
						service.logger.info(
							`Telefone celular do formulário não encontrado no registro de pessoa; Outro numero de celular foi identificado em tal registro (BCP), porém com formato inválido. Número inválido: ${destinationCellphoneNumber}`
						)
					}
					foundInBcp = false
					destinationCellphoneEqualsForm = false
					destinationCellphoneNumber = null
				} else {
					const areaCode = destinationCellphoneNumber.substring(0, 2)
					const phoneNumberSuffix = destinationCellphoneNumber.substring(6)
					if (foundInBcp) {
						if (destinationCellphoneEqualsForm) {
							service.logger.info(
								`Telefone celular do formulário encontrado no registro de pessoa - BCP. Número (${areaCode})*****${phoneNumberSuffix}`
							)
						} else {
							service.logger.info(
								`Telefone celular do formulário não encontrado no registro de pessoa, porém será considerado outro numero presente em tal registro - BCP. Número (${areaCode})*****${phoneNumberSuffix}`
							)
						}
					}
				}
			} else {
				service.logger.info(
					'Telefone celular não encontrado no registro de pessoa - BCP.'
				)
			}
		}
		return {
			destinationCellphoneNumber,
			destinationCellphoneEqualsForm,
		}
	} catch (error) {
		service.logger.error(
			`Erro identificado durante a atividade '${currentActivity}': ${error.message}`
		)
		throw error
	}
}

const bcpRegistryEmailSearch = (bcpRegistry, emailFromForm) => {
	let currentActivity =
		'Verificação da existência de emails no registro de cadastro de pessoa - BCP'
	try {
		let destinationEmailAddress = null
		let destinationEmailAddressEqualsForm = false
		if (bcpRegistry.emails?.length) {
			let foundInBcp = false
			currentActivity =
				'Busca de um email que seja igual ao recebido no formulário, no registro de cadastro de pessoa - BCP'

			const emailForm = bcpRegistry.emails.find(
				(email) => email.email === emailFromForm
			)
			if (emailForm) {
				foundInBcp = true
				destinationEmailAddressEqualsForm = true
			} else {
				foundInBcp = true
				destinationEmailAddress = bcpRegistry.emails[0].email
			}

			if (foundInBcp && destinationEmailAddressEqualsForm) {
				destinationEmailAddress = emailFromForm
			}

			const maskedEmailAddress = destinationEmailAddress.replace(
				CONSTANT.EMAIL_MASK_REGEX,
				'*'
			)

			if (foundInBcp) {
				if (destinationEmailAddressEqualsForm) {
					service.logger.info(
						`Email do formulário encontrado no registro de pessoa - BCP. Endereço ${maskedEmailAddress}`
					)
				} else {
					service.logger.info(
						`Email do formulário não encontrado no registro de pessoa, porém será considerado outro endereço encontrado em tal registro - BCP. Endereço ${maskedEmailAddress}`
					)
				}
			}
		} else {
			service.logger.info('Email não encontrado no registro de pessoa - BCP.')
		}
		return {
			destinationEmailAddress,
			destinationEmailAddressEqualsForm,
		}
	} catch (error) {
		service.logger.error(
			`Erro identificado durante a atividade '${currentActivity}': ${error.message}`
		)
		throw error
	}
}

const getPescodCellphoneEmailAndSocialNameBcp = async (
	taxvat,
	cellphoneFromForm,
	emailFromForm,
	mulesoftImpersonalTokenHub
) => {
	let currentActivity = 'Verificação da existência de cadastro de pessoa - BCP'
	try {
		const beforeGetPessoaDateTime = new Date()
		const cellphoneNumberFromForm = cellphoneFromForm.substring(2)
		const cellphoneAreaCodeFromForm = cellphoneFromForm.substring(0, 2)
		let smsDestinationNumber = null
		let smsDestinationNumberEqualsForm = false
		let emailDestinationAddress = null
		let emailDestinationAddressEqualsForm = false
		let socialNameDestination = null
		let pescod = null
		const cadastroExistenteBcp = await api.bcp.getDadosPessoa(
			taxvat,
			mulesoftImpersonalTokenHub
		)
		const afterGetPessoaDateTime = new Date()
		service.logger.info(
			`Tempo decorrido para varificar existência de cadastro de pessoa - BCP: ${
				afterGetPessoaDateTime.getTime() - beforeGetPessoaDateTime.getTime()
			} milisegundos.`
		)
		if (cadastroExistenteBcp && cadastroExistenteBcp.pescod) {
			pescod = cadastroExistenteBcp.pescod
			service.logger.info(
				`Identificado existência do registro de pessoa - BCP. Pescod ${cadastroExistenteBcp.pescod}`
			)
			currentActivity =
				'Busca do número de celular no registro de cadastro de pessoa - BCP'
			const { destinationCellphoneNumber, destinationCellphoneEqualsForm } =
				bcpRegistryCellphoneSearch(
					cadastroExistenteBcp,
					cellphoneAreaCodeFromForm,
					cellphoneNumberFromForm
				)
			if (destinationCellphoneNumber) {
				smsDestinationNumber = destinationCellphoneNumber
				smsDestinationNumberEqualsForm = destinationCellphoneEqualsForm
			}

			currentActivity =
				'Busca do endereço de email no registro de cadastro de pessoa - BCP'
			const { destinationEmailAddress, destinationEmailAddressEqualsForm } =
				bcpRegistryEmailSearch(cadastroExistenteBcp, emailFromForm)

			if (destinationEmailAddress) {
				emailDestinationAddress = destinationEmailAddress
				emailDestinationAddressEqualsForm = destinationEmailAddressEqualsForm
			}

			currentActivity =
				'Busca do nome social no registro de cadastro de pessoa - BCP'
			socialNameDestination = cadastroExistenteBcp.nomeSocial
		}
		return {
			pescod,
			smsDestinationNumber,
			emailDestinationAddress,
			socialNameDestination,
			smsDestinationNumberEqualsForm,
			emailDestinationAddressEqualsForm,
		}
	} catch (error) {
		service.logger.error(
			`Erro identificado durante a atividade '${currentActivity}': ${error.message}`
		)
		throw error
	}
}

const getPescodBcc = async (taxvat, mulesoftImpersonalTokenHub) => {
	let currentActivity = 'Verificação da existência de cadastro de pessoa - BCC'
	try {
		const beforeGetPessoaDateTime = new Date()
		let pescod = null
		const cadastroExistenteBcc =
			await api.governancaDados.dadosPessoa.getPessoa(
				taxvat,
				mulesoftImpersonalTokenHub
			)
		const afterGetPessoaDateTime = new Date()
		service.logger.info(
			`Tempo decorrido para varificar existência de cadastro de pessoa - BCC: ${
				afterGetPessoaDateTime.getTime() - beforeGetPessoaDateTime.getTime()
			} milisegundos.`
		)
		if (cadastroExistenteBcc !== null && cadastroExistenteBcc.codigoPessoa) {
			pescod = cadastroExistenteBcc.codigoPessoa
			service.logger.info(
				`Identificado existência do registro de pessoa - BCC. Pescod ${cadastroExistenteBcc.codigoPessoa}`
			)
		}
		return {
			pescod,
		}
	} catch (error) {
		service.logger.error(
			`Erro identificado durante a atividade '${currentActivity}': ${error.message}`
		)
		throw error
	}
}

const getCellphoneAndEmailAccessManager = async (
	taxvat,
	cellphoneFromForm,
	emailFromForm,
	sensediaToken
) => {
	let currentActivity =
		'Verificação da existência de dados de contato do usuário no gerenciador de acessos'
	try {
		const beforeGetContatosDateTime = new Date()
		let smsDestinationNumber = null
		let smsDestinationNumberEqualsForm = false
		let emailDestinationAddress = null
		let emailDestinationAddressEqualsForm = false
		const dadosContatoUsuarioGerenciadorAcesso =
			await api.portais.msUsuarios.usuario.getContatos(taxvat, sensediaToken)
		const afterGetContatosDateTime = new Date()
		service.logger.info(
			`Tempo decorrido para verificar a existência dos dados de contato do usuário no gerenciador de acessos: ${
				afterGetContatosDateTime.getTime() - beforeGetContatosDateTime.getTime()
			} milisegundos.`
		)
		if (
			dadosContatoUsuarioGerenciadorAcesso &&
			dadosContatoUsuarioGerenciadorAcesso.nome
		) {
			service.logger.info(
				'Identificado existência dos dados de contato do usuário no gerenciador de acessos.'
			)
			currentActivity =
				'Busca do número de celular nos dados de contato do usuário no gerenciador de acessos'
			if (
				dadosContatoUsuarioGerenciadorAcesso.celulares?.filter(
					(cellphone) => cellphone && cellphone.trim() !== ''
				).length
			) {
				let foundInAccessManager = false
				let equalsForm = false
				const telefoneCelularForm =
					dadosContatoUsuarioGerenciadorAcesso.celulares.find(
						(telefone) => telefone.replace(/[^0-9]/gi, '') === cellphoneFromForm
					)
				if (telefoneCelularForm) {
					foundInAccessManager = true
					equalsForm = true
				} else {
					foundInAccessManager = true
					smsDestinationNumber = `${dadosContatoUsuarioGerenciadorAcesso.celulares[0].replace(
						/[^0-9]/gi,
						''
					)}`
				}

				if (foundInAccessManager && equalsForm) {
					smsDestinationNumber = cellphoneFromForm
					smsDestinationNumberEqualsForm = true
				}

				const areaCode = smsDestinationNumber.substring(0, 2)
				const phoneNumberSuffix = smsDestinationNumber.substring(6)

				if (foundInAccessManager) {
					if (equalsForm) {
						service.logger.info(
							`Telefone celular do formulário encontrado nos dados de contato do usuario no gerenciador de acessos. Número (${areaCode})*****${phoneNumberSuffix}`
						)
					} else {
						service.logger.info(
							`Telefone celular do formulário não encontrado nos dados de contato do usuario no gerenciador de acessos, porém será considerado outro numero presente em tais dados. Número (${areaCode})*****${phoneNumberSuffix}`
						)
					}
				}
			}
			currentActivity =
				'Busca do endereço de email nos dados de contato do usuário no gerenciador de acessos'
			if (
				dadosContatoUsuarioGerenciadorAcesso.emails?.filter(
					(email) => email && email.trim() !== ''
				).length
			) {
				let foundInAccessManager = false
				let equalsForm = false
				const emailForm = dadosContatoUsuarioGerenciadorAcesso.emails.find(
					(email) => email === emailFromForm
				)
				if (emailForm) {
					foundInAccessManager = true
					equalsForm = true
				} else {
					foundInAccessManager = true
					emailDestinationAddress =
						dadosContatoUsuarioGerenciadorAcesso.emails[0]
				}

				if (foundInAccessManager && equalsForm) {
					emailDestinationAddress = emailFromForm
					emailDestinationAddressEqualsForm = true
				}

				const maskedEmailAddress = emailDestinationAddress.replace(
					CONSTANT.EMAIL_MASK_REGEX,
					'*'
				)

				if (foundInAccessManager) {
					if (equalsForm) {
						service.logger.info(
							`Email do formulário encontrado nos dados de contato do usuario no gerenciador de acessos. Endereço ${maskedEmailAddress}`
						)
					} else {
						service.logger.info(
							`Email do formulário não encontrado nos dados de contato do usuario no gerenciador de acessos, porém será considerado outro endereço encontrado em tais dados. Endereço ${maskedEmailAddress}`
						)
					}
				}
			}
		}
		return {
			smsDestinationNumber,
			emailDestinationAddress,
			smsDestinationNumberEqualsForm,
			emailDestinationAddressEqualsForm,
		}
	} catch (error) {
		service.logger.error(
			`Erro identificado durante a atividade '${currentActivity}': ${error.message}`
		)
		throw error
	}
}

const inputValidation = (parsedInput) => {
	let currentActivity = 'Validação dos dados'
	try {
		service.validation.inputData(parsedInput, CONSTANT.OTP_REQUEST_SCHEMA)

		if (!service.cpfValidation.isValidCPF(parsedInput.taxvat)) {
			throw new errors.ValidationError('Número de CPF inválido')
		}

		service.logger.info(
			`Telefone para envio recebido do formulário: (${parsedInput.celular.substring(
				0,
				2
			)})*****${parsedInput.celular.substring(7)}`
		)
	} catch (error) {
		const message = `Erro identificado durante a atividade '${currentActivity}': ${error.message}`
		if (error.name == 'ValidationError') {
			service.logger.warn(message)
		} else {
			service.logger.error(message)
		}
		throw error
	}
}

const exceptionSimulation = (parsedInput) => {
	let currentActivity = 'Teste de exceção'
	try {
		if (parsedInput.nome === 'Except') {
			throw new Error(
				`API error: code '500' data: '{ "message": "Fake failure" }'`
			)
		}
	} catch (error) {
		service.logger.error(
			`Erro identificado durante a atividade '${currentActivity}': ${error.message}`
		)
		throw error
	}
}

const getApiGatewayTokens = async () => {
	let currentActivity = 'Obtenção do token Sensedia Token Hub'
	try {
		const sensediaToken = await token.getSensediaTokenHub()

		currentActivity = 'Obtenção do token Mulesoft Impersonal Token Hub'
		const mulesoftImpersonalTokenHub =
			await token.getMulesoftImpersonalTokenHub()

		return {
			sensediaToken,
			mulesoftImpersonalTokenHub,
		}
	} catch (error) {
		service.logger.error(
			`Erro identificado durante a atividade '${currentActivity}': ${error.message}`
		)
		throw error
	}
}

const getPessoaCellphoneEmailAndSocialName = async (
	taxvat,
	cellphoneFromForm,
	emailFromForm,
	socialNameFromForm,
	sensediaToken,
	mulesoftImpersonalTokenHub
) => {
	let currentActivity =
		'Verificação da existência de dados de cadastro de pessoa, telefone e celular'
	try {
		let smsDestinationNumber = null
		let emailDestinationAddress = null
		let socialNameDestination = null
		let pescod = null
		let cellphoneFromAccessManager = null
		let emailFromAccessManager = null
		let cellphoneFromBcp = null
		let emailFromBcp = null
		let socialNameFromBcp = null
		let cellphoneFromAccessManagerEqualsForm = false
		let emailFromAccessManagerEqualsForm = false
		let cellphoneFromBcpEqualsForm = false
		let emailFromBcpEqualsForm = false

		const [bcpSearchResponse, bccSearchResponse, accessManagerResponse] =
			await Promise.allSettled([
				getPescodCellphoneEmailAndSocialNameBcp(
					taxvat,
					cellphoneFromForm,
					emailFromForm,
					mulesoftImpersonalTokenHub
				),
				getPescodBcc(taxvat, mulesoftImpersonalTokenHub),
				getCellphoneAndEmailAccessManager(
					taxvat,
					cellphoneFromForm,
					emailFromForm,
					sensediaToken
				),
			])

		if (
			![bcpSearchResponse.status, bccSearchResponse.status].includes(
				'fulfilled'
			)
		) {
			throw new Error('Both BCP and BCC taxvat search APIs calls failed')
		}

		currentActivity =
			'Extraindo os dados de cadastro de pessoa, telefone e celular'

		if (accessManagerResponse.status === 'fulfilled') {
			if (
				accessManagerResponse.value.smsDestinationNumber ||
				accessManagerResponse.value.emailDestinationAddress
			) {
				cellphoneFromAccessManager =
					accessManagerResponse.value.smsDestinationNumber
				cellphoneFromAccessManagerEqualsForm =
					accessManagerResponse.value.smsDestinationNumberEqualsForm
				emailFromAccessManager =
					accessManagerResponse.value.emailDestinationAddress
				emailFromAccessManagerEqualsForm =
					accessManagerResponse.value.emailDestinationAddressEqualsForm

				if (cellphoneFromAccessManager) {
					const areaCode = cellphoneFromAccessManager.substring(0, 2)
					const phoneNumberSuffix = cellphoneFromAccessManager.substring(6)
					service.logger.info(
						`Telefone celular nos dados de contato do usuario no gerenciador de acesso. Número (${areaCode})*****${phoneNumberSuffix}`
					)
				} else {
					service.logger.info(
						'Dados de contato do usuario no gerenciador de acesso sem telefone celular.'
					)
				}

				if (emailFromAccessManager) {
					service.logger.info(
						`Email nos dados de contato do usuario no gerenciador de acesso. Endereço ${emailFromAccessManager.replace(
							CONSTANT.EMAIL_MASK_REGEX,
							'*'
						)}`
					)
				} else {
					service.logger.info(
						'Dados de contato do usuario no gerenciador de acesso sem email.'
					)
				}
			} else {
				service.logger.info(
					'Dados de contato do usuario no gerenciador de acesso sem telefone celular ou email.'
				)
			}
		}

		if (
			bcpSearchResponse.status === 'fulfilled' &&
			bcpSearchResponse.value?.pescod
		) {
			pescod = `${bcpSearchResponse.value.pescod}`
			if (
				bcpSearchResponse.value.smsDestinationNumber ||
				bcpSearchResponse.value.emailDestinationAddress
			) {
				cellphoneFromBcp = bcpSearchResponse.value.smsDestinationNumber
				cellphoneFromBcpEqualsForm =
					bcpSearchResponse.value.smsDestinationNumberEqualsForm
				emailFromBcp = bcpSearchResponse.value.emailDestinationAddress
				emailFromBcpEqualsForm =
					bcpSearchResponse.value.emailDestinationAddressEqualsForm

				if (cellphoneFromBcp) {
					const areaCode = cellphoneFromBcp.substring(0, 2)
					const phoneNumberSuffix = cellphoneFromBcp.substring(6)
					service.logger.info(
						`Telefone celular no registro de pessoa - BCP. Número (${areaCode})*****${phoneNumberSuffix}`
					)
				} else {
					service.logger.info('Registro de pessoa (BCP) sem telefone celular.')
				}

				if (emailFromBcp) {
					service.logger.info(
						`Email no registro de pessoa - BCP. Endereço ${emailFromBcp.replace(
							CONSTANT.EMAIL_MASK_REGEX,
							'*'
						)}`
					)
				} else {
					service.logger.info('Registro de pessoa (BCP) sem email.')
				}
			} else {
				service.logger.info(
					'Registro de pessoa (BCP) sem telefone celular ou email.'
				)
			}

			socialNameFromBcp = bcpSearchResponse.value.socialNameDestination
		}

		if (!pescod) {
			if (
				bccSearchResponse.status === 'fulfilled' &&
				bccSearchResponse.value?.pescod
			) {
				pescod = `${bccSearchResponse.value.pescod}`
				service.logger.info('Pescod considerado obtido na BCC')
			}
		}

		if (!cellphoneFromAccessManagerEqualsForm && !cellphoneFromBcpEqualsForm) {
			if (cellphoneFromBcp) {
				smsDestinationNumber = cellphoneFromBcp
			} else if (cellphoneFromAccessManager) {
				smsDestinationNumber = cellphoneFromAccessManager
			}
		}

		if (!emailFromAccessManagerEqualsForm && !emailFromBcpEqualsForm) {
			if (emailFromBcp) {
				emailDestinationAddress = emailFromBcp
			} else if (emailFromAccessManager) {
				emailDestinationAddress = emailFromAccessManager
			}
		}

		socialNameDestination = socialNameFromBcp || socialNameFromForm || ''

		return {
			cellphone: smsDestinationNumber,
			email: emailDestinationAddress,
			socialName: socialNameDestination,
			pescod,
		}
	} catch (error) {
		service.logger.error(
			`Erro identificado durante a atividade '${currentActivity}': ${error.message}`
		)
		throw error
	}
}

const corporativeHeaderGenerate = (sessionId, ipAddress, userAgent) => {
	let currentActivity = 'Geração do cabeçalho corporativo para chamada do ACT01'
	try {
		const corporativeheaderData = {
			sessionId: sessionId,
			ipAddress: ipAddress,
			userAgent: userAgent,
			policy: CONSTANT.POLICY,
			organizationId: CONSTANT.ORGANIZATION_ID,
		}

		const corporativeheader = Buffer.from(
			JSON.stringify(corporativeheaderData)
		).toString('base64')

		return corporativeheader
	} catch (error) {
		service.logger.error(
			`Erro identificado durante a atividade '${currentActivity}': ${error.message}`
		)
		throw error
	}
}

const sendMessageToSenderSqsQueue = async (
	parsedInput,
	smsDestinationNumber,
	emailDestinationAddress,
	corporativeHeader,
	pescod
) => {
	let currentActivity =
		'Construção da mensagem para a fila de solicitação de disparo de SMS'
	try {
		const userData = {
			celular: parsedInput.celular,
			email: parsedInput.email,
			nome: parsedInput.nome,
			nomeSocial: parsedInput.nomeSocial,
		}

		const sendRequestMessage = factory.sendRequestMessage.getMessage(
			parsedInput.taxvat,
			smsDestinationNumber,
			emailDestinationAddress,
			corporativeHeader,
			pescod,
			userData
		)

		const beforeSendMessageToSQS = new Date()
		currentActivity =
			'Preparação do envio da mensagem para a fila de solicitação de disparo de SMS'
		const sqsClient = new SQSClient({ region: CONSTANT.AWS_REGION })

		currentActivity =
			'Envio da mensagem para a fila de solicitação de disparo de SMS'
		const sqsResponse = await sqsClient.send(
			new SendMessageCommand({
				QueueUrl: `${CONSTANT.OTP_SENDER_QUEUE_URL}`,
				MessageBody: JSON.stringify(sendRequestMessage),
			})
		)
		const afterSendMessageToSQS = new Date()
		service.logger.info(
			`Mensagem enviada para a fila de solicitação de disparo de SMS. Tempo decorrido: ${
				afterSendMessageToSQS.getTime() - beforeSendMessageToSQS.getTime()
			} milisegundos. Response: ${JSON.stringify(sqsResponse)}`
		)
		return {
			sqsMessageId: sqsResponse.MessageId,
			sqsMessageSendDate: new Date(),
		}
	} catch (error) {
		service.logger.error(
			`Erro identificado durante a atividade '${currentActivity}': ${error.message}`
		)
		throw error
	}
}

const populateCache = async (
	taxvat,
	pescod,
	sqsMessageId,
	sqsMessageSendDate
) => {
	let currentActivity = 'Iniciando conexão com o mecanismo de cache'
	try {
		const redisCache = new Redis(CONSTANT.OTP_REDIS_CACHE_CONN_STRING)
		const cacheKey = createHash('md5').update(taxvat).digest('hex')
		let cacheContent = {
			pescod,
			sqsMessages: [],
		}
		currentActivity = 'Adquirindo dados do cache'
		const existentCache = await redisCache.exists(cacheKey)
		let existentCacheData = null
		if (existentCache) {
			const existentCacheDataStringified = await redisCache.get(cacheKey)
			existentCacheData = JSON.parse(existentCacheDataStringified)
			cacheContent.pescod = pescod ?? existentCacheData.pescod
			cacheContent.sqsMessages = existentCacheData.sqsMessages
		}

		cacheContent.sqsMessages.push({
			messageId: sqsMessageId,
			timeStamp: sqsMessageSendDate.toISOString(),
		})
		currentActivity = 'Adicionando/Atualizando dados do cache'
		await redisCache.set(cacheKey, JSON.stringify(cacheContent))
	} catch (error) {
		if (!pescod) {
			service.logger.error(
				`Erro identificado durante a atividade '${currentActivity}': ${error.message}`
			)
			throw error
		}
		service.logger.warn(
			`Erro (não bloqueante) identificado durante a atividade '${currentActivity}': ${error.message}`
		)
	}
}

const buildSuccessResponse = (
	smsDestinationNumber,
	emailDestinationAddress
) => {
	let currentActivity = 'Construção do corpo do retorno'
	try {
		const successResponseBody =
			factory.otpRequestControllerResponsePayload.getPayload(
				smsDestinationNumber,
				emailDestinationAddress
			)
		currentActivity = 'Construção da resposta de sucesso'
		const successResponse = factory.response.success(successResponseBody)
		return successResponse
	} catch (error) {
		service.logger.error(
			`Erro identificado durante a atividade '${currentActivity}': ${error.message}`
		)
		throw error
	}
}

exports.processRequest = async (parsedInput) => {
	try {
		inputValidation(parsedInput)

		exceptionSimulation(parsedInput)

		const { sensediaToken, mulesoftImpersonalTokenHub } =
			await getApiGatewayTokens()

		const areaCodeFromForm = parsedInput.celular.substring(0, 2)
		const phoneNumberSuffixFromForm = parsedInput.celular.substring(6)

		service.logger.info(
			`Telefone celular recebido via formulário: (${areaCodeFromForm})*****${phoneNumberSuffixFromForm}`
		)

		const {
			pescod,
			cellphone: smsDestinationNumberFromRegisteredData,
			email: emailDestinationAddressFromRegisteredData,
			socialName: socialNameDestinationFromRegisteredData,
		} = await getPessoaCellphoneEmailAndSocialName(
			parsedInput.taxvat,
			parsedInput.celular,
			parsedInput.email,
			parsedInput.nomeSocial,
			sensediaToken,
			mulesoftImpersonalTokenHub
		)

		let smsDestinationNumber = parsedInput.celular
		let emailDestinationAddress = parsedInput.email

		if (smsDestinationNumberFromRegisteredData) {
			smsDestinationNumber = smsDestinationNumberFromRegisteredData
		} else {
			service.logger.info('Telefone para envio obtido do formulário')
		}

		if (emailDestinationAddressFromRegisteredData) {
			emailDestinationAddress = emailDestinationAddressFromRegisteredData
		} else {
			service.logger.info('Email para envio obtido do formulário')
		}

		parsedInput.nomeSocial = socialNameDestinationFromRegisteredData

		const corporativeheader = corporativeHeaderGenerate(
			parsedInput.sessionId,
			parsedInput.ipAddress,
			parsedInput.userAgent
		)

		const { sqsMessageId, sqsMessageSendDate } =
			await sendMessageToSenderSqsQueue(
				parsedInput,
				smsDestinationNumber,
				emailDestinationAddress,
				corporativeheader,
				pescod
			)

		await populateCache(
			parsedInput.taxvat,
			pescod,
			sqsMessageId,
			sqsMessageSendDate
		)

		const successResponse = buildSuccessResponse(
			smsDestinationNumber,
			emailDestinationAddress
		)

		return successResponse
	} catch (error) {
		if (error.name == 'ValidationError') {
			return factory.response.badRequestError(
				'Não foi possível processar a requisição, por favor revise os dados'
			)
		}
		return factory.response.error('Erro interno ao processar a requisição')
	}
}
