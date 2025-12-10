import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../../components/Header";
import ConfirmationModal from "../../components/ConfirmationModal";
import { useNotification } from "../../context/NotificationContext.jsx";
import "../../styles/customer/payment.css";

const CreditCardIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="1" y="4" width="22" height="16" rx="2" ry="2"></rect>
    <line x1="1" y1="10" x2="23" y2="10"></line>
  </svg>
);

const SmartphoneIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="5" y="2" width="14" height="20" rx="2" ry="2"></rect>
    <line x1="12" y1="18" x2="12.01" y2="18"></line>
  </svg>
);

const BankIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="12" y1="2" x2="12" y2="6"></line>
    <line x1="2" y1="22" x2="22" y2="22"></line>
    <line x1="6" y1="6" x2="6" y2="22"></line>
    <line x1="18" y1="6" x2="18" y2="22"></line>
    <path d="M12 6L2 22h20L12 6z" /> 
    <rect x="2" y="6" width="20" height="5"></rect>
    <line x1="4" y1="11" x2="4" y2="22"></line>
    <line x1="20" y1="11" x2="20" y2="22"></line>
    <line x1="8" y1="11" x2="8" y2="22"></line>
    <line x1="12" y1="11" x2="12" y2="22"></line>
    <line x1="16" y1="11" x2="16" y2="22"></line>
  </svg>
);

const UserIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#9ca3af" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
    <circle cx="12" cy="7" r="4"></circle>
  </svg>
);

const CalendarIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#9ca3af" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
    <line x1="16" y1="2" x2="16" y2="6"></line>
    <line x1="8" y1="2" x2="8" y2="6"></line>
    <line x1="3" y1="10" x2="21" y2="10"></line>
  </svg>
);

const LockIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#9ca3af" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
    <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
  </svg>
);

const NumberIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#9ca3af" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4 8h16"></path>
    <path d="M4 16h16"></path>
    <path d="M10 4v16"></path>
    <path d="M14 4v16"></path>
  </svg>
);

const TicketIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M3 7v2h18V7"></path>
    <path d="M3 7l2-2h14l2 2"></path>
    <path d="M3 17v-8h18v8"></path>
    <path d="M3 17l2 2h14l2-2"></path>
    <line x1="9" y1="13" x2="15" y2="13"></line>
  </svg>
);

const CheckIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="20 6 9 17 4 12"></polyline>
  </svg>
);

const InfoIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#3b82f6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10"></circle>
    <line x1="12" y1="16" x2="12" y2="12"></line>
    <line x1="12" y1="8" x2="12.01" y2="8"></line>
  </svg>
);

const CartIcon = () => (
  <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#e5e7eb" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="9" cy="21" r="1"></circle>
    <circle cx="20" cy="21" r="1"></circle>
    <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
  </svg>
);

const ShieldIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
    <path d="M12 8v4"></path>
    <path d="M12 16h.01"></path>
  </svg>
);

