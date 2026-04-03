import React from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, Mail } from 'lucide-react';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container footer-content">
        <div className="footer-brand-section">
          <Link to="/" className="footer-brand">
            <BookOpen className="brand-icon" />
            <span>Lumina Books</span>
          </Link>
          <p className="footer-desc">
            Discover your next great read. We offer a carefully curated collection of fiction, non-fiction, and everything in between.
          </p>
          <div className="social-links">
            {/* Social icons commented out, lucide-react no longer exports brand icons like Twitter/Facebook */}
            <a href="https://mail.google.com/mail/u/febinraj321@gmail.com/" aria-label="Email"><Mail size={20} /></a>
          </div>
        </div>

        <div className="footer-links-section">
          <div className="link-group">
            <h3>Explore</h3>
            <Link to="/">Home</Link>
            <Link to="/books">Catalog</Link>
            <Link to="/books?subject=fiction">Fiction</Link>
            <Link to="/books?subject=science">Science</Link>
            <Link to="/books?subject=history">History</Link>
            <Link to="/books?subject=business">Business</Link>
            <Link to="/books?subject=romance">Romance</Link>
            <Link to="/books?subject=comics">Comics</Link>
            <Link to="/books?subject=psychology">Psychology</Link>
          </div>

          <div className="link-group">
            <h3>Support</h3>
            <Link to="/support">FAQ</Link>
            <Link to="/support">Support Center</Link>
            <Link to="/track-order">Track My Order</Link>
            <Link to="/support">Shipping & Returns</Link>
          </div>

          <div className="link-group">
            <h3>Legal</h3>
            <Link to="#">Terms of Service</Link>
            <Link to="#">Privacy Policy</Link>
            <Link to="#">Cookie Policy</Link>
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} Lumina Books. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
