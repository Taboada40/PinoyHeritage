import { useState } from "react";
import "../assets/styles/landingpage.css"; 

import Header from "/components/Header";
import HeroSection from "/components/HeroSection";
import WhySection from "/components/WhySection";
import CategorySection from "/components/CategorySection";
import IslandSection from "/components/IslandSection";
import Footer from "/components/Footer";

function LandingPage() {
  const [email, setEmail] = useState("");

  function handleNewsletterSubmit() {
    if (email) {
      alert(`Thank you for subscribing with us!`);
      setEmail("");
    }
  }

  return (
    <div className="landing-page">
      <Header showNav={true} />
      <HeroSection />
      <WhySection />
      <CategorySection />
      <IslandSection />
      <Footer
        email={email}
        setEmail={setEmail}
        handleNewsletterSubmit={handleNewsletterSubmit}
      />
    </div>
  );
}

export default LandingPage;
