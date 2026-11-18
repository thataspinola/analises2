exports.PRODUCT_ALIAS_VARIATION = () => {
	return {
		products: {
			items: [
				{
					url_key: 'test-product',
					name: 'Test Product',
					sku: 'TEST123',
					porto_services_metadata: {
						product_type: 'variation',
						product_front_name: 'Test Product Front',
						id: '1',
						partner_product_id: '1001',
						service_type_id: '2001',
						charge_type_id: '3001',
						specialty_code: 'SP001',
						origin_code: 'OR001',
						problem: 'No Problem',
						subject: 'Test Subject',
						is_new_product: true,
						is_offer_product: false,
						external_link_redirect: 'http://example.com',
						external_link_text: 'Example Link',
						has_external_link_redirect: true,
						card_price: {
							title: 'Price Title',
							final_price: '100',
							installment: { text: 'Installment Text' },
							discount: { text: 'Discount Text' },
							benefits: {
								text: 'Benefits Text',
								shop_window: [
									'Atendimento rápido',
									'Profissionais qualificados',
								],
							},
							old_price: '150',
							label: { text: 'Label Text', color: 'red' },
						},
						max_services: 5,
						combo_id: 'combo123',
					},
					categories: [{ name: 'Category1' }, { name: 'Category2' }],
					items: [
						{
							options: [
								{
									product: {
										porto_services_metadata: {
											id: '2',
											product_front_name: 'Variant Product',
											partner_product_id: '1002',
											service_type_id: '2002',
											charge_type_id: '3002',
											specialty_code: 'SP002',
											origin_code: 'OR002',
											problem: 'No Problem',
											subject: 'Variant Subject',
											card_price: {
												final_price: '80',
											},
										},
										sku: 'VARIANT123',
									},
								},
							],
						},
					],
				},
			],
		},
	}
}

exports.PRODUCT_ALIAS_MULTIPLE = () => {
	return {
		products: {
			items: [
				{
					url_key: 'test-product-multiple',
					name: 'Test Product Multiple',
					sku: 'TEST456',
					porto_services_metadata: {
						product_type: 'multiple',
						product_front_name: 'Test Product Multiple Front',
						id: '3',
						partner_product_id: '1003',
						service_type_id: '2003',
						charge_type_id: '3003',
						specialty_code: 'SP003',
						origin_code: 'OR003',
						problem: 'No Problem',
						subject: 'Test Subject Multiple',
						is_new_product: false,
						is_offer_product: true,
						external_link_redirect: 'http://example.com/multiple',
						external_link_text: 'Example Link Multiple',
						has_external_link_redirect: false,
						card_price: {
							title: 'Price Title Multiple',
							final_price: '200',
							installment: { text: 'Installment Text Multiple' },
							discount: { text: 'Discount Text Multiple' },
							benefits: { text: 'Benefits Text Multiple' },
							old_price: '250',
							label: { text: 'Label Text Multiple', color: 'blue' },
						},
						max_services: 10,
						combo_id: 'combo456',
					},
					categories: [{ name: 'Category3' }, { name: 'Category4' }],
					items: [
						{
							options: [
								{
									product: {
										porto_services_metadata: {
											id: '4',
											product_front_name: 'Multiple Product',
											partner_product_id: '1004',
											service_type_id: '2004',
											charge_type_id: '3004',
											specialty_code: 'SP004',
											origin_code: 'OR004',
											problem: 'No Problem',
											subject: 'Multiple Subject',
											card_price: {
												final_price: '150',
											},
										},
										sku: 'MULTIPLE123',
									},
								},
							],
						},
					],
				},
			],
		},
	}
}

