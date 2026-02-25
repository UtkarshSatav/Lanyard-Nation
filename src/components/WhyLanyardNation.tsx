import { Award, Clock, DollarSign, Sparkles, UserCheck, Bot } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import lanyardImg from '../assets/lanyardImg.jpeg';

export function WhyLanyardNation() {
  const benefits = [
    {
      icon: DollarSign,
      title: 'Transparent Pricing',
      description: 'No hidden fees. See exactly what you pay before ordering.'
    },
    {
      icon: Clock,
      title: 'Fast Turnaround',
      description: '2-5 business days production. Rush orders available.'
    },
    {
      icon: Award,
      title: 'Premium Quality',
      description: 'High-quality materials and printing that lasts.'
    },
    {
      icon: Sparkles,
      title: 'Lowest MOQ',
      description: 'Order from just 100 units. Perfect for small events.'
    },
    {
      icon: UserCheck,
      title: 'Dedicated Support',
      description: 'Personal account manager for bulk orders.'
    },
    {
      icon: Bot,
      title: 'AI Assisted Design',
      description: 'Smart tools to help you create the perfect design.'
    }
  ];

  return (
    <section className="py-20 bg-white overflow-hidden" >
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#F7F9FB] rounded-full mb-4">
            <span className="text-[#2D7F88] font-semibold">Why Choose Us</span>
          </div>
          <h2 className="text-4xl lg:text-5xl font-bold text-[#0F2E4D] mb-4">
            Why Lanyard Nation?
          </h2>
          <p className="text-xl text-[#5A5A5A] max-w-2xl mx-auto">
            We're not just another supplier. We're your partner in creating memorable brand experiences.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center mb-20">
          {/* Left - Image */}
          <div className="relative">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl">
              <ImageWithFallback
                src={lanyardImg}
                alt="Production facility"
                className="w-full h-[500px] object-cover"
              />
            </div>

            {/* Floating Stats */}
            <div className="absolute -bottom-6 -right-6 bg-white rounded-xl shadow-2xl p-6 border-2 border-[#2D7F88]">
              <div className="text-center">
                <div className="text-4xl font-bold text-[#2D7F88] mb-1">10K+</div>
                <div className="text-sm text-[#5A5A5A]">Happy Customers</div>
              </div>
            </div>

            <div className="absolute -top-6 -left-6 bg-[#FF8C42] rounded-xl shadow-2xl p-6 text-white">
              <div className="text-center">
                <div className="text-4xl font-bold mb-1">5★</div>
                <div className="text-sm">Rated Service</div>
              </div>
            </div>
          </div>

          {/* Right - Benefits */}
          <div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {benefits.map((benefit, index) => {
                const Icon = benefit.icon;
                return (
                  <div 
                    key={index}
                    className="group p-6 rounded-xl bg-[#F7F9FB] hover:bg-white hover:shadow-xl transition-all duration-300 border border-transparent hover:border-[#2D7F88]"
                  >
                    <div className="w-12 h-12 rounded-lg bg-[#2D7F88] flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                      <Icon className="w-6 h-6 text-white" strokeWidth={2} />
                    </div>
                    <h3 className="font-bold text-[#0F2E4D] mb-2">{benefit.title}</h3>
                    <p className="text-sm text-[#5A5A5A]">{benefit.description}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Comparison Section */}
        <div className="bg-gradient-to-br from-[#0F2E4D] to-[#2D7F88] rounded-3xl p-8 lg:p-12 text-white">
          <h3 className="text-3xl font-bold mb-8 text-center">
            How We Compare
          </h3>
          
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-white/20">
                  <th className="text-left py-4 px-4">Feature</th>
                  <th className="text-center py-4 px-4 bg-white/10 rounded-t-xl">
                    <div className="font-bold text-[#6EB5B7]">Lanyard Nation</div>
                  </th>
                  <th className="text-center py-4 px-4">Competitors</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ['Minimum Order', '100 units', '500+ units'],
                  ['Turnaround Time', '2-5 days', '7-14 days'],
                  ['Free Design Help', '✓', '✗'],
                  ['AI Price Calculator', '✓', '✗'],
                  ['24/7 Support', '✓', 'Business hours only'],
                  ['Bulk Discounts', 'Up to 30%', 'Up to 15%']
                ].map((row, index) => (
                  <tr key={index} className="border-b border-white/10">
                    <td className="py-4 px-4 font-medium">{row[0]}</td>
                    <td className="py-4 px-4 text-center bg-white/10 font-bold text-[#6EB5B7]">{row[1]}</td>
                    <td className="py-4 px-4 text-center text-white/60">{row[2]}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mt-8 text-center">
            <a 
              href="#quote"
              className="inline-block px-8 py-4 bg-white text-[#2D7F88] rounded-lg hover:bg-[#F7F9FB] transition-all duration-300 font-bold uppercase tracking-wide"
            >
              Experience The Difference
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
