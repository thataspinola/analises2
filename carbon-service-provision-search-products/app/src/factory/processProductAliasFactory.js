const CONSTANT = require('../../src/property')

exports.process = (productAlias, value) => {
	if (productAlias?.products?.items?.length === 0) {
		return null
	}

	const [dataProduct] = value
		? productAlias.products.items.filter((item) => item.url_key === value)
		: productAlias.products.items

	const categoriesList = processCategories(dataProduct.categories)
	let itemsList = []

	if (dataProduct.porto_services_metadata.product_type === 'variation') {
		itemsList = processItemsTypeVariant(
			dataProduct.items[0].options,
			categoriesList
		)
		dataProduct.porto_services_metadata.product_type = 'variant'
	} else if (
		dataProduct.porto_services_metadata.product_type === 'multiple' ||
		dataProduct.porto_services_metadata.product_type === 'multiple_dynamic'
	) {
		itemsList = processItems(dataProduct.items[0].options, categoriesList)
	}

	return {
		alias: dataProduct.url_key,
		name: dataProduct.name ?? 'name',
		description: dataProduct.porto_services_metadata.description ?? '',
		sortWeight: dataProduct.porto_services_metadata.sort_weight ?? null,
		title: dataProduct.porto_services_metadata.product_front_name,
		id: dataProduct.porto_services_metadata.id,
		sku: dataProduct.sku,
		type: dataProduct.porto_services_metadata.product_type,
		partnerProductId: String(
			dataProduct.porto_services_metadata.partner_product_id
		),
		serviceTypeId: dataProduct.porto_services_metadata.service_type_id,
		chargeTypeId: dataProduct.porto_services_metadata.charge_type_id,
		specialtyCode: dataProduct.porto_services_metadata.specialty_code ?? null,
		originCode: dataProduct.porto_services_metadata.origin_code ?? null,
		companyCode: '51',
		sourceSystemCode: '36',
		problem: dataProduct.porto_services_metadata.problem ?? null,
		subject: dataProduct.porto_services_metadata.subject ?? null,
		isNew: dataProduct.porto_services_metadata.is_new_product ?? false,
		isOffer: dataProduct.porto_services_metadata.is_offer_product ?? false,
		link: {
			href: dataProduct.porto_services_metadata.external_link_redirect,
			text: dataProduct.porto_services_metadata.external_link_text,
			isRedirectLink:
				dataProduct.porto_services_metadata.has_external_link_redirect,
		},
		image: {
			alt:
				dataProduct.porto_services_metadata.alt_thumbnail_url ??
				PRODUCT_DEFAULT_VALUE.imageAlt,
			src:
				dataProduct.porto_services_metadata.thumbnail_url ??
				PRODUCT_DEFAULT_VALUE.imageUrl,
		},
		cardPrice: {
			title: dataProduct.porto_services_metadata.card_price.title ?? '',
			titleWithHtml:
				dataProduct.porto_services_metadata.card_price.title_with_html ?? null,
			price: processPriceValue(
				dataProduct.porto_services_metadata.card_price.final_price
			),
			instalmentText:
				dataProduct.porto_services_metadata.card_price.installment.text ?? '',
			discount:
				dataProduct.porto_services_metadata.card_price.discount.text ?? '',
			benefitsText:
				dataProduct.porto_services_metadata.card_price.benefits.text ?? '',
			benefitsShopWindow:
				dataProduct.porto_services_metadata.card_price.benefits.shop_window ??
				[],
			oldPrice: processPriceValue(
				dataProduct.porto_services_metadata.card_price.old_price
			),
			label: {
				text: dataProduct.porto_services_metadata.card_price.label.text ?? '',
				color: dataProduct.porto_services_metadata.card_price.label.color ?? '',
			},
		},
		cupons: mapProductCupons(dataProduct),
		categories: categoriesList,
		maxServices: dataProduct.porto_services_metadata.max_services ?? null,
		comboId: dataProduct.porto_services_metadata.combo_id ?? null,
		items: itemsList,
		needDescription:
			dataProduct.porto_services_metadata.need_description ?? null,
	}
}

