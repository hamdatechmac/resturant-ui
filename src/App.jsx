import { Routes, Route } from 'react-router-dom';
import { useEffect } from 'react';
import Navbar from './components/Navbar';
import Landing from './pages/Landing';
import CategoryMenu from './pages/CategoryMenu';
import ProductDetail from './pages/ProductDetail';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import About from './pages/About';
import Contact from './pages/Contact';
import AdminAuth from './pages/Admin/AdminAuth';
import Footer from './components/Footer';

function App() {
  useEffect(() => {
    console.log('App component mounted successfully');
  }, []);

  return (
    <div className="app-container">
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/menu/:category" element={<CategoryMenu />} />
          <Route path="/menu" element={<CategoryMenu />} />
          <Route path="/product/:id" element={<ProductDetail />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/admin" element={<AdminAuth />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;