const Payment = () => {
  const navigate = useNavigate();
  const { notifyWarning } = useNotification();

  const [selectedMethod, setSelectedMethod] = useState("");
  const [cartItems, setCartItems] = useState([]);
  const [promoCode, setPromoCode] = useState("");
  const [appliedPromo, setAppliedPromo] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showConfirmation, setShowConfirmation] = useState(false);

  // Card payment fields
  const [cardName, setCardName] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [cvv, setCvv] = useState("");

  // GCash fields
  const [gcashNumber, setGcashNumber] = useState("");
  const [gcashName, setGcashName] = useState("");

  // Bank Transfer fields
  const [bankName, setBankName] = useState("");
  const [accountNumber, setAccountNumber] = useState("");
  const [accountName, setAccountName] = useState("");

  const getGuestCart = () => {
    const guestCart = localStorage.getItem("guestCart");
    return guestCart ? JSON.parse(guestCart) : [];
  };

  const getUserFallbackCart = (id) => {
    if (!id) return [];
    const key = `userCart_${id}`;
    const stored = localStorage.getItem(key);
    return stored ? JSON.parse(stored) : [];
  };

  useEffect(() => {
    const userId = localStorage.getItem("userId");

    const fetchCart = async () => {
      if (!userId) {
        const guestCart = getGuestCart();
        setCartItems(guestCart);
        setLoading(false);
        return;
      }

      try {
        const res = await fetch(
          `http://localhost:8080/api/cart/customer/${userId}/items`
        );
        if (res.ok) {
          const data = await res.json();
          setCartItems(data || []);
        } else {
          setError("Unable to load cart from server. Showing last saved cart.");
          const fallback = getUserFallbackCart(userId);
          setCartItems(fallback);
        }
      } catch (err) {
        console.error(err);
        setError("Error connecting to server. Showing last saved cart.");
        const fallback = getUserFallbackCart(userId);
        setCartItems(fallback);
      } finally {
        setLoading(false);
      }
    };

    fetchCart();
  }, []);

  const shipping = 0;
  const subtotal = cartItems.reduce(
    (sum, item) =>
      sum + ((item.unitPrice || item.price || 0) * (item.quantity || 0)),
    0
  );
  const discount = appliedPromo === "SAVE10" ? subtotal * 0.1 : 0;
  const total = subtotal + shipping - discount;

  const removeItem = async (id) => {
    const userId = localStorage.getItem("userId");

    if (userId) {
      try {
        await fetch(
          `http://localhost:8080/api/cart/customer/${userId}/items/${id}`,
          { method: "DELETE" }
        );
      } catch (err) {
        console.error("Error removing item from backend cart:", err);
      }
      setCartItems((items) => items.filter((item) => item.id !== id));
    } else {
      const updated = cartItems.filter((item) => item.id !== id);
      setCartItems(updated);
      localStorage.setItem("guestCart", JSON.stringify(updated));
    }
  };

  const applyPromoCode = () => {
    if (promoCode.toUpperCase() === "SAVE10") {
      setAppliedPromo("SAVE10");
    } else {
      notifyWarning("Invalid promo code");
      setPromoCode("");
    }
  };

  const removePromoCode = () => {
    setAppliedPromo("");
    setPromoCode("");
  };

  const formatCardNumber = (value) => {
    const cleaned = value.replace(/\s/g, "");
    const formatted = cleaned.match(/.{1,4}/g)?.join(" ") || cleaned;
    return formatted;
  };

  const formatExpiryDate = (value) => {
    const cleaned = value.replace(/\D/g, "");
    if (cleaned.length >= 2) {
      return cleaned.slice(0, 2) + "/" + cleaned.slice(2, 4);
    }
    return cleaned;
  };

  const validatePayment = () => {
    if (!selectedMethod) {
      notifyWarning("Please select a payment method.");
      return false;
    }

    if (selectedMethod === "Credit/Debit Card") {
      if (!cardName || !cardNumber || !expiryDate || !cvv) {
        notifyWarning("Please fill in all card details.");
        return false;
      }
      if (cardNumber.replace(/\s/g, "").length !== 16) {
        notifyWarning("Please enter a valid 16-digit card number.");
        return false;
      }
      if (cvv.length !== 3) {
        notifyWarning("Please enter a valid 3-digit CVV.");
        return false;
      }
    }

    if (selectedMethod === "GCash") {
      if (!gcashNumber || !gcashName) {
        notifyWarning("Please fill in all GCash details.");
        return false;
      }
      if (gcashNumber.length !== 11) {
        notifyWarning("Please enter a valid 11-digit mobile number.");
        return false;
      }
    }

    if (selectedMethod === "Bank Transfer") {
      if (!bankName || !accountNumber || !accountName) {
        notifyWarning("Please fill in all bank transfer details.");
        return false;
      }
    }

    return true;
  };

  const handleConfirmPayment = async () => {
    if (!validatePayment()) return;

    const userId = localStorage.getItem("userId");

    try {
      if (userId) {
        const response = await fetch(
          `http://localhost:8080/api/orders/customer/${userId}/from-cart`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ method: selectedMethod }),
          }
        );

        if (response.ok) {
          localStorage.removeItem(`userCart_${userId}`);
        }
      } else {
        localStorage.removeItem("guestCart");
      }
    } catch (err) {
      console.error("Error creating order from cart", err);
    }

    setShowConfirmation(true);
  };

  const handleConfirmationClose = () => {
    setShowConfirmation(false);
    navigate("/catalog");
  };

  const paymentMethods = [
    { name: "Credit/Debit Card", icon: <CreditCardIcon /> },
    { name: "GCash", icon: <SmartphoneIcon /> },
    { name: "Bank Transfer", icon: <BankIcon /> },
  ];

  return (
    <div className="payment-page">
      <Header showNav={true} />

      {loading ? (
        <div className="payment-loading">
          <div className="spinner"></div>
          <p>Loading your order...</p>
        </div>
      ) : (
        <div className="payment-wrapper">
          <div className="payment-container">
            <div className="payment-main">
              {/* Progress Steps */}
              <div className="progress-steps">
                <div className="step completed">
                  <div className="step-number"><CheckIcon /></div>
                  <div className="step-label">Delivery Information</div>
                </div>
                <div className="step-divider completed-divider"></div>
                <div className="step active">
                  <div className="step-number">2</div>
                  <div className="step-label">Payment</div>
                </div>
              </div>

              <h1 className="payment-title">Payment Method</h1>

              {/* Payment Method Selection */}
              <section className="payment-card">
                <div className="card-header">
                  <span className="card-icon"><CreditCardIcon /></span>
                  <h2 className="card-title">Choose Your Payment Method</h2>
                </div>

                <div className="payment-methods-grid">
                  {paymentMethods.map((method) => (
                    <div
                      key={method.name}
                      className={`payment-option ${
                        selectedMethod === method.name ? "selected" : ""
                      }`}
                      onClick={() => setSelectedMethod(method.name)}
                    >
                      <span className="payment-icon">{method.icon}</span>
                      <span className="payment-name">{method.name}</span>
                      {selectedMethod === method.name && (
                        <span className="checkmark"><CheckIcon /></span>
                      )}
                    </div>
                  ))}
                </div>
              </section>

              {/* Payment Form Fields */}
              {selectedMethod === "Credit/Debit Card" && (
                <section className="payment-card">
                  <div className="card-header">
                    <span className="card-icon"><CreditCardIcon /></span>
                    <h2 className="card-title">Card Information</h2>
                  </div>

                  <div className="payment-form">
                    <div className="form-group">
                      <label>
                        <span className="field-icon"><UserIcon /></span>
                        Cardholder Name
                      </label>
                      <input
                        type="text"
                        placeholder="John Doe"
                        value={cardName}
                        onChange={(e) => setCardName(e.target.value)}
                        className="form-input"
                      />
                    </div>

                    <div className="form-group">
                      <label>
                        <span className="field-icon"><CreditCardIcon /></span>
                        Card Number
                      </label>
                      <input
                        type="text"
                        placeholder="1234 5678 9012 3456"
                        value={cardNumber}
                        onChange={(e) => {
                          const formatted = formatCardNumber(e.target.value);
                          if (formatted.replace(/\s/g, "").length <= 16) {
                            setCardNumber(formatted);
                          }
                        }}
                        className="form-input"
                        maxLength={19}
                      />
                    </div>

                    <div className="form-row">
                      <div className="form-group">
                        <label>
                          <span className="field-icon"><CalendarIcon /></span>
                          Expiry Date
                        </label>
                        <input
                          type="text"
                          placeholder="MM/YY"
                          value={expiryDate}
                          onChange={(e) => {
                            const formatted = formatExpiryDate(e.target.value);
                            if (formatted.length <= 5) {
                              setExpiryDate(formatted);
                            }
                          }}
                          className="form-input"
                          maxLength={5}
                        />
                      </div>
                      <div className="form-group">
                        <label>
                          <span className="field-icon"><LockIcon /></span>
                          CVV
                        </label>
                        <input
                          type="text"
                          placeholder="123"
                          value={cvv}
                          onChange={(e) => {
                            const value = e.target.value.replace(/\D/g, "");
                            if (value.length <= 3) setCvv(value);
                          }}
                          className="form-input"
                          maxLength={3}
                        />
                      </div>
                    </div>
                  </div>
                </section>
              )}

              {selectedMethod === "GCash" && (
                <section className="payment-card">
                  <div className="card-header">
                    <span className="card-icon"><SmartphoneIcon /></span>
                    <h2 className="card-title">GCash Information</h2>
                  </div>

                  <div className="payment-form">
                    <div className="form-group">
                      <label>
                        <span className="field-icon"><SmartphoneIcon /></span>
                        Mobile Number
                      </label>
                      <input
                        type="text"
                        placeholder="09XXXXXXXXX"
                        value={gcashNumber}
                        onChange={(e) => {
                          const value = e.target.value.replace(/\D/g, "");
                          if (value.length <= 11) setGcashNumber(value);
                        }}
                        className="form-input"
                        maxLength={11}
                      />
                    </div>

                    <div className="form-group">
                      <label>
                        <span className="field-icon"><UserIcon /></span>
                        Account Name
                      </label>
                      <input
                        type="text"
                        placeholder="Juan Dela Cruz"
                        value={gcashName}
                        onChange={(e) => setGcashName(e.target.value)}
                        className="form-input"
                      />
                    </div>

                    <div className="info-box">
                      <span className="info-icon"><InfoIcon /></span>
                      <p>
                        You will receive a payment prompt on your GCash app to
                        complete this transaction.
                      </p>
                    </div>
                  </div>
                </section>
              )}

              {selectedMethod === "Bank Transfer" && (
                <section className="payment-card">
                  <div className="card-header">
                    <span className="card-icon"><BankIcon /></span>
                    <h2 className="card-title">Bank Transfer Information</h2>
                  </div>

                  <div className="payment-form">
                    <div className="form-group">
                      <label>
                        <span className="field-icon"><BankIcon /></span>
                        Bank Name
                      </label>
                      <select
                        value={bankName}
                        onChange={(e) => setBankName(e.target.value)}
                        className="form-input"
                      >
                        <option value="">Select Bank</option>
                        <option value="BDO">BDO</option>
                        <option value="BPI">BPI</option>
                        <option value="Metrobank">Metrobank</option>
                        <option value="UnionBank">UnionBank</option>
                        <option value="Security Bank">Security Bank</option>
                        <option value="Landbank">Landbank</option>
                        <option value="PNB">PNB</option>
                      </select>
                    </div>

                    <div className="form-group">
                      <label>
                        <span className="field-icon"><NumberIcon /></span>
                        Account Number
                      </label>
                      <input
                        type="text"
                        placeholder="1234567890"
                        value={accountNumber}
                        onChange={(e) => setAccountNumber(e.target.value)}
                        className="form-input"
                      />
                    </div>

                    <div className="form-group">
                      <label>
                        <span className="field-icon"><UserIcon /></span>
                        Account Name
                      </label>
                      <input
                        type="text"
                        placeholder="Juan Dela Cruz"
                        value={accountName}
                        onChange={(e) => setAccountName(e.target.value)}
                        className="form-input"
                      />
                    </div>

                    <div className="info-box">
                      <span className="info-icon"><InfoIcon /></span>
                      <p>
                        Please transfer to our account and upload proof of
                        payment after checkout.
                      </p>
                    </div>
                  </div>
                </section>
              )}

              {/* Promo Code */}
              <section className="payment-card">
                <div className="card-header">
                  <span className="card-icon"><TicketIcon /></span>
                  <h2 className="card-title">Promo Code</h2>
                </div>

                <div className="promo-section">
                  <input
                    type="text"
                    placeholder="Enter promo code"
                    value={promoCode}
                    onChange={(e) => setPromoCode(e.target.value.toUpperCase())}
                    className="promo-input"
                    disabled={appliedPromo}
                  />
                  {!appliedPromo ? (
                    <button onClick={applyPromoCode} className="apply-btn">
                      Apply
                    </button>
                  ) : (
                    <button onClick={removePromoCode} className="remove-promo-btn">
                      Remove
                    </button>
                  )}
                </div>

                {appliedPromo && (
                  <div className="success-notice">
                    <span className="notice-icon"><CheckIcon /></span>
                    <span>Discount code "SAVE10" applied - 10% off!</span>
                  </div>
                )}
              </section>
            </div>

            {/* Order Summary Sidebar */}
            <aside className="payment-summary">
              <div className="summary-header">
                <h2 className="summary-title">Order Summary</h2>
                <span className="items-count">
                  {cartItems.length} {cartItems.length === 1 ? "item" : "items"}
                </span>
              </div>

              {error && <p className="payment-error">{error}</p>}

              {cartItems.length === 0 ? (
                <div className="empty-cart">
                  <span className="empty-icon"><CartIcon /></span>
                  <p>Your cart is empty</p>
                </div>
              ) : (
                <div className="cart-items-list">
                  {cartItems.map((item) => (
                    <div key={item.id} className="cart-item">
                      {item.productImage ? (
                        <img
                          src={item.productImage}
                          alt={item.productName}
                          className="item-image"
                        />
                      ) : (
                        <div className="item-image placeholder">
                          {(item.productName || item.name)?.charAt(0)}
                        </div>
                      )}
                      <div className="item-details">
                        <h4 className="item-name">
                          {item.productName || item.name}
                        </h4>
                        <p className="item-qty">Qty: {item.quantity}</p>
                        <p className="item-price">
                          ₱
                          {(
                            (item.unitPrice || item.price || 0) *
                            (item.quantity || 0)
                          ).toFixed(2)}
                        </p>
                      </div>
                      <button
                        className="remove-btn"
                        onClick={() => removeItem(item.id)}
                      >
                        ×
                      </button>
                    </div>
                  ))}
                </div>
              )}

              <div className="divider"></div>

              <div className="summary-totals">
                <div className="summary-row">
                  <span>Subtotal</span>
                  <span>₱{subtotal.toFixed(2)}</span>
                </div>

                {discount > 0 && (
                  <div className="summary-row discount-row">
                    <span>Discount (10%)</span>
                    <span>-₱{discount.toFixed(2)}</span>
                  </div>
                )}

                <div className="summary-row">
                  <span>Shipping</span>
                  <span className="free-shipping">Free</span>
                </div>

                <div className="divider"></div>

                <div className="summary-total">
                  <span>Total</span>
                  <span>₱{total.toFixed(2)}</span>
                </div>
              </div>

              <div className="summary-actions">
                <button
                  className="btn-secondary"
                  onClick={() => navigate("/checkout")}
                >
                  Back
                </button>
                <button
                  onClick={handleConfirmPayment}
                  className="btn-primary"
                  disabled={cartItems.length === 0}
                >
                  Complete Payment
                </button>
              </div>

              <div className="secure-info">
                <span className="secure-icon"><ShieldIcon /></span>
                <span>Secure payment powered by encryption</span>
              </div>
            </aside>
          </div>
        </div>
      )}

      <ConfirmationModal
        isOpen={showConfirmation}
        onClose={handleConfirmationClose}
        title="Payment Successful!"
        message="Thank you for your purchase. Your order has been confirmed and will be processed shortly."
      />
    </div>
  );
};

export default Payment;