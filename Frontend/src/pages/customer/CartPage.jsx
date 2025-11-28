import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import Header from '../../components/Header';
import '../../styles/customer/CartPage.css';

export default function CartPage() {
  const navigate = useNavigate();

  // Example cart state (replace with context or backend integration later)
  const [cartItems, setCartItems] = useState([
    // Example structure:
    // { id: 1, name: 'Barong Tagalog', price: 1000, quantity: 1, image: '/imgs/barong.jpg' }
  ]);

  const handleRemove = (id) => {
    setCartItems(cartItems.filter(item => item.id !== id));
  };

  const handleCheckout = () => {
    navigate('/payment'); // ✅ goes to your Payment page
  };

  return (
    <div className="cart-page">
      <Header showNav={true} />

      <div className="cart-header">
        <button className="back-btn" onClick={() => navigate(-1)}>
          ← Back
        </button>
        <h2>Your Cart</h2>
      </div>

      {cartItems.length === 0 ? (
        <div className="empty-cart">
          <p>Your cart is empty.</p>
          <button 
            className="go-shopping-btn" 
            onClick={() => navigate('/catalog')}
          >
            Go Shopping
          </button>
        </div>
      ) : (
        <div className="cart-content">
          {cartItems.map(item => (
            <div key={item.id} className="cart-item">
              <img src={item.image} alt={item.name} className="cart-item-image" />
              <div className="cart-item-details">
                <h3>{item.name}</h3>
                <p>₱{item.price}</p>
                <p>Quantity: {item.quantity}</p>
              </div>
              <button className="remove-btn" onClick={() => handleRemove(item.id)}>Remove</button>
            </div>
          ))}

          <div className="cart-footer">
            <h3>
              Total: ₱{cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0)}
            </h3>
            <button className="checkout-btn" onClick={handleCheckout}>Checkout</button>
          </div>
        </div>
      )}
    </div>
  );
}
