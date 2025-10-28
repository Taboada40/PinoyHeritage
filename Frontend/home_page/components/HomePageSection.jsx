import React from "react";
import "../assets/styles/homepage.css";
import homeBackground from "../assets/imgs/homebackground.jpg"; // Import image

function HomePageSection() {
  return (
    <div
      className="home-background"
      style={{
        backgroundImage: `url(${homeBackground.jpg})`,
        width: "100%",
        height: "100vh",           // Full viewport height
        position: "fixed",
        top: 0,
        left: 0,
        zIndex: -1,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div
        className="home-background-overlay"
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          backgroundColor: "rgba(0, 0, 0, 0.3)", // dark overlay
        }}
      ></div>
    </div>
  );
}

export { HomePageSection };
