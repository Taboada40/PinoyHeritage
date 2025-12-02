import React from "react";
import "../styles/confirmation-modal.css";

const ICONS = {
  success: (
    <svg width="64" height="64" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="32" cy="32" r="30" fill="#22c55e" stroke="#16a34a" strokeWidth="2" />
      <path d="M20 32L28 40L44 24" stroke="white" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
  warning: (
    <svg width="64" height="64" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="32" cy="32" r="30" fill="#fbbf24" stroke="#f59e0b" strokeWidth="2" />
      <path d="M32 18L48 46H16L32 18Z" fill="white" />
      <path d="M32 28V36" stroke="#f97316" strokeWidth="4" strokeLinecap="round" />
      <circle cx="32" cy="42" r="2" fill="#f97316" />
    </svg>
  ),
  danger: (
    <svg width="64" height="64" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="32" cy="32" r="30" fill="#ef4444" stroke="#dc2626" strokeWidth="2" />
      <path d="M24 24L40 40" stroke="white" strokeWidth="4" strokeLinecap="round" />
      <path d="M40 24L24 40" stroke="white" strokeWidth="4" strokeLinecap="round" />
    </svg>
  ),
  info: (
    <svg width="64" height="64" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="32" cy="32" r="30" fill="#3b82f6" stroke="#2563eb" strokeWidth="2" />
      <line x1="32" y1="24" x2="32" y2="32" stroke="white" strokeWidth="4" strokeLinecap="round" />
      <circle cx="32" cy="40" r="2" fill="white" />
    </svg>
  )
};

const ConfirmationModal = ({
  isOpen,
  onClose,
  title = "Confirmed",
  message = "Action completed successfully!",
  variant = "success",
  confirmLabel = "Continue",
  cancelLabel = "Cancel",
  showCancel = false,
  onConfirm,
  disableBackdropClose = false
}) => {
  if (!isOpen) return null;

  const handlePrimary = () => {
    if (onConfirm) {
      onConfirm();
    } else if (onClose) {
      onClose();
    }
  };

  const handleOverlayClick = () => {
    if (!disableBackdropClose && onClose) {
      onClose();
    }
  };

  return (
    <div className="confirmation-overlay" onClick={handleOverlayClick}>
      <div className={`confirmation-modal ${variant}`} onClick={(e) => e.stopPropagation()}>
        <div className="confirmation-icon">{ICONS[variant] ?? ICONS.info}</div>
        <h2 className="confirmation-title">{title}</h2>
        {message && <p className="confirmation-message">{message}</p>}
        <div className="confirmation-actions">
          {showCancel && (
            <button className="confirmation-btn secondary" onClick={onClose}>
              {cancelLabel}
            </button>
          )}
          <button className="confirmation-btn primary" onClick={handlePrimary}>
            {confirmLabel}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationModal;
