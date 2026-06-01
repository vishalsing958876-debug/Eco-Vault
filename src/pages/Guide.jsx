function Guide() {
  return (
    <section className="section">
      <div className="section-header">
        <h2>Disposal Guide</h2>
        <p>Follow our step-by-step guides to safely prepare and dispose of your different electronic items.</p>
      </div>
      
      <div className="guide-grid">
        <div className="guide-card">
          <div className="guide-icon"><i className="ri-smartphone-line"></i></div>
          <h3>Mobile Phones & Tablets</h3>
          <ul className="guide-steps">
            <li>Backup all your personal data to cloud or external storage.</li>
            <li>Sign out of all accounts (Apple ID, Google, etc).</li>
            <li>Perform a factory reset to wipe data permanently.</li>
            <li>Remove SIM and SD cards.</li>
            <li>Drop off at certified e-waste bin or list it on our marketplace.</li>
          </ul>
        </div>
        
        <div className="guide-card">
          <div className="guide-icon"><i className="ri-macbook-line"></i></div>
          <h3>Laptops & Computers</h3>
          <ul className="guide-steps">
            <li>Backup essential files and documents.</li>
            <li>Use data wiping software to securely erase the hard drive.</li>
            <li>Disconnect any external peripherals.</li>
            <li>If battery is swollen, handle with extreme caution and seek professional help.</li>
            <li>Recycle at designated local centers.</li>
          </ul>
        </div>

        <div className="guide-card">
          <div className="guide-icon"><i className="ri-battery-2-charge-line"></i></div>
          <h3>Batteries & Peripherals</h3>
          <ul className="guide-steps">
            <li>Separate lithium-ion, alkaline, and lead-acid batteries.</li>
            <li>Tape the terminals of batteries to prevent short circuits.</li>
            <li>Never throw batteries in regular trash to avoid fire hazards.</li>
            <li>Bundle cables and cords neatly to prevent tangling.</li>
            <li>Take to battery-specific recycling drop-offs.</li>
          </ul>
        </div>
        <div className="guide-card">
          <div className="guide-icon"><i className="ri-tv-2-line"></i></div>
          <h3>Televisions & Monitors</h3>
          <ul className="guide-steps">
            <li>Do NOT break the glass, as older CRTs contain hazardous lead and phosphorus.</li>
            <li>Handle LCD/LED screens carefully to avoid mercury exposure from backlights.</li>
            <li>Keep the device fully assembled before taking it to a facility.</li>
            <li>Use a sturdy vehicle to transport heavy units.</li>
            <li>Take to a specialized e-waste drop-off that accepts large displays.</li>
          </ul>
        </div>

        <div className="guide-card">
          <div className="guide-icon"><i className="ri-fridge-line"></i></div>
          <h3>Home Appliances</h3>
          <ul className="guide-steps">
            <li>Empty all contents from refrigerators and washing machines.</li>
            <li>Do not attempt to drain refrigerants (Freon) yourself; it is illegal and toxic.</li>
            <li>Tape doors shut to prevent accidents during transport.</li>
            <li>Check if your local municipality offers curbside pickup for white goods.</li>
            <li>Contact certified recyclers for safe CFC/HCFC extraction.</li>
          </ul>
        </div>

        <div className="guide-card">
          <div className="guide-icon"><i className="ri-printer-line"></i></div>
          <h3>Printers & Scanners</h3>
          <ul className="guide-steps">
            <li>Remove all ink or toner cartridges before recycling the main unit.</li>
            <li>Place cartridges in a sealed plastic bag to prevent leaking.</li>
            <li>Many office supply stores have drop-boxes specifically for cartridges.</li>
            <li>Delete any saved documents from the printer's internal memory if applicable.</li>
            <li>Recycle the main plastic/metal body at standard e-waste centers.</li>
          </ul>
        </div>
      </div>
    </section>
  );
}

export default Guide;
