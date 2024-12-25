import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './HomePage.css';
import logo from "../../assets/BOOK HUB.png";

const Homepage = () => {
    const [user, setUser] = useState(null); // Kullanıcı bilgisini saklamak için state
    const navigate = useNavigate();

    // Sayfa yüklendiğinde giriş durumu kontrol et
    useEffect(() => {
        const loggedUser = localStorage.getItem('username'); // localStorage'dan kullanıcıyı al
        if (loggedUser) {
            setUser(loggedUser); // Eğer kullanıcı varsa state'i güncelle
        }
    }, []);

    const handleGoHome = () => {
        navigate('/');
    };

    const handleGoAbout = () => {
        navigate('/about');
    };

    const handleGoBooks = () => {
        navigate('/books');
    };

    const handleGoLogin = () => {
        navigate('/login');
    };

    const handleGoRegister = () => {
        navigate('/register');
    };

    // Çıkış yapma fonksiyonu
    const handleLogout = () => {
        localStorage.removeItem('username'); // Kullanıcıyı localStorage'dan çıkar
        localStorage.removeItem('role'); // Eğer role bilgisi varsa onu da kaldır
        setUser(null); // Kullanıcıyı state'den kaldır
        navigate('/'); // Ana sayfaya yönlendir
    };

    return (
        <div className="homepage">
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
                <nav className="right-nav">
                    <ul>
                        {user ? (
                            <>
                                <li>{user}</li> {/* Kullanıcı adı */}
                                <li onClick={handleLogout}>Logout</li> {/* Çıkış butonu */}
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
            <section className="hero">
                <h1>Discover Your Next Favorite Book Today!</h1>
                <p>Your Journey Starts Here.</p>
                <button className="cta-button" onClick={handleGoBooks}>Get Started</button>
            </section>
            <footer className="footer">
                <p>© 2024 Book Hub. All rights reserved.</p>
            </footer>
        </div>
    );
};

export default Homepage;
