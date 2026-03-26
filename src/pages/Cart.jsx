import { ShoppingBag, ArrowRight, Trash2, Tag } from 'lucide-react';
import { Link } from 'react-router-dom';

const Cart = () => {
    // Mock cart data
    const cartItems = [
        { id: 101, name: "The Royal Truffle Burger", price: 18.50, quantity: 1, image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?q=80&w=1000&auto=format&fit=crop" }
    ];

    const subtotal = cartItems.reduce((acc, item) => acc + (item.price * item.quantity), 0);
    const delivery = 2.50;
    const total = subtotal + delivery;

    return (
        <div className="cart-page py-section paper-overlay">
            <div className="container mt-50">
                <div className="cart-header mb-80">
                    <h1 className="section-title">YOUR <span>BAG</span></h1>
                    <div className="title-underline left"></div>
                </div>
                
                <div className="cart-grid">
                    <div className="cart-items">
                        {cartItems.length > 0 ? (
                            cartItems.map(item => (
                                <div key={item.id} className="cart-item glass p-30 mb-20 rounded-10 relative">
                                    <img src={item.image} alt={item.name} className="cart-item-img" />
                                    <div className="item-info">
                                        <h3 className="heading-font">{item.name}</h3>
                                        <p className="price accent-font text-orange text-xl">${item.price.toFixed(2)}</p>
                                    </div>
                                    <div className="item-controls flex items-center gap-20">
                                        <div className="qty-pill flex items-center bg-cream border">
                                            <button className="px-15 py-10 font-bold">-</button>
                                            <span className="px-15 font-black">{item.quantity}</span>
                                            <button className="px-15 py-10 font-bold">+</button>
                                        </div>
                                        <button className="remove-btn text-muted hover:text-red-500 transition"><Trash2 size={24} /></button>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className="empty-cart text-center py-80 bg-cream rounded-20 border-dashed">
                                <ShoppingBag size={80} className="mb-30 text-grey opacity-20" />
                                <h2 className="heading-font mb-20">YOUR BAG IS EMPTY!</h2>
                                <p className="text-grey mb-40">Ready to feed that hunger?</p>
                                <Link to="/menu" className="btn-skew"><span>Go To Menu</span></Link>
                            </div>
                        )}
                    </div>

                    <div className="cart-sidebar">
                        <div className="summary-card glass p-40 rounded-20 border-orange sticky top-150">
                            <h2 className="heading-font mb-30 border-bottom pb-20">ORDER TOTAL</h2>
                            <div className="sum-row flex justify-between mb-20">
                                <span className="font-bold">SUBTOTAL</span>
                                <span className="accent-font">${subtotal.toFixed(2)}</span>
                            </div>
                            <div className="sum-row flex justify-between mb-30">
                                <span className="font-bold">DELIVERY FEE</span>
                                <span className="accent-font">${delivery.toFixed(2)}</span>
                            </div>
                            <div className="promo-input mb-40 flex">
                                <input type="text" placeholder="PROMO CODE" className="flex-1 p-15 border bg-white rounded-l-5" />
                                <button className="bg-black text-white px-20 rounded-r-5 font-bold">APPLY</button>
                            </div>
                            <div className="total-row flex justify-between mb-40 border-top pt-30">
                                <span className="heading-font text-2xl">TOTAL</span>
                                <span className="accent-font text-3xl text-orange">${total.toFixed(2)}</span>
                            </div>
                            <Link to="/checkout" className="btn-skew btn-wide text-center">
                                <span>Complete Order <ArrowRight size={20} className="inline ml-10" /></span>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>

            <style jsx>{`
                .cart-page { padding-top: 150px; background: #fff; min-height: 100vh; }
                .title-underline.left { margin: 20px 0; }
                .cart-grid { display: grid; grid-template-columns: 1.2fr 450px; gap: 60px; }
                .cart-item { display: flex; align-items: center; gap: 30px; border: 1px solid #eee; }
                .cart-item-img { width: 120px; height: 120px; object-fit: cover; border-radius: 10px; }
                .item-info { flex: 1; }
                .qty-pill { border: 1px solid #ddd; }
                .qty-pill button:hover { background: var(--primary); color: white; }
                .summary-card { border: 2px solid #000; position: sticky; top: 120px; }
                .border-orange { border-color: var(--primary) !important; }
                .border-bottom { border-bottom: 1px solid #eee; }
                .border-top { border-top: 1px solid #eee; }
                .text-2xl { font-size: 1.5rem; }
                .text-3xl { font-size: 2rem; }
                .btn-wide { width: 100%; display: block; padding: 20px; font-size: 1.2rem; }
                
                .bg-cream { background: var(--bg-cream); }
                .border-dashed { border: 2px dashed #ddd; }
                @media (max-width: 1200px) { .cart-grid { grid-template-columns: 1fr; } }
            `}</style>
        </div>
    );
};

export default Cart;
