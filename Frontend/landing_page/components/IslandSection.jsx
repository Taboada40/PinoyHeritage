import "../assets/styles/landingpage.css";

function IslandSection() {
  return (
    <section className="island-section">
      <div className="container">
        <h2 className="section-title">Shop by Island Group</h2>

        <div className="island-grid">
          <IslandCard name="Luzon" className="luzon" />
          <IslandCard name="Visayas" className="visayas" />
          <IslandCard name="Mindanao" className="mindanao" />
        </div>
      </div>
    </section>
  );
}

function IslandCard({ name, className }) {
  return (
    <div className="island-card">
      <div className={`island-image ${className}`}>
        <div className="island-overlay"></div>
      </div>
      <div className="island-label">
        <h3>{name}</h3>
      </div>
    </div>
  );
}

export default IslandSection;
