import React from "react";
import "../assets/styles/landingpage.css";

// Import images
import clothingImg from "../assets/imgs/clothing.jpg";
import textileImg from "../assets/imgs/textile.jpg";
import craftsImg from "../assets/imgs/crafts.jpg";
import accessoriesImg from "../assets/imgs/accessories.jpg";
import souvenirsImg from "../assets/imgs/souvenirs.jpg";

// Function to store category data
function getCategoriesData() {
  return [
    {
      name: "Traditional Clothing",
      tag: "Featured",
      desc: "Barong Tagalog, Filipiniana dresses, and more traditional Filipino attire",
      btnText: "Explore →",
      img: clothingImg,
      extraClass: "large",
    },
    {
      name: "Textiles",
      tag: "Popular",
      desc: "Handwoven fabrics and materials",
      btnText: "Shop →",
      img: textileImg,
      extraClass: "",
    },
    {
      name: "Handicrafts",
      tag: "New",
      desc: "Unique handmade decorations",
      btnText: "Discover →",
      img: craftsImg,
      extraClass: "",
    },
    {
      name: "Accessories",
      tag: "Trending",
      desc: "Jewelry, bags, and more",
      btnText: "View →",
      img: accessoriesImg,
      extraClass: "",
    },
    {
      name: "Souvenirs",
      tag: "Gift Ideas",
      desc: "Perfect gifts and keepsakes",
      btnText: "Browse →",
      img: souvenirsImg,
      extraClass: "",
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
function CategoryCard({ name, tag, desc, btnText, img, extraClass }) {
  return (
    <div className={`category-card ${extraClass}`}>
      <div
        className="category-image"
        style={{ backgroundImage: `url(${img})` }}
      >
        <div className="category-overlay"></div>
        <div className="category-content">
          <span className="category-tag">{tag}</span>
          <h3 className="category-title">{name}</h3>
          <p className="category-desc">{desc}</p>
          <button className="category-btn">{btnText}</button>
        </div>
      </div>
    </div>
  );
}

export default CategorySection;
