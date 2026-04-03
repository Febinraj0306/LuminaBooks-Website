import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Star, Minus, Square, X, Monitor } from 'lucide-react';
import { fetchBooks } from '../api';
import './Home.css';

const WinTitleBar = ({ title, icon }) => (
  <div className="section-titlebar">
    <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
      {icon && <span style={{ fontSize: '10px', lineHeight: 1 }}>{icon}</span>}
      <span>{title}</span>
    </div>
    <div className="section-titlebar-btns">
      <button className="section-titlebar-btn" aria-label="Minimize">_</button>
      <button className="section-titlebar-btn" aria-label="Restore">□</button>
      <button className="section-titlebar-btn" aria-label="Close" style={{ fontWeight: 900 }}>✕</button>
    </div>
  </div>
);

const Home = () => {
  const [featuredBooks, setFeaturedBooks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadFeaturedBooks = async () => {
      setLoading(true);
      const books = await fetchBooks('subject:fiction+bestsellers', 4);
      setFeaturedBooks(books);
      setLoading(false);
    };

    loadFeaturedBooks();
  }, []);

  return (
    <div className="home-container">

      {/* Hero Section */}
      <section className="hero-section">
        <div className="container hero-content">

          {/* Left: Welcome Window */}
          <div className="hero-text">
            <WinTitleBar title="Lumina Books — Welcome" icon="📚" />
            <div style={{ padding: '12px' }}>
              <h1 className="hero-title" style={{ padding: 0, marginBottom: '10px' }}>
                Discover Your Next <span className="highlight">Great Adventure</span>
              </h1>
              <p className="hero-description" style={{ padding: 0, marginBottom: '14px' }}>
                Explore thousands of books across all genres. From gripping thrillers to mind-expanding non-fiction, find the perfect book for your next journey.
              </p>
              <div className="hero-buttons">
                <Link to="/books" className="btn btn-primary">
                  Shop Now <ArrowRight size={12} />
                </Link>
                <Link to="/books?subject=science" className="btn btn-outline">
                  Explore Books
                </Link>
              </div>
            </div>
            {/* Status bar */}
            <div className="win-statusbar">
              <span className="win-statusbar-panel">Ready</span>
              <span className="win-statusbar-panel">Lumina Books v1.0</span>
            </div>
          </div>

          {/* Right: Image Window */}
          <div className="hero-image-wrapper">
            <WinTitleBar title="Book Preview — Photo Viewer" icon="🖼" />
            <img
              src="https://images.unsplash.com/photo-1544947950-fa07a98d237f?q=80&w=600&auto=format&fit=crop"
              alt="Person reading a book"
              className="hero-image"
            />
            <div className="win-statusbar">
              <span className="win-statusbar-panel">1 object selected</span>
              <span className="win-statusbar-panel">600 × 400 px</span>
            </div>
          </div>

        </div>
      </section>

      {/* Featured Section */}
      <section className="featured-section">
        <div className="container">
          <WinTitleBar title="Windows Explorer — Bestselling Fiction" icon="📖" />
          <div className="section-body">
            <div className="section-header">
              <h2>Bestselling Fiction</h2>
              <Link to="/books?subject=fiction" className="view-all">
                View All <ArrowRight size={12} />
              </Link>
            </div>

            {loading ? (
              <div className="loader"></div>
            ) : (
              <div className="books-grid">
                {featuredBooks.map((book) => {
                  const info = book.volumeInfo;
                  const price = book.saleInfo?.listPrice?.amount || 14.99;

                  return (
                    <Link to={`/books/${book.id}`} key={book.id} className="book-card">
                      <img
                        src={info.imageLinks?.thumbnail || '/placeholder.svg?height=200&width=150'}
                        alt={info.title}
                        className="book-cover"
                      />
                      <div className="book-info">
                        <h3 className="book-title" title={info.title}>{info.title}</h3>
                        <p className="book-author">{info.authors?.join(', ') || 'Unknown Author'}</p>

                        <div className="book-rating">
                          <Star size={12} fill="currentColor" />
                          <span>{info.averageRating || '4.5'}</span>
                          <span className="rating-count">({info.ratingsCount || Math.floor(Math.random() * 200) + 50})</span>
                        </div>

                        <p className="book-price">${price}</p>
                      </div>
                    </Link>
                  );
                })}
              </div>
            )}
          </div>
          <div className="win-statusbar">
            <span className="win-statusbar-panel">{featuredBooks.length} item(s)</span>
            <span className="win-statusbar-panel">Sorted by: Popularity</span>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="categories-section">
        <div className="container">
          <WinTitleBar title="Catalog — Browse by Category" icon="📂" />
          <div className="categories-section-body">
            <h2>Explore Categories</h2>
            <div className="categories-grid">
              {['Fiction', 'Science', 'History', 'Technology', 'Art', 'Biography', 'Mystery', 'Romance', 'Thriller', 'Business', 'Travel', 'Philosophy', 'Comics', 'Psychology'].map(cat => (
                <Link to={`/books?subject=${cat.toLowerCase()}`} key={cat} className="category-card">
                  <h3>{cat}</h3>
                  <p>Browse →</p>
                </Link>
              ))}
            </div>
          </div>
          <div className="win-statusbar">
            <span className="win-statusbar-panel">14 categories</span>
            <span className="win-statusbar-panel">Click a category to explore</span>
          </div>
        </div>
      </section>

    </div>
  );
};

export default Home;
