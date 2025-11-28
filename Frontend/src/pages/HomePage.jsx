import "../styles/home/homepage.css"; 

import Header from "../../src/components/Header.jsx";
import HomePageSection from "../components/home/HomePageSection.jsx";

function HomePage() {
  return (
    <div className="homepage">
      <Header showNav={true} />
      <HomePageSection />
    </div>
  );
}

export default HomePage;