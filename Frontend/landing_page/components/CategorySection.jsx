import "../assets/styles/landingpage.css";

function CategorySection() {
  return (
    <section className="category-section">
      <div className="container">
        <h2 className="section-title">Our Category</h2>

        <div className="category-grid">
          <CategoryCard name="Clothing & Apparel" extraClass="large clothing" />
          <CategoryCard name="Textile & Fabric" extraClass="textile" />
          <CategoryCard name="Crafts" extraClass="crafts" />
          <CategoryCard name="Accessories" extraClass="accessories" />
          <CategoryCard name="Souvenirs" extraClass="souvenirs" />
        </div>
      </div>
    </section>
  );
}

function CategoryCard({ name, extraClass }) {
  return (
    <div className={`category-card ${extraClass}`}>
      <div className={`category-image ${extraClass}`}>
        <div className="category-overlay"></div>
        <button className="category-btn">{name} →</button>
      </div>
    </div>
  );
}

export default CategorySection;
