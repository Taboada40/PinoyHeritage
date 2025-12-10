import { useState, useEffect } from "react"; 
import { useLocation } from "react-router-dom"; 
import "../../styles/home/homepage.css";
import homeImg from "../../assets/imgs/home/home.jpg";

const categories = [
  {
    id: "Luzon",
    title: "Luzon",
    subtitle: "Heritage Highlands",
    accentColor: "#CE1126", 
    description:
      "Luzon is home to diverse indigenous groups such as the Ifugao, Kalinga, and Aeta. Traditional clothing includes woven fabrics like the ‘tapis’ and ‘bahag,’ representing rich history, craftsmanship, and cultural identity."
  },
  {
    id: "Visayas",
    title: "Visayas",
    subtitle: "Vibrant Weaves",
    accentColor: "#FCD116", 
    description:
      "The Visayas is known for colorful woven textiles such as the ‘Hablon’ and ‘Patadyong.’ These garments reflect centuries of craftsmanship inspired by trade, tradition, and the vibrant spirit of Visayan culture."
  },
  {
    id: "Mindanao",
    title: "Mindanao",
    subtitle: "Royal Threads",
    accentColor: "#0038A8", 
    description:
      "Mindanao’s cultural clothing traces back to Muslim and Lumad heritage. The T'boli ‘T'nalak,’ Maranao ‘Malong,’ and Bagobo garments symbolize royal ancestry, spiritual traditions, and artistic excellence."
  }
];

export default function HomePageSection() {
  const [selectedIsland, setSelectedIsland] = useState(null);
  const location = useLocation(); 
  
  const selectedCategory = categories.find((cat) => cat.id === selectedIsland);

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const islandParam = queryParams.get('island');
    
    if (islandParam && categories.some(cat => cat.id === islandParam)) {
      setSelectedIsland(islandParam);
    } else {
      setSelectedIsland(null);
    }
  }, [location]);

  return (
    <section className="home-hero" style={{ backgroundImage: `url(${homeImg})` }}>
      <div className="home-hero-overlay"></div>

      <div className={`home-container ${selectedIsland ? "shift-left" : ""}`}>
        
        {/* Category Cards (Left Side) */}
        <div className="home-bars-container">
          <div className="menu-header">
            <span className="small-label">Select Region</span>
          </div>
          
          {categories.map((category) => (
            <button
              key={category.id}
              className={`category-card ${selectedIsland === category.id ? "active" : ""}`}
              onClick={() => setSelectedIsland(category.id)}
              type="button"
              style={{ '--category-accent': category.accentColor }}
            >
              <div className="category-content-wrapper">
                <div
                  className="category-circle"
                  style={{ 
                    color: selectedIsland === category.id ? '#fff' : category.accentColor,
                    background: selectedIsland === category.id ? category.accentColor : 'rgba(255,255,255,0.9)'
                  }}
                  aria-hidden
                >
                  {category.title.charAt(0)}
                </div>
                <div className="category-copy">
                  <span className="category-title">{category.title}</span>
                  <p className="category-subtitle">{category.subtitle}</p>
                </div>
              </div>
              <span className="category-arrow">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M5 12h14M12 5l7 7-7 7"/>
                </svg>
              </span>
            </button>
          ))}
        </div>

        <div className={`island-description ${selectedCategory ? "visible" : ""}`}>
          {selectedCategory && (
            <>
              <div className="desc-header">
                <p className="eyebrow">Cultural Narrative</p>
                <button
                  className="close-btn-minimal"
                  onClick={() => setSelectedIsland(null)}
                  aria-label="Close"
                >
                  ×
                </button>
              </div>
              
              <h2 style={{ color: selectedCategory.accentColor }}>{selectedCategory.title}</h2>
              <p className="desc-text">{selectedCategory.description}</p>
            </>
          )}
        </div>
      </div>

      {!selectedCategory && (
        <div className="hero-quote">
          <p className="cultural-quote">"The fabric of a nation is woven by the stories of its people."</p>
          <p className="inspiration-subtext">
            Discover the heritage of Luzon, Visayas, and Mindanao.
          </p>
        </div>
      )}
    </section>
  );
}