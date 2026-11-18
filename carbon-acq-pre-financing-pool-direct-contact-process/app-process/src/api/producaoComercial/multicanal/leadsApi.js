const axios = require('axios')
const { DuplicatedLeadError, BlockListError } = require('../../../error')
const CONSTANT = require('../../../property')
const factory = require('../../../factory')

exports.postSemSeguro = async (leadPayload, apiSensediaCloudTokenString, certificates) => {
	const httpsAgent = factory.api.httpsAgent.createHttpsAgent(certificates)

	const postRequestConfig = {
		method: 'POST',
		url: `${CONSTANT.SENSEDIA_CLOUD_URL_INTERNAL}/${CONSTANT.PRODUCAO_COMERCIAL_GDL_LEADS_MULTICANAL_PERMALINK}/${CONSTANT.CREAT_LEAD_PATH}`,
		headers: {
			Authorization: `Bearer ${apiSensediaCloudTokenString}`,
		},
		data: leadPayload,
		httpsAgent
	}

	let postResponse = null

	try {
		postResponse = await axios(postRequestConfig)
		if (
			postResponse &&
			postResponse.data &&
			postResponse.data.sistema &&
			postResponse.data.sistema.successo !== undefined &&
			postResponse.data.sistema.status !== undefined &&
			postResponse.data.sistema.descricao !== undefined &&
			postResponse.data.sistema.stackTrace !== undefined
		) {
			if (postResponse.data.sistema.successo === false || 
				postResponse.status === 209
			) {
				const externalRequestError = new Error(
					postResponse.data.sistema.descricao
				)
				externalRequestError.response = {
					status: postResponse.data.sistema.status,
					data: {
						sistema: {
							descricao: postResponse.data.sistema.descricao,
							stackTrace: postResponse.data.sistema.stackTrace,
						}
					}
				}
				throw externalRequestError
			}

			if(!postResponse.data.lead){
				throw new Error('Empty or invalid response')
			}
		} else {
			throw new Error('Empty or invalid response')
		}
	} catch (err) {
		if (err.response) {
			if (err.response.data.sistema && err.response.data.sistema.descricao) {
				if (err.response.status == 209) {
					throw new DuplicatedLeadError(
						`API error: code '${err.response.status}' description: '${err.response.data.sistema.descricao}'`
					)
				}
				if (err.response.data.sistema.descricao == 'Blocklist - Rejeitado por políticas do programa. ') {
					throw new BlockListError(
						`API error: code '${err.response.status}' description: '${err.response.data.sistema.descricao}'`
					)
				}
				throw new Error(
					`API error: code '${err.response.status}' description: '${err.response.data.sistema.descricao}'`
				)
			} else {
				throw new Error(
					`API error: code '${err.response.status}' data: '${JSON.stringify(
						err.response.data
					)}'`
				)
			}
		} else if (err.request) {
			throw new Error('API did not give response')
		}
		throw new Error(`API unexpected error: ${err.message}`)
	}

	return postResponse.data.lead
}

exports.putContactRequestLead = async (leadId, token, certificates) => {
	const httpsAgent = factory.api.httpsAgent.createHttpsAgent(certificates)

	const postRequestConfig = {
		method: 'POST',
		url: `${CONSTANT.SENSEDIA_CLOUD_URL_INTERNAL}/${CONSTANT.PRODUCAO_COMERCIAL_GDL_LEADS_MULTICANAL_PERMALINK}/${CONSTANT.UPDATE_CONTACT_REQUEST_PATH}`,
		headers: {
			Authorization: `Bearer ${token}`,
		},
		data: {id_lead: leadId},
		httpsAgent
	}

	let postResponse = null

	try {
		postResponse = await axios(postRequestConfig)
		
	} catch (err) {
		throw new Error(`API unexpected error: ${err.message}`)
	}

	return postResponse.data
}