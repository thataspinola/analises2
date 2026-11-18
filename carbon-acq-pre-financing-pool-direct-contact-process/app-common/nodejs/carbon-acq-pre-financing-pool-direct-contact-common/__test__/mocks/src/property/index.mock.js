exports.SERVICE_VALIDATION_PAYLOAD_VALID_NO_UTCS = () => {
	return {
		channel: 'telephone',
		policyPrivacy: true,
		product: 'BIKE',
		client: {
			fullName: 'Maria Silva',
			nomeSocial: '',
			cpfCnpj: '74914947064',
			cellPhone: '11900000000',
			email: 'maria@gmail.com',
		},
		address: {
			zipCode: '04417-240',
		},
		marketingOptOutFlag: true,
		id_google: '820514165.1721244592',
		session_google: '1722348364',
		reference: 'Parceiro_Telefonica_r',
		lead: { vdoCode: "1826254760598"},
	}
}

exports.SERVICE_VALIDATION_PAYLOAD_VALID_FILLED_SOCIALNAME = () => {
	return {
		channel: 'telephone',
		policyPrivacy: true,
		utm_source: 'parceria',
		utm_medium: 'telefonica',
		utm_campaign: 'Susep-44348J',
		utm_content: 'cnsc_susep_indicacao_produto',
		product: 'BIKE',
		client: {
			fullName: 'Maria Silva',
			nomeSocial: 'Cleber Silva',
			cpfCnpj: '74914947064',
			cellPhone: '11900000000',
			email: 'clebersilva74@gmail.com',
		},
		address: {
			zipCode: '04417-240',
		},
		marketingOptOutFlag: true,
		id_google: '820514165.1721244592',
		session_google: '1722348364',
		reference: 'Parceiro_Telefonica_r',
		lead: { vdoCode: "1826254760598"},
	}
}

exports.SERVICE_VALIDATION_PAYLOAD_VALID_EMPTY_SOCIALNAME = () => {
	return {
		channel: 'telephone',
		policyPrivacy: true,
		utm_source: 'parceria',
		utm_medium: 'telefonica',
		utm_campaign: 'Susep-44348J',
		utm_content: 'cnsc_susep_indicacao_produto',
		product: 'BIKE',
		client: {
			fullName: 'Maria Silva',
			nomeSocial: '',
			cpfCnpj: '74914947064',
			cellPhone: '11900000000',
			email: 'maria@gmail.com',
		},
		address: {
			zipCode: '04417-240',
		},
		marketingOptOutFlag: true,
		id_google: '820514165.1721244592',
		session_google: '1722348364',
		reference: 'Parceiro_Telefonica_r',
		lead: { vdoCode: "1826254760598"},
	}
}

exports.SERVICE_VALIDATION_PAYLOAD_VALID_NULL_SOCIALNAME = () => {
	return {
		channel: 'telephone',
		policyPrivacy: true,
		utm_source: 'parceria',
		utm_medium: 'telefonica',
		utm_campaign: 'Susep-44348J',
		utm_content: 'cnsc_susep_indicacao_produto',
		product: 'BIKE',
		client: {
			fullName: 'Maria Silva',
			nomeSocial: null,
			cpfCnpj: '74914947064',
			cellPhone: '11900000000',
			email: 'maria@gmail.com',
		},
		address: {
			zipCode: '04417-240',
		},
		marketingOptOutFlag: true,
		id_google: '820514165.1721244592',
		session_google: '1722348364',
		reference: 'Parceiro_Telefonica_r',
		lead: { vdoCode: "1826254760598"},
	}
}

exports.SERVICE_VALIDATION_PAYLOAD_VALID_WITHOUT_SOCIALNAME = () => {
	return {
		channel: 'telephone',
		policyPrivacy: true,
		utm_source: 'parceria',
		utm_medium: 'telefonica',
		utm_campaign: 'Susep-44348J',
		utm_content: 'cnsc_susep_indicacao_produto',
		product: 'BIKE',
		client: {
			fullName: 'Maria Silva',
			cpfCnpj: '74914947064',
			cellPhone: '11900000000',
			email: 'maria@gmail.com',
		},
		address: {
			zipCode: '04417-240',
		},
		marketingOptOutFlag: true,
		id_google: '820514165.1721244592',
		session_google: '1722348364',
		reference: 'Parceiro_Telefonica_r',
		lead: { vdoCode: "1826254760598"},
	}
}

