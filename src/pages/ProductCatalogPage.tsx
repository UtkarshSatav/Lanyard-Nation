import { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Search, ChevronDown, Grid, List, SlidersHorizontal, ShoppingCart } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { CartButton } from '../components/CartButton';
import { toast } from 'sonner';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';
import { getAllProducts } from '../firebase/services';

// Product categories structure - API-ready
const productCategories = [
  {
    id: 'all-products',
    name: 'All Products',
    subcategories: []
  },
  {
    id: 'wristbands',
    name: 'Wristbands',
    subcategories: [
      { id: 'silicone-wristbands', name: 'Silicone Wristbands', slug: 'silicone-wristbands' },
      { id: 'tyvek-wristbands', name: 'Tyvek Wristbands', slug: 'tyvek-wristbands' },
      { id: 'vinyl-wristbands', name: 'Vinyl Wristbands', slug: 'vinyl-wristbands' },
      { id: 'fabric-wristbands', name: 'Fabric Wristbands', slug: 'fabric-wristbands' }
    ]
  },
  {
    id: 'lanyards-id',
    name: 'Lanyards & ID Cards',
    subcategories: [
      { id: 'printed-lanyards', name: 'Printed Lanyards', slug: 'printed-lanyards' },
      { id: 'woven-lanyards', name: 'Woven Lanyards', slug: 'woven-lanyards' },
      { id: 'badge-holders', name: 'Badge Holders', slug: 'badge-holders' },
      { id: 'id-cards', name: 'ID Cards', slug: 'id-cards' },
      { id: 'lanyards-sets', name: 'Lanyard Sets', slug: 'lanyard-sets' }
    ]
  },
  {
    id: 'drinkware',
    name: 'Can Coolers & Drinkware',
    subcategories: [
      { id: 'can-coolers', name: 'Can Coolers', slug: 'can-coolers' },
      { id: 'drinkware', name: 'Drinkware', slug: 'drinkware' },
      { id: 'water-bottles', name: 'Water Bottles', slug: 'water-bottles' },
      { id: 'mugs', name: 'Mugs', slug: 'mugs' }
    ]
  },
  {
    id: 'bags',
    name: 'Bags & Totebags',
    subcategories: [
      { id: 'tote-bags', name: 'Tote Bags', slug: 'tote-bags' },
      { id: 'drawstring-bags', name: 'Drawstring Bags', slug: 'drawstring-bags' },
      { id: 'backpacks', name: 'Backpacks', slug: 'backpacks' },
      { id: 'cooler-bags', name: 'Cooler Bags', slug: 'cooler-bags' }
    ]
  },
  {
    id: 'usb-tech',
    name: 'USB & Technology',
    subcategories: [
      { id: 'usb-drives', name: 'USB Drives', slug: 'usb' },
      { id: 'tech-accessories', name: 'Tech Accessories', slug: 'hitonics-tech-accessories' },
      { id: 'phone-accessories', name: 'Phone Accessories', slug: 'phone-accessories' },
      { id: 'power-banks', name: 'Power Banks', slug: 'power-banks' }
    ]
  },
  {
    id: 'marketing',
    name: 'Marketing, Patches & Stickers',
    subcategories: [
      { id: 'patches', name: 'Patches', slug: 'patches' },
      { id: 'stickers', name: 'Stickers', slug: 'stickers' },
      { id: 'magnets', name: 'Magnets & Stickers', slug: 'magnets-stickers' },
      { id: 'banners', name: 'Banners/Signs', slug: 'banners-signs' }
    ]
  },
  {
    id: 'tradeshow',
    name: 'Tradeshow & Poppers',
    subcategories: [
      { id: 'tradeshow-displays', name: 'Event & Trade Show Display', slug: 'event-trade-show-display' },
      { id: 'table-covers', name: 'Table Covers', slug: 'table-covers' },
      { id: 'banners', name: 'Banners', slug: 'banners' },
      { id: 'poppers', name: 'Poppers', slug: 'poppers' }
    ]
  },
  {
    id: 'home-health',
    name: 'Home & Health',
    subcategories: [
      { id: 'home-auto', name: 'Home & Auto', slug: 'home-auto' },
      { id: 'amenities', name: 'Amenities', slug: 'amenities' },
      { id: 'air-freshener', name: 'Air Freshener', slug: 'air-freshener' },
      { id: 'hand-fans', name: 'Hand fans', slug: 'hand-fans' }
    ]
  },
  {
    id: 'outdoor',
    name: 'Outdoor & Leisure',
    subcategories: [
      { id: 'outdoor-gear', name: 'Outdoor', slug: 'outdoor' },
      { id: 'leisure-outdoor', name: 'Leisure & Outdoor', slug: 'leisure-outdoor' },
      { id: 'sunglasses', name: 'Sunglasses', slug: 'sunglasses' },
      { id: 'umbrellas', name: 'Umbrellas', slug: 'umbrellas' }
    ]
  }
];

