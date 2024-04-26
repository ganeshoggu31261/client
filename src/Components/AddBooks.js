import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import Navbar3 from './Navbar3';
import './AddBooks.css';
import config from '../config';

const AddBooks = () => {
  const [books, setBooks] = useState({
    title:'',
    author:'',
    price:'',
    quantity:'',
    genre:'',
    imageUrl: ''
  });

  const [bookAdded, setBookAdded] = useState(false);

  const handleChange = (e) => {
    setBooks({...books, [e.target.id]: e.target.value});
  };

  const fetchBooks = async () => {
    try {
      const response = await axios.get(`${config.url}/getBooks`);
      setBooks(response.data);
    } catch (error) {
      console.error('Error fetching books:', error);
    }
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  const addBook = async () => {
    try {
      await axios.post(`${config.url}/addbooks`, books);
      fetchBooks();
      setBooks({
        title:'',
        author:'',
        price:'',
        quantity:'',
        genre:'',
        imageUrl: '' 
      });
      setBookAdded(true); 
      setTimeout(() => {
        setBookAdded(false);
      }, 300000);
    } catch (error) {
      console.error('Error adding book:', error);
    }
  };

  return (
    <div>
      <Navbar3 />
      <div className="container">
        <div className="add-book-form">
          <h2>Add a Book (Admin)</h2>
          <label>Title:</label>
          <input type="text" id="title" value={books.title} onChange={handleChange} />

          <label>Author:</label>
          <input type="text" id="author" value={books.author} onChange={handleChange} />

          <label>Price:</label>
          <input type="text" id="price" value={books.price} onChange={handleChange} />

          <label>Genre:</label>
          <input type="text" id="genre" value={books.genre} onChange={handleChange} />

          <label>Quantity:</label>
          <input type="text" id="quantity" value={books.quantity} onChange={handleChange} />

          <label>Image Url:</label>
          <input type="text" id="imageUrl" value={books.imageUrl} onChange={handleChange} />

          <button onClick={addBook}>Add Book</button><br></br>
          {bookAdded && <p>Book Added Successfully</p>} 
        </div>
      </div>
    </div>
  );
};

export default AddBooks;