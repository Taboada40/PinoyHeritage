import { useState } from "react";
import "../assets/styles/landingpage.css"; 

import Header from "../components/Header.jsx";
import HeroSection from "../components/HeroSection.jsx";
import WhySection from "../components/WhySection.jsx";
import CategorySection from "../components/CategorySection.jsx";
import IslandSection from "../components/IslandSection.jsx";
import Footer from "../components/Footer.jsx";
import NewsletterSection from "../components/NewsletterSection.jsx";

function LandingPage() {
  return (
    <div className="landing-page">
      <Header showNav={true} />
      <HeroSection />
      <WhySection />
      <CategorySection />
      <IslandSection />
      <NewsletterSection />
      <Footer />
    </div>
  );
}

export default LandingPage;
