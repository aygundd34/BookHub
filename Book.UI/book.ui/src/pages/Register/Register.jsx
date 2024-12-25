import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Register.css';
import logo from "../../assets/BOOK HUB.png";

const Register = () => {
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
    });
    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:5094/api/User/register', formData);
            setMessage(response.data.message);
            setFormData({ username: '', email: '', password: '' });
        } catch (error) {
            setMessage('An error occurred during registration!');
        }
    };

    const handleGoHome = () => navigate('/');
    const handleGoAbout = () => navigate('/about');
    const handleGoBooks = () => navigate('/books');

    return (
        <div className="register-page">
            <header className="navbar">
                <img src={logo} alt="Book Hub Logo" className="logo" />
                <h1>Book Hub</h1>
                <nav className="left-nav">
                    <ul>
                        <li onClick={handleGoHome}>Home</li>
                        <li onClick={handleGoAbout}>About</li>
                        <li onClick={handleGoBooks}>Books</li>
                    </ul>
                </nav>
            </header>
            <div className="register-container">
                <form className="register-form" onSubmit={handleSubmit}>
                    <h2>Register</h2>
                    <div className="form-group">
                        <label htmlFor="username">User Name:</label>
                        <input
                            type="text"
                            id="username"
                            name="username"
                            value={formData.username}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="email">E-posta:</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Password:</label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <button type="submit" className="register-button">Save</button>
                    {message && <p className="error-message">{message}</p>}
                </form>
            </div>
        </div>
    );
};

export default Register;
