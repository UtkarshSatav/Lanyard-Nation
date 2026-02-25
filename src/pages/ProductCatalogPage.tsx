import { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
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
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background pt-24">
      <main className="flex flex-1 justify-center py-8">
        <div className="layout-content-container flex flex-col max-w-[1200px] flex-1 px-4 md:px-10">
          {/* Search Bar Section */}
          <div className="mb-8">
            <label className="flex flex-col w-full">
              <div className="flex w-full items-stretch rounded-xl h-14 bg-white dark:bg-slate-800 shadow-sm border border-slate-200 dark:border-slate-700">
                <div className="text-slate-400 flex items-center justify-center pl-4">
                  <span className="material-symbols-outlined">search</span>
                </div>
                <input
                  type="text"
                  placeholder="Search custom lanyards, wristbands, and branding accessories..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="flex w-full min-w-0 flex-1 border-none bg-transparent focus:outline-0 focus:ring-0 text-slate-900 dark:text-white px-4 text-base font-normal placeholder:text-slate-400"
                />
                <div className="p-2">
                  <button className="h-full px-6 bg-primary text-white font-bold rounded-lg hover:brightness-105 transition-all">
                    Search
                  </button>
                </div>
              </div>
            </label>
          </div>

          {/* Category Navigation */}
          <div className="flex gap-3 pb-6 overflow-x-auto no-scrollbar border-b border-slate-200 dark:border-slate-800">
            {productCategories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`flex h-10 shrink-0 items-center justify-center gap-x-2 rounded-full px-6 font-medium text-sm transition-all ${selectedCategory === category.id
                  ? 'bg-primary text-white'
                  : 'bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 hover:border-primary'
                  }`}
              >
                {category.name}
              </button>
            ))}
          </div>

          <div className="flex items-center justify-between py-6">
            <div className="flex items-baseline gap-2">
              <h2 className="text-navy-custom dark:text-white text-2xl font-bold">Bulk Inventory</h2>
              <p className="text-slate-500 text-sm">Showing {filteredProducts.length} premium products</p>
            </div>
            <div className="flex items-center gap-4">
              <div
                className="flex items-center gap-2 bg-white dark:bg-slate-800 px-4 py-2 rounded-lg border border-slate-200 dark:border-slate-700 cursor-pointer"
                onClick={() => setViewMode(viewMode === 'grid' ? 'list' : 'grid')}
              >
                <span className="material-symbols-outlined text-sm">
                  {viewMode === 'grid' ? 'view_list' : 'grid_view'}
                </span>
                <span className="text-navy-custom dark:text-white text-sm font-semibold capitalize">{viewMode} View</span>
              </div>
              <div className="flex items-center gap-2 bg-white dark:bg-slate-800 px-4 py-2 rounded-lg border border-slate-200 dark:border-slate-700 cursor-pointer">
                <span className="text-slate-500 text-sm">Sort by:</span>
                <span className="text-navy-custom dark:text-white text-sm font-semibold">Featured</span>
                <span className="material-symbols-outlined text-sm">expand_more</span>
              </div>
            </div>
          </div>

          {/* Products Grid/List */}
          {viewMode === 'grid' ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredProducts.map((product) => (
                <div
                  key={product.id}
                  className="flex flex-col group bg-white dark:bg-slate-800 rounded-xl overflow-hidden border border-slate-100 dark:border-slate-700 shadow-sm hover:shadow-xl transition-all"
                >
                  <Link to={`/product/${product.id}`}>
                    <div className="relative aspect-square bg-slate-100 dark:bg-slate-900 flex items-center justify-center p-8 overflow-hidden">
                      <ImageWithFallback
                        src={product.image}
                        alt={product.name}
                        className="object-contain w-full h-full group-hover:scale-105 transition-transform duration-500"
                      />
                      {!product.inStock && (
                        <>
                          <div className="absolute top-4 left-4 bg-red-500 text-white px-3 py-1 rounded-full text-xs font-bold shadow-md z-10">
                            Out of Stock
                          </div>
                          <div className="absolute inset-0 bg-white/40 dark:bg-black/40 backdrop-blur-[1px]"></div>
                        </>
                      )}
                      <div className="absolute top-4 right-4 bg-white/90 dark:bg-slate-800/90 p-2 rounded-full shadow-md">
                        <span className="material-symbols-outlined text-slate-400 group-hover:text-red-500 transition-colors">favorite</span>
                      </div>
                    </div>
                  </Link>
                  <div className="p-6 flex flex-col gap-3">
                    <div className="flex items-center gap-1 text-yellow-400">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <span key={i} className={`material-symbols-outlined text-sm ${i < (product.rating || 5) ? 'fill-current' : ''}`}>
                          {i < (product.rating || 5) ? 'star' : 'star'}
                        </span>
                      ))}
                      <span className="text-slate-400 text-xs ml-1">({product.reviews || 0})</span>
                    </div>
                    <Link to={`/product/${product.id}`}>
                      <h3 className="text-navy-custom dark:text-white font-bold text-lg leading-snug hover:text-primary transition-colors">
                        {product.name}
                      </h3>
                    </Link>
                    <div className="flex items-center justify-between mt-2">
                      <span className="text-primary font-bold text-xl">
                        ₹{product.price} <span className="text-xs text-slate-400 font-normal">/ unit</span>
                      </span>
                      <button
                        onClick={(e) => handleAddToCart(product, e)}
                        disabled={!product.inStock}
                        className={`rounded-lg px-4 py-2 text-sm font-bold flex items-center gap-2 transition-all ${product.inStock
                          ? 'bg-primary text-white hover:brightness-110'
                          : 'bg-slate-200 dark:bg-slate-700 text-slate-500 cursor-not-allowed'
                          }`}
                      >
                        <span className="material-symbols-outlined text-sm">{product.inStock ? 'add_shopping_cart' : 'block'}</span>
                        {product.inStock ? 'Add' : 'Sold Out'}
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="flex flex-col gap-6">
              {filteredProducts.map((product) => (
                <div
                  key={product.id}
                  className="flex bg-white dark:bg-slate-800 rounded-xl overflow-hidden border border-slate-100 dark:border-slate-700 shadow-sm hover:shadow-xl transition-all"
                >
                  <Link to={`/product/${product.id}`} className="w-48 h-48 flex-shrink-0 bg-slate-100 dark:bg-slate-900 p-4">
                    <ImageWithFallback
                      src={product.image}
                      alt={product.name}
                      className="object-contain w-full h-full hover:scale-105 transition-transform duration-500"
                    />
                  </Link>
                  <div className="p-6 flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center gap-1 text-yellow-400 mb-2">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <span key={i} className={`material-symbols-outlined text-sm ${i < (product.rating || 5) ? 'fill-current' : ''}`}>
                            {i < (product.rating || 5) ? 'star' : 'star'}
                          </span>
                        ))}
                        <span className="text-slate-400 text-xs ml-1">({product.reviews || 0})</span>
                      </div>
                      <Link to={`/product/${product.id}`}>
                        <h3 className="text-navy-custom dark:text-white font-bold text-xl leading-snug hover:text-primary transition-colors">
                          {product.name}
                        </h3>
                      </Link>
                      <p className="text-slate-500 text-sm mt-2 line-clamp-2">{product.description}</p>
                    </div>
                    <div className="flex items-center justify-between mt-4">
                      <span className="text-primary font-bold text-2xl">
                        ₹{product.price} <span className="text-xs text-slate-400 font-normal">/ unit</span>
                      </span>
                      <div className="flex gap-2">
                        <Link
                          to={`/product/${product.id}`}
                          className="bg-slate-100 dark:bg-slate-700 text-navy-custom dark:text-white px-6 py-2 rounded-lg text-sm font-bold hover:bg-slate-200 transition-all"
                        >
                          Details
                        </Link>
                        <button
                          onClick={(e) => handleAddToCart(product, e)}
                          disabled={!product.inStock}
                          className={`rounded-lg px-6 py-2 text-sm font-bold flex items-center gap-2 transition-all ${product.inStock
                            ? 'bg-primary text-white hover:brightness-110 shadow-lg shadow-primary/20'
                            : 'bg-slate-200 dark:bg-slate-700 text-slate-500 cursor-not-allowed'
                            }`}
                        >
                          <span className="material-symbols-outlined text-sm">{product.inStock ? 'add_shopping_cart' : 'block'}</span>
                          {product.inStock ? 'Add to Cart' : 'Sold Out'}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* No Results */}
          {filteredProducts.length === 0 && (
            <div className="text-center py-20 bg-white dark:bg-slate-800 rounded-xl border border-dashed border-slate-300 dark:border-slate-700">
              <span className="material-symbols-outlined text-6xl text-slate-300 mb-4">search_off</span>
              <h3 className="text-2xl font-bold text-navy-custom dark:text-white mb-2">No Products Found</h3>
              <p className="text-slate-500 mb-6">Try adjusting your search or filters to find what you're looking for.</p>
              <button
                onClick={() => {
                  setSearchQuery('');
                  setSelectedCategory('all-products');
                }}
                className="px-8 py-3 bg-primary text-white rounded-lg hover:brightness-110 transition-all font-bold"
              >
                Clear Filters
              </button>
            </div>
          )}

          {/* New Custom Design Call to Action */}
          <div className="mt-16 flex flex-col md:flex-row items-center justify-between bg-primary/5 dark:bg-primary/10 p-8 rounded-2xl border border-primary/20">
            <div className="mb-6 md:mb-0">
              <h4 className="text-navy-custom dark:text-white text-xl font-bold mb-2">Need a Custom Design?</h4>
              <p className="text-slate-600 dark:text-slate-300">Our designers can help you create the perfect lanyard for your event.</p>
            </div>
            <button className="bg-navy-custom dark:bg-primary text-white px-8 py-3 rounded-full font-bold shadow-lg hover:scale-105 transition-all">
              Start Customizing
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}