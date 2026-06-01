function Footer() {
  return (
    <footer>
      <div className="footer-content">
        <div className="footer-brand">
          <h3><i className="ri-recycle-fill"></i> EcoVault</h3>
          <p>Building a sustainable future by responsibly managing electronic waste. Join the green tech revolution.</p>
        </div>
        <div className="footer-links">
          <h4>Quick Links</h4>
          <a href="#">Privacy Policy</a>
          <a href="#">Terms of Service</a>
          <a href="#">Contact Support</a>
        </div>
        <div className="footer-socials">
          <h4>Follow Us</h4>
          <div className="social-icons">
            <a href="#"><i className="ri-twitter-x-line"></i></a>
            <a href="#"><i className="ri-linkedin-fill"></i></a>
            <a href="#"><i className="ri-instagram-line"></i></a>
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        <p>&copy; 2026 EcoVault. Designed with React.</p>
      </div>
    </footer>
  );
}

export default Footer;
