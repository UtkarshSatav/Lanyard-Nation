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
      'lanyard': 35.50,
      'wristband': 15.25,
      'silicone': 12.50,
      'id-holder': 25.50,
      'plain': 20.00,
      'eco': 45.40
    };

    basePrice = productPrices[productType] || 35.50;

    // Print type adjustment
    const printMultipliers: { [key: string]: number } = {
      'screen': 1,
      'sublimation': 1.2,
      'woven': 1.5
    };

    basePrice *= printMultipliers[printType] || 1;

    // Accessories
    const accessoryPrice = accessories.length * 5.50;

    // Quantity discounts
    let discount = 1;
    if (quantity >= 5000) discount = 0.40; // 60% off
    else if (quantity >= 2000) discount = 0.50; // 50% off
    else if (quantity >= 1000) discount = 0.60; // 40% off
    else if (quantity >= 500) discount = 0.70; // 30% off

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
    <section id="quote" className="py-24 bg-background relative overflow-hidden">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col lg:flex-row gap-16 items-start">

          {/* Left: Info Section */}
          <div className="lg:w-1/3 space-y-8">
            <div>
              <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mb-6">
                <span className="material-symbols-outlined text-primary text-3xl font-bold">calculate</span>
              </div>
              <h2 className="text-4xl lg:text-5xl font-black text-navy-custom dark:text-white leading-tight mb-4 uppercase">
                Instant <br /><span className="text-primary italic">Pricing</span> Engine
              </h2>
              <p className="text-lg text-slate-500 font-medium">
                Our proprietary algorithm calculates the best bulk rates in real-time. No emails, no waiting—just instant transparency.
              </p>
            </div>

            <div className="space-y-4">
              {[
                { icon: 'task_alt', title: 'Zero Set-up Fees', desc: 'No hidden costs for custom plates' },
                { icon: 'speed', title: 'Rush Production', desc: '48h turnaround available' },
                { icon: 'workspace_premium', title: 'Tiered Savings', desc: 'Higher volume = Higher margin' }
              ].map((item, idx) => (
                <div key={idx} className="flex gap-4 p-4 rounded-xl border border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm">
                  <span className="material-symbols-outlined text-primary">{item.icon}</span>
                  <div>
                    <h4 className="font-bold text-navy-custom dark:text-white text-sm uppercase tracking-wider">{item.title}</h4>
                    <p className="text-xs text-slate-400 font-medium">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Calculator UI */}
          <div className="lg:w-2/3 w-full">
            <div className="bg-white dark:bg-slate-800 rounded-[32px] shadow-2xl shadow-navy-custom/10 border border-slate-100 dark:border-slate-700 overflow-hidden flex flex-col md:flex-row">

              {/* Configuration Panel */}
              <div className="md:w-3/5 p-8 lg:p-12 space-y-8 border-r border-slate-100 dark:border-slate-700">
                {/* Quantity */}
                <div>
                  <div className="flex justify-between items-end mb-4">
                    <label className="text-xs font-black text-slate-500 uppercase tracking-widest">Order Quantity</label>
                    <span className="text-3xl font-black text-primary">{quantity}<span className="text-sm font-bold text-slate-300 ml-1">UNITS</span></span>
                  </div>
                  <input
                    type="range"
                    min="100"
                    max="10000"
                    step="100"
                    value={quantity}
                    onChange={(e) => setQuantity(Number(e.target.value))}
                    className="w-full h-2 bg-slate-100 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-primary"
                  />
                  <div className="flex justify-between text-[10px] font-bold text-slate-300 mt-2 uppercase tracking-tighter">
                    <span>100 Units</span>
                    <span>10,000 Units</span>
                  </div>
                </div>

                {/* Product Type */}
                <div>
                  <label className="text-xs font-black text-slate-500 uppercase tracking-widest block mb-4">Select Category</label>
                  <div className="grid grid-cols-2 gap-2">
                    {[
                      { id: 'lanyard', label: 'Premium Lanyard' },
                      { id: 'wristband', label: 'Festival Band' },
                      { id: 'silicone', label: 'Silicone Band' },
                      { id: 'eco', label: 'Eco-Friendly' }
                    ].map(type => (
                      <button
                        key={type.id}
                        onClick={() => setProductType(type.id)}
                        className={`py-3 px-4 rounded-xl font-bold text-sm transition-all border-2 ${productType === type.id
                          ? 'border-primary bg-primary/5 text-primary'
                          : 'border-slate-50 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-slate-400'
                          }`}
                      >
                        {type.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Print Method */}
                <div>
                  <label className="text-xs font-black text-slate-500 uppercase tracking-widest block mb-4">Branding Method</label>
                  <div className="space-y-2">
                    {[
                      { id: 'screen', label: 'Single Color Screen Print', desc: 'Best for simple logos' },
                      { id: 'sublimation', label: 'Full Color Sublimation', desc: 'Edge-to-edge gradients' },
                      { id: 'woven', label: 'Woven Jacquard', desc: 'Premium textured finish' }
                    ].map(method => (
                      <button
                        key={method.id}
                        onClick={() => setPrintType(method.id)}
                        className={`w-full p-4 rounded-xl text-left border-2 transition-all flex items-center justify-between ${printType === method.id
                          ? 'border-primary bg-primary/5'
                          : 'border-slate-50 dark:border-slate-900 bg-slate-50 dark:bg-slate-900'
                          }`}
                      >
                        <div>
                          <p className={`font-black uppercase text-sm ${printType === method.id ? 'text-primary' : 'text-navy-custom dark:text-slate-300'}`}>{method.label}</p>
                          <p className="text-[10px] text-slate-400 font-bold tracking-wider">{method.desc}</p>
                        </div>
                        {printType === method.id && <span className="material-symbols-outlined text-primary">check_circle</span>}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Live Quote Panel */}
              <div className="md:w-2/5 p-8 lg:p-12 bg-navy-custom text-white flex flex-col justify-between relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-primary/20 blur-[60px]"></div>

                <div className="space-y-8 relative z-10">
                  <h3 className="text-xl font-black uppercase tracking-widest text-primary">Live Estimate</h3>

                  <div className="space-y-4">
                    <div className="flex justify-between text-xs font-bold text-slate-400">
                      <span>BASE UNIT PRICE</span>
                      <span>₹{(parseFloat(price.unitPrice) / (1 - price.discount / 100)).toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-xs font-bold text-primary">
                      <span>BULK DISCOUNT</span>
                      <span>-{price.discount}%</span>
                    </div>
                    <div className="h-px bg-white/10"></div>
                    <div>
                      <p className="text-[10px] font-black tracking-widest text-slate-400 mb-1">FINAL UNIT COST</p>
                      <p className="text-4xl font-black">₹{price.unitPrice}</p>
                    </div>
                  </div>

                  <div className="bg-white/5 rounded-2xl p-6 border border-white/10 backdrop-blur-sm">
                    <p className="text-[10px] font-black tracking-widest text-primary mb-1">TOTAL QUOTE</p>
                    <p className="text-4xl font-black">₹{parseFloat(price.total).toLocaleString()}</p>
                    <p className="text-[10px] text-slate-400 italic mt-2">GST 18% Applicable at Checkout</p>
                  </div>
                </div>

                <div className="space-y-4 mt-12 relative z-10">
                  <button className="w-full py-4 bg-primary text-white rounded-xl font-black uppercase tracking-widest hover:brightness-110 transition-all shadow-xl shadow-primary/20">
                    Book This Quote
                  </button>
                  <button className="w-full py-4 bg-white/5 text-white rounded-xl font-bold uppercase tracking-widest hover:bg-white/10 transition-all border border-white/10 text-sm">
                    Download PDF
                  </button>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
