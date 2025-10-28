import React from "react";
import Header from "../components/Header";
import { HomePageSection } from "../components/HomePageSection.jsx";
import "../assets/styles/homepage.css";

function HomePage() {
  return (
    <div className="homepage">
      <Header />
      <HomePageSection />
      <main
        className="home-content"
        style={{
          position: "relative", // ensures content is above background
          zIndex: 1,
          paddingTop: "100px",
          textAlign: "center",
          color: "white",
        }}
      >
        <h1>Welcome to Pinoy Heritage</h1>
        <p>Discover the richness of Filipino culture.</p>
      </main>
    </div>
  );
}

export default HomePage;
