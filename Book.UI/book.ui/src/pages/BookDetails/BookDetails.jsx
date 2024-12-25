import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './BookDetails.css';
import logo from "../../assets/BOOK HUB.png";
import { FaHeart } from 'react-icons/fa'; // Kalp ikonu için

const BookDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [book, setBook] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false); // Kullanıcı giriş durumu
    const [isFavorited, setIsFavorited] = useState(false); // Kitap favoriye ekli mi?

    useEffect(() => {
        // Kullanıcı giriş durumu kontrolü
        const token = localStorage.getItem('token');
        if (token) {
            setIsLoggedIn(true);
        }

        // Kitap detaylarını al
        axios.get(`http://localhost:5094/api/Books/get/${id}`)
            .then(response => {
                if (response.data) {
                    setBook(response.data);
                } else {
                    setError(true);
                }
            })
            .catch(() => {
                setError(true);
            })
            .finally(() => {
                setLoading(false);
            });
    }, [id]);

    const handleFavorite = () => {
        if (!isLoggedIn) {
            alert("Please log in to add to favorites.");
            navigate('/login'); // Kullanıcıyı giriş sayfasına yönlendir
        } else {
            setIsFavorited(prevState => !prevState); // Favori ekleyip çıkarma
            alert(isFavorited ? 'Removed from favorites' : 'Added to favorites');
        }
    };

    const handleBack = () => {
        navigate('/books'); // Geri butonuna tıklanınca kitaplar sayfasına yönlendir
    };

    if (loading) {
        return (
            <div className="loading">
                <h2>Loading...</h2>
            </div>
        );
    }

    if (error || !book) {
        return (
            <div className="error-page">
                <h1>Book Not Found</h1>
                <button onClick={() => navigate('/books')}>Back to Books</button>
            </div>
        );
    }

    return (
        <div className="book-details-page">
            {/* Navbar */}
            <header className="navbar">
                <img src={logo} alt="Book Hub Logo" className="logo" onClick={() => navigate('/')} />
                <h1>Book Hub</h1>
                <nav>
                    <ul>
                        <li onClick={() => navigate('/')}>Home</li>
                        <li onClick={() => navigate('/about')}>About</li>
                        <li onClick={() => navigate('/books')}>Books</li>
                    </ul>
                </nav>
            </header>

            {/* Book Details */}
            <section className="detail-container">
                <div className="book-image">
                    <img
                        src={`https://via.placeholder.com/250x250?text=${book.title}`}
                        alt={book.title}
                        className="detail-image"
                    />
                </div>
                <div className="book-info">
                    <h1>{book.title}</h1>
                    <h3>By {book.author}</h3>
                    <p><strong>Genre:</strong> {book.genre}</p>
                    <p><strong>Year:</strong> {book.year}</p>
                    <p><strong>Summary:</strong> {book.summary}</p>
                </div>

                {/* Kalp ikonu */}
                <div className="favorite-icon" onClick={handleFavorite}>
                    <FaHeart size={30} color={isFavorited ? 'red' : '#ccc'} />
                </div>
            </section>

            {/* Geri Butonu */}
            <div className="back-button-container">
                <button className="back-button" onClick={handleBack}>Back</button>
            </div>

            {/* Footer */}
            <footer className="footer">
                <p>© 2024 Book Hub. All rights reserved.</p>
            </footer>
        </div>
    );
};

export default BookDetails;