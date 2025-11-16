import React from "react";
import "../assets/styles/landingpage.css";

// FeatureCard component
function FeatureCard({ icon, title, text }) {
  return (
    <div className="feature-card">
      <div className="feature-icon">{icon}</div>
      <h3 className="feature-title">{title}</h3>
      <p className="feature-text">{text}</p>
    </div>
  );
}

// WhySection component
function WhySection() {
  return (
    <section className="features-section">
      <div className="section-header">
        <div className="section-badge">Why Choose Us</div>
        <h2 className="section-title">Your Trusted Filipino Marketplace</h2>
        <p className="section-subtitle">
          We connect you directly with talented Filipino artisans and their authentic handcrafted products
        </p>
      </div>

      <div className="features-grid">
        <FeatureCard
          icon="💛"
          title="Support Local Artisans"
          text="Empowering Filipino makers by giving their products a wider audience."
        />
        <FeatureCard
          icon="📦"
          title="Authentic Products"
          text="Shop genuine items from Luzon, Visayas, and Mindanao — all in one place."
        />
        <FeatureCard
          icon="🔒"
          title="Secure & Simple"
          text="Enjoy safe payments and reliable delivery for a hassle-free shopping experience."
        />
        <FeatureCard
          icon="🏛️"
          title="Cultural Preservation"
          text="Every purchase helps keep Filipino traditions alive for future generations."
        />
      </div>
    </section>
  );
}

export default WhySection;

