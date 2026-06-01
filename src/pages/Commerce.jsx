import React, { useState, useMemo } from 'react';

const mockProducts = [
  {
    id: 1,
    title: 'Bulk RAM Sticks & PCBs (10kg)',
    price: 120,
    condition: 'For Parts',
    category: 'Circuit Boards',
    location: 'New York',
    weight: '10 kg',
    image: 'https://images.unsplash.com/photo-1588508065123-287b28e0141c?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
  },
  {
    id: 2,
    title: 'Ceramic Processors (Gold Recovery)',
    price: 350,
    condition: 'Scrap',
    category: 'Processors',
    location: 'Texas',
    weight: '1.2 kg',
    image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
  },
  {
    id: 3,
    title: 'Mixed Circuit Boards (Grade B)',
    price: 45,
    unit: '/ kg',
    condition: 'Scrap',
    category: 'Circuit Boards',
    location: 'California',
    weight: '5 kg',
    image: 'https://images.unsplash.com/photo-1563207153-f403bf289096?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
  },
  {
    id: 4,
    title: 'Server CPU Chips',
    price: 200,
    condition: 'Working',
    category: 'Processors',
    location: 'Seattle',
    weight: '2 kg',
    image: 'https://images.unsplash.com/photo-1612815154858-60aa4c59eaa6?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
  },
  {
    id: 5,
    title: 'Vintage Mobile Phones Bulk',
    price: 80,
    condition: 'Completely Dead',
    category: 'Phones',
    location: 'Chicago',
    weight: '15 kg',
    image: 'https://images.unsplash.com/photo-1580910051074-3eb694886505?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
  },
  {
    id: 6,
    title: 'Defective Laptops Lot',
    price: 250,
    condition: 'For Parts',
    category: 'Laptops/PCs',
    location: 'Miami',
    weight: '20 kg',
    image: 'https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
  }
];

const categories = ['All', 'Phones', 'Laptops/PCs', 'Circuit Boards', 'Processors', 'Bulk Scrap'];
const conditions = ['All', 'Working', 'For Parts', 'Completely Dead', 'Scrap'];

function Commerce() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedCondition, setSelectedCondition] = useState('All');
  const [priceRange, setPriceRange] = useState(500);

  const filteredProducts = useMemo(() => {
    return mockProducts.filter(product => {
      const matchesSearch = product.title.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = selectedCategory === 'All' || product.category === selectedCategory;
      const matchesCondition = selectedCondition === 'All' || product.condition === selectedCondition;
      const matchesPrice = product.price <= priceRange;
      
      return matchesSearch && matchesCategory && matchesCondition && matchesPrice;
    });
  }, [searchQuery, selectedCategory, selectedCondition, priceRange]);

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
        <button className="btn-primary" style={{ padding: '1rem 2rem', fontSize: '1.1rem' }}>
          <i className="ri-add-line" style={{ marginRight: '0.5rem' }}></i> 
          Create a Listing
        </button>
      </div>

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
                <div key={product.id} className="item-card">
                  <div className="item-img" style={{ backgroundImage: `linear-gradient(rgba(0,0,0,0.1), rgba(0,0,0,0.5)), url('${product.image}')` }}>
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
                      <span><i className="ri-map-pin-line"></i> {product.location}</span>
                      <span><i className="ri-scales-3-line"></i> {product.weight}</span>
                    </div>
                    <div style={{ display: 'flex', gap: '0.5rem', marginTop: 'auto' }}>
                      <button className="btn-primary" style={{ flex: 1, padding: '0.6rem', fontSize: '0.9rem' }}>
                        <i className="ri-shopping-cart-2-line"></i> Add
                      </button>
                      <button className="btn-secondary" style={{ flex: 1, padding: '0.6rem', fontSize: '0.9rem' }}>
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
