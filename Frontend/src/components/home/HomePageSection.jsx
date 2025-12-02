import { useState } from "react";
import "../../styles/home/homepage.css";

const categories = [
  {
    id: "Luzon",
    title: "Luzon",
    subtitle: "Heritage Highlands",
    accentColor: "#d62828",
    description:
      "Luzon is home to diverse indigenous groups such as the Ifugao, Kalinga, and Aeta. Traditional clothing includes woven fabrics like the ‘tapis’ and ‘bahag,’ representing rich history, craftsmanship, and cultural identity."
  },
  {
    id: "Visayas",
    title: "Visayas",
    subtitle: "Vibrant Weaves",
    accentColor: "#fcd116",
    description:
      "The Visayas is known for colorful woven textiles such as the ‘Hablon’ and ‘Patadyong.’ These garments reflect centuries of craftsmanship inspired by trade, tradition, and the vibrant spirit of Visayan culture."
  },
  {
    id: "Mindanao",
    title: "Mindanao",
    subtitle: "Royal Threads",
    accentColor: "#0038a8",
    description:
      "Mindanao’s cultural clothing traces back to Muslim and Lumad heritage. The T’boli ‘T’nalak,’ Maranao ‘Malong,’ and Bagobo garments symbolize royal ancestry, spiritual traditions, and artistic excellence."
  }
];

export default function HomePageSection() {
  const [selectedIsland, setSelectedIsland] = useState(null);
  const selectedCategory = categories.find((cat) => cat.id === selectedIsland);

  return (
    <section className="home-hero">
      <div className="home-hero-overlay"></div>

      <div className={`home-container ${selectedIsland ? "shift-left" : ""}`}>
        {/* Category Cards */}
        <div className="home-bars-container">
          {categories.map((category) => (
            <button
              key={category.id}
              className={`category-card ${selectedIsland === category.id ? "active" : ""}`}
              onClick={() => setSelectedIsland(category.id)}
              type="button"
              style={{ '--category-accent': category.accentColor }}
            >
              <div
                className="category-circle"
                style={{ background: category.accentColor }}
                aria-hidden
              >
                {category.title.charAt(0)}
              </div>
              <div className="category-copy">
                <div className="category-card-header">
                  <span className="category-title">{category.title}</span>
                </div>
                <p className="category-subtitle">{category.subtitle}</p>
              </div>
              <span className="category-arrow">Explore →</span>
            </button>
          ))}
        </div>

        {/* Description Panel */}
        {selectedCategory && (
          <div className="island-description visible">
            <p className="eyebrow">Cultural Narrative</p>
            <h2>{selectedCategory.title}</h2>
            <p>{selectedCategory.description}</p>

            <button
              className="close-btn"
              onClick={() => setSelectedIsland(null)}
              aria-label="Back to categories"
            >
              <span aria-hidden="true">←</span>
            </button>
          </div>
        )}
      </div>

      {!selectedCategory && (
        <div className="hero-quote">
          <p className="cultural-quote">“Discover the traditional clothing of Luzon, Visayas, and Mindanao.”</p>
          <p className="inspiration-subtext">
            Each weave tells the story of craftsmanship, heritage, and the vibrant spirit of Filipino artistry.
          </p>
        </div>
      )}
    </section>
  );
}