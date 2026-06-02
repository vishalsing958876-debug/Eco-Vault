import React, { useState, useEffect, useMemo, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

const categories = ['All', 'Phones', 'Laptops/PCs', 'Circuit Boards', 'Processors', 'Bulk Scrap'];
const conditions = ['All', 'Working', 'Refurbished', 'Scrap', 'For Parts', 'Completely Dead'];

function Commerce() {
  const { user } = useContext(AuthContext);
  const [products, setProducts] = useState([]);
  
  // Search & Filter State
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedCondition, setSelectedCondition] = useState('All');
  const [priceRange, setPriceRange] = useState(500);

  // Form State
  const [showForm, setShowForm] = useState(false);
  const [formTitle, setFormTitle] = useState('');
  const [formDescription, setFormDescription] = useState('');
  const [formPrice, setFormPrice] = useState('');
  const [formCondition, setFormCondition] = useState('Working');
  const [formCategory, setFormCategory] = useState('Phones');
  const [formImageUrl, setFormImageUrl] = useState('');
  const [formError, setFormError] = useState('');

  const fetchProducts = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/products');
      const data = await response.json();
      if (response.ok && data.status === 'success') {
        setProducts(data.data);
      }
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleMakeOffer = async (productId, currentPrice) => {
    if (!user) {
      alert('Please log in to make an offer.');
      return;
    }

    const offerAmountStr = prompt(`Enter your offer price (Current listed price: $${currentPrice}):`);
    if (!offerAmountStr) return;

    const offerPrice = Number(offerAmountStr);
    if (isNaN(offerPrice) || offerPrice <= 0) {
      alert('Please enter a valid positive number.');
      return;
    }

    const message = prompt('Enter a message to the seller (optional):') || '';

    try {
      const token = localStorage.getItem('token');
      const response = await fetch('http://localhost:5000/api/vault/offer', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          productId,
          offerPrice,
          message
        })
      });

      const data = await response.json();
      if (response.ok && data.status === 'success') {
        alert('Your offer was successfully submitted!');
      } else {
        alert(data.message || 'Failed to submit offer.');
      }
    } catch (error) {
      console.error('Error submitting offer:', error);
      alert('An error occurred. Please try again.');
    }
  };

  const handleCreateListingSubmit = async (e) => {
    e.preventDefault();
    setFormError('');

    try {
      const token = localStorage.getItem('token');
      const response = await fetch('http://localhost:5000/api/products', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          title: formTitle,
          description: formDescription,
          price: Number(formPrice),
          condition: formCondition,
          category: formCategory,
          imageUrl: formImageUrl
        })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Failed to create listing');
      }

      // Reset form states & refresh listings
      setFormTitle('');
      setFormDescription('');
      setFormPrice('');
      setFormCondition('Working');
      setFormCategory('Phones');
      setFormImageUrl('');
      setShowForm(false);
      fetchProducts();
    } catch (err) {
      setFormError(err.message || 'Error occurred while creating listing');
    }
  };

  const filteredProducts = useMemo(() => {
    return products.filter(product => {
      const matchesSearch = product.title.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesCategory = selectedCategory === 'All' || 
        (product.category && product.category.toLowerCase() === selectedCategory.toLowerCase());
        
      const matchesCondition = selectedCondition === 'All' || 
        (product.condition && product.condition.toLowerCase() === selectedCondition.toLowerCase());
        
      const matchesPrice = product.price <= priceRange;
      
      return matchesSearch && matchesCategory && matchesCondition && matchesPrice;
    });
  }, [products, searchQuery, selectedCategory, selectedCondition, priceRange]);

  return (
    <section className="section" style={{ paddingTop: '100px' }}>
      <div className="section-header">
        <h2>E-Waste Marketplace</h2>
        <p>Buy and sell scrap electronics. Turn clutter into cash or find parts for your next project.</p>
      </div>

      <div className="add-listing-banner" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', textAlign: 'left', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <h3>Have bulk e-waste or old gadgets?</h3>
          <p style={{ margin: '0.5rem 0 0', color: 'var(--text-muted)' }}>List your items and connect with certified recyclers and buyers instantly.</p>
        </div>
        {user ? (
          <button className="btn-primary" style={{ padding: '1rem 2rem', fontSize: '1.1rem' }} onClick={() => setShowForm(true)}>
            <i className="ri-add-line" style={{ marginRight: '0.5rem' }}></i> 
            Create a Listing
          </button>
        ) : (
          <p style={{ fontStyle: 'italic', color: 'var(--text-muted)', margin: 0 }}>Log in to create a listing.</p>
        )}
      </div>

      {showForm && (
        <div style={{
          position: 'fixed',
          top: 0, left: 0, right: 0, bottom: 0,
          backgroundColor: 'rgba(15, 23, 42, 0.6)',
          backdropFilter: 'blur(8px)',
          zIndex: 1100,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '2rem'
        }}>
          <div style={{
            background: 'var(--bg-card)',
            border: '1px solid var(--border)',
            borderRadius: '24px',
            width: '100%',
            maxWidth: '550px',
            padding: '2.5rem',
            boxShadow: 'var(--shadow-lg)',
            position: 'relative'
          }}>
            <button 
              onClick={() => setShowForm(false)} 
              style={{
                position: 'absolute',
                top: '20px', right: '20px',
                background: 'none', border: 'none',
                fontSize: '1.5rem', cursor: 'pointer',
                color: 'var(--text-muted)'
              }}
            >
              <i className="ri-close-line"></i>
            </button>
            
            <h3 style={{ fontSize: '1.75rem', marginBottom: '1.5rem', color: 'var(--text-main)' }}>Create Listing</h3>
            
            {formError && (
              <div style={{ marginBottom: '1.25rem', padding: '0.75rem 1rem', background: '#fee2e2', border: '1px solid #fca5a5', color: '#b91c1c', borderRadius: '8px', fontSize: '0.95rem' }}>
                {formError}
              </div>
            )}

            <form onSubmit={handleCreateListingSubmit}>
              <div style={{ marginBottom: '1.25rem' }}>
                <label style={{ display: 'block', marginBottom: '0.4rem', fontWeight: '600', fontSize: '0.9rem' }}>Title *</label>
                <input 
                  type="text" 
                  required
                  value={formTitle}
                  onChange={(e) => setFormTitle(e.target.value)}
                  placeholder="e.g. Vintage Mobile Phones Bulk"
                  style={{ width: '100%', padding: '0.75rem 1rem', borderRadius: '10px', border: '1px solid var(--border)', fontFamily: 'inherit', outline: 'none' }}
                />
              </div>
              
              <div style={{ marginBottom: '1.25rem' }}>
                <label style={{ display: 'block', marginBottom: '0.4rem', fontWeight: '600', fontSize: '0.9rem' }}>Description</label>
                <textarea 
                  value={formDescription}
                  onChange={(e) => setFormDescription(e.target.value)}
                  placeholder="Provide details about the e-waste item..."
                  style={{ width: '100%', padding: '0.75rem 1rem', borderRadius: '10px', border: '1px solid var(--border)', fontFamily: 'inherit', outline: 'none', minHeight: '80px', resize: 'vertical' }}
                />
              </div>
              
              <div style={{ display: 'flex', gap: '1rem', marginBottom: '1.25rem' }}>
                <div style={{ flex: 1 }}>
                  <label style={{ display: 'block', marginBottom: '0.4rem', fontWeight: '600', fontSize: '0.9rem' }}>Price ($) *</label>
                  <input 
                    type="number" 
                    required
                    min="0"
                    value={formPrice}
                    onChange={(e) => setFormPrice(e.target.value)}
                    placeholder="150"
                    style={{ width: '100%', padding: '0.75rem 1rem', borderRadius: '10px', border: '1px solid var(--border)', fontFamily: 'inherit', outline: 'none' }}
                  />
                </div>
                
                <div style={{ flex: 1 }}>
                  <label style={{ display: 'block', marginBottom: '0.4rem', fontWeight: '600', fontSize: '0.9rem' }}>Condition *</label>
                  <select 
                    value={formCondition} 
                    onChange={(e) => setFormCondition(e.target.value)}
                    style={{ width: '100%', padding: '0.75rem 1rem', borderRadius: '10px', border: '1px solid var(--border)', fontFamily: 'inherit', outline: 'none', background: 'var(--bg-card)' }}
                  >
                    <option value="Working">Working</option>
                    <option value="Refurbished">Refurbished</option>
                    <option value="Scrap">Scrap</option>
                  </select>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '1rem', marginBottom: '1.5rem' }}>
                <div style={{ flex: 1 }}>
                  <label style={{ display: 'block', marginBottom: '0.4rem', fontWeight: '600', fontSize: '0.9rem' }}>Category *</label>
                  <select 
                    value={formCategory} 
                    onChange={(e) => setFormCategory(e.target.value)}
                    style={{ width: '100%', padding: '0.75rem 1rem', borderRadius: '10px', border: '1px solid var(--border)', fontFamily: 'inherit', outline: 'none', background: 'var(--bg-card)' }}
                  >
                    <option value="Phones">Phones</option>
                    <option value="Laptops/PCs">Laptops/PCs</option>
                    <option value="Circuit Boards">Circuit Boards</option>
                    <option value="Processors">Processors</option>
                    <option value="Bulk Scrap">Bulk Scrap</option>
                  </select>
                </div>
                
                <div style={{ flex: 1 }}>
                  <label style={{ display: 'block', marginBottom: '0.4rem', fontWeight: '600', fontSize: '0.9rem' }}>Image URL</label>
                  <input 
                    type="text" 
                    value={formImageUrl}
                    onChange={(e) => setFormImageUrl(e.target.value)}
                    placeholder="https://example.com/image.jpg"
                    style={{ width: '100%', padding: '0.75rem 1rem', borderRadius: '10px', border: '1px solid var(--border)', fontFamily: 'inherit', outline: 'none' }}
                  />
                </div>
              </div>

              <div style={{ display: 'flex', gap: '1rem', justifyContent: 'flex-end' }}>
                <button type="button" className="btn-secondary" onClick={() => setShowForm(false)} style={{ padding: '0.6rem 1.5rem', borderRadius: '8px' }}>Cancel</button>
                <button type="submit" className="btn-primary" style={{ padding: '0.6rem 1.5rem', borderRadius: '8px' }}>Submit</button>
              </div>
            </form>
          </div>
        </div>
      )}

      <div className="commerce-container">
        {/* Filters Sidebar */}
        <div className="commerce-sidebar">
          
          <div className="filter-group">
            <h4>Search</h4>
            <div style={{ position: 'relative', marginTop: '0.5rem' }}>
              <input 
                type="text" 
                placeholder="Search items..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                style={{
                  width: '100%',
                  padding: '0.75rem 1rem 0.75rem 2.5rem',
                  borderRadius: '12px',
                  border: '1px solid var(--border)',
                  outline: 'none',
                  fontFamily: 'inherit'
                }}
              />
              <i className="ri-search-line" style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }}></i>
            </div>
          </div>

          <div className="filter-group">
            <h4>Category</h4>
            {categories.map(cat => (
              <label key={cat} className="filter-label">
                <input 
                  type="radio" 
                  name="category"
                  checked={selectedCategory === cat}
                  onChange={() => setSelectedCategory(cat)}
                /> 
                {cat}
              </label>
            ))}
          </div>

          <div className="filter-group">
            <h4>Condition</h4>
            {conditions.map(cond => (
              <label key={cond} className="filter-label">
                <input 
                  type="radio" 
                  name="condition"
                  checked={selectedCondition === cond}
                  onChange={() => setSelectedCondition(cond)}
                /> 
                {cond}
              </label>
            ))}
          </div>

          <div className="filter-group">
            <h4>Max Price: ${priceRange}</h4>
            <input 
              type="range" 
              min="10" 
              max="1000" 
              value={priceRange} 
              onChange={(e) => setPriceRange(Number(e.target.value))}
              style={{ width: '100%', accentColor: 'var(--primary)' }}
            />
          </div>
        </div>

        {/* Product Grid */}
        <div>
          <div style={{ marginBottom: '1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <h3 style={{ fontSize: '1.25rem', color: 'var(--text-main)' }}>
              Showing {filteredProducts.length} Results
            </h3>
            <select style={{ padding: '0.5rem', borderRadius: '8px', border: '1px solid var(--border)', fontFamily: 'inherit', color: 'var(--text-muted)' }}>
              <option>Sort by: Newest</option>
              <option>Sort by: Price (Low to High)</option>
              <option>Sort by: Price (High to Low)</option>
            </select>
          </div>

          {filteredProducts.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '4rem 2rem', background: 'var(--bg-card)', borderRadius: '20px', border: '1px dashed var(--border)' }}>
              <i className="ri-search-eye-line" style={{ fontSize: '3rem', color: 'var(--text-muted)', marginBottom: '1rem', display: 'block' }}></i>
              <h3 style={{ marginBottom: '0.5rem' }}>No items found</h3>
              <p style={{ color: 'var(--text-muted)' }}>Try adjusting your filters or search query.</p>
              <button 
                className="btn-secondary" 
                style={{ marginTop: '1.5rem' }}
                onClick={() => {
                  setSearchQuery('');
                  setSelectedCategory('All');
                  setSelectedCondition('All');
                  setPriceRange(500);
                }}
              >
                Clear All Filters
              </button>
            </div>
          ) : (
            <div className="market-grid">
              {filteredProducts.map(product => (
                <div key={product._id || product.id} className="item-card">
                  <div className="item-img" style={{ backgroundImage: `linear-gradient(rgba(0,0,0,0.1), rgba(0,0,0,0.5)), url('${product.imageUrl || product.image || 'https://images.unsplash.com/photo-1518770660439-4636190af475?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80'}')` }}>
                    <span className="item-condition">{product.condition}</span>
                  </div>
                  <div className="item-details">
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.5rem' }}>
                      <h3 className="item-title" style={{ margin: 0, fontSize: '1.1rem' }}>{product.title}</h3>
                    </div>
                    <div className="item-price">
                      ${product.price}{product.unit || ''}
                    </div>
                    <div className="item-meta">
                      <span><i className="ri-map-pin-line"></i> {product.location || 'N/A'}</span>
                      <span><i className="ri-scales-3-line"></i> {product.weight || 'N/A'}</span>
                    </div>
                    <div style={{ display: 'flex', gap: '0.5rem', marginTop: 'auto' }}>
                      <button className="btn-primary" style={{ flex: 1, padding: '0.6rem', fontSize: '0.9rem' }}>
                        <i className="ri-shopping-cart-2-line"></i> Add
                      </button>
                      <button 
                        className="btn-secondary" 
                        style={{ flex: 1, padding: '0.6rem', fontSize: '0.9rem' }}
                        onClick={() => handleMakeOffer(product._id || product.id, product.price)}
                      >
                        Make Offer
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

export default Commerce;
