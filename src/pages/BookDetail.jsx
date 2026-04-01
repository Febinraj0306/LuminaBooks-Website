import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Star, ShoppingCart, Share2, Heart, CheckCircle } from 'lucide-react';
import { fetchBookDetails } from '../api';
import { useCart } from '../context/CartContext';
import './BookDetail.css';

const BookDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);

  useEffect(() => {
    const getBook = async () => {
      setLoading(true);
      const data = await fetchBookDetails(id);
      setBook(data);
      setLoading(false);
    };
    getBook();
    window.scrollTo(0, 0);
  }, [id]);

  const handleAddToCart = () => {
    if (!book) return;
    const price = book.saleInfo?.listPrice?.amount || 14.99;
    addToCart({ id: book.id, title: book.volumeInfo.title, price, image: book.volumeInfo.imageLinks?.thumbnail }, quantity);
    
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  if (loading) return <div className="loader"></div>;
  
  if (!book) return <div className="error-msg">Book not found!</div>;

  const info = book.volumeInfo;
  const price = book.saleInfo?.listPrice?.amount || 14.99;
  const htmlDescription = info.description || 'No description available.';

  return (
    <div className="book-detail-page">
      <div className="container">
        <button className="back-btn" onClick={() => navigate(-1)}>
          <ArrowLeft size={20} /> Back to Catalog
        </button>

        <div className="book-detail-grid">
          {/* Left Column - Image */}
          <div className="book-image-col">
            <div className="book-image-card">
              <img 
                src={info.imageLinks?.large || info.imageLinks?.thumbnail?.replace('zoom=1', 'zoom=3') || 'https://via.placeholder.com/300x450?text=No+Cover'} 
                alt={info.title} 
              />
            </div>
          </div>

          {/* Right Column - Details */}
          <div className="book-info-col">
            <div className="book-header">
              <h1>{info.title}</h1>
              {info.subtitle && <h2 className="book-subtitle">{info.subtitle}</h2>}
              <p className="author-name">by {info.authors?.join(', ') || 'Unknown Author'}</p>
              
              <div className="book-rating-detail">
                <div className="stars">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={18} fill={i < (info.averageRating || 4) ? "#fbbf24" : "none"} color={i < (info.averageRating || 4) ? "#fbbf24" : "#cbd5e1"} />
                  ))}
                </div>
                <span>{info.averageRating || '4.0'}</span>
                <span className="text-muted">({info.ratingsCount || Math.floor(Math.random() * 200) + 50} reviews)</span>
              </div>
            </div>

            <div className="book-price-section">
              <div className="price-tag">${price}</div>
              <p className="stock-status">✓ In Stock - Ships Worldwide</p>
            </div>

            <div className="add-to-cart-section glass">
              <div className="quantity-selector">
                <button onClick={() => setQuantity(Math.max(1, quantity - 1))}>-</button>
                <span>{quantity}</span>
                <button onClick={() => setQuantity(quantity + 1)}>+</button>
              </div>
              
              <button 
                className={`btn ${added ? 'btn-success' : 'btn-primary'} add-cart-btn`} 
                onClick={handleAddToCart}
                disabled={added}
              >
                {added ? <><CheckCircle size={20} /> Added to Cart</> : <><ShoppingCart size={20} /> Add to Cart</>}
              </button>
              
              <button className="btn btn-icon wishlist-btn" aria-label="Add to wishlist">
                <Heart size={20} />
              </button>
            </div>

            <div className="book-metadata">
              <div className="meta-item">
                <span className="meta-label">Publisher</span>
                <span className="meta-value">{info.publisher || 'Independently Published'}</span>
              </div>
              <div className="meta-item">
                <span className="meta-label">Published Date</span>
                <span className="meta-value">{info.publishedDate || 'Unknown'}</span>
              </div>
              <div className="meta-item">
                <span className="meta-label">Pages</span>
                <span className="meta-value">{info.pageCount || 'Unknown'}</span>
              </div>
              <div className="meta-item">
                <span className="meta-label">ISBN</span>
                <span className="meta-value">{info.industryIdentifiers?.[0]?.identifier || 'N/A'}</span>
              </div>
            </div>

            <div className="book-description">
              <h3>Synopsis</h3>
              <div className="description-content" dangerouslySetInnerHTML={{ __html: htmlDescription }} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookDetail;
