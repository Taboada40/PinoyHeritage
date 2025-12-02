import React, { createContext, useCallback, useContext, useMemo, useState } from "react";
import "../styles/notification.css";

const NotificationContext = createContext(null);

let toastCounter = 0;

const defaultTitles = {
  success: "Success",
  error: "Something went wrong",
  warning: "Please check",
  info: "Heads up"
};

const normalizePayload = (messageOrOptions, options = {}) => {
  if (typeof messageOrOptions === "string") {
    return { ...options, message: messageOrOptions };
  }
  return { ...messageOrOptions, ...options };
};

export const NotificationProvider = ({ children }) => {
  const [toasts, setToasts] = useState([]);

  const removeToast = useCallback((id) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  }, []);

  const notify = useCallback(
    (messageOrOptions, extraOptions = {}) => {
      const payload = normalizePayload(messageOrOptions, extraOptions);
      const {
        type = "info",
        title,
        message = "",
        duration = 4000
      } = payload;

      const id = ++toastCounter;

      setToasts((prev) => [
        ...prev,
        {
          id,
          type,
          title: title ?? defaultTitles[type] ?? defaultTitles.info,
          message,
          duration
        }
      ]);

      if (duration !== Infinity) {
        setTimeout(() => removeToast(id), duration);
      }

      return id;
    },
    [removeToast]
  );

  const contextValue = useMemo(
    () => ({
      notify,
      notifySuccess: (message, options = {}) =>
        notify(message, { ...options, type: "success" }),
      notifyError: (message, options = {}) =>
        notify(message, { ...options, type: "error" }),
      notifyWarning: (message, options = {}) =>
        notify(message, { ...options, type: "warning" }),
      notifyInfo: (message, options = {}) =>
        notify(message, { ...options, type: "info" }),
      dismiss: removeToast
    }),
    [notify, removeToast]
  );

  return (
    <NotificationContext.Provider value={contextValue}>
      {children}
      <div className="notification-stack">
        {toasts.map((toast) => (
          <div key={toast.id} className={`notification-card ${toast.type}`}>
            <div className="notification-card-header">
              <span className="notification-title">{toast.title}</span>
              <button
                className="notification-close"
                onClick={() => removeToast(toast.id)}
                aria-label="Dismiss notification"
                type="button"
              >
                ×
              </button>
            </div>
            {toast.message && (
              <p className="notification-message">{toast.message}</p>
            )}
          </div>
        ))}
      </div>
    </NotificationContext.Provider>
  );
};

export const useNotification = () => {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error("useNotification must be used within a NotificationProvider");
  }
  return context;
};
