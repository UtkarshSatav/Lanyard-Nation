import { ImageWithFallback } from './figma/ImageWithFallback';
import { Link } from 'react-router-dom';
export function ProductCategories() {
  const products = [
    {
      id: 1,
      title: 'Premium Lanyards',
      description: 'The industry standard for branding and security.',
      price: '₹35.50',
      image: 'https://i.pinimg.com/736x/c7/3d/b1/c73db12f8e888dc6854bd0fba90b70e0.jpg',
      popular: true
    },
    {
      id: 2,
      title: 'Festival Bands',
      description: 'Untearable, secure, and vibrant event solutions.',
      price: '₹15.25',
      image: 'https://i.pinimg.com/1200x/cd/0c/72/cd0c727d825db48b74a651e3ad6217e0.jpg',
      popular: false
    },
    {
      id: 3,
      title: 'Silicone Wristbands',
      description: 'Long-lasting, waterproof promotional tools.',
      price: '₹12.50',
      image: 'https://i.pinimg.com/736x/1c/42/41/1c42417c12dd8be429cc0f102d3b6a48.jpg',
      popular: false
    },
    {
      id: 4,
      title: 'Security Holders',
      description: 'Rigid and soft protection for corporate IDs.',
      price: '₹25.50',
      image: 'https://i.pinimg.com/1200x/c2/f8/f9/c2f8f9ab10337290f9dfb1ffa2322f9b.jpg',
      popular: false
    },
    {
      id: 5,
      title: 'Blank Stock',
      description: 'Fast shipping for plain, unbranded safety needs.',
      price: '₹20.00',
      image: 'https://lanyardstomorrow.co.uk/media/catalog/product/cache/dc3a7a356917c25fcd07890dc904fd5b/l/t/lt-plain-retractable-main.jpg',
      popular: false
    },
    {
      id: 6,
      title: 'Eco-Collection',
      description: 'Recycled RPET materials for conscious brands.',
      price: '₹45.40',
      image: 'https://i.pinimg.com/736x/5e/93/6b/5e936b6dfef92b0bddd982f58c518a74.jpg',
      popular: true
    }
  ];

  return (
    <section id="products" className="py-24 bg-slate-50 dark:bg-slate-900/50">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-20">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white dark:bg-slate-800 rounded-full mb-6 shadow-sm border border-slate-100 dark:border-slate-700">
            <span className="text-primary font-bold uppercase tracking-[0.2em] text-xs">Catalog Hub</span>
          </div>
          <h2 className="text-4xl lg:text-6xl font-black text-navy-custom dark:text-white mb-6 uppercase leading-tight">
            Engineered for <br /> <span className="text-primary italic">Every Occasion</span>
          </h2>
          <p className="text-lg text-slate-500 font-medium max-w-2xl mx-auto">
            High-precision branding solutions crafted with premium materials. Explore our curated collections for global standards.
          </p>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {products.map((product) => (
            <div
              key={product.id}
              className="group bg-white dark:bg-slate-800 rounded-[32px] overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500 border border-slate-100 dark:border-slate-700 flex flex-col"
            >
              {/* Product Image */}
              <div className="relative h-72 overflow-hidden">
                <ImageWithFallback
                  src={product.image}
                  alt={product.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-navy-custom/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end p-8">
                  <Link
                    to={"/products"}
                    className="w-full py-4 bg-primary text-white rounded-2xl font-black text-center uppercase tracking-widest translate-y-4 group-hover:translate-y-0 transition-transform duration-500"
                  >
                    Customise Now
                  </Link>
                </div>
                {product.popular && (
                  <div className="absolute top-6 right-6 px-4 py-2 bg-primary text-white rounded-full text-[10px] font-black uppercase tracking-widest shadow-lg">
                    Best Seller
                  </div>
                )}
              </div>

              {/* Product Info */}
              <div className="p-8 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="text-2xl font-black text-navy-custom dark:text-white mb-3 uppercase group-hover:text-primary transition-colors">
                    {product.title}
                  </h3>
                  <p className="text-slate-400 dark:text-slate-500 font-medium text-sm leading-relaxed mb-6">
                    {product.description}
                  </p>
                </div>

                <div className="flex items-center justify-between pt-6 border-t border-slate-50 dark:border-slate-700">
                  <div>
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Starts from</p>
                    <p className="text-2xl font-black text-navy-custom dark:text-white">{product.price}</p>
                  </div>
                  <Link
                    to="/products"
                    className="w-12 h-12 bg-slate-50 dark:bg-slate-900 rounded-2xl flex items-center justify-center text-navy-custom dark:text-white group-hover:bg-primary group-hover:text-white transition-all shadow-sm"
                  >
                    <span className="material-symbols-outlined">north_east</span>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Catalog Footer CTA */}
        <div className="mt-20 flex flex-col sm:flex-row items-center justify-center gap-6">
          <div className="flex -space-x-4">
            {[1, 2, 3, 4].map(i => (
              <div key={i} className="w-12 h-12 rounded-full border-4 border-white dark:border-slate-800 bg-slate-200 dark:bg-slate-700 overflow-hidden shadow-sm">
                <img src={`https://i.pravatar.cc/100?u=${i}`} alt="user" className="w-full h-full object-cover" />
              </div>
            ))}
          </div>
          <div className="text-center sm:text-left">
            <p className="text-sm font-bold text-navy-custom dark:text-white">Trusted by 2,400+ Corporates</p>
            <p className="text-xs text-slate-400 font-medium tracking-wide italic">Join the nation of high-quality branding.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
