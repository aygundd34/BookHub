import './AddBook.css';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import logo from '../../assets/BOOK HUB.png'; // Logo dosyasını import ettik
import Modal from 'react-modal';

Modal.setAppElement('#root'); // Modal için kök elemanı belirtin

const AddBook = () => {
    const [formData, setFormData] = useState({
        title: '',
        author: '',
        genre: '',
        summary: '',
        year: ''
    });
    const [error, setError] = useState('');
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const navigate = useNavigate();

    const role = JSON.parse(localStorage.getItem('user'))?.role;

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

    // Open confirmation modal
    const openModal = () => {
        setModalIsOpen(true);
    };

    // Close confirmation modal
    const closeModal = () => {
        setModalIsOpen(false);
    };

    // Handle form submission
    const handleSubmit = async () => {
        try {
            const response = await axios.post('http://localhost:5094/api/Books/add', formData);
            closeModal();
            navigate('/books'); // Redirect to books list after successful addition
        } catch (error) {
            setError('There was an error adding the book.');
            console.error(error);
        }
    };

    return (
        <div className="add-book-page">
            <header className="navbar">
                <img src={logo} alt="Book Hub Logo" className="logo"/>
                <h1>Book Hub</h1>
                <nav>
                    <ul>
                        <li onClick={() => navigate('/')}>Home</li>
                        <li onClick={() => navigate('/about')}>About</li>
                        <li onClick={() => navigate('/books')}>Books</li>
                    </ul>
                </nav>
            </header>
            <div className="add-book-container">
                <h1>Add Book</h1>
                {error && <p className="error-message">{error}</p>}
                <form onSubmit={(e) => { e.preventDefault(); openModal(); }}>
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
            </div>
            <footer className="footer">
                <p>© 2024 Book Hub. All rights reserved.</p>
            </footer>
            <Modal
                isOpen={modalIsOpen}
                onRequestClose={closeModal}
                contentLabel="Add"
                className="modal"
                overlayClassName="overlay"
            >
                <h2>Successfully Added</h2>
                <p> The book “{formData.title}” was added successfully.</p>
                <button onClick={handleSubmit} className="confirm-btn">Ok</button>
            </Modal>
        </div>
    );
};

export default AddBook;