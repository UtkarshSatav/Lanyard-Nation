import { Check, Star } from 'lucide-react';
import { Link } from 'react-router-dom';

const pricingTiers = [
  {
    product: 'Printed Lanyards',
    description: 'Perfect for events, conferences, and corporate use',
    productId: 'printed-lanyards',
    tiers: [
      { quantity: '50-99', price: 1.20, popular: false },
      { quantity: '100-249', price: 0.95, popular: false },
      { quantity: '250-499', price: 0.75, popular: true },
      { quantity: '500-999', price: 0.60, popular: false },
      { quantity: '1000-2499', price: 0.45, popular: false },
      { quantity: '2500+', price: 0.30, popular: false }
    ],
    features: [
      'Free design proof',
      '1-3 color printing',
      'Multiple attachment options',
      'Fast 5-8 day delivery',
      'Bulk discounts available'
    ]
  },
  {
    product: 'Woven Lanyards',
    description: 'Premium quality with intricate designs',
    productId: 'woven-lanyards',
    tiers: [
      { quantity: '50-99', price: 1.80, popular: false },
      { quantity: '100-249', price: 1.45, popular: false },
      { quantity: '250-499', price: 1.20, popular: true },
      { quantity: '500-999', price: 0.95, popular: false },
      { quantity: '1000-2499', price: 0.75, popular: false },
      { quantity: '2500+', price: 0.55, popular: false }
    ],
    features: [
      'Premium woven fabric',
      'Detailed logo reproduction',
      'Ultra-durable design',
      'Professional finish',
      'Eco-friendly options'
    ]
  },
  {
    product: 'Silicone Wristbands',
    description: 'Durable and comfortable for any occasion',
    productId: 'silicone-wristbands',
    tiers: [
      { quantity: '50-99', price: 0.65, popular: false },
      { quantity: '100-249', price: 0.50, popular: false },
      { quantity: '250-499', price: 0.35, popular: true },
      { quantity: '500-999', price: 0.25, popular: false },
      { quantity: '1000-2499', price: 0.18, popular: false },
      { quantity: '2500+', price: 0.12, popular: false }
    ],
    features: [
      'Waterproof silicone',
      'Multiple printing options',
      'Comfortable fit',
      'Various colors available',
      'Perfect for events'
    ]
  },
  {
    product: 'Tyvek Wristbands',
    description: 'Secure and affordable for single-day events',
    productId: 'tyvek-wristbands',
    tiers: [
      { quantity: '100-249', price: 0.35, popular: false },
      { quantity: '250-499', price: 0.25, popular: false },
      { quantity: '500-999', price: 0.18, popular: true },
      { quantity: '1000-2499', price: 0.12, popular: false },
      { quantity: '2500-4999', price: 0.08, popular: false },
      { quantity: '5000+', price: 0.05, popular: false }
    ],
    features: [
      'Tamper-proof design',
      'Custom printing',
      'Water-resistant',
      'Quick turnaround',
      'Bulk pricing available'
    ]
  }
];

const bulkDiscounts = [
  { threshold: '50+', discount: 'Base Price' },
  { threshold: '100+', discount: 'Save 20%' },
  { threshold: '250+', discount: 'Save 35%' },
  { threshold: '500+', discount: 'Save 50%' },
  { threshold: '1000+', discount: 'Save 60%' },
  { threshold: '2500+', discount: 'Save 75%' }
];

