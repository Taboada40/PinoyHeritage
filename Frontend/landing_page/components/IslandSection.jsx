import "../assets/styles/landingpage.css";
import React from "react";

// Function to store island card details
function getIslandData() {
  return [
    {
      name: "Luzon",
      badge: "250+ Products",
      desc: "Discover crafts from Northern Philippines, including Cordillera weaves and Ilocano pottery.",
      link: "#",
      className: "luzon",
    },
    {
      name: "Visayas",
      badge: "180+ Products",
      desc: "Experience Central Philippine artistry with hablon textiles and native baskets.",
      link: "#",
      className: "visayas",
    },
    {
      name: "Mindanao",
      badge: "200+ Products",
      desc: "Explore Southern Filipino crafts featuring intricate brass work and T'nalak cloth.",
      link: "#",
      className: "mindanao",
    },
  ];
}

function IslandSection() {
  const islands = getIslandData();

  return (
    <section className="islands-section">
      <div className="section-header">
        <div className="section-badge">Shop by Region</div>
        <h2 className="section-title">Discover Crafts from Every Island</h2>
        <p className="section-subtitle">
          Each region offers unique crafts that reflect local culture and traditions
        </p>
      </div>

      <div className="islands-grid">
        {islands.map((island) => (
          <div className="island-card" key={island.name}>
            <div className={`island-image ${island.className}`}>
              <span className="island-badge">{island.badge}</span>
            </div>
            <div className="island-info">
              <h3 className="island-title">{island.name}</h3>
              <p className="island-desc">{island.desc}</p>
              <a href={island.link} className="island-link">
                Explore {island.name} →
              </a>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default IslandSection;
