exports.mapCoupons = (coupons) => {
	return {
		coupons: coupons.map((coupon) => ({
			name: coupon.name,
			description: coupon.product_page_coupon_description,
			startAt: coupon.start_at,
			endAt: coupon.end_at,
			tagTextColor: coupon.product_card_coupon_tag_text_color,
			tagBgColor: coupon.product_card_coupon_tag_bg_color,
			bannerData: coupon.home_banner_json,
		})),
	}
}
