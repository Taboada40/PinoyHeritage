import "../assets/styles/landingpage.css";
import { Link } from "react-router-dom";

function Header({ showNav = true }) {
  return (
    <header className="header">
      <div className="container">
        <div className="nav-content">
          <div className="logo">
            <div className="logo-icon">PH</div>
            <span>Pinoy Heritage</span>
          </div>

          {/* Only show navigation if showNav is true */}
          {showNav && (
            <nav className="nav-menu">
              <a href="#home" className="nav-link">Home</a>
              <a href="#about" className="nav-link">About</a>
              <Link to="/catalog" className="nav-link">Shop</Link>
            </nav>
          )}

          <div className="nav-icons">
            <button className="search-btn" aria-label="Search"></button>
            <button className="cart-btn" aria-label="Cart"></button>
            <button className="acc-btn" aria-label="Account"></button>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
