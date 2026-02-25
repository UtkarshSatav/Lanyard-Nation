import { ArrowRight} from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { Link } from 'react-router-dom';
export function ProductCategories() {
  const products = [
    {
      id: 1,
      title: 'Custom Lanyards',
      description: 'Personalized with your logo and colors',
      price: 'From £0.30',
      image: 'https://i.pinimg.com/736x/c7/3d/b1/c73db12f8e888dc6854bd0fba90b70e0.jpg',
      popular: true
    },
    {
      id: 2,
      title: 'Festival Wristbands',
      description: 'Durable and secure for events',
      price: 'From £0.15',
      image: 'https://i.pinimg.com/1200x/cd/0c/72/cd0c727d825db48b74a651e3ad6217e0.jpg',
      popular: false
    },
    {
      id: 3,
      title: 'Silicone Wristbands',
      description: 'Comfortable and customizable',
      price: 'From £0.25',
      image: 'https://i.pinimg.com/736x/1c/42/41/1c42417c12dd8be429cc0f102d3b6a48.jpg',
      popular: false
    },
    {
      id: 4,
      title: 'ID Card Holders',
      description: 'Professional badge accessories',
      price: 'From £0.50',
      image: 'https://i.pinimg.com/1200x/c2/f8/f9/c2f8f9ab10337290f9dfb1ffa2322f9b.jpg',
      popular: false
    },
    {
      id: 5,
      title: 'Plain Lanyards',
      description: 'Stock colors, ready to ship',
      price: 'From £0.20',
      image: 'https://lanyardstomorrow.co.uk/media/catalog/product/cache/dc3a7a356917c25fcd07890dc904fd5b/l/t/lt-plain-retractable-main.jpg',
      popular: false
    },
    {
      id: 6,
      title: 'Eco Collection',
      description: 'Sustainable & eco-friendly materials',
      price: 'From £0.40',
      image: 'https://i.pinimg.com/736x/5e/93/6b/5e936b6dfef92b0bddd982f58c518a74.jpg',
      popular: true
    }
  ];

  return (
    <section id="products" className="py-20 bg-white">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#F7F9FB] rounded-full mb-4">
            <span className="text-[#2D7F88] font-semibold">Our Products</span>
          </div>
          <h2 className="text-4xl lg:text-5xl font-bold text-[#0F2E4D] mb-4">
            Choose Your Perfect Product
          </h2>
          <p className="text-xl text-[#5A5A5A] max-w-2xl mx-auto">
            High-quality lanyards and wristbands for every occasion. All customizable with your brand.
          </p>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product) => (
            <div 
              key={product.id}
              className="group relative bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100"
            >
              {/* Popular Badge */}
              {product.popular && (
                <div className="absolute top-4 right-4 z-10 px-3 py-1 bg-[#FF8C42] text-white rounded-full text-sm font-semibold">
                  Popular
                </div>
              )}

              {/* Product Image */}
              <div className="relative h-64 overflow-hidden">
                <ImageWithFallback
                  src={product.image}
                  alt={product.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>

              {/* Product Info */}
              <div className="p-6">
                <h3 className="text-2xl font-bold text-[#2D7F88] mb-2">
                  {product.title}
                </h3>
                <p className="text-[#5A5A5A] mb-4">
                  {product.description}
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-2xl font-bold text-[#0F2E4D]">
                    {product.price}
                  </span>
                  <Link 
                    to={"/products"}
                    className="inline-flex items-center gap-2 px-6 py-3 bg-[#2D7F88] text-white rounded-lg hover:bg-[#0F2E4D] transition-all duration-300 font-semibold group-hover:gap-3"
                  >
                    View Pricing
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>

              {/* Hover Border Effect */}
              <div className="absolute inset-0 border-2 border-[#2D7F88] rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
            </div>
          ))}
        </div>

        {/* CTA Section */}
        <div className="mt-16 text-center">
          <div className="inline-flex flex-col sm:flex-row gap-4">
            <a 
              href="#quote"
              className="px-8 py-4 bg-[#2D7F88] text-white rounded-lg hover:bg-[#0F2E4D] transition-all duration-300 font-bold uppercase tracking-wide"
            >
              Get Custom Quote
            </a>
            <a 
              href="#catalog"
              className="px-8 py-4 bg-transparent text-[#2D7F88] rounded-lg hover:bg-[#F7F9FB] transition-all duration-300 font-bold uppercase tracking-wide border-2 border-[#2D7F88]"
            >
              Download Catalog
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
