const HANDLER_MOCKS = require('../../../../../handler.mock')
exports.GETPAYLOAD_WITH_WHATSAPP_CHANNEL_VALID_DATA_INPUT = () => {
	return HANDLER_MOCKS.VALID_INPUT_PAYLOAD_WHATSAPP_RECORD_BODY_FORMDATA()
}

exports.GETPAYLOAD_WITH_WHATSAPP_CHANNEL_CNPJ_VALID_DATA_INPUT = () => {
	return HANDLER_MOCKS.VALID_INPUT_PJ_PAYLOAD_WHATSAPP_RECORD_BODY_FORMDATA()
}

const GETPAYLOAD_WITH_WHATSAPP_CHANNEL_CNPJ_VALID_RETURN_VALUE = {
	LeadXml:
		'<lead><nome>Nomeir Sobrenomeson</nome><email>cliente@clienteproduto.com.br</email><nome_social/><ddd_celular>11</ddd_celular><tel_celular>98754422</tel_celular><cep>01254-985</cep><origem>9</origem><id_produto>3</id_produto><id_ramo>24</id_ramo><pmc_programa>nvd</pmc_programa><lgpd><compartilhamento>sim</compartilhamento><consentimento>sim</consentimento><marketing>sim</marketing><aceite>sim</aceite><pescod>75315984</pescod></lgpd><referencia>site-institucional</referencia><codigo_vdo>1776254740509</codigo_vdo><cnpj>02860136000105</cnpj></lead>',
}
exports.GETPAYLOAD_WITH_WHATSAPP_CHANNEL_CNPJ_VALID_RETURN = () => {
	return GETPAYLOAD_WITH_WHATSAPP_CHANNEL_CNPJ_VALID_RETURN_VALUE
}

const GETPAYLOAD_WITH_WHATSAPP_CHANNEL_VALID_RETURN_VALUE = {
	LeadXml:
		'<lead><nome>Nomeir Sobrenomeson</nome><email>cliente@clienteproduto.com.br</email><nome_social>NS test</nome_social><ddd_celular>11</ddd_celular><tel_celular>98754422</tel_celular><cep>01254-985</cep><origem>9</origem><id_produto>3</id_produto><id_ramo>24</id_ramo><pmc_programa>nvd</pmc_programa><lgpd><compartilhamento>sim</compartilhamento><consentimento>sim</consentimento><marketing>sim</marketing><aceite>sim</aceite><pescod>75315984</pescod></lgpd><referencia>site-institucional</referencia><codigo_vdo>1776254740509</codigo_vdo><cpf>06963752060</cpf></lead>',
}
exports.GETPAYLOAD_WITH_WHATSAPP_CHANNEL_VALID_RETURN = () => {
	return GETPAYLOAD_WITH_WHATSAPP_CHANNEL_VALID_RETURN_VALUE
}

exports.GETPAYLOAD_WITH_HUBLIGUEME_CHANNEL_VALID_DATA_INPUT = () => {
	return HANDLER_MOCKS.VALID_INPUT_PAYLOAD_TELEPHONE_RECORD_BODY_FORMDATA()
}

exports.GETPAYLOAD_WITH_HUBLIGUEME_CHANNEL_CNPJ_VALID_DATA_INPUT = () => {
	return HANDLER_MOCKS.VALID_INPUT_PAYLOAD_TELEPHONE_CNPJ_RECORD_BODY_FORMDATA()
}

exports.GETPAYLOAD_VALID_PESCOD_INPUT = () => {
	return '75315984'
}

exports.GETPAYLOAD_WITH_HUBLIGUEME_CHANNEL_VALID_RETURN = () => {
	return {
		LeadXml:
			'<lead><nome>Nomeneide Sobrenomelin</nome><email>nomeneidesm@emaildomain.com</email><nome_social>NS test</nome_social><ddd_celular>11</ddd_celular><tel_celular>98754422</tel_celular><cep>01245-875</cep><origem>36</origem><id_produto>3</id_produto><id_ramo>24</id_ramo><pmc_programa>nvd</pmc_programa><lgpd><compartilhamento>sim</compartilhamento><consentimento>sim</consentimento><marketing>nao</marketing><aceite>sim</aceite><pescod>75315984</pescod></lgpd><referencia>site-institucional</referencia><codigo_vdo>1776254740509</codigo_vdo><cpf>06963752060</cpf></lead>',
	}
}
exports.GETPAYLOAD_WITH_HUBLIGUEME_CHANNEL_CNPJ_VALID_RETURN = () => {
	return {
		LeadXml:
			'<lead><nome>Nomeneide Sobrenomelin</nome><email>nomeneidesm@emaildomain.com</email><nome_social/><ddd_celular>11</ddd_celular><tel_celular>98754422</tel_celular><cep>01245-875</cep><origem>36</origem><id_produto>3</id_produto><id_ramo>24</id_ramo><pmc_programa>nvd</pmc_programa><lgpd><compartilhamento>sim</compartilhamento><consentimento>sim</consentimento><marketing>nao</marketing><aceite>sim</aceite><pescod>75315984</pescod></lgpd><referencia>site-institucional</referencia><codigo_vdo>1776254740509</codigo_vdo><cnpj>02860136000105</cnpj></lead>',
	}
}
