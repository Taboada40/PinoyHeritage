import "../assets/styles/landingpage.css";

function WhySection() {
  return (
    <section id="why" className="why-section">
      <div className="container">
        <h2 className="section-title">Why Pinoy Heritage?</h2>
        <p className="section-subtitle">
          Connecting communities through culture and commerce — Pinoy Heritage bridges artisans and customers nationwide.
        </p>

        <div className="features-grid">
          <FeatureCard icon="💛" title="Support Local Artisans" text="Empowering Filipino makers by giving their products a wider audience." />
          <FeatureCard icon="📦" title="Authentic Products" text="Shop genuine items from Luzon, Visayas, and Mindanao — all in one place." />
          <FeatureCard icon="🔒" title="Secure & Simple" text="Enjoy safe payments and reliable delivery for a hassle-free shopping experience." />
          <FeatureCard icon="🏛️" title="Cultural Preservation" text="Every purchase helps keep Filipino traditions alive for future generations." />
        </div>
      </div>
    </section>
  );
}

function FeatureCard({ icon, title, text }) {
  return (
    <div className="feature-card">
      <div className="feature-icon yellow">{icon}</div>
      <h3 className="feature-title">{title}</h3>
      <p className="feature-text">{text}</p>
    </div>
  );
}

export default WhySection;
