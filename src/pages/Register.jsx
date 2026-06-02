import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loadingForm, setLoadingForm] = useState(false);
  const { register } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoadingForm(true);
    try {
      await register(name, email, password);
      navigate('/dashboard');
    } catch (err) {
      setError(err.message || 'Failed to create account. Please try again.');
    } finally {
      setLoadingForm(false);
    }
  };

  return (
    <section style={{ display: 'flex', minHeight: 'calc(100vh - 80px)', background: 'var(--bg-card)' }}>
      {/* Left side - Image & Branding */}
      <div style={{ 
        flex: 1, 
        background: `linear-gradient(135deg, rgba(5, 150, 105, 0.8), rgba(2, 132, 199, 0.8)), url('https://images.unsplash.com/photo-1518770660439-4636190af475?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        padding: '4rem',
        color: 'white',
        flexDirection: 'column',
        justifyContent: 'space-between'
      }} className="login-visuals">
        <div>
          <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'white', fontSize: '1.5rem', fontWeight: '800' }}>
            <i className="ri-recycle-fill" style={{ fontSize: '2rem' }}></i>
            EcoTech
          </Link>
        </div>
        <div style={{ marginTop: 'auto' }}>
          <h1 style={{ fontSize: '3.5rem', lineHeight: '1.1', marginBottom: '1.5rem', fontWeight: '800' }}>
            Join the Green Revolution.
          </h1>
          <p style={{ fontSize: '1.2rem', opacity: 0.9, maxWidth: '400px', lineHeight: '1.6' }}>
            Turn your electronic waste into value. Connect with buyers, sellers, and certified recyclers globally.
          </p>
        </div>
      </div>

      {/* Right side - Form */}
      <div style={{ 
        flex: 1, 
        display: 'flex', 
        flexDirection: 'column', 
        justifyContent: 'center', 
        padding: '4rem 2rem',
        background: 'var(--bg-light)'
      }}>
        <div style={{ maxWidth: '450px', width: '100%', margin: '0 auto' }}>
          <div style={{ marginBottom: '2.5rem' }}>
            <h2 style={{ fontSize: '2.5rem', marginBottom: '0.5rem', color: 'var(--text-main)' }}>Create Account</h2>
            <p style={{ color: 'var(--text-muted)', fontSize: '1.1rem' }}>Enter your details to set up your profile.</p>
            {error && (
              <div style={{ marginTop: '1rem', padding: '0.75rem 1rem', background: '#fee2e2', border: '1px solid #fca5a5', color: '#b91c1c', borderRadius: '8px', fontSize: '0.95rem', fontWeight: '500' }}>
                <i className="ri-error-warning-line" style={{ marginRight: '0.5rem' }}></i>
                {error}
              </div>
            )}
          </div>

          <form onSubmit={handleSubmit}>
            <div style={{ marginBottom: '1.5rem' }}>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600', color: 'var(--text-main)', fontSize: '0.95rem' }}>Full Name</label>
              <div style={{ position: 'relative' }}>
                <i className="ri-user-line" style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }}></i>
                <input 
                  type="text" 
                  placeholder="John Doe" 
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  style={{ width: '100%', padding: '0.9rem 1rem 0.9rem 2.8rem', borderRadius: '12px', border: '1px solid var(--border)', background: 'var(--bg-card)', color: 'var(--text-main)', fontSize: '1rem', outline: 'none', transition: 'all 0.3s', fontFamily: 'inherit' }} 
                  onFocus={(e) => e.target.style.borderColor = 'var(--primary)'}
                  onBlur={(e) => e.target.style.borderColor = 'var(--border)'}
                  required 
                />
              </div>
            </div>

            <div style={{ marginBottom: '1.5rem' }}>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600', color: 'var(--text-main)', fontSize: '0.95rem' }}>Email</label>
              <div style={{ position: 'relative' }}>
                <i className="ri-mail-line" style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }}></i>
                <input 
                  type="email" 
                  placeholder="name@company.com" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  style={{ width: '100%', padding: '0.9rem 1rem 0.9rem 2.8rem', borderRadius: '12px', border: '1px solid var(--border)', background: 'var(--bg-card)', color: 'var(--text-main)', fontSize: '1rem', outline: 'none', transition: 'all 0.3s', fontFamily: 'inherit' }} 
                  onFocus={(e) => e.target.style.borderColor = 'var(--primary)'}
                  onBlur={(e) => e.target.style.borderColor = 'var(--border)'}
                  required 
                />
              </div>
            </div>
            
            <div style={{ marginBottom: '1.5rem' }}>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600', color: 'var(--text-main)', fontSize: '0.95rem' }}>Password</label>
              <div style={{ position: 'relative' }}>
                <i className="ri-lock-line" style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }}></i>
                <input 
                  type="password" 
                  placeholder="••••••••" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  style={{ width: '100%', padding: '0.9rem 1rem 0.9rem 2.8rem', borderRadius: '12px', border: '1px solid var(--border)', background: 'var(--bg-card)', color: 'var(--text-main)', fontSize: '1rem', outline: 'none', transition: 'all 0.3s', fontFamily: 'inherit' }} 
                  onFocus={(e) => e.target.style.borderColor = 'var(--primary)'}
                  onBlur={(e) => e.target.style.borderColor = 'var(--border)'}
                  required 
                />
              </div>
            </div>

            <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '2rem', cursor: 'pointer', fontSize: '0.95rem', color: 'var(--text-muted)' }}>
              <input type="checkbox" style={{ width: '16px', height: '16px', accentColor: 'var(--primary)' }} required />
              I agree to the Terms of Service & Privacy Policy
            </label>

            <button type="submit" className="btn-primary" style={{ width: '100%', padding: '1rem', fontSize: '1.05rem', borderRadius: '12px' }} disabled={loadingForm}>
              {loadingForm ? 'Signing Up...' : 'Sign Up'}
            </button>
          </form>

          <div style={{ display: 'flex', alignItems: 'center', margin: '2rem 0', color: 'var(--text-muted)' }}>
            <div style={{ flex: 1, height: '1px', background: 'var(--border)' }}></div>
            <span style={{ padding: '0 1rem', fontSize: '0.9rem' }}>Or continue with</span>
            <div style={{ flex: 1, height: '1px', background: 'var(--border)' }}></div>
          </div>

          <div style={{ display: 'flex', gap: '1rem' }}>
            <button className="btn-secondary" style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', padding: '0.8rem', borderRadius: '12px' }}>
              <i className="ri-google-fill" style={{ fontSize: '1.2rem', color: '#DB4437' }}></i>
              Google
            </button>
            <button className="btn-secondary" style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', padding: '0.8rem', borderRadius: '12px' }}>
              <i className="ri-github-fill" style={{ fontSize: '1.2rem' }}></i>
              GitHub
            </button>
          </div>

          <p style={{ textAlign: 'center', marginTop: '2.5rem', color: 'var(--text-muted)', fontSize: '1rem' }}>
            Already have an account? <Link to="/login" style={{ color: 'var(--primary)', fontWeight: '600', textDecoration: 'none' }}>Sign in</Link>
          </p>
        </div>
      </div>

      <style dangerouslySetInnerHTML={{__html: `
        @media (max-width: 900px) {
          .login-visuals {
            display: none !important;
          }
        }
        .login-visuals {
          display: flex !important;
        }
      `}} />
    </section>
  );
}

export default Register;
