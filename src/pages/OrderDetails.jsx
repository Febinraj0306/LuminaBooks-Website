import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { CheckCircle, Package, Truck, Home, Calendar, MapPin, Clock } from 'lucide-react';
import './OrderDetails.css';

const OrderDetails = () => {
  const { orderId } = useParams();
  const [loading, setLoading] = useState(true);
  const [order, setOrder] = useState(null);

  useEffect(() => {
    // Simulate fetching order details
    const timer = setTimeout(() => {
      setOrder({
        id: orderId || 'ORD-842931',
        date: new Date().toLocaleDateString(),
        status: 'shipped', // processing, shipped, out-for-delivery, delivered
        estimatedDelivery: 'April 5, 2026',
        address: '123 Bookstore Ave, New York, NY 10001',
        items: [
          { id: 1, title: 'The Great Gatsby', price: 15.99, quantity: 1, image: 'https://books.google.com/books/content?id=ZY9CAAAAIAAJ&printsec=frontcover&img=1&zoom=1&source=gbs_api' },
          { id: 2, title: '1984', price: 12.50, quantity: 2, image: 'https://books.google.com/books/content?id=kotPYEqx7mcC&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api' }
        ],
        total: 45.98
      });
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, [orderId]);

  if (loading) {
    return (
      <div className="order-details-loading">
        <div className="loader"></div>
        <p>Retrieving order details...</p>
      </div>
    );
  }

  const statuses = [
    { key: 'processing', label: 'Processing', icon: <Package size={24} />, description: 'Your order is being prepared' },
    { key: 'shipped', label: 'Shipped', icon: <Truck size={24} />, description: 'On its way to you' },
    { key: 'out-for-delivery', label: 'Out for Delivery', icon: <MapPin size={24} />, description: 'Will arrive today' },
    { key: 'delivered', label: 'Delivered', icon: <Home size={24} />, description: 'Enjoy your books!' }
  ];

  const currentStatusIndex = statuses.findIndex(s => s.key === order.status);

  return (
    <div className="order-details-page">
      <div className="container">
        <div className="order-header">
          <div className="order-title-section">
            <h1>Order Status</h1>
            <p className="order-id">ID: {order.id}</p>
          </div>
          <div className="order-meta">
            <span className="order-date"><Calendar size={16} /> Placed on {order.date}</span>
          </div>
        </div>

        <div className="order-grid">
          {/* Status Timeline */}
          <div className="order-main">
            <div className="status-card glass">
              <div className="status-timeline">
                {statuses.map((status, index) => (
                  <div 
                    key={status.key} 
                    className={`status-step ${index <= currentStatusIndex ? 'completed' : ''} ${index === currentStatusIndex ? 'active' : ''}`}
                  >
                    <div className="status-icon-wrapper">
                      {index < currentStatusIndex ? <CheckCircle size={24} className="done-icon" /> : status.icon}
                    </div>
                    <div className="status-info">
                      <h3>{status.label}</h3>
                      <p>{status.description}</p>
                    </div>
                    {index < statuses.length - 1 && <div className="status-line"></div>}
                  </div>
                ))}
              </div>
            </div>

            <div className="shipping-info-card glass">
              <div className="info-section">
                <div className="info-header">
                  <MapPin size={20} className="info-icon" />
                  <h2>Delivery Address</h2>
                </div>
                <p>{order.address}</p>
              </div>
              <div className="info-section border-left">
                <div className="info-header">
                  <Clock size={20} className="info-icon" />
                  <h2>Estimated Arrival</h2>
                </div>
                <p className="delivery-date">{order.estimatedDelivery}</p>
              </div>
            </div>

            <div className="order-items-card glass">
              <h2>Order Summary</h2>
              <div className="order-items-list">
                {order.items.map(item => (
                  <div key={item.id} className="order-item">
                    <img src={item.image} alt={item.title} className="item-image" />
                    <div className="item-details">
                      <h3>{item.title}</h3>
                      <p>Quantity: {item.quantity}</p>
                    </div>
                    <p className="item-price">${(item.price * item.quantity).toFixed(2)}</p>
                  </div>
                ))}
              </div>
              <div className="order-total-section">
                <div className="total-row">
                  <span>Subtotal</span>
                  <span>${(order.total - 9.99).toFixed(2)}</span>
                </div>
                <div className="total-row">
                  <span>Shipping & Handling</span>
                  <span>$9.99</span>
                </div>
                <div className="total-row grand-total">
                  <span>Total</span>
                  <span>${order.total.toFixed(2)}</span>
                </div>
              </div>
            </div>
          </div>

          <div className="order-sidebar">
            <div className="help-card glass">
              <h3>Need Help?</h3>
              <p>Having issues with your delivery? Our support team is here to help.</p>
              <Link to="/support" className="btn btn-outline full-width">Contact Support</Link>
              <Link to="/books" className="btn btn-primary full-width mt-3">Continue Shopping</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetails;
