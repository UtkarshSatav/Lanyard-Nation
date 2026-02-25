import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';
import { getProductById } from '../firebase/services';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '../components/ui/Accordion';
import { toast } from 'sonner';
import { useCart } from '../context/CartContext';
import { ProductReviews } from '../components/ProductReviews';

const priceTable = [
  { quantity: '50-99', discount: 1.0 },
  { quantity: '100-249', discount: 0.85 },
  { quantity: '250-499', discount: 0.70 },
  { quantity: '500-999', discount: 0.60 },
  { quantity: '1000-2499', discount: 0.50 },
  { quantity: '2500+', discount: 0.40 }
];

interface ProductData {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  subcategory: string;
  image: string;
  inStock: boolean;
  stock: number;
}

export function ProductPage() {
  const { productId } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState<ProductData | null>(null);
  const [loading, setLoading] = useState(true);
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(100);
  const [printType, setPrintType] = useState('Full Color Sublimation');

  useEffect(() => {
    const fetchProduct = async () => {
      if (!productId) return;
      try {
        setLoading(true);
        const data = await getProductById(productId);
        if (data) {
          setProduct(data as ProductData);
        }
      } catch (error) {
        console.error("Error fetching product:", error);
        toast.error("Failed to load product details");
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [productId]);

  const calculatePrice = () => {
    if (!product) return { unitPrice: 0, total: 0 };

    let basePrice = product.price;
    let discount = 1.0;

    // Quantity discount logic
    if (quantity >= 5000) discount = 0.40;
    else if (quantity >= 1000) discount = 0.50;
    else if (quantity >= 500) discount = 0.60;
    else if (quantity >= 250) discount = 0.80;
    else if (quantity >= 100) discount = 1.0;

    let unitPrice = basePrice * discount;

    // Print type adjustment
    if (printType === 'Screen Print (1-2 Colors)') unitPrice += (basePrice * 0.1);
    else if (printType === 'Woven Logo') unitPrice += (basePrice * 0.15);

    return {
      unitPrice: unitPrice,
      total: unitPrice * quantity
    };
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background pt-20">
        <div className="text-center">
          <span className="material-symbols-outlined text-6xl text-amber-500 mb-4">warning</span>
          <h1 className="text-4xl font-bold text-navy-custom dark:text-white mb-4">Product Not Found</h1>
          <p className="text-gray-500 mb-8">The product you are looking for doesn't exist or has been removed.</p>
          <Link to="/products" className="px-8 py-3 bg-primary text-white rounded-xl font-bold hover:brightness-110 transition-all">
            Browse All Products
          </Link>
        </div>
      </div>
    );
  }

  const price = calculatePrice();

  const handleAddToCart = () => {
    if (!product || product.stock <= 0) return;

    addToCart({
      id: product.id,
      name: product.name,
      price: price.unitPrice,
      image: product.image,
      category: product.category,
      subcategory: product.subcategory
    });

    toast.success(`${product.name} added to cart!`);
    navigate('/cart');
  };

  return (
    <div className="min-h-screen bg-background pt-20">
      <main className="max-w-7xl mx-auto px-6 py-8 w-full">
        {/* Breadcrumbs & Badges */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
          <nav className="flex items-center gap-2 text-sm text-slate-500">
            <Link className="hover:text-primary" to="/">Home</Link>
            <span className="material-symbols-outlined text-xs">chevron_right</span>
            <Link className="hover:text-primary" to="/products">Catalogue</Link>
            <span className="material-symbols-outlined text-xs">chevron_right</span>
            <span className="text-navy-custom dark:text-white font-medium">{product.name}</span>
          </nav>
          <div className="flex gap-2">
            <span className="bg-primary/10 text-primary px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">Best Seller</span>
            <span className="bg-orange-100 text-orange-600 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">Eco-Friendly Option</span>
          </div>
        </div>

        {/* Hero Product Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          {/* Left: Image Gallery */}
          <div className="space-y-4">
            <div className="aspect-square bg-white dark:bg-slate-800 rounded-xl overflow-hidden border border-primary/10 group relative">
              <ImageWithFallback
                src={product.image}
                alt={product.name}
                className="w-full h-full object-contain transition-transform duration-500 group-hover:scale-105"
              />
              {product.stock <= 0 && (
                <div className="absolute inset-0 bg-white/60 dark:bg-black/60 backdrop-blur-[2px] flex items-center justify-center">
                  <div className="bg-red-500 text-white px-8 py-3 rounded-full font-black text-xl shadow-xl">
                    OUT OF STOCK
                  </div>
                </div>
              )}
            </div>
            <div className="grid grid-cols-4 gap-4">
              <div className="aspect-square rounded-lg border-2 border-primary overflow-hidden cursor-pointer relative">
                <ImageWithFallback src={product.image} alt="Thumbnail 1" className="w-full h-full object-contain" />
              </div>
              {[1, 2].map((i) => (
                <div key={i} className="aspect-square rounded-lg border border-primary/10 overflow-hidden cursor-pointer hover:border-primary transition-colors bg-white dark:bg-slate-800">
                  <ImageWithFallback src={product.image} alt={`Thumbnail ${i + 1}`} className="w-full h-full object-contain opacity-50" />
                </div>
              ))}
              <div className="aspect-square rounded-lg border border-primary/10 overflow-hidden cursor-pointer hover:border-primary transition-colors bg-primary/5 flex items-center justify-center">
                <span className="material-symbols-outlined text-primary text-3xl">play_circle</span>
              </div>
            </div>
          </div>

          {/* Right: Pricing Calculator */}
          <div className="flex flex-col gap-6">
            <div>
              <h1 className="text-4xl font-black text-navy-custom dark:text-white mb-2">{product.name}</h1>
              <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                {product.description || "Premium high-quality product designed for professional B2B use. Perfect for events, branding, and corporate identity."}
              </p>
            </div>
            <div className="bg-white dark:bg-slate-800 p-8 rounded-xl border border-primary/10 shadow-sm relative overflow-hidden">
              <div className="flex items-end gap-2 mb-6">
                <span className="text-4xl font-bold text-primary">₹{price.unitPrice.toFixed(2)}</span>
                <span className="text-slate-500 mb-1 text-sm font-medium">/unit starting price</span>
              </div>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold uppercase text-slate-500 tracking-wider">Quantity</label>
                    <div className="relative">
                      <input
                        className="w-full rounded-lg border-primary/20 bg-background py-3 focus:ring-primary focus:border-primary px-4 text-navy-custom dark:text-white font-bold"
                        type="number"
                        value={quantity}
                        onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                      />
                      <span className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 text-sm">Units</span>
                    </div>
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold uppercase text-slate-500 tracking-wider">Branding Method</label>
                    <select
                      value={printType}
                      onChange={(e) => setPrintType(e.target.value)}
                      className="w-full rounded-lg border-primary/20 bg-background py-3 focus:ring-primary focus:border-primary px-4 text-navy-custom dark:text-white font-bold appearance-none"
                    >
                      <option>Full Color Sublimation</option>
                      <option>Screen Print (1-2 Colors)</option>
                      <option>Woven Logo</option>
                    </select>
                  </div>
                </div>
                <div className="text-2xl font-black text-emerald-500 mb-4">
                  Total Quote: ₹{price.total.toLocaleString()}
                </div>
                <div className="space-y-3">
                  <label className="text-xs font-bold uppercase text-slate-500 tracking-wider">Production Speed</label>
                  <div className="grid grid-cols-3 gap-3">
                    <button className="flex flex-col items-center justify-center p-3 rounded-xl border-2 border-primary bg-white dark:bg-slate-900 text-center">
                      <span className="text-xs font-bold text-primary mb-1">Standard</span>
                      <span className="text-[10px] text-slate-500">10-12 Days</span>
                    </button>
                    <button className="flex flex-col items-center justify-center p-3 rounded-xl border-2 border-transparent bg-primary/5 hover:border-primary/30 text-center transition-colors">
                      <span className="text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">Express</span>
                      <span className="text-[10px] text-slate-500">5-7 Days</span>
                    </button>
                    <button className="flex flex-col items-center justify-center p-3 rounded-xl border-2 border-transparent bg-primary/5 hover:border-primary/30 text-center transition-colors text-red-500">
                      <span className="text-xs font-bold mb-1">Rush</span>
                      <span className="text-[10px] text-slate-500">2-3 Days</span>
                    </button>
                  </div>
                </div>
                <button
                  onClick={handleAddToCart}
                  disabled={!product.inStock}
                  className={`w-full py-4 rounded-xl font-bold text-lg hover:shadow-lg transition-all flex items-center justify-center gap-2 ${product.inStock ? 'bg-primary text-white' : 'bg-slate-200 text-slate-500 cursor-not-allowed'
                    }`}
                >
                  <span className="material-symbols-outlined">{product.inStock ? 'add_shopping_cart' : 'block'}</span>
                  {product.inStock ? 'Add to Bulk Quote' : 'Out of Stock'}
                </button>
                <a
                  href={`https://wa.me/919876543210?text=I'm interested in ${product.name}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full bg-green-500 text-white py-3 rounded-xl font-bold text-base hover:bg-green-600 transition-colors flex items-center justify-center gap-2"
                >
                  <span className="material-symbols-outlined">chat</span>
                  Chat with Expert on WhatsApp
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Tiered Pricing Table */}
        <section className="mb-16">
          <h3 className="text-2xl font-bold mb-6 flex items-center gap-2 text-navy-custom dark:text-white">
            <span className="material-symbols-outlined text-primary">analytics</span>
            Volume Pricing Tiers
          </h3>
          <div className="overflow-x-auto rounded-xl border border-primary/10">
            <table className="w-full text-left bg-white dark:bg-slate-800">
              <thead>
                <tr className="bg-primary/5">
                  <th className="px-6 py-4 text-sm font-bold text-slate-600 dark:text-slate-300">Quantity Range</th>
                  <th className="px-6 py-4 text-sm font-bold text-slate-600 dark:text-slate-300">Price per Unit</th>
                  <th className="px-6 py-4 text-sm font-bold text-slate-600 dark:text-slate-300">Total Savings</th>
                  <th className="px-6 py-4 text-sm font-bold text-primary">Discount</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-primary/5">
                <tr>
                  <td className="px-6 py-4 font-medium">100 - 249</td>
                  <td className="px-6 py-4">₹{product.price.toFixed(2)}</td>
                  <td className="px-6 py-4">--</td>
                  <td className="px-6 py-4 font-bold text-slate-400">0%</td>
                </tr>
                <tr className="bg-primary/5">
                  <td className="px-6 py-4 font-medium">250 - 499</td>
                  <td className="px-6 py-4">₹{(product.price * 0.8).toFixed(2)}</td>
                  <td className="px-6 py-4 font-bold text-primary">20% OFF</td>
                  <td className="px-6 py-4">₹{(product.price * 0.2 * 250).toLocaleString()}</td>
                </tr>
                <tr className="bg-primary/10 border-l-4 border-primary">
                  <td className="px-6 py-4 font-bold">500 - 999</td>
                  <td className="px-6 py-4 font-bold">₹{(product.price * 0.6).toFixed(2)}</td>
                  <td className="px-6 py-4 font-bold text-primary">40% OFF</td>
                  <td className="px-6 py-4 font-bold">₹{(product.price * 0.4 * 500).toLocaleString()}</td>
                </tr>
                <tr>
                  <td className="px-6 py-4 font-medium">1000 - 4999</td>
                  <td className="px-6 py-4">₹{(product.price * 0.5).toFixed(2)}</td>
                  <td className="px-6 py-4 font-bold text-primary">50% OFF</td>
                  <td className="px-6 py-4">₹{(product.price * 0.5 * 1000).toLocaleString()}</td>
                </tr>
                <tr>
                  <td className="px-6 py-4 font-medium">5000+</td>
                  <td className="px-6 py-4">₹{(product.price * 0.4).toFixed(2)}</td>
                  <td className="px-6 py-4 font-bold text-primary">60% OFF</td>
                  <td className="px-6 py-4">Call for Quote</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* FAQs */}
        <section className="mb-16">
          <h3 className="text-2xl font-bold mb-6 text-navy-custom dark:text-white">Frequently Asked Questions</h3>
          <div className="space-y-4">
            <Accordion type="single" collapsible className="space-y-4">
              <AccordionItem value="item-1" className="border border-primary/10 rounded-xl overflow-hidden bg-white dark:bg-slate-800">
                <AccordionTrigger className="w-full flex items-center justify-between p-5 text-left hover:bg-primary/5 transition-colors font-semibold no-underline">
                  What is the minimum order quantity (MOQ)?
                </AccordionTrigger>
                <AccordionContent className="px-5 py-4 bg-primary/5 text-slate-600 dark:text-slate-400 text-sm">
                  Our standard minimum order for most custom items is 100 units. This ensures we can offer you the best possible production efficiency and pricing for custom setups.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-2" className="border border-primary/10 rounded-xl overflow-hidden bg-white dark:bg-slate-800">
                <AccordionTrigger className="w-full flex items-center justify-between p-5 text-left hover:bg-primary/5 transition-colors font-semibold no-underline">
                  Can I see a digital proof before printing?
                </AccordionTrigger>
                <AccordionContent className="px-5 py-4 bg-primary/5 text-slate-600 dark:text-slate-400 text-sm">
                  Absolutely! We provide a digital mockup for approval before starting mass production to ensure everything is perfect.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-3" className="border border-primary/10 rounded-xl overflow-hidden bg-white dark:bg-slate-800">
                <AccordionTrigger className="w-full flex items-center justify-between p-5 text-left hover:bg-primary/5 transition-colors font-semibold no-underline">
                  What artwork formats do you accept?
                </AccordionTrigger>
                <AccordionContent className="px-5 py-4 bg-primary/5 text-slate-600 dark:text-slate-400 text-sm">
                  We prefer vector files like AI, EPS, or PDF for the best print quality. High-resolution PNG or JPG files may also work depending on the complexity.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </section>

        {/* Product Reviews Section */}
        <ProductReviews productId={productId!} />
      </main>
    </div>
  );
}
