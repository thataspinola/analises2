const factory = require('../../../src/factory');

describe('mapCoupons', () => {
  it('should map coupons correctly', () => {
    const inputCoupons = [
      {
        name: 'Discount 10%',
        product_page_coupon_description: 'Save 10% on your next purchase',
        start_at: '2023-01-01',
        end_at: '2023-12-31',
        product_card_coupon_tag_text_color: '#FFFFFF',
        product_card_coupon_tag_bg_color: '#000000',
        home_banner_json: { banner: 'New Year Sale' },
      },
    ];

    const expectedOutput = {
      coupons: [
        {
          name: 'Discount 10%',
          description: 'Save 10% on your next purchase',
          startAt: '2023-01-01',
          endAt: '2023-12-31',
          tagTextColor: '#FFFFFF',
          tagBgColor: '#000000',
          bannerData: { banner: 'New Year Sale' },
        },
      ],
    };

    const result = factory.coupons.mapCoupons(inputCoupons);
    expect(result).toEqual(expectedOutput);
  });

  it('should return an empty array when no coupons are provided', () => {
    const inputCoupons = [];
    const expectedOutput = { coupons: [] };

    const result = factory.coupons.mapCoupons(inputCoupons);
    expect(result).toEqual(expectedOutput);
  });
});