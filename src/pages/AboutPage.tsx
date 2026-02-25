import { ImageWithFallback } from '../components/figma/ImageWithFallback';
import { Award, Target, Shield, Users, Heart, Leaf } from 'lucide-react';

export function AboutPage() {
  return (
    <div className="min-h-screen bg-white pt-20">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-[#0F2E4D] via-[#2D7F88] to-[#0F2E4D] text-white py-20">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl lg:text-6xl font-bold mb-6">
            About Lanyard Nation
          </h1>
          <p className="text-xl lg:text-2xl max-w-3xl mx-auto opacity-90">
            Looping You Into Style Since 2010
          </p>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-20">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#2D7F88]/10 rounded-full mb-6">
                <span className="text-[#2D7F88] font-semibold">Our Story</span>
              </div>
              <h2 className="text-4xl font-bold text-[#0F2E4D] mb-6">
                From Humble Beginnings to Industry Leaders
              </h2>
              <div className="space-y-4 text-lg text-[#5A5A5A]">
                <p>
                  Founded in 2010, Lanyard Nation started with a simple mission: to provide high-quality, 
                  custom lanyards and wristbands at unbeatable prices. What began as a small operation 
                  has grown into one of the UK's most trusted suppliers of promotional products.
                </p>
                <p>
                  Over the past decade, we've delivered over 1 million lanyards to more than 10,000 
                  satisfied customers across the UK and Europe. From small local events to major 
                  international conferences, we've been there to help organizations make a lasting impression.
                </p>
                <p>
                  Our success is built on three pillars: exceptional quality, competitive pricing, 
                  and outstanding customer service. We believe that every customer, regardless of 
                  order size, deserves the same level of attention and care.
                </p>
              </div>
            </div>
            <div className="relative">
              <div className="rounded-2xl overflow-hidden shadow-2xl">
                <ImageWithFallback
                  src="https://images.unsplash.com/photo-1758518729685-f88df7890776?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0ZWFtJTIwbWVldGluZyUyMG9mZmljZSUyMGNvcnBvcmF0ZXxlbnwxfHx8fDE3NzAyMDg3NTN8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                  alt="Lanyard Nation Team"
                  className="w-full h-[500px] object-cover"
                />
              </div>
              {/* Floating Stats */}
              <div className="absolute -bottom-8 -left-8 bg-white rounded-xl p-6 shadow-2xl">
                <div className="text-4xl font-bold text-[#2D7F88]">14+</div>
                <div className="text-sm text-[#5A5A5A]">Years Experience</div>
              </div>
              <div className="absolute -top-8 -right-8 bg-[#FF8C42] rounded-xl p-6 shadow-2xl text-white">
                <div className="text-4xl font-bold">10K+</div>
                <div className="text-sm">Happy Clients</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Mission */}
      <section className="py-20 bg-[#F7F9FB]">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white rounded-full mb-4">
              <span className="text-[#2D7F88] font-semibold">Our Mission</span>
            </div>
            <h2 className="text-4xl lg:text-5xl font-bold text-[#0F2E4D] mb-6">
              What Drives Us Forward
            </h2>
            <p className="text-xl text-[#5A5A5A] max-w-3xl mx-auto">
              We're on a mission to make custom promotional products accessible, 
              affordable, and exceptional for businesses of all sizes.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: Target,
                title: 'Customer First',
                description: 'Every decision we make is centered around providing the best possible experience for our customers.'
              },
              {
                icon: Award,
                title: 'Quality Excellence',
                description: 'We never compromise on quality. Every product goes through rigorous quality control before shipping.'
              },
              {
                icon: Heart,
                title: 'Passionate Team',
                description: 'Our team is passionate about what we do, and it shows in every interaction and every product.'
              }
            ].map((item, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <div className="w-16 h-16 bg-gradient-to-br from-[#2D7F88] to-[#0F2E4D] rounded-xl flex items-center justify-center mb-6">
                  <item.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-[#0F2E4D] mb-4">{item.title}</h3>
                <p className="text-[#5A5A5A]">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Quality Promise */}
      <section className="py-20">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="order-2 lg:order-1">
              <div className="rounded-2xl overflow-hidden shadow-2xl">
                <ImageWithFallback
                  src="https://images.unsplash.com/photo-1748255882537-cbe88b145305?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxxdWFsaXR5JTIwY29udHJvbCUyMGluc3BlY3Rpb258ZW58MXx8fHwxNzcwMTY0MDkxfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                  alt="Quality Control"
                  className="w-full h-[500px] object-cover"
                />
              </div>
            </div>
            <div className="order-1 lg:order-2">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#2D7F88]/10 rounded-full mb-6">
                <span className="text-[#2D7F88] font-semibold">Quality Promise</span>
              </div>
              <h2 className="text-4xl font-bold text-[#0F2E4D] mb-6">
                Our 100% Quality Guarantee
              </h2>
              <div className="space-y-6">
                {[
                  {
                    icon: Shield,
                    title: 'Premium Materials Only',
                    description: 'We source the finest materials from certified suppliers to ensure durability and comfort.'
                  },
                  {
                    icon: Award,
                    title: 'Rigorous Quality Control',
                    description: 'Every single product is inspected before shipping to meet our strict quality standards.'
                  },
                  {
                    icon: Users,
                    title: 'Expert Craftsmanship',
                    description: 'Our experienced team uses state-of-the-art equipment for precise, consistent results.'
                  },
                  {
                    icon: Leaf,
                    title: 'Eco-Friendly Options',
                    description: 'We offer sustainable materials and eco-friendly production methods for environmentally conscious customers.'
                  }
                ].map((item, index) => (
                  <div key={index} className="flex gap-4">
                    <div className="w-12 h-12 bg-[#2D7F88]/10 rounded-lg flex items-center justify-center flex-shrink-0">
                      <item.icon className="w-6 h-6 text-[#2D7F88]" />
                    </div>
                    <div>
                      <h3 className="font-bold text-[#0F2E4D] mb-2">{item.title}</h3>
                      <p className="text-[#5A5A5A]">{item.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Factory & Suppliers */}
      <section className="py-20 bg-[#F7F9FB]">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white rounded-full mb-4">
              <span className="text-[#2D7F88] font-semibold">Our Facilities</span>
            </div>
            <h2 className="text-4xl lg:text-5xl font-bold text-[#0F2E4D] mb-6">
              State-of-the-Art Production
            </h2>
            <p className="text-xl text-[#5A5A5A] max-w-3xl mx-auto">
              Our modern facilities and certified suppliers enable us to deliver 
              exceptional quality at competitive prices.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <div className="rounded-2xl overflow-hidden shadow-xl">
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1632914146475-bfe6fa6b2a12?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmYWN0b3J5JTIwcHJvZHVjdGlvbiUyMG1hbnVmYWN0dXJpbmd8ZW58MXx8fHwxNzcwMDkwOTUwfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                alt="Production Facility"
                className="w-full h-[400px] object-cover"
              />
            </div>
            <div className="rounded-2xl overflow-hidden shadow-xl">
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1650963715806-4de14c148583?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlY28lMjBmcmllbmRseSUyMHN1c3RhaW5hYmxlJTIwcHJvZHVjdHN8ZW58MXx8fHwxNzcwMjAyNzcwfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                alt="Sustainable Materials"
                className="w-full h-[400px] object-cover"
              />
            </div>
          </div>

          <div className="grid md:grid-cols-4 gap-6">
            {[
              { label: 'ISO Certified', value: '✓' },
              { label: 'Production Capacity', value: '50K+' },
              { label: 'Quality Check Rate', value: '100%' },
              { label: 'On-Time Delivery', value: '99%' }
            ].map((stat, index) => (
              <div
                key={index}
                className="bg-white rounded-xl p-6 text-center shadow-lg"
              >
                <div className="text-3xl font-bold text-[#2D7F88] mb-2">
                  {stat.value}
                </div>
                <div className="text-sm text-[#5A5A5A]">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-[#0F2E4D] via-[#2D7F88] to-[#0F2E4D] text-white">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl lg:text-5xl font-bold mb-6">
            Ready to Experience the Lanyard Nation Difference?
          </h2>
          <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
            Join thousands of satisfied customers who trust us for their lanyard and wristband needs.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/contact"
              className="px-8 py-4 bg-white text-[#2D7F88] rounded-lg hover:bg-[#F7F9FB] transition-all duration-300 font-bold uppercase tracking-wide"
            >
              Contact Us
            </a>
            <a
              href="/#quote"
              className="px-8 py-4 bg-[#FF8C42] text-white rounded-lg hover:bg-[#ff9d5c] transition-all duration-300 font-bold uppercase tracking-wide"
            >
              Get a Quote
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
