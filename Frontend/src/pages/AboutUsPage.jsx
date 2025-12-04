import React, { useState } from 'react';
import { Shield, Globe, Heart } from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/landing/Footer.jsx';
import luzonImg from '../assets/imgs/products/filipiniana.jpg';
import visayasImg from '../assets/imgs/products/tnalak.jpg';

import '../styles/landing/aboutuspage.css'; 

const AboutPage = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <div className="about-page-wrapper">
      <Header showNav={true} />
      
      {/* --- Header Section --- */}
      <section className="about-hero-section">
        <div className="about-container-lg">
          <div className="about-hero-content">
                <div className="about-hero-badge-wrapper">
                    <span className="about-hero-badge-text">Our Story</span>
                </div>
                
                <h1 className="about-hero-title">
                    Celebrating the Soul of <br />
                    <span className="about-hero-highlight-wrapper">
                        <span className="about-hero-highlight-text">Filipino Culture</span>
                        <span className="about-hero-highlight-bg"></span>
                    </span>
                </h1>
                <p className="about-hero-description">
                    Journey through the archipelago’s rich history. We preserve age-old traditions by bringing you a curated collection of the Philippines' finest handcrafted treasures, designed for the modern home.
                </p>
          </div>
        </div>
      </section>

      {/* --- Image Grid --- */}
      <section className="about-grid-section">
          <div className="about-container-md">
              <div className="about-grid-layout">
                  
                  {/* Large Left Image */}
                  <div className="about-grid-large-item group">
                      <img src={luzonImg} alt="Weaving" className="about-grid-img" />
                      <div className="about-grid-overlay">
                          <p className="about-grid-overlay-label">Luzon</p>
                          <p className="about-grid-overlay-title">Modern Filipiniana</p>
                      </div>
                  </div>

                  {/* Right Column Stack */}
                  <div className="about-grid-right-col">
                      {/* Top Right Image */}
                      <div className="about-grid-small-item group">
                           <img src={visayasImg} alt="Pottery" className="about-grid-img" />
                      </div>
                      
                      {/* Stat Card */}
                      <div className="about-stat-card">
                           <div className="about-stat-content">
                               <p className="about-stat-label">Since 2025</p>
                               <p className="about-stat-value">100+ Partner Communities</p>
                           </div>
                           <div className="about-stat-blur-effect"></div>
                      </div>
                  </div>
              </div>
          </div>
      </section>

      {/* --- Values Section --- */}
      <section className="about-values-section">
        <div className="about-container-lg">
           <div className="about-values-header">
                <div className="about-values-header-content">
                    <h2 className="about-values-title">Why we started.</h2>
                    <p className="about-values-desc">We noticed that while Philippine craftsmanship is world-class, the supply chain was fragmented. We founded Pinoy Heritage to curate these masterpieces and share them with the world.</p>
                </div>
           </div>

           <div className="about-values-grid">
              {[
                  { 
                    icon: Globe, 
                    title: "Ethical Sourcing", 
                    desc: "We source directly from artisan communities across the Philippines, ensuring fair compensation and eliminating exploitative middlemen.",
                    colorClass: "about-icon-blue"
                  },
                  { 
                    icon: Shield, 
                    title: "Authenticity", 
                    desc: "Every item is vetted. We ensure that cultural patterns are respected and attributed correctly.",
                    colorClass: "about-icon-yellow" 
                  },
                  { 
                    icon: Heart, 
                    title: "Sustainability", 
                    desc: "Promoting slow fashion and materials that are kind to our environment.",
                    colorClass: "about-icon-green"
                  }
              ].map((item, i) => (
                  <div key={i} className="about-value-card group">
                      <div className={`about-value-icon-wrapper ${item.colorClass}`}>
                          <item.icon size={24} />
                      </div>
                      <h3 className="about-value-card-title">{item.title}</h3>
                      <p className="about-value-card-desc">{item.desc}</p>
                  </div>
              ))}
           </div>
        </div>
      </section>

      {/* --- Journey Section --- */}
      <section className="about-journey-section">
          <div className="about-container-sm">
              <h2 className="about-journey-header">Our Journey</h2>
              
              <div className="about-timeline-container">
                  {[
                      { year: "2024", title: "The Idea", desc: "Conceived during a trip to Ilocos, witnessing the decline of local weaving due to lack of market access." },
                      { year: "2025", title: "Pinoy Heritage Launches", desc: "We launched with 5 partner communities in Luzon and Visayas." },
                      { year: "Future", title: "The Roadmap", desc: "Expanding to Mindanao and introducing AI-driven supply chain tools." }
                  ].map((event, index) => (
                      <div key={index} className="about-timeline-item">
                          <div className="about-timeline-dot"></div>
                          <span className="about-timeline-year">{event.year}</span>
                          <h4 className="about-timeline-title">{event.title}</h4>
                          <p className="about-timeline-desc">{event.desc}</p>
                      </div>
                  ))}
              </div>
          </div>
      </section>

    <Footer />

    </div>
  );
};

export default AboutPage;