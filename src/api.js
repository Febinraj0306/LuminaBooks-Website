import axios from 'axios';

const BASE_URL = 'https://www.googleapis.com/books/v1/volumes';

export const fetchBooks = async (query = 'fiction', maxResults = 12, startIndex = 0) => {
  try {
    const response = await axios.get(`${BASE_URL}?q=${query}&maxResults=${maxResults}&startIndex=${startIndex}`);
    return response.data.items || [];
  } catch (error) {
    console.error('Error fetching books:', error);
    return [];
  }
};

export const fetchBookDetails = async (id) => {
  try {
    const response = await axios.get(`${BASE_URL}/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching book details:', error);
    return null;
  }
};
