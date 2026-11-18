const CONSTANT = require('../property')
const service = require('../service')
const { Edge } = require('edge.js')
const edgeInstance = new Edge({ cache: false })
const { GetObjectCommand, S3Client } = require('@aws-sdk/client-s3')
const client = new S3Client()

exports.getEmailHtmlBody = async (templatePath, metadata) => {
	let template = await getTemplate(templatePath)

	let renderedTemplate = edgeInstance.renderRawSync(template, metadata)

	returnValue = renderedTemplate
		.replaceAll('\t', '')
		.replaceAll('\r', '')
		.replaceAll('\n', '')
		.replace(/[ ]+/gm, ' ')

	return returnValue
}

async function getTemplate(templatePath) {
	const getObjectCommand = new GetObjectCommand({
		Bucket: CONSTANT.S3_BUCKET,
		Key: templatePath,
	})

	let response = await client.send(getObjectCommand)

	let content = await response.Body.transformToString()

	service.logger.info(`template ${templatePath} obtido com sucesso`)
	return content
}
