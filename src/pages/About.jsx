import BRAND from '../config/brand';

const About = () => {
    return (
        <div className="about-page py-section paper-overlay">
            <div className="container mt-50">
                <div className="about-hero-grid flex gap-80 items-center">
                    <div className="about-img relative">
                        <div className="star-decoration-large"></div>
                        <img src="https://images.unsplash.com/photo-1550547660-d9450f859349?q=80&w=1000&auto=format&fit=crop" alt="Our Story" className="rounded-20 relative z-10 border-5 border-black" />
                    </div>
                    <div className="about-text">
                        <h4 className="accent-font text-orange mb-10">
                            THE {BRAND.logoMain} {BRAND.logoAccent} STORY
                        </h4>
                        <h1 className="heading-font text-6xl mb-30">WHERE LEGENDS <br /><span>ARE BRED</span></h1>
                        <p className="text-xl text-grey leading-relaxed mb-40">{BRAND.name} started with a simple belief: that street food should be legendary. We don't just flip burgers; we craft experiences that ignite your taste buds and leave you craving more.</p>
                        <p className="text-large text-grey mb-50">Our journey began in the heart of the community, driven by a passion for authentic flavors and a commitment to 100% halal goodness. Today, we stand as a beacon of flavor, innovation, and street-food culture.</p>
                        
                        <div className="grid grid-cols-2 gap-30">
                            <div className="glass p-30 border-l-orange bg-cream">
                                <h2 className="heading-font text-3xl">100%</h2>
                                <p className="accent-font">HALAL CERTIFIED</p>
                            </div>
                            <div className="glass p-30 border-l-black bg-white">
                                <h2 className="heading-font text-3xl">FRESH</h2>
                                <p className="accent-font">MADE TO ORDER</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <style jsx>{`
                .about-page { padding-top: 150px; background: #fff; min-height: 100vh; }
                .about-hero-grid { display: flex; align-items: center; }
                .text-6xl { font-size: 4.5rem; line-height: 0.9; }
                .text-6xl span { color: var(--primary); }
                .about-img { flex: 1; }
                .about-text { flex: 1.2; }
                .rounded-20 { border-radius: 20px; }
                .border-5 { border-width: 5px !important; }
                .star-decoration-large {
                    position: absolute;
                    top: 50%;
                    left: 50%;
                    transform: translate(-50%, -50%);
                    width: 140%;
                    height: 140%;
                    background: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><polygon points="50,0 61,35 98,35 68,57 79,91 50,70 21,91 32,57 2,35 39,35" fill="none" stroke="%23FF4E00" stroke-width="1" opacity="0.2"/></svg>');
                    background-size: contain;
                    background-repeat: no-repeat;
                }
                @media (max-width: 992px) { 
                    .about-hero-grid { flex-direction: column-reverse; text-align: center; }
                    .text-6xl { font-size: 3.5rem; }
                }
            `}</style>
        </div>
    );
};

export default About;
