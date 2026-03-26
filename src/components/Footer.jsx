import BRAND from '../config/brand';

const Footer = () => {
    return (
        <footer className="footer py-section bg-dark text-white relative overflow-hidden">
            <div className="halftone abs-inset opacity-10"></div>
            <div className="container relative z-10">
                <div className="footer-grid">
                    <div className="footer-col col-main">
                        <h2 className="heading-font logo mb-30">
                            {BRAND.logoMain}<span>{BRAND.logoAccent}</span>
                        </h2>
                        <p className="text-muted text-large mb-40">The heartbeat of halal street food. We bring the heat, the flavor, and the vibe to every single bite.</p>
                        <div className="social-links flex gap-20">
                            <div className="social-icon">IG</div>
                            <div className="social-icon">FB</div>
                            <div className="social-icon">TT</div>
                        </div>
                    </div>
                    <div className="footer-col">
                        <h4 className="accent-font mb-25">ORDER NOW</h4>
                        <ul>
                            <li><a href="/menu">Burgers</a></li>
                            <li><a href="/menu">Parmesans</a></li>
                            <li><a href="/menu">Pizza</a></li>
                            <li><a href="/menu">Shakes</a></li>
                        </ul>
                    </div>
                    <div className="footer-col">
                        <h4 className="accent-font mb-25">COMPANY</h4>
                        <ul>
                            <li><a href="/about">Our Story</a></li>
                            <li><a href="/location">Find Us</a></li>
                            <li><a href="/contact">Franchise</a></li>
                            <li><a href="/career">Careers</a></li>
                        </ul>
                    </div>
                    <div className="footer-col">
                        <h4 className="accent-font mb-25">CONTACT</h4>
                        <p className="mb-10">{BRAND.websiteEmail}</p>
                        <p className="mb-10">+44 123 456 7890</p>
                        <p>123 High Street, Burger Lane, UK</p>
                    </div>
                </div>
                <div className="footer-border mt-80 pt-40 flex justify-between items-center text-muted">
                    <p>&copy; {new Date().getFullYear()} {BRAND.logoMain} {BRAND.logoAccent}. {BRAND.copyrightPrefix}.</p>
                    <div className="flex gap-30">
                        <span>PRIVACY</span>
                        <span>TERMS</span>
                    </div>
                </div>
            </div>
            <style jsx>{`
                .footer { background: #000; padding: 120px 0 50px; }
                .footer-grid { display: grid; grid-template-columns: 2fr 1fr 1fr 1.5fr; gap: 60px; }
                .logo { font-size: 2.5rem; }
                .logo span { color: var(--primary); }
                .footer h4 { font-size: 1.2rem; color: var(--primary); letter-spacing: 2px; }
                .footer ul { list-style: none; }
                .footer ul li { margin-bottom: 12px; font-weight: 700; text-transform: uppercase; font-size: 0.9rem; }
                .footer ul li a:hover { color: var(--primary); }
                .bg-dark { background: #000; }
                .text-white { color: white; }
                .social-icon { width: 45px; height: 45px; background: var(--primary); color: white; border-radius: 5px; display: flex; align-items: center; justify-content: center; font-weight: 900; }
                .footer-border { border-top: 1px solid rgba(255,255,255,0.1); font-size: 0.8rem; font-weight: 700; }
                @media (max-width: 992px) { .footer-grid { grid-template-columns: 1fr 1fr; } }
                @media (max-width: 576px) { .footer-grid { grid-template-columns: 1fr; text-align: center; } .social-links { justify-content: center; } }
            `}</style>
        </footer>
    );
};

export default Footer;
