import './UpdateBook.css';
import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import logo from '../../assets/BOOK HUB.png';
import Modal from 'react-modal';

Modal.setAppElement('#root'); // Modal için kök elemanı belirtin

const UpdateBook = () => {
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
    const { bookId } = useParams();

    const role = JSON.parse(localStorage.getItem('user'))?.role;

    if (role !== 'admin') {
        return <p>You do not have permission to update books.</p>;
    }

    useEffect(() => {
        const fetchBook = async () => {
            try {
                const response = await axios.get(`http://localhost:5094/api/Books/get/${bookId}`);
                setFormData(response.data);
            } catch (error) {
                setError('There was an error fetching the book details.');
                console.error(error);
            }
        };

        fetchBook();
    }, [bookId]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.put('http://localhost:5094/api/Books/update', formData);
            setModalIsOpen(true); // Modal'ı aç
        } catch (error) {
            setError('There was an error updating the book.');
            console.error(error);
        }
    };

    const closeModal = () => {
        setModalIsOpen(false);
        navigate('/books'); // Modal kapandıktan sonra books sayfasına yönlendir
    };

    return (
        <div className="update-book-page">
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
            <div className="update-book-container">
                <h1>Update Book</h1>
                {error && <p className="error-message">{error}</p>}
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
                    <button type="submit">Update Book</button>
                </form>
            </div>
            <footer className="footer">
                <p>© 2024 Book Hub. All rights reserved.</p>
            </footer>
            <Modal
                isOpen={modalIsOpen}
                onRequestClose={closeModal}
                contentLabel="Update"
                className="modal"
                overlayClassName="overlay"
            >
                <h2>Successfully Updated</h2>
                <p>The book "{formData.title}" was updated successfully.</p>
                <button onClick={closeModal} className="confirm-btn">Ok</button>
            </Modal>
        </div>
    );
};

export default UpdateBook;