import './AddBook.css'; // Bu satır doğru ve en üstte olmalı
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const AddBook = () => {
    const [formData, setFormData] = useState({
        title: '',
        author: '',
        genre: '',
        summary: '',
        year: ''
    });
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const role = localStorage.getItem('role'); // Checking the role from localStorage

    if (role !== 'admin') {
        return <p>You do not have permission to add books.</p>;
    }

    // Handle form input change
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:5094/api/Books/add', formData);
            alert(response.data.message); // Success message
            navigate('/books'); // Redirect to books list after successful addition
        } catch (error) {
            setError('There was an error adding the book.');
            console.error(error);
        }
    };

    return (
        <div className="add-book-container"> {/* className ekleyin */}
            <h1>Add Book</h1>
            {error && <p className="error-message">{error}</p>} {/* Hata mesajına className ekleyin */}
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Book Title"
                    name="title"
                    value={formData.title}
                    onChange={handleInputChange}
                    required
                />
                <input
                    type="text"
                    placeholder="Author"
                    name="author"
                    value={formData.author}
                    onChange={handleInputChange}
                    required
                />
                <input
                    type="text"
                    placeholder="Genre"
                    name="genre"
                    value={formData.genre}
                    onChange={handleInputChange}
                    required
                />
                <textarea
                    placeholder="Summary"
                    name="summary"
                    value={formData.summary}
                    onChange={handleInputChange}
                    required
                ></textarea>
                <input
                    type="number"
                    placeholder="Year"
                    name="year"
                    value={formData.year}
                    onChange={handleInputChange}
                    required
                />
                <button type="submit">Add Book</button>
            </form>
            
            <footer className="footer">
                <p>© 2024 Book Hub. All rights reserved.</p>
            </footer>
        </div>
    );
};

export default AddBook;
