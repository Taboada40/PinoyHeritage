import React from "react";
import "../styles/confirmation-modal.css";

const CheckmarkIcon = () => (
  <svg width="64" height="64" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="32" cy="32" r="30" fill="#22c55e" stroke="#16a34a" strokeWidth="2"/>
    <path d="M20 32L28 40L44 24" stroke="white" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const ConfirmationModal = ({ isOpen, onClose, title = "Confirmed", message = "Action completed successfully!" }) => {
  if (!isOpen) return null;

  return (
    <div className="confirmation-overlay" onClick={onClose}>
      <div className="confirmation-modal" onClick={(e) => e.stopPropagation()}>
        <div className="confirmation-icon">
          <CheckmarkIcon />
        </div>
        <h2 className="confirmation-title">{title}</h2>
        <p className="confirmation-message">{message}</p>
        <button className="confirmation-btn" onClick={onClose}>
          Continue
        </button>
      </div>
    </div>
  );
};

export default ConfirmationModal;
