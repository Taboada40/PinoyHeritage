import "../assets/styles/landingpage.css";

function Footer({ email, setEmail, handleNewsletterSubmit }) {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-left">
            <div className="footer-logo">
              <div className="logo-icon">PH</div>
              <span>Pinoy Heritage</span>
            </div>
            <p className="footer-text">
              Celebrate and support Filipino craftsmanship from Luzon, Visayas, and Mindanao.
            </p>
          </div>

          <div className="footer-links">
            <a href="#about">About</a>
            <a href="#contact">Contact</a>
            <a href="#shop">Shop</a>
          </div>

          <div className="footer-newsletter">
            <h4>Join our news collection</h4>
            <div className="newsletter-input">
              <input
                type="email"
                className="newsletter-email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <button onClick={handleNewsletterSubmit}>→</button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