const mapProductCupons = (product) => {
	if (
		!product.porto_services_coupons ||
		product.porto_services_coupons?.length === 0
	)
		return []

	return product.porto_services_coupons.map((coupon) => ({
		name: coupon.name,
		tagTextColor: coupon.product_card_coupon_tag_text_color,
		tagBgColor: coupon.product_card_coupon_tag_bg_color,
		description: coupon.product_page_coupon_description,
	}))
}

const processCategories = (categoriesList) => {
	categoriesList = categoriesList.filter(
		(categories) =>
			categories.name !== 'Porto Serviços' &&
			categories.name !== 'Casa' &&
			categories.name !== 'Carro'
	)
	if (categoriesList.length >= 1) {
		return {
			category: categoriesList[0].name,
			subCategory: 'Porto Serviços',
		}
	} else {
		return {
			category: '',
			subCategory: 'Porto Serviços',
		}
	}
}

const processItems = (itemsList, categoriesList) => {
	const returnItems = itemsList.map((product) => ({
		id: product.product.porto_services_metadata.id,
		description: product.product.porto_services_metadata.product_front_name,
		label: product.product.porto_services_metadata.product_front_name,
		category: categoriesList.category,
		subCategory: categoriesList.subCategory,
		required: product.product.porto_services_metadata.combo_item_is_required,
		questionCode: product.product.porto_services_metadata.question_code,
		subItemCategory: product.product.porto_services_metadata.subitem_category ?? null,
	}))

	return returnItems
}

const processItemsTypeVariant = (itemsList, categoriesList) => {
	const returnItems = itemsList.map((product) => ({
		sku: product.product.sku,
		id: product.product.porto_services_metadata.id,
		description: product.product.porto_services_metadata.product_front_name,
		label: product.product.porto_services_metadata.product_front_name,
		partnerProductId: String(
			product.product.porto_services_metadata.partner_product_id
		),
		serviceTypeId: product.product.porto_services_metadata.service_type_id,
		chargeTypeId: product.product.porto_services_metadata.charge_type_id,
		specialtyCode: product.product.porto_services_metadata.specialty_code,
		originCode: product.product.porto_services_metadata.origin_code,
		companyCode: '51',
		sourceSystemCode: '36',
		problem: product.product.porto_services_metadata.problem,
		subject: product.product.porto_services_metadata.subject,
		price: processPriceValue(
			product.product.porto_services_metadata.card_price.final_price
		),
		category: categoriesList.category,
		subCategory: categoriesList.subCategory,
	}))

	return returnItems
}

const PRODUCT_DEFAULT_VALUE = {
	imageAlt: 'Descriçao Imagem',
	imageUrl: 'https://www.portoseguro.com.br/content/dam/home/seguro_vida.webp',
}

exports.processAllCategories = (categories, categories_vitrine) => {
	categories = categories.getPortoServicesCategories.items
	const categoriesResponse = []
	const addedCategories = new Set()

	categories.forEach((category) => {
		const categoryVitrineItem = categories_vitrine.find(
			(category_vitrine) => category_vitrine.name === category.name
		)

		const displayOrder = categoryVitrineItem
			? String(categoryVitrineItem.displayOrder)
			: ''
		const menu = categoryVitrineItem ? categoryVitrineItem.menu : null
		const hash = categoryVitrineItem ? categoryVitrineItem.hash : null

		if (!addedCategories.has(category.name)) {
			categoriesResponse.push({
				id: category.id,
				category: category.name,
				icon: category.icon_code,
				displayOrder,
				menu,
				hash,
				products: [{}],
			})
			addedCategories.add(category.name)
		}
	})

	categoriesResponse.sort((a, b) => {
		const nameItem = categories_vitrine.find((item) => item.name === a.category)
		const menuItem = categories_vitrine.find((item) => item.name === b.category)
		return (nameItem?.displayOrder || 0) - (menuItem?.displayOrder || 0)
	})

	const orderedCategoriesResponse = CONSTANT.CATEGORIES_VITRINE.map(
		(category) => {
			const foundCategory = categoriesResponse.find(
				(item) => item.category === category.name
			)
			return (
				foundCategory || {
					id: null,
					category: category.name,
					icon: null,
					menu: category.menu,
					hash: category.hash,
					products: [{}],
					displayOrder: '',
				}
			)
		}
	)

	return orderedCategoriesResponse
}

const processPriceValue = (priceValue) => {
	priceValue = priceValue ? Number(priceValue) : null
	return priceValue
}
