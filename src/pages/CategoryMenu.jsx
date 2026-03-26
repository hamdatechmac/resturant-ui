import { useEffect, useMemo, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const CategoryMenu = () => {
    const { category } = useParams();
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        fetch('http://localhost:5000/api/products')
            .then(res => res.json())
            .then(data => {
                setCategories(data.categories);
                if (category) {
                    setProducts(data.products.filter(p => p.category === category));
                } else {
                    setProducts(data.products);
                }
                setLoading(false);
            })
            .catch(err => {
                console.error(err);
                setLoading(false);
            });
    }, [category]);

    const filteredProducts = useMemo(() => {
        const q = searchQuery.trim().toLowerCase();
        if (!q) return products;
        return products.filter(p => {
            const name = (p.name ?? '').toString().toLowerCase();
            const desc = (p.description ?? '').toString().toLowerCase();
            return name.includes(q) || desc.includes(q);
        });
    }, [products, searchQuery]);

    return (
        <div className="menu-page py-section paper-overlay">
            <div className="halftone abs-inset menu-halftone" />
            <div className="container menu-container">
                <motion.div
                    className="menu-top-header text-center mb-80"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.25 }}
                    transition={{ duration: 0.6 }}
                >
                    <h1 className="section-title">OUR <span>MENU</span></h1>
                    <div className="title-underline"></div>
                    <p className="text-large text-grey mt-20">
                        Handcrafted halal favourites. Scroll, pick your category, and order with confidence.
                    </p>
                </motion.div>

                {/* Category Filter */}
                <div className="category-tabs mb-80">
                    <Link to="/menu" className={`tab-btn accent-font ${!category ? 'active' : ''}`}>
                        ALL ITEMS
                    </Link>
                    {categories.map(cat => (
                        <Link
                            key={cat.id}
                            to={`/menu/${cat.slug}`}
                            className={`tab-btn accent-font ${category === cat.slug ? 'active' : ''}`}
                        >
                            {cat.name}
                        </Link>
                    ))}
                </div>

                {/* Products List */}
                <div className="menu-toolbar mb-50">
                    <div className="search-wrap">
                        <input
                            type="text"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            placeholder="Search burgers, wings, shakes..."
                            aria-label="Search menu"
                        />
                    </div>
                </div>

                <div className="product-list">
                    {loading ? (
                        Array.from({ length: 6 }).map((_, i) => (
                            <div key={i} className="skeleton-row glass rounded-20" />
                        ))
                    ) : filteredProducts.length === 0 ? (
                        <div className="empty-state glass rounded-20">
                            <h3 className="heading-font">No items found</h3>
                            <p className="text-grey mt-10">Try a different category or search term.</p>
                        </div>
                    ) : (
                        filteredProducts.map((product, index) => (
                            <motion.div
                                key={product.id}
                                className="menu-row-card"
                                initial={{ opacity: 0, y: 25 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, amount: 0.18 }}
                                transition={{ duration: 0.55, delay: index * 0.03 }}
                            >
                                <Link to={`/product/${product.id}`} className="row-thumb" aria-label={`Open ${product.name}`}>
                                    <img src={product.image} alt={product.name} />
                                    {product.featured && <div className="featured-pill accent-font">POPULAR</div>}
                                </Link>

                                <div className="row-body">
                                    <div className="row-top">
                                        <h3 className="heading-font row-title">{product.name}</h3>
                                        <span className="row-price accent-font">${Number(product.price).toFixed(2)}</span>
                                    </div>

                                    <p className="row-desc">
                                        {String(product.description ?? '').substring(0, 120)}...
                                    </p>

                                    <div className="row-actions">
                                        <Link to={`/product/${product.id}`} className="btn-skew row-btn">
                                            <span>VIEW DETAILS</span>
                                        </Link>
                                        <Link to={`/product/${product.id}`} className="btn-skew btn-white row-btn">
                                            <span>ADD TO BAG</span>
                                        </Link>
                                    </div>
                                </div>
                            </motion.div>
                        ))
                    )}
                </div>
            </div>

            <style jsx>{`
                .menu-page { padding-top: 150px; background: var(--bg-cream); min-height: 100vh; }
                .menu-container { position: relative; z-index: 2; }
                .menu-halftone { z-index: 0; opacity: 0.06; }

                .category-tabs {
                    display: flex;
                    justify-content: center;
                    gap: 14px;
                    flex-wrap: wrap;
                }
                .tab-btn {
                    padding: 12px 30px;
                    background: transparent;
                    border: 2px solid rgba(0,0,0,0.08);
                    font-size: 1.1rem;
                    color: black;
                    transition: var(--transition);
                }
                .tab-btn.active, .tab-btn:hover {
                    background: var(--primary);
                    border-color: var(--primary);
                    color: white;
                }

                .menu-toolbar { display: flex; justify-content: center; }
                .search-wrap {
                    width: min(720px, 100%);
                }
                .search-wrap input {
                    width: 100%;
                    padding: 16px 18px;
                    border-radius: 14px;
                    border: 1px solid rgba(0,0,0,0.08);
                    background: rgba(255, 255, 255, 0.9);
                    outline: none;
                    font-weight: 700;
                }

                .product-list {
                    display: flex;
                    flex-direction: column;
                    gap: 26px;
                    padding-bottom: 40px;
                }

                .menu-row-card {
                    display: flex;
                    gap: 26px;
                    align-items: center;
                    background: rgba(255,255,255,0.9);
                    border: 1px solid rgba(0,0,0,0.08);
                    border-radius: 22px;
                    padding: 22px;
                    transition: var(--transition);
                    overflow: hidden;
                    position: relative;
                }
                .menu-row-card:hover {
                    transform: translateY(-6px);
                    box-shadow: 0 30px 70px rgba(0,0,0,0.12);
                    border-color: rgba(255, 78, 0, 0.55);
                }

                .row-thumb {
                    width: 210px;
                    flex: 0 0 auto;
                    height: 170px;
                    border-radius: 18px;
                    overflow: hidden;
                    position: relative;
                    border: 1px solid rgba(0,0,0,0.06);
                }
                .row-thumb img {
                    width: 100%;
                    height: 100%;
                    object-fit: cover;
                    transition: transform 0.6s ease;
                }
                .menu-row-card:hover .row-thumb img { transform: scale(1.08); }

                .featured-pill {
                    position: absolute;
                    top: 12px;
                    left: 12px;
                    background: #000;
                    color: var(--primary);
                    padding: 8px 14px;
                    border-radius: 999px;
                    font-size: 0.8rem;
                    font-weight: 900;
                    letter-spacing: 1px;
                }

                .row-body { flex: 1; min-width: 0; display: flex; flex-direction: column; }
                .row-top { display: flex; align-items: flex-start; justify-content: space-between; gap: 18px; }
                .row-title { font-size: 1.8rem; }
                .row-price { color: var(--primary); font-size: 1.7rem; white-space: nowrap; }

                .row-desc {
                    color: var(--text-grey);
                    line-height: 1.75;
                    margin-top: 10px;
                    max-width: 62ch;
                }

                .row-actions {
                    margin-top: auto;
                    display: flex;
                    gap: 14px;
                    flex-wrap: wrap;
                }

                .row-btn { padding: 14px 28px; font-size: 0.95rem; }

                .skeleton-row {
                    height: 190px;
                    border: 1px solid rgba(0,0,0,0.06);
                    background: linear-gradient(90deg, rgba(0,0,0,0.04), rgba(255, 78, 0, 0.08), rgba(0,0,0,0.04));
                    background-size: 300% 100%;
                    animation: skeletonMove 1.2s ease-in-out infinite;
                }

                @keyframes skeletonMove {
                    0% { background-position: 0% 0; }
                    100% { background-position: 100% 0; }
                }

                .empty-state {
                    padding: 36px 30px;
                    text-align: center;
                    border: 1px dashed rgba(0,0,0,0.15);
                }

                @media (max-width: 992px) {
                    .menu-page { padding-top: 110px; }
                    .menu-row-card { flex-direction: column; align-items: stretch; }
                    .row-thumb { width: 100%; height: 200px; }
                    .row-actions { justify-content: center; }
                    .row-title { font-size: 1.5rem; }
                }

                @media (max-width: 576px) {
                    .menu-page { padding-top: 95px; }
                    .category-tabs { gap: 10px; }
                    .tab-btn { padding: 10px 16px; font-size: 1rem; }
                    .menu-row-card { padding: 16px; border-radius: 18px; }
                    .row-thumb { height: 175px; }
                    .row-price { font-size: 1.4rem; }
                    .row-desc { max-width: 100%; }
                    .row-btn { padding: 12px 18px; }
                    .search-wrap input { padding: 14px 14px; }
                }
            `}</style>
        </div>
    );
};

export default CategoryMenu;
