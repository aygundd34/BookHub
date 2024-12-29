import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Navbar.css'; // Ortak CSS dosyasını kullanabilirsiniz

const Navbar = ({ user, onLogout }) => {
    const navigate = useNavigate();

    // Sayfalar arası yönlendirme fonksiyonları
    const handleGoHome = () => navigate('/');
    const handleGoAbout = () => navigate('/about');
    const handleGoBooks = () => navigate('/books');

    return (
        <header className="navbar">
            <h1 onClick={handleGoHome} style={{ cursor: 'pointer' }}>Book Hub</h1>
            <nav className="left-nav">
                <ul>
                    <li onClick={handleGoHome}>Home</li>
                    <li onClick={handleGoAbout}>About</li>
                    <li onClick={handleGoBooks}>Books</li>
                </ul>
            </nav>
        </header>
    );
};

export default Navbar;
