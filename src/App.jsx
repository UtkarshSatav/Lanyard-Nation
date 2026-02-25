import { Router, Route, Routes } from 'react-router-dom'
import { Header } from './components/Header'
import { WhatsAppChat } from './components/WhatsAppChat'
import { AIBot } from './components/AIBot'
import { Footer } from './components/Footer'
import { PromoBanner } from './components/PromoBanner'
import HomePage from './pages/HomePage'
import { ProductCatalogPage } from './pages/ProductCatalogPage'
import { CartProvider } from './context/CartContext'
import { CartPage } from './pages/CartPage'
import { ProductPage } from './pages/ProductPage'
import { AboutPage } from './pages/AboutPage'
import { PricingPage } from './pages/PricingPage'
import { ContactPage } from './pages/ContactPage'
import { AuthProvider } from './context/AuthContext'
import { AuthPage } from './pages/AuthPage'
import { AdminDashboard } from './pages/AdminDashboard'
import { ProfilePage } from './pages/ProfilePage'
import { CheckoutPage } from './pages/CheckoutPage'
import { useAuth } from './context/AuthContext'
import { Navigate } from 'react-router-dom'

const App = () => {
  const { currentUser, loading } = useAuth();

  if (loading) return null; // Or a loading spinner

  return (
    <CartProvider>
      <div className='min-h-screen bg-white'>
        <PromoBanner />
        <Header />
        <main>
          <Routes>
            <Route path="/auth" element={<AuthPage />} />
            <Route
              path="/"
              element={currentUser ? <HomePage /> : <Navigate to="/auth" />}
            />
            <Route
              path="/products"
              element={currentUser ? <ProductCatalogPage /> : <Navigate to="/auth" />}
            />
            <Route
              path="/products/:categorySlug"
              element={currentUser ? <ProductCatalogPage /> : <Navigate to="/auth" />}
            />
            <Route
              path="/product/:productId"
              element={currentUser ? <ProductPage /> : <Navigate to="/auth" />}
            />
            <Route
              path="/cart"
              element={currentUser ? <CartPage /> : <Navigate to="/auth" />}
            />
            <Route
              path="/checkout"
              element={currentUser ? <CheckoutPage /> : <Navigate to="/auth" />}
            />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/pricing" element={<PricingPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="/profile" element={currentUser ? <ProfilePage /> : <Navigate to="/auth" />} />
          </Routes>
        </main>


        <Footer />

        {/* floating elements  */}
        <WhatsAppChat />
        <AIBot />
      </div>
    </CartProvider>

  )
}

export default App
