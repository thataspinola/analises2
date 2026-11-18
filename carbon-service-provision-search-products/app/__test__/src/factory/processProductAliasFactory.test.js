const factory = require('../../../src/factory')
const MOCKS = require('../../mocks/index.mock')

describe('process', () => {
	test('It should return processed product data for variation type', () => {
		const value = 'test-product'
		const productAlias =
			MOCKS.FACTORY_SEARCHPRODUCT_ALIAS.PRODUCT_ALIAS_VARIATION()
		const result = factory.processProductAlias.process(productAlias, value)
		expect(result).toEqual(
			MOCKS.FACTORY_SEARCHPRODUCT_ALIAS.PROCESSPRODUCT_RESULT()
		)
	})

	test('It should return null if input productAlias has no items', () => {
		const value = 'test-product'
		const productAlias =
			MOCKS.FACTORY_SEARCHPRODUCT_ALIAS.PRODUCT_ALIAS_NO_ITEMS()
		const result = factory.processProductAlias.process(productAlias, value)
		expect(result).toEqual(null)
	})

	test('It should include the property needDescription', () => {
		const value = 'test-product'

		const productAlias =
			MOCKS.FACTORY_SEARCHPRODUCT_ALIAS.PRODUCT_ALIAS_VARIATION()

		productAlias.products.items[0].porto_services_metadata.need_description = true

		const result = factory.processProductAlias.process(productAlias, value)

		expect(result.needDescription).toEqual(true)
	})

	test('It should include the property cupons', () => {
		const value = 'test-product'

		const productAlias =
			MOCKS.FACTORY_SEARCHPRODUCT_ALIAS.PRODUCT_ALIAS_VARIATION()

		productAlias.products.items[0].porto_services_coupons = [
			{
				name: 'PORTOON20',
				product_card_coupon_tag_text_color: 'white',
				product_card_coupon_tag_bg_color: 'dark-blue',
				product_page_coupon_description:
					'Garanta 20% de desconto utilizando o cupom:',
			},
		]

		const result = factory.processProductAlias.process(productAlias, value)

		expect(result.cupons).toEqual([
			{
				name: 'PORTOON20',
				tagTextColor: 'white',
				tagBgColor: 'dark-blue',
				description: 'Garanta 20% de desconto utilizando o cupom:',
			},
		])
	})

	test('It should include the property items when product_type is dynamic_combo', () => {
		const value = 'test-product-multiple-dynamic'

		const productAlias =
			MOCKS.FACTORY_SEARCHPRODUCT_ALIAS.PRODUCT_ALIAS_MULTIPLE_DYNAMIC()

		const result = factory.processProductAlias.process(productAlias, value)

		expect(result.items).toEqual([
			{
				id: 289,
				description: 'Instalação ducha de banho + suporte',
				label: 'Instalação ducha de banho + suporte',
				category: 'Conserto e Manutenção',
				subCategory: 'Porto Serviços',
				required: false,
				questionCode: null,
				subItemCategory: null,
			},
			{
				id: 275,
				description: 'Conserto resistência de ducha elétrica',
				label: 'Conserto resistência de ducha elétrica',
				category: 'Conserto e Manutenção',
				subCategory: 'Porto Serviços',
				required: false,
				questionCode: null,
				subItemCategory: null,
			},
			{
				id: 280,
				description: 'Conserto vazamento de causa aparente',
				label: 'Conserto vazamento de causa aparente',
				category: 'Conserto e Manutenção',
				subCategory: 'Porto Serviços',
				required: false,
				questionCode: null,
				subItemCategory: null,
			},
		])
	})
})
