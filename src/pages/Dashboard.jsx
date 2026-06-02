import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

function Dashboard() {
  const { user, loading } = useContext(AuthContext);
  const navigate = useNavigate();
  
  const [transactions, setTransactions] = useState([]);
  const [itemName, setItemName] = useState('');
  const [weightKg, setWeightKg] = useState('');
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const fetchTransactions = async () => {
    const token = localStorage.getItem('token');
    if (!token) return;

    try {
      const response = await fetch('http://localhost:5000/api/vault/my-vault', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      const data = await response.json();
      if (response.ok && data.status === 'success') {
        setTransactions(data.data);
      }
    } catch (err) {
      console.error('Error fetching transactions:', err);
    }
  };

  useEffect(() => {
    if (!loading && !user) {
      navigate('/login');
    } else if (user) {
      fetchTransactions();
    }
  }, [user, loading, navigate]);

  const handleDepositSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSubmitting(true);

    const token = localStorage.getItem('token');
    const calculatedPoints = Number(weightKg) * 10;

    try {
      const response = await fetch('http://localhost:5000/api/vault/deposit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          itemName,
          weightKg: Number(weightKg),
          pointsEarned: calculatedPoints
        })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Deposit logging failed');
      }

      setItemName('');
      setWeightKg('');
      fetchTransactions();
    } catch (err) {
      setError(err.message || 'Something went wrong');
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return <div style={{ padding: '100px 2rem', textAlign: 'center' }}>Loading profile...</div>;
  }

  if (!user) {
    return null;
  }

  const totalWeight = transactions.reduce((sum, t) => sum + (t.weightKg || 0), 0);
  const totalPoints = transactions.reduce((sum, t) => sum + (t.pointsEarned || 0), 0);

  return (
    <section className="section" style={{ paddingTop: '100px' }}>
      <div className="section-header" style={{ textAlign: 'left', marginBottom: '3rem' }}>
        <h2>Welcome, {user.name}</h2>
        <p style={{ margin: '0.2rem 0' }}>Manage your Eco-Vault deposits, eco-credits, and log new electronic waste recyclables.</p>
      </div>

      {/* Stats Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '2rem', marginBottom: '3rem' }}>
        <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: '20px', padding: '2rem', display: 'flex', alignItems: 'center', gap: '1.5rem', boxShadow: 'var(--shadow-sm)' }}>
          <div style={{ background: '#ecfdf5', color: 'var(--primary)', width: '60px', height: '60px', borderRadius: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.8rem' }}>
            <i className="ri-scales-3-line"></i>
          </div>
          <div>
            <h4 style={{ color: 'var(--text-muted)', fontSize: '0.95rem', fontWeight: 600 }}>Total Recycled E-Waste</h4>
            <h3 style={{ fontSize: '1.8rem', color: 'var(--text-main)', margin: '0.2rem 0 0' }}>{totalWeight.toFixed(1)} kg</h3>
          </div>
        </div>

        <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: '20px', padding: '2rem', display: 'flex', alignItems: 'center', gap: '1.5rem', boxShadow: 'var(--shadow-sm)' }}>
          <div style={{ background: '#eff6ff', color: 'var(--secondary)', width: '60px', height: '60px', borderRadius: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.8rem' }}>
            <i className="ri-copper-coin-line"></i>
          </div>
          <div>
            <h4 style={{ color: 'var(--text-muted)', fontSize: '0.95rem', fontWeight: 600 }}>Eco-Credits Point Balance</h4>
            <h3 style={{ fontSize: '1.8rem', color: 'var(--text-main)', margin: '0.2rem 0 0' }}>{totalPoints} pts</h3>
          </div>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 350px', gap: '3rem', alignItems: 'start' }} className="commerce-container">
        {/* Left Side: Historical Transactions */}
        <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: '20px', padding: '2rem', boxShadow: 'var(--shadow-sm)' }}>
          <h3 style={{ fontSize: '1.4rem', marginBottom: '1.5rem', color: 'var(--text-main)' }}>Deposit History</h3>
          
          {transactions.length === 0 ? (
            <p style={{ color: 'var(--text-muted)', fontStyle: 'italic' }}>No e-waste deposits recorded yet. Log your first deposit on the right.</p>
          ) : (
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                <thead>
                  <tr style={{ borderBottom: '2px solid var(--border)', color: 'var(--text-muted)', fontSize: '0.9rem' }}>
                    <th style={{ padding: '0.75rem 1rem' }}>Item Description</th>
                    <th style={{ padding: '0.75rem 1rem' }}>Weight</th>
                    <th style={{ padding: '0.75rem 1rem' }}>Eco-Credits</th>
                    <th style={{ padding: '0.75rem 1rem' }}>Date logged</th>
                  </tr>
                </thead>
                <tbody>
                  {transactions.map(t => (
                    <tr key={t._id} style={{ borderBottom: '1px solid var(--border)', fontSize: '0.95rem' }}>
                      <td style={{ padding: '1rem', fontWeight: 600 }}>{t.itemName}</td>
                      <td style={{ padding: '1rem' }}>{t.weightKg} kg</td>
                      <td style={{ padding: '1rem', color: 'var(--primary)', fontWeight: 700 }}>+{t.pointsEarned} pts</td>
                      <td style={{ padding: '1rem', color: 'var(--text-muted)' }}>{new Date(t.createdAt).toLocaleDateString()}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Right Side: Log Deposit Form */}
        <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: '20px', padding: '2rem', boxShadow: 'var(--shadow-sm)' }}>
          <h3 style={{ fontSize: '1.4rem', marginBottom: '1.5rem', color: 'var(--text-main)' }}>Log New Deposit</h3>
          
          {error && (
            <div style={{ marginBottom: '1rem', padding: '0.75rem 1rem', background: '#fee2e2', border: '1px solid #fca5a5', color: '#b91c1c', borderRadius: '8px', fontSize: '0.9rem' }}>
              {error}
            </div>
          )}

          <form onSubmit={handleDepositSubmit}>
            <div style={{ marginBottom: '1.25rem' }}>
              <label style={{ display: 'block', marginBottom: '0.4rem', fontWeight: '600', fontSize: '0.9rem' }}>Item Name / Description</label>
              <input 
                type="text" 
                required 
                placeholder="e.g. Defective Smartphone"
                value={itemName}
                onChange={(e) => setItemName(e.target.value)}
                style={{ width: '100%', padding: '0.75rem 1rem', borderRadius: '10px', border: '1px solid var(--border)', fontFamily: 'inherit', outline: 'none' }}
              />
            </div>

            <div style={{ marginBottom: '1.5rem' }}>
              <label style={{ display: 'block', marginBottom: '0.4rem', fontWeight: '600', fontSize: '0.9rem' }}>Weight in KG</label>
              <input 
                type="number" 
                required 
                min="0.1" 
                step="0.1" 
                placeholder="0.5"
                value={weightKg}
                onChange={(e) => setWeightKg(e.target.value)}
                style={{ width: '100%', padding: '0.75rem 1rem', borderRadius: '10px', border: '1px solid var(--border)', fontFamily: 'inherit', outline: 'none' }}
              />
              <span style={{ display: 'block', marginTop: '0.4rem', fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                Estimated Points: {weightKg ? (Number(weightKg) * 10).toFixed(0) : 0} pts
              </span>
            </div>

            <button type="submit" className="btn-primary" style={{ width: '100%', padding: '0.85rem', borderRadius: '10px' }} disabled={submitting}>
              {submitting ? 'Submitting...' : 'Log E-waste Deposit'}
            </button>
          </form>
        </div>
      </div>
      
      <style dangerouslySetInnerHTML={{__html: `
        @media (max-width: 900px) {
          .commerce-container {
            grid-template-columns: 1fr !important;
          }
        }
      `}} />
    </section>
  );
}

export default Dashboard;
