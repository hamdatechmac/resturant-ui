import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ShoppingCart, ArrowLeft, Star, ShieldCheck, Truck, Plus, Minus } from 'lucide-react';
import { motion } from 'framer-motion';
import BRAND from '../config/brand';

const ProductDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [product, setProduct] = useState(null);
    const [quantity, setQuantity] = useState(1);

    useEffect(() => {
        fetch('http://localhost:5000/api/products')
            .then(res => res.json())
            .then(data => {
                const found = data.products.find(p => p.id === parseInt(id));
                setProduct(found);
            });
    }, [id]);

    if (!product) return <div className="loading py-section text-center">Loading Gourmet Goodness...</div>;

    return (
        <div className="product-detail-page py-section paper-overlay">
            <div className="container mt-50">
                <button onClick={() => navigate(-1)} className="back-btn mb-50 accent-font">
                    <ArrowLeft size={18} /> BACK TO MENU
                </button>

                <div className="detail-grid gap-80">
                    <motion.div 
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="detail-image"
                    >
                        <div className="img-holder glass">
                            <img src={product.image} alt={product.name} />
                        </div>
                    </motion.div>

                    <motion.div 
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="detail-info"
                    >
                        <span className="cat-tag accent-font">{product.category}</span>
                        <h1 className="heading-font">{product.name}</h1>
                        <div className="rating-row mb-30">
                            {[1,2,3,4,5].map(s => <Star key={s} size={18} fill="var(--primary)" color="var(--primary)" />)}
                            <span className="accent-font">(120+ REVIEWS)</span>
                        </div>
                        <p className="detail-price accent-font">${product.price.toFixed(2)}</p>
                        <p className="detail-desc text-large mb-50">{product.description}</p>

                        <div className="custom-section mb-50">
                            <h3 className="heading-font mb-20">CUSTOMIZE YOUR BITE</h3>
                            <div className="custom-opts">
                                <label className="custom-opt"><input type="checkbox" /> <span>Extra {BRAND.name} Sauce</span></label>
                                <label className="custom-opt"><input type="checkbox" /> <span>Double Cheese</span></label>
                                <label className="custom-opt"><input type="checkbox" /> <span>No Onions</span></label>
                            </div>
                        </div>

                        <div className="buy-actions">
                            <div className="qty-control">
                                <button onClick={() => setQuantity(Math.max(1, quantity - 1))}><Minus size={18} /></button>
                                <span className="accent-font">{quantity}</span>
                                <button onClick={() => setQuantity(quantity + 1)}><Plus size={18} /></button>
                            </div>
                            <button className="btn-skew btn-large flex-1">
                                <span>ADD TO BAG</span>
                            </button>
                        </div>

                        <div className="detail-badges border-top mt-50 pt-40">
                            <div className="badge-item"><ShieldCheck className="text-orange" /> <span>100% Halal Certified</span></div>
                            <div className="badge-item"><Truck className="text-orange" /> <span>Express Home Delivery</span></div>
                        </div>
                    </motion.div>
                </div>
            </div>

            <style jsx>{`
                .product-detail-page { padding-top: 150px; background: #fff; min-height: 100vh; }
                .back-btn { background: #000; color: #fff; padding: 12px 25px; display: flex; align-items: center; gap: 10px; }
                .detail-grid { display: grid; grid-template-columns: 1fr 1fr; align-items: start; }
                .img-holder { background: var(--bg-cream); border-radius: 30px; overflow: hidden; padding: 20px; }
                .img-holder img { width: 100%; border-radius: 20px; transition: transform 0.5s ease; }
                .img-holder:hover img { transform: scale(1.05); }
                .cat-tag { color: var(--primary); font-size: 0.9rem; letter-spacing: 2px; display: block; margin-bottom: 10px; }
                .detail-info h1 { font-size: 4rem; line-height: 1; margin-bottom: 20px; }
                .rating-row { display: flex; align-items: center; gap: 15px; color: var(--text-grey); }
                .detail-price { font-size: 3rem; color: var(--primary); margin-bottom: 30px; }
                .detail-desc { color: var(--text-grey); line-height: 1.8; }
                .custom-opts { display: flex; flex-wrap: wrap; gap: 20px; }
                .custom-opt { display: flex; align-items: center; gap: 10px; cursor: pointer; font-weight: 700; background: var(--bg-cream); padding: 10px 20px; border-radius: 5px; }
                .buy-actions { display: flex; gap: 20px; }
                .qty-control { display: flex; align-items: center; background: #f5f5f5; border-radius: 5px; overflow: hidden; }
                .qty-control button { padding: 15px 25px; background: transparent; transition: var(--transition); }
                .qty-control button:hover { background: var(--primary); color: white; }
                .qty-control span { width: 50px; text-align: center; font-size: 1.2rem; }
                .detail-badges { display: flex; gap: 40px; }
                .badge-item { display: flex; align-items: center; gap: 10px; font-weight: 700; color: #000; }
                .border-top { border-top: 1px solid #eee; }
                .pt-40 { padding-top: 40px; }
                @media (max-width: 992px) { 
                    .detail-grid { grid-template-columns: 1fr; }
                    .detail-info h1 { font-size: 2.8rem; }
                }
            `}</style>
        </div>
    );
};

export default ProductDetail;
