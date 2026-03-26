import { useEffect, useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Mail, Lock, User, Sparkles, LogOut } from 'lucide-react';
import BRAND from '../../config/brand';
import AdminDashboard from './Dashboard';

const AUTH_KEY = 'admin_auth_v1';

const AdminAuth = () => {
  const [authorized, setAuthorized] = useState(false);
  const [mode, setMode] = useState('login'); // 'login' | 'register'

  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
  });

  useEffect(() => {
    setAuthorized(Boolean(localStorage.getItem(AUTH_KEY)));
  }, []);

  const isRegister = mode === 'register';
  const canSubmit = useMemo(() => {
    if (!form.email.trim()) return false;
    if (!form.password.trim()) return false;
    if (isRegister && !form.name.trim()) return false;
    return true;
  }, [form, isRegister]);

  const handleLogout = () => {
    localStorage.removeItem(AUTH_KEY);
    setAuthorized(false);
    setMode('login');
  };

  const handleAuthSubmit = (e) => {
    e.preventDefault();
    if (!canSubmit) return;

    // Mock auth: store a flag locally (no backend implemented yet).
    localStorage.setItem(
      AUTH_KEY,
      JSON.stringify({
        email: form.email.trim(),
        name: form.name.trim(),
        at: Date.now(),
      })
    );
    setAuthorized(true);
  };

  if (authorized) {
    return (
      <AdminDashboard onLogout={handleLogout} />
    );
  }

  return (
    <div className="admin-auth-page paper-overlay">
      <div className="auth-halftone" />
      <div className="container auth-container">
        <motion.div
          className="auth-header"
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="auth-logo heading-font">
            {BRAND.logoMain}
            <span>{BRAND.logoAccent}</span>
          </div>
          <h1 className="auth-title">
            ADMIN <span>PANEL</span>
          </h1>
          <p className="auth-subtitle">Sign in to manage your menu. Registration is optional.</p>
        </motion.div>

        <div className="auth-card glass">
          <div className="auth-tabs accent-font">
            <button
              type="button"
              className={mode === 'login' ? 'tab active' : 'tab'}
              onClick={() => setMode('login')}
            >
              LOGIN
            </button>
            <button
              type="button"
              className={mode === 'register' ? 'tab active' : 'tab'}
              onClick={() => setMode('register')}
            >
              REGISTER
            </button>
          </div>

          <AnimatePresence mode="wait">
            <motion.form
              key={mode}
              onSubmit={handleAuthSubmit}
              className="auth-form"
              initial={{ opacity: 0, x: isRegister ? 18 : -18, y: 6 }}
              animate={{ opacity: 1, x: 0, y: 0 }}
              exit={{ opacity: 0, x: isRegister ? -18 : 18, y: 6 }}
              transition={{ duration: 0.35 }}
            >
              <div className="auth-badge">
                <Sparkles size={18} /> Secure Access
              </div>

              {isRegister && (
                <label className="field">
                  <div className="field-label">MANAGER NAME</div>
                  <div className="field-input-wrap">
                    <User className="field-icon" size={18} />
                    <input
                      type="text"
                      value={form.name}
                      onChange={(e) => setForm((s) => ({ ...s, name: e.target.value }))}
                      placeholder="e.g. Hamda"
                      required={isRegister}
                    />
                  </div>
                </label>
              )}

              <label className="field">
                <div className="field-label">EMAIL</div>
                <div className="field-input-wrap">
                  <Mail className="field-icon" size={18} />
                  <input
                    type="email"
                    value={form.email}
                    onChange={(e) => setForm((s) => ({ ...s, email: e.target.value }))}
                    placeholder="admin@yourstore.com"
                    required
                  />
                </div>
              </label>

              <label className="field">
                <div className="field-label">PASSWORD</div>
                <div className="field-input-wrap">
                  <Lock className="field-icon" size={18} />
                  <input
                    type="password"
                    value={form.password}
                    onChange={(e) => setForm((s) => ({ ...s, password: e.target.value }))}
                    placeholder="••••••••"
                    required
                  />
                </div>
              </label>

              <motion.button
                type="submit"
                className="auth-submit btn-skew"
                disabled={!canSubmit}
                whileHover={canSubmit ? { y: -2 } : undefined}
                whileTap={canSubmit ? { y: 0 } : undefined}
              >
                <span>{isRegister ? 'Create Account' : 'Sign In'}</span>
              </motion.button>

              <p className="auth-hint text-muted">
                Tip: This demo uses local storage (no backend auth yet).
              </p>
            </motion.form>
          </AnimatePresence>
        </div>

        <div className="auth-footer accent-font">
          <LogOut size={16} className="inline" />
          <span>Manage products, categories, and orders.</span>
        </div>
      </div>

      <style jsx>{`
        .admin-auth-page {
          padding-top: 100px;
          min-height: 100vh;
          background: var(--bg-cream);
          overflow: hidden;
          position: relative;
        }
        .auth-halftone {
          position: absolute;
          inset: 0;
          background-image: radial-gradient(circle, #000 10%, transparent 11%);
          background-size: 10px 10px;
          opacity: 0.06;
          pointer-events: none;
        }
        .auth-container {
          position: relative;
          z-index: 2;
          padding: 30px 0 80px;
        }
        .auth-header {
          text-align: center;
          margin-bottom: 26px;
        }
        .auth-logo {
          font-size: 2.6rem;
          margin-bottom: 10px;
          letter-spacing: -0.02em;
        }
        .auth-logo span {
          color: var(--primary);
        }
        .auth-title {
          font-family: 'Alfa Slab One', cursive;
          text-transform: uppercase;
          letter-spacing: -0.02em;
          font-size: 3.3rem;
          margin-top: 6px;
          -webkit-text-stroke: 3px #ffffff;
          text-shadow: 6px 6px 0 rgba(0, 0, 0, 0.18);
        }
        .auth-title span {
          color: var(--primary);
        }
        .auth-subtitle {
          margin-top: 12px;
          color: var(--text-grey);
          font-weight: 700;
        }

        .auth-card {
          max-width: 720px;
          margin: 0 auto;
          padding: 28px;
          border-radius: 24px;
          border: 2px solid rgba(0, 0, 0, 0.06);
          position: relative;
          overflow: hidden;
        }

        .auth-card::after {
          content: '';
          position: absolute;
          inset: -80px -120px auto auto;
          width: 260px;
          height: 260px;
          background: radial-gradient(circle, rgba(255, 78, 0, 0.35), transparent 60%);
          transform: rotate(25deg);
          pointer-events: none;
        }

        .auth-tabs {
          display: flex;
          gap: 14px;
          justify-content: center;
          margin-bottom: 18px;
          position: relative;
          z-index: 1;
        }
        .tab {
          background: transparent;
          border: 2px solid rgba(0, 0, 0, 0.08);
          color: #000;
          padding: 10px 18px;
          border-radius: 999px;
          font-weight: 900;
          letter-spacing: 1px;
          transition: var(--transition);
        }
        .tab.active {
          background: var(--primary);
          border-color: var(--primary);
          color: #fff;
        }

        .auth-form {
          position: relative;
          z-index: 1;
          display: flex;
          flex-direction: column;
          gap: 14px;
        }
        .auth-badge {
          width: fit-content;
          align-self: center;
          display: flex;
          align-items: center;
          gap: 10px;
          background: rgba(255, 255, 255, 0.9);
          border: 1px solid rgba(0, 0, 0, 0.08);
          border-radius: 999px;
          padding: 10px 14px;
          font-weight: 900;
        }

        .field {
          display: block;
        }
        .field-label {
          font-size: 0.85rem;
          letter-spacing: 2px;
          font-weight: 900;
          margin-bottom: 10px;
          color: #111;
        }
        .field-input-wrap {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 12px 14px;
          border-radius: 16px;
          border: 2px solid rgba(0, 0, 0, 0.12);
          background: rgba(255, 255, 255, 0.92);
          transition: var(--transition);
        }
        .field-input-wrap:focus-within {
          border-color: rgba(255, 78, 0, 0.85);
          box-shadow: 0 0 0 4px rgba(255, 78, 0, 0.15);
        }
        .field-icon {
          color: var(--primary);
          flex: 0 0 auto;
        }
        .field-input-wrap input {
          width: 100%;
          border: none;
          outline: none;
          background: transparent;
          font-size: 1rem;
          font-weight: 800;
        }

        .auth-submit {
          align-self: center;
          margin-top: 12px;
          width: min(360px, 100%);
          opacity: 1;
        }
        .auth-submit:disabled {
          opacity: 0.55;
          cursor: not-allowed;
          transform: none !important;
          background: var(--primary) !important;
        }

        .auth-hint {
          text-align: center;
          margin-top: 6px;
          font-weight: 700;
        }

        .auth-footer {
          margin-top: 22px;
          display: flex;
          justify-content: center;
          gap: 10px;
          align-items: center;
          color: var(--text-grey);
          font-weight: 900;
        }

        @media (max-width: 768px) {
          .admin-auth-page {
            padding-top: 85px;
          }
          .auth-card {
            padding: 22px;
            border-radius: 18px;
          }
          .auth-container {
            padding: 18px 0 60px;
          }
          .auth-tabs {
            flex-wrap: wrap;
            gap: 10px;
          }
          .tab {
            padding: 10px 14px;
          }
          .auth-title {
            font-size: 2.6rem;
          }
        }

        @media (max-width: 480px) {
          .auth-logo {
            font-size: 2.1rem;
          }
          .auth-title {
            font-size: 2.2rem;
          }
          .auth-submit {
            width: 100%;
          }
        }
      `}</style>
    </div>
  );
};

export default AdminAuth;

