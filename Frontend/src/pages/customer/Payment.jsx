import React, { useState } from "react";
import Header from "../../components/Header";
import "../../styles/customer/payment.css";

const Payment = () => {
  const [selectedMethod, setSelectedMethod] = useState("");
  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      name: "Wireless Headphones",
      quantity: 2,
      price: 499.99,
      color: "Black",
      image: "https://via.placeholder.com/60"
    },
    {
      id: 2,
      name: "Bluetooth Speaker",
      quantity: 1,
      price: 499.99,
      color: "Red",
      image: "https://via.placeholder.com/60"
    }
  ]);
  const [promoCode, setPromoCode] = useState("");
  const shipping = 150;

  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const discount = promoCode === "SAVE10" ? subtotal * 0.1 : 0;
  const total = subtotal + shipping - discount;

  const removeItem = (id) => {
    setCartItems(cartItems.filter((item) => item.id !== id));
  };

  const paymentMethods = ["Credit/Debit Card", "PayPal", "GCash", "Bank Transfer"];

  return (
    <div className="payment-page">
      <Header showNav={true} />

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
        </div>

        {/* Right Side: Order Summary */}
        <div className="payment-right">
          <h2 className="summary-title">Order Summary</h2>

          {cartItems.map((item) => (
            <div key={item.id} className="summary-item">
              <div className="item-info">
                <img src={item.image} alt={item.name} className="item-img" />
                <div>
                  <div className="item-name">{item.name}</div>
                  <div className="item-desc">
                    Qty: {item.quantity} | Color: {item.color}
                  </div>
                </div>
              </div>
              <div className="item-right">
                <div className="item-price">₱{(item.price * item.quantity).toFixed(2)}</div>
                <button className="remove-btn" onClick={() => removeItem(item.id)}>×</button>
              </div>
            </div>
          ))}

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
            <span>₱{shipping.toFixed(2)}</span>
          </div>
          <hr />
          <div className="summary-total">
            <span>Total</span>
            <span>₱{total.toFixed(2)}</span>
          </div>
          <button className="btn-pay">Pay Now</button>
        </div>
      </div>
    </div>
  );
};

export default Payment;
