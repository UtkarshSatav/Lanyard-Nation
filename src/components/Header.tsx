import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';


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
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b ${isScrolled
        ? 'bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-slate-200 dark:border-slate-800 h-16 shadow-sm'
        : 'bg-white dark:bg-slate-900 border-transparent h-20'
        }`}
    >
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 h-full">
        <div className="flex items-center justify-between h-full">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link to="/" className="flex items-center gap-2 group">
              <div className="w-10 h-10 bg-white dark:bg-slate-800 rounded-xl flex items-center justify-center group-hover:rotate-6 transition-transform shadow-sm overflow-hidden border border-slate-100 dark:border-slate-700">
                <img src="/fav.png" alt="LN" className="w-full h-full object-contain" />
              </div>
              <span className="text-xl font-black tracking-tight text-navy dark:text-white uppercase">
                Lanyard<span className="text-primary italic">Nation</span>
              </span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1">
            {[
              { label: 'Products', path: '/products' },
              { label: 'Pricing', path: '/pricing' },
              { label: 'About', path: '/about' },
              { label: 'Contact', path: '/contact' }
            ].map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className="px-4 py-2 text-sm font-bold text-slate-600 dark:text-slate-300 hover:text-primary dark:hover:text-primary transition-colors hover:bg-primary/5 rounded-lg"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Right Side Tools */}
          <div className="flex items-center gap-2">
            <div className="hidden md:flex items-center gap-1 mr-2 px-1 border-r border-slate-200 dark:border-slate-800">
              <button className="p-2 text-slate-600 dark:text-slate-300 hover:text-primary hover:bg-primary/5 rounded-full transition-all">
                <span className="material-symbols-outlined">search</span>
              </button>
              <Link to="/cart" className="p-2 text-slate-600 dark:text-slate-300 hover:text-primary hover:bg-primary/5 rounded-full transition-all relative">
                <span className="material-symbols-outlined">shopping_bag</span>
                <span className="absolute top-1 right-1 w-2 h-2 bg-primary rounded-full"></span>
              </Link>
            </div>

            {currentUser ? (
              <div className="flex items-center gap-2">
                <Link
                  to="/profile"
                  className="w-10 h-10 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-600 dark:text-slate-300 hover:bg-primary hover:text-white transition-all overflow-hidden border border-slate-200 dark:border-slate-700"
                >
                  <span className="material-symbols-outlined">person</span>
                </Link>
                {isAdmin && (
                  <Link to="/admin" className="hidden lg:flex items-center gap-2 px-4 py-2 bg-navy text-white text-[11px] font-black rounded-lg hover:bg-teal transition-all uppercase tracking-widest border border-white/10 shadow-lg shadow-navy/20">
                    <span className="material-symbols-outlined text-[16px]">admin_panel_settings</span>
                    Admin Panel
                  </Link>
                )}
                <button
                  onClick={handleLogout}
                  className="p-2 text-red-500 hover:bg-red-50 rounded-full transition-all"
                  title="Logout"
                >
                  <span className="material-symbols-outlined">logout</span>
                </button>
              </div>
            ) : (
              <Link
                to="/auth"
                className="hidden sm:flex px-6 py-2.5 bg-slate-100 dark:bg-slate-800 text-navy dark:text-white rounded-lg hover:bg-primary hover:text-white transition-all duration-300 font-bold text-sm border border-slate-200 dark:border-slate-700"
              >
                Login
              </Link>
            )}

            <Link
              to="/products"
              className="px-6 py-2.5 bg-primary text-white rounded-lg hover:brightness-110 transition-all duration-300 font-black text-sm uppercase tracking-wider shadow-lg shadow-primary/20"
            >
              Get Quote
            </Link>

            {/* Mobile Toggle */}
            <button
              className="lg:hidden p-2 text-navy dark:text-white ml-2"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <span className="material-symbols-outlined text-3xl">
                {isMenuOpen ? 'close' : 'menu'}
              </span>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="lg:hidden bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 animate-in slide-in-from-top duration-300">
          <nav className="flex flex-col p-4 space-y-2">
            {[
              { label: 'Products', path: '/products', icon: 'inventory_2' },
              { label: 'Pricing', path: '/pricing', icon: 'payments' },
              { label: 'About', path: '/about', icon: 'info' },
              { label: 'Contact', path: '/contact', icon: 'mail' },
              ...(isAdmin ? [{ label: 'Admin Panel', path: '/admin', icon: 'admin_panel_settings' }] : [])
            ].map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className="flex items-center gap-4 p-4 text-navy dark:text-slate-200 hover:bg-primary/5 rounded-xl font-bold transition-all"
                onClick={() => setIsMenuOpen(false)}
              >
                <span className="material-symbols-outlined text-primary">{link.icon}</span>
                {link.label}
              </Link>
            ))}
            <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex flex-col gap-3">
              <a
                href="https://wa.me/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-4 bg-[#25D366] text-white rounded-xl font-bold text-center flex items-center justify-center gap-3"
              >
                <span className="material-symbols-outlined">chat</span>
                Support via WhatsApp
              </a>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}