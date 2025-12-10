import React from "react";
import { useNavigate } from "react-router-dom";
import "../../styles/landing/landingpage.css";

import clothingImg from "../../assets/imgs/landing/clothing.jpg";
import textileImg from "../../assets/imgs/landing/textile.jpg";
import craftsImg from "../../assets/imgs/landing/crafts.jpg";
import accessoriesImg from "../../assets/imgs/landing/accessories.jpg";
import souvenirsImg from "../../assets/imgs/landing/souvenirs.jpg";

function getCategoriesData() {
  return [
    {
      name: "Traditional Clothing",
      tag: "Featured",
      desc: "Barong Tagalog, Filipiniana dresses, and more traditional Filipino attire",
      btnText: "Explore →",
      img: clothingImg,
      extraClass: "large",
      categoryName: "Traditional Clothing", 
    },
    {
      name: "Textiles",
      tag: "Popular",
      desc: "Handwoven fabrics and materials",
      btnText: "Shop →",
      img: textileImg,
      extraClass: "",
      categoryName: "Textiles", 
    },
    {
      name: "Handicrafts",
      tag: "New",
      desc: "Unique handmade decorations",
      btnText: "Discover →",
      img: craftsImg,
      extraClass: "",
      categoryName: "Handicrafts", 
    },
    {
      name: "Accessories",
      tag: "Trending",
      desc: "Jewelry, bags, and more",
      btnText: "View →",
      img: accessoriesImg,
      extraClass: "",
      categoryName: "Accessories", 
    },
    {
      name: "Souvenirs",
      tag: "Gift Ideas",
      desc: "Perfect gifts and keepsakes",
      btnText: "Browse →",
      img: souvenirsImg,
      extraClass: "",
      categoryName: "Souvenirs", 
    },
  ];
}

function CategorySection() {
  const categories = getCategoriesData();

  return (
    <section id="categories" className="categories-section">
      <div className="categories-content">
        <div className="section-header">
          <div className="section-badge">Shop by Category</div>
          <h2 className="section-title">Explore Our Collections</h2>
          <p className="section-subtitle">
            From traditional clothing to handwoven textiles, discover authentic Filipino crafts
          </p>
        </div>

        <div className="categories-grid">
          {categories.map((cat) => (
            <CategoryCard
              key={cat.name}
              {...cat}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

// CategoryCard component
function CategoryCard({ name, tag, desc, btnText, img, extraClass, categoryName }) {
  const navigate = useNavigate();

  const handleCategoryClick = () => {
    // Navigate to product catalog with category filter
    navigate(`/catalog?category=${encodeURIComponent(categoryName.toLowerCase())}`);
  };

  return (
    <div className={`landing-category-card ${extraClass}`}>
      <div
        className="category-image"
        style={{ backgroundImage: `url(${img})` }}
      >
        <div className="category-overlay"></div>
        <div className="category-content">
          <span className="category-tag">{tag}</span>
          <h3 className="landing-category-title">{name}</h3>
          <p className="landing-category-desc">{desc}</p>
          <button 
            className="category-btn" 
            onClick={handleCategoryClick}
          >
            {btnText}
          </button>
        </div>
      </div>
    </div>
  );
}

export default CategorySection;