import React, { useState, useEffect } from 'react';
import axios from 'axios';
import BookCard from '../../components/BookCard/BookCard';
import './Books.css';
import logo from '../../assets/BOOK HUB.png';
import { useNavigate } from 'react-router-dom';
import Modal from 'react-modal';

Modal.setAppElement('#root'); // Modal için kök elemanı belirtin

const Books = () => {
    const [books, setBooks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [selectedBook, setSelectedBook] = useState(null);
    const navigate = useNavigate();
    const user = JSON.parse(localStorage.getItem('user')); // Kullanıcı bilgilerini localStorage'dan al
    const isAdmin = user?.role === 'admin'; // Kullanıcının admin olup olmadığını kontrol et

    useEffect(() => {
        const fetchBooks = async () => {
            try {
                const response = await axios.get('http://localhost:5094/api/Books/getList');
                setBooks(response.data);
            } catch (error) {
                console.error('Error fetching books:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchBooks();
    }, []);

    const handleAddBook = () => {
        navigate('/add-book'); // Add Book sayfasına yönlendir
    };

    const openModal = (book) => {
        setSelectedBook(book);
        setModalIsOpen(true);
    };

    const closeModal = () => {
        setModalIsOpen(false);
        setSelectedBook(null);
    };

    const handleDeleteBook = async () => {
        if (!isAdmin) {
            alert('You do not have permission to delete books.');
            return;
        }

        try {
            const token = localStorage.getItem('token');
            await axios.delete(`http://localhost:5094/api/Books/delete/${selectedBook.id}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            setBooks(books.filter((book) => book.id !== selectedBook.id));
            closeModal();
        } catch (err) {
            console.error('Error deleting book:', err.response || err.message);
            alert('Error deleting book. Please check the console for more details.');
        }
    };

    const handleUpdateBook = (bookId) => {
        if (!isAdmin) {
            alert('You do not have permission to update books.');
            return;
        }
        navigate(`/update-book/${bookId}`); // UpdateBook sayfasına yönlendirin
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
                    {isAdmin && (
                        <button onClick={handleAddBook} className="add-book-btn">
                            Add Book
                        </button>
                    )}
                    <div className="book-list">
                        {books.map((book) => (
                            <div key={book.id} className="book-card">
                                <BookCard book={book} />
                                {isAdmin && (
                                    <div className="admin-buttons">
                                        <button onClick={() => openModal(book)} className="delete-btn">
                                            Delete
                                        </button>
                                        <button onClick={() => handleUpdateBook(book.id)} className="update-btn">
                                            Update
                                        </button>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </section>
            <footer className="footer">
                <p>© 2024 Book Hub. All rights reserved.</p>
            </footer>
            <Modal
                isOpen={modalIsOpen}
                onRequestClose={closeModal}
                contentLabel="Confirm Delete"
                className="modal"
                overlayClassName="overlay"
            >
                <h2>Confirm Delete</h2>
                <p>Are you sure you want to delete the book "{selectedBook?.title}"?</p>
                <button onClick={handleDeleteBook} className="confirm-btn">
                    Yes, Delete
                </button>
                <button onClick={closeModal} className="cancel-btn">
                    Cancel
                </button>
            </Modal>
        </div>
    );
};

export default Books;