import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { ShoppingCart, BookOpen, Menu, X, Search } from 'lucide-react';
import { useCart } from '../context/CartContext';
import './Navbar.css';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const { currentCartCount } = useCart();
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsMenuOpen(false);
  }, [location]);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      navigate(`/books?search=${encodeURIComponent(searchTerm.trim())}`);
      setSearchTerm('');
    }
  };

  return (
    <nav className={`navbar ${isScrolled ? 'scrolled' : ''}`}>
      <div className="container nav-content">
        <Link to="/" className="nav-brand">
          <BookOpen className="brand-icon" />
          <span>Lumina Books</span>
        </Link>
        
        <div className={`nav-links ${isMenuOpen ? 'open' : ''}`}>
          <div className="mobile-search-wrapper">
            <form onSubmit={handleSearch} className="nav-search-bar mobile-only">
              <input 
                type="text" 
                placeholder="Search books..." 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="nav-search-input"
              />
              <button type="submit" className="nav-search-btn" aria-label="Submit Search">
                <Search size={18} />
              </button>
            </form>
          </div>
          <Link to="/" className={`nav-link ${location.pathname === '/' ? 'active' : ''}`}>Home</Link>
          <Link to="/books" className={`nav-link ${location.pathname === '/books' ? 'active' : ''}`}>Catalog</Link>
          <Link to="/track-order" className={`nav-link ${location.pathname === '/track-order' ? 'active' : ''}`}>Track Order</Link>
          <Link to="/support" className={`nav-link ${location.pathname === '/support' ? 'active' : ''}`}>Support</Link>
          <div className="nav-dropdown-mobile">
            <Link to="/books?subject=fiction" className="nav-link">Fiction</Link>
            <Link to="/books?subject=science" className="nav-link">Science</Link>
            <Link to="/books?subject=history" className="nav-link">History</Link>
          </div>
        </div>

        <div className="nav-actions">
          <form onSubmit={handleSearch} className="nav-search-bar desktop-only">
            <input 
              type="text" 
              placeholder="Search books..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="nav-search-input"
            />
            <button type="submit" className="nav-search-btn" aria-label="Submit Search">
              <Search size={18} />
            </button>
          </form>
          
          <Link to="/cart" className="action-btn cart-btn" aria-label="Cart">
            <ShoppingCart size={22} />
            {currentCartCount > 0 && (
              <span className="cart-badge">{currentCartCount}</span>
            )}
          </Link>

          <button 
            className="mobile-toggle"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
