import { useState } from "react";
import "../assets/styles/homepage.css";

export default function HomePageSection() {
  const [selectedIsland, setSelectedIsland] = useState(null);

  const descriptions = {
    Luzon:
      "Luzon is home to diverse indigenous groups such as the Ifugao, Kalinga, and Aeta. Traditional clothing includes woven fabrics like the ‘tapis’ and ‘bahag,’ representing rich history, craftsmanship, and cultural identity.",
    Visayas:
      "The Visayas is known for colorful woven textiles such as the ‘Hablon’ and ‘Patadyong.’ These garments reflect centuries of craftsmanship inspired by trade, tradition, and the vibrant spirit of Visayan culture.",
    Mindanao:
      "Mindanao’s cultural clothing traces back to Muslim and Lumad heritage. The T’boli ‘T’nalak,’ Maranao ‘Malong,’ and Bagobo garments symbolize royal ancestry, spiritual traditions, and artistic excellence."
  };

  return (
    <section className="home-hero">
      <div className="home-hero-overlay"></div>

      <div className={`home-container ${selectedIsland ? "shift-left" : ""}`}>
        {/* LEFT — Category Bars */}
        <div className="home-bars-container">
          <div className="home-bar" onClick={() => setSelectedIsland("Luzon")}>
            Luzon
          </div>
          <div className="home-bar" onClick={() => setSelectedIsland("Visayas")}>
            Visayas
          </div>
          <div className="home-bar" onClick={() => setSelectedIsland("Mindanao")}>
            Mindanao
          </div>
        </div>

        {/* RIGHT — Description Panel */}
        {selectedIsland && (
          <div className="island-description">
            <h2>{selectedIsland}</h2>
            <p>{descriptions[selectedIsland]}</p>

            <button className="close-btn" onClick={() => setSelectedIsland(null)}>
              Close
            </button>
          </div>
        )}
      </div>
    </section>
  );
}