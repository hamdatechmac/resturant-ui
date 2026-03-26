import { useEffect, useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Edit, Search, Trash2, X } from 'lucide-react';
import BRAND from '../../config/brand';

const AdminDashboard = ({ onLogout }) => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [isAdding, setIsAdding] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const [newProduct, setNewProduct] = useState({
    name: '',
    price: '',
    category: 'burgers',
    description: '',
    image: '',
  });

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = () => {
    fetch('http://localhost:5000/api/products')
      .then((res) => res.json())
      .then((data) => {
        setProducts(data.products);
        setCategories(data.categories);
      });
  };

  const handleAdd = (e) => {
    e.preventDefault();
    fetch('http://localhost:5000/api/products', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...newProduct, price: parseFloat(newProduct.price) }),
    }).then(() => {
      setIsAdding(false);
      setNewProduct({ name: '', price: '', category: 'burgers', description: '', image: '' });
      fetchProducts();
    });
  };

  const filteredProducts = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    if (!q) return products;
    return products.filter((p) => {
      const name = String(p.name ?? '').toLowerCase();
      const desc = String(p.description ?? '').toLowerCase();
      const cat = String(p.category ?? '').toLowerCase();
      return name.includes(q) || desc.includes(q) || cat.includes(q);
    });
  }, [products, searchQuery]);

  return (
    <div className="admin-page paper-overlay">
      <div className="admin-halftone" />
      <div className="admin-shell container">
        <aside className="admin-sidebar glass">
          <div className="admin-brand heading-font">
            {BRAND.logoMain}
            <span>{BRAND.logoAccent}</span>
          </div>

          <nav className="admin-nav">
            <div className="nav-item active">PRODUCTS</div>
            <div className="nav-item">CATEGORIES</div>
            <div className="nav-item">ORDERS</div>
            <div className="nav-item">SETTINGS</div>
          </nav>

          {onLogout && (
            <button className="logout-btn" type="button" onClick={onLogout}>
              Logout
            </button>
          )}
        </aside>

        <section className="admin-main">
          <motion.div
            className="admin-top"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="admin-title-block">
              <h1 className="section-title admin-section-title">
                MENU <span>MANAGEMENT</span>
              </h1>
              <p className="text-large text-grey">Directly control your digital store front.</p>
            </div>
            <button className="btn-skew admin-add-btn" type="button" onClick={() => setIsAdding(true)}>
              <span>Add New Product +</span>
            </button>
          </motion.div>

          <motion.div
            className="stats-grid"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.08 }}
          >
            <div className="stat-card glass">
              <div className="stat-kicker accent-font">TOTAL ITEMS</div>
              <div className="stat-value heading-font">{products.length}</div>
            </div>
            <div className="stat-card glass">
              <div className="stat-kicker accent-font">CATEGORIES</div>
              <div className="stat-value heading-font">{categories.length}</div>
            </div>
            <div className="stat-card glass">
              <div className="stat-kicker accent-font">LIVE ORDERS</div>
              <div className="stat-value heading-font">12</div>
            </div>
            <div className="stat-card glass">
              <div className="stat-kicker accent-font">TODAY'S SALES</div>
              <div className="stat-value heading-font">$450.00</div>
            </div>
          </motion.div>

          <div className="table-card glass">
            <div className="table-tools">
              <div className="table-search">
                <Search size={18} />
                <input
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search products..."
                  aria-label="Search products"
                />
              </div>
              <div className="table-count accent-font">{filteredProducts.length} ITEMS</div>
            </div>

            <div className="table-wrap">
              <table className="admin-table-v2">
                <thead>
                  <tr>
                    <th className="accent-font">IMAGE</th>
                    <th className="accent-font">PRODUCT NAME</th>
                    <th className="accent-font">CATEGORY</th>
                    <th className="accent-font">PRICE</th>
                    <th className="accent-font">STATUS</th>
                    <th className="accent-font">ACTIONS</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredProducts.map((p, idx) => (
                    <motion.tr
                      key={p.id}
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, amount: 0.3 }}
                      transition={{ duration: 0.25, delay: idx * 0.01 }}
                    >
                      <td>
                        <img src={p.image} className="row-image" alt={p.name} />
                      </td>
                      <td className="row-name">
                        <strong>{p.name}</strong>
                      </td>
                      <td>
                        <span className="cat-pill">{p.category}</span>
                      </td>
                      <td className="accent-font text-orange">${Number(p.price).toFixed(2)}</td>
                      <td>
                        <span className="status-badge live">LIVE</span>
                      </td>
                      <td>
                        <div className="row-actions">
                          <button type="button" className="icon-btn" aria-label="Edit (demo)">
                            <Edit size={20} />
                          </button>
                          <button type="button" className="icon-btn danger" aria-label="Delete (demo)">
                            <Trash2 size={20} />
                          </button>
                        </div>
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <AnimatePresence>
            {isAdding && (
              <motion.div
                className="modal-overlay"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <motion.div
                  className="modal-card glass"
                  initial={{ scale: 0.96, y: 10, opacity: 0 }}
                  animate={{ scale: 1, y: 0, opacity: 1 }}
                  exit={{ scale: 0.96, y: 10, opacity: 0 }}
                  transition={{ duration: 0.25 }}
                >
                  <button className="modal-close" type="button" onClick={() => setIsAdding(false)} aria-label="Close">
                    <X size={28} />
                  </button>
                  <h2 className="heading-font modal-title">
                    ADD NEW <span>TREAT</span>
                  </h2>

                  <form onSubmit={handleAdd} className="modal-form">
                    <div className="modal-grid">
                      <label className="field">
                        <div className="field-label">Product Name</div>
                        <input
                          type="text"
                          value={newProduct.name}
                          onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
                          required
                        />
                      </label>

                      <label className="field">
                        <div className="field-label">Price ($)</div>
                        <input
                          type="number"
                          step="0.01"
                          value={newProduct.price}
                          onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
                          required
                        />
                      </label>

                      <label className="field">
                        <div className="field-label">Category</div>
                        <select
                          value={newProduct.category}
                          onChange={(e) => setNewProduct({ ...newProduct, category: e.target.value })}
                        >
                          {categories.map((c) => (
                            <option key={c.id} value={c.slug}>
                              {c.name}
                            </option>
                          ))}
                        </select>
                      </label>

                      <label className="field field-full">
                        <div className="field-label">Image URL</div>
                        <input
                          type="text"
                          value={newProduct.image}
                          onChange={(e) => setNewProduct({ ...newProduct, image: e.target.value })}
                          required
                        />
                      </label>

                      <label className="field field-full">
                        <div className="field-label">Description</div>
                        <textarea
                          rows={3}
                          value={newProduct.description}
                          onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })}
                          required
                        />
                      </label>
                    </div>

                    <button type="submit" className="btn-skew btn-wide modal-submit">
                      <span>Save To Menu</span>
                    </button>
                  </form>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </section>
      </div>

      <style jsx>{`
        .admin-page {
          min-height: 100vh;
          background: var(--bg-cream);
          position: relative;
          padding: 70px 0 80px;
        }
        .admin-halftone {
          position: absolute;
          inset: 0;
          background-image: radial-gradient(circle, #000 10%, transparent 11%);
          background-size: 10px 10px;
          opacity: 0.06;
          pointer-events: none;
        }
        .admin-shell {
          position: relative;
          z-index: 2;
          display: grid;
          grid-template-columns: 280px 1fr;
          gap: 26px;
          align-items: start;
        }
        .admin-sidebar {
          border-radius: 22px;
          padding: 18px;
          position: sticky;
          top: 110px;
        }
        .admin-brand {
          font-size: 2rem;
          margin-bottom: 14px;
        }
        .admin-brand span {
          color: var(--primary);
        }
        .admin-nav {
          display: flex;
          flex-direction: column;
          gap: 10px;
          margin-top: 18px;
        }
        .nav-item {
          padding: 12px 14px;
          border-radius: 14px;
          background: rgba(0, 0, 0, 0.03);
          border: 1px solid rgba(0, 0, 0, 0.05);
          font-weight: 900;
          letter-spacing: 1px;
          cursor: default;
          transition: var(--transition);
        }
        .nav-item.active {
          background: rgba(255, 78, 0, 0.12);
          border-color: rgba(255, 78, 0, 0.6);
          color: var(--primary);
        }
        .logout-btn {
          width: 100%;
          margin-top: 18px;
          padding: 12px 14px;
          border-radius: 14px;
          border: 2px solid rgba(0, 0, 0, 0.1);
          background: #fff;
          font-weight: 900;
          cursor: pointer;
          transition: var(--transition);
        }
        .logout-btn:hover {
          transform: translateY(-2px);
          border-color: rgba(255, 78, 0, 0.75);
          box-shadow: 0 0 0 4px rgba(255, 78, 0, 0.14);
        }
        .admin-main {
          display: flex;
          flex-direction: column;
          gap: 22px;
        }
        .admin-top {
          display: flex;
          justify-content: space-between;
          align-items: flex-end;
          gap: 20px;
          flex-wrap: wrap;
        }
        .admin-section-title {
          font-size: 3.2rem;
        }
        .admin-add-btn {
          transform: skewX(-10deg);
        }
        .stats-grid {
          display: grid;
          grid-template-columns: repeat(4, minmax(0, 1fr));
          gap: 16px;
        }
        .stat-card {
          border-radius: 18px;
          padding: 18px;
          border: 1px solid rgba(0, 0, 0, 0.06);
          position: relative;
          overflow: hidden;
        }
        .stat-card::after {
          content: '';
          position: absolute;
          inset: auto -60px -70px auto;
          width: 180px;
          height: 180px;
          background: radial-gradient(circle, rgba(255, 78, 0, 0.35), transparent 60%);
          opacity: 0.7;
          pointer-events: none;
        }
        .stat-kicker {
          position: relative;
          z-index: 1;
          color: var(--text-grey);
          font-size: 0.85rem;
          margin-bottom: 8px;
        }
        .stat-value {
          position: relative;
          z-index: 1;
          font-size: 2.3rem;
        }
        .table-card {
          border-radius: 22px;
          padding: 16px;
          border: 1px solid rgba(0, 0, 0, 0.06);
        }
        .table-tools {
          display: flex;
          justify-content: space-between;
          gap: 16px;
          align-items: center;
          flex-wrap: wrap;
          margin-bottom: 12px;
        }
        .table-search {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 12px 14px;
          border-radius: 16px;
          border: 2px solid rgba(0, 0, 0, 0.12);
          background: rgba(255, 255, 255, 0.92);
        }
        .table-search input {
          border: none;
          outline: none;
          background: transparent;
          font-weight: 900;
          width: 280px;
          max-width: 70vw;
          font-family: inherit;
        }
        .table-count {
          color: var(--text-grey);
          font-weight: 900;
        }
        .table-wrap {
          overflow: auto;
          border-radius: 16px;
          border: 1px solid rgba(0, 0, 0, 0.06);
          background: #fff;
        }
        .admin-table-v2 {
          width: 100%;
          border-collapse: collapse;
          min-width: 860px;
        }
        .admin-table-v2 th {
          padding: 16px 18px;
          text-align: left;
          border-bottom: 2px solid rgba(0, 0, 0, 0.9);
          font-size: 0.9rem;
          letter-spacing: 2px;
          background: var(--bg-cream);
        }
        .admin-table-v2 td {
          padding: 16px 18px;
          border-bottom: 1px solid rgba(0, 0, 0, 0.06);
          vertical-align: middle;
        }
        .row-image {
          width: 86px;
          height: 62px;
          border-radius: 12px;
          border: 1px solid rgba(0, 0, 0, 0.08);
          object-fit: cover;
        }
        .row-name strong {
          font-size: 1.06rem;
        }
        .cat-pill {
          background: var(--bg-cream);
          color: #000;
          padding: 7px 14px;
          border-radius: 999px;
          font-weight: 900;
          text-transform: uppercase;
          font-size: 0.78rem;
          border: 1px solid rgba(0, 0, 0, 0.08);
        }
        .accent-font.text-orange {
          color: var(--primary);
        }
        .status-badge {
          font-weight: 900;
          font-size: 0.78rem;
          padding: 6px 10px;
          border-radius: 10px;
          display: inline-block;
        }
        .status-badge.live {
          background: #e6fffa;
          color: #2d6a4f;
          border: 1px solid #2d6a4f;
        }
        .row-actions {
          display: flex;
          gap: 12px;
        }
        .icon-btn {
          background: rgba(0, 0, 0, 0.04);
          border: 1px solid rgba(0, 0, 0, 0.06);
          border-radius: 12px;
          padding: 10px;
          cursor: pointer;
          transition: var(--transition);
        }
        .icon-btn:hover {
          transform: translateY(-2px);
          border-color: rgba(255, 78, 0, 0.65);
          color: var(--primary);
        }
        .icon-btn.danger:hover {
          border-color: rgba(255, 0, 0, 0.4);
          color: #ff3b3b;
        }
        .modal-overlay {
          position: fixed;
          inset: 0;
          background: rgba(0, 0, 0, 0.88);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 1000;
          padding: 26px;
        }
        .modal-card {
          width: min(860px, 100%);
          border-radius: 22px;
          padding: 22px;
          border: 2px solid rgba(255, 78, 0, 0.6);
          position: relative;
        }
        .modal-close {
          position: absolute;
          right: 14px;
          top: 14px;
          background: rgba(255, 255, 255, 0.6);
          border: 1px solid rgba(0, 0, 0, 0.1);
          border-radius: 14px;
          padding: 8px;
          cursor: pointer;
        }
        .modal-title {
          text-align: center;
          font-size: 2.6rem;
          margin: 10px 0 14px;
        }
        .modal-title span {
          color: var(--primary);
        }
        .modal-form {
          display: flex;
          flex-direction: column;
          gap: 14px;
        }
        .modal-grid {
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          gap: 14px;
        }
        .field {
          display: flex;
          flex-direction: column;
          gap: 10px;
        }
        .field-full {
          grid-column: 1 / -1;
        }
        .field-label {
          font-weight: 900;
          letter-spacing: 1px;
          font-size: 0.85rem;
          color: #111;
        }
        .modal-card input,
        .modal-card select,
        .modal-card textarea {
          width: 100%;
          border-radius: 16px;
          border: 2px solid rgba(0, 0, 0, 0.14);
          background: rgba(255, 255, 255, 0.94);
          padding: 12px 14px;
          outline: none;
          font-weight: 900;
          font-family: inherit;
          transition: var(--transition);
        }
        .modal-card input:focus,
        .modal-card select:focus,
        .modal-card textarea:focus {
          border-color: rgba(255, 78, 0, 0.85);
          box-shadow: 0 0 0 4px rgba(255, 78, 0, 0.14);
        }
        .modal-submit {
          width: 100%;
          margin-top: 8px;
          justify-content: center;
        }
        @media (max-width: 980px) {
          .admin-shell {
            grid-template-columns: 1fr;
          }
          .admin-sidebar {
            position: relative;
            top: 0;
          }
          .stats-grid {
            grid-template-columns: repeat(2, minmax(0, 1fr));
          }
        }

        @media (max-width: 640px) {
          .stats-grid {
            grid-template-columns: 1fr;
          }
          .table-tools {
            flex-direction: column;
            align-items: flex-start;
          }
          .table-search input {
            width: 100%;
            max-width: 100%;
          }
          .admin-top {
            align-items: flex-start;
          }
          .admin-section-title {
            font-size: 2.3rem;
          }
        }

        @media (max-width: 480px) {
          .admin-add-btn {
            width: 100%;
            justify-content: center;
          }
        }
      `}</style>
    </div>
  );
};

export default AdminDashboard;
