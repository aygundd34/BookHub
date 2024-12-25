import React, { useState, useEffect } from 'react';
import axios from 'axios';
import BookCard from "../../components/BookCard/BookCard";
import './Books.css';
import logo from "../../assets/BOOK HUB.png";
import { useNavigate } from 'react-router-dom';

const Books = () => {
    const [books, setBooks] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    const role = localStorage.getItem('role'); // Kullanıcının rolünü alıyoruz

    useEffect(() => {
        axios.get('http://localhost:5094/api/Books/getList')
            .then(response => {
                setBooks(response.data);
                setLoading(false);
            })
            .catch(error => {
                console.error('Error fetching data:', error);
                setLoading(false);
            });
    }, []);

    // Kitap ekleme işlemi
    const handleAddBook = () => {
        if (role !== 'admin') {
            alert('You do not have permission to add books');
            return;
        }
        navigate('/add-book');
    };

    // Kitap silme işlemi
    const handleDeleteBook = async (bookId) => {
        if (role !== 'admin') {
            alert('You do not have permission to delete books');
            return;
        }
        try {
            await axios.delete(`http://localhost:5094/api/Books/${bookId}`);
            setBooks(books.filter(book => book.id !== bookId)); // Silinen kitabı listeden çıkar
            alert('Book deleted successfully');
        } catch (err) {
            alert('Error deleting book');
        }
    };

    // Kitap güncelleme işlemi
    const handleUpdateBook = (bookId) => {
        if (role !== 'admin') {
            alert('You do not have permission to update books');
            return;
        }
        navigate(`/update-book/${bookId}`);
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div className="homepage">
            <header className="navbar">
                <img src={logo} alt="Book Hub Logo" className="logo" />
                <h1>Book Hub</h1>
                <nav>
                    <ul>
                        <li onClick={() => navigate('/')}>Home</li>
                        <li onClick={() => navigate('/about')}>About</li>
                        <li onClick={() => navigate('/books')}>Books</li>
                    </ul>
                </nav>
            </header>
            <section className="hero">
                <div className="content">
                    <h2 className="book-list-title">Books</h2>
                    {role === 'admin' && (
                        <button onClick={handleAddBook} className="add-book-btn">Add Book</button>
                    )}
                    <div className="book-list">
                        {books.map(book => (
                            <div key={book.id} className="book-card">
                                <BookCard book={book} />
                                {role === 'admin' && (
                                    <>
                                        <button onClick={() => handleDeleteBook(book.id)} className="delete-btn">Delete</button>
                                        <button onClick={() => handleUpdateBook(book.id)} className="update-btn">Update</button>
                                    </>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <footer className="footer">
                <p>© 2024 Book Hub. All rights reserved.</p>
            </footer>
        </div>
    );
};

export default Books;
