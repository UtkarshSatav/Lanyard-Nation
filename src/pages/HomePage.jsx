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
              <span className="text-primary font-bold uppercase tracking-widest text-sm">Testimonials</span>
            </div>
            <h2 className="text-4xl lg:text-6xl font-black text-navy-custom dark:text-white mb-4">
              What Our Clients Say
            </h2>
            <p className="text-lg text-slate-500 max-w-2xl mx-auto font-medium">
              Join thousands of industry leaders who trust Lanyard Nation for their primary branding needs.
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
                className="bg-white dark:bg-slate-800 rounded-3xl p-8 shadow-sm border border-slate-100 dark:border-slate-700 hover:shadow-xl transition-all duration-300 group"
              >
                <div className="flex gap-0.5 mb-6 text-yellow-400">
                  {Array.from({ length: testimonial.rating }).map((_, i) => (
                    <span key={i} className="material-symbols-outlined fill-current text-xl">star</span>
                  ))}
                </div>
                <p className="text-navy-custom dark:text-slate-300 mb-8 font-medium leading-relaxed italic">"{testimonial.text}"</p>
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center text-primary font-black text-xl group-hover:bg-primary group-hover:text-white transition-colors">
                    {testimonial.name.charAt(0)}
                  </div>
                  <div>
                    <div className="font-bold text-navy-custom dark:text-white">{testimonial.name}</div>
                    <div className="text-xs font-bold text-slate-400 uppercase tracking-widest">{testimonial.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-navy-custom relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)',
            backgroundSize: '40px 40px'
          }}></div>
        </div>

        <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-primary rounded-full blur-[100px] opacity-20"></div>

        <div className="relative z-10 max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 text-center uppercase">
          <h2 className="text-4xl lg:text-7xl font-black text-white mb-6 leading-tight">
            Ready to Order Your <br /><span className="text-primary italic">Custom Lanyards?</span>
          </h2>
          <p className="text-lg text-slate-300 mb-12 max-w-2xl mx-auto font-medium lowercase">
            Get started today with instant quotes, free design assistance, and the fastest delivery in the industry.
          </p>

          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <a
              href="#quote"
              className="px-10 py-5 bg-primary text-white rounded-xl hover:brightness-110 transition-all duration-300 font-black tracking-widest shadow-2xl shadow-primary/20"
            >
              Get Instant Quote
            </a>
            <a
              href="#contact"
              className="px-10 py-5 bg-white/5 text-white rounded-xl hover:bg-white/10 transition-all duration-300 font-bold tracking-widest border border-white/20 backdrop-blur-sm"
            >
              Contact Sales Team
            </a>
          </div>

          {/* Trust Indicators */}
          <div className="mt-16 flex flex-wrap justify-center items-center gap-12 text-slate-400 text-xs font-bold tracking-[0.2em]">
            <div className="flex items-center gap-3">
              <span className="material-symbols-outlined text-primary">verified</span>
              <span>10,000+ ORDERS DELIVERED</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="material-symbols-outlined text-primary">star</span>
              <span>5 STAR INDUSTRY REVIEWS</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="material-symbols-outlined text-primary">security</span>
              <span>QUALITY GUARANTEED</span>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default HomePage