export function PricingPage() {
  return (
    <div className="min-h-screen bg-white pt-20">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-[#0F2E4D] via-[#2D7F88] to-[#0F2E4D] text-white py-20">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl lg:text-6xl font-bold mb-6">
            Transparent Pricing
          </h1>
          <p className="text-xl lg:text-2xl max-w-3xl mx-auto opacity-90">
            No hidden fees. No surprises. Just honest pricing for quality products.
          </p>
        </div>
      </section>

      {/* Bulk Discount Overview */}
      <section className="py-16 bg-[#F7F9FB]">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white rounded-full mb-4">
              <span className="text-[#2D7F88] font-semibold">Volume Discounts</span>
            </div>
            <h2 className="text-4xl font-bold text-[#0F2E4D] mb-4">
              The More You Order, The More You Save
            </h2>
            <p className="text-xl text-[#5A5A5A] max-w-2xl mx-auto">
              Our tiered pricing ensures you get the best value for your bulk orders
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {bulkDiscounts.map((item, index) => (
              <div
                key={index}
                className="bg-white rounded-xl p-6 text-center shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <div className="text-3xl font-bold text-[#2D7F88] mb-2">
                  {item.threshold}
                </div>
                <div className="text-sm font-semibold text-[#0F2E4D]">
                  {item.discount}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Tables */}
      <section className="py-20">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-20">
            {pricingTiers.map((product, productIndex) => (
              <div key={productIndex}>
                <div className="text-center mb-12">
                  <h2 className="text-4xl font-bold text-[#0F2E4D] mb-4">
                    {product.product}
                  </h2>
                  <p className="text-xl text-[#5A5A5A]">{product.description}</p>
                </div>

                {/* Desktop View - Table */}
                <div className="hidden lg:block bg-white rounded-2xl shadow-2xl overflow-hidden mb-8">
                  <table className="w-full">
                    <thead className="bg-gradient-to-r from-[#0F2E4D] to-[#2D7F88] text-white">
                      <tr>
                        <th className="px-6 py-4 text-left font-bold">Quantity</th>
                        <th className="px-6 py-4 text-left font-bold">Price per Unit</th>
                        <th className="px-6 py-4 text-left font-bold">You Save</th>
                        <th className="px-6 py-4 text-left font-bold">Total Price</th>
                        <th className="px-6 py-4 text-right font-bold">Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {product.tiers.map((tier, index) => {
                        const minQuantity = parseInt(tier.quantity.split('-')[0].replace('+', ''));
                        const totalPrice = tier.price * minQuantity;
                        const savings = index === 0 ? 0 : ((product.tiers[0].price - tier.price) / product.tiers[0].price * 100);

                        return (
                          <tr
                            key={index}
                            className={`border-b border-gray-100 ${
                              tier.popular ? 'bg-[#2D7F88]/5' : index % 2 === 0 ? 'bg-white' : 'bg-[#F7F9FB]'
                            } hover:bg-[#2D7F88]/10 transition-colors relative`}
                          >
                            {/* {tier.popular && (
                              <td colSpan={5} className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                                <span className="inline-flex items-center gap-1 px-4 py-1 bg-[#FF8C42] text-white rounded-full text-xs font-bold uppercase">
                                  <Star className="w-3 h-3 fill-current" />
                                  Most Popular
                                </span>
                              </td>
                            )} */}
                            <td className={`px-6 ${tier.popular ? 'pt-8 pb-4' : 'py-4'} font-semibold text-[#0F2E4D]`}>
                              {tier.quantity} units
                            </td>
                            <td className={`px-6 ${tier.popular ? 'pt-8 pb-4' : 'py-4'} text-[#2D7F88] font-bold text-xl`}>
                              £{tier.price.toFixed(2)}
                            </td>
                            <td className={`px-6 ${tier.popular ? 'pt-8 pb-4' : 'py-4'}`}>
                              {savings > 0 && (
                                <span className="px-3 py-1 bg-[#FF8C42] text-white rounded-full text-sm font-semibold">
                                  {savings.toFixed(0)}% OFF
                                </span>
                              )}
                            </td>
                            <td className={`px-6 ${tier.popular ? 'pt-8 pb-4' : 'py-4'} font-bold text-[#0F2E4D] text-lg`}>
                              £{totalPrice.toFixed(2)}+
                            </td>
                            <td className={`px-6 ${tier.popular ? 'pt-8 pb-4' : 'py-4'} text-right`}>
                              <Link
                                to={`/product/${product.productId}`}
                                className="inline-block px-6 py-2 bg-[#2D7F88] text-white rounded-lg hover:bg-[#0F2E4D] transition-all font-semibold"
                              >
                                Order Now
                              </Link>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>

                {/* Mobile View - Cards */}
                <div className="lg:hidden grid gap-4 mb-8">
                  {product.tiers.map((tier, index) => {
                    const minQuantity = parseInt(tier.quantity.split('-')[0].replace('+', ''));
                    const totalPrice = tier.price * minQuantity;
                    const savings = index === 0 ? 0 : ((product.tiers[0].price - tier.price) / product.tiers[0].price * 100);

                    return (
                      <div
                        key={index}
                        className={`bg-white rounded-xl p-6 shadow-lg ${
                          tier.popular ? 'ring-2 ring-[#2D7F88]' : ''
                        } relative`}
                      >
                        {tier.popular && (
                          <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                            <span className="inline-flex items-center gap-1 px-4 py-1 bg-[#FF8C42] text-white rounded-full text-xs font-bold uppercase">
                              <Star className="w-3 h-3 fill-current" />
                              Most Popular
                            </span>
                          </div>
                        )}
                        <div className="flex justify-between items-start mb-4">
                          <div>
                            <div className="text-2xl font-bold text-[#0F2E4D]">
                              {tier.quantity}
                            </div>
                            <div className="text-sm text-[#5A5A5A]">units</div>
                          </div>
                          {savings > 0 && (
                            <span className="px-3 py-1 bg-[#FF8C42] text-white rounded-full text-xs font-semibold">
                              {savings.toFixed(0)}% OFF
                            </span>
                          )}
                        </div>
                        <div className="mb-4">
                          <div className="text-3xl font-bold text-[#2D7F88] mb-1">
                            £{tier.price.toFixed(2)}
                          </div>
                          <div className="text-sm text-[#5A5A5A]">per unit</div>
                        </div>
                        <div className="mb-4 pb-4 border-b border-gray-200">
                          <div className="text-sm text-[#5A5A5A] mb-1">Total from</div>
                          <div className="text-xl font-bold text-[#0F2E4D]">
                            £{totalPrice.toFixed(2)}
                          </div>
                        </div>
                        <Link
                          to={`/product/${product.productId}`}
                          className="block w-full py-3 bg-[#2D7F88] text-white rounded-lg hover:bg-[#0F2E4D] transition-all font-semibold text-center"
                        >
                          Order Now
                        </Link>
                      </div>
                    );
                  })}
                </div>

                {/* Features List */}
                <div className="bg-[#F7F9FB] rounded-xl p-8">
                  <h3 className="font-bold text-[#0F2E4D] mb-6 text-xl">
                    What's Included:
                  </h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    {product.features.map((feature, index) => (
                      <div key={index} className="flex items-center gap-3">
                        <div className="w-6 h-6 bg-[#2D7F88] rounded-full flex items-center justify-center flex-shrink-0">
                          <Check className="w-4 h-4 text-white" />
                        </div>
                        <span className="text-[#5A5A5A]">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Additional Information */}
      <section className="py-16 bg-[#F7F9FB]">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-2xl p-8 md:p-12 shadow-xl">
            <h2 className="text-3xl font-bold text-[#0F2E4D] mb-6 text-center">
              Pricing Information
            </h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="font-bold text-[#0F2E4D] mb-4 flex items-center gap-2">
                  <Check className="w-5 h-5 text-[#2D7F88]" />
                  What's Included
                </h3>
                <ul className="space-y-2 text-[#5A5A5A]">
                  <li>• Free design proof and revisions</li>
                  <li>• Multiple attachment options</li>
                  <li>• Standard UK delivery</li>
                  <li>• Quality guarantee</li>
                  <li>• Customer support</li>
                </ul>
              </div>
              <div>
                <h3 className="font-bold text-[#0F2E4D] mb-4 flex items-center gap-2">
                  <Check className="w-5 h-5 text-[#2D7F88]" />
                  Additional Options
                </h3>
                <ul className="space-y-2 text-[#5A5A5A]">
                  <li>• Express production (+30%)</li>
                  <li>• Next day delivery (from £15)</li>
                  <li>• Premium packaging (+£0.10/unit)</li>
                  <li>• Safety breakaway clips (+£0.10/unit)</li>
                  <li>• Custom pantone matching (+£25)</li>
                </ul>
              </div>
            </div>
            <div className="mt-8 p-6 bg-[#2D7F88]/10 rounded-lg">
              <p className="text-center text-[#0F2E4D] font-semibold">
                📦 All prices exclude VAT • 🚚 Free delivery on orders over £150 • 
                💰 Volume discounts automatically applied
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-[#0F2E4D] via-[#2D7F88] to-[#0F2E4D] text-white">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl lg:text-5xl font-bold mb-6">
            Need a Custom Quote?
          </h2>
          <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
            For orders over 5000 units or special requirements, contact our team 
            for a personalized quote.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/contact"
              className="px-8 py-4 bg-white text-[#2D7F88] rounded-lg hover:bg-[#F7F9FB] transition-all duration-300 font-bold uppercase tracking-wide"
            >
              Contact Sales
            </a>
            <a
              href="https://wa.me/1234567890"
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-4 bg-[#25D366] text-white rounded-lg hover:bg-[#20ba59] transition-all duration-300 font-bold uppercase tracking-wide"
            >
              WhatsApp Us
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
