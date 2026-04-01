import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Trash2, ArrowRight, BookOpen } from 'lucide-react';
import { useCart } from '../context/CartContext';
import './Cart.css';

const Cart = () => {
  const { cart, removeFromCart, updateQuantity, cartTotal, currentCartCount } = useCart();
  const navigate = useNavigate();

  if (cart.length === 0) {
    return (
      <div className="cart-page empty-cart-wrapper">
        <div className="container empty-cart">
          <BookOpen size={64} className="empty-cart-icon" />
          <h2>Your cart is empty</h2>
          <p>Looks like you haven't added any books yet.</p>
          <Link to="/books" className="btn btn-primary mt-4">
            Start Browsing
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="cart-page">
      <div className="container">
        <h1 className="cart-title">Your Cart <span>({currentCartCount} items)</span></h1>
        
        <div className="cart-grid">
          {/* Cart Items */}
          <div className="cart-items">
            <div className="cart-items-list">
              {cart.map((item) => (
                <div key={item.id} className="cart-item">
                  <Link to={`/books/${item.id}`} className="cart-item-image">
                    <img 
                      src={item.image || 'https://via.placeholder.com/80x120?text=No+Cover'} 
                      alt={item.title} 
                    />
                  </Link>
                  
                  <div className="cart-item-details">
                    <Link to={`/books/${item.id}`} className="item-title">
                      {item.title}
                    </Link>
                    <p className="item-price">${item.price}</p>
                    
                    <div className="item-actions">
                      <div className="quantity-controls">
                        <button 
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          disabled={item.quantity <= 1}
                        >-</button>
                        <span>{item.quantity}</span>
                        <button onClick={() => updateQuantity(item.id, item.quantity + 1)}>+</button>
                      </div>
                      
                      <button 
                        className="remove-btn" 
                        onClick={() => removeFromCart(item.id)}
                        aria-label="Remove item"
                      >
                        <Trash2 size={18} /> Remove
                      </button>
                    </div>
                  </div>
                  
                  <div className="item-total-price">
                    ${(item.price * item.quantity).toFixed(2)}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Cart Summary */}
          <div className="cart-summary-wrapper">
            <div className="cart-summary glass">
              <h2>Order Summary</h2>
              
              <div className="summary-row">
                <span>Subtotal ({currentCartCount} items)</span>
                <span>${cartTotal.toFixed(2)}</span>
              </div>
              <div className="summary-row">
                <span>Shipping</span>
                <span>$4.99</span>
              </div>
              <div className="summary-row">
                <span>Tax</span>
                <span>${(cartTotal * 0.08).toFixed(2)}</span>
              </div>
              
              <div className="summary-total">
                <span>Total</span>
                <span>${(cartTotal + 4.99 + (cartTotal * 0.08)).toFixed(2)}</span>
              </div>
              
              <button 
                className="btn btn-primary checkout-btn"
                onClick={() => navigate('/checkout')}
              >
                Proceed to Checkout <ArrowRight size={20} />
              </button>
              
              <Link to="/books" className="continue-shopping">
                or Continue Shopping
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
