import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Search, Package, CheckCircle, Clock, ArrowRight, BookOpen } from 'lucide-react';
import './TrackOrder.css';

const TrackOrder = () => {
  const [orderId, setOrderId] = useState('');
  const navigate = useNavigate();

  const handleTrack = (e) => {
    e.preventDefault();
    if (orderId.trim()) {
      navigate(`/order-status/${orderId.trim()}`);
    }
  };

  const recentTracking = [
    { id: 'ORD-842931', status: 'Shipped', date: 'April 1, 2026' },
    { id: 'ORD-552109', status: 'Processing', date: 'March 31, 2026' }
  ];

  return (
    <div className="track-order-page">
      <div className="container">
        <div className="track-hero glass">
          <div className="hero-badge">
            <Package size={20} />
            <span>Order Tracking</span>
          </div>
          <h1>Where is my Lumina parcel?</h1>
          <p>Get real-time updates on your book shipments. Just enter your order ID below.</p>
          
          <form className="track-main-form" onSubmit={handleTrack}>
            <div className="track-input-wrapper">
              <Search className="search-icon" size={24} />
              <input 
                type="text" 
                placeholder="Enter Order ID (e.g. ORD-123456)" 
                value={orderId}
                onChange={(e) => setOrderId(e.target.value)}
                required
              />
            </div>
            <button type="submit" className="btn btn-primary track-hero-btn">
              Track Now <ArrowRight size={20} />
            </button>
          </form>
          
          <div className="track-tips">
            <div className="tip">
              <Clock size={16} />
              <span>Free 3-7 day shipping</span>
            </div>
            <div className="tip">
              <CheckCircle size={16} />
              <span>Real-time tracking</span>
            </div>
            <div className="tip">
              <BookOpen size={16} />
              <span>Over 1M titles available</span>
            </div>
          </div>
        </div>

        <div className="track-history-section">
          <h2>Recent Searches</h2>
          <div className="history-grid">
            {recentTracking.map((item) => (
              <div 
                key={item.id} 
                className="history-card glass" 
                onClick={() => navigate(`/order-status/${item.id}`)}
              >
                <div className="history-info">
                  <span className="history-id">{item.id}</span>
                  <span className="history-date">Looked up on {item.date}</span>
                </div>
                <div className="history-status">
                  <span className={`status-badge ${item.status.toLowerCase()}`}>{item.status}</span>
                  <ArrowRight size={18} />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="track-help-section glass">
          <div className="help-content">
            <h3>Can't find your Order ID?</h3>
            <p>You can find your unique order ID in the confirmation email we sent automatically after your purchase. If you still have trouble, our support team is ready to help.</p>
          </div>
          <Link to="/support" className="btn btn-outline">
            Visit Support Center
          </Link>
        </div>
      </div>
    </div>
  );
};

export default TrackOrder;
