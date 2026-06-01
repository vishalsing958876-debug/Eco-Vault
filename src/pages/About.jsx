function About() {
  return (
    <section className="section">
      <div className="section-header">
        <h2>About EcoVault</h2>
        <p>We are on a mission to completely eliminate electronic waste from our landfills through education and accessible recycling networks.</p>
      </div>
      
      <div style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'center' }}>
        <h3 style={{ fontSize: '2rem', marginBottom: '1rem', color: 'var(--primary)' }}>The Problem</h3>
        <p style={{ color: 'var(--text-muted)', marginBottom: '3rem', fontSize: '1.1rem' }}>
          Millions of tons of e-waste are generated globally each year, with only a small fraction being properly recycled. This leads to toxic pollution and the loss of incredibly valuable resources.
        </p>
        
        <h3 style={{ fontSize: '2rem', marginBottom: '1rem', color: 'var(--primary)' }}>Our Solution</h3>
        <p style={{ color: 'var(--text-muted)', marginBottom: '3rem', fontSize: '1.1rem' }}>
          EcoVault provides a dual approach: We educate individuals on how to safely dispose of their everyday electronics, and we provide a vibrant marketplace for bulk e-waste, connecting sellers directly with certified recyclers and hobbyists to ensure items get a second life or are processed responsibly.
        </p>

        <div style={{ padding: '2rem', background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: '12px' }}>
          <h4>Join the movement. Every device counts.</h4>
        </div>
      </div>
    </section>
  );
}

export default About;