const allSubcategories = [
  { name: 'Air Freshener', slug: 'air-freshener' },
  { name: 'Amenities', slug: 'amenities' },
  { name: 'Badge Holders', slug: 'badge-holders' },
  { name: 'Balloons', slug: 'balloons' },
  { name: 'Beanies', slug: 'beanies' },
  { name: 'Calendars', slug: 'calendars' },
  { name: 'Drinkware', slug: 'drinkware' },
  { name: 'Event & Trade Show Display', slug: 'event-trade-show-display' },
  { name: 'Gift Sets', slug: 'gift-sets' },
  { name: 'Hand fans', slug: 'hand-fans' },
  { name: 'Headwear & Scarves', slug: 'headwear-scarves' },
  { name: 'Hitonics & Tech Accessories', slug: 'hitonics-tech-accessories' },
  { name: 'ID Cards', slug: 'id-cards' },
  { name: 'Keychains', slug: 'keychains' },
  { name: 'Kits', slug: 'kits' },
  { name: 'Lanyard Sets', slug: 'lanyard-sets' },
  { name: 'Magnets & Stickers', slug: 'magnets-stickers' },
  { name: 'Mouse Pad', slug: 'mouse-pad' },
  { name: 'Mints, Candy & Gum', slug: 'mints-candy-gum' },
  { name: 'Napkins', slug: 'napkins' },
  { name: 'Outdoor', slug: 'outdoor' },
  { name: 'Paddles', slug: 'paddles' },
  { name: 'Patches', slug: 'patches' },
  { name: 'Pens', slug: 'pens' },
  { name: 'Plush & Novelties', slug: 'plush-novelties' },
  { name: 'Pin Buttons', slug: 'pin-buttons' },
  { name: 'Portfolios & Notebooks', slug: 'portfolios-notebooks' },
  { name: 'Ribbons', slug: 'ribbons' },
  { name: 'Signage', slug: 'signage' },
  { name: 'Soul Bands', slug: 'soul-bands' },
  { name: 'Special Packaging', slug: 'special-packaging' },
  { name: 'Shot Glasses', slug: 'shot-glasses' },
  { name: 'Stress Balls', slug: 'stress-balls' },
  { name: 'Sunglasses', slug: 'sunglasses' },
  { name: 'Table Covers', slug: 'table-covers' },
  { name: 'Tattoos', slug: 'tattoos' },
  { name: 'Tote Bags', slug: 'tote-bags' },
  { name: 'Tyvek Bands', slug: 'tyvek-bands' },
  { name: 'Umbrellas', slug: 'umbrellas' },
  { name: 'USB', slug: 'usb' },
  { name: 'Writing Instruments', slug: 'writing-instruments' },
  { name: 'Banners/Signs', slug: 'banners-signs' },
  { name: 'Floor Mats', slug: 'floor-mats' },
  { name: 'Home & Auto', slug: 'home-auto' },
  { name: 'Leisure & Outdoor', slug: 'leisure-outdoor' },
  { name: 'Neon Sign', slug: 'neon-sign' },
  { name: 'Pets', slug: 'pets' },
  { name: 'Stock Box Designs', slug: 'stock-box-designs' },
  { name: 'Tools, Lights & Key Tags', slug: 'tools-lights-key-tags' },
  { name: 'Virtual Reality', slug: 'virtual-reality' }
];

interface Product {
  id: string;
  name: string;
  category: string;
  subcategory: string;
  price: number;
  image: string;
  description: string;
  inStock: boolean;
  stock?: number;
  rating?: number;
  reviews?: number;
}

