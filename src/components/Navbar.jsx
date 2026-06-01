import { NavLink, Link, useNavigate } from 'react-router-dom';

function Navbar() {
  const navigate = useNavigate();

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
          <li><NavLink to="/about" className={({ isActive }) => (isActive ? 'active' : '')}>About Us</NavLink></li>
        </ul>
        <button className="btn-primary login-btn" onClick={() => navigate('/login')}>Login</button>
        <div className="menu-toggle">
          <i className="ri-menu-line"></i>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
