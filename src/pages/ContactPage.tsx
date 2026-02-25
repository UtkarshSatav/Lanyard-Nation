import { Mail, Phone, MapPin, Clock, MessageCircle, Send } from 'lucide-react';
import { useState } from 'react';

export function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    orderType: 'lanyards',
    quantity: '',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    alert('Thank you for your inquiry! We\'ll get back to you within 24 hours.');
  };

  return (
    <div className="min-h-screen bg-white pt-20">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-[#0F2E4D] via-[#2D7F88] to-[#0F2E4D] text-white py-20">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl lg:text-6xl font-bold mb-6">
            Get In Touch
          </h1>
          <p className="text-xl lg:text-2xl max-w-3xl mx-auto opacity-90">
            We're here to help with your lanyard and wristband needs
          </p>
        </div>
      </section>

      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid lg:grid-cols-3 gap-12">
          {/* Contact Information */}
          <div className="lg:col-span-1 space-y-8">
            <div>
              <h2 className="text-3xl font-bold text-[#0F2E4D] mb-6">
                Contact Information
              </h2>
              <p className="text-[#5A5A5A] mb-8">
                Reach out to our friendly team for quotes, questions, or support.
              </p>
            </div>

            {/* Contact Cards */}
            <div className="space-y-4">
              <div className="bg-[#F7F9FB] rounded-xl p-6 hover:shadow-lg transition-all">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-[#2D7F88] rounded-lg flex items-center justify-center flex-shrink-0">
                    <Phone className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-bold text-[#0F2E4D] mb-1">Phone</h3>
                    <p className="text-[#5A5A5A] mb-2">Mon-Fri 9am-6pm GMT</p>
                    <a
                      href="tel:+441234567890"
                      className="text-[#2D7F88] font-semibold hover:underline"
                    >
                      +44 (0) 1234 567 890
                    </a>
                  </div>
                </div>
              </div>

              <div className="bg-[#F7F9FB] rounded-xl p-6 hover:shadow-lg transition-all">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-[#2D7F88] rounded-lg flex items-center justify-center flex-shrink-0">
                    <Mail className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-bold text-[#0F2E4D] mb-1">Email</h3>
                    <p className="text-[#5A5A5A] mb-2">We reply within 24 hours</p>
                    <a
                      href="mailto:hello@lanyardnation.co.uk"
                      className="text-[#2D7F88] font-semibold hover:underline break-all"
                    >
                      hello@lanyardnation.co.uk
                    </a>
                  </div>
                </div>
              </div>

              <div className="bg-[#F7F9FB] rounded-xl p-6 hover:shadow-lg transition-all">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-[#25D366] rounded-lg flex items-center justify-center flex-shrink-0">
                    <MessageCircle className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-bold text-[#0F2E4D] mb-1">WhatsApp</h3>
                    <p className="text-[#5A5A5A] mb-2">Instant chat support</p>
                    <a
                      href="https://wa.me/441234567890"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#25D366] font-semibold hover:underline"
                    >
                      Chat Now
                    </a>
                  </div>
                </div>
              </div>

              <div className="bg-[#F7F9FB] rounded-xl p-6 hover:shadow-lg transition-all">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-[#2D7F88] rounded-lg flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-bold text-[#0F2E4D] mb-1">Address</h3>
                    <p className="text-[#5A5A5A]">
                      Lanyard Nation Ltd<br />
                      123 Business Park<br />
                      London, UK<br />
                      SW1A 1AA
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-[#F7F9FB] rounded-xl p-6 hover:shadow-lg transition-all">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-[#2D7F88] rounded-lg flex items-center justify-center flex-shrink-0">
                    <Clock className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-bold text-[#0F2E4D] mb-1">Business Hours</h3>
                    <div className="text-[#5A5A5A] space-y-1">
                      <p>Monday - Friday: 9am - 6pm</p>
                      <p>Saturday: 10am - 4pm</p>
                      <p>Sunday: Closed</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl p-8 shadow-2xl border border-gray-100">
              <h2 className="text-3xl font-bold text-[#0F2E4D] mb-6">
                Send Us a Message
              </h2>
              <p className="text-[#5A5A5A] mb-8">
                Fill out the form below and we'll get back to you within 24 hours.
              </p>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-semibold text-[#0F2E4D] mb-2">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-[#2D7F88] focus:outline-none transition-colors"
                      placeholder="John Smith"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-[#0F2E4D] mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-[#2D7F88] focus:outline-none transition-colors"
                      placeholder="john@company.com"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-[#0F2E4D] mb-2">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-[#2D7F88] focus:outline-none transition-colors"
                      placeholder="+44 1234 567890"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-[#0F2E4D] mb-2">
                      Company Name
                    </label>
                    <input
                      type="text"
                      value={formData.company}
                      onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-[#2D7F88] focus:outline-none transition-colors"
                      placeholder="Your Company Ltd"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-[#0F2E4D] mb-2">
                      Product Type *
                    </label>
                    <select
                      required
                      value={formData.orderType}
                      onChange={(e) => setFormData({ ...formData, orderType: e.target.value })}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-[#2D7F88] focus:outline-none transition-colors"
                    >
                      <option value="lanyards">Printed Lanyards</option>
                      <option value="woven">Woven Lanyards</option>
                      <option value="silicone">Silicone Wristbands</option>
                      <option value="tyvek">Tyvek Wristbands</option>
                      <option value="other">Other</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-[#0F2E4D] mb-2">
                      Estimated Quantity *
                    </label>
                    <select
                      required
                      value={formData.quantity}
                      onChange={(e) => setFormData({ ...formData, quantity: e.target.value })}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-[#2D7F88] focus:outline-none transition-colors"
                    >
                      <option value="">Select quantity</option>
                      <option value="50-99">50 - 99</option>
                      <option value="100-249">100 - 249</option>
                      <option value="250-499">250 - 499</option>
                      <option value="500-999">500 - 999</option>
                      <option value="1000-2499">1000 - 2499</option>
                      <option value="2500+">2500+</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-[#0F2E4D] mb-2">
                    Message *
                  </label>
                  <textarea
                    required
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    rows={6}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-[#2D7F88] focus:outline-none transition-colors resize-none"
                    placeholder="Tell us about your requirements, design ideas, delivery date, or any questions you have..."
                  />
                </div>

                <div className="flex items-start gap-3">
                  <input
                    type="checkbox"
                    id="terms"
                    required
                    className="mt-1"
                  />
                  <label htmlFor="terms" className="text-sm text-[#5A5A5A]">
                    I agree to receive emails from Lanyard Nation about my inquiry and 
                    accept the{' '}
                    <a href="#" className="text-[#2D7F88] hover:underline">
                      privacy policy
                    </a>
                  </label>
                </div>

                <button
                  type="submit"
                  className="w-full py-4 bg-[#FF8C42] text-white rounded-lg hover:bg-[#ff9d5c] transition-all duration-300 font-bold uppercase tracking-wide shadow-lg flex items-center justify-center gap-3"
                >
                  <Send className="w-5 h-5" />
                  Send Message
                </button>

                <p className="text-center text-sm text-[#5A5A5A]">
                  Or contact us directly via{' '}
                  <a
                    href="https://wa.me/441234567890"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#25D366] font-semibold hover:underline"
                  >
                    WhatsApp
                  </a>
                  {' '}for instant support
                </p>
              </form>
            </div>
          </div>
        </div>

        {/* Map Section */}
        <div className="mt-16">
          <div className="bg-[#F7F9FB] rounded-2xl overflow-hidden h-[400px] relative">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <MapPin className="w-16 h-16 text-[#2D7F88] mx-auto mb-4" />
                <h3 className="text-2xl font-bold text-[#0F2E4D] mb-2">Visit Our Office</h3>
                <p className="text-[#5A5A5A]">
                  123 Business Park, London, UK SW1A 1AA
                </p>
                <a
                  href="https://maps.google.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block mt-4 px-6 py-3 bg-[#2D7F88] text-white rounded-lg hover:bg-[#0F2E4D] transition-all font-semibold"
                >
                  Get Directions
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* FAQ Quick Links */}
        <div className="mt-16 bg-gradient-to-br from-[#0F2E4D] via-[#2D7F88] to-[#0F2E4D] rounded-2xl p-12 text-white text-center">
          <h2 className="text-3xl font-bold mb-4">
            Have Questions Before Contacting Us?
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Check out our frequently asked questions or product pages
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/#quote"
              className="px-8 py-4 bg-white text-[#2D7F88] rounded-lg hover:bg-[#F7F9FB] transition-all duration-300 font-bold uppercase tracking-wide"
            >
              Get Instant Quote
            </a>
            <a
              href="/pricing"
              className="px-8 py-4 bg-transparent text-white rounded-lg hover:bg-white/10 transition-all duration-300 font-bold uppercase tracking-wide border-2 border-white"
            >
              View Pricing
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
