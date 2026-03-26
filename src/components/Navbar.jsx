import { Link } from 'react-router-dom';
import { ShoppingCart, Menu as MenuIcon, User } from 'lucide-react';
import { useState, useEffect } from 'react';
import BRAND from '../config/brand';

const Navbar = () => {
    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => setIsScrolled(window.scrollY > 50);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <nav className={`navbar ${isScrolled ? 'is-scrolled' : ''}`}>
            <div className="container nav-content">
                <Link to="/" className="logo heading-font">
                    {BRAND.logoMain}<span>{BRAND.logoAccent}</span>
                </Link>
                
                <div className="nav-links">
                    <Link to="/menu">Our Menu</Link>
                    <Link to="/about">Our Story</Link>
                    <Link to="/contact">Find Us</Link>
                </div>

                <div className="nav-actions">
                    <Link to="/admin" className="admin-link"><User size={20} /></Link>
                    <Link to="/cart" className="cart-link">
                        <ShoppingCart size={22} />
                        <span className="cart-badge">1</span>
                    </Link>
                    <Link to="/menu" className="btn-order btn-skew">
                        <span>Order Now</span>
                    </Link>
                </div>
            </div>
            <style jsx>{`
                .navbar {
                    position: fixed;
                    top: 0;
                    left: 0;
                    right: 0;
                    height: 100px;
                    display: flex;
                    align-items: center;
                    background: transparent;
                    z-index: 1000;
                    transition: var(--transition);
                }
                .navbar.is-scrolled {
                    height: 80px;
                    background: var(--bg-cream);
                    box-shadow: 0 5px 20px rgba(0,0,0,0.05);
                }
                .nav-content {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    width: 100%;
                }
                .logo {
                    font-size: 1.8rem;
                    color: black;
                }
                .logo span {
                    color: var(--primary);
                }
                .nav-links {
                    display: flex;
                    gap: 40px;
                }
                .nav-links a {
                    font-weight: 700;
                    font-size: 1rem;
                    text-transform: uppercase;
                    color: black;
                }
                .nav-links a:hover {
                    color: var(--primary);
                }
                .nav-actions {
                    display: flex;
                    align-items: center;
                    gap: 30px;
                }
                .cart-link {
                    position: relative;
                }
                .cart-badge {
                    position: absolute;
                    top: -8px;
                    right: -10px;
                    background: black;
                    color: white;
                    font-size: 0.7rem;
                    font-weight: 800;
                    padding: 2px 6px;
                    border-radius: 50%;
                }
                .btn-order {
                    padding: 12px 30px;
                    font-size: 0.9rem;
                }
                @media (max-width: 992px) {
                    .nav-links { display: none; }
                }

                @media (max-width: 576px) {
                    .navbar { height: 72px; }
                    .navbar.is-scrolled { height: 62px; }
                    .nav-actions { gap: 14px; }
                    .logo { font-size: 1.35rem; }
                    .nav-actions a {
                        /* keep icons readable */
                        display: inline-flex;
                        align-items: center;
                        justify-content: center;
                    }
                    .btn-order {
                        padding: 10px 14px;
                        font-size: 0.85rem;
                    }
                    .cart-badge {
                        top: -6px;
                        right: -8px;
                        font-size: 0.65rem;
                    }
                }
            `}</style>
        </nav>
    );
};

export default Navbar;
