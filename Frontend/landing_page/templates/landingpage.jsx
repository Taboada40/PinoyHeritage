import { useState } from "react";
import "../assets/styles/landingpage.css"; 

import Header from "../components/Header.jsx";
import HeroSection from "../components/HeroSection.jsx";
import WhySection from "../components/WhySection.jsx";
import CategorySection from "../components/CategorySection.jsx";
import IslandSection from "../components/IslandSection.jsx";
import Footer from "../components/Footer.jsx";

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
