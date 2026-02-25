import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';
import { getProductById } from '../firebase/services';
import {
  ChevronLeft,
  ChevronRight,
  Minus,
  Plus,
  Upload,
  MessageCircle,
  Check,
  Truck,
  Shield,
  Award,
  RefreshCcw,
  Package,
  AlertTriangle,
  Clock
} from 'lucide-react';
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
  const [printType, setPrintType] = useState('1-color');

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
    if (quantity >= 2500) discount = 0.40;
    else if (quantity >= 1000) discount = 0.50;
    else if (quantity >= 500) discount = 0.60;
    else if (quantity >= 250) discount = 0.75;
    else if (quantity >= 100) discount = 0.90;

    let unitPrice = basePrice * discount;

    // Print type adjustment
    if (printType === '2-color') unitPrice += (basePrice * 0.1);
    else if (printType === 'full-color') unitPrice += (basePrice * 0.2);

    return {
      unitPrice: unitPrice,
      total: unitPrice * quantity
    };
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <RefreshCcw className="w-12 h-12 text-[#2D7F88] animate-spin" />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white pt-20">
        <div className="text-center">
          <AlertTriangle className="w-16 h-16 text-amber-500 mx-auto mb-4" />
          <h1 className="text-4xl font-bold text-[#0F2E4D] mb-4">Product Not Found</h1>
          <p className="text-gray-500 mb-8">The product you are looking for doesn't exist or has been removed.</p>
          <Link to="/products" className="px-8 py-3 bg-[#2D7F88] text-white rounded-xl font-bold hover:bg-[#0F2E4D] transition-all">
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
    <div className="min-h-screen bg-white pt-20">
      {/* Breadcrumb */}
      <div className="bg-[#F7F9FB] py-4">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2 text-sm">
            <Link to="/" className="text-[#2D7F88] hover:underline font-medium">Home</Link>
            <span className="text-gray-300">/</span>
            <Link to="/products" className="text-[#2D7F88] hover:underline font-medium">Catalogue</Link>
            <span className="text-gray-300">/</span>
            <span className="text-[#5A5A5A] font-bold">{product.name}</span>
          </div>
        </div>
      </div>

      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid lg:grid-cols-2 gap-16">
          {/* Left: Image Gallery */}
          <div className="space-y-6">
            <div className="relative aspect-square rounded-[32px] overflow-hidden bg-gray-50 border border-gray-100 group">
              <ImageWithFallback
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />

              {product.stock <= 0 && (
                <div className="absolute inset-0 bg-white/60 backdrop-blur-[2px] flex items-center justify-center">
                  <div className="bg-red-600 text-white px-8 py-3 rounded-full font-black text-xl shadow-xl">
                    OUT OF STOCK
                  </div>
                </div>
              )}

              <div className="absolute top-6 left-6 flex flex-col gap-2">
                <span className="bg-white/90 backdrop-blur px-4 py-1.5 rounded-full text-[10px] font-black text-[#0F2E4D] uppercase tracking-widest border border-gray-100 shadow-sm">
                  {product.category}
                </span>
                {product.stock > 0 && product.stock < 50 && (
                  <span className="bg-amber-500 text-white px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest shadow-lg">
                    Low Stock: {product.stock} Left
                  </span>
                )}
              </div>
            </div>

            {/* Trust Badges */}
            <div className="grid grid-cols-3 gap-4">
              <div className="text-center p-6 bg-gray-50 rounded-2xl border border-gray-100 hover:border-[#2D7F88]/30 transition-all">
                <Truck className="w-8 h-8 text-[#2D7F88] mx-auto mb-3" />
                <div className="text-sm font-black text-[#0F2E4D] uppercase tracking-tighter">Fast Delivery</div>
                <div className="text-[10px] text-gray-400 font-bold uppercase mt-1">3-5 Biz Days</div>
              </div>
              <div className="text-center p-6 bg-gray-50 rounded-2xl border border-gray-100 hover:border-[#2D7F88]/30 transition-all">
                <Shield className="w-8 h-8 text-[#2D7F88] mx-auto mb-3" />
                <div className="text-sm font-black text-[#0F2E4D] uppercase tracking-tighter">Premium QA</div>
                <div className="text-[10px] text-gray-400 font-bold uppercase mt-1">100% Guaranteed</div>
              </div>
              <div className="text-center p-6 bg-gray-50 rounded-2xl border border-gray-100 hover:border-[#2D7F88]/30 transition-all">
                <Package className="w-8 h-8 text-[#2D7F88] mx-auto mb-3" />
                <div className="text-sm font-black text-[#0F2E4D] uppercase tracking-tighter">Bulk Pricing</div>
                <div className="text-[10px] text-gray-400 font-bold uppercase mt-1">Deep Discounts</div>
              </div>
            </div>
          </div>

          {/* Right: Product Details */}
          <div className="space-y-10">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <span className="text-[#2D7F88] font-black text-xs uppercase tracking-[0.2em]">{product.subcategory}</span>
                <div className="h-px flex-1 bg-gray-100"></div>
              </div>
              <h1 className="text-5xl font-black text-[#0F2E4D] mb-6 leading-tight">{product.name}</h1>
              <p className="text-xl text-gray-500 font-medium leading-relaxed">{product.description}</p>
            </div>

            {/* Price Display */}
            <div className="bg-[#0F2E4D] rounded-[32px] p-8 text-white relative overflow-hidden shadow-2xl shadow-blue-900/20">
              <div className="absolute top-0 right-0 p-8 opacity-10">
                <Package className="w-32 h-32" />
              </div>
              <div className="relative z-10">
                <div className="flex items-baseline gap-3 mb-2">
                  <span className="text-sm font-bold text-blue-300 uppercase tracking-widest">Starting Price</span>
                  <span className="text-6xl font-black">₹{price.unitPrice.toFixed(2)}</span>
                  <span className="text-lg font-bold text-blue-300">/ unit</span>
                </div>
                <div className="text-2xl font-black text-emerald-400">
                  Quote Total: ₹{price.total.toLocaleString()}
                </div>
                <div className="flex items-center gap-4 mt-6 pt-6 border-t border-white/10 text-xs font-bold text-blue-200">
                  <div className="flex items-center gap-1.5"><Check className="w-4 h-4" /> Bulk Discount Applied</div>
                  <div className="flex items-center gap-1.5"><Check className="w-4 h-4" /> GST Included</div>
                </div>
              </div>
            </div>

            {/* Customization Grid */}
            <div className="grid md:grid-cols-2 gap-8">
              {/* Quantity */}
              <div className="space-y-4">
                <label className="block text-xs font-black text-[#0F2E4D] uppercase tracking-widest ml-1">Quantity (Units)</label>
                <div className="flex items-center gap-4 bg-gray-50 p-2 rounded-2xl border border-gray-100">
                  <button
                    onClick={() => setQuantity(Math.max(50, quantity - 50))}
                    className="w-12 h-12 bg-white rounded-xl flex items-center justify-center hover:bg-[#0F2E4D] hover:text-white transition-all shadow-sm"
                  >
                    <Minus className="w-5 h-5" />
                  </button>
                  <input
                    type="number"
                    value={quantity}
                    onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                    className="flex-1 bg-transparent text-center text-xl font-black text-[#0F2E4D] focus:outline-none"
                  />
                  <button
                    onClick={() => setQuantity(quantity + 50)}
                    className="w-12 h-12 bg-white rounded-xl flex items-center justify-center hover:bg-[#0F2E4D] hover:text-white transition-all shadow-sm"
                  >
                    <Plus className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* Print Type */}
              <div className="space-y-4">
                <label className="block text-xs font-black text-[#0F2E4D] uppercase tracking-widest ml-1">Branding Method</label>
                <select
                  value={printType}
                  onChange={(e) => setPrintType(e.target.value)}
                  className="w-full h-[66px] px-6 bg-gray-50 border border-gray-100 rounded-2xl font-black text-[#0F2E4D] focus:ring-2 focus:ring-[#2D7F88] outline-none appearance-none cursor-pointer"
                >
                  <option value="1-color">1 Color Screen Print</option>
                  <option value="2-color">2 Color Screen Print</option>
                  <option value="full-color">Full Color Digital Print</option>
                </select>
              </div>
            </div>

            {/* B2B Production Timeline */}
            <div className="bg-[#0F2E4D]/5 rounded-3xl p-6 border border-[#0F2E4D]/10">
              <div className="flex items-center gap-3 mb-4">
                <Clock className="w-5 h-5 text-[#0F2E4D]" />
                <h3 className="font-black text-[#0F2E4D] uppercase tracking-widest text-xs">Production Pipeline</h3>
              </div>
              <div className="grid grid-cols-3 gap-2">
                <div className="text-center p-3 bg-white rounded-xl shadow-sm border border-gray-100">
                  <div className="text-[10px] font-black text-[#2D7F88] uppercase mb-1">Standard</div>
                  <div className="text-lg font-black text-[#0F2E4D]">5-7</div>
                  <div className="text-[8px] font-bold text-gray-400 uppercase">Days</div>
                </div>
                <div className="text-center p-3 bg-white rounded-xl shadow-sm border border-emerald-100 ring-2 ring-emerald-50">
                  <div className="text-[10px] font-black text-emerald-600 uppercase mb-1">Express</div>
                  <div className="text-lg font-black text-[#0F2E4D]">3-5</div>
                  <div className="text-[8px] font-bold text-gray-400 uppercase">Days</div>
                </div>
                <div className="text-center p-3 bg-red-500 rounded-xl shadow-lg">
                  <div className="text-[10px] font-black text-white/80 uppercase mb-1">Rush</div>
                  <div className="text-lg font-black text-white">48h</div>
                  <div className="text-[8px] font-bold text-white/60 uppercase">Turnaround</div>
                </div>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <button
                className="py-5 bg-[#FF8C42] text-white rounded-2xl font-black text-lg uppercase tracking-wider hover:scale-[1.02] active:scale-[0.98] transition-all shadow-xl shadow-orange-500/20"
                onClick={() => toast.success("Quotation request sent to our team!")}
              >
                Instant Quote
              </button>
              <button
                className={`py-5 text-white rounded-2xl font-black text-lg uppercase tracking-wider hover:scale-[1.02] active:scale-[0.98] transition-all shadow-xl ${product.stock > 0
                  ? 'bg-[#2D7F88] shadow-teal-500/20'
                  : 'bg-gray-400 cursor-not-allowed shadow-none'
                  }`}
                disabled={product.stock <= 0}
                onClick={handleAddToCart}
              >
                {product.stock > 0 ? 'Add to Cart' : 'Out of Stock'}
              </button>
              <a
                href="https://wa.me/91XXXXXXXXXX"
                target="_blank"
                rel="noopener noreferrer"
                className="md:col-span-2 py-5 bg-[#25D366] text-white rounded-2xl font-black text-lg uppercase tracking-wider flex items-center justify-center gap-3 shadow-xl shadow-emerald-500/20 hover:scale-[1.01] transition-all"
              >
                <MessageCircle className="w-6 h-6 fill-current" />
                Chat with Expert
              </a>
            </div>

            {/* Delivery Info */}
            <div className="bg-amber-50 rounded-2xl p-6 border border-amber-100 flex items-start gap-4">
              <div className="bg-amber-500 p-2 rounded-lg text-white">
                <Truck className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-black text-[#0F2E4D] text-sm uppercase tracking-wider text-amber-900">Estimated Delivery</h4>
                <p className="text-amber-800 text-sm font-bold mt-1">Orders placed today are expected to arrive by {new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toLocaleDateString()}.</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Volume Pricing Table */}
      <div className="mt-24">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-black text-[#0F2E4D] uppercase tracking-widest">B2B Volume Pricing</h2>
          <p className="text-gray-500 font-bold uppercase text-xs mt-2 tracking-widest">More units = Deeper savings</p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {priceTable.map((tier, idx) => (
            <div key={idx} className={`p-6 rounded-[24px] border-2 text-center transition-all ${quantity >= parseInt(tier.quantity) ? 'border-[#2D7F88] bg-[#2D7F88]/5 shadow-xl shadow-[#2D7F88]/10' : 'border-gray-50 opacity-60'}`}>
              <div className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">{tier.quantity}</div>
              <div className="text-2xl font-black text-[#0F2E4D] mb-1">₹{(product.price * tier.discount).toFixed(1)}</div>
              <div className="text-[9px] font-black text-[#2D7F88] uppercase tracking-tighter">Save {(100 - tier.discount * 100).toFixed(0)}% OFF</div>
            </div>
          ))}
        </div>
      </div>

      {/* FAQ Accordion */}
      <div className="mt-24 max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-black text-[#0F2E4D] uppercase tracking-widest">Deep Dive FAQ</h2>
          <div className="h-1 w-20 bg-[#2D7F88] mx-auto mt-4 rounded-full"></div>
        </div>
        <Accordion type="single" collapsible className="space-y-4">
          <AccordionItem value="item-1" className="bg-white rounded-2xl border border-gray-100 px-8 py-2 shadow-sm">
            <AccordionTrigger className="text-[#0F2E4D] font-black hover:text-[#2D7F88] text-lg no-underline py-4">
              What is the minimum order quantity?
            </AccordionTrigger>
            <AccordionContent className="text-gray-500 font-medium text-base pb-6">
              Our standard minimum order is 50 units. For specialized custom molds or complex woven designs, the minimum may start at 100 units depending on technical constraints.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-2" className="bg-white rounded-2xl border border-gray-100 px-8 py-2 shadow-sm">
            <AccordionTrigger className="text-[#0F2E4D] font-black hover:text-[#2D7F88] text-lg no-underline py-4">
              How long does global shipping take?
            </AccordionTrigger>
            <AccordionContent className="text-gray-500 font-medium text-base pb-6">
              We ship worldwide. APAC/EU regions take approximately 5-7 business days, while Americas take 7-10 days depending on customs clearance and regional logistics partners.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-3" className="bg-white rounded-2xl border border-gray-100 px-8 py-2 shadow-sm">
            <AccordionTrigger className="text-[#0F2E4D] font-black hover:text-[#2D7F88] text-lg no-underline py-4">
              Can I request a physical sample?
            </AccordionTrigger>
            <AccordionContent className="text-gray-500 font-medium text-base pb-6">
              Yes! We can ship a sample pack of our previous work to check quality. For custom physical prototypes of your design, a nominal pre-production fee of ₹2500 is charged which is adjusted in the final order.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>

      {/* Product Reviews Section */}
      <ProductReviews productId={productId!} />
    </div>
  );
}
