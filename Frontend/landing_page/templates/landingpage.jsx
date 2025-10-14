import { useState } from 'react'
import reactLogo from "../assets/imgs/react.svg";
import "../assets/styles/landingpage.css";

const landingpage = () => {
  const [email, setEmail] = useState('');

  const handleNewsletterSubmit = () => {
    if (email) {
      alert(`Thank you for subscribing with: ${email}`);
      setEmail('');
    }
  };

  return (
    <div className="landing-page">
      {/* Header */}
      <header className="header">
        <div className="container">
          <div className="nav-content">
            <div className="logo">
              <div className="logo-icon">PH</div>
              <span>Pinoy Heritage</span>
            </div>
            <nav className="nav-menu">
              <a href="#home" className="nav-link">Home</a>
              <a href="#about" className="nav-link">About</a>
              <a href="#shop" className="nav-link">Shop</a>
            </nav>
            <div className="nav-icons">
              <button className="search-btn" aria-label="Search"></button>
              <button className="cart-btn" aria-label="Cart"></button>
              <button className="acc-btn" aria-label="Account"></button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="hero">
        <div className="hero-overlay"></div>
        <div className="hero-content">
          <h1 className="hero-title">Discover Authentic Filipino Craftsmanship</h1>
          <p className="hero-subtitle">
            Connecting you to artisans from Luzon, Visayas, and Mindanao — preserving culture and supporting local communities.
          </p>
          <div className="hero-buttons">
            <button className="btn btn-primary">Start Shopping</button>
            <button className="btn btn-secondary">Learn More</button>
          </div>
        </div>
      </section>

      {/* Why Pinoy Heritage Section */}
      <section className="why-section">
        <div className="container">
          <h2 className="section-title">Why Pinoy Heritage?</h2>
          <p className="section-subtitle">
            Connecting communities through culture and commerce — Pinoy Heritage bridges artisans and customers nationwide.
          </p>
          
          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon yellow">💛</div>
              <h3 className="feature-title">Support Local Artisans</h3>
              <p className="feature-text">
                Empowering Filipino makers by giving their products a wider audience.
              </p>
            </div>
            
            <div className="feature-card">
              <div className="feature-icon yellow">📦</div>
              <h3 className="feature-title">Authentic Products</h3>
              <p className="feature-text">
                Shop genuine items from Luzon, Visayas, and Mindanao — all in one place.
              </p>
            </div>
            
            <div className="feature-card">
              <div className="feature-icon yellow">🔒</div>
              <h3 className="feature-title">Secure & Simple</h3>
              <p className="feature-text">
                Enjoy safe payments and reliable delivery for a hassle-free shopping experience.
              </p>
            </div>
            
            <div className="feature-card">
              <div className="feature-icon yellow">🏛️</div>
              <h3 className="feature-title">Cultural Preservation</h3>
              <p className="feature-text">
                Every purchase helps keep Filipino traditions alive for future generations.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Our Category Section */}
      <section className="category-section">
        <div className="container">
          <h2 className="section-title">Our Category</h2>
          
          <div className="category-grid">
            <div className="category-card large">
              <div className="category-image clothing">
                <div className="category-overlay"></div>
                <button className="category-btn">Clothing & Apparel →</button>
              </div>
            </div>
            
            <div className="category-card">
              <div className="category-image textile">
                <div className="category-overlay"></div>
                <button className="category-btn">Textile & Fabric →</button>
              </div>
            </div>
            
            <div className="category-card">
              <div className="category-image crafts">
                <div className="category-overlay"></div>
                <button className="category-btn">Crafts →</button>
              </div>
            </div>
            
            <div className="category-card">
              <div className="category-image accessories">
                <div className="category-overlay"></div>
                <button className="category-btn">Accessories →</button>
              </div>
            </div>
            
            <div className="category-card">
              <div className="category-image souvenirs">
                <div className="category-overlay"></div>
                <button className="category-btn">Souvenirs →</button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Shop by Island Group Section */}
      <section className="island-section">
        <div className="container">
          <h2 className="section-title">Shop by Island Group</h2>
          
          <div className="island-grid">
            <div className="island-card">
              <div className="island-image luzon">
                <div className="island-overlay"></div>
              </div>
              <div className="island-label">
                <h3>Luzon</h3>
              </div>
            </div>
            
            <div className="island-card">
              <div className="island-image visayas">
                <div className="island-overlay"></div>
              </div>
              <div className="island-label">
                <h3>Visayas</h3>
              </div>
            </div>
            
            <div className="island-card">
              <div className="island-image mindanao">
                <div className="island-overlay"></div>
              </div>
              <div className="island-label">
                <h3>Mindanao</h3>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
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
                  class="newsletter-email"
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
    </div>
  );
};

export default landingpage
