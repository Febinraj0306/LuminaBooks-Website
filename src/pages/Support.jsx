import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { HelpCircle, Truck, RefreshCw, Mail, Phone, MessageSquare, ChevronDown, ChevronUp, Send, Package } from 'lucide-react';
import './Support.css';

const Support = () => {
  const navigate = useNavigate();
  const [activeFaq, setActiveFaq] = useState(null);
  const [formStatus, setFormStatus] = useState('idle');

  const faqs = [
    {
      question: "How long does shipping take?",
      answer: "Standard shipping typically takes 3-7 business days within the continental US. International shipping can take 10-21 business days depending on the destination."
    },
    {
      question: "What is your return policy?",
      answer: "We offer a 30-day return policy for most books in their original condition. Please contact our support team to initiate a return or exchange."
    },
    {
      question: "How can I track my order?",
      answer: "Once your order ships, you will receive a confirmation email with a tracking number and a link to track your package."
    },
    {
      question: "Do you offer digital books?",
      answer: "Currently, we specialize in physical copies. However, we are planning to launch an e-book platform in the near future. Stay tuned!"
    },
    {
      question: "Can I cancel my order?",
      answer: "Orders can be cancelled within 2 hours of placement. After that, the processing begins, and we may not be able to stop the shipment."
    }
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormStatus('submitting');
    setTimeout(() => {
      setFormStatus('success');
      e.target.reset();
    }, 1500);
  };

  const toggleFaq = (index) => {
    setActiveFaq(activeFaq === index ? null : index);
  };

  return (
    <div className="support-page">
      <section className="support-hero">
        <div className="container">
          <h1>How can we help?</h1>
          <p>Find answers to common questions or reach out to our dedicated support team.</p>
        </div>
      </section>

      <div className="container support-content">
        <div className="support-grid">
          {/* Quick Links */}
          <div className="support-sidebar">
            <div className="support-card glass">
              <h3>Contact Info</h3>
              <div className="contact-item">
                <Mail size={20} className="contact-icon" />
                <div>
                  <p className="contact-label">Email us at</p>
                  <p className="contact-value">support@luminabooks.com</p>
                </div>
              </div>
              <div className="contact-item">
                <Phone size={20} className="contact-icon" />
                <div>
                  <p className="contact-label">Call us</p>
                  <p className="contact-value">+1 (555) 123-4567</p>
                </div>
              </div>
              <div className="contact-item">
                <MessageSquare size={20} className="contact-icon" />
                <div>
                  <p className="contact-label">Live Chat</p>
                  <p className="contact-value">Available Mon-Fri, 9am-6pm</p>
                </div>
              </div>
            </div>

            <div className="support-card glass shipping-info">
              <h3>Shipping & Returns</h3>
              <div className="info-item">
                <Truck size={24} className="info-icon" />
                <div>
                  <h4>Fast Delivery</h4>
                  <p>Reliable shipping partners worldwide.</p>
                </div>
              </div>
              <div className="info-item">
                <RefreshCw size={24} className="info-icon" />
                <div>
                  <h4>Easy Returns</h4>
                  <p>30-day hassle-free return policy.</p>
                </div>
              </div>
            </div>
          </div>

          <div className="support-main">
            {/* FAQs */}
            <div className="faq-section">
              <div className="section-header">
                <HelpCircle size={28} className="section-icon" />
                <h2>Frequently Asked Questions</h2>
              </div>
              <div className="faq-list">
                {faqs.map((faq, index) => (
                  <div 
                    key={index} 
                    className={`faq-item ${activeFaq === index ? 'active' : ''}`}
                    onClick={() => toggleFaq(index)}
                  >
                    <div className="faq-question">
                      <span>{faq.question}</span>
                      {activeFaq === index ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                    </div>
                    {activeFaq === index && (
                      <div className="faq-answer">
                        <p>{faq.answer}</p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Contact Form */}
            <div className="contact-form-section glass">
              <div className="section-header">
                <Mail size={28} className="section-icon" />
                <h2>Send us a Message</h2>
              </div>
              <form onSubmit={handleSubmit} className="contact-form">
                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="name">Full Name</label>
                    <input type="text" id="name" required placeholder="John Doe" />
                  </div>
                  <div className="form-group">
                    <label htmlFor="email">Email Address</label>
                    <input type="email" id="email" required placeholder="john@example.com" />
                  </div>
                </div>
                <div className="form-group">
                  <label htmlFor="subject">Subject</label>
                  <select id="subject" required>
                    <option value="">Select a reason</option>
                    <option value="order">Order Status</option>
                    <option value="return">Returns & Exchanges</option>
                    <option value="product">Product Inquiry</option>
                    <option value="general">General Support</option>
                  </select>
                </div>
                <div className="form-group">
                  <label htmlFor="message">Message</label>
                  <textarea id="message" required rows="5" placeholder="How can we help you?"></textarea>
                </div>
                <button 
                  type="submit" 
                  className={`btn btn-primary submit-btn ${formStatus}`}
                  disabled={formStatus === 'submitting'}
                >
                  {formStatus === 'submitting' ? 'Sending...' : (
                    formStatus === 'success' ? 'Message Sent!' : (
                      <>
                        Send Message <Send size={18} style={{ marginLeft: '8px' }} />
                      </>
                    )
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Support;