export function ProductCatalogPage() {
  const navigate = useNavigate();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState('all-products');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [showFilters, setShowFilters] = useState(false);
  const menuTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const { addToCart } = useCart();

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const data = await getAllProducts();
      setProducts(data as Product[]);
    } catch (error) {
      toast.error('Failed to load products');
    } finally {
      setLoading(false);
    }
  };

  const handleMouseEnter = (categoryId: string) => {
    if (menuTimeoutRef.current) {
      clearTimeout(menuTimeoutRef.current);
    }
    setActiveCategory(categoryId);
  };

  const handleMouseLeave = () => {
    menuTimeoutRef.current = setTimeout(() => {
      setActiveCategory(null);
    }, 200);
  };

  const handleAddToCart = (product: Product, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (product.stock !== undefined && product.stock <= 0) {
      toast.error('This product is currently out of stock');
      return;
    }

    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      category: product.category,
      subcategory: product.subcategory,
    });
    toast.success(`${product.name} added to cart!`);
    navigate('/cart');
  };

  // Filter products based on search and category
  const filteredProducts = products.filter(product => {
    const matchesSearch = (product.name || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
      (product.description || '').toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all-products' || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center pt-24">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#2D7F88]"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white pt-24">
      {/* Search Bar Section */}
      <div className="bg-[#F7F9FB] py-8 border-b border-gray-200">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-4">
            <div className="flex-1 max-w-3xl">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Enter your search key"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-12 pr-32 py-4 border-2 border-gray-200 rounded-lg focus:border-[#2D7F88] focus:outline-none text-lg"
                />
                <button className="absolute right-2 top-1/2 transform -translate-y-1/2 px-6 py-2 bg-[#2D7F88] text-white rounded-lg hover:bg-[#0F2E4D] transition-colors">
                  Search
                </button>
              </div>
            </div>
            <CartButton />
          </div>
        </div>
      </div>

      {/* Category Navigation with Mega Menu */}
      <div className="bg-white border-b border-gray-200 sticky top-20 z-40 ">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center ">
            {productCategories.map((category) => (
              <div
                key={category.id}
                className="relative"
                onMouseEnter={() => category.subcategories.length > 0 && handleMouseEnter(category.id)}
                onMouseLeave={handleMouseLeave}
              >
                <button
                  onClick={() => setSelectedCategory(category.id)}
                  className={`flex items-center gap-2 px-4 py-4 whitespace-nowrap font-medium transition-colors ${selectedCategory === category.id
                    ? 'text-[#2D7F88] border-b-2 border-[#2D7F88]'
                    : 'text-[#0F2E4D] hover:text-[#2D7F88]'
                    }`}
                >
                  {category.name}
                  {category.subcategories.length > 0 && (
                    <ChevronDown className="w-4 h-4" />
                  )}
                </button>

                {/* Mega Menu Dropdown */}
                {activeCategory === category.id && category.subcategories.length > 0 && (
                  <div
                    className="absolute top-full left-0 bg-white shadow-2xl border border-gray-200 rounded-lg mt-0 min-w-[300px] z-50 overflow-hidden"
                    onMouseEnter={() => handleMouseEnter(category.id)}
                    onMouseLeave={handleMouseLeave}
                  >
                    <div className="p-4 grid grid-cols-1 gap-2">
                      {category.subcategories.map((sub) => (
                        <Link
                          key={sub.id}
                          to={`/products/${sub.slug}`}
                          className="px-4 py-2 text-[#0F2E4D] hover:bg-[#F7F9FB] hover:text-[#2D7F88] rounded-lg transition-colors"
                        >
                          {sub.name}
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* All Categories Mega Menu */}
      {activeCategory === 'all-products' && (
        <div
          className="bg-white shadow-2xl border-t border-gray-200 z-60 "
          onMouseEnter={() => handleMouseEnter('all-products')}
          onMouseLeave={handleMouseLeave}

        >
          <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-8" >
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-x-8 gap-y-4">
              {allSubcategories.map((sub) => (
                <Link
                  key={sub.slug}
                  to={`/products/${sub.slug}`}
                  className="text-[#0F2E4D] hover:text-[#2D7F88] transition-colors text-sm"
                >
                  {sub.name}
                </Link>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Products Section */}
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Filters and View Controls */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center gap-2 px-4 py-2 border-2 border-gray-200 rounded-lg hover:border-[#2D7F88] transition-colors"
            >
              <SlidersHorizontal className="w-5 h-5" />
              Filters
            </button>
            <div className="text-[#5A5A5A]">
              Showing <span className="font-semibold text-[#0F2E4D]">{filteredProducts.length}</span> products
            </div>
          </div>

          <div className="flex items-center gap-4">
            <select className="px-4 py-2 border-2 border-gray-200 rounded-lg focus:border-[#2D7F88] focus:outline-none">
              <option>Sort by: Featured</option>
              <option>Price: Low to High</option>
              <option>Price: High to Low</option>
              <option>Newest</option>
              <option>Best Selling</option>
            </select>

            <div className="flex items-center gap-2 border-2 border-gray-200 rounded-lg p-1">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded ${viewMode === 'grid' ? 'bg-[#2D7F88] text-white' : 'text-gray-400'}`}
              >
                <Grid className="w-5 h-5" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 rounded ${viewMode === 'list' ? 'bg-[#2D7F88] text-white' : 'text-gray-400'}`}
              >
                <List className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Products Grid/List */}
        {viewMode === 'grid' ? (
          <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredProducts.map((product) => (
              <div
                key={product.id}
                className="group bg-white rounded-xl border-2 border-gray-200 overflow-hidden hover:border-[#2D7F88] hover:shadow-xl transition-all duration-300"
              >
                <Link to={`/product/${product.id}`}>
                  <div className="relative aspect-square overflow-hidden bg-gray-100">
                    <ImageWithFallback
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    {!product.inStock && (
                      <div className="absolute top-4 right-4 px-3 py-1 bg-red-500 text-white text-xs font-semibold rounded-full">
                        Out of Stock
                      </div>
                    )}
                  </div>
                </Link>
                <div className="p-4">
                  <Link to={`/product/${product.id}`}>
                    <h3 className="font-bold text-[#0F2E4D] mb-2 group-hover:text-[#2D7F88] transition-colors">
                      {product.name}
                    </h3>
                    <p className="text-sm text-[#5A5A5A] mb-3 line-clamp-2">
                      {product.description}
                    </p>
                    <div className="flex items-center gap-2 mb-3">
                      <div className="flex items-center gap-1">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <span
                            key={i}
                            className={`text-sm ${i < (product.rating || 5) ? 'text-[#FF8C42]' : 'text-gray-300'}`}
                          >
                            ★
                          </span>
                        ))}
                      </div>
                      <span className="text-xs text-[#5A5A5A]">({product.reviews || 0})</span>
                    </div>
                  </Link>
                  <div className="flex items-center justify-between gap-2">
                    <div>
                      <div className="text-xs text-[#5A5A5A]">Starting from</div>
                      <div className="text-2xl font-bold text-[#2D7F88]">
                        ₹{product.price}
                      </div>
                    </div>
                    <div className="flex flex-col gap-2">
                      <button
                        onClick={(e) => handleAddToCart(product, e)}
                        className="px-3 py-2 bg-[#2D7F88] text-white rounded-lg hover:bg-[#0F2E4D] transition-colors text-sm font-semibold whitespace-nowrap flex items-center gap-1"
                      >
                        <ShoppingCart className="w-4 h-4" />
                        Add to Cart
                      </button>
                      <Link
                        to={`/product/${product.id}`}
                        className="px-3 py-2 bg-[#FF8C42] text-white rounded-lg hover:bg-[#ff9d5c] transition-colors text-sm font-semibold text-center"
                      >
                        View Details
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="space-y-4">
            {filteredProducts.map((product) => (
              <div
                key={product.id}
                className="group bg-white rounded-xl border-2 border-gray-200 overflow-hidden hover:border-[#2D7F88] hover:shadow-xl transition-all duration-300 flex"
              >
                <Link to={`/product/${product.id}`} className="w-48 h-48 flex-shrink-0 overflow-hidden bg-gray-100">
                  <ImageWithFallback
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                </Link>
                <div className="flex-1 p-6 flex flex-col">
                  <div className="flex-1">
                    <Link to={`/product/${product.id}`}>
                      <h3 className="text-xl font-bold text-[#0F2E4D] mb-2 group-hover:text-[#2D7F88] transition-colors">
                        {product.name}
                      </h3>
                      <p className="text-[#5A5A5A] mb-4">
                        {product.description}
                      </p>
                      <div className="flex items-center gap-2 mb-4">
                        <div className="flex items-center gap-1">
                          {Array.from({ length: 5 }).map((_, i) => (
                            <span
                              key={i}
                              className={i < (product.rating || 5) ? 'text-[#FF8C42]' : 'text-gray-300'}
                            >
                              ★
                            </span>
                          ))}
                        </div>
                        <span className="text-sm text-[#5A5A5A]">({product.reviews || 0} reviews)</span>
                      </div>
                    </Link>
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-sm text-[#5A5A5A]">Starting from</div>
                      <div className="text-3xl font-bold text-[#2D7F88]">
                        ₹{product.price}
                      </div>
                    </div>
                    <div className="flex gap-3">
                      <button
                        onClick={(e) => handleAddToCart(product, e)}
                        className="px-4 py-3 bg-[#2D7F88] text-white rounded-lg hover:bg-[#0F2E4D] transition-colors font-semibold flex items-center gap-2"
                      >
                        <ShoppingCart className="w-5 h-5" />
                        Add to Cart
                      </button>
                      <Link
                        to={`/product/${product.id}`}
                        className="px-6 py-3 bg-[#FF8C42] text-white rounded-lg hover:bg-[#ff9d5c] transition-colors font-semibold"
                      >
                        View Details
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* No Results */}
        {filteredProducts.length === 0 && (
          <div className="text-center py-20">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-2xl font-bold text-[#0F2E4D] mb-2">No Products Found</h3>
            <p className="text-[#5A5A5A] mb-6">
              Try adjusting your search or filters to find what you're looking for.
            </p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('all-products');
              }}
              className="px-6 py-3 bg-[#2D7F88] text-white rounded-lg hover:bg-[#0F2E4D] transition-colors font-semibold"
            >
              Clear Filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
}