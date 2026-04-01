import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Star } from 'lucide-react';
import { fetchBooks } from '../api';
import './Home.css';

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
          <div className="hero-text">
            <h1 className="hero-title">
              Discover Your Next <span className="highlight">Great Adventure</span>
            </h1>
            <p className="hero-description">
              Explore thousands of books across all genres. From gripping thrillers to mind-expanding non-fiction, find the perfect book for your next journey.
            </p>
            <div className="hero-buttons">
              <Link to="/books" className="btn btn-primary">
                Shop Now <ArrowRight size={20} />
              </Link>
              <Link to="/books?subject=science" className="btn btn-outline">
                Explore Books
              </Link>
            </div>
          </div>
          <div className="hero-image-wrapper">
            <div className="hero-blob"></div>
            <img
              src="https://images.unsplash.com/photo-1544947950-fa07a98d237f?q=80&w=600&auto=format&fit=crop"
              alt="Person reading a book"
              className="hero-image"
            />
          </div>
        </div>
      </section>

      {/* Featured Section */}
      <section className="featured-section">
        <div className="container">
          <div className="section-header">
            <h2>Bestselling Fiction</h2>
            <Link to="/books?subject=fiction" className="view-all">
              View All <ArrowRight size={16} />
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
                      src={info.imageLinks?.thumbnail || 'https://via.placeholder.com/150x200?text=No+Cover'}
                      alt={info.title}
                      className="book-cover"
                    />
                    <div className="book-info">
                      <h3 className="book-title" title={info.title}>{info.title}</h3>
                      <p className="book-author">{info.authors?.join(', ') || 'Unknown Author'}</p>

                      <div className="book-rating">
                        <Star size={16} className="star-icon" fill="currentColor" />
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
      </section>

      {/* Categories Section */}
      <section className="categories-section">
        <div className="container">
          <h2>Explore Categories</h2>
          <div className="categories-grid">
            {['Fiction', 'Science', 'History', 'Technology', 'Art', 'Biography', 'Mystery', 'Romance', 'Thriller', 'Business', 'Travel', 'Philosophy', 'Comics', 'Psychology'].map(cat => (
              <Link to={`/books?subject=${cat.toLowerCase()}`} key={cat} className="category-card">
                <h3>{cat}</h3>
                <p>Explore →</p>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
