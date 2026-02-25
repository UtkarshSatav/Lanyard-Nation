import { HeroSection } from '../components/HeroSection'
import { TrustStrip } from '../components/TrustStrip'
import { ProductCategories } from '../components/ProductCategories'
import { PriceCalculator } from '../components/PriceCalculator'
import { WhyLanyardNation } from '../components/WhyLanyardNation'

const HomePage = () => {
  return (
    <>
        <HeroSection />
        <TrustStrip />
        <ProductCategories />
        <PriceCalculator />
        <WhyLanyardNation />

        {/* Testimonials Section */}
        <section className="py-20 bg-[#F7F9FB]">
          <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-white rounded-full mb-4">
                <span className="text-[#2D7F88] font-semibold">Testimonials</span>
              </div>
              <h2 className="text-4xl lg:text-5xl font-bold text-[#0F2E4D] mb-4">
                What Our Clients Say
              </h2>
              <p className="text-xl text-[#5A5A5A] max-w-2xl mx-auto">
                Join thousands of satisfied customers who trust us for their lanyard needs.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  name: 'Sarah Johnson',
                  role: 'Event Manager, TechConf',
                  text: 'Absolutely brilliant service! Our custom lanyards arrived in 3 days and looked perfect. The quality exceeded our expectations.',
                  rating: 5
                },
                {
                  name: 'Michael Chen',
                  role: 'HR Director, StartupCo',
                  text: 'Best pricing I found anywhere. The bulk discount saved us 25% and the design team was super helpful with our logo.',
                  rating: 5
                },
                {
                  name: 'Emma Williams',
                  role: 'Marketing Lead, FestivalPro',
                  text: "We've ordered 5000+ wristbands for our festival. Quality is consistent and delivery is always on time. Highly recommend!",
                  rating: 5
                }
              ].map((testimonial, index) => (
                <div 
                  key={index}
                  className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  <div className="flex gap-1 mb-4">
                    {Array.from({ length: testimonial.rating }).map((_, i) => (
                      <span key={i} className="text-[#FF8C42] text-xl">★</span>
                    ))}
                  </div>
                  <p className="text-[#5A5A5A] mb-6 italic">"{testimonial.text}"</p>
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#2D7F88] to-[#0F2E4D] flex items-center justify-center text-white font-bold">
                      {testimonial.name.charAt(0)}
                    </div>
                    <div>
                      <div className="font-bold text-[#0F2E4D]">{testimonial.name}</div>
                      <div className="text-sm text-[#5A5A5A]">{testimonial.role}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-gradient-to-br from-[#0F2E4D] via-[#2D7F88] to-[#0F2E4D] relative overflow-hidden">
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute inset-0" style={{
              backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)',
              backgroundSize: '40px 40px'
            }}></div>
          </div>

          <div className="relative z-10 max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">
              Ready to Order Your Custom Lanyards?
            </h2>
            <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
              Get started today with instant quotes, free design assistance, and the fastest delivery in the industry.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <a 
                href="#quote"
                className="px-8 py-4 bg-white text-[#2D7F88] rounded-lg hover:bg-[#F7F9FB] transition-all duration-300 font-bold uppercase tracking-wide shadow-xl"
              >
                Get Instant Quote
              </a>
              <a 
                href="#contact"
                className="px-8 py-4 bg-transparent text-white rounded-lg hover:bg-white/10 transition-all duration-300 font-bold uppercase tracking-wide border-2 border-white"
              >
                Contact Sales Team
              </a>
            </div>

            {/* Trust Indicators */}
            <div className="mt-12 flex flex-wrap justify-center items-center gap-8 text-white">
              <div className="flex items-center gap-2">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" />
                </svg>
                <span>10,000+ Orders Delivered</span>
              </div>
              <div className="flex items-center gap-2">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" />
                </svg>
                <span>5 Star Reviews</span>
              </div>
              <div className="flex items-center gap-2">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" />
                </svg>
                <span>Quality Guaranteed</span>
              </div>
            </div>
          </div>
        </section>
    </>
  )
}

export default HomePage
