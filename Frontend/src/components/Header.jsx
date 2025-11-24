import "../styles/header.css";
import { Link, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";

function Header({ showNav = true }) {
  const location = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);

  // Detect if we’re on the landing page
  const isLandingPage = location.pathname === "/" || location.pathname === "/home";

  // Add scroll listener
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 80) { // adjust threshold as needed
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Determine header style
  const headerClass = `header ${
    isLandingPage
      ? isScrolled
        ? "header--scrolled"
        : "header--transparent"
      : ""
  }`;

  return (
    <header className={headerClass}>
      <div className="container">
        <div className="nav-content">
          <div className="logo">
            <div className="logo-icon">PH</div>
            <Link to="/" className="nav-link">PinoyHeritage</Link>
          </div>

          {showNav && (
            <nav className="nav-menu">
              <Link to="/home" className="nav-link">Home</Link>
              <a href="#why-section" className="nav-link">About</a>
              <Link to="/catalog" className="nav-link">Shop</Link>
            </nav>
          )}

          <div className="nav-icons">
            <button className="search-btn" aria-label="Search"></button>
            <button className="cart-btn" aria-label="Cart"></button>
            <Link to="/login" aria-label="Account">
              <button className="acc-btn"></button>
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
