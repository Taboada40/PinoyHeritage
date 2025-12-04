import { useState } from "react";
import "../styles/landing/landingpage.css"; 

import Header from "../components/Header.jsx"
import HeroSection from "../components/landing/HeroSection.jsx";
import WhySection from "../components/landing/WhySection.jsx";
import CategorySection from "../components/landing/CategoriesSection.jsx";
import IslandSection from "../components/landing/IslandSection.jsx";
import Footer from "../components/landing/Footer.jsx";

function LandingPage() {
  return (
    <div className="landing-page">
      <Header showNav={true} />
      <HeroSection />
      <WhySection />
      <CategorySection />
      <IslandSection />
      <Footer />
    </div>
  );
}

export default LandingPage;
