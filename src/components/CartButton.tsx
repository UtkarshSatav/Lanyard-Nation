import { ShoppingCart } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';

export function CartButton() {
  const { getTotalItems } = useCart();
  const itemCount = getTotalItems();

  return (
    <Link
      to="/cart"
      className="relative flex items-center gap-2 px-4 py-2 bg-white border-2 border-[#2D7F88] text-[#2D7F88] rounded-lg hover:bg-[#2D7F88] hover:text-white transition-all duration-300 font-semibold"
    >
      <ShoppingCart className="w-5 h-5" />
      <span className="hidden sm:inline">Cart</span>
      {itemCount > 0 && (
        <span className="absolute -top-2 -right-2 flex items-center justify-center w-6 h-6 bg-[#FF8C42] text-white text-xs font-bold rounded-full">
          {itemCount > 99 ? '99+' : itemCount}
        </span>
      )}
    </Link>
  );
}
