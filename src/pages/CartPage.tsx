import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';
import { Minus, Plus, Trash2, ShoppingBag } from 'lucide-react';

export function CartPage() {
  const { items, removeFromCart, updateQuantity, clearCart, getTotalPrice } = useCart();

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-white pt-20">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center py-20">
            <ShoppingBag className="w-24 h-24 text-gray-300 mx-auto mb-6" />
            <h2 className="text-3xl font-bold text-[#0F2E4D] mb-4">Your Cart is Empty</h2>
            <p className="text-[#5A5A5A] mb-8 text-lg">
              Start adding products to your cart to see them here.
            </p>
            <Link
              to="/products"
              className="inline-block px-8 py-4 bg-[#2D7F88] text-white rounded-lg hover:bg-[#0F2E4D] transition-colors font-semibold"
            >
              Browse Products
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white pt-20">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-[#0F2E4D] mb-2">Shopping Cart</h1>
          <p className="text-[#5A5A5A]">Review your items before checkout</p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {items.map((item) => (
              <div
                key={item.id}
                className="bg-white border-2 border-gray-200 rounded-xl p-6 hover:border-[#2D7F88] transition-colors"
              >
                <div className="flex gap-6">
                  {/* Product Image */}
                  <div className="w-32 h-32 flex-shrink-0 rounded-lg overflow-hidden bg-gray-100">
                    <ImageWithFallback
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* Product Details */}
                  <div className="flex-1 flex flex-col">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h3 className="text-lg font-bold text-[#0F2E4D] mb-1">
                          {item.name}
                        </h3>
                        <p className="text-sm text-[#5A5A5A]">
                          Category: {item.category}
                        </p>
                      </div>
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                        aria-label="Remove item"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>

                    <div className="mt-auto flex items-center justify-between">
                      {/* Quantity Controls */}
                      <div className="flex items-center gap-3">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="w-8 h-8 flex items-center justify-center border-2 border-gray-300 rounded-lg hover:border-[#2D7F88] hover:bg-[#2D7F88] hover:text-white transition-colors"
                        >
                          <Minus className="w-4 h-4" />
                        </button>
                        <span className="text-lg font-semibold text-[#0F2E4D] w-12 text-center">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="w-8 h-8 flex items-center justify-center border-2 border-gray-300 rounded-lg hover:border-[#2D7F88] hover:bg-[#2D7F88] hover:text-white transition-colors"
                        >
                          <Plus className="w-4 h-4" />
                        </button>
                      </div>

                      {/* Price */}
                      <div className="text-right">
                        <div className="text-sm text-[#5A5A5A]">
                          £{item.price.toFixed(2)} each
                        </div>
                        <div className="text-2xl font-bold text-[#2D7F88]">
                          £{(item.price * item.quantity).toFixed(2)}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}

            {/* Clear Cart Button */}
            <button
              onClick={clearCart}
              className="w-full px-4 py-3 border-2 border-red-300 text-red-600 rounded-lg hover:bg-red-50 transition-colors font-semibold"
            >
              Clear Cart
            </button>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-[#F7F9FB] rounded-xl p-6 sticky top-24">
              <h2 className="text-2xl font-bold text-[#0F2E4D] mb-6">Order Summary</h2>

              <div className="space-y-4 mb-6">
                <div className="flex justify-between text-[#5A5A5A]">
                  <span>Subtotal ({items.reduce((acc, item) => acc + item.quantity, 0)} items)</span>
                  <span className="font-semibold">£{getTotalPrice().toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-[#5A5A5A]">
                  <span>Shipping</span>
                  <span className="font-semibold text-[#2D7F88]">Calculated at checkout</span>
                </div>
                <div className="border-t-2 border-gray-300 pt-4">
                  <div className="flex justify-between items-center">
                    <span className="text-xl font-bold text-[#0F2E4D]">Total</span>
                    <span className="text-3xl font-bold text-[#2D7F88]">
                      £{getTotalPrice().toFixed(2)}
                    </span>
                  </div>
                </div>
              </div>

              <Link
                to="/checkout"
                className="block text-center w-full px-6 py-4 bg-[#FF8C42] text-white rounded-lg hover:bg-[#ff9d5c] transition-colors font-bold text-lg mb-4"
              >
                Proceed to Checkout
              </Link>

              <Link
                to="/products"
                className="block text-center px-6 py-3 border-2 border-[#2D7F88] text-[#2D7F88] rounded-lg hover:bg-[#2D7F88] hover:text-white transition-colors font-semibold"
              >
                Continue Shopping
              </Link>

              {/* Benefits */}
              <div className="mt-6 pt-6 border-t border-gray-300 space-y-3">
                <div className="flex items-start gap-3">
                  <div className="w-5 h-5 bg-[#2D7F88] rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-white text-xs">✓</span>
                  </div>
                  <p className="text-sm text-[#5A5A5A]">
                    Bulk order discounts available
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-5 h-5 bg-[#2D7F88] rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-white text-xs">✓</span>
                  </div>
                  <p className="text-sm text-[#5A5A5A]">
                    Free design consultation
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-5 h-5 bg-[#2D7F88] rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-white text-xs">✓</span>
                  </div>
                  <p className="text-sm text-[#5A5A5A]">
                    Fast turnaround time
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
