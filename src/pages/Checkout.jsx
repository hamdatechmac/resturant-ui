import { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { CreditCard, Truck, CheckCircle, ShieldCheck, Mail, Phone, MapPin, User } from 'lucide-react';
import { Link } from 'react-router-dom';

const Checkout = () => {
    const [step, setStep] = useState(1);
    const [paymentMethod, setPaymentMethod] = useState('cod'); // 'cod' | 'card'
    const [form, setForm] = useState({
        fullName: '',
        address: '',
        phone: '',
        email: '',
    });

    const cartItems = useMemo(
        () => [
            { id: 101, name: 'Royal Truffle Burger', price: 18.5, quantity: 1 },
            { id: 102, name: 'Extra Cheese', price: 1.5, quantity: 1, isAddon: true },
        ],
        []
    );

    const subtotal = useMemo(() => cartItems.reduce((acc, i) => acc + i.price * i.quantity, 0), [cartItems]);
    const delivery = 1.0;
    const total = subtotal + delivery;

    const handleSubmit = (e) => {
        e.preventDefault();
        setStep(2);
    };

    if (step === 2) return (
        <motion.div
            className="success-page py-section text-center paper-overlay checkout-page-bg"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
        >
            <div className="container mt-100">
                <CheckCircle size={120} className="text-orange mb-40" />
                <h1 className="heading-font text-5xl">ORDER CONFIRMED!</h1>
                <p className="text-large text-grey mt-30">Your feast is being prepared. Get ready for the flavor explosion.</p>
                <div className="mt-60">
                    <Link to="/" className="btn-skew btn-large">
                        <span>Return Home</span>
                    </Link>
                </div>
            </div>
        </motion.div>
    );

    return (
        <div className="checkout-page py-section paper-overlay checkout-page-bg">
            <div className="checkout-halftone" />
            <div className="container mt-50 checkout-container">
                <motion.h1
                    className="section-title mb-60"
                    initial={{ opacity: 0, y: 18 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.55 }}
                >
                    CHECK<span>OUT</span>
                </motion.h1>

                <div className="checkout-grid">
                    <motion.form
                        onSubmit={handleSubmit}
                        className="checkout-main glass"
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, amount: 0.25 }}
                        transition={{ duration: 0.5 }}
                    >
                        <div className="form-section">
                            <h2 className="heading-font form-title">
                                <Truck className="title-icon" /> DELIVERY DETAILS
                            </h2>

                            <div className="form-grid">
                                <label className="field">
                                    <div className="field-label">FULL NAME</div>
                                    <div className="input-wrap">
                                        <User className="input-icon" size={18} />
                                        <input
                                            value={form.fullName}
                                            onChange={(e) => setForm((s) => ({ ...s, fullName: e.target.value }))}
                                            placeholder="e.g. John Doe"
                                            required
                                        />
                                    </div>
                                </label>

                                <label className="field field-full">
                                    <div className="field-label">DELIVERY ADDRESS</div>
                                    <div className="input-wrap">
                                        <MapPin className="input-icon" size={18} />
                                        <textarea
                                            rows={3}
                                            value={form.address}
                                            onChange={(e) => setForm((s) => ({ ...s, address: e.target.value }))}
                                            placeholder="Street, City, Postcode"
                                            required
                                        />
                                    </div>
                                </label>

                                <div className="two-cols">
                                    <label className="field">
                                        <div className="field-label">PHONE NUMBER</div>
                                        <div className="input-wrap">
                                            <Phone className="input-icon" size={18} />
                                            <input
                                                value={form.phone}
                                                onChange={(e) => setForm((s) => ({ ...s, phone: e.target.value }))}
                                                placeholder="+44 ..."
                                                required
                                            />
                                        </div>
                                    </label>
                                    <label className="field">
                                        <div className="field-label">EMAIL</div>
                                        <div className="input-wrap">
                                            <Mail className="input-icon" size={18} />
                                            <input
                                                value={form.email}
                                                onChange={(e) => setForm((s) => ({ ...s, email: e.target.value }))}
                                                placeholder="john@example.com"
                                                required
                                            />
                                        </div>
                                    </label>
                                </div>
                            </div>
                        </div>

                        <div className="form-section">
                            <h2 className="heading-font form-title">
                                <CreditCard className="title-icon" /> PAYMENT METHOD
                            </h2>

                            <div className="pay-grid">
                                <button
                                    type="button"
                                    className={`pay-card ${paymentMethod === 'cod' ? 'active' : ''}`}
                                    onClick={() => setPaymentMethod('cod')}
                                >
                                    <span className="pay-label accent-font">CASH ON DELIVERY</span>
                                </button>
                                <button
                                    type="button"
                                    className={`pay-card ${paymentMethod === 'card' ? 'active' : ''}`}
                                    onClick={() => setPaymentMethod('card')}
                                >
                                    <span className="pay-label accent-font">CARD (COMING SOON)</span>
                                </button>
                            </div>
                        </div>

                        <div className="form-submit-wrap">
                            <button type="submit" className="btn-skew btn-wide submit-btn">
                                <span>PLACE ORDER NOW</span>
                            </button>
                            <div className="secure-row text-muted">
                                <ShieldCheck size={16} /> <span>Secure Checkout</span>
                            </div>
                        </div>
                    </motion.form>

                    <motion.aside
                        className="checkout-summary glass"
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, amount: 0.25 }}
                        transition={{ duration: 0.5 }}
                    >
                        <h3 className="heading-font summary-title">YOUR ORDER</h3>
                        <div className="order-items">
                            {cartItems.map((it) => (
                                <div key={it.id} className={`order-row ${it.isAddon ? 'addon' : ''}`}>
                                    <span>
                                        {it.quantity}x {it.name}
                                    </span>
                                    <span>${(it.price * it.quantity).toFixed(2)}</span>
                                </div>
                            ))}
                        </div>

                        <div className="summary-totals">
                            <div className="summary-row">
                                <span>Subtotal</span>
                                <span className="font-bold">${subtotal.toFixed(2)}</span>
                            </div>
                            <div className="summary-row">
                                <span>Delivery</span>
                                <span className="font-bold text-orange">${delivery.toFixed(2)}</span>
                            </div>
                            <div className="summary-divider" />
                            <div className="summary-total-row">
                                <span className="heading-font">TOTAL</span>
                                <span className="accent-font text-total text-orange">
                                    ${total.toFixed(2)}
                                </span>
                            </div>
                        </div>
                    </motion.aside>
                </div>
            </div>

            <style jsx>{`
                .checkout-page {
                  padding-top: 150px;
                  min-height: 100vh;
                  position: relative;
                }
                .checkout-page-bg {
                  background: var(--bg-cream);
                }
                .checkout-halftone {
                  position: absolute;
                  inset: 0;
                  background-image: radial-gradient(circle, #000 10%, transparent 11%);
                  background-size: 10px 10px;
                  opacity: 0.06;
                  pointer-events: none;
                }
                .checkout-container {
                  position: relative;
                  z-index: 2;
                }
                .checkout-grid {
                  display: grid;
                  grid-template-columns: 1fr 430px;
                  gap: 26px;
                  align-items: start;
                }
                .checkout-main {
                  border-radius: 22px;
                  padding: 26px;
                  border: 2px solid rgba(0, 0, 0, 0.08);
                }
                .checkout-summary {
                  border-radius: 22px;
                  padding: 26px;
                  border: 2px solid rgba(255, 78, 0, 0.55);
                }

                .form-title {
                  display: flex;
                  align-items: center;
                  gap: 12px;
                  margin-bottom: 18px;
                }
                .title-icon {
                  color: var(--primary);
                }

                .form-section + .form-section {
                  margin-top: 22px;
                }
                .form-grid {
                  display: flex;
                  flex-direction: column;
                  gap: 18px;
                }
                .two-cols {
                  display: grid;
                  grid-template-columns: repeat(2, minmax(0, 1fr));
                  gap: 16px;
                }

                .field {
                  display: block;
                }
                .field-full {
                  width: 100%;
                }
                .field-label {
                  font-weight: 900;
                  letter-spacing: 2px;
                  font-size: 0.85rem;
                  margin-bottom: 10px;
                  color: #111;
                }

                .input-wrap {
                  display: flex;
                  align-items: center;
                  gap: 12px;
                  padding: 12px 14px;
                  border-radius: 16px;
                  border: 2px solid rgba(0, 0, 0, 0.12);
                  background: rgba(255, 255, 255, 0.94);
                  transition: var(--transition);
                }
                .input-wrap:focus-within {
                  border-color: rgba(255, 78, 0, 0.85);
                  box-shadow: 0 0 0 4px rgba(255, 78, 0, 0.15);
                }
                .input-icon {
                  color: var(--primary);
                  flex: 0 0 auto;
                }
                .input-wrap input,
                .input-wrap textarea {
                  width: 100%;
                  border: none;
                  outline: none;
                  background: transparent;
                  font-weight: 900;
                  font-family: inherit;
                  resize: none;
                }

                .pay-grid {
                  display: grid;
                  grid-template-columns: repeat(2, minmax(0, 1fr));
                  gap: 14px;
                }
                .pay-card {
                  padding: 16px;
                  border-radius: 18px;
                  border: 2px solid rgba(0, 0, 0, 0.12);
                  background: rgba(255, 255, 255, 0.86);
                  cursor: pointer;
                  transition: var(--transition);
                  text-align: center;
                }
                .pay-card.active {
                  border-color: rgba(255, 78, 0, 0.85);
                  box-shadow: 0 0 0 4px rgba(255, 78, 0, 0.14);
                  background: var(--bg-cream);
                }
                .pay-label {
                  font-size: 0.98rem;
                }

                .form-submit-wrap {
                  margin-top: 22px;
                  display: flex;
                  flex-direction: column;
                  gap: 14px;
                  align-items: center;
                }
                .submit-btn {
                  width: min(420px, 100%);
                  display: inline-flex;
                  justify-content: center;
                }
                .secure-row {
                  display: flex;
                  align-items: center;
                  justify-content: center;
                  gap: 10px;
                  font-weight: 800;
                  opacity: 0.7;
                }

                .summary-title {
                  margin-bottom: 14px;
                  text-align: center;
                }
                .order-items {
                  border: 1px solid rgba(0, 0, 0, 0.06);
                  border-radius: 18px;
                  padding: 14px;
                  background: rgba(255, 255, 255, 0.75);
                }
                .order-row {
                  display: flex;
                  justify-content: space-between;
                  gap: 12px;
                  padding: 10px 6px;
                  font-weight: 900;
                  color: #111;
                }
                .order-row.addon {
                  color: var(--text-grey);
                  opacity: 0.95;
                }
                .summary-totals {
                  margin-top: 18px;
                }
                .summary-row {
                  display: flex;
                  justify-content: space-between;
                  gap: 12px;
                  padding: 8px 0;
                  font-weight: 900;
                  color: #111;
                }
                .summary-divider {
                  height: 1px;
                  background: rgba(0, 0, 0, 0.1);
                  margin: 14px 0;
                }
                .summary-total-row {
                  display: flex;
                  justify-content: space-between;
                  align-items: flex-end;
                  gap: 12px;
                }
                .text-total {
                  font-size: 2.4rem;
                  line-height: 1;
                }

                @media (max-width: 1100px) {
                  .checkout-grid {
                    grid-template-columns: 1fr;
                  }
                }

                @media (max-width: 768px) {
                  .checkout-page {
                    padding-top: 110px;
                  }
                  .checkout-grid {
                    gap: 18px;
                  }
                  .checkout-main {
                    padding: 18px;
                  }
                  .checkout-summary {
                    padding: 18px;
                  }
                  .two-cols {
                    grid-template-columns: 1fr;
                  }
                  .pay-grid {
                    grid-template-columns: 1fr;
                  }
                  .text-total {
                    font-size: 2rem;
                  }
                }

                @media (max-width: 480px) {
                  .form-title {
                    font-size: 1.4rem;
                  }
                  .title-icon {
                    margin-top: -2px;
                  }
                  .secure-row {
                    flex-wrap: wrap;
                    text-align: center;
                    padding: 0 10px;
                  }
                }
              `}
            </style>
            </div>
        );
};

export default Checkout;
