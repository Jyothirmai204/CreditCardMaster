import React, { useState, useEffect } from 'react';
import ProductService from '../services/ProductService';

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await ProductService.getAllProducts();
        setProducts(res.data || []);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  if (loading) return <div className="loading-state">Loading product configurations...</div>;

  return (
    <div>
      <div style={{ marginBottom: '1.5rem' }}>
        <h2 style={{ fontSize: '1.5rem', fontWeight: 600 }}>Card Products</h2>
        <p style={{ color: 'var(--text-muted)', marginTop: '0.25rem' }}>Manage system card product configurations</p>
      </div>

      <div className="dashboard-grid">
        {products.length === 0 ? (
          <div className="stat-card" style={{ gridColumn: '1 / -1', justifyContent: 'center' }}>
            <p style={{ color: 'var(--text-muted)' }}>No products configured. Setup required in backend database.</p>
          </div>
        ) : (
          products.map(product => (
            <div key={product.id} className="stat-card" style={{ flexDirection: 'column', alignItems: 'flex-start', gap: '1rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%', alignItems: 'center' }}>
                <span className={`status-badge ${product.isActive ? 'status-active' : 'status-inactive'}`}>
                  {product.isActive ? 'ACTIVE' : 'INACTIVE'}
                </span>
                <span style={{ fontWeight: 600, color: 'var(--primary)' }}>{product.networkType}</span>
              </div>
              <div>
                <h3 style={{ fontSize: '1.125rem', fontWeight: 600, color: 'var(--text-main)', marginBottom: '0.25rem' }}>
                  {product.productName}
                </h3>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem' }}>{product.description || 'Standard Credit Card'}</p>
              </div>
              <div style={{ marginTop: 'auto', paddingTop: '1rem', borderTop: '1px solid var(--border-color)', width: '100%', display: 'flex', justifyContent: 'space-between', fontSize: '0.875rem' }}>
                <span style={{ color: 'var(--text-muted)' }}>BIN: </span>
                <span style={{ fontWeight: 500 }}>{product.binPrefix}</span>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default ProductList;