exports.SERVICE_VALIDATION_PAYLOAD_VALID_KNOW_UTCS = () => {
	return {
		channel: 'telephone',
		policyPrivacy: true,
		utm_source: 'parceria',
		utm_medium: 'telefonica',
		utm_campaign: 'Susep-44348J',
		utm_content: 'cnsc_susep_indicacao_produto',
		product: 'BIKE',
		client: {
			fullName: 'Maria Silva',
			nomeSocial: '',
			cpfCnpj: '74914947064',
			cellPhone: '11900000000',
			email: 'maria@gmail.com',
		},
		address: {
			zipCode: '04417-240',
		},
		marketingOptOutFlag: true,
		id_google: '820514165.1721244592',
		session_google: '1722348364',
		reference: 'Parceiro_Telefonica_r',
		lead: { vdoCode: "1826254760598"},
	}
}

exports.SERVICE_VALIDATION_PAYLOAD_VALID_EXTRA_UTCS = () => {
	return {
		channel: 'telephone',
		policyPrivacy: true,
		utm_source: 'parceria',
		utm_medium: 'telefonica',
		utm_campaign: 'Susep-44348J',
		utm_content: 'cnsc_susep_indicacao_produto',
		utc_extra_unknown_property_1: 'utc_extra_unknown_property_1_value',
		utc_extra_unknown_property_2: 'utc_extra_unknown_property_2_value',
		utc_extra_unknown_property_3: 'utc_extra_unknown_property_3_value',
		product: 'BIKE',
		client: {
			fullName: 'Maria Silva',
			nomeSocial: '',
			cpfCnpj: '74914947064',
			cellPhone: '11900000000',
			email: 'maria@gmail.com',
		},
		address: {
			zipCode: '04417-240',
		},
		marketingOptOutFlag: true,
		id_google: '820514165.1721244592',
		session_google: '1722348364',
		reference: 'Parceiro_Telefonica_r',
		lead: { vdoCode: "1826254760598"},
	}
}

exports.SERVICE_VALIDATION_PAYLOAD_VALID_JUST_REQUIRED_FIELDS = () => {
	return {
		channel: 'telephone',
		product: 'BIKE',
		client: {
			fullName: 'Maria Silva',
			cpfCnpj: '74914947064',
			cellPhone: '11900000000',
			email: 'maria@gmail.com',
		},
		address: {
			zipCode: '04417-240',
		},
		marketingOptOutFlag: true,
		lead: { vdoCode: "1826254760598"},
	}
}

exports.SERVICE_VALIDATION_PAYLOAD_INVALID_MISSING_CHANNEL = () => {
	return {
		product: 'BIKE',
		client: {
			fullName: 'Maria Silva',
			cpfCnpj: '74914947064',
			cellPhone: '11900000000',
			email: 'maria@gmail.com',
		},
		address: {
			zipCode: '04417-240',
		},
		marketingOptOutFlag: true,
		lead: { vdoCode: "1826254760598"},
	}
}

exports.SERVICE_VALIDATION_PAYLOAD_INVALID_MISSING_PRODUCT = () => {
	return {
		channel: 'telephone',
		client: {
			fullName: 'Maria Silva',
			cpfCnpj: '74914947064',
			cellPhone: '11900000000',
			email: 'maria@gmail.com',
		},
		address: {
			zipCode: '04417-240',
		},
		marketingOptOutFlag: true,
		lead: { vdoCode: "1826254760598"},
	}
}

