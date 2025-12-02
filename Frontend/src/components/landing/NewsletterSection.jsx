// Newsletter.jsx
import React, { useState } from "react";
import { useNotification } from "../../context/NotificationContext.jsx";

function NewsletterSection() {
  const [email, setEmail] = useState("");
  const { notifySuccess } = useNotification();

  const handleSubscribe = (event) => {
    event.preventDefault();
    notifySuccess("Subscription confirmed", {
      message: `We'll send updates to ${email}`
    });
    setEmail(""); // clear input
  };

  return (
    <section className="newsletter-section">
      <div className="newsletter-pattern"></div>
      <div className="newsletter-content">
        <h2 className="newsletter-title">Stay Connected</h2>
        <p className="newsletter-subtitle">
          Subscribe to receive updates on new products, exclusive deals, and artisan stories
        </p>
        <form className="newsletter-form" onSubmit={handleSubscribe}>
          <input
            type="email"
            className="newsletter-input"
            placeholder="Enter your email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <button type="submit" className="newsletter-btn">
            Subscribe
          </button>
        </form>
      </div>
    </section>
  );
}

export default NewsletterSection;
