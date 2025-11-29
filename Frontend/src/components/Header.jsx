import "../styles/header.css";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

function Header({ showNav = true }) {
  const location = useLocation();
  const navigate = useNavigate();
  const [isScrolled, setIsScrolled] = useState(false);

  // Detect if we’re on the primary landing page (only '/')
  const isLandingPage = location.pathname === "/";

  // Add scroll listener
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 80) {
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

  const handleAccountClick = () => {
    const role = localStorage.getItem("role");
    const userId = localStorage.getItem("userId");

    if (role === "ADMIN" && userId) {
      navigate("/admin/dashboard");
      return;
    }

    if (userId) {
      navigate("/profile");
    } else {
      navigate("/login");
    }
  };

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
            
            {/* Cart button navigates to /cart */}
            <button 
              className="cart-btn" 
              aria-label="Cart" 
              onClick={() => navigate("/cart")}
            ></button>
            
            <button
              className="acc-btn"
              aria-label="Account"
              onClick={handleAccountClick}
            ></button>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