exports.SERVICE_VALIDATION_PAYLOAD_INVALID_INVALID_PRODUCT = () => {
	return {
		channel: 'telephone',
		product: 'INVALID',
		client: {
			fullName: 'Maria Silva',
			cpfCnpj: '74914947064',
			cellPhone: '11900000000',
			email: 'maria@gmail.com',
		},
		address: {
			zipCode: '04417-240',
		},
		marketingOptOutFlag: true,
		lead: { vdoCode: "1826254760598"},
	}
}

exports.SERVICE_VALIDATION_PAYLOAD_INVALID_MISSING_CLIENT = () => {
	return {
		channel: 'telephone',
		product: 'BIKE',
		address: {
			zipCode: '04417-240',
		},
		marketingOptOutFlag: true,
		lead: { vdoCode: "1826254760598"},
	}
}

exports.SERVICE_VALIDATION_PAYLOAD_INVALID_MISSING_CLIENT_FULLNAME = () => {
	return {
		channel: 'telephone',
		product: 'BIKE',
		client: {
			cpfCnpj: '74914947064',
			cellPhone: '11900000000',
			email: 'maria@gmail.com',
		},
		address: {
			zipCode: '04417-240',
		},
		lead: { vdoCode: "1826254760598"},
		marketingOptOutFlag: true,
	}
}

exports.SERVICE_VALIDATION_PAYLOAD_INVALID_MISSING_CLIENT_CPFCNPJ = () => {
	return {
		channel: 'telephone',
		product: 'BIKE',
		client: {
			fullName: 'Maria Silva',
			cellPhone: '11900000000',
			email: 'maria@gmail.com',
		},
		address: {
			zipCode: '04417-240',
		},
		lead: { vdoCode: "1826254760598"},
		marketingOptOutFlag: true,
	}
}

exports.SERVICE_VALIDATION_PAYLOAD_INVALID_MISSING_CLIENT_CELLPHONE = () => {
	return {
		channel: 'telephone',
		product: 'BIKE',
		client: {
			fullName: 'Maria Silva',
			cpfCnpj: '74914947064',
			email: 'maria@gmail.com',
		},
		address: {
			zipCode: '04417-240',
		},
		lead: { vdoCode: "1826254760598"},
		marketingOptOutFlag: true,
	}
}

exports.SERVICE_VALIDATION_PAYLOAD_INVALID_MISSING_CLIENT_EMAIL = () => {
	return {
		channel: 'telephone',
		product: 'BIKE',
		client: {
			fullName: 'Maria Silva',
			cpfCnpj: '74914947064',
			cellPhone: '11900000000',
		},
		address: {
			zipCode: '04417-240',
		},
		lead: { vdoCode: "1826254760598"},
		marketingOptOutFlag: true,
	}
}

exports.SERVICE_VALIDATION_PAYLOAD_INVALID_MISSING_ADDRESS = () => {
	return {
		channel: 'telephone',
		product: 'BIKE',
		lead: { vdoCode: "1826254760598"},
		client: {
			fullName: 'Maria Silva',
			cpfCnpj: '74914947064',
			cellPhone: '11900000000',
			email: 'maria@gmail.com',
		},
		marketingOptOutFlag: true,
	}
}

exports.SERVICE_VALIDATION_PAYLOAD_INVALID_MISSING_ADDRESS_ZIPCODE = () => {
	return {
		channel: 'telephone',
		product: 'BIKE',
		client: {
			fullName: 'Maria Silva',
			cpfCnpj: '74914947064',
			cellPhone: '11900000000',
			email: 'maria@gmail.com',
		},
		lead: { vdoCode: "1826254760598"},
		address: {},
		marketingOptOutFlag: true,
	}
}

exports.SERVICE_VALIDATION_PAYLOAD_INVALID_MISSING_MARKETINGOPTOUTFLAG = () => {
	return {
		channel: 'telephone',
		product: 'BIKE',
		client: {
			fullName: 'Maria Silva',
			cpfCnpj: '74914947064',
			cellPhone: '11900000000',
			email: 'maria@gmail.com',
		},
		lead: { vdoCode: "1826254760598"},
		address: {
			zipCode: '04417-240',
		},
	}
}
