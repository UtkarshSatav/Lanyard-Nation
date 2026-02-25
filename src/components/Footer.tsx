import { Facebook, Twitter, Instagram, Linkedin, Mail, Phone, MapPin } from 'lucide-react';
import logoImage from '../assets/logoo.png';

export function Footer() {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    products: [
      { label: 'Custom Lanyards', href: '#products' },
      { label: 'Festival Wristbands', href: '#products' },
      { label: 'Silicone Wristbands', href: '#products' },
      { label: 'ID Card Holders', href: '#products' },
      { label: 'Plain Lanyards', href: '#products' },
      { label: 'Eco Collection', href: '#products' }
    ],
    company: [
      { label: 'About Us', href: '#about' },
      { label: 'Our Story', href: '#about' },
      { label: 'Quality Promise', href: '#quality' },
      { label: 'Sustainability', href: '#eco' },
      { label: 'Case Studies', href: '#cases' },
      { label: 'Customer Reviews', href: '#reviews' }
    ],
    support: [
      { label: 'Help Center', href: '#help' },
      { label: 'Track Order', href: '#track' },
      { label: 'Shipping Info', href: '#shipping' },
      { label: 'Returns', href: '#returns' },
      { label: 'Size Guide', href: '#size-guide' },
      { label: 'FAQs', href: '#faq' }
    ],
    legal: [
      { label: 'Privacy Policy', href: '#privacy' },
      { label: 'Terms And Conditions', href: '#terms' },
      { label: 'Cookie Policy', href: '#cookies' },
      { label: 'Refund Policy', href: '#refunds' }
    ]
  };

  return (
    <footer className="bg-[#0F2E4D] text-white">
      {/* Main Footer Content */}
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12">
          {/* Company Info */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-2 mb-6">
              {/* logo apply filter to white*/}
              <img 
                src={logoImage} 
                alt="Lanyard Nation Logo" 
                className="w-12 sm:w-16 md:w-20 lg:w-24 xl:w-28 h-auto object-contain"
                style={{ filter: 'brightness(0) invert(1)' }}
              />
            </div>
            <p className="text-white/80 mb-6 max-w-sm">
              Your trusted partner for custom lanyards and wristbands. Quality, speed, and affordability in one platform.
            </p>
            
            {/* Contact Info */}
            <div className="space-y-3">
              <a href="tel:+441234567890" className="flex items-center gap-3 text-white/80 hover:text-white transition-colors">
                <Phone className="w-5 h-5" />
                <p>Toll Free : </p>
                <span>+44 123 456 7890</span>
              </a>
              <a href="tel:+441234567890" className="flex items-center gap-3 text-white/80 hover:text-white transition-colors">
                <Phone className="w-5 h-5" />
                <span>+44 123 456 7890</span>
              </a>
              <a href="mailto:hello@lanyardnation.com" className="flex items-center gap-3 text-white/80 hover:text-white transition-colors">
                <Mail className="w-5 h-5" />
                <p>Sales : </p>
                <span>hello@lanyardnation.com</span>
              </a>
              <a href="mailto:hello@lanyardnation.com" className="flex items-center gap-3 text-white/80 hover:text-white transition-colors">
                <Mail className="w-5 h-5" />
                <p>Support : </p>
                <span>hello@lanyardnation.com</span>
              </a>
              <div className="flex items-start gap-3 text-white/80">
                <MapPin className="w-5 h-5 mt-1 flex-shrink-0" />
                <span>123 Business Park, London, UK</span>
              </div>
            </div>
          </div>

          {/* Products */}
          <div>
            <h3 className="font-bold text-lg mb-4">Products</h3>
            <ul className="space-y-2">
              {footerLinks.products.map((link, index) => (
                <li key={index}>
                  <a 
                    href={link.href} 
                    className="text-white/80 hover:text-white transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="font-bold text-lg mb-4">Company</h3>
            <ul className="space-y-2">
              {footerLinks.company.map((link, index) => (
                <li key={index}>
                  <a 
                    href={link.href} 
                    className="text-white/80 hover:text-white transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="font-bold text-lg mb-4">Support</h3>
            <ul className="space-y-2">
              {footerLinks.support.map((link, index) => (
                <li key={index}>
                  <a 
                    href={link.href} 
                    className="text-white/80 hover:text-white transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Newsletter Section */}
        <div className="mt-12 pt-12 border-t border-white/10">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="font-bold text-2xl mb-2">Get Exclusive Offers</h3>
              <p className="text-white/80">Subscribe to our newsletter for special discounts and new product updates.</p>
            </div>
            <div className="flex gap-3 flex-wrap" >
              <input 
                type="email" 
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder:text-white/50 focus:outline-none focus:border-[#6EB5B7]"
              />
              <button className="px-6 py-3 bg-[#2D7F88] text-white rounded-lg hover:bg-[#6EB5B7] transition-all duration-300 font-semibold">
                Subscribe
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            {/* Copyright */}
            <div className="text-white/60 text-sm">
              © {currentYear} Lanyard Nation. All rights reserved.
            </div>

            {/* Legal Links */}
            <div className="flex flex-wrap gap-6 text-sm">
              {footerLinks.legal.map((link, index) => (
                <a 
                  key={index}
                  href={link.href} 
                  className="text-white/60 hover:text-white transition-colors"
                >
                  {link.label}
                </a>
              ))}
            </div>

            {/* Social Media */}
            <div className="flex gap-4">
              <a 
                href="https://facebook.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-[#2D7F88] transition-all duration-300"
              >
                <Facebook className="w-5 h-5" />
              </a>
              <a 
                href="https://twitter.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-[#2D7F88] transition-all duration-300"
              >
                <Twitter className="w-5 h-5" />
              </a>
              <a 
                href="https://instagram.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-[#2D7F88] transition-all duration-300"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a 
                href="https://linkedin.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-[#2D7F88] transition-all duration-300"
              >
                <Linkedin className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Trust Badges */}
      <div className="bg-[#0a1e30] py-6">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap justify-center items-center gap-8 text-white/60 text-sm">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-white/10 rounded flex items-center justify-center">
                <span className="text-white">✓</span>
              </div>
              <span>Secure Payments</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-white/10 rounded flex items-center justify-center">
                <span className="text-white">✓</span>
              </div>
              <span>Quality Guaranteed</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-white/10 rounded flex items-center justify-center">
                <span className="text-white">✓</span>
              </div>
              <span>Fast Shipping</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-white/10 rounded flex items-center justify-center">
                <span className="text-white">✓</span>
              </div>
              <span>24/7 Support</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
