import { useState } from 'react';
import { Calculator, Check } from 'lucide-react';

export function PriceCalculator() {
  const [quantity, setQuantity] = useState(500);
  const [productType, setProductType] = useState('lanyard');
  const [printType, setPrintType] = useState('screen');
  const [accessories, setAccessories] = useState<string[]>([]);

  // Price calculation logic
  const calculatePrice = () => {
    let basePrice = 0;
    
    // Base price by product type
    const productPrices: { [key: string]: number } = {
      'lanyard': 0.30,
      'wristband': 0.25,
      'silicone': 0.25,
      'id-holder': 0.50,
      'plain': 0.20,
      'eco': 0.40
    };
    
    basePrice = productPrices[productType] || 0.30;
    
    // Print type adjustment
    const printMultipliers: { [key: string]: number } = {
      'screen': 1,
      'sublimation': 1.2,
      'woven': 1.5
    };
    
    basePrice *= printMultipliers[printType] || 1;
    
    // Accessories
    const accessoryPrice = accessories.length * 0.10;
    
    // Quantity discounts
    let discount = 1;
    if (quantity >= 5000) discount = 0.70; // 30% off
    else if (quantity >= 2000) discount = 0.80; // 20% off
    else if (quantity >= 1000) discount = 0.85; // 15% off
    else if (quantity >= 500) discount = 0.90; // 10% off
    
    const total = (basePrice + accessoryPrice) * quantity * discount;
    const unitPrice = (basePrice + accessoryPrice) * discount;
    
    return {
      unitPrice: unitPrice.toFixed(2),
      total: total.toFixed(2),
      discount: Math.round((1 - discount) * 100)
    };
  };

  const price = calculatePrice();

  const handleAccessoryToggle = (accessory: string) => {
    setAccessories(prev => 
      prev.includes(accessory) 
        ? prev.filter(a => a !== accessory)
        : [...prev, accessory]
    );
  };

  return (
    <section id="quote" className="py-20 bg-gradient-to-br from-[#0F2E4D] to-[#2D7F88]">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full mb-4">
            <Calculator className="w-5 h-5 text-[#6EB5B7]" />
            <span className="text-white font-semibold">Price Estimator</span>
          </div>
          <h2 className="text-4xl lg:text-5xl font-bold text-white mb-4">
            Get Your Instant Quote
          </h2>
          <p className="text-xl text-white/90 max-w-2xl mx-auto">
            Transparent pricing with no hidden fees. See exactly what you'll pay.
          </p>
        </div>

        {/* Calculator Card */}
        <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">
          <div className="grid lg:grid-cols-2">
            {/* Left Side - Configuration */}
            <div className="p-8 lg:p-12 space-y-8">
              <h3 className="text-2xl font-bold text-[#0F2E4D] mb-6">
                Configure Your Order
              </h3>

              {/* Quantity Slider */}
              <div>
                <label className="block text-sm font-semibold text-[#0F2E4D] mb-3">
                  Quantity: <span className="text-[#2D7F88]">{quantity}</span>
                </label>
                <input 
                  type="range"
                  min="100"
                  max="10000"
                  step="100"
                  value={quantity}
                  onChange={(e) => setQuantity(Number(e.target.value))}
                  className="w-full h-3 bg-[#F7F9FB] rounded-lg appearance-none cursor-pointer accent-[#2D7F88]"
                />
                <div className="flex justify-between text-xs text-[#5A5A5A] mt-2">
                  <span>100</span>
                  <span>5,000</span>
                  <span>10,000</span>
                </div>
              </div>

              {/* Product Type */}
              <div>
                <label className="block text-sm font-semibold text-[#0F2E4D] mb-3">
                  Product Type
                </label>
                <div className="grid grid-cols-2 gap-3">
                  {[
                    { value: 'lanyard', label: 'Custom Lanyard' },
                    { value: 'wristband', label: 'Festival Band' },
                    { value: 'silicone', label: 'Silicone Band' },
                    { value: 'id-holder', label: 'ID Holder' },
                    { value: 'plain', label: 'Plain Lanyard' },
                    { value: 'eco', label: 'Eco Collection' }
                  ].map(option => (
                    <button
                      key={option.value}
                      onClick={() => setProductType(option.value)}
                      className={`p-3 rounded-lg border-2 transition-all duration-300 font-medium ${
                        productType === option.value
                          ? 'border-[#2D7F88] bg-[#2D7F88] text-white'
                          : 'border-gray-200 bg-white text-[#5A5A5A] hover:border-[#2D7F88]'
                      }`}
                    >
                      {option.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Print Type */}
              <div>
                <label className="block text-sm font-semibold text-[#0F2E4D] mb-3">
                  Print Method
                </label>
                <div className="space-y-2">
                  {[
                    { value: 'screen', label: 'Screen Print', desc: 'Standard quality' },
                    { value: 'sublimation', label: 'Sublimation', desc: 'High quality colors' },
                    { value: 'woven', label: 'Woven', desc: 'Premium finish' }
                  ].map(option => (
                    <button
                      key={option.value}
                      onClick={() => setPrintType(option.value)}
                      className={`w-full p-4 rounded-lg border-2 transition-all duration-300 text-left ${
                        printType === option.value
                          ? 'border-[#2D7F88] bg-[#F7F9FB]'
                          : 'border-gray-200 bg-white hover:border-[#2D7F88]'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="font-semibold text-[#0F2E4D]">{option.label}</div>
                          <div className="text-sm text-[#5A5A5A]">{option.desc}</div>
                        </div>
                        {printType === option.value && (
                          <Check className="w-5 h-5 text-[#2D7F88]" />
                        )}
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Accessories */}
              <div>
                <label className="block text-sm font-semibold text-[#0F2E4D] mb-3">
                  Add Accessories (+£0.10 each)
                </label>
                <div className="space-y-2">
                  {[
                    { value: 'safety-break', label: 'Safety Breakaway' },
                    { value: 'badge-reel', label: 'Badge Reel' },
                    { value: 'key-ring', label: 'Key Ring' },
                    { value: 'phone-loop', label: 'Phone Loop' }
                  ].map(option => (
                    <button
                      key={option.value}
                      onClick={() => handleAccessoryToggle(option.value)}
                      className={`w-full p-3 rounded-lg border-2 transition-all duration-300 text-left flex items-center gap-3 ${
                        accessories.includes(option.value)
                          ? 'border-[#2D7F88] bg-[#F7F9FB]'
                          : 'border-gray-200 bg-white hover:border-[#2D7F88]'
                      }`}
                    >
                      <div className={`w-5 h-5 rounded border-2 flex items-center justify-center ${
                        accessories.includes(option.value)
                          ? 'border-[#2D7F88] bg-[#2D7F88]'
                          : 'border-gray-300'
                      }`}>
                        {accessories.includes(option.value) && (
                          <Check className="w-4 h-4 text-white" />
                        )}
                      </div>
                      <span className="font-medium text-[#0F2E4D]">{option.label}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Side - Price Summary */}
            <div className="bg-[#F7F9FB] p-8 lg:p-12 flex flex-col">
              <h3 className="text-2xl font-bold text-[#0F2E4D] mb-8">
                Price Summary
              </h3>

              <div className="space-y-6 flex-1">
                {/* Quantity */}
                <div className="flex justify-between items-center pb-4 border-b border-gray-300">
                  <span className="text-[#5A5A5A]">Quantity</span>
                  <span className="font-semibold text-[#0F2E4D]">{quantity} units</span>
                </div>

                {/* Unit Price */}
                <div className="flex justify-between items-center pb-4 border-b border-gray-300">
                  <span className="text-[#5A5A5A]">Price per unit</span>
                  <span className="font-semibold text-[#0F2E4D]">£{price.unitPrice}</span>
                </div>

                {/* Discount */}
                {price.discount > 0 && (
                  <div className="flex justify-between items-center pb-4 border-b border-gray-300">
                    <span className="text-[#5A5A5A]">Bulk Discount</span>
                    <span className="font-semibold text-[#FF8C42]">{price.discount}% OFF</span>
                  </div>
                )}

                {/* Total */}
                <div className="bg-white rounded-2xl p-6 shadow-lg">
                  <div className="text-sm text-[#5A5A5A] mb-2">Estimated Total</div>
                  <div className="text-5xl font-bold text-[#2D7F88] mb-4">
                    £{price.total}
                  </div>
                  <div className="text-sm text-[#5A5A5A]">
                    Including VAT • Free Shipping over £500
                  </div>
                </div>

                {/* Features */}
                <div className="space-y-3">
                  {[
                    'Free Design Assistance',
                    'Quality Guarantee',
                    'Fast Turnaround',
                    'No Hidden Fees'
                  ].map((feature, index) => (
                    <div key={index} className="flex items-center gap-3">
                      <Check className="w-5 h-5 text-[#2D7F88] flex-shrink-0" />
                      <span className="text-sm text-[#5A5A5A]">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* CTA Buttons */}
              <div className="space-y-3 mt-8">
                <button className="w-full py-4 bg-[#2D7F88] text-white rounded-lg hover:bg-[#0F2E4D] transition-all duration-300 font-bold uppercase tracking-wide">
                  Request Official Quote
                </button>
                <button className="w-full py-4 bg-white text-[#2D7F88] rounded-lg hover:bg-gray-50 transition-all duration-300 font-bold uppercase tracking-wide border-2 border-[#2D7F88]">
                  Chat with Expert
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Trust Badges */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-12 text-center text-white">
          <div>
            <div className="text-3xl font-bold mb-2">48hrs</div>
            <div className="text-sm text-white/80">Fastest Delivery</div>
          </div>
          <div>
            <div className="text-3xl font-bold mb-2">100+</div>
            <div className="text-sm text-white/80">MOQ Only</div>
          </div>
          <div>
            <div className="text-3xl font-bold mb-2">30%</div>
            <div className="text-sm text-white/80">Max Savings</div>
          </div>
          <div>
            <div className="text-3xl font-bold mb-2">FREE</div>
            <div className="text-sm text-white/80">Design Service</div>
          </div>
        </div>
      </div>
    </section>
  );
}
