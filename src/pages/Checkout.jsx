import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { CheckCircle, ShieldCheck } from 'lucide-react';
import { useCart } from '../context/CartContext';
import './Checkout.css';

const Checkout = () => {
  const { cart, cartTotal, clearCart } = useCart();
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const totalAmount = cartTotal + 4.99 + (cartTotal * 0.08);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
      clearCart();
    }, 2000);
  };

  if (cart.length === 0 && !isSuccess) {
    return (
      <div className="checkout-page empty-checkout">
        <div className="container" style={{ textAlign: 'center', padding: '5rem 0' }}>
          <h2>You have no items to checkout.</h2>
          <Link to="/books" className="btn btn-primary mt-4">Return to Shop</Link>
        </div>
      </div>
    );
  }

  if (isSuccess) {
    const orderId = `ORD-${Math.floor(Math.random() * 900000) + 100000}`;
    return (
      <div className="checkout-page success-state">
        <div className="container success-container glass">
          <CheckCircle size={80} className="success-icon" />
          <h1>Order Confirmed!</h1>
          <p className="order-number">Order #{orderId}</p>
          <p className="success-message">
            Thank you for your purchase. We've sent an order confirmation to your email.
            Your books will be shipped shortly.
          </p>
          <div className="success-actions">
            <button onClick={() => navigate(`/order-status/${orderId}`)} className="btn btn-primary">
              Track My Order
            </button>
            <button onClick={() => navigate('/')} className="btn btn-outline">
              Continue Shopping
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="checkout-page">
      <div className="container">
        <h1 className="checkout-title">Secure Checkout</h1>
        
        <div className="checkout-grid">
          {/* Form Section */}
          <div className="checkout-form-section">
            <form onSubmit={handleSubmit} className="checkout-form">
              {/* Shipping Information */}
              <div className="form-section glass">
                <h2>Shipping Information</h2>
                <div className="form-row two-cols">
                  <div className="form-group">
                    <label>First Name</label>
                    <input type="text" required placeholder="Jane" />
                  </div>
                  <div className="form-group">
                    <label>Last Name</label>
                    <input type="text" required placeholder="Doe" />
                  </div>
                </div>
                
                <div className="form-group">
                  <label>Email Address</label>
                  <input type="email" required placeholder="jane.doe@example.com" />
                </div>
                
                <div className="form-group">
                  <label>Street Address</label>
                  <input type="text" required placeholder="123 Bookstore Ave" />
                </div>
                
                <div className="form-row three-cols">
                  <div className="form-group">
                    <label>City</label>
                    <input type="text" required placeholder="New York" />
                  </div>
                  <div className="form-group">
                    <label>State</label>
                    <input type="text" required placeholder="NY" />
                  </div>
                  <div className="form-group">
                    <label>ZIP Code</label>
                    <input type="text" required placeholder="10001" />
                  </div>
                </div>
              </div>

              {/* Payment Information */}
              <div className="form-section glass">
                <h2>Payment Details</h2>
                <div className="secure-badge">
                  <ShieldCheck size={18} />
                  <span>256-bit Secure Encryption</span>
                </div>
                
                <div className="form-group">
                  <label>Name on Card</label>
                  <input type="text" required placeholder="JANE DOE" />
                </div>
                
                <div className="form-group">
                  <label>Card Number</label>
                  <input type="text" required placeholder="XXXX XXXX XXXX XXXX" maxLength="19" />
                </div>
                
                <div className="form-row two-cols">
                  <div className="form-group">
                    <label>Expiration Date</label>
                    <input type="text" required placeholder="MM/YY" maxLength="5" />
                  </div>
                  <div className="form-group">
                    <label>CVC</label>
                    <input type="text" required placeholder="123" maxLength="4" />
                  </div>
                </div>
              </div>

              <button 
                type="submit" 
                className="btn btn-primary checkout-submit-btn"
                disabled={isSubmitting}
              >
                {isSubmitting ? <span className="loader-small"></span> : `Pay $${totalAmount.toFixed(2)}`}
              </button>
            </form>
          </div>

          {/* Order Summary Sidebar */}
          <div className="checkout-sidebar">
            <div className="order-summary glass">
              <h2>Order Summary</h2>
              <div className="summary-items">
                {cart.map((item) => (
                  <div key={item.id} className="summary-item">
                    <div className="si-image">
                      <img src={item.image || 'https://via.placeholder.com/40x60'} alt={item.title} />
                      <span className="si-qty">{item.quantity}</span>
                    </div>
                    <div className="si-details">
                      <p className="si-title" title={item.title}>{item.title}</p>
                      <p className="si-price">${(item.price * item.quantity).toFixed(2)}</p>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="summary-totals">
                <div className="st-row">
                  <span>Subtotal</span>
                  <span>${cartTotal.toFixed(2)}</span>
                </div>
                <div className="st-row">
                  <span>Shipping</span>
                  <span>$4.99</span>
                </div>
                <div className="st-row">
                  <span>Taxes (8%)</span>
                  <span>${(cartTotal * 0.08).toFixed(2)}</span>
                </div>
                <div className="st-total">
                  <span>Total</span>
                  <span>${totalAmount.toFixed(2)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