exports.PRODUCT_ALIAS_MULTIPLE_DYNAMIC = () => {
	return {
		products: {
			items: [
				{
					name: 'CASA EM DIA',
					sku: 'CD001',
					url_key: 'test-product-multiple-dynamic',
					categories: [
						{
							name: 'Porto Serviços',
							icon_code: null,
							id: 3,
						},
						{
							name: 'Conserto e Manutenção',
							icon_code: 'icon-Wrench-tool',
							id: 18,
						},
						{
							name: 'Eletricista',
							icon_code: 'icon-Flash',
							id: 21,
						},
						{
							name: 'Eletros',
							icon_code: 'icon-Washing-machine',
							id: 24,
						},
						{
							name: 'Fixação',
							icon_code: 'icon-photo-gallery',
							id: 30,
						},
						{
							name: 'Instalação e Fixação',
							icon_code: 'icon-Drill-machine',
							id: 36,
						},
						{
							name: 'Destaques',
							icon_code: 'icon-Star',
							id: 45,
						},
					],
					porto_services_metadata: {
						id: 3867,
						product_front_name: 'Combo casa em dia',
						product_type: 'multiple_dynamic',
						max_services: 500,
						is_new_product: false,
						is_offer_product: false,
						partner_product_id: 4976,
						service_type_id: 28,
						charge_type_id: 7,
						specialty_code: '3279',
						origin_code: '9',
						problem: '3057',
						subject: 'C88',
						combo_id: 1,
						has_external_link_redirect: false,
						external_link_redirect:
							'https://stage.portoseguro.com.br/servicos/combo-casa-em-dia',
						external_link_text: 'Compre agora',
						card_price: {
							title: null,
							title_with_html: null,
							discount: {
								text: null,
							},
							installment: {
								text: 'Apartir de',
							},
							benefits: {
								text: '20% OFF e até 10x no Cartão Porto',
							},
							label: {
								text: null,
								color: null,
								resume_price: 299.9,
							},
							old_price: null,
							final_price: 299.9,
						},
						thumbnail_url: null,
						alt_thumbnail_url: null,
					},
					items: [
						{
							options: [
								{
									product: {
										sku: 'CD001-289',
										porto_services_metadata: {
											id: 289,
											product_front_name: 'Instalação ducha de banho + suporte',
											product_type: 'single',
											partner_product_id: null,
											service_type_id: null,
											charge_type_id: 1,
											specialty_code: null,
											origin_code: null,
											problem: null,
											subject: null,
											combo_item_is_required: false,
											question_code: null,
											card_price: {
												final_price: null,
											},
										},
									},
								},
								{
									product: {
										sku: 'CD001-275',
										porto_services_metadata: {
											id: 275,
											product_front_name:
												'Conserto resistência de ducha elétrica',
											product_type: 'single',
											partner_product_id: null,
											service_type_id: null,
											charge_type_id: 1,
											specialty_code: null,
											origin_code: null,
											problem: null,
											subject: null,
											combo_item_is_required: false,
											question_code: null,
											card_price: {
												final_price: null,
											},
										},
									},
								},
								{
									product: {
										sku: 'CD001-280',
										porto_services_metadata: {
											id: 280,
											product_front_name:
												'Conserto vazamento de causa aparente',
											product_type: 'single',
											partner_product_id: null,
											service_type_id: null,
											charge_type_id: 1,
											specialty_code: null,
											origin_code: null,
											problem: null,
											subject: null,
											combo_item_is_required: false,
											question_code: null,
											card_price: {
												final_price: null,
											},
										},
									},
								},
							],
						},
					],
				},
			],
		},
	}
}

exports.PRODUCT_ALIAS_NO_ITEMS = () => {
	return { products: { items: [] } }
}

exports.CATEGORIES = () => {
	return {
		getPortoServicesCategories: {
			items: [
				{ id: '1', name: 'Category1', icon_code: 'icon1' },
				{ id: '2', name: 'Category2', icon_code: 'icon2' },
			],
		},
	}
}

exports.CATEGORIES_VITRINE = () => {
	return [
		{ name: 'Category2', hash: 'category2', displayOrder: 1, menu: 'Menu2' },
		{ name: 'Category1', hash: 'category1', displayOrder: 2, menu: 'Menu1' },
	]
}

exports.PROCESSPRODUCT_RESULT = () => ({
	alias: 'test-product',
	name: 'Test Product',
	needDescription: null,
	description: '',
	title: 'Test Product Front',
	id: '1',
	sku: 'TEST123',
	sortWeight: null,
	type: 'variant',
	partnerProductId: '1001',
	serviceTypeId: '2001',
	chargeTypeId: '3001',
	specialtyCode: 'SP001',
	originCode: 'OR001',
	companyCode: '51',
	sourceSystemCode: '36',
	problem: 'No Problem',
	subject: 'Test Subject',
	isNew: true,
	isOffer: false,
	link: {
		href: 'http://example.com',
		text: 'Example Link',
		isRedirectLink: true,
	},
	image: {
		alt: 'Descriçao Imagem',
		src: 'https://www.portoseguro.com.br/content/dam/home/seguro_vida.webp',
	},
	cardPrice: {
		title: 'Price Title',
		titleWithHtml: null,
		price: 100,
		instalmentText: 'Installment Text',
		discount: 'Discount Text',
		benefitsText: 'Benefits Text',
		benefitsShopWindow: ['Atendimento rápido', 'Profissionais qualificados'],
		oldPrice: 150,
		label: {
			text: 'Label Text',
			color: 'red',
		},
	},
	cupons: [],
	categories: {
		category: 'Category1',
		subCategory: 'Porto Serviços',
	},
	maxServices: 5,
	comboId: 'combo123',
	items: [
		{
			sku: 'VARIANT123',
			id: '2',
			description: 'Variant Product',
			label: 'Variant Product',
			partnerProductId: '1002',
			serviceTypeId: '2002',
			chargeTypeId: '3002',
			specialtyCode: 'SP002',
			originCode: 'OR002',
			companyCode: '51',
			sourceSystemCode: '36',
			problem: 'No Problem',
			subject: 'Variant Subject',
			price: 80,
			category: 'Category1',
			subCategory: 'Porto Serviços',
		},
	],
})
