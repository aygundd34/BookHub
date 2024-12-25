import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Navbar.css'; // Ortak CSS dosyasını kullanabilirsiniz

const Navbar = ({ user, onLogout }) => {
    const navigate = useNavigate();

    // Sayfalar arası yönlendirme fonksiyonları
    const handleGoHome = () => navigate('/');
    const handleGoAbout = () => navigate('/about');
    const handleGoBooks = () => navigate('/books');
    const handleGoLogin = () => navigate('/login');
    const handleGoRegister = () => navigate('/register');
    const handleAdminPanel = () => navigate('/admin');

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
            <nav className="right-nav">
                <ul>
                    {user ? (
                        <>
                            <li>Welcome, {user.name || 'User'}</li>
                            {user.role === 'admin' && <li onClick={handleAdminPanel}>Admin Panel</li>}
                            <li onClick={onLogout}>Logout</li>
                        </>
                    ) : (
                        <>
                            <li onClick={handleGoLogin}>Login</li>
                            <li onClick={handleGoRegister}>Register</li>
                        </>
                    )}
                </ul>
            </nav>
        </header>
    );
};

export default Navbar;
