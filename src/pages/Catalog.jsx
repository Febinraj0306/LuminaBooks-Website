import React, { useState, useEffect, useMemo } from 'react';
import { useLocation, Link, useNavigate } from 'react-router-dom';
import { Search, Filter, Star, X } from 'lucide-react';
import { fetchBooks } from '../api';
import './Catalog.css';

const Catalog = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [filters, setFilters] = useState({
    sortBy: 'relevance',
    priceRange: 'all',
    minRating: 0
  });

  const location = useLocation();
  const navigate = useNavigate();

  const queryParams = new URLSearchParams(location.search);
  const subject = queryParams.get('subject') || 'all';
  const searchQuery = queryParams.get('search');

  useEffect(() => {
    const loadBooks = async () => {
      setLoading(true);
      if (searchQuery) {
        setSearchTerm(searchQuery);
        const fetchedBooks = await fetchBooks(searchQuery, 40);
        setBooks(fetchedBooks);
      } else {
        const query = subject === 'all' ? 'bestsellers' : `subject:${subject}`;
        const fetchedBooks = await fetchBooks(query, 40);
        setBooks(fetchedBooks);
      }
      setLoading(false);
    };

    loadBooks();
  }, [subject, searchQuery]);

  const filteredBooks = useMemo(() => {
    let result = [...books];

    // Filter by Price Range
    if (filters.priceRange !== 'all') {
      const [min, max] = filters.priceRange.split('-').map(Number);
      result = result.filter(book => {
        const price = book.saleInfo?.listPrice?.amount || 14.99;
        if (max) return price >= min && price <= max;
        return price >= min;
      });
    }

    // Filter by Rating
    if (filters.minRating > 0) {
      result = result.filter(book => (book.volumeInfo.averageRating || 4.5) >= filters.minRating);
    }

    // Sort
    if (filters.sortBy === 'price-low') {
      result.sort((a, b) => (a.saleInfo?.listPrice?.amount || 14.99) - (b.saleInfo?.listPrice?.amount || 14.99));
    } else if (filters.sortBy === 'price-high') {
      result.sort((a, b) => (b.saleInfo?.listPrice?.amount || 14.99) - (a.saleInfo?.listPrice?.amount || 14.99));
    } else if (filters.sortBy === 'rating') {
      result.sort((a, b) => (b.volumeInfo.averageRating || 4.5) - (a.volumeInfo.averageRating || 4.5));
    } else if (filters.sortBy === 'newest') {
      result.sort((a, b) => {
        const dateA = new Date(a.volumeInfo.publishedDate || 0);
        const dateB = new Date(b.volumeInfo.publishedDate || 0);
        return dateB - dateA;
      });
    }

    return result;
  }, [books, filters]);

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!searchTerm.trim()) return;
    
    setLoading(true);
    const fetchedBooks = await fetchBooks(searchTerm, 40);
    setBooks(fetchedBooks);
    setLoading(false);
    navigate(`/books?search=${encodeURIComponent(searchTerm)}`);
  };

  const handleFilterChange = (key, value) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  const resetFilters = () => {
    setFilters({ sortBy: 'relevance', priceRange: 'all', minRating: 0 });
  };

  return (
    <div className="catalog-page">
      <div className="container">
        <div className="catalog-header">
          <div className="catalog-title-wrapper">
            <h1>Our Collection</h1>
            <p className="catalog-subtitle">
              {subject === 'all' ? 'Showing top trending books' : `Exploring: ${subject.charAt(0).toUpperCase() + subject.slice(1)}`}
            </p>
          </div>
          
          <div className="search-filter-wrapper">
            <form onSubmit={handleSearch} className="search-bar">
              <input
                type="text"
                placeholder="Search by title, author..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="search-input"
              />
              <button type="submit" className="search-btn">
                <Search size={20} />
              </button>
            </form>
            
            <button 
              className={`btn btn-outline filter-btn ${isSidebarOpen ? 'active' : ''}`}
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            >
              <Filter size={20} /> Filters
            </button>
          </div>
        </div>

        <div className="catalog-layout">
          {/* Sidebar */}
          <aside className={`catalog-sidebar ${isSidebarOpen ? 'open' : ''}`}>
            <div className="sidebar-header">
              <h3>Filters</h3>
              <button className="close-sidebar" onClick={() => setIsSidebarOpen(false)}>
                <X size={24} />
              </button>
            </div>

            <div className="filter-group">
              <label>Sort By</label>
              <select 
                value={filters.sortBy} 
                onChange={(e) => handleFilterChange('sortBy', e.target.value)}
                className="filter-select"
              >
                <option value="relevance">Relevance</option>
                <option value="newest">Newest First</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rating">Top Rated</option>
              </select>
            </div>

            <div className="filter-group">
              <label>Price Range</label>
              <div className="filter-options">
                {[
                  { label: 'All Prices', value: 'all' },
                  { label: 'Under $10', value: '0-10' },
                  { label: '$10 - $25', value: '10-25' },
                  { label: '$25 - $50', value: '25-50' },
                  { label: 'Over $50', value: '50-9999' }
                ].map(opt => (
                  <label key={opt.value} className="radio-option">
                    <input 
                      type="radio" 
                      name="priceRange" 
                      checked={filters.priceRange === opt.value}
                      onChange={() => handleFilterChange('priceRange', opt.value)}
                    />
                    <span>{opt.label}</span>
                  </label>
                ))}
              </div>
            </div>

            <div className="filter-group">
              <label>Minimum Rating</label>
              <div className="filter-options">
                {[4, 3, 2, 0].map(rating => (
                  <label key={rating} className="radio-option">
                    <input 
                      type="radio" 
                      name="minRating" 
                      checked={filters.minRating === rating}
                      onChange={() => handleFilterChange('minRating', rating)}
                    />
                    <span>{rating === 0 ? 'Any Rating' : `${rating} Stars & Up`}</span>
                  </label>
                ))}
              </div>
            </div>

            <button className="btn btn-outline reset-btn" onClick={resetFilters}>
              Reset Filters
            </button>
          </aside>

          {/* Results */}
          <main className="catalog-main">
            {loading ? (
              <div className="loader-container">
                <div className="loader"></div>
                <p>Curating your collection...</p>
              </div>
            ) : filteredBooks.length > 0 ? (
              <>
                <p className="results-count">Showing {filteredBooks.length} results</p>
                <div className="books-grid">
                  {filteredBooks.map((book) => {
                    const info = book.volumeInfo;
                    const price = book.saleInfo?.listPrice?.amount || 14.99;
                    
                    return (
                      <Link to={`/books/${book.id}`} key={book.id} className="book-card">
                        <div className="book-cover-wrapper">
                          <img 
                            src={info.imageLinks?.thumbnail?.replace('http:', 'https:') || 'https://via.placeholder.com/150x200?text=No+Cover'} 
                            alt={info.title} 
                            className="book-cover"
                          />
                        </div>
                        <div className="book-info">
                          <h3 className="book-title" title={info.title}>{info.title}</h3>
                          <p className="book-author">{info.authors?.join(', ') || 'Unknown Author'}</p>
                          <div className="book-rating">
                            <Star size={16} className="star-icon" fill="currentColor" />
                            <span>{info.averageRating || '4.5'}</span>
                            <span className="rating-count">({info.ratingsCount || Math.floor(Math.random() * 200) + 50})</span>
                          </div>
                          <p className="book-price">${price.toFixed(2)}</p>
                        </div>
                      </Link>
                    );
                  })}
                </div>
              </>
            ) : (
              <div className="no-results glass">
                <Search size={48} className="no-results-icon" />
                <h2>No matches found</h2>
                <p>Try adjusting your filters or search terms.</p>
                <button className="btn btn-primary" onClick={resetFilters}>Clear All Filters</button>
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
};

export default Catalog;
