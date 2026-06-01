import { useNavigate } from 'react-router-dom';

function Home() {
  const navigate = useNavigate();

  return (
    <>
      <section className="hero">
        <div className="hero-bg"></div>
        <div className="hero-overlay"></div>
        <div className="hero-content">
          <div className="hero-badge">Welcome to the future of recycling</div>
          <h1>Turn your old tech into <br /><span>Green Energy</span></h1>
          <p>Join the revolution in responsible e-waste management. Dispose of your electronics safely, or sell them for parts in our specialized commerce marketplace.</p>
          <div className="hero-buttons">
            <button className="btn-primary" onClick={() => navigate('/guide')}>How to Dispose</button>
            <button className="btn-secondary" onClick={() => navigate('/commerce')}>Browse Marketplace</button>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="section-header">
          <h2>Why Recycle E-Waste?</h2>
          <p>Electronic waste is currently the fastest-growing waste stream globally. By recycling effectively, we can recover highly valuable materials, support a circular economy, and prevent hazardous chemicals from polluting our earth.</p>
        </div>
        <div className="guide-grid">
          <div className="guide-card">
            <div className="guide-icon"><i className="ri-earth-line"></i></div>
            <h3>Protect the Environment</h3>
            <p>E-waste contains toxic chemicals like lead, mercury, and cadmium. Improper disposal allows these heavy metals to leach into the soil and groundwater, causing severe ecological damage and harming local wildlife populations.</p>
          </div>
          <div className="guide-card">
            <div className="guide-icon"><i className="ri-copper-coin-line"></i></div>
            <h3>Recover Resources</h3>
            <p>Every smartphone or laptop is a "mini-mine" containing precious metals such as gold, silver, platinum, and palladium. Recycling recovers these scarce materials, reducing the need for destructive and energy-intensive virgin mining.</p>
          </div>
          <div className="guide-card">
            <div className="guide-icon"><i className="ri-shield-check-line"></i></div>
            <h3>Data Security</h3>
            <p>Throwing away old devices leaves your personal and financial information vulnerable. Professional recycling facilities ensure your hard drives and memory chips are physically destroyed or wiped according to strict security protocols.</p>
          </div>
          <div className="guide-card">
            <div className="guide-icon"><i className="ri-battery-charge-line"></i></div>
            <h3>Energy Conservation</h3>
            <p>Manufacturing new products from recycled components uses a fraction of the energy required to process raw materials from the earth. Recycling aluminum and copper saves up to 90% of the energy compared to primary production.</p>
          </div>
          <div className="guide-card">
            <div className="guide-icon"><i className="ri-delete-bin-line"></i></div>
            <h3>Reduce Landfill Waste</h3>
            <p>Electronic devices take up significant volume and do not naturally biodegrade. By recycling, we divert millions of tons of bulky electronic scrap away from overcrowded landfills every year.</p>
          </div>
          <div className="guide-card">
            <div className="guide-icon"><i className="ri-scales-3-line"></i></div>
            <h3>Legal Compliance</h3>
            <p>Many regions and countries have implemented strict environmental laws banning e-waste from municipal trash. Recycling through certified channels guarantees that you remain compliant with local and federal regulations.</p>
          </div>
        </div>
      </section>
    </>
  );
}

export default Home;
