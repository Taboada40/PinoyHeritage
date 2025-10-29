import "../assets/styles/homepage.css"; 

import Header from "../../landing_page/components/Header"; // Use landing page header
import HomePageSection from "../components/HomePageSection.jsx";

function HomePage() {
  return (
    <div className="homepage">
      <Header showNav={true} />
      <HomePageSection />
    </div>
  );
}

export default HomePage;
