import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../../components/Header";
import ConfirmationModal from "../../components/ConfirmationModal";
import "../../styles/customer/payment.css";

const Payment = () => {
  const navigate = useNavigate();

  const [selectedMethod, setSelectedMethod] = useState("");
  const [cardName, setCardName] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [cartItems, setCartItems] = useState([]);
  const [promoCode, setPromoCode] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showConfirmation, setShowConfirmation] = useState(false);

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
        // Guest flow: use local guest cart only
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

  const shipping = 0; // Free for now, consistent with checkout

  const subtotal = cartItems.reduce(
    (sum, item) =>
      sum + ((item.unitPrice || item.price || 0) * (item.quantity || 0)),
    0
  );
  const discount = promoCode === "SAVE10" ? subtotal * 0.1 : 0;
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
      // Guest: update local guestCart
      const updated = cartItems.filter((item) => item.id !== id);
      setCartItems(updated);
      localStorage.setItem("guestCart", JSON.stringify(updated));
    }
  };

  const paymentMethods = ["Credit/Debit Card", "PayPal", "GCash", "Bank Transfer"];

  const handleConfirmPayment = async () => {
    if (!selectedMethod) {
      alert("Please select a payment method.");
      return;
    }

    // Static demo: just require some basic text inputs when card is selected
    if (selectedMethod === "Credit/Debit Card") {
      if (!cardName || !cardNumber) {
        alert("Please enter card holder name and card number (demo only).");
        return;
      }
    }

    const userId = localStorage.getItem("userId");

    try {
      if (userId) {
        const response = await fetch(
          `http://localhost:8080/api/orders/customer/${userId}/from-cart`,
          { 
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ method: selectedMethod })
          }
        );
        
        if (response.ok) {
          // Clear local cart backup after successful order
          localStorage.removeItem(`userCart_${userId}`);
        }
      } else {
        // Guest: clear guest cart
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

  return (
    <div className="payment-page">
      <Header showNav={true} />

      {loading ? (
        <div className="payment-loading">Loading your order...</div>
      ) : (
      <div className="payment-card">
        {/* Left Side: Payment Method */}
        <div className="payment-left">
          <h2 className="payment-title">Choose Payment Method</h2>
          <div className="payment-methods">
            {paymentMethods.map((method) => (
              <div
                key={method}
                className={`payment-option ${selectedMethod === method ? "selected" : ""}`}
                onClick={() => setSelectedMethod(method)}
              >
                {method}
              </div>
            ))}
          </div>

          {/* Promo Code */}
          <div className="promo-box">
            <input
              type="text"
              placeholder="Enter Promo Code"
              value={promoCode}
              onChange={(e) => setPromoCode(e.target.value)}
            />
          </div>

          {/* Simple static payment details (for card) */}
          {selectedMethod === "Credit/Debit Card" && (
            <div className="card-details-box">
              <input
                type="text"
                placeholder="Card holder name (demo only)"
                value={cardName}
                onChange={(e) => setCardName(e.target.value)}
              />
              <input
                type="text"
                placeholder="Card number (demo only)"
                value={cardNumber}
                onChange={(e) => setCardNumber(e.target.value)}
              />
            </div>
          )}
        </div>

        {/* Right Side: Order Summary */}
        <div className="payment-right">
          <h2 className="summary-title">Order Summary</h2>

          {error && (
            <p className="payment-error">{error}</p>
          )}

          {cartItems.length === 0 ? (
            <p className="empty-payment-cart">No items in your cart.</p>
          ) : (
            cartItems.map((item) => (
              <div key={item.id} className="summary-item">
                <div className="item-info">
                  {item.productImage ? (
                    <img
                      src={item.productImage}
                      alt={item.productName}
                      className="item-img"
                    />
                  ) : (
                    <div className="item-img placeholder">
                      {item.productName?.charAt(0)}
                    </div>
                  )}
                  <div>
                    <div className="item-name">{item.productName || item.name}</div>
                    <div className="item-desc">
                      Qty: {item.quantity} {item.size ? `| Size: ${item.size}` : ""}
                    </div>
                  </div>
                </div>
                <div className="item-right">
                  <div className="item-price">
                    ₱{((item.unitPrice || item.price || 0) * (item.quantity || 0)).toFixed(2)}
                  </div>
                  <button className="remove-btn" onClick={() => removeItem(item.id)}>×</button>
                </div>
              </div>
            ))
          )}

          <hr />
          <div className="summary-item">
            <span>Subtotal</span>
            <span>₱{subtotal.toFixed(2)}</span>
          </div>
          {discount > 0 && (
            <div className="summary-item discount">
              <span>Discount</span>
              <span>-₱{discount.toFixed(2)}</span>
            </div>
          )}
          <div className="summary-item">
            <span>Shipping Fee</span>
            <span>{shipping === 0 ? "Free" : `₱${shipping.toFixed(2)}`}</span>
          </div>
          <hr />
          <div className="summary-total">
            <span>Total</span>
            <span>₱{total.toFixed(2)}</span>
          </div>
          <button type="button" className="btn-pay" onClick={handleConfirmPayment}>
            Pay Now
          </button>
        </div>
      </div>
      )}

      <ConfirmationModal 
        isOpen={showConfirmation}
        onClose={handleConfirmationClose}
        title="Payment Confirmed"
        message="Thank you for your purchase! Your order has been placed successfully."
      />
    </div>
  );
};

export default Payment;
