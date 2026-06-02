import React, { useContext } from 'react';
import { NavLink, Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

function Navbar() {
  const navigate = useNavigate();
  const { user, logout } = useContext(AuthContext);

  return (
    <nav className="navbar">
      <div className="nav-container">
        <Link to="/" className="brand">
          <i className="ri-recycle-fill"></i> EcoVault
        </Link>
        <ul className="nav-links">
          <li><NavLink to="/" className={({ isActive }) => (isActive ? 'active' : '')}>Home</NavLink></li>
          <li><NavLink to="/guide" className={({ isActive }) => (isActive ? 'active' : '')}>Disposal Guide</NavLink></li>
          <li><NavLink to="/commerce" className={({ isActive }) => (isActive ? 'active' : '')}>E-Waste Commerce</NavLink></li>
          {user && <li><NavLink to="/dashboard" className={({ isActive }) => (isActive ? 'active' : '')}>Dashboard</NavLink></li>}
          <li><NavLink to="/about" className={({ isActive }) => (isActive ? 'active' : '')}>About Us</NavLink></li>
        </ul>
        
        {user ? (
          <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
            <span style={{ fontSize: '0.95rem', color: 'var(--text-muted)', fontWeight: 600 }}>Hi, {user.name}</span>
            <button className="btn-secondary" style={{ padding: '0.5rem 1.25rem', borderRadius: '50px' }} onClick={logout}>Logout</button>
          </div>
        ) : (
          <div style={{ display: 'flex', gap: '0.75rem' }}>
            <button className="btn-secondary" style={{ padding: '0.5rem 1.25rem', borderRadius: '50px' }} onClick={() => navigate('/login')}>Login</button>
            <button className="btn-primary" style={{ padding: '0.5rem 1.25rem', borderRadius: '50px' }} onClick={() => navigate('/register')}>Register</button>
          </div>
        )}
        
        <div className="menu-toggle">
          <i className="ri-menu-line"></i>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
