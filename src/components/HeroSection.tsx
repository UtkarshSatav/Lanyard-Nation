import { useState, useEffect } from 'react';
import { ArrowRight, CheckCircle2, Play, MessageCircle } from 'lucide-react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ImageWithFallback } from './figma/ImageWithFallback';

export function HeroSection() {
  const [showVideo, setShowVideo] = useState(false);
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 500], [0, 150]);
  const opacity = useTransform(scrollY, [0, 300], [0.2, 0]);

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden pt-20">
      {/* Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#0F2E4D] via-[#2D7F88] to-[#0F2E4D]">
        {/* Overlay Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)',
            backgroundSize: '40px 40px'
          }}></div>
        </div>
      </div>

      {/* Background Image Overlay with Parallax */}
      {/* <motion.div 
        className="absolute inset-0 opacity-20"
        style={{ y, opacity }}
      >
        <ImageWithFallback
          src="https://images.unsplash.com/photo-1583550267771-ba7e951bee9b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb2xvcmZ1bCUyMGxhbnlhcmRzJTIwaGFuZ2luZyUyMG9mZmljZXxlbnwxfHx8fDE3Njk5MzU0Njl8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
          alt="Colorful lanyards"
          className="w-full h-full object-cover"
        />
      </motion.div> */}

      {/* Content */}
      <div className="relative z-10 max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="text-white space-y-8">
            {/* Badge */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full border border-white/20"
            >
              <span className="w-2 h-2 bg-[#FF8C42] rounded-full animate-pulse"></span>
              <span className="text-sm font-medium">Trusted by 10,000+ Businesses</span>
            </motion.div>

            {/* Main Headline */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="space-y-4"
            >
              <h1 className="text-5xl lg:text-6xl xl:text-7xl font-bold leading-tight">
                Custom Lanyards & Wristbands
                <span className="block text-[#6EB5B7]">at Unbeatable Prices</span>
              </h1>
              <p className="text-xl lg:text-2xl text-white/90 max-w-xl">
                Design. Print. Deliver. Fast.
              </p>
              {/* <p className="text-lg text-[#FF8C42] font-semibold">
                Bulk Orders? Best Rates Guaranteed.
              </p> */}
            </motion.div>

            {/* Features List */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="flex flex-wrap items-center gap-4 text-white/90 text-sm md:text-base"
            >
              <span className="flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-[#6EB5B7]" />
                Free Design Proof
              </span>
              <span className="text-white/40">•</span>
              <span className="flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-[#6EB5B7]" />
                Low MOQ
              </span>
              <span className="text-white/40">•</span>
              <span className="flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-[#6EB5B7]" />
                Fast Delivery Across UK/EU
              </span>
            </motion.div>

            {/* Price Badge */}
            {/* <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="inline-flex items-center gap-3 px-6 py-3 bg-[#FF8C42] rounded-lg shadow-lg"
            >
              <span className="text-white font-semibold">Starting from</span>
              <span className="text-3xl font-bold text-white">£0.30</span>
            </motion.div> */}

            {/* CTA Buttons */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="flex flex-col sm:flex-row gap-4 pt-4"
            >
              <a 
                href="#quote" 
                className="group px-8 py-4 bg-[#FF8C42] text-white rounded-lg hover:bg-[#ff9d5c] transition-all duration-300 font-bold uppercase tracking-wide text-center flex items-center justify-center gap-2 shadow-xl"
              >
                Get Instant Quote
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </a>
              <a 
                href="#samples" 
                className="px-8 py-4 text-white  hover:text-[#2D7F88] rounded-lg hover:bg-white/90 transition-all duration-300 font-bold uppercase tracking-wide text-center border-2 border-white flex items-center justify-center gap-2 shadow-lg"
              >
                Order Samples
              </a>
              {/* <a 
                href="https://wa.me/1234567890" 
                target="_blank"
                rel="noopener noreferrer"
                className="px-8 py-4 bg-[#25D366] text-white rounded-lg hover:bg-[#20ba59] transition-all duration-300 font-bold uppercase tracking-wide text-center flex items-center justify-center gap-2 shadow-lg"
              >
                <MessageCircle className="w-5 h-5" />
                Chat on WhatsApp
              </a> */}
            </motion.div>

            {/* Trust Indicators */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="flex items-center gap-8 pt-8 border-t border-white/20"
            >
              <div>
                <div className="text-3xl font-bold text-white">10K+</div>
                <div className="text-sm text-white/80">Happy Clients</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-white">1M+</div>
                <div className="text-sm text-white/80">Lanyards Delivered</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-white">24/7</div>
                <div className="text-sm text-white/80">Support</div>
              </div>
            </motion.div>
          </div>

          {/* Right Content - Mini Price Calculator Card */}
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="relative hidden lg:block"
          >
            <div className="bg-white rounded-2xl shadow-2xl p-8 space-y-6">
              {/* Header */}
              <div className="text-center border-b border-gray-200 pb-6">
                <h3 className="text-2xl font-bold text-[#0F2E4D] mb-2">
                  Quick Price Calculator
                </h3>
                <p className="text-[#5A5A5A]">Get an instant estimate</p>
              </div>

              {/* Product Type */}
              <div className="space-y-3">
                <label className="block text-sm font-semibold text-[#0F2E4D]">
                  Product Type
                </label>
                <select className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-[#2D7F88] focus:outline-none transition-colors">
                  <option>Printed Lanyards</option>
                  <option>Woven Lanyards</option>
                  <option>Silicone Wristbands</option>
                  <option>Tyvek Wristbands</option>
                </select>
              </div>

              {/* Quantity */}
              <div className="space-y-3">
                <label className="block text-sm font-semibold text-[#0F2E4D]">
                  Quantity
                </label>
                <select className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-[#2D7F88] focus:outline-none transition-colors">
                  <option>50 - 99</option>
                  <option>100 - 249</option>
                  <option>250 - 499</option>
                  <option>500 - 999</option>
                  <option>1000+</option>
                </select>
              </div>

              {/* Print Type */}
              <div className="space-y-3">
                <label className="block text-sm font-semibold text-[#0F2E4D]">
                  Print Type
                </label>
                <select className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-[#2D7F88] focus:outline-none transition-colors">
                  <option>1 Colour</option>
                  <option>2 Colours</option>
                  <option>Full Colour</option>
                </select>
              </div>

              {/* Estimated Price */}
              <div className="bg-gradient-to-br from-[#2D7F88] to-[#0F2E4D] rounded-xl p-6 text-center space-y-2">
                <p className="text-white/90 text-sm font-medium">Estimated Price</p>
                <div className="text-4xl font-bold text-white">£89.99</div>
                <p className="text-white/80 text-sm">£0.90 per unit</p>
              </div>

              {/* CTA Button */}
              <button className="w-full px-6 py-4 bg-[#FF8C42] text-white rounded-lg hover:bg-[#ff9d5c] transition-all duration-300 font-bold uppercase tracking-wide shadow-lg">
                Get Detailed Quote
              </button>

              {/* Trust Badge */}
              <div className="flex items-center justify-center gap-2 text-sm text-[#5A5A5A]">
                <CheckCircle2 className="w-4 h-4 text-[#2D7F88]" />
                <span>No obligation • Free design proof</span>
              </div>
            </div>

            {/* Floating Offer Badge */}
            <div className="absolute -top-4 -right-4 bg-[#FF8C42] rounded-xl px-4 py-3 shadow-xl transform rotate-3 hover:rotate-0 transition-transform">
              <div className="text-white text-center">
                <div className="text-xs font-semibold uppercase">Limited Offer</div>
                <div className="text-2xl font-bold">10% OFF</div>
                <div className="text-xs">First Order</div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}