import { motion } from 'framer-motion';
import BRAND from '../config/brand';
import { Link } from 'react-router-dom';
import { ArrowRight, Star, Bolt, ShieldCheck, MapPin } from 'lucide-react';

const Landing = () => {
    return (
        <div className="landing paper-overlay">
            {/* Hero Section */}
            <section className="hero">
                <div className="hero-bg-accent"></div>
                <div className="container hero-container">
                    <motion.div 
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                        className="hero-text"
                    >
                        <h4 className="accent-font text-orange mb-10">#1 HALAL BURGERS IN TOWN</h4>
                        <h1 className="hero-title">SUPER STAR <br /><span>BURGER</span></h1>
                        <p className="hero-desc">
                            Bite into greatness. Our signature 100% halal beef patties, secret {BRAND.name} sauce, and farm-fresh ingredients.
                        </p>
                        <div className="hero-actions">
                            <Link to="/menu" className="btn-skew btn-large">
                                <span>Order For Delivery</span>
                            </Link>
                            <Link to="/menu" className="btn-skew btn-white ml-20">
                                <span>View Full Menu</span>
                            </Link>
                        </div>
                    </motion.div>
                    
                    <motion.div 
                        initial={{ opacity: 0, scale: 0.5, rotate: -10 }}
                        animate={{ opacity: 1, scale: 1, rotate: 0 }}
                        transition={{ duration: 1, type: "spring" }}
                        className="hero-visual"
                    >
                        <div className="star-decoration"></div>
                        <img src="https://images.unsplash.com/photo-1594212699903-ec8a3eca50f5?q=80&w=1000&auto=format&fit=crop" alt="Super Star Burger" className="hero-burger" />
                        <div className="badge-promo accent-font">NEW!</div>
                    </motion.div>
                </div>
            </section>

            {/* Featured Categories - Aggressive Spacing */}
            <section className="featured-cats py-section">
                <div className="container">
                    <motion.div
                        className="section-header text-center mb-80"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, amount: 0.25 }}
                        transition={{ duration: 0.6 }}
                    >
                        <h2 className="section-title">CHOOSE YOUR <span>FLAVOUR</span></h2>
                        <div className="title-underline"></div>
                    </motion.div>
                    
                    <div className="cat-grid">
                        {[ 
                            { to: '/menu/burgers', img: 'https://images.unsplash.com/photo-1571091718767-18b5b1457add?q=80&w=600&auto=format&fit=crop', title: 'BURGERS' },
                            { to: '/menu/parmesans', img: 'https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?q=80&w=600&auto=format&fit=crop', title: 'PARMESANS' },
                            { to: '/menu/shakes', img: 'https://images.unsplash.com/photo-1572490122747-3968b75cc699?q=80&w=600&auto=format&fit=crop', title: 'SHAKES' }
                        ].map((item, idx) => (
                            <motion.div
                                key={item.to}
                                initial={{ opacity: 0, y: 25 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, amount: 0.2 }}
                                transition={{ duration: 0.55, delay: idx * 0.06 }}
                            >
                                <Link to={item.to} className="cat-card">
                                    <div className="cat-img">
                                        <img src={item.img} alt={item.title} />
                                    </div>
                                    <h3>{item.title}</h3>
                                    <ArrowRight className="cat-icon" />
                                </Link>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Why Us / Trust Section */}
            <section className="trust-section py-section bg-cream relative overflow-hidden">
                <div className="halftone abs-inset"></div>
                <div className="container relative z-10">
                    <motion.div
                        className="grid grid-2 gap-80 items-center"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, amount: 0.25 }}
                        transition={{ duration: 0.65 }}
                    >
                        <div className="trust-img">
                            <img src="https://images.unsplash.com/photo-1550547660-d9450f859349?q=80&w=1000&auto=format&fit=crop" alt="Quality Food" className="rounded-20" />
                        </div>
                        <div className="trust-text">
                            <h2 className="mb-30">FRESH, FASTER, <span>HALAL</span></h2>
                            <p className="text-large mb-40">We take pride in our process. Every burger is made to order using premium cuts of halal beef and our secret spice blends.</p>
                            <div className="trust-list">
                                <div className="trust-item"><Bolt className="text-orange" /> <span>Express Delivery in 30 Mins</span></div>
                                <div className="trust-item"><ShieldCheck className="text-orange" /> <span>100% Certified Halal Meat</span></div>
                                <div className="trust-item"><MapPin className="text-orange" /> <span>Located in the Heart of the City</span></div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </section>

            <style jsx>{`
                .landing { position: relative; }
                .hero {
                    min-height: 100vh;
                    display: flex;
                    align-items: center;
                    background: var(--bg-cream);
                    position: relative;
                    overflow: hidden;
                    padding-top: 100px;
                }
                .hero-bg-accent {
                    position: absolute;
                    top: 0;
                    right: 0;
                    width: 45%;
                    height: 100%;
                    background: var(--primary);
                    clip-path: polygon(25% 0%, 100% 0%, 100% 100%, 0% 100%);
                    z-index: 1;
                }
                .hero-container {
                    display: grid;
                    grid-template-columns: 1fr 1fr;
                    gap: 50px;
                    align-items: center;
                    position: relative;
                    z-index: 2;
                }
                .hero-title {
                    font-size: 6rem;
                    line-height: 0.9;
                    margin-bottom: 25px;
                    color: var(--primary);
                    -webkit-text-stroke: 3px #ffffff;
                    text-shadow: 6px 6px 0 rgba(0, 0, 0, 0.18);
                }
                .hero-title span { color: var(--primary); }
                .hero-desc {
                    font-size: 1.25rem;
                    color: var(--text-grey);
                    max-width: 500px;
                    margin-bottom: 50px;
                }
                .hero-visual { position: relative; }
                .hero-burger {
                    width: 100%;
                    z-index: 5;
                    position: relative;
                    filter: drop-shadow(0 30px 60px rgba(0,0,0,0.3));
                }
                .star-decoration {
                    position: absolute;
                    top: 50%;
                    left: 50%;
                    transform: translate(-50%, -50%);
                    width: 120%;
                    height: 120%;
                    background: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><polygon points="50,0 61,35 98,35 68,57 79,91 50,70 21,91 32,57 2,35 39,35" fill="none" stroke="white" stroke-width="2" opacity="0.3"/></svg>');
                    background-size: contain;
                    background-repeat: no-repeat;
                    z-index: 1;
                }
                .badge-promo {
                    position: absolute;
                    top: 10%;
                    right: 0;
                    background: black;
                    color: var(--primary);
                    padding: 20px;
                    border-radius: 50%;
                    font-size: 1.5rem;
                    transform: rotate(15deg);
                    z-index: 6;
                }
                .btn-large { padding: 22px 50px; font-size: 1.3rem; }
                .btn-white { background: white; color: black; }
                .btn-white:hover { background: var(--primary); color: white; }
                
                .mb-80 { margin-bottom: 80px; }
                .section-title { font-size: 3.5rem; }
                .section-title span { color: var(--primary); }
                .title-underline { width: 100px; height: 5px; background: var(--primary); margin: 20px auto; }
                
                .cat-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 40px; }
                .cat-card {
                    background: white;
                    padding: 30px;
                    text-align: center;
                    border: 1px solid rgba(0,0,0,0.05);
                    transition: var(--transition);
                    position: relative;
                }
                .cat-card:hover { transform: translateY(-15px); border-color: var(--primary); box-shadow: 0 20px 40px rgba(0,0,0,0.1); }
                .cat-img { height: 200px; margin-bottom: 25px; overflow: hidden; border-radius: 10px; }
                .cat-img img { width: 100%; height: 100%; object-fit: cover; }
                .cat-card h3 { font-size: 1.8rem; margin-bottom: 15px; }
                .cat-icon { color: var(--primary); }
                
                .bg-cream { background: var(--bg-cream); }
                .grid-2 { grid-template-columns: 1fr 1fr; }
                .trust-item { display: flex; align-items: center; gap: 15px; font-weight: 700; margin-bottom: 20px; font-size: 1.1rem; }
                .text-orange { color: var(--primary); }
                .rounded-20 { border-radius: 20px; }
                .abs-inset { position: absolute; inset: 0; }
                .ml-20 { margin-left: 20px; }
                
                @media (max-width: 992px) {
                    .hero-container { grid-template-columns: 1fr; text-align: center; }
                    .hero-title { font-size: 4rem; }
                    .hero-bg-accent { display: none; }
                    .cat-grid { grid-template-columns: 1fr; }
                    .grid-2 { grid-template-columns: 1fr; }
                    .hero-desc { margin: 0 auto 50px; }
                }

                @media (max-width: 576px) {
                    .hero { padding-top: 85px; }
                    .hero-title { font-size: 2.7rem; }
                    .hero-desc { font-size: 1rem; margin: 0 auto 40px; }
                    .cat-grid { gap: 22px; }
                }
            `}</style>
        </div>
    );
};

export default Landing;
