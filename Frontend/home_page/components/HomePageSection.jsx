import "../assets/styles/homepage.css";

export default function HomePageSection() {
  return (
    <section className="home-hero">
      <div className="home-hero-overlay"></div>
      <div className="home-bars-container">
        <div className="home-bar">Luzon</div>
        <div className="home-bar">Visayas</div>
        <div className="home-bar">Mindanao</div>
      </div>
    </section>
  );
}
