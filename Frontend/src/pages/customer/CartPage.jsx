import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/Header';
import '../../styles/customer/CartPage.css';
import backImg from '../../assets/icons/common/arrow-left.svg';

// Inline Trash Icon
const TrashIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="3 6 5 6 21 6"></polyline>
    <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
  </svg>
);

export default function CartPage() {
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // --- Logic Helpers ---
  const getCurrentUser = () => {
    const userData = localStorage.getItem('user');
    return userData ? JSON.parse(userData) : null;
  };

  const getGuestCart = () => {
    const guestCart = localStorage.getItem('guestCart');
    return guestCart ? JSON.parse(guestCart) : [];
  };

  const saveGuestCart = (items) => {
    localStorage.setItem('guestCart', JSON.stringify(items));
  };

  const fetchCartItems = async () => {
    const user = getCurrentUser();
    if (user) {
      try {
        const response = await fetch(`http://localhost:8080/api/cart/customer/${user.id}/items`);
        if (response.ok) {
          const items = await response.json();
          setCartItems(items);
        }
      } catch (err) { setError('Error connecting to server'); } 
      finally { setLoading(false); }
    } else {
      const guestCart = getGuestCart();
      setCartItems(guestCart);
      setLoading(false);
    }
  };

  const handleRemove = async (itemId) => {
    const user = getCurrentUser();
    if (user) {
      await fetch(`http://localhost:8080/api/cart/customer/${user.id}/items/${itemId}`, { method: 'DELETE' });
      setCartItems(cartItems.filter(item => item.id !== itemId));
    } else {
      const updated = cartItems.filter(item => item.id !== itemId);
      setCartItems(updated);
      saveGuestCart(updated);
    }
  };

  const updateQuantity = async (itemId, newQuantity) => {
    if (newQuantity < 1) return;
    const user = getCurrentUser();
    
    if (user) {
      const response = await fetch(`http://localhost:8080/api/cart/customer/${user.id}/items/${itemId}?quantity=${newQuantity}`, { method: 'PUT' });
      if (response.ok) {
        setCartItems(cartItems.map(item => item.id === itemId ? { ...item, quantity: newQuantity } : item));
      }
    } else {
      const updated = cartItems.map(item => item.id === itemId ? { ...item, quantity: newQuantity } : item);
      setCartItems(updated);
      saveGuestCart(updated);
    }
  };

  const handleCheckout = () => {
    if (cartItems.length === 0) return;
    navigate('/payment');
  };

  const grandTotal = cartItems.reduce((total, item) => total + ((item.unitPrice || item.price) * item.quantity), 0);

  useEffect(() => { fetchCartItems(); }, []);

  if (loading) return <div className="cart-page"><Header showNav={true} /><div className="loading">Loading...</div></div>;

  const user = getCurrentUser();

  return (
    <div className="cart-page">
      <Header showNav={true} />

      {/* Main Container */}
      <div className="cart-container">
        
        {/* Header: Back Button + Title */}
        <div className="cart-header">
          <button className="back-btn-cart" onClick={() => navigate(-1)}>
            <img src={backImg} alt="Back" className="back-btn-cart" />
          </button>
          <h2>Your Cart</h2>
        </div>

        {cartItems.length === 0 ? (
          <div className="empty-cart">
            <p>Your cart is empty.</p>
          </div>
        ) : (
          <>
            <div className="cart-list">
              {/* Guest Notice */}
              {!user && (
                <div className="guest-notice">
                  <span>
                    🛒 You are shopping as a Guest. <span className="login-link" onClick={() => navigate('/login')}>Login</span> to proceed to checkout.
                  </span>
                </div>
              )}

              {/* Cart Items */}
              {cartItems.map(item => (
                <div key={item.id} className="cart-card">
                  <div className="card-image">
                    {item.productImage ? (
                      <img 
                        src={item.productImage} 
                        alt={item.productName}
                        className="product-image"
                      />
                    ) : (
                      <div className="placeholder-img">
                        {item.productName?.charAt(0)}
                      </div>
                    )}
                  </div>
                  <div className="card-details">
                    <div className="details-top">
                      <h3>{item.productName}</h3>
                      <p className="item-size">Size: {item.size || 'Onesize'}</p>
                    </div>
                    <div className="quantity-wrapper">
                      <button onClick={() => updateQuantity(item.id, item.quantity - 1)} disabled={item.quantity <= 1}>−</button>
                      <span>{item.quantity}</span>
                      <button onClick={() => updateQuantity(item.id, item.quantity + 1)}>+</button>
                    </div>
                  </div>
                  <div className="card-actions">
                    <div className="item-price">₱{((item.unitPrice || item.price) * item.quantity).toFixed(2)}</div>
                    <button className="delete-btn-icon" onClick={() => handleRemove(item.id)}>
                      <TrashIcon />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Footer Summary */}
            <div className="cart-footer-summary">
              <div className="total-row">
                <span>Grand Total:</span>
                <span className="total-price">₱{grandTotal.toFixed(2)}</span>
              </div>
              
              {/* Only show checkout if user is logged in */}
              {user ? (
                <button className="checkout-btn-large" onClick={handleCheckout}>
                  Proceed to Checkout
                </button>
              ) 
              : (<div className="login-prompt">
                  <span>Please login to proceed to checkout.</span>
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
}