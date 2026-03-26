import { Mail, Phone, MapPin, Send } from 'lucide-react';

const Contact = () => {
    return (
        <div className="contact-page py-100">
            <div className="container mt-50">
                <div className="contact-grid">
                    <div className="contact-info">
                        <h1 className="premium-font mb-30">Get in <span>Touch</span></h1>
                        <p className="text-muted mb-50">Have a question or feedback? We'd love to hear from you. Reach out to us via any of the channels below.</p>
                        
                        <div className="contact-methods">
                            <div className="method flex items-center gap-20 mb-30">
                                <div className="icon-box glass"><Mail className="text-gold" /></div>
                                <div><h4>Email Us</h4><p>hello@gourmetburger.com</p></div>
                            </div>
                            <div className="method flex items-center gap-20 mb-30">
                                <div className="icon-box glass"><Phone className="text-gold" /></div>
                                <div><h4>Call Us</h4><p>+1 234 567 890</p></div>
                            </div>
                            <div className="method flex items-center gap-20 mb-30">
                                <div className="icon-box glass"><MapPin className="text-gold" /></div>
                                <div><h4>Visit Us</h4><p>123 Gourmet St, Food City, FC 456</p></div>
                            </div>
                        </div>
                    </div>

                    <form className="contact-form glass p-40">
                        <div className="form-group mb-20">
                            <label>Full Name</label>
                            <input type="text" placeholder="John Doe" />
                        </div>
                        <div className="form-group mb-20">
                            <label>Email Address</label>
                            <input type="email" placeholder="john@example.com" />
                        </div>
                        <div className="form-group mb-30">
                            <label>Message</label>
                            <textarea rows="5" placeholder="Tell us something..."></textarea>
                        </div>
                        <button className="btn btn-primary w-full"><Send size={18} /> Send Message</button>
                    </form>
                </div>
            </div>

            <style jsx>{`
                .contact-page { padding-top: 130px; }
                .contact-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 80px; align-items: start; }
                .contact-info h1 span { color: var(--primary); }
                .icon-box { width: 60px; height: 60px; display: flex; align-items: center; justify-content: center; border-radius: 15px; }
                .method h4 { font-size: 1.1rem; margin-bottom: 2px; }
                .method p { color: var(--text-muted); }
                .form-group label { display: block; margin-bottom: 10px; font-size: 0.9rem; color: var(--text-muted); }
                .form-group input, .form-group textarea { width: 100%; padding: 15px; background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.1); border-radius: 8px; color: white; }
                @media (max-width: 992px) { .contact-grid { grid-template-columns: 1fr; gap: 50px; } }
            `}</style>
        </div>
    );
};

export default Contact;
