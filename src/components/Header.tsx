import { useState, useEffect } from 'react';
import { Menu, X, MessageCircle, User, LogOut, LayoutDashboard } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import logoImage from '../assets/logoo.png';
import MobileLogo from '../assets/mobile-logo.png';


export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { currentUser, isAdmin, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate('/auth');
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-white/95 backdrop-blur-md shadow-lg' : 'bg-white'
        }`}
    >
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              {/* Mobile Logo */}
              <img
                src={MobileLogo}
                alt="Lanyard Nation - Looping You Into Style"
                className="lg:hidden w-12 sm:w-16 h-auto object-contain"
              />
              {/* Desktop Logo */}
              <img
                src={logoImage}
                alt="Lanyard Nation - Looping You Into Style"
                className="hidden lg:block md:w-20 lg:w-24 xl:w-28 h-auto object-contain"
              />
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8">
            <Link to="/products" className="text-[#0F2E4D] hover:text-[#2D7F88] transition-colors font-medium">
              Products
            </Link>
            <Link to="/pricing" className="text-[#0F2E4D] hover:text-[#2D7F88] transition-colors font-medium">
              Pricing
            </Link>
            <Link to="/about" className="text-[#0F2E4D] hover:text-[#2D7F88] transition-colors font-medium">
              About
            </Link>
            <Link to="/contact" className="text-[#0F2E4D] hover:text-[#2D7F88] transition-colors font-medium">
              Contact
            </Link>
          </nav>

          {/* Right Side Buttons */}
          <div className="hidden lg:flex items-center gap-4">
            {currentUser ? (
              <div className="flex items-center gap-3 bg-gray-50 px-3 py-1.5 rounded-xl border border-gray-100">
                <Link to="/profile" className="p-2 hover:bg-white rounded-lg transition-all text-[#0F2E4D]" title="Profile">
                  <User className="w-5 h-5" />
                </Link>
                {isAdmin && (
                  <Link to="/admin" className="p-2 hover:bg-white rounded-lg transition-all text-blue-600" title="Admin Dashboard">
                    <LayoutDashboard className="w-5 h-5" />
                  </Link>
                )}
                <button
                  onClick={handleLogout}
                  className="p-2 hover:bg-white rounded-lg transition-all text-red-500"
                  title="Logout"
                >
                  <LogOut className="w-5 h-5" />
                </button>
              </div>
            ) : (
              <Link
                to="/auth"
                className="px-6 py-2.5 bg-[#0F2E4D] text-white rounded-lg hover:bg-[#2D7F88] transition-all duration-300 font-semibold text-sm"
              >
                Login
              </Link>
            )}

            <a
              href="#quote"
              className="px-6 py-3 bg-[#2D7F88] text-white rounded-lg hover:bg-[#0F2E4D] transition-all duration-300 font-semibold uppercase tracking-wide text-sm"
            >
              Get Quote
            </a>
            <a
              href="https://wa.me/"
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 border-2 border-[#2D7F88] text-[#2D7F88] rounded-lg hover:bg-[#2D7F88] hover:text-white transition-all duration-300"
            >
              <MessageCircle className="w-5 h-5" />
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden p-2 text-[#0F2E4D]"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="lg:hidden py-4 border-t border-gray-200">
            <nav className="flex flex-col space-y-4">
              <Link
                to="/products"
                className="text-[#0F2E4D] hover:text-[#2D7F88] transition-colors font-medium py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Products
              </Link>
              <Link
                to="/pricing"
                className="text-[#0F2E4D] hover:text-[#2D7F88] transition-colors font-medium py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Pricing
              </Link>
              <Link
                to="/about"
                className="text-[#0F2E4D] hover:text-[#2D7F88] transition-colors font-medium py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                About
              </Link>
              <Link
                to="/contact"
                className="text-[#0F2E4D] hover:text-[#2D7F88] transition-colors font-medium py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Contact
              </Link>
              <div className="flex flex-col gap-3 pt-4">
                <a
                  href="/#quote"
                  className="px-6 py-3 bg-[#2D7F88] text-white rounded-lg hover:bg-[#0F2E4D] transition-all duration-300 font-semibold uppercase tracking-wide text-sm text-center"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Get Quote
                </a>
                <a
                  href="https://wa.me/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-3 border-2 border-[#2D7F88] text-[#2D7F88] rounded-lg hover:bg-[#2D7F88] hover:text-white transition-all duration-300 font-semibold uppercase tracking-wide text-sm text-center flex items-center justify-center gap-2"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <MessageCircle className="w-5 h-5" />
                  WhatsApp
                </a>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}