import "../assets/styles/landingpage.css";
import { Link } from "react-router-dom";

function HeroSection() {
  const handleScrollToWhy = () => {
    const section = document.getElementById("why");
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="hero">
      <div className="hero-overlay"></div>
      <div className="hero-content">
        <h1 className="hero-title">Discover Authentic Filipino Craftsmanship</h1>
        <p className="hero-subtitle">
          Connecting you to artisans from Luzon, Visayas, and Mindanao — preserving culture and supporting local communities.
        </p>
        <div className="hero-buttons">
          <Link to="/catalog">
            <button className="btn btn-primary">Start Shopping</button>
          </Link>
          <button className="btn btn-secondary" onClick={handleScrollToWhy}>Learn More</button>
        </div>
      </div>
    </section>
  );
}

export default HeroSection;
